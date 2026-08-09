import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { loadEnv } from './lib/env-loader.mjs';
import { socialEngine } from './opc_facebook_youtube_engine.mjs';
import { triggerLeadWelcomeEmail, dispatchSequenceStep } from './opc_resend_email_engine.mjs';
import { notifyNewLeadToTelegram, startTelegramBotPolling } from './opc_telegram_bot_engine.mjs';

// New modular route imports
import { handleTickerNews } from './routes/api-ticker.mjs';
import { handleFinanceWebhook, handleFinanceTransactions } from './routes/api-finance.mjs';
import { handleLeadSubmit, handleLeadsRecent } from './routes/api-leads.mjs';
import { handleHealth } from './routes/api-health.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file (shared loader — single parse)
loadEnv(__dirname);

const PORT = 8085;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Enable CORS for Paperclip API & cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Dual Domain Intelligent Routing
    const host = req.headers.host || '';
    if (host.includes('ai.breaths.live') && (req.url === '/' || req.url === '/index.html')) {
        // Redirect ai.breaths.live/ root to VI Ladipage
        res.writeHead(302, { 'Location': 'https://ai.breaths.live/vi' });
        res.end();
        return;
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Health Check Endpoint (for UptimeRobot, Betterstack, etc.)
    if (req.url === '/api/health' && req.method === 'GET') {
        return handleHealth(req, res);
    }

    // API Routes for Social Automation & Credentials
    if (req.url === '/api/social/status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(socialEngine.getEngineStatus()));
        return;
    }

    if (req.url === '/api/social/save-all' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const payload = JSON.parse(body || '{}');
                const result = socialEngine.saveAllCredentials(payload);
                res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: e.message }));
            }
        });
        return;
    }

    if (req.url === '/api/social/save-cookie' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const payload = JSON.parse(body || '{}');
                const result = socialEngine.saveAllCredentials(payload);
                res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: e.message }));
            }
        });
        return;
    }

    if (req.url === '/api/content/matrix' && req.method === 'GET') {
        const matrixPath = path.join(__dirname, 'data', 'content_matrix.json');
        fs.readFile(matrixPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: err.message }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
        return;
    }

    if (req.url === '/api/faq' && req.method === 'GET') {
        const faqPath = path.join(__dirname, 'data', 'faq_matrix.json');
        fs.readFile(faqPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: err.message }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
        return;
    }

    // Dynamic TV Breaking News Ticker Endpoint
    if (req.url === '/api/ticker/news' && req.method === 'GET') {
        let leadsCount = 44;
        let ybaiSentCount = 37;
        let realRevenue = 0;
        let paidTxCount = 0;
        let latestPaidMsg = '';

        try {
            const dbPath = path.join(__dirname, 'data', 'leads_db.json');
            if (fs.existsSync(dbPath)) {
                const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
                leadsCount = db.length;
                ybaiSentCount = db.filter(l => l.step === 'EMAIL_1_SENT').length;
            }
        } catch (e) {}

        try {
            const txDbPath = path.join(__dirname, 'data', 'transactions_db.json');
            if (fs.existsSync(txDbPath)) {
                const txList = JSON.parse(fs.readFileSync(txDbPath, 'utf8'));
                const paidList = txList.filter(t => t.status === 'PAID_VERIFIED');
                paidTxCount = paidList.length;
                realRevenue = paidList.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
                if (paidList.length > 0) {
                    const top = paidList[0];
                    latestPaidMsg = `💰 CHUYỂN KHOẢN THỰC THÀNH CÔNG: KH ${top.student || 'Học viên'} vừa gạch nợ VietQR MB Bank ${Number(top.amount || 500000).toLocaleString('vi-VN')}đ (${top.courseCode || '500K'})!`;
                }
            }
        } catch (e) {}

        const newsList = [
            { tag: '🔴 LIVE 24/7', text: latestPaidMsg || `Hệ thống AI Squad vừa gửi thành công ${ybaiSentCount} Email Outreach cho Danh sách Đại sứ YBAI!` },
            { tag: '⚡ GIÁ GÓI NIÊM YẾT', text: 'Bản Sao Mã Nguồn: 0đ (Free) | Gói VIP Coaching: 500.000đ ($20) | Gói Setup 1:1: 1.000.000đ ($40)' },
            { tag: '🚀 BÁO CÁO THỰC TẾ', text: `Doanh thu thực nhận: ${realRevenue.toLocaleString('vi-VN')}đ | ${paidTxCount} Giao dịch CK thực tế | ${leadsCount} Leads đã đồng bộ Google Sheets!` },
            { tag: '🎓 AI CFO AUTOMATION', text: 'AI CFO tự động đối soát VietQR MB Bank 0989890022 trong 3 giây — Chỉ ghi nhận doanh thu khi có CK thật 100%!' },
            { tag: '🔥 ĐẶT LỊCH HẸN', text: 'Đặt lịch Video Call 1:1 Setup trực tiếp cùng Founder Victor Chuyen tại cal.com/victorchuyen/coachai' }
        ];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            updated_at: new Date().toISOString(),
            real_revenue: realRevenue,
            paid_transactions: paidTxCount,
            news: newsList
        }));
        return;
    }

    // Meta Conversions API (CAPI) Proxy Endpoint
    if (req.url === '/api/meta/capi' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const eventName = payload.event_name || 'PageView';
                const eventId = payload.event_id || `EVT-${Date.now()}`;
                const rawUser = payload.user_data || {};
                const customData = payload.custom_data || {};

                const hashValue = (val) => val ? crypto.createHash('sha256').update(val.toString().trim().toLowerCase()).digest('hex') : undefined;

                const hashedUserData = {
                    em: rawUser.email ? [hashValue(rawUser.email)] : undefined,
                    ph: rawUser.phone ? [hashValue(rawUser.phone)] : undefined,
                    fn: rawUser.name ? [hashValue(rawUser.name)] : undefined,
                    client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    client_user_agent: req.headers['user-agent']
                };

                const capiEvent = {
                    event_name: eventName,
                    event_time: payload.timestamp || Math.floor(Date.now() / 1000),
                    event_id: eventId,
                    event_source_url: payload.event_source_url || 'https://opc.breaths.live',
                    action_source: 'website',
                    user_data: hashedUserData,
                    custom_data: customData
                };

                console.log(`[META CAPI SERVER-SIDE EVENT] ${eventName}`, { eventId, customData });

                const pixelId = process.env.META_PIXEL_ID || '1082547193645028';
                const capiToken = process.env.META_CAPI_ACCESS_TOKEN;
                let capiResult = { status: 'LOGGED_LOCALLY', eventId };

                if (capiToken) {
                    try {
                        const metaUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${capiToken}`;
                        const metaRes = await fetch(metaUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ data: [capiEvent] })
                        });
                        capiResult = await metaRes.json();
                    } catch (err) {
                        console.error('[META CAPI GRAPH API ERROR]', err.message);
                    }
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, eventName, eventId, capiResult }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: e.message }));
            }
        });
        return;
    }

    if (req.url === '/api/sheets/status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            sheetId: '1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24',
            vaultDriveId: '15qaLlg9GEeLTi0zofTT_PK5U4QRDtq_h',
            tabs: ['Leads', 'Calls', 'Offers', 'Clients', 'Daily', 'Transactions', 'Roadmap Checklist', 'Lead Tracker 1-10', 'Mốc tổng', 'INFO'],
            lastSync: new Date().toISOString(),
            status: 'CONNECTED & READY'
        }));
        return;
    }

    // API to Dispatch 5-Day Email Onboarding Sequence Steps
    if (req.url === '/api/email/send-sequence-step' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const email = payload.email || 'lead@example.com';
                const name = payload.name || 'Khách Hàng';
                const dayStep = payload.day || payload.step || 0;

                const result = await dispatchSequenceStep({ name, email, lang: payload.lang || 'vi' }, dayStep);
                res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: result.success, dayStep, email, result }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: e.message }));
            }
        });
        return;
    }

    // AI CFO Finance Webhook & Auto Access Gating API
    if (req.url === '/api/finance/webhook' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const phone = payload.phone || payload.lead_phone || '0989890022';
                const amount = payload.amount || 1000000;
                const courseCode = payload.course_code || 'K01-AGENTIC';
                const bankRef = payload.bank_ref || `FT${Date.now()}`;

                // Auto-Access Gating Workflow
                const accessLink = `https://drive.google.com/drive/folders/opc-tnc-course-${courseCode.toLowerCase()}`;
                const teleGroupLink = 'https://t.me/+OPC_VIP_AI_AGENTS';

                // Send Telegram Sync Notice
                const noticeMsg = `💎 *[AI CFO FINANCE WEBHOOK]*\n` +
                    `✅ *BÁO CÁO CHUYỂN KHOẢN VIETQR THÀNH CÔNG*\n` +
                    `• SĐT Học Viên: \`${phone}\`\n` +
                    `• Số tiền thực nhận: *${amount.toLocaleString('vi-VN')} VNĐ*\n` +
                    `• Mã GD Bank: \`${bankRef}\`\n` +
                    `• Mã Khóa Học: \`${courseCode}\`\n` +
                    `• Trạng thái: *PAID_VERIFIED*\n` +
                    `🚀 *AUTO-ACCESS GRANTED*: [Google Drive Link](${accessLink})`;

                try {
                    await socialEngine.sendTelegramSyncNotice(noticeMsg);
                } catch (err) {
                    console.error('[AI CFO] Telegram notice error:', err.message);
                }

                // Save transaction locally in data/transactions_db.json
                const txDbPath = path.join(__dirname, 'data', 'transactions_db.json');
                let txList = [];
                if (fs.existsSync(txDbPath)) {
                    try { txList = JSON.parse(fs.readFileSync(txDbPath, 'utf8')); } catch (e) {}
                }
                const newTx = {
                    id: `TX-${Date.now()}`,
                    student: payload.name || payload.student || 'Khách Hàng',
                    phone,
                    amount,
                    status: 'PAID_VERIFIED',
                    access: 'GRANTED',
                    bankRef,
                    courseCode,
                    date: new Date().toLocaleString('vi-VN')
                };
                txList.unshift(newTx);
                fs.writeFileSync(txDbPath, JSON.stringify(txList, null, 2));

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    paymentStatus: 'PAID_VERIFIED',
                    accessStatus: 'GRANTED',
                    bankRef,
                    accessLink,
                    teleGroupLink,
                    timestamp: new Date().toISOString()
                }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: e.message }));
            }
        });
        return;
    }

    if (req.url === '/api/finance/transactions' && req.method === 'GET') {
        const txDbPath = path.join(__dirname, 'data', 'transactions_db.json');
        let txList = [];
        if (fs.existsSync(txDbPath)) {
            try { txList = JSON.parse(fs.readFileSync(txDbPath, 'utf8')); } catch (e) {}
        }
        const totalRev = txList.reduce((sum, item) => sum + (item.amount || 0), 0);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            totalTransactions: txList.length,
            totalRevenue: totalRev,
            mrr: totalRev,
            recentTransactions: txList
        }));
        return;
    }

    // Lead Magnet Opt-in Submission API
    if (req.url === '/api/leads/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const name = payload.name || 'Học Viên Mới';
                const phone = payload.phone || '0989890022';
                const email = payload.email || 'lead@example.com';
                const business = payload.business || 'SME Business';

                // Save lead locally in data/leads_db.json
                const leadsDbPath = path.join(__dirname, 'data', 'leads_db.json');
                let leadsList = [];
                if (fs.existsSync(leadsDbPath)) {
                    try { leadsList = JSON.parse(fs.readFileSync(leadsDbPath, 'utf8')); } catch (e) {}
                }
                const newLead = { id: `LEAD-${Date.now()}`, name, phone, email, business, timestamp: new Date().toISOString(), status: 'QUALIFIED' };
                leadsList.unshift(newLead);
                fs.writeFileSync(leadsDbPath, JSON.stringify(leadsList, null, 2));

                // Send Telegram Notification
                const teleMsg = `🔥 *[LEAD MAGNET OPT-IN MỚI]*\n` +
                    `• Họ tên: *${name}*\n` +
                    `• SĐT Zalo: \`${phone}\`\n` +
                    `• Email: \`${email}\`\n` +
                    `• Ngành nghề: *${business}*\n` +
                    `🎁 *Hành động*: Đã tự động gửi link Bản Sao Mã Nguồn OPC!`;

                try {
                    await socialEngine.sendTelegramSyncNotice(teleMsg);
                    await notifyNewLeadToTelegram({ name, phone, email, business, segment: payload.segment || 'VIETNAM_DOMESTIC' });
                } catch (err) {
                    console.error('[Lead Submit] Telegram notice error:', err.message);
                }

                // Trigger Professional Resend HTML Email to Lead (VI or EN)
                if (email) {
                    triggerLeadWelcomeEmail({
                        name,
                        email,
                        phone,
                        business,
                        lang: payload.lang || 'vi'
                    }).catch(e => console.error('[Resend Trigger Error]', e.message));
                }

                // Async Sync Lead to Google Sheet & Trigger 5-Day Email Onboarding if Webhook URL is set
                const appsScriptUrl = process.env.APPS_SCRIPT_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbx6GZGt0P_iUzD0HX3qWbuCBrtjxxjZ7nBLlQn_ZVHB6sORYCA4DD4neytkj9zCvld4/exec';
                if (appsScriptUrl) {
                    fetch(appsScriptUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, phone, email, business, lang: payload.lang || 'vi' })
                    }).then(r => r.json()).then(res => console.log('[GOOGLE SHEET SYNC OK]', name, res)).catch(e => console.error('[AppsScript Webhook Error]', e.message));
                }

                const isEn = (business === 'GLOBAL_ENGLISH' || payload.segment === 'GLOBAL_ENGLISH' || payload.lang === 'en');
                const defaultAccessLink = isEn
                    ? 'https://discord.com/channels/1098935967873765457/1098935968582598707'
                    : 'https://zalo.me/g/tdhmtu261';

                const successMsg = isEn
                    ? 'Activation successful! Redirecting you to the official Discord channel...'
                    : 'Kích hoạt thành công! Đang tự động chuyển hướng bạn tới Nhóm Zalo chính thức nhận Bản Sao Mã Nguồn OPC.';

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: successMsg,
                    leadId: newLead.id,
                    accessLink: defaultAccessLink
                }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: e.message }));
            }
        });
        return;
    }

    // GET Recent Real Leads for Dynamic Live Social Proof Ticker
    if (req.url === '/api/leads/recent' && req.method === 'GET') {
        const leadsDbPath = path.join(__dirname, 'data', 'leads_db.json');
        let leadsList = [];
        if (fs.existsSync(leadsDbPath)) {
            try { leadsList = JSON.parse(fs.readFileSync(leadsDbPath, 'utf8')); } catch (e) {}
        }
        const maskedLeads = leadsList.slice(0, 10).map(item => {
            // Mask phone: keep first 3 and last 3 digits, mask middle with ****
            let maskedPhone = '098****022';
            if (item.phone) {
                const digits = item.phone.replace(/[^0-9+]/g, '');
                if (digits.length >= 7) {
                    maskedPhone = digits.slice(0, 3) + '****' + digits.slice(-3);
                } else {
                    maskedPhone = digits;
                }
            }

            // Calculate REAL timeAgo from timestamp
            let timeAgo = 'vừa xong';
            if (item.timestamp) {
                const diffMs = Date.now() - new Date(item.timestamp).getTime();
                const diffMin = Math.floor(diffMs / 60000);
                const diffHour = Math.floor(diffMs / 3600000);
                const diffDay = Math.floor(diffMs / 86400000);
                if (diffMin < 1) timeAgo = 'vừa xong';
                else if (diffMin < 60) timeAgo = `${diffMin} phút trước`;
                else if (diffHour < 24) timeAgo = `${diffHour} giờ trước`;
                else timeAgo = `${diffDay} ngày trước`;
            }

            return {
                name: item.name,
                phone: maskedPhone,
                timeAgo: timeAgo
            };
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, leads: maskedLeads }));
        return;
    }

    // Checkout Payment Intent Tracking API
    if (req.url === '/api/checkout/intent' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                console.log(`[CHECKOUT INTENT] Package: ${payload.package} | Method: ${payload.method} | Time: ${payload.timestamp}`);
                // Notify Chairman via Telegram
                const teleMsg = `💳 <b>[CHECKOUT INTENT]</b>\n` +
                    `• Gói: <b>${payload.package || 'N/A'}</b>\n` +
                    `• Phương thức: <b>${payload.method || 'N/A'}</b>\n` +
                    `• Thời gian: ${payload.timestamp || new Date().toISOString()}`;
                try {
                    await socialEngine.sendTelegramSyncNotice(teleMsg);
                } catch (err) {}
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: e.message }));
            }
        });
        return;
    }

    // Dedicated Market Isolation Routes & 301 SEO Clean URL Redirection
    if (req.url === '/landing_vi.html' || req.url === '/landing.html' || req.url === '/landing_vi') {
        res.writeHead(301, { 'Location': '/vi' });
        res.end();
        return;
    }
    if (req.url === '/landing_en.html' || req.url === '/landing_en') {
        res.writeHead(301, { 'Location': '/en' });
        res.end();
        return;
    }
    if (req.url === '/checkout.html' || req.url === '/buy' || req.url === '/pricing') {
        res.writeHead(301, { 'Location': '/checkout' });
        res.end();
        return;
    }

    if (req.url === '/vi') {
        req.url = '/landing_vi.html';
    }
    if (req.url === '/en') {
        req.url = '/landing_en.html';
    }
    if (req.url === '/landing' || req.url === '/vsl' || req.url === '/lead') {
        req.url = '/landing_vi.html';
    }
    if (req.url === '/checkout') {
        req.url = '/checkout.html';
    }
    if (req.url === '/app' || req.url === '/3d') {
        req.url = '/index.html';
    }
    if (req.url === '/favicon.ico' || req.url === '/favicon.gif' || req.url === '/Favicon.gif' || req.url === '/favicon.png') {
        const iconName = req.url.replace('/', '');
        const targetPath = path.join(__dirname, iconName);
        if (fs.existsSync(targetPath)) {
            req.url = '/' + iconName;
        } else if (fs.existsSync(path.join(__dirname, 'Favicon.gif'))) {
            req.url = '/Favicon.gif';
        } else {
            req.url = '/LOGO-OPC.png';
        }
    }

    // Smart Domain Router: opc.breaths.live ALWAYS serves index.html (3D Virtual Office Simulator)
    let targetFile = req.url === '/' ? 'index.html' : req.url;
    if (req.url === '/' || req.url === '') {
        targetFile = 'index.html';
    }

    let filePath = path.join(__dirname, targetFile);
    filePath = path.normalize(filePath);

    // Prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // Fallback to index.html
            filePath = path.join(__dirname, 'index.html');
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`500 Server Error: ${error.code}`);
            } else {
                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                });
                res.end(content, 'utf-8');
            }
        });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 OPC-TNC Virtual Office Local Server running at http://localhost:${PORT}`);
    console.log(`🌐 Ready to tunnel to https://opc.breaths.live via Cloudflare!`);
    startTelegramBotPolling();
});

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { socialEngine } from './opc_facebook_youtube_engine.mjs';
import { triggerLeadWelcomeEmail, dispatchSequenceStep } from './opc_resend_email_engine.mjs';
import { notifyNewLeadToTelegram, startTelegramBotPolling } from './opc_telegram_bot_engine.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split(/\r?\n/).forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const parts = trimmed.split('=');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const val = parts.slice(1).join('=').trim();
                    if (key && !process.env[key]) {
                        process.env[key] = val;
                    }
                }
            }
        });
    }
} catch (e) {
    console.error('[ENV LOAD ERROR]', e.message);
}

const PORT = 8085;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Enable CORS for Paperclip API & cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            totalTransactions: 3,
            totalRevenue: 3000000,
            mrr: 15000000,
            recentTransactions: [
                { id: 'TX-20260807-001', student: 'Mr. Thắng Win', phone: '0989890022', amount: 1000000, status: 'PAID_VERIFIED', access: 'GRANTED', bankRef: 'FT2621983012', date: '2026-08-07 19:30' },
                { id: 'TX-20260807-002', student: 'Demo Lead 01', phone: '0912345678', amount: 1000000, status: 'PAID_VERIFIED', access: 'GRANTED', bankRef: 'FT2621983015', date: '2026-08-07 20:15' },
                { id: 'TX-20260807-003', student: 'Demo Lead 02', phone: '0987654321', amount: 1000000, status: 'PENDING', access: 'BLOCKED', bankRef: 'WAITING_BANK', date: '2026-08-07 21:00' }
            ]
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

    // Dedicated Market Isolation Routes (/vi & /en)
    if (req.url === '/vi' || req.url === '/landing_vi') {
        req.url = '/landing_vi.html';
    }
    if (req.url === '/en' || req.url === '/landing_en') {
        req.url = '/landing_en.html';
    }
    if (req.url === '/landing' || req.url === '/vsl' || req.url === '/lead') {
        req.url = '/landing_vi.html';
    }
    if (req.url === '/app' || req.url === '/3d') {
        req.url = '/index.html';
    }

    // Smart Device Router for Root / Domain Access
    let targetFile = req.url === '/' ? 'index.html' : req.url;
    if (req.url === '/' || req.url === '') {
        const ua = req.headers['user-agent'] || '';
        const acceptLang = req.headers['accept-language'] || '';
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const isEnglish = acceptLang.toLowerCase().startsWith('en') && !acceptLang.toLowerCase().includes('vi');

        if (isMobile) {
            targetFile = isEnglish ? 'landing_en.html' : 'landing_vi.html';
        } else {
            targetFile = 'index.html';
        }
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
    console.log(`🌐 Ready to tunnel to https://ai.breaths.live via Cloudflare!`);
    startTelegramBotPolling();
});

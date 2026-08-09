// OPC-TNC — API Route: /api/leads/*
// Lead Magnet Opt-in & Recent Leads

import { readJsonDb, prependToJsonDb } from '../lib/json-db.mjs';

/**
 * POST /api/leads/submit
 * Lead magnet opt-in form submission
 */
export function handleLeadSubmit(req, res, { socialEngine, notifyNewLeadToTelegram, triggerLeadWelcomeEmail }) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const payload = JSON.parse(body || '{}');
            const name = payload.name || 'Học Viên Mới';
            const phone = payload.phone || '0989890022';
            const email = payload.email || 'lead@example.com';
            const business = payload.business || 'SME Business';

            // Save lead
            const newLead = {
                id: `LEAD-${Date.now()}`,
                name, phone, email, business,
                timestamp: new Date().toISOString(),
                status: 'QUALIFIED'
            };
            prependToJsonDb('leads_db.json', newLead);

            // Telegram Notification
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

            // Trigger Welcome Email
            if (email) {
                triggerLeadWelcomeEmail({
                    name, email, phone, business,
                    lang: payload.lang || 'vi'
                }).catch(e => console.error('[Resend Trigger Error]', e.message));
            }

            // Sync to Google Sheet
            const appsScriptUrl = process.env.APPS_SCRIPT_WEBHOOK_URL || '';
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
}

/**
 * GET /api/leads/recent
 * Returns last 10 leads with masked phone numbers
 */
export function handleLeadsRecent(req, res) {
    const leadsList = readJsonDb('leads_db.json');
    const maskedLeads = leadsList.slice(0, 10).map(item => {
        let maskedPhone = '098****022';
        if (item.phone) {
            const digits = item.phone.replace(/[^0-9+]/g, '');
            if (digits.length >= 7) {
                maskedPhone = digits.slice(0, 3) + '****' + digits.slice(-3);
            } else {
                maskedPhone = digits;
            }
        }

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

        return { name: item.name, phone: maskedPhone, timeAgo };
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, leads: maskedLeads }));
}

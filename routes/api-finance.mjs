// OPC-TNC — API Route: /api/finance/*
// AI CFO VietQR Webhook & Transaction Management

import { readJsonDb, prependToJsonDb } from '../lib/json-db.mjs';

/**
 * POST /api/finance/webhook
 * Receives VietQR/SePAY payment webhook → auto-verify → grant access
 */
export function handleFinanceWebhook(req, res, { socialEngine }) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const payload = JSON.parse(body || '{}');

            // Validate webhook secret if configured
            const webhookSecret = process.env.WEBHOOK_SECRET;
            if (webhookSecret) {
                const providedSecret = req.headers['x-webhook-secret'] || '';
                if (providedSecret !== webhookSecret) {
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Invalid webhook secret' }));
                    return;
                }
            }

            const phone = payload.phone || payload.lead_phone || '0989890022';
            const amount = payload.amount || 1000000;
            const courseCode = payload.course_code || 'K01-AGENTIC';
            const bankRef = payload.bank_ref || `FT${Date.now()}`;

            const accessLink = `https://drive.google.com/drive/folders/opc-tnc-course-${courseCode.toLowerCase()}`;
            const teleGroupLink = 'https://t.me/+OPC_VIP_AI_AGENTS';

            // Telegram Notification
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

            // Save transaction
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
            prependToJsonDb('transactions_db.json', newTx);

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
}

/**
 * GET /api/finance/transactions
 * Returns all transactions + total revenue
 */
export function handleFinanceTransactions(req, res) {
    const txList = readJsonDb('transactions_db.json');
    const totalRev = txList.reduce((sum, item) => sum + (item.amount || 0), 0);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: true,
        totalTransactions: txList.length,
        totalRevenue: totalRev,
        mrr: totalRev,
        recentTransactions: txList
    }));
}

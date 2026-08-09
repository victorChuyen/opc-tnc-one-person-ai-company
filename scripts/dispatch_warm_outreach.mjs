import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendResendEmail } from '../opc_resend_email_engine.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isSendMode = process.argv.includes('--send');
const isDryRun = !isSendMode;

console.log(`==================================================`);
console.log(`🚀 OPC-TNC DAILY EMAIL OUTREACH DISPATCHER ENGINE`);
console.log(`MODE: ${isSendMode ? '🔥 LIVE SENDING MODE' : '🧪 DRY-RUN PREVIEW MODE (Run with --send to dispatch)'}`);
console.log(`==================================================\n`);

const dbPath = path.join(__dirname, '..', 'data', 'leads_db.json');
if (!fs.existsSync(dbPath)) {
    console.error(`❌ DB file not found: ${dbPath}`);
    process.exit(1);
}

const leads = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Filter leads ready for Email 1
const targetLeads = leads.filter(lead => {
    const isYbaiOrWarm = lead.source === 'OLD_DATABASE_YBAI' || lead.status === 'WARM';
    const notSent = !lead.step || lead.step === 'NOT_SENT';
    return isYbaiOrWarm && notSent && lead.email && lead.email.includes('@');
});

console.log(`📊 Found ${targetLeads.length} target leads ready for Email 1 outreach.`);

function buildEmailHtml(lead) {
    const name = lead.name || 'Đại Sứ';
    const isYbai = lead.source === 'OLD_DATABASE_YBAI';

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cơ hội hợp tác cùng OPC-TNC</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 24px; text-align: center; border-bottom: 3px solid #2563eb;">
      <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: 0.5px;">🚀 OPC-TNC | ONE PERSON AI COMPANY</h1>
      <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">Giải Pháp Tự Động Hóa Doanh Nghiệp 1 Người Với 6 Giám Đốc AI</p>
    </div>

    <!-- Main Content Body -->
    <div style="padding: 30px 24px; line-height: 1.6; font-size: 15px;">
      <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">Chào ${name},</p>
      
      <p>Tôi là <strong>Victor Chuyen</strong> (Founder OPC-TNC). ${isYbai ? 'Là một <strong>Đại Sứ YBAI</strong> năng nổ, tôi biết bạn luôn tìm kiếm giải pháp đột phá để hỗ trợ khách hàng và gia tăng thu nhập tự động mà không bị quá tải công việc.' : 'Tôi biết bạn đang tìm kiếm giải pháp tự động hóa giúp giải phóng bản thân khỏi các công việc vận hành lặp lại.'}</p>
      
      <p>Đội ngũ OPC-TNC vừa chính thức đóng gói <strong>Bộ Mã Nguồn 6 Giám Đốc AI (Ollama Local 0đ & Cloud 24/7)</strong> giúp 1 cá nhân vận hành hiệu quả bằng cả công ty 5-6 người:</p>

      <!-- Feature Highlight Box -->
      <div style="background: #f1f5f9; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 8px 0;">💳 <strong>AI CFO:</strong> Tự động đối soát chuyển khoản VietQR 24/7 trong 3 giây & đọc file hóa đơn điện tử XML Cục Thuế.</p>
        <p style="margin: 0 0 8px 0;">🚀 <strong>AI CMO:</strong> Tự động nghiên cứu thị trường, viết kịch bản video ngắn Reels/TikTok & bài đăng Facebook.</p>
        <p style="margin: 0;">⚙️ <strong>AI COO:</strong> Tự động quản lý task, xuất báo cáo tuần 6 phần & làm Trợ lý đào tạo SOP 24/7.</p>
      </div>

      <p style="font-weight: 600; color: #0f172a;">Bạn có rảnh 5 phút để xem Video Demo Mô phỏng Văn phòng 3D làm việc thực tế không?</p>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://opc.breaths.live/vi" target="_blank" style="background: #2563eb; color: #ffffff; font-weight: 800; font-size: 15px; padding: 14px 28px; border-radius: 30px; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">👉 XEM VIDEO DEMO 3D & NHẬN MÃ NGUỒN 0Đ</a>
      </div>

      <p style="color: #64748b; font-size: 14px;">Nếu có bất kỳ câu hỏi nào về mô hình hoặc cách triển khai, bạn chỉ cần <strong>Reply trực tiếp Email này</strong> hoặc nhắn qua Telegram/Zalo cho tôi nhé!</p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

      <!-- Signature -->
      <p style="margin: 0; font-size: 14px; color: #475569;">
        Trân trọng,<br>
        <strong>Victor Chuyen & Co-Founder LUCKY</strong><br>
        <span style="font-size: 12px; color: #94a3b8;">Founder & Chief AI Coach | OPC-TNC System</span><br>
        <span style="font-size: 12px; color: #2563eb;">🌐 Website: <a href="https://opc.breaths.live/vi" style="color: #2563eb; text-decoration: none;">opc.breaths.live</a></span>
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
      Email này được gửi đến ${lead.email} vì bạn nằm trong danh sách Đối tác/Đại sứ ưu tiên của OPC-TNC.
    </div>

  </div>
</body>
</html>
    `;
}

async function run() {
    let sentCount = 0;

    for (let i = 0; i < targetLeads.length; i++) {
        const lead = targetLeads[i];
        const subject = `[OPC-TNC] ${lead.name} ơi, cơ hội x3 hiệu suất với Mô Hình 6 Giám Đốc AI`;
        const html = buildEmailHtml(lead);

        console.log(`\n--------------------------------------------------`);
        console.log(`[${i + 1}/${targetLeads.length}] Target: ${lead.name} <${lead.email}> | Code: ${lead.ambassador_code || 'N/A'}`);
        console.log(`Subject: ${subject}`);

        if (isDryRun) {
            console.log(`[DRY-RUN] Email rendered successfully (${html.length} chars).`);
        } else {
            console.log(`🚀 Sending via Resend API (CC: gdkd.3t@gmail.com)...`);
            const res = await sendResendEmail({
                to: lead.email,
                cc: 'gdkd.3t@gmail.com',
                subject: subject,
                html: html
            });

            if (res.success) {
                sentCount++;
                lead.step = 'EMAIL_1_SENT';
                lead.email_1_sent_at = new Date().toISOString();

                // Update lead in main memory list
                const idx = leads.findIndex(l => l.id === lead.id);
                if (idx !== -1) {
                    leads[idx] = lead;
                }

                // Write updated DB to disk
                fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2), 'utf8');
                console.log(`✅ Saved status EMAIL_1_SENT for ${lead.email}`);
            } else {
                console.error(`❌ Failed to send to ${lead.email}:`, res.error);
            }

            // Delay 8 seconds per email to stay clear of spam filters
            if (i < targetLeads.length - 1) {
                console.log(`⏳ Waiting 8s before sending next email...`);
                await new Promise(r => setTimeout(r, 8000));
            }
        }
    }

    console.log(`\n==================================================`);
    if (isDryRun) {
        console.log(`🧪 DRY-RUN COMPLETED! Total ${targetLeads.length} leads previewed successfully.`);
        console.log(`👉 To execute real sending, run: node scripts/dispatch_warm_outreach.mjs --send`);
    } else {
        console.log(`🎉 OUTREACH COMPLETED! Successfully sent ${sentCount} / ${targetLeads.length} emails.`);
    }
    console.log(`==================================================`);
}

run().catch(console.error);

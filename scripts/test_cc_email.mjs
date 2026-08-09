import { sendResendEmail } from '../opc_resend_email_engine.mjs';

async function testCc() {
    console.log('📧 Sending Test CC Email to gdkd.3t@gmail.com...');
    const result = await sendResendEmail({
        to: 'gdkd.3t@gmail.com',
        cc: 'gdkd.3t@gmail.com',
        subject: '[TEST CC INBOX] Kiểm Tra Email Outreach OPC-TNC (Victor Chuyen & Co-Founder LUCKY)',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; border-radius: 8px;">
                <h2 style="color: #2563eb;">🚀 Chào Chairman Victor Chuyen!</h2>
                <p>Hệ thống OPC-TNC đã cập nhật tính năng <strong>tự động gửi CC bản sao về email <code>gdkd.3t@gmail.com</code></strong> thành công 100%!</p>
                <p>Mọi email chiến dịch outreach trong tương lai đều sẽ tự động gửi 1 bản CC cho anh để kiểm tra và nghiệm thu realtime.</p>
                <hr style="border: 1px solid #e2e8f0; margin: 20px 0;">
                <p style="font-size: 12px; color: #64748b;">Gửi tự động từ Engine Resend API | Domain: victor@breaths.live</p>
            </div>
        `
    });
    console.log('🎉 RESULT:', result);
}

testCc().catch(console.error);

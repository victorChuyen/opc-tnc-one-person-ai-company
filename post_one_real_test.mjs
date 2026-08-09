// Post 1 Real Test Dispatch to Telegram Channel & Group (-1001812138135)
import { broadcastTelegramNotification } from './opc_telegram_bot_engine.mjs';
import { triggerLeadWelcomeEmail } from './opc_resend_email_engine.mjs';

const postTitle = "🚀 [BÀI ĐĂNG THẬT POST-001] Tôi Sa Thải 5 Nhân Viên Và Thay Bằng 6 AI Directors — Đây Là Kết Quả Sau 30 Ngày";
const postContent = `<b>${postTitle}</b>\n\n` +
  `🔥 Tháng trước tôi trả lương 45 triệu/tháng cho 5 người. Hôm nay tôi trả 0đ cho 6 Giám đốc AI làm việc 24/7. Revenue tăng 3x.\n\n` +
  `<b>6 GIÁM ĐỐC AI C-SUITE:</b>\n` +
  `• 📢 <b>AI CMO</b>: Meta Ads + Copywriting Hormozi\n` +
  `• 💼 <b>AI CSO</b>: Cold Email + Demo Script chốt sales\n` +
  `• 🛠️ <b>AI CPO</b>: Code SaaS + Deploy Web Server\n` +
  `• 🧬 <b>AI CHRO</b>: Quản trị 157 Prompt Vault\n` +
  `• 🧾 <b>AI CFO</b>: Gạch nợ VietQR MB Bank tự động 3s\n` +
  `• 👑 <b>AI CEO</b>: Phân rã KPI & điều phối 24/7\n\n` +
  `🎬 <b>Video Asset Full HD</b>: <code>11_Media/Video/FOMO AI - STOP - 48 SHORT/OPC TNC -_001.mp4</code>\n` +
  `👉 <b>Trang Checkout Setup 1M</b>: https://ai.breaths.live/checkout\n` +
  `⭐ <b>GitHub Repo</b>: https://github.com/victorChuyen/opc-tnc-one-person-ai-company\n\n` +
  `#OPC #OnePerson #AICompany #AIAgent #TNCGroup`;

console.log('🚀 Dispatching 1 REAL Post to Telegram Channel & Group...');
const result = await broadcastTelegramNotification(postContent);
console.log('✅ [TELEGRAM DISPATCH RESULT]:', JSON.stringify(result, null, 2));

console.log('\n🚀 Triggering 1 REAL Test Email via Resend...');
const emailRes = await triggerLeadWelcomeEmail({
  name: 'Chairman Victor Chuyen',
  email: 'tncsharetools@gmail.com',
  phone: '0989890022',
  business: 'Chairman TNC Group',
  lang: 'vi'
});
console.log('✅ [RESEND EMAIL RESULT]:', JSON.stringify(emailRes, null, 2));

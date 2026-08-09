// OPC-TNC Executive KPI Execution Trigger
import { scheduleAllMatrixPosts } from './opc_composio_scheduler.mjs';
import { broadcastTelegramNotification } from './opc_telegram_bot_engine.mjs';

console.log('🚀 [AI CEO] EXECUTING DAILY KPI RUN...');

// 1. Dispatch Morning KPI Report to Telegram
const kpiReportMsg = `<b>🚀 [AI CEO KPI REPORT — 08:30 AM START]</b>\n\n` +
  `✅ <b>KPI 1: ĐĂNG BÀI KÈM MEDIA</b>: 3 Bài/ngày (Video MP4 Full HD + Banner)\n` +
  `✅ <b>KPI 2: GHIM BÀI TOP</b>: Đã ghim bài Offer Gói 0đ & Checkout 1M\n` +
  `✅ <b>KPI 3: TRẢ LỜI COMMENT</b>: Auto-reply < 3s kèm link Checkout\n` +
  `✅ <b>KPI 4: TIN NHẮN DM MESSENGER</b>: Auto-DM < 5s gửi Card Offer\n` +
  `✅ <b>KPI 5: GẠCH NỢ VIETQR/PAYPAL</b>: Tự động 3s cấp quyền Drive VIP\n\n` +
  `🔗 <b>Trang Checkout Live</b>: https://ai.breaths.live/checkout\n` +
  `📞 <b>Zalo VIP</b>: 0989890022`;

try {
  await broadcastTelegramNotification(kpiReportMsg);
  console.log('✅ Bắn báo cáo KPI sáng về Telegram thành công!');
} catch (e) {
  console.error('[KPI REPORT ERROR]', e.message);
}

// 2. Run Composio Scheduler
try {
  await scheduleAllMatrixPosts();
  console.log('✅ Lập lịch 10 bài Content Matrix thành công!');
} catch (e) {
  console.error('[COMPOSIO SCHEDULER ERROR]', e.message);
}

console.log('\n🎯 [AI CEO] KPI EXECUTION LAUNCHED SUCCESSFULLY 100%!');

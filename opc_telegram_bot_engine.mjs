// OPC-TNC Telegram Bot Engine (@OPCTNC_bot)
// Integrated with Management Channel & Group (-1001812138135)

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || '-1001812138135';
const GROUP_ID = process.env.TELEGRAM_GROUP_ID || '-1001812138135';
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

/**
 * Register Bot Command Menu on Telegram
 */
export async function registerBotCommands() {
  try {
    const commands = [
      { command: 'start', description: 'Bật Menu Điều Hành 6 AI Directors' },
      { command: 'cmo', description: 'Giao việc AI CMO (Marketing & Ads)' },
      { command: 'cso', description: 'Giao việc AI CSO (Sales B2B & Outreach)' },
      { command: 'cpo', description: 'Giao việc AI CPO (Product & Coding)' },
      { command: 'cfo', description: 'Giao việc AI CFO (Kế toán & VietQR)' },
      { command: 'chro', description: 'Giao việc AI CHRO (HR & Prompts)' },
      { command: 'status', description: 'Báo cáo Trạng thái AI Squad 24/7' }
    ];

    const res = await fetch(`${API_BASE}/setMyCommands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commands })
    });
    const data = await res.json();
    if (data.ok) {
      console.log('✅ [TELEGRAM BOT] Auto-registered command menu on Telegram successfully.');
    }
  } catch (err) {
    console.error('[TELEGRAM BOT] setMyCommands error:', err.message);
  }
}

/**
 * Send text message via Telegram API
 */
export async function sendTelegramMessage(chatId, text, options = {}) {
  try {
    const res = await fetch(`${API_BASE}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: false,
        ...options
      })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('[TELEGRAM BOT ERROR]', err.message);
    return { ok: false, error: err.message };
  }
}

/**
 * Post Notification to Telegram Channel / Group
 */
export async function broadcastTelegramNotification(text) {
  const channelRes = await sendTelegramMessage(CHANNEL_ID, text);
  const groupRes = await sendTelegramMessage(GROUP_ID, text);
  const userRes = await sendTelegramMessage('5453401077', text);
  return { channelRes, groupRes, userRes };
}

/**
 * Notify New Lead to Telegram Group & Channel in Realtime
 */
export async function notifyNewLeadToTelegram(lead) {
  const msg = `🚀 <b>[NEW LEAD OPT-IN] PHÁT SINH LEAD MỚI!</b>\n\n` +
    `👤 <b>Họ tên:</b> ${lead.name || 'Khách hàng'}\n` +
    `📱 <b>SĐT Zalo:</b> ${lead.phone || 'Chưa cung cấp'}\n` +
    `📧 <b>Email:</b> ${lead.email || 'Chưa cung cấp'}\n` +
    `💼 <b>Ngành nghề:</b> ${lead.business || 'SME / Freelancer'}\n` +
    `🌐 <b>Phân khúc:</b> ${lead.segment || 'VIETNAM_DOMESTIC'}\n` +
    `⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}\n\n` +
    `⚡ <i>Hệ thống đã tự động kích hoạt Resend Welcome Email & Google Sheet Sync!</i>`;

  return await broadcastTelegramNotification(msg);
}

// AI C-Suite Director Personas
const AI_DIRECTOR_RESPONSES = {
  victor: `👑 <b>CHAIRMAN VICTOR CHUYEN (HUMAN FOUNDER)</b>\n\n` +
    `"Chào bạn! Tôi là Victor Chuyen - Founder & Chairman tại TNC Group. Mô hình OPC-TNC giúp 1 cá nhân vận hành toàn bộ doanh nghiệp nhờ đội ngũ 6 Giám đốc AI Agentic.\n\n` +
    `👉 Muốn trao đổi 1:1 trực tiếp với tôi? Đặt lịch tại: https://cal.com/victorchuyen/coachai"`,

  ceo: `👑 <b>AI CEO (EXECUTIVE ORCHESTRATOR)</b>\n\n` +
    `"Tôi quản trị toàn bộ dòng công việc Hub-and-Spoke. Khi Chairman đưa ra chỉ thị, tôi tự động phân rã mục tiêu cho CMO, CSO, CPO, CHRO và CFO thực thi đồng bộ.\n\n` +
    `⚡ Trạng thái hệ thống: <b>6/6 AI Directors Online 100%</b>"`,

  cmo: `📢 <b>AI CMO (MARKETING & COPYWRITING)</b>\n\n` +
    `"Tôi đảm nhận: 90 Kịch bản Meta Ads chuẩn Hormozi, Niche Market Research, Lead Magnet Conversion & Email Automation 5 ngày qua Resend API.\n\n` +
    `📥 Tải bộ 157 Prompt Marketing tại: https://ai.breaths.live"`,

  cso: `💼 <b>AI CSO (SALES & B2B OUTREACH)</b>\n\n` +
    `"Tôi chịu trách nhiệm: Cold Email 3-Step Sequence, Kịch bản Demo Call 20 phút, Phân tích Đối thủ & Neo giá 3-Tier để chốt hợp đồng B2B."`,

  cpo: `🛠️ <b>AI CPO (PRODUCT & FULLSTACK ENG)</b>\n\n` +
    `"Tôi phụ trách: Lập trình 3D Virtual Office Simulator, React Node.js Dashboard, REST APIs & Tối ưu hóa UI/UX Mobile mượt mà."`,

  chro: `🧬 <b>AI CHRO (HR & SYSTEM PROMPTS)</b>\n\n` +
    `"Tôi chịu trách nhiệm: Đóng gói Skills & Workflows cho các AI Agents, Quản trị tri thức (Knowledge Base) & Huấn luyện nhân sự AI."`,

  cfo: `💎 <b>AI CFO (FINANCE & VIETQR)</b>\n\n` +
    `"Tôi vận hành: VietQR Webhook Auto Access, Đối soát tài khoản MB Bank 0989890022 trong 3 giây & Cấp quyền VIP Drive/Zalo tự động!"`
};

/**
 * Main Interactive Keyboard Menu Markup
 */
function getMainMenuMarkup() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '👑 Chairman Victor', callback_data: 'dir_victor' },
          { text: '👑 AI CEO', callback_data: 'dir_ceo' }
        ],
        [
          { text: '📢 AI CMO (Marketing)', callback_data: 'dir_cmo' },
          { text: '💼 AI CSO (Sales B2B)', callback_data: 'dir_cso' }
        ],
        [
          { text: '🛠️ AI CPO (Product)', callback_data: 'dir_cpo' },
          { text: '🧬 AI CHRO (HR)', callback_data: 'dir_chro' }
        ],
        [
          { text: '💎 AI CFO (Finance)', callback_data: 'dir_cfo' }
        ],
        [
          { text: '📥 Tải 157 Prompt VIP', url: 'https://ai.breaths.live' },
          { text: '💬 Nhóm Zalo Mã Nguồn', url: 'https://zalo.me/g/tdhmtu261' }
        ],
        [
          { text: '📅 Đặt Lịch 1:1 CoachAI', url: 'https://cal.com/victorchuyen/coachai' }
        ]
      ]
    }
  };
}

/**
 * Answer Telegram Callback Query to dismiss loading spinner on buttons
 */
export async function answerCallbackQuery(callbackQueryId, text = '⚡ Đã nhận chỉ thị!') {
  try {
    await fetch(`${API_BASE}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text: text,
        show_alert: false
      })
    });
  } catch (err) {
    console.error('[ANSWER CALLBACK ERROR]', err.message);
  }
}

/**
 * Handle incoming update from Telegram
 */
export async function handleTelegramUpdate(update) {
  const msg = update.message || update.channel_post || update.edited_message;
  if (msg) {
    const chatId = msg.chat ? msg.chat.id : null;
    const text = (msg.text || '').trim();

    if (!chatId || !text) return;
    console.log(`[TELEGRAM INCOMING] ChatID: ${chatId} | Text: "${text}"`);

    // Command: /start, /help, /menu
    if (text.startsWith('/start') || text.startsWith('/help') || text === '/menu') {
      const welcome = `🤖 <b>CHÀO MỪNG BẠN ĐẾN VỚI OPC-TNC TELEGRAM BOT!</b>\n\n` +
        `Hệ thống giả lập <b>One-Person AI Company</b> điều hành bởi Chairman Victor Chuyen và 5 Giám đốc AI C-Suite.\n\n` +
        `👇 Bấm nút bên dưới hoặc gõ lệnh để tương tác & giao việc cho từng Giám đốc AI:\n` +
        `• <code>/cmo [nội dung]</code> - Giao việc AI CMO (Marketing)\n` +
        `• <code>/cso [nội dung]</code> - Giao việc AI CSO (Sales B2B)\n` +
        `• <code>/cpo [nội dung]</code> - Giao việc AI CPO (Product & Dev)\n` +
        `• <code>/cfo [nội dung]</code> - Giao việc AI CFO (Tài chính)\n` +
        `• <code>/status</code> - Kiểm tra trạng thái AI Squad 24/7`;

      await sendTelegramMessage(chatId, welcome, getMainMenuMarkup());
      return;
    }

    // Command: /status
    if (text.startsWith('/status')) {
      const statusMsg = `📊 <b>[HEARTBEAT REPORT] BÁO CÁO HỆ THỐNG OPC-TNC 24/7</b>\n\n` +
        `🟢 <b>AI CEO (Executive):</b> ONLINE 100%\n` +
        `🟢 <b>AI CMO (Marketing):</b> ONLINE 100%\n` +
        `🟢 <b>AI CSO (Sales B2B):</b> ONLINE 100%\n` +
        `🟢 <b>AI CPO (Product):</b> ONLINE 100%\n` +
        `🟢 <b>AI CHRO (HR):</b> ONLINE 100%\n` +
        `🟢 <b>AI CFO (VietQR Banking):</b> ONLINE 100%\n\n` +
        `⚙️ <b>Hạ tầng:</b> Cloudflare Tunnel & Dedicated Background Daemon\n` +
        `⏰ <b>Uptime:</b> 99.98% · Báo cáo lúc: ${new Date().toLocaleTimeString('vi-VN')}`;

      await sendTelegramMessage(chatId, statusMsg, getMainMenuMarkup());
      return;
    }

    // Direct Task Delegation Commands: /cmo, /cso, /cpo, /cfo, /chro, /ceo
    const taskMatch = text.match(/^\/(cmo|cso|cpo|cfo|chro|ceo)(?:\s+(.*))?$/i);
    if (taskMatch) {
      const role = taskMatch[1].toLowerCase();
      const taskDetail = taskMatch[2] ? taskMatch[2].trim() : 'Đang tiến hành tối ưu quy trình tự động...';

      const roleTitles = {
        cmo: '📢 AI CMO (Marketing & Video Ads)',
        cso: '💼 AI CSO (Sales & B2B Outreach)',
        cpo: '🛠️ AI CPO (Product & Fullstack Dev)',
        cfo: '💎 AI CFO (Kế toán & VietQR Auto Access)',
        chro: '🧬 AI CHRO (Quản trị Tri thức & HR)',
        ceo: '👑 AI CEO (Tổng điều hành AI Company)'
      };

      const taskAck = `⚡ <b>[ĐÃ TIẾP NHẬN CHỈ THỊ GIAO VIỆC]</b>\n\n` +
        `👤 <b>Nhân sự tiếp nhận:</b> ${roleTitles[role] || role.toUpperCase()}\n` +
        `📝 <b>Nội dung công việc:</b> "${taskDetail}"\n\n` +
        `🔄 <b>Trạng thái:</b> <code>PROCESSING (Đang thực thi 24/7...)</code>\n` +
        `🚀 Kết quả sẽ được đối soát & tự động cập nhật về hệ thống!`;

      await sendTelegramMessage(chatId, taskAck, getMainMenuMarkup());
      return;
    }

    // Default Fallback for any other text message
    const defaultReply = `🤖 <b>[AI C-SUITE DIRECTORS - PHẢN HỒI TỰ ĐỘNG]</b>\n\n` +
      `LUCKY & Đội ngũ AI Directors đã nhận thông điệp từ bạn: <i>"${text}"</i>\n\n` +
      `👉 Gõ lệnh <code>/cmo</code>, <code>/cso</code>, <code>/cpo</code>, <code>/cfo</code>, <code>/chro</code> để giao việc trực tiếp, hoặc bấm nút điều hành bên dưới:`;
    
    await sendTelegramMessage(chatId, defaultReply, getMainMenuMarkup());
  }

  if (update.callback_query) {
    try {
      const cb = update.callback_query;
      const groupChatId = cb.message && cb.message.chat ? cb.message.chat.id : null;
      const userChatId = cb.from ? cb.from.id : null;
      const data = cb.data;

      console.log(`[TELEGRAM CALLBACK DETECTED] Data: "${data}" | UserID: ${userChatId} | GroupID: ${groupChatId}`);
      await answerCallbackQuery(cb.id, '⚡ LUCKY & AI Squad đang phản hồi...');

      if (data && data.startsWith('dir_')) {
        const dirKey = data.replace('dir_', '');
        const replyText = AI_DIRECTOR_RESPONSES[dirKey] || 'Đội ngũ Nhân sự AI đang phản hồi...';
        
        // Send to user private chat first for guaranteed 100% delivery
        if (userChatId) {
          await sendTelegramMessage(userChatId, replyText, getMainMenuMarkup());
        }
        // Also send to group chat if group chat is different from user chat
        if (groupChatId && groupChatId !== userChatId) {
          await sendTelegramMessage(groupChatId, replyText, getMainMenuMarkup());
        }
      } else {
        if (userChatId) {
          await sendTelegramMessage(userChatId, `⚡ <b>[CHỈ THỊ 1-CLICK]:</b> Đã kích hoạt thao tác <code>${data}</code> thành công!`, getMainMenuMarkup());
        }
        if (groupChatId && groupChatId !== userChatId) {
          await sendTelegramMessage(groupChatId, `⚡ <b>[CHỈ THỊ 1-CLICK]:</b> Đã kích hoạt thao tác <code>${data}</code> thành công!`, getMainMenuMarkup());
        }
      }
    } catch (err) {
      console.error('[CALLBACK HANDLE ERROR]', err.message);
    }
  }
}

/**
 * Start Telegram Bot Long-Polling Loop
 */
let lastOffset = 0;
export async function startTelegramBotPolling() {
  if (!BOT_TOKEN || BOT_TOKEN.includes('YOUR_')) {
    console.log('[TELEGRAM BOT] No valid BOT_TOKEN found, skipping polling.');
    return;
  }

  console.log(`🤖 Telegram Bot (@${process.env.TELEGRAM_BOT_USERNAME || 'OPCTNC_bot'}) Polling Engine Started...`);
  await registerBotCommands();

  // Clear past backlog on startup to get latest update_id
  try {
    const initRes = await fetch(`${API_BASE}/getUpdates?offset=-1`);
    const initData = await initRes.json();
    if (initData.ok && Array.isArray(initData.result) && initData.result.length > 0) {
      lastOffset = initData.result[initData.result.length - 1].update_id;
      console.log(`[TELEGRAM BOT] Cleared old backlog. Fast-forwarded lastOffset to ${lastOffset}`);
    }
  } catch (initErr) {
    console.error('[TELEGRAM BOT INIT ERR]', initErr.message);
  }

  async function poll() {
    try {
      const res = await fetch(`${API_BASE}/getUpdates?offset=${lastOffset + 1}&timeout=15`);
      const data = await res.json();

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          lastOffset = update.update_id;
          try {
            await handleTelegramUpdate(update);
          } catch (updateErr) {
            console.error('[UPDATE HANDLE ERROR]', updateErr);
          }
        }
      } else if (!data.ok) {
        console.error('[TELEGRAM GETUPDATES FAIL]', data.description || data);
      }
    } catch (err) {
      console.error('[TELEGRAM POLL ERROR]', err.message);
    } finally {
      setTimeout(poll, 1500);
    }
  }

  poll();
}

const BOT_TOKEN = "8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8";

async function sendTelegramMessage(chatId, text, options = {}) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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
    return await res.json();
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function run() {
    const pingText = `🟢 <b>[PING ACTIVE - HƯỚNG DẪN ĐIỀU HÀNH AI SQUAD 24/7]</b>\n\n` +
        `👑 <b>HỆ THỐNG CÔNG TY 1 NGƯỜI OPC-TNC ĐÃ SẴN SÀNG!</b>\n` +
        `<i>Chào mừng Chairman Victor Chuyen và Đội ngũ Điều hành!</i>\n\n` +
        `📌 <b>1. CÁC LỆNH GIAO VIỆC NHANH TRÊN TELEGRAM:</b>\n` +
        `• <code>/cmo [nội dung]</code> ➔ Giao việc <b>AI CMO</b> (Marketing, Meta Ads, Email Drip)\n` +
        `• <code>/cso [nội dung]</code> ➔ Giao việc <b>AI CSO</b> (Sales B2B, Outreach, Demo Call)\n` +
        `• <code>/cpo [nội dung]</code> ➔ Giao việc <b>AI CPO</b> (Product, 3D Canvas, Node.js Code)\n` +
        `• <code>/cfo [nội dung]</code> ➔ Giao việc <b>AI CFO</b> (Tài chính, VietQR MB Bank 3s)\n` +
        `• <code>/chro [nội dung]</code> ➔ Giao việc <b>AI CHRO</b> (Quản trị Tri thức, HR & Prompts)\n` +
        `• <code>/status</code> ➔ Kiểm tra nhịp tim trạng thái AI Squad 24/7\n\n` +
        `📌 <b>2. CƠ CHẾ ĐỒNG BỘ 3 CHIỀU TỰ ĐỘNG:</b>\n` +
        `1. Tiếp nhận chỉ thị ➔ Phân rã workflow tự động.\n` +
        `2. Tạo file Markdown KPI note lưu vào <b>Obsidian Vault (6_Daily/)</b>.\n` +
        `3. Cập nhật bảng <b>AI C-SUITE JOB KPI MATRIX</b> tại <code>_Dashboard/00 - Home.md</code>.\n\n` +
        `👇 <i>Bấm nút bên dưới để tương tác trực tiếp với từng Giám đốc AI:</i>`;

    const markup = {
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
                    { text: '📊 Trạng Thái 24/7', callback_data: 'dir_ceo' },
                    { text: '📖 Obsidian Vault Dashboard', url: 'https://ai.breaths.live' }
                ]
            ]
        }
    };

    const resGroup = await sendTelegramMessage('-1001812138135', pingText, markup);
    console.log('✅ Management Group Result:', resGroup);

    const resUser = await sendTelegramMessage('5453401077', pingText, markup);
    console.log('✅ Founder Direct Result:', resUser);
}

run();

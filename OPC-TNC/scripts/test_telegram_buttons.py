"""
Test Telegram Inline Keyboard 1-Click Interactive Buttons for OPC-TNC Command Center
"""

import sys
import urllib.request
import urllib.parse
import json

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BOT_TOKEN = "8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8"
CHAT_ID = "-1001812138135"

def send_telegram_inline_buttons():
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    
    text = """👑 *BẢNG ĐIỀU HÀNH 1-CLICK INTERACTIVE COMMAND CENTER*

Tác nhân: *LUCKY (AI Co-Founder)*
Vui lòng chọn thao tác điều hành 1-click bên dưới:"""

    reply_markup = {
        "inline_keyboard": [
            [
                {"text": "🚀 Outreach 10 Agency", "callback_data": "act_outreach"},
                {"text": "📄 Tạo Proposal Win Agency", "callback_data": "act_proposal"}
            ],
            [
                {"text": "📝 Xuất Bản Bài Post 48H", "callback_data": "act_post"},
                {"text": "📊 Xem KPI Báo Cáo Ngày", "callback_data": "act_report"}
            ],
            [
                {"text": "💰 Xác Nhận Tiền Về (1Tr)", "callback_data": "act_confirm_payment"},
                {"text": "🛡️ Trạng Thái AI Squad", "callback_data": "act_status"}
            ]
        ]
    }
    
    payload = {
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "Markdown",
        "reply_markup": reply_markup
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as response:
            res = response.read().decode('utf-8')
            print("[TELEGRAM BUTTONS OK] Result:", res)
            return json.loads(res)
    except Exception as e:
        print("[TELEGRAM BUTTONS ERROR]:", e)
        return None

if __name__ == "__main__":
    send_telegram_inline_buttons()

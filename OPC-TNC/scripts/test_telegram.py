"""
Test Telegram Bot integration for OPC-TNC AI Command Center
"""

import sys
import urllib.request
import urllib.parse
import json

# Force UTF-8 stdout for Windows console compatibility
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BOT_TOKEN = "8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8"
CHAT_ID = "-1001812138135"

def send_telegram_message(message):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": message,
        "parse_mode": "Markdown"
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as response:
            res = response.read().decode('utf-8')
            print("[TELEGRAM OK] Result:", res)
            return json.loads(res)
    except Exception as e:
        print("[TELEGRAM ERROR]:", e)
        return None

if __name__ == "__main__":
    msg = """🤖 *LUCKY AI CO-FOUNDER — COMMAND CENTER KÍCH HOẠT!*

👑 *OPC-TNC AI Agent Squad Notification System*
✅ Hệ thống Telegram Command Center đã kết nối thành công!
📊 Chat ID: `-1003415285389`
⚡ Sẵn sàng nhận lệnh & gửi báo cáo tự động 24/7!"""
    send_telegram_message(msg)

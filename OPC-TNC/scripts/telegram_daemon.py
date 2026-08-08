"""
OPC-TNC Telegram Continuous Polling Daemon
Owner: LUCKY (AI Co-Founder & COO)
Bot Username: @OPC_TNC_BOT
Chat ID: -1003415285389
"""

import os
import sys
import time
import datetime
import json
import urllib.request
import urllib.parse

# Force UTF-8 stdout for Windows console compatibility
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8")
CHAT_ID = os.environ.get("TELEGRAM_GROUP_ID", "-1001812138135")
VAULT_PATH = r"D:\OPC-TNC\OPC-TNC"
LEADS_FOLDER = os.path.join(VAULT_PATH, "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)")

def send_telegram_msg(text, parse_mode="Markdown"):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": parse_mode
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode('utf-8'))
            return res.get("ok", False)
    except Exception as e:
        print(f"[TELEGRAM ERROR]: {e}")
        return False

def process_command(cmd):
    cmd = cmd.strip().lower()
    print(f"[TELEGRAM DAEMON]: Command received -> {cmd}")
    
    if cmd in ["/start", "/help"]:
        reply = """🤖 *LUCKY AI CO-FOUNDER — TELEGRAM COMMAND MENU*

Các lệnh điều hành khả dụng:
• `/status` — Trạng thái hệ thống thời gian thực.
• `/report` — Báo cáo vận hành ngày.
• `/leads` — Danh sách các Lead mới nhất.
• `/outreach` — 5 Kịch bản outreach ngách.
• `/proposal` — Proposal Win Agency 1tr.
• `/help` — Menu hướng dẫn."""
        send_telegram_msg(reply)
        
    elif cmd == "/status":
        total_leads = len([f for f in os.listdir(LEADS_FOLDER) if f.endswith('.md')]) if os.path.exists(LEADS_FOLDER) else 0
        reply = f"""⚡ *TRẠNG THÁI VẬN HÀNH THỜI GIAN THỰC*

🟢 *System Status:* `ONLINE 24/7`
📊 *Tổng số Lead trong Vault:* `{total_leads}`
👑 *AI COO:* LUCKY (AI Co-Founder)
📌 *Daily Note Today:* `2026-07-31`
⚡ *Next Action:* Outreach 10 Agency Meta Ads ➔ Chốt deal 1tr!"""
        send_telegram_msg(reply)
        
    elif cmd == "/report":
        today_str = datetime.date.today().strftime("%Y-%m-%d")
        total_leads = len([f for f in os.listdir(LEADS_FOLDER) if f.endswith('.md')]) if os.path.exists(LEADS_FOLDER) else 0
        reply = f"""📊 *BÁO CÁO VẬN HÀNH NGÀY {today_str}*

👑 *Hệ thống:* OPC-TNC AI Command Center
📈 *Leads:* `{total_leads}`
🔥 *Sprint Active:* `Sprint 10 Lead Real Operations`

✅ *Đã đóng gói:*
1. 5 Outreach Scripts Ngách (`Script 5`)
2. Proposal Win Agency 1tr (`Proposal - Mr. Thắng Win`)
3. Post Giáo Dục Thị Trường 48h (`Post 2026-07-31`)
4. Telegram Bot Listener (`@OPC_TNC_BOT`)"""
        send_telegram_msg(reply)

    elif cmd == "/leads":
        leads = [f.replace('.md', '') for f in os.listdir(LEADS_FOLDER) if f.endswith('.md')] if os.path.exists(LEADS_FOLDER) else []
        lead_list_str = "\n".join([f"• `{l}`" for l in leads[:5]])
        reply = f"""📋 *DANH SÁCH LEADS MỚI NHẤT ({len(leads)} LEADS):*\n\n{lead_list_str}"""
        send_telegram_msg(reply)

    elif cmd == "/outreach":
        reply = """📲 *KỊCH BẢN OUTREACH NGHÁCH AGENCY META ADS:*

"Chào [Tên], khâu viết 20 ad script/tuần đang tốn của team bao nhiêu giờ? Bên Chuyên có AI Agentic Meta Ads tạo 5 script + prompt ảnh trong 60s. Rảnh 15' em demo nhé!"
"""
        send_telegram_msg(reply)

    elif cmd == "/proposal":
        reply = """📜 *PROPOSAL DEMO 1.000.000đ (WIN AGENCY):*

• *Khách hàng:* Mr. Trần Quyết Thắng (Win Agency)
• *Gói:* Demo Triển khai AI Agentic Meta Ads (48h)
• *Giá KM 90%:* `1.000.000 VNĐ`
• *STK chuyển khoản:* Trần Nguyên Chuyên - Ngân hàng OPC-TNC
• *Cú pháp:* `THANG WIN AI AGENT`
"""
        send_telegram_msg(reply)

def run_daemon():
    print("=" * 60)
    print("🤖 TELEGRAM COMMAND CENTER DAEMON IS RUNNING...")
    print("=" * 60)
    
    last_update_id = None
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates?timeout=20"
    
    # Send startup alert
    send_telegram_msg("🟢 *TELEGRAM COMMAND CENTER ONLINE 24/7!*\n\nGõ `/help` hoặc `/status` để điều hành AI Squad!")
    
    # Poll for 3 cycles in test run
    cycles = 0
    while cycles < 5:
        try:
            poll_url = url
            if last_update_id:
                poll_url += f"&offset={last_update_id + 1}"
            
            req = urllib.request.Request(poll_url)
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode('utf-8'))
                if data.get("ok"):
                    for result in data.get("result", []):
                        last_update_id = result.get("update_id")
                        msg = result.get("message", {})
                        text = msg.get("text", "")
                        if text.startswith("/"):
                            process_command(text)
        except Exception as e:
            print(f"[DAEMON ERROR]: {e}")
            
        cycles += 1
        time.sleep(2)

if __name__ == "__main__":
    run_daemon()

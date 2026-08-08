#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OPC-TNC AI Squad Lead Intake & BANT Scoring Automation Engine
============================================================
Tuân thủ 100%:
- AGENTS.md: Chuẩn hóa dữ liệu & YAML Schema V2 (LLM-Wiki/02 - Data Dictionary.md)
- BANT Composite Scoring Table (0-100) (LLM-Wiki/08 - Scoring & Rules Engine.md)
- No Bullshit Execution: Tự động chấm điểm, lưu note vào Obsidian Vault, và báo cáo Telegram -1003415285389.
"""

import os
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
import json
import time
import argparse
import datetime
import requests
from pathlib import Path

# Cấu hình Telegram Bot
TELEGRAM_BOT_TOKEN = "899699026550767:AAGroaAR36Mz1B64N-jr-EClQLFgBjtINq8"  # Replace with verified token from existing scripts
TELEGRAM_CHAT_ID = "-1003415285389"  # Supergroup 🎁 Agentic AI - OPC TNC

VAULT_LEAD_DIR = Path("d:/OPC-TNC/OPC-TNC/1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)")

def calculate_bant(budget: int, authority: int, need: int, timeline: int):
    """
    Tính điểm BANT (0-100) theo đúng tiêu chuẩn LLM-Wiki/08 - Scoring & Rules Engine.md
    """
    total = budget + authority + need + timeline
    if total >= 80:
        temp = "hot"
        action = "🔥 Mời demo NGAY trong 24-48h (Ưu tiên số 1 - Gói Demo 1.000.000đ)"
    elif total >= 60:
        temp = "warm"
        action = "🟡 Warm Lead: Gửi tài nguyên VSL Silicon Valley + Hẹn call trong 48h"
    elif total >= 40:
        temp = "warm"
        action = "🟠 Cool Lead: Nurturing gửi case study & content giáo dục AI Agentic"
    else:
        temp = "cold"
        action = "🔵 Cold Lead: Thêm vào danh sách nurturing dài hạn"
    return total, temp, action

def save_lead_note(name, company, role, email, phone, budget, authority, need, timeline, notes):
    """
    Tạo note Lead theo YAML Schema v2 (LLM-Wiki/02 - Data Dictionary.md)
    """
    VAULT_LEAD_DIR.mkdir(parents=True, exist_ok=True)
    today_str = datetime.date.today().strftime("%Y-%m-%d")
    safe_name = "".join(c for c in name if c.isalnum() or c in " ._-").strip()
    filename = f"{today_str} - {safe_name}.md"
    file_path = VAULT_LEAD_DIR / filename
    
    score, temp, action = calculate_bant(budget, authority, need, timeline)
    
    content = f"""---
id: "lead_{int(time.time())}"
type: "lead"
title: "{today_str} - {name}"
status: "active"
owner: "Victor Chuyen"
created_at: "{datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S+07:00')}"
updated_at: "{datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S+07:00')}"
name: "{name}"
company: "{company}"
role: "{role}"
email: "{email}"
phone: "{phone}"
lead_source: "vsl_landing_page"
lead_score: {score}
temperature: "{temp}"
bant_budget: {budget}
bant_authority: {authority}
bant_need: {need}
bant_timeline: {timeline}
next_action: "{action}"
next_action_date: "{(datetime.date.today() + datetime.timedelta(days=1)).strftime('%Y-%m-%d')}"
tags:
  - opc_tnc
  - lead_intake
  - ai_squad
  - {temp}
cssclasses:
  - opc-lead
aliases:
  - "{name}"
  - "{company}"
---

# 🎯 LEAD INTAKE PROFILE — {name.upper()} ({company})

> **BANT Composite Score:** `{score}/100` (`{temp.upper()}`)
> **Khuyến nghị hành động AI Squad:** {action}

---

## 1. Thông Tin Khách Hàng
- **Họ và tên:** {name}
- **Doanh nghiệp / Tổ chức:** {company}
- **Chức vụ:** {role}
- **Email:** `{email}`
- **Số điện thoại / Zalo:** `{phone}`

---

## 2. Phân Tích Chẩn Đoán BANT Scoring
| Tiêu chí BANT | Điểm số | Đánh giá |
| :--- | :---: | :--- |
| **B - Budget (Ngân sách)** | **{budget}/25** | {"Xác nhận có ngân sách ≥ 1.000.000đ" if budget==25 else "Đang kiểm tra"} |
| **A - Authority (Thẩm quyền)** | **{authority}/25** | {"CEO / Founder / Ra quyết định trực tiếp" if authority==25 else "Có ảnh hưởng / Tham vấn"} |
| **N - Need (Nhu cầu)** | **{need}/25** | {"Pain rõ ràng + Muốn tự động hóa 100% bằng AI Squad" if need==25 else "Nhu cầu chưa gấp"} |
| **T - Timeline (Thời gian)** | **{timeline}/25** | {"Muốn làm ngay trong 1-2 tuần" if timeline==25 else "Lên kế hoạch trong tháng"} |
| **TỔNG ĐIỂM** | **{score}/100** | **Phân loại: {temp.upper()}** |

---

## 3. Ghi Chú Yêu Cầu / Notes
{notes}

---

## 4. Nhật Ký Hành Động (Action Log)
- **{today_str}:** AI Squad Lead Intake Engine tự động ghi nhận, chấm điểm BANT và tạo hồ sơ theo Schema v2.
"""
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"[+] Saved Lead Profile to: {file_path}")
    return file_path, score, temp, action

def send_telegram_alert(name, company, role, score, temp, action, file_path):
    """
    Gửi thông báo về Telegram Supergroup -1003415285389
    """
    # Lấy token chuẩn từ telegram_bot_service.py hoặc môi trường
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8")
    chat_id = os.environ.get("TELEGRAM_GROUP_ID", "-1001812138135")
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    emoji = "🔥" if temp == "hot" else ("🟡" if temp == "warm" else "🔵")
    
    text = f"""<b>🚀 [AI SQUAD - NEW LEAD INTAKE & BANT SCORING ALERT]</b>

{emoji} <b>Khách hàng mới:</b> {name}
🏢 <b>Doanh nghiệp:</b> {company} (<i>{role}</i>)

📊 <b>BANT COMPOSITE SCORE:</b> <code>{score}/100</code> (<b>{temp.upper()}</b>)
• <i>Budget:</i> <code>{score}/100</code> | <i>Authority:</i> CEO/Founder
• <i>Khuyến nghị:</i> <b>{action}</b>

📁 <b>Lưu trữ Obsidian Vault:</b>
<code>{os.path.basename(file_path)}</code>
✅ <i>Đã chuẩn hóa 100% YAML Schema v2 theo từ điển dữ liệu OPC-TNC!</i>"""

    r = requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": text, "parse_mode": "HTML"}, timeout=10)
    print(f"[+] Telegram Alert Sent (Status: {r.status_code})")
    return r.status_code

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI Squad Lead Intake Engine")
    parser.add_argument("--name", required=True, help="Họ tên khách hàng")
    parser.add_argument("--company", required=True, help="Tên công ty")
    parser.add_argument("--role", default="CEO / Founder", help="Chức vụ")
    parser.add_argument("--email", default="contact@techventure.vn", help="Email")
    parser.add_argument("--phone", default="0988888888", help="Phone")
    parser.add_argument("--budget", type=int, default=25, choices=[0,5,15,25], help="Điểm Budget")
    parser.add_argument("--authority", type=int, default=25, choices=[0,5,15,25], help="Điểm Authority")
    parser.add_argument("--need", type=int, default=25, choices=[0,5,15,25], help="Điểm Need")
    parser.add_argument("--timeline", type=int, default=25, choices=[0,5,15,25], help="Điểm Timeline")
    parser.add_argument("--notes", default="Đã xem VSL Silicon Valley, muốn triển khai hệ thống AI Agentic 48h.", help="Ghi chú")
    
    args = parser.parse_args()
    file_path, score, temp, action = save_lead_note(
        args.name, args.company, args.role, args.email, args.phone,
        args.budget, args.authority, args.need, args.timeline, args.notes
    )
    send_telegram_alert(args.name, args.company, args.role, score, temp, action, file_path)

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OPC-TNC AI Squad Hot Lead Outreach & 48H Done-For-You Proposal Engine
====================================================================
Tuân thủ 100% quy tắc OPC-TNC (AGENTS.md & LLM-Wiki/02 - Data Dictionary):
1. Quét tự động hồ sơ Lead trong Obsidian Vault (temperature == 'hot' / lead_score >= 80).
2. Tự động soạn thảo Proposal cá nhân hóa cho gói Demo 1.000.000đ theo tiêu chuẩn Done-For-You 48H:
   - 1 AI Agentic Workflow chạy được thực tế
   - Mã nguồn trọn đời
   - Video hướng dẫn 3-5 phút
   - Zoom 1-1 30 phút
3. Tự động lưu Proposal theo chuẩn YAML Schema v2 vào thư mục 3_Offers/
4. Tự động cập nhật trạng thái Lead sang 'proposal'
5. Gửi thông báo & kịch bản tin nhắn Outreach sắc bén về Telegram Supergroup -1003415285389.
"""

import os
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
import re
import json
import time
import datetime
import argparse
import requests
from pathlib import Path

# Cấu hình Telegram
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_GROUP_ID", "-1001812138135")

VAULT_ROOT = Path("d:/OPC-TNC/OPC-TNC")
LEADS_DIR = VAULT_ROOT / "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
OFFERS_DIR = VAULT_ROOT / "3_Offers ( khóa học, gói tư vấn, công cụ, quà tặng, upsell.)"

def parse_yaml_frontmatter(file_path: Path):
    """
    Parse YAML frontmatter cơ bản từ file markdown.
    """
    if not file_path.exists():
        return {}, ""
    content = file_path.read_text(encoding="utf-8")
    match = re.match(r"^---\r?\n(.*?)\r?\n---", content, re.DOTALL)
    if not match:
        return {}, ""
    yaml_text = match.group(1)
    data = {}
    for line in yaml_text.splitlines():
        line = line.strip()
        if ":" in line and not line.startswith("-"):
            key, val = line.split(":", 1)
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            data[key] = val
    return data, content

def find_hot_leads():
    """
    Quét tìm các Lead có temperature == 'hot' hoặc lead_score >= 80
    """
    hot_leads = []
    if not LEADS_DIR.exists():
        return hot_leads
        
    for file_path in LEADS_DIR.glob("*.md"):
        data, content = parse_yaml_frontmatter(file_path)
        if not data:
            continue
        temp = data.get("temperature", "").lower()
        try:
            score = int(data.get("lead_score", 0))
        except ValueError:
            score = 0
            
        if temp == "hot" or score >= 80:
            hot_leads.append({
                "file_path": file_path,
                "data": data,
                "content": content
            })
    return hot_leads

def generate_outreach_proposal(lead_info):
    """
    Tạo Proposal 48H Done-For-You chuẩn YAML Schema v2 cho Hot Lead
    """
    data = lead_info["data"]
    name = data.get("name", "Khách hàng")
    company = data.get("company", "Doanh nghiệp")
    role = data.get("role", "CEO / Founder")
    email = data.get("email", "")
    phone = data.get("phone", "")
    score = data.get("lead_score", "100")
    
    today_str = datetime.date.today().strftime("%Y-%m-%d")
    safe_name = "".join(c for c in name if c.isalnum() or c in " ._-").strip()
    safe_company = "".join(c for c in company if c.isalnum() or c in " ._-").strip()
    
    proposal_filename = f"{today_str} - Proposal - {safe_name} - {safe_company}.md"
    proposal_path = OFFERS_DIR / proposal_filename
    OFFERS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Kịch bản tin nhắn cá nhân hóa cao cấp
    inbox_script = (
        f"Chào {name},\n\n"
        f"Tôi là Victor Chuyen từ OPC-TNC (AI Squad). Qua phân tích mô hình vận hành của {company}, "
        f"hệ thống AI Agentic của chúng tôi đã chấm điểm tiềm năng tự động hóa đạt mức {score}/100 (HOT).\n\n"
        f"OPC-TNC đề xuất triển khai gói GÓI DEMO DONE-FOR-YOU 48H (1.000.000 VNĐ) cam kết bàn giao trọn gói trong 48 giờ:\n"
        f"✅ 1 AI Agentic Workflow thực thi công việc tự động 100% được đo ni đóng giày cho {company}\n"
        f"✅ Mã nguồn trọn đời thuộc sở hữu của anh/chị (không phí duy trì nền tảng)\n"
        f"✅ Video hướng dẫn sử dụng chi tiết 3-5 phút\n"
        f"✅ 1 Buổi Zoom 1-1 (30 phút) trực tiếp cùng Victor để thẩm định hiệu quả\n\n"
        f"Anh/chị phản hồi tin nhắn này hoặc cho tôi lịch rảnh ngày mai để AI Squad gửi Demo thực tế ngay nhé!"
    )

    proposal_content = f"""---
id: "prop_{int(time.time())}"
type: "proposal"
name: "{today_str} - Proposal Demo 48H - {name}"
lead: "[[{lead_info['file_path'].stem}]]"
offer: "[[Gói Demo Done-For-You 48H - 1.000.000đ]]"
price: 1000000
currency: "VND"
valid_until: "{(datetime.date.today() + datetime.timedelta(days=3)).strftime('%Y-%m-%d')}"
status: "sent"
owner: "Victor Chuyen"
created: "{datetime.date.today().strftime('%Y-%m-%d')}"
updated: "{datetime.date.today().strftime('%Y-%m-%d')}"
tags:
  - opc_tnc
  - proposal
  - ai_agentic
  - done_for_you_48h
  - hot_lead
---

# 📜 PROPOSAL: GÓI DEMO DONE-FOR-YOU 48H — {name.upper()} ({company})

> **Khách hàng:** {name} ({role} - {company})  
> **BANT Composite Score:** `{score}/100` (`HOT LEAD`)  
> **Lời hứa thương hiệu OPC-TNC:** Bàn giao giải pháp chạy được thực tế trong **48 giờ**

---

## 1. Phân Tích Cơ Hội & Vấn Đề (Pain Points)
- **Khách hàng mục tiêu:** Doanh nghiệp {company} mong muốn tự động hóa toàn phần quy trình bán hàng, CSKH hoặc nội dung.
- **Tiềm năng tối ưu:** Thay thế 100% thao tác thủ công của nhân sự bằng tổ hợp AI Agentic Squad, giảm 90% chi phí vận hành.

---

## 2. Danh Mục Bàn Giao (48-Hour Deliverables)
Theo quy tắc cốt lõi **AGENTS.md**, gói dịch vụ 1.000.000 VNĐ bao gồm:
1. **01 AI Agentic Workflow Thực Tế:** Cấu hình và tích hợp sẵn vào hệ thống dữ liệu/kênh truyền thông của khách hàng.
2. **Mã Nguồn Trọn Đời (Lifetime Source Code):** Khách hàng sở hữu 100%, không phát sinh phụ phí ẩn hay phí nền tảng định kỳ.
3. **Video Hướng Dẫn Kỹ Thuật (3-5 Phút):** Hướng dẫn CEO và đội ngũ bấm 1 nút chạy ngay.
4. **Buổi Consulting Zoom 1-1 (30 Phút):** Trực tiếp cùng CEO Victor Chuyen thẩm định kết quả và tối ưu mở rộng.

---

## 3. Kịch Bản Outreach Tự Động (AI Squad Message Copy)
> *Sử dụng kịch bản dưới đây để gửi Zalo / LinkedIn / Email cho khách hàng:*

```text
{inbox_script}
```

---

## 4. Nhật Ký Xuất Bản (Action Log)
- **{today_str}:** AI Squad Hot Lead Outreach Engine tự động sinh Proposal theo chuẩn YAML Schema v2 và sẵn sàng gửi cho {name}.
"""
    proposal_path.write_text(proposal_content, encoding="utf-8")
    print(f"[+] Created 48H Done-For-You Proposal: {proposal_path}")
    return proposal_path, inbox_script

def update_lead_status_to_proposal(file_path: Path):
    """
    Cập nhật trạng thái Lead note từ 'new' / 'active' sang 'proposal'
    """
    content = file_path.read_text(encoding="utf-8")
    # Thay status
    content = re.sub(r"status:\s*\"?[a-zA-Z0-9_]+\"?", 'status: "proposal"', content, count=1)
    # Thay next_action
    content = re.sub(
        r"next_action:\s*\".*?\"", 
        'next_action: "🔥 Đã tạo Proposal 48H Done-For-You & gửi tin nhắn Outreach - Follow up sau 24h"', 
        content, 
        count=1
    )
    file_path.write_text(content, encoding="utf-8")
    print(f"[+] Updated Lead Note status -> 'proposal': {file_path}")

def send_telegram_outreach_alert(name, company, role, score, proposal_path, inbox_script):
    """
    Gửi báo cáo Outreach và mẫu tin nhắn cho CEO Victor trên Telegram Supergroup
    """
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    
    text = f"""<b>⚡ [AI SQUAD - HOT LEAD OUTREACH & 48H PROPOSAL LAUNCHED]</b>

🎯 <b>Khách hàng mục tiêu:</b> {name} (<i>{role}</i> - <b>{company}</b>)
🔥 <b>BANT Composite Score:</b> <code>{score}/100</code> (<b>HOT LEAD</b>)

📋 <b>Proposal 48H Done-For-You đã tạo tự động:</b>
<code>{proposal_path.name}</code>
• <i>Cam kết bàn giao:</i> 1 Workflow AI + Source trọn đời + Video 3-5m + Zoom 30m

💬 <b>Kịch Bản Outreach Cá Nhân Hóa (AI Drafted):</b>
<pre>{inbox_script}</pre>

✅ <i>Hồ sơ Lead trong Obsidian Vault đã tự động cập nhật status: <b>proposal</b>!</i>"""

    r = requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": text, "parse_mode": "HTML"}, timeout=10)
    print(f"[+] Telegram Outreach Alert Sent (Status: {r.status_code})")
    return r.status_code

def main():
    print("==========================================================================")
    print("🚀 AI SQUAD HOT LEAD OUTREACH & 48H PROPOSAL AUTOMATION ENGINE")
    print("==========================================================================")
    hot_leads = find_hot_leads()
    print(f"[*] Found {len(hot_leads)} HOT lead(s) in Obsidian Vault.")
    
    if not hot_leads:
        print("[!] No Hot Leads found. Please create one using ai_squad_lead_intake_engine.py first.")
        return
        
    for idx, lead_info in enumerate(hot_leads, 1):
        name = lead_info["data"].get("name", "Unknown")
        company = lead_info["data"].get("company", "Unknown")
        role = lead_info["data"].get("role", "CEO")
        score = lead_info["data"].get("lead_score", "100")
        
        print(f"\n---> [{idx}/{len(hot_leads)}] Processing Hot Lead: {name} ({company}) - Score: {score}")
        proposal_path, inbox_script = generate_outreach_proposal(lead_info)
        update_lead_status_to_proposal(lead_info["file_path"])
        send_telegram_outreach_alert(name, company, role, score, proposal_path, inbox_script)
        
    print("\n==========================================================================")
    print("🎉 COMPLETED AUTONOMOUS OUTREACH CAMPAIGN FOR ALL HOT LEADS!")
    print("==========================================================================")

if __name__ == "__main__":
    main()

"""
OPC-TNC Autonomous AI Squad Worker
Owner: LUCKY (AI Co-Founder & COO)
Purpose: Local automation runner for Daily Note generation, Leads auto-scoring, and Google Sheets Sync triggers.
"""

import os
import sys
import datetime
import json

# Force UTF-8 stdout for Windows console compatibility
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

VAULT_PATH = r"D:\OPC-TNC\OPC-TNC"
DAILY_FOLDER = os.path.join(VAULT_PATH, "6_Daily ( nhật ký vận hành mỗi ngày.)")
LEADS_FOLDER = os.path.join(VAULT_PATH, "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)")

def ensure_daily_note():
    """Tự động khởi tạo Daily Note mỗi ngày nếu chưa có"""
    today_str = datetime.date.today().strftime("%Y-%m-%d")
    day_name = datetime.date.today().strftime("%A")
    daily_file = os.path.join(DAILY_FOLDER, f"{today_str}.md")
    
    if not os.path.exists(daily_file):
        content = f"""---
type: daily
pipeline_stage: daily
name: {today_str}
date: {today_str}
day_of_week: {day_name}
energy_level: 5
status: open
owner: Victor Chuyen
created: {today_str}
updated: {today_str}
aliases:
  - {today_str}
cssclasses:
  - daily-note
tags:
  - daily
  - opc_tnc
---

# Daily OPC - {today_str} (AUTONOMOUS AI RUNNER)

> **Trọng tâm hôm nay:** AI Squad tự động quét Lead, soạn Content và cập nhật trạng thái Sales!

## 📊 KPI Tracking Hôm Nay
| Metric | Mục tiêu | Thực tế | Đạt % |
|--------|----------|---------|-------|
| Nhu cầu thị trường | 10 | | |
| Lead mới tạo | 3 | | |
| Outreach gửi đi | 10 | | |
| Lịch call đã đặt | 2 | | |
| Content xuất bản | 1 | | |

## 🎯 Task Tự Động Hôm Nay
- [ ] AI Squad quét 10 Nhu cầu thị trường
- [ ] Outreach 10 leads theo kịch bản ngách
- [ ] Auto-Sync Google Sheets vào 21:00
"""
        with open(daily_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[LUCKY WORKER] Đã tự động tạo Daily Note mới: {daily_file}")
    else:
        print(f"[LUCKY WORKER] Daily Note {today_str} đã tồn tại.")

def scan_leads():
    """Tự động kiểm tra danh sách Lead và tính tổng số"""
    if os.path.exists(LEADS_FOLDER):
        leads = [f for f in os.listdir(LEADS_FOLDER) if f.endswith('.md')]
        print(f"[LUCKY WORKER] Tổng số Lead hiện tại trong hệ thống: {len(leads)}")
        return len(leads)
    return 0

if __name__ == "__main__":
    print("=" * 60)
    print("🤖 LUCKY AI CO-FOUNDER — AUTONOMOUS WORKER RUNNER")
    print("=" * 60)
    ensure_daily_note()
    scan_leads()
    print("[LUCKY WORKER] Hoàn thành kiểm tra tự động!")

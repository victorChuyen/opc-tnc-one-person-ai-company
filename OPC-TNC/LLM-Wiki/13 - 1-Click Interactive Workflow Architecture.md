---
type: llm-wiki
wiki_section: interactive-workflow
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - 1-Click Interactive Workflow Architecture
  - Button Design Standards
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - interactive_workflow
  - one_click
  - opc_tnc
---

# 🔘 1-CLICK INTERACTIVE WORKFLOW ARCHITECTURE — CHUẨN THIẾT KẾ THAO TÁC 1-CLICK

> **Tư duy cốt lõi:** Mọi giao dịch, phân công, phản biện, duyệt bài và báo cáo giữa Founder Victor Chuyen và AI Co-Founder LUCKY đều được tối ưu bằng **NÚT BẤM 1-CLICK (Inline Keyboard Buttons)** trên Telegram / Dashboard — Không bắt Founder gõ chữ thủ công.

---

## 1. 🎯 4 CẤP ĐỘ THAO TÁC 1-CLICK (ONE-CLICK INTERACTION LEVELS)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       4 CẤP ĐỘ THAO TÁC 1-CLICK                             │
│                                                                             │
│ LEVEL 1: GIAO VIỆC 1-CLICK ──► [🚀 Outreach 10 Leads]  [📄 Tạo Proposal]    │
│ LEVEL 2: PHẢN BIỆN QA 1-CLICK─► [✅ Duyệt (Pass)]      [🔄 AI Sửa Lại]       │
│ LEVEL 3: XÁC NHẬN TIỀN VỀ ────► [💰 Tiền Về 1Tr]      [🎬 Bàn Giao 48h]     │
│ LEVEL 4: BÁO CÁO KẾT QUẢ ─────► [📊 KPI Daily]         [🛡️ Trạng Thái Squad] │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. 📱 UX/UI STANDARDS FOR MOBILE APP & PC DESKTOP — ✅ NÂNG CẤP HOÀN THIỆN!

Để giao diện hiển thị sắc nét, đẹp mắt và không bị vỡ chữ trên cả điện thoại (Telegram Mobile App) và máy tính (Telegram Desktop):

| Quy tắc UX/UI | Chuẩn thiết kế | Mục đích |
|---------------|----------------|----------|
| **Cấu trúc hàng Nút** | Max `2 nút / hàng` | Đảm bảo nút đủ to, chữ không bị ẩn `...` trên Mobile màn hình nhỏ |
| **Đường phân cách** | Dùng `────────────────────────────` | Tạo phân vùng visual sắc nét, dễ đọc |
| **Visual Indicators** | `🟢 ONLINE`, `🚀 ACTIVE`, `💰 CONFIRMED` | Nhận diện trạng thái hệ thống ngay lập tức |
| **Toast Feedback** | `answerCallbackQuery(id, text, False)` | Hiển thị Toast thông báo xanh ngay khi vừa chạm 1-click |
| **Thẻ Response Card** | Tự động trả về thẻ kết quả thực thi | Báo cáo trực quan từng tác nhân AI vừa hoàn thành gì |

---

## 3. ⚙️ BẢNG XỬ LÝ SỰ KIỆN CALLBACK 1-CLICK (CALLBACK QUERY ENGINE)

> **Mã nguồn xử lý:** `scripts/telegram_bot_service.py`

| Nút Bấm 1-Click | Callback Data | Phản Hồi UI Toast | Tác Động Thực Thi (Backend Action) |
|-----------------|---------------|-------------------|-----------------------------------|
| `[🚀 Outreach 10 Agency Ads]` | `act_outreach` | `⚡ LUCKY đã nhận lệnh: act_outreach` | AI Hunter quét & bắn 10 tin nhắn outreach ngách |
| `[📄 Proposal Win Agency 1Tr]` | `act_proposal` | `⚡ LUCKY đã nhận lệnh: act_proposal` | Hiển thị link Proposal PDF & STK thanh toán 1tr |
| `[📝 Đăng Bài Post Giáo Dục 48H]` | `act_post` | `⚡ LUCKY đã nhận lệnh: act_post` | AI Content Agent xuất bản bài post ra 5 kênh |
| `[📊 Xem KPI Báo Cáo Ngày]` | `act_report` | `⚡ LUCKY đã nhận lệnh: act_report` | Trả về Thẻ Báo Cáo KPI số liệu thời gian thực |
| `[💰 Xác Nhận Tiền Về (1Tr)]` | `act_confirm_payment` | `⚡ LUCKY đã nhận lệnh: confirm` | Chuyển state `WON` & đếm ngược 48h bàn giao |
| `[🛡️ Trạng Thái 5 AI Agents]` | `act_status` | `⚡ LUCKY đã nhận lệnh: act_status` | Báo cáo sức khỏe 5 tác nhân AI |
| `[✅ Duyệt & Đăng Bài Ngay]` | `approve_post_01` | `✅ Approved Pass` | Duyệt QA ➔ Cho phép xuất bản bài viết |
| `[🔄 Yêu Cầu AI Sửa Lại]` | `reject_post_01` | `🔄 QA Retry` | Yêu cầu Content Agent tối ưu lại kịch bản |

---

## 3. 🛡️ QUY TRÌNH PHẢN BIỆN & DUYỆT BÀI 1-CLICK (QA INTERACTION LOOP)

```
[Agent Khởi Tạo] ──► Tạo Post / Proposal / Script
                         │
                         ▼
[Telegram Bot Notification] ──► Bắn Thẻ Preview + 2 Nút Bấm Duyệt
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
[✅ Duyệt & Cho Phép]                                   [🔄 Yêu Cầu Sửa Lại]
  • Tự động đăng bài / gửi khách                           • Auto prompt lại AI Creator
  • Log lịch sử duyệt: PASS                                • Tự động sửa & gửi Thẻ Preview mới
```

---

## 4. 💻 MÃ NGUỒN TÍCH HỢP (PYTHON API)

Hệ thống mã nguồn xử lý nút bấm 1-click đã được tích hợp tại:
- **Tập tin chính:** `scripts/telegram_command_center.py`
- **Tập tin Daemon:** `scripts/telegram_daemon.py`
- **Telegram Bot:** `@OPC_TNC_BOT` (`8996244093:AAGroaAR36Mz1B64N-jr-EClQLFgBjtINq8`)
- **Group ID:** `-1003415285389`

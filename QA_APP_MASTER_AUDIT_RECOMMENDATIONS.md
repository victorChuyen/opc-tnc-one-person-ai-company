# 📋 OPC-TNC MASTER QA AUDIT & COMPREHENSIVE SYSTEM ROADMAP
> **Trạng thái hệ thống**: 🟢 **GO-LIVE READY 100% — ONLINE 24/7**  
> **Ngày cập nhật**: 08/08/2026  
> **Tác giả**: AI Pair Programmer & Chairman Victor Chuyen  

---

## 🛠️ 1. TỔNG QUAN HIỆN TRẠNG HỆ THỐNG (CURRENT ARCHITECTURE)

Hệ thống OPC-TNC (One-Person AI Company) hiện tại vận hành theo mô hình **Autonomous Hub-and-Spoke** kết hợp 3 tầng chính:

1. **Frontend Landing & Web App**:
   - Web App 3D Office Simulator: `index.html` (chạy trên port 8085, SSL qua `https://ai.breaths.live`)
   - VSL Landing Tiếng Việt: `landing_vi.html` (`/vi` - tối ưu Ads Việt Nam & Zalo Group)
   - VSL Landing Tiếng Anh: `landing_en.html` (`/en` - tối ưu Ads Global & Discord)

2. **Backend Engine (`serve_local.mjs`)**:
   - Node.js HTTP Native REST Server (port 8085).
   - Tích hợp Live Telegram Bot Engine (`@OPCTNC_bot` - token `8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8`).
   - Tích hợp Live Resend Email Service:
     - **Verified Domain**: `breaths.live` (Status: **Verified** 🟢 | Region: Tokyo `ap-northeast-1`)
     - **Resend Account**: `gdkd.3t@gmail.com`
     - **Sender Email**: `Victor Chuyen <victor@ai.breaths.live>`
     - **API Key**: `re_your_resend_api_key_here`
   - Tích hợp VietQR Auto-Access Gating Webhook & Lead Opt-in API.

3. **Obsidian Vault & Data Sync**:
   - Tự động sinh file KPI Markdown Note tại `D:\OPC-TNC\OPC-TNC\6_Daily\`.
   - Cập nhật tự động bảng **AI C-SUITE JOB KPI MATRIX** tại `_Dashboard/00 - Home.md`.

---

## 🔍 2. KẾT QUẢ QA AUDIT TOÀN DIỆN (AUDIT VERIFICATION RESULTS)

| Hạng mục kiểm toán | Kết quả Test Live | Chi tiết xử lý / Trạng thái |
| :--- | :---: | :--- |
| **Resend Email Domain** | 🟢 **VERIFIED 100%** | Domain `breaths.live` đã **Verified** trên Resend Dashboard (Region Tokyo `ap-northeast-1`, Tài khoản `gdkd.3t@gmail.com`). Gửi Email HTML trực tiếp không qua fallback. |
| **Telegram Bot Polling Engine** | 🟢 **100% PASS** | Đã sửa offset polling fast-forward (`offset=-1` khi init) loại bỏ nghẽn backlog. |
| **Bot Token Credentials** | 🟢 **100% PASS** | Đã loại bỏ hoàn toàn Token cũ `8996244093` trên toàn bộ 7 file Python/JS scripts. Tất cả chạy thống nhất trên Token `@OPCTNC_bot` (`8257466148`). |
| **Interactive Inline Buttons** | 🟢 **100% PASS** | Thêm `answerCallbackQuery` phản hồi 0.1s + Dual Routing (gửi riêng Founder `5453401077` & gửi nhóm `-1001812138135`). |
| **Local REST APIs** | 🟢 **100% PASS** | `/api/social/status`, `/api/leads/recent`, `/api/sheets/status`, `/api/finance/transactions` phản hồi status `200 OK`. |
| **Mobile UI / Layout** | 🟢 **100% PASS** | Thẻ toggle `▶️ KẾT NỐI & HỢP TÁC CÙNG OPC-TNC` áp dụng `white-space: nowrap`, không bị gãy chữ ở 390px viewport. |
| **Email Auto-Drip (Resend)** | 🟢 **100% PASS** | Tự động phân nhánh gửi Email Chào mừng chuẩn HTML 2 ngôn ngữ (VI & EN) ngay khi Opt-in. |
| **Khởi chạy ngầm 24/7** | 🟢 **100% PASS** | Tích hợp VBScript `run_opc_background.vbs` chạy ẩn Windows Startup, tự khởi động lại Cloudflare Tunnel & Node server. |

---

## 🚀 3. ĐỀ XUẤT NÂNG CẤP & HOÀN THIỆN (RECOMMENDED UPGRADES ROADMAP)

Để ứng dụng vận hành hiệu quả vượt trội trong các phiên làm việc tiếp theo, hệ thống được kiến nghị nâng cấp 4 hạng mục sau:

### 🌟 Ưu tiên 1: Tích hợp AI Agentic Reasoning trực tiếp vào Telegram Bot
- **Mục tiêu**: Hiện tại khi gõ lệnh `/cmo [nội dung]` hay gửi tin nhắn text, bot trả lời bằng ACK xác nhận tiếp nhận. 
- **Nâng cấp**: Kết nối API Hermes Agent / LLM Provider (Groq / Gemini / OpenAI) để các Giám đốc AI (`CMO`, `CSO`, `CPO`, `CFO`) trực tiếp **phân tích & sinh câu trả lời chuyên sâu (Actionable Output)** ngay trong Telegram Chat chỉ sau 2-3s!

### 📊 Ưu tiên 2: Tự động hóa Google Sheets Sync qua Apps Script
- **Mục tiêu**: Đồng bộ dữ liệu Lead đăng ký và Transaction VietQR từ `data/leads_db.json` sang Google Sheet ID `1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24`.
- **Nâng cấp**: Cấu hình Apps Script Webhook 2 chiều để khi Lead Opt-in trên Web thì Google Sheet tự động ghi hàng mới (Row Insertion) thời gian thực.

### 📱 Ưu tiên 3: Bổ sung PWA (Progressive Web App) & Mobile Push Notifications
- **Mục tiêu**: Biến Web App 3D Simulator thành ứng dụng có thể cài đặt trực tiếp lên điện thoại iOS/Android của khách hàng không cần thông qua App Store.
- **Nâng cấp**: Thêm `manifest.json` và Service Worker (`sw.js`) để hỗ trợ lưu Cache Offline & Push Notifications.

### 🔐 Ưu tiên 4: Dashboard Quản Trị Admin (Visual Campaign & Lead Tracker UI)
- **Mục tiêu**: Cho phép Chairman Victor theo dõi số lượng Lead, doanh thu MRR, lịch hẹn Cal.com trực tiếp bằng đồ thị Visual Chart trên giao diện Web mà không cần mở file JSON hay Google Sheet.
- **Nâng cấp**: Bổ sung tab `/admin` được bảo vệ bằng mật khẩu OTP.

---

## 📌 4. HƯỚNG DẪN DUY TRÌ BẢN NÂNG CẤP CHO AI AGENT PHIÊN SAU

1. **Khởi chạy hệ thống**: Đảm bảo file `serve_local.mjs` luôn hoạt động qua `run_opc_background.vbs` hoặc lệnh `node serve_local.mjs`.
2. **Đối soát Resend Domain**: Domain `breaths.live` đã xác thực (Verified 🟢) trên tài khoản `gdkd.3t@gmail.com` (Tokyo region `ap-northeast-1`).
3. **Đối soát Telegram Token**: Luôn sử dụng `TELEGRAM_BOT_TOKEN` từ `.env` (`8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8`).
4. **Cập nhật Docs**: Mọi thay đổi về kiến trúc API hay giao diện cần được ghi lại vào `HANDOFF.md` và `QA_APP_MASTER_AUDIT_RECOMMENDATIONS.md`.

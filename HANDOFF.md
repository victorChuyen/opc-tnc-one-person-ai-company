# 🚀 HANDOFF BẢN GIAO PHIÊN LÀM VIỆC & QUY TRÌNH VẬN HÀNH OPC-TNC

> **Tài liệu Handoff dành cho AI Agent & Developer trong các phiên làm việc tiếp theo.**
> **Ngày cập nhật gần nhất**: 08/08/2026
> **Trạng thái hệ thống**: 🟢 **GO-LIVE READY 100% — ĐÃ KHỞI CHẠY CHẠY ADS**

---

## 🌐 1. THÔNG TIN HỆ THỐNG PRODUCTION & DOMAIN

| Hạng mục | Thông tin / Đường dẫn |
| :--- | :--- |
| **Domain Production (SSL)** | **`https://ai.breaths.live`** |
| **Trang Tiếng Việt (`VI`)** | **`https://ai.breaths.live/vi`** |
| **Trang Tiếng Anh (`EN`)** | **`https://ai.breaths.live/en`** |
| **Nhóm Zalo Phễu Mã Nguồn (VI)** | **`https://zalo.me/g/tdhmtu261`** |
| **Kênh Discord Community (EN)** | **`https://discord.com/channels/1098935967873765457/1098935968582598707`** |
| **Link Book Tư Vấn 1:1** | **`https://cal.com/victorchuyen/coachai`** |
| **Local Server Port** | `http://localhost:8085` (Node.js `serve_local.mjs`) |

---

## ⚡ 2. HAI PHƯƠNG ÁN KHỞI CHẠY HỆ THỐNG (STARTUP / BAT)

### 📌 PHƯƠNG ÁN 1: TỰ ĐỘNG KHỞI CHẠY NGẦM KHI MỞ MÁY (RECOMMENDED 24/7)
- **File kích hoạt**: Double click [install_autostart.bat](file:///D:/OPC-TNC/install_autostart.bat)
- **Cơ chế**: Tự động đưa script VBScript [run_opc_background.vbs](file:///D:/OPC-TNC/run_opc_background.vbs) vào thư mục `Windows Startup`.
- **Ưu điểm**: 
  - Khởi động ngầm 100% cả Node.js Web Server (Port 8085) và Cloudflare Tunnel `ai.breaths.live` mỗi khi bật máy.
  - Không hiện cửa sổ đen CMD. Tên miền `https://ai.breaths.live` luôn sẵn sàng 24/7.
- **Gỡ bỏ autostart**: Double click [uninstall_autostart.bat](file:///D:/OPC-TNC/uninstall_autostart.bat).

### 🛠️ PHƯƠNG ÁN 2: CHẠY THỦ CÔNG HIỂN THỊ CỬA SỔ LOG CONSOLE (.BAT)
- **File kích hoạt**: Double click [run_opc_online.bat](file:///D:/OPC-TNC/run_opc_online.bat)
- **Ưu điểm**: Mở cửa sổ CMD hiển thị log thời gian thực của Node.js Server và Cloudflare Tunnel kết nối `ai.breaths.live` để debug.

---

## 📱 3. CHI TIẾT TỐI ƯU UX/UI & ĐỒNG BỘ NGUYÊN TẮC THIẾT KẾ

1. **Phông Chữ Chuẩn**: Toàn bộ hệ thống sử dụng duy nhất phông chữ **`Be Vietnam Pro`** (Google Fonts).
2. **Loại Bỏ 100% Logo Cũ**: Header chỉ giữ tên Brand Text đẳng cấp, sạch sẽ.
3. **Mobile Top Lead Banner**:
   - Tiêu đề dài `🎁 Nhận ngay Bản Sao Mã Nguồn OPC...` bị ẩn hoàn toàn trên di động (`< 768px`).
   - Nút CTA chuyển thành **Full Width 100%**, căn giữa nổi bật:
     - VI: `⚡ Kích hoạt nhận mã nguồn`
     - EN: `⚡ Activate & Get Source Code`
4. **Mobile Sticky Footer Menu Bar**:
   - Cố định dưới đáy điện thoại với hiệu ứng kính mờ (Blur 20px).
   - Tự động thay đổi Link & Label theo ngôn ngữ:
     - VI: `💬 Nhóm Zalo Mã Nguồn` (`zalo.me/g/tdhmtu261`) & `👉 Book Tư Vấn 1:1`
     - EN: `✈️ Telegram Channel` (`t.me/OPCTNC`) & `👉 Book 1:1 Consultation`

---

## 📁 4. CẤU TRÚC CODEBASE CHÍNH

- **`serve_local.mjs`**: Web server Node.js HTTP/REST + Telegram Sync Bot (Lead Opt-in webhook).
- **`index.html`**: Web App 3D Simulator 360° chính.
- **`landing_vi.html`**: Landing Page VSL Tiếng Việt tối ưu chạy Ads Việt Nam.
- **`landing_en.html`**: Landing Page VSL Tiếng Anh tối ưu chạy Ads Global.
- **`landing.html`**: Landing Page tổng quan.
- **`js/i18n.mjs`**: Động cơ đa ngôn ngữ song ngữ Việt - Anh.
- **`js/theme.mjs`**: Động cơ quản lý giao diện Sáng / Tối.
- **`css/styles.css`**: Design tokens và CSS responsive chính.
- **`opc_facebook_youtube_engine.mjs`**: Động cơ tự động hóa Social API, Token, Telegram 2-way & Zalo.
- **`opc_resend_email_engine.mjs`**: Động cơ gửi Email HTML chuyên nghiệp 2 ngôn ngữ (VI & EN) qua Resend API (Key: `re_your_resend_api_key_here`), tên miền **`breaths.live` đã VERIFIED 100%** (Tài khoản `gdkd.3t@gmail.com`, Tokyo Region `ap-northeast-1`), tự động gửi Email Chào mừng ngay khi Opt-in.
- **`EMAIL_5_DAY_HTML_PREVIEW_SUITE.md`**: Bộ xem trước (Preview Suite) trọn bộ Mẫu Email HTML 5-Day Welcome Onboarding cho cả 2 thị trường Việt Nam (Zalo) và Quốc tế (Discord).
- **YouTube Audio Engine**: Hàm `toggleYoutubeAudio()` xử lý chuẩn JSON payload (`args: []`) cho YouTube iFrame Player API, cho phép Bật/Tắt âm thanh tiếng Video 100% trên tất cả các trang HTML.
- **`opc_telegram_bot_engine.mjs`**: Động cơ Telegram Bot Engine (`@OPCTNC_bot` - Token: `8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8`), xử lý tương tác 2 chiều 6 Giám đốc AI (`/cmo`, `/cso`, `/cpo`, `/cfo`, `/chro`, `/status`), `answerCallbackQuery` 0.1s, và phím bấm Inline Keyboard 1-Touch.
- **`opc_telegram_bot_engine.mjs` / `telegram_bot_service.py`**: Tự động sinh file note Markdown KPI tại `D:\OPC-TNC\OPC-TNC\6_Daily\` với YAML Frontmatter (`type: job-kpi`, `agent`, `kpi_target`, `timestamp`).
- **`D:\OPC-TNC\OPC-TNC\_Dashboard\00 - Home.md`**: Bảng điều khiển Obsidian Vault nhúng khối **Dataview `AI C-SUITE JOB KPI MATRIX`** đồng bộ tự động 3 chiều.
- **`run_opc_background.vbs` & `install_autostart.bat`**: Động cơ khởi chạy ngầm tự động 100% cả Node.js Local Server (Port 8085), Telegram Bot Engine (`@OPCTNC_bot`), Python Autonomous Worker và Cloudflare Tunnel (`https://ai.breaths.live`).

---

## 💡 5. HƯỚNG DẪN DÀNH CHO AI AGENT Ở PHIÊN LÀM VIỆC SAU

1. **Kiểm tra trạng thái server**: Chạy `node -c serve_local.mjs` để check syntax trước khi edit.
2. **Kiểm tra Telegram Bot**: Bot `@OPCTNC_bot` chạy song song theo process `serve_local.mjs`. Mọi tương tác giao việc qua Telegram đều đồng bộ tự động vào `D:\OPC-TNC\OPC-TNC\6_Daily\`.
3. **Báo cáo QA & Kiến trúc Hệ thống Master**: Tham khảo toàn bộ kiến trúc FULL OPTION tại [FULL_OPTION_SYSTEM_MASTER.md](file:///d:/OPC-TNC/FULL_OPTION_SYSTEM_MASTER.md), Báo cáo QA tại [QA_APP_MASTER_AUDIT_RECOMMENDATIONS.md](file:///d:/OPC-TNC/QA_APP_MASTER_AUDIT_RECOMMENDATIONS.md) và Khung Chiến lược 5-Day Pipeline chuẩn Guru tại [TOP1_GURU_5DAY_PIPELINE_STRATEGY.md](file:///d:/OPC-TNC/TOP1_GURU_5DAY_PIPELINE_STRATEGY.md).
4. **Khi thay đổi text / link**: Cập nhật đồng thời ở `index.html`, `landing_vi.html`, `landing_en.html`, `landing.html` và dictionary `js/i18n.mjs`.
5. **Khi test tính năng mới**: Đảm bảo test cả màn hình Desktop và Mobile responsive.

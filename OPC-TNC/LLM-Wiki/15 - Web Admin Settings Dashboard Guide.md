---
type: llm-wiki
wiki_section: admin-dashboard
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Web Admin Settings Dashboard Guide
  - UX/UI Admin Interface
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - admin
  - dashboard
  - ux_ui
  - opc_tnc
---

# 🖥️ WEB ADMIN SETTINGS DASHBOARD — GIAO DIỆN QUẢN TRỊ CẤU HÌNH WEB UX/UI

> **Đã hoàn thành!** Hệ thống OPC-TNC hiện đã sở hữu một **Giao diện Web Admin UX/UI Chuyên Nghiệp** dành riêng cho Founder Victor Chuyen để cài đặt, tùy chỉnh, bật/tắt Tác nhân AI và cấp quyền API 1-Click trực quan.

---

## 📍 VỊ TRÍ GIAO DIỆN ADMIN WEB

- **File HTML local:** [admin/index.html](file:///d:/OPC-TNC/OPC-TNC/admin/index.html)  
*(Mở trực tiếp bằng bất kỳ trình duyệt web nào: Google Chrome, Microsoft Edge, Brave, Safari)*

---

## 🎨 5 PHÂN KHU TÙY CHỈNH TRÊN GIAO DIỆN ADMIN:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    5 PHÂN KHU TÙY CHỈNH TRÊN WEB ADMIN                      │
│                                                                             │
│ TAB 1: 🤖 AI Squad & Settings  ──► Bật/tắt 5 Agents & Ngưỡng BANT Score     │
│ TAB 2: 📲 Telegram Bot Config ──► Điền Bot Token & Test gửi tin nhắn trực tiếp│
│ TAB 3: 💳 Thanh Toán & VietQR  ──► Cấu hình STK, SePay & Preview VietQR 1tr │
│ TAB 4: 🔌 MCP Social Gateway   ──► Cấu hình FB, Zalo OA, LinkedIn, Resend   │
│ TAB 5: 🔄 Vault & Sheets Sync  ──► Kiểm tra đường dẫn Vault & Sheet ID     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ CÁC TÍNH NĂNG ĐẶC BIỆT CỦA GIAO DIỆN:

1. **Test Kết Nối Telegram Trực Tiếp:** Nút `[🚀 Gửi Tin Nhắn Kiểm Thử Trực Tiếp Tới Telegram]` cho phép gửi tin nhắn test thực tế sang kênh Telegram ngay trên web!
2. **Xem Trước Mã VietQR Mẫu:** Tự động vẽ mã QR VietQR chuẩn 1.000.000đ cho MBBank / Vietcombank.
3. **Tải `.env` File 1-Click:** Nút `[📥 Tải .env File]` tự động đóng gói toàn bộ cấu hình đã nhập thành file `.env` chuẩn.
4. **Giao diện Dark Mode Glassmorphism:** Thiết kế cao cấp theo tông màu Slate Dark, hiệu ứng bóng mờ cao cấp, mượt mà trên cả máy tính và máy tính bảng.

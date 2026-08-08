# 👑 HƯỚNG DẪN A-Z: NHÂN BẢN DOANH NGHIỆP AI 1 NGƯỜI (OPC-TNC) DÀNH CHO NGƯỜI MỚI
> **Dành cho**: Solopreneurs, Marketers, Agency Owners & Developers muốn tự tay sở hữu hệ thống **3D Virtual Office Simulator & 5 Giám Đốc AI** trong 10 phút!

---

## 📺 VIDEO HƯỚNG DẪN CHI TIẾT (YOUTUBE TUTORIALS)

- 🇻🇳 **Video Hướng Dẫn Tiếng Việt (Full Step-by-Step)**: [https://www.youtube.com/watch?v=opc_tnc_guide_vi](https://www.youtube.com/watch?v=opc_tnc_guide_vi)
- 🇬🇧 **English Masterclass Video (Global Setup Guide)**: [https://www.youtube.com/watch?v=opc_tnc_guide_en](https://www.youtube.com/watch?v=opc_tnc_guide_en)

---

## 🛠️ CHƯƠNG 1: CHUẨN BỊ CÔNG CỤ BAN ĐẦU (HOÀN TOÀN MIỄN PHÍ)

Trước khi bắt đầu, bạn chỉ cần chuẩn bị 3 phần mềm miễn phí sau:

1. **Node.js (Phiên bản v20 trở lên)**: 
   - Tải về tại: [https://nodejs.org](https://nodejs.org) (Bấm chọn bản *LTS recommended*).
2. **VS Code (Trình biên dịch mã nguồn)**:
   - Tải về tại: [https://code.visualstudio.com](https://code.visualstudio.com).
3. **Tài khoản Google** (Để dùng Google Sheets & Google Apps Script).

---

## 📥 CHƯƠNG 2: TẢI MÃ NGUỒN TỪ GITHUB VỀ MÁY TÍNH

Bạn có **2 cách đơn giản** để lấy mã nguồn từ GitHub:

### 💡 CÁCH 1: Tải File ZIP (Dành cho người chưa biết dùng Git)
1. Truy cập vào link GitHub chính thức: 👉 **[https://github.com/victorChuyen/opc-tnc-one-person-ai-company](https://github.com/victorChuyen/opc-tnc-one-person-ai-company)**
2. Bấm vào nút màu xanh **`<> Code`** góc trên bên phải.
3. Chọn **`Download ZIP`**.
4. Giải nén file ZIP vừa tải về vào một thư mục trên máy tính (Ví dụ: `D:\OPC-TNC`).

### ⚡ CÁCH 2: Dùng Lệnh Git Clone (Dành cho Lập trình viên)
Mở Terminal hoặc Command Prompt và gõ dòng lệnh:
```bash
git clone https://github.com/victorChuyen/opc-tnc-one-person-ai-company.git
cd opc-tnc-one-person-ai-company
```

---

## 🔑 CHƯƠNG 3: CẤU HÌNH FILE `.ENV` TRONG 2 PHÚT

File `.env` là nơi chứa các chìa khóa kết nối hệ thống.

1. Tại thư mục mã nguồn, tạo một file mới đặt tên là `.env` (ngang hàng với `serve_local.mjs`).
2. Dán đoạn nội dung sau vào file `.env`:

```env
# 1. Cấu hình gửi Email qua Resend (Đã Verify tên miền breaths.live)
RESEND_DOMAIN=breaths.live
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=🚀 OPC TNC | One Person Company <victor@breaths.live>

# 2. Cấu hình cổng thanh toán PayPal & VietQR
PAYPAL_ME_LINK=https://PayPal.Me/victorchuyen
VIETQR_BANK=MBBank
VIETQR_ACCOUNT=0989890022
VIETQR_NAME=LE VAN PHUNG

# 3. Cấu hình Webhook kết nối Google Sheets & Telegram Bot
APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbxxuKKgbd006k0bGRjXhnkBhrzuqRlsYCpddg9lZlv5KjVFPUmQzYDiyi8cA7qqSWvO/exec
TELEGRAM_BOT_TOKEN=8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8
```

> **Lưu ý**: Thay `your_resend_api_key_here` bằng Resend API Key của riêng bạn tại [Resend.com](https://resend.com) (nếu bạn muốn dùng tài khoản riêng).

---

## 📊 CHƯƠNG 4: ĐƯA ĐỘNG CƠ CƠ SỞ DỮ LIỆU LÊN GOOGLE SHEETS

Hệ thống OPC-TNC sử dụng **Google Sheets** làm Bảng Điều Khiển Realtime với 14 Tab tự động!

### Các bước thực hiện:
1. Tạo một trang Google Sheets mới tại [sheets.new](https://sheets.new) và đổi tên thành `OPC_TNC_MVP_Roadmap`.
2. Trên thanh menu Google Sheets, chọn **Tiện ích mở rộng (Extensions)** ➔ **Apps Script**.
3. Xóa hết code mặc định trong ô làm việc.
4. Mở file `code.gs` trong thư mục mã nguồn bạn vừa tải về, copy toàn bộ nội dung và **Dán vào Apps Script**.
5. Bấm nút dấu cộng `+` bên cạnh mục File ➔ Chọn **HTML** ➔ Đặt tên là `Sidebar`.
6. Mở file `Sidebar.html` trong thư mục mã nguồn, copy toàn bộ và **Dán vào file Sidebar.html trên Apps Script**.
7. Bấm nút **Lưu (Save - Biểu tượng đĩa mềm 💾)**.
8. Bấm nút **Triển khai (Deploy)** ➔ **Triển khai dưới dạng ứng dụng Web (Web App)**:
   - *Execute as*: **Me (Tôi)**
   - *Who has access*: **Anyone (Bất kỳ ai)**
   - Bấm **Triển khai (Deploy)** và copy URL Webhook dán vào file `.env` ở Chương 3.
9. Quay lại trang Google Sheets, bấm F5. Bạn sẽ thấy Menu **`👑 OPC-TNC MASTER SUITE`**. Bấm nút **`👑 SEEDING TOÀN BỘ 14 TAB FULL OPTION MASTER`** để hệ thống tự động khởi tạo 14 Tab dữ liệu!

---

## 🚀 CHƯƠNG 5: KHỞI CHẠY ĐỘNG CƠ SERVER & TELEGRAM BOT

1. Mở phần mềm **VS Code**, chọn **File** ➔ **Open Folder** ➔ Chọn thư mục `opc-tnc-one-person-ai-company`.
2. Mở Terminal trong VS Code bằng phím tắt `Ctrl + ~` (hoặc `Cmd + ~` trên Mac).
3. Chạy lệnh khởi động Web Server:
```bash
node serve_local.mjs
```
4. Màn hình Terminal hiển thị:
```
[OPC SERVER ONLINE] Server running on http://localhost:8085
[TELEGRAM BOT READY] Connected to @OPCTNC_bot
```
👉 Chúc mừng! Động cơ Doanh nghiệp AI của bạn đã chính thức chạy 24/7!

---

## 🧪 CHƯƠNG 6: THỬ NGHIỆM PHỄU BÁN HÀNG TỰ ĐỘNG (TESTING)

1. **Thử đăng ký Form Opt-in**: Truy cập `http://localhost:8085` trên trình duyệt, nhập tên và Email của bạn ➔ Bấm nút **Nhận Mã Nguồn Miễn Phí (Gói 0đ)**.
2. **Kiểm tra Email**: Mở hòm thư của bạn ➔ Bạn sẽ nhận được Email Chào mừng hiển thị chuẩn nhận diện thương hiệu `🚀 OPC TNC | One Person Company` kèm nút tải mã nguồn & Đánh giá 5 sao ⭐ trên GitHub.
3. **Kiểm tra Telegram Bot**: Mở ứng dụng Telegram, tìm bot `@OPCTNC_bot` ➔ Gõ `/status` để xem thông báo doanh thu & Lead mới nhất!

---

## ⭐ ĐÁNH GIÁ 5 SAO & THAM GIA CỘNG ĐỒNG OPC-TNC

Nếu hướng dẫn này giúp bạn dễ dàng làm chủ Doanh Nghiệp AI, hãy dành 3 giây bấm nút **Star ⭐** trên GitHub để ủng hộ dự án nhé!

- 🌟 **Đánh giá Star GitHub**: [https://github.com/victorChuyen/opc-tnc-one-person-ai-company/stargazers](https://github.com/victorChuyen/opc-tnc-one-person-ai-company/stargazers)
- 💬 **Cộng Đồng Zalo VIP**: [https://zalo.me/g/tdhmtu261](https://zalo.me/g/tdhmtu261)
- 🌐 **Discord Global AI Community**: [Join Discord](https://discord.com/channels/1098935967873765457/1098935968582598707)
- 📅 **Đặt Lịch Tư Vấn 1:1 Cùng Chairman Victor Chuyen**: [https://cal.com/victorchuyen/coachai](https://cal.com/victorchuyen/coachai)

---
*Bản quyền © 2026 thuộc về Chairman Victor Chuyen & Đội ngũ AI OPC-TNC.*

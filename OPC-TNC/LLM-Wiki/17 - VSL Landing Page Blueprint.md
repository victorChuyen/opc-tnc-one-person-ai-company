---
type: llm-wiki
wiki_section: vsl-landing-page
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - VSL Landing Page Blueprint
  - Video Sales Letter Architecture
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - vsl
  - landing_page
  - video_sales_letter
  - opc_tnc
---

# 🎬 VSL LANDING PAGE BLUEPRINT — TRANG VIDEO CHUYỂN ĐỔI BÁN HÀNG OPC-TNC

> **Thư mục lưu trữ:** [11_Media/VSL/index.HTML](file:///d:/OPC-TNC/OPC-TNC/11_Media/VSL/index.HTML)  
> **Server Node.js:** [11_Media/VSL/server.js](file:///d:/OPC-TNC/OPC-TNC/11_Media/VSL/server.js) (Chạy tại port `5678`)

---

## 🎯 1. TỔNG QUAN NỘI DUNG VSL (VIDEO SALES LETTER)

Trang VSL được thiết kế cao cấp theo phong cách Dark Mode Glassmorphism nhằm tối ưu hóa tỷ lệ chuyển đổi (Conversion Rate) cho gói **Demo AI Agentic 48H (1.000.000 VNĐ)**.

### 📌 Cấu trúc 5 phần chính:
1. **Headline & Subheadline:** *"48 Giờ Để AI Vận Hành Doanh Nghiệp, Thay Vì Bắt Anh Tự Trở Thành Kỹ Sư AI"*.
2. **Khu vực Video Player Slot (16:9):** Sẵn sàng nhúng link Youtube / Vimeo / MP4 khi Founder Victor Chuyen gửi link video.
3. **Offer Box Trải Nghiệm 1Tr:** Giá niêm yết 10.000.000đ ➔ KM **1.000.000đ** (Giới hạn 3 suất/tuần).
4. **3 Điểm Xoáy Lợi Ích:** Đóng gói kết quả 48h, tiết kiệm thời gian/chi phí, giữ tư duy quản trị.
5. **Bộ Nút CTA Chuyển Hướng 1-Click:**
   - 📅 Đặt lịch Cal.com: `https://cal.com/victorchuyen/coachai`
   - 💬 Group Zalo OPC-TNC: `https://zalo.me/g/tdhmtu261`
   - ✈️ Group Telegram VibeCode: `https://t.me/vibecodocoaching`
   - 📲 Chat Zalo Admin 1-1: `https://zalo.me/0989890022`

---

## 🔧 2. HƯỚNG DẪN NHÚNG LINK VIDEO KHI TIẾP NHẬN FROM FOUNDER

Khi Founder Victor Chuyen gửi Link Video VSL, chỉ cần thực hiện 1 trong 2 cách sau:

### Cách 1: Thêm tham số `?v=LINK_VIDEO` vào URL
```
file:///d:/OPC-TNC/OPC-TNC/11_Media/VSL/index.HTML?v=https://www.youtube.com/embed/YOUR_VIDEO_ID
```

### Cách 2: Gọi hàm JavaScript `setVideoLink(url)`
```javascript
setVideoLink('https://www.youtube.com/embed/YOUR_VIDEO_ID');
```

---
type: sop
name: SOP 1 - Quy trình Tiếp nhận & Phân loại Lead (Lead Intake)
owner: Victor Chuyen
assigned_role: Lead Hunter & Outreach Agent
tags:
  - sop
  - technique
  - lead_intake
  - opc_tnc
---

# 📋 SOP 1 — QUY TRÌNH TIẾP NHẬN & PHÂN LOẠI LEAD THỰC CHUYỂN

> **Vai trò phụ trách:** `Lead Hunter & Outreach Agent` / Victor Chuyen  
> **Mục tiêu:** Xử lý 100% Lead mới trong vòng 15 phút, phân loại BANT Score và hẹn lịch Demo.

---

## 🎯 KPIs BẮT BUỘC
* **Thời gian phản hồi đầu tiên:** < 15 phút từ khi Lead inbox.
* **Số Note Lead khởi tạo:** 3-5 lead mới/ngày vào `1_Leads/`.
* **Tỷ lệ hẹn lịch Demo:** > 40% số Lead được tư vấn.

---

## 🔄 QUY TRÌNH 5 BƯỚC THỰC THI (STEP-BY-STEP)

```
Bước 1: Tiếp nhận ➔ Bước 2: Tạo Note ➔ Bước 3: Hỏi 3 câu ➔ Bước 4: Chẩn đoán ➔ Bước 5: Hẹn Call
```

### Bước 1: Quét Kênh & Thu Nhập Thông Tin
- Theo dõi các kênh: Zalo Cá nhân, FB Group ngách (Agency / Coach / Ecom), Form đăng ký.
- Khi có tương tác quan tâm: Lưu ngay SĐT, Tên, Ngành nghề, Kênh đến.

### Bước 2: Khởi Tạo Note Lead Trong Obsidian
- Mở Obsidian ➔ Dùng `Template - Lead` tạo note mới tên: `YYYY-MM-DD - [Tên Lead] [Tên Cty]`.
- Điền ngay các trường ban đầu: `source`, `phone`, `company`, `industry`, `status: new`.

### Bước 3: Gửi Kịch Bản 3 Cầu Hỏi Chẩn Đoán (Inbox Script)
*Gửi tin nhắn mẫu sau qua Zalo/FB:*
> *"Chào [Tên], Chuyên thấy bạn đang quan tâm đến giải pháp tự động hóa AI Agentic cho [Ngành]. Cho Chuyên hỏi nhanh 3 câu để hỗ trợ tốt nhất nhé:*  
> *1. Hiện tại team bạn đang làm thủ công nhất ở khâu nào? (Tạo Ads / Viết content / CSKH / Báo cáo)*  
> *2. Một ngày team mất khoảng bao nhiêu giờ cho khâu đó?*  
> *3. Bạn đã từng dùng thử công cụ AI nào chưa (ChatGPT, Claude, Custom Agent)?"*

### Bước 4: Chẩn Đoán BANT & Chấm Điểm (Lead Score)
Dựa vào câu trả lời, cập nhật Frontmatter Note Lead:
- **Need (Nhu cầu):** Rõ ràng / Cấp bách ➔ `temperature: hot`.
- **Budget (Ngân sách):** Khả năng chi trả gói Demo 1.000.000đ ➔ `budget: 1M-5M`.
- **Authority (Thẩm quyền):** Là CEO / Founder / Leader ➔ `decision_maker: true`.
- **Tính điểm `lead_score`:** 
  - Hot pain + CEO + Ngân sách OK = **Score 80-100** (Ưu tiên số 1).
  - Có nhu cầu nhưng chưa gấp = **Score 50-70** (Gửi tài nguyên trước).

### Bước 5: Gửi Tài Nguyên Mở Đầu & Đặt Lịch Call Demo
- Nếu Score >= 70: Mời trực tiếp vào lịch Demo 30 phút:  
  > *"Dựa trên vấn đề của bạn, Chuyên có thể demo trực tiếp cách Setup AI Agentic tự động hóa khâu đó trong 30 phút. Bạn rảnh khung giờ nào: [Khung 1] hay [Khung 2]?"*
- Tạo sẵn note Call trong `2_Calls/` ngay khi chốt lịch.

---

## 🚫 LỖI THƯỜNG GẶP CẦN TRÁNH
1. **Chat dông dài không chốt lịch Call:** Chỉ hỏi tối đa 3 câu chẩn đoán, sau đó chuyển hướng ngay sang đặt lịch Demo.
2. **Quên tạo Note trong Obsidian:** Mọi tương tác đều phải tạo note ngay để tránh trôi thông tin.
3. **Không điền SĐT / Zalo:** Luôn xin SĐT/Zalo để đưa vào hệ thống sync Google Sheets.

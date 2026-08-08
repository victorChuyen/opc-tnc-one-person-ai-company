---
type: project
name: 3_Project - Sprint 10 Lead Real Operations (Chiến Dịch Thực Chiến 10 Lead Thật)
status: active
owner: Victor Chuyen
start_date: 2026-07-30
target_completion: 2026-08-15
target_leads: 10
target_paid_clients: 3
target_revenue: 3000000
currency: VND
tags:
  - project
  - real_operations
  - sprint
  - opc_tnc
---

# 🚀 PROJECT THỰC CHUYỂN: SPRINT 10 LEAD ĐẦU TIÊN (REVENUE GENERATION)

> **Mục tiêu dự án:** Chuyển đổi từ hệ thống sang **VẬN HÀNH THỰC CHUYỂN**. Mang về 10 Lead thật, chốt tối thiểu 3 Khách trả phí thật (Gói Demo 1.000.000đ), tạo doanh thu 3.000.000đ và 3 Case Studies đầu tiên.

---

## 👥 PHÂN CÔNG VAI TRÒ & NHIỆM VỤ THỰC CHUYỂN (AI SQUAD & FOUNDER)

| Vai trò | Nhiệm vụ chính | KPIs daily / weekly | SOP Tham chiếu |
|---------|----------------|---------------------|----------------|
| **1. Lead Hunter & Outreach Agent** | Quét 10 nhu cầu thị trường, gửi 10 tin nhắn outreach cá nhân hóa/ngày | 10 Market Needs, 3 Lead Notes mới/ngày | [[1_SOP - Lead Intake]] |
| **2. Discovery & Sales Agent** | Nhắc lịch Call, tiến hành Demo 30', gửi Proposal & Chốt gói 1tr | 2 Calls/ngày, 1 Proposal/ngày | [[2_SOP - Follow-up]] |
| **3. Delivery & Setup Agent** | Setup Agentic Workflows cho khách trong 48h, bàn giao video | Bàn giao < 48h, 0 lỗi kỹ thuật | [[3_SOP - Client Care]] |
| **4. Client Retention Agent** | Check-in ngày 7/30, thu thập Testimonial & đề xuất Upsell 3tr | 1 Testimonial/tuần, 1 Upsell/tháng | [[3_SOP - Client Care]] |
| **5. Content Growth Agent** | Chuyển đổi Case study & Pain thị trường thành 1 bài viết/ngày | 1 Bài viết/ngày, 3 Script/tuần | [[Template - Content Script]] |

---

## 📋 CHECKLIST CÁC BƯỚC THỰC THI CHIẾN DỊCH (EXECUTION ROADMAP)

### Giai đoạn 1: Chuẩn bị Vũ khí Outreach (Ngày 1 - 2)
- [x] Nâng cấp Hệ thống Vault Obsidian + Google Sheets Sync V2
- [x] Đóng gói Offer Demo KM 90% (1.000.000đ)
- [x] Viết bộ 3 SOPs vận hành chuyên sâu (Intake, Closing, Care)
- [x] Soạn 5 mẫu tin nhắn Outreach theo ngách Agency / Ecom / Coach ([[Script 5 - Bo 5 Mau Tin Nhanh Outreach Nganh]])

### Giai đoạn 2: Bùng nổ Outreach & Thu thập 10 Lead Thật (Ngày 3 - 7)
- [x] **Ngày 3:** Soạn Proposal [[Proposal - Mr. Thắng Win - Win Agency]] + Khởi chạy Outreach 10 Agency Meta Ads
- [ ] **Ngày 4:** Outreach 10 Chủ Shop Ecom ➔ Đặt 2 lịch Call Demo
- [ ] **Ngày 5:** Tiến hành 2 cuộc gọi Demo ➔ Gửi 2 Proposal
- [ ] **Ngày 6:** Chốt 1 Client trả phí thật 1.000.000đ đầu tiên!
- [ ] **Ngày 7:** Đạt mốc 5 Leads thật + 2 Call Demo

### Giai đoạn 3: Triển khai 48h & Đóng gói Case Study (Ngày 8 - 14)
- [ ] Bàn giao kỹ thuật gói Demo 1tr cho Client 1 trong 48h
- [ ] Thu thập Testimonial & Bài viết Case Study từ Client 1
- [ ] Dùng Case Study 1 để chốt Client 2 và Client 3
- [ ] Đạt mốc **3.000.000 VNĐ doanh thu thật**!

---

## 📊 THEO DÕI TIẾN ĐỘ SPRINT 10 LEAD

```dataview
TABLE 
  phone AS "SĐT",
  source AS "Kênh đến",
  status AS "Trạng thái",
  lead_score AS "Score",
  next_action AS "Next Step",
  next_action_date AS "Hạn xử lý"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead"
SORT created DESC
```

---

## 🔗 THÀNH PHẦN LIÊN KẾT HỆ THỐNG
- **Single Source of Truth:** [[OPC-TNC – Project Blueprint]]
- **Command Center:** [[00 - Home]]
- **Sales Funnel:** [[01 - Sales Pipeline]]
- **SOP Tiếp Nhận:** [[1_SOP - Lead Intake]]
- **SOP Chốt Sales:** [[2_SOP - Follow-up]]
- **SOP Bàn Giao:** [[3_SOP - Client Care]]

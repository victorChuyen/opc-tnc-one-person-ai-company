---
type: llm-wiki
wiki_section: sop-playbook
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - SOP Playbook
  - Operations Manual
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - sop
  - playbook
  - opc_tnc
---

# 📘 SOP PLAYBOOK — TỔNG HỢP QUY TRÌNH VẬN HÀNH OPC-TNC

> Aggregation layer cho 4 SOPs thực chiến. AI tra cứu nhanh quy trình mà không cần mở từng file.

---

## OVERVIEW MATRIX

| SOP | Tên đầy đủ | Vai trò phụ trách | KPIs chính | Trigger |
|-----|------------|-------------------|------------|---------|
| [[1_SOP - Lead Intake]] | Tiếp nhận & Phân loại Lead | Lead Hunter & Outreach Agent | <15 phút phản hồi, 3-5 lead/ngày, >40% hẹn demo | Lead mới inbox |
| [[2_SOP - Follow-up]] | Call Demo, Proposal & Chốt Sales | Discovery & Sales Agent | >80% show-up, 1 chốt/3 call, <2h gửi proposal | Lịch call confirmed |
| [[3_SOP - Client Care]] | Triển khai, CSKH & Upsell | Delivery & Client Care Agent | <48h bàn giao, 1 testimonial/2 KH, >20% upsell | Nhận thanh toán |
| [[4_SOP - Content & Ads Campaign Directive]] | Content & Creative Ads | Content Growth & Creative Ads Agent | 1 bài/ngày, 3 scripts/tuần | Daily content task |

---

## CROSS-REFERENCE: SOP OUTPUT → INPUT

```
SOP 1 (Lead Intake)
  Output: Lead note qualified, score ≥ 50, lịch call đặt
     │
     ▼
SOP 2 (Follow-up & Closing)
  Input: Lead qualified + Call note created
  Output: Client note created (status: won) + thanh toán 1tr
     │
     ▼
SOP 3 (Client Care)
  Input: Client note + thanh toán confirmed
  Output: Bàn giao kỹ thuật + Testimonial + Upsell proposal
     │
     ▼
SOP 4 (Content & Ads)
  Input: Case study + Market insights
  Output: Content published → New leads → SOP 1 restart
```

---

## SOP 1 — TIẾP NHẬN & PHÂN LOẠI LEAD (5 BƯỚC)

| Bước | Hành động | Output | Thời gian |
|------|----------|--------|-----------|
| 1 | **Quét kênh** — Zalo, FB Group, Form | Thông tin lead (SĐT, Tên, Ngành) | Liên tục |
| 2 | **Tạo note Lead** — Dùng Template - Lead | File `.md` trong `1_Leads/` | 2 phút |
| 3 | **Gửi 3 câu chẩn đoán** (inbox script) | Phản hồi từ lead | <15 phút |
| 4 | **Chẩn đoán BANT & Score** | `lead_score`, `temperature` updated | 5 phút |
| 5 | **Gửi tài nguyên + Đặt lịch call** | Call note trong `2_Calls/` | Ngay khi score ≥ 70 |

**Script 3 câu hỏi chẩn đoán:**
> *"Chào [Tên], Chuyên thấy bạn đang quan tâm đến giải pháp tự động hóa AI Agentic cho [Ngành]. Cho Chuyên hỏi nhanh 3 câu:*
> *1. Hiện tại team bạn đang làm thủ công nhất ở khâu nào?*
> *2. Một ngày team mất khoảng bao nhiêu giờ cho khâu đó?*
> *3. Bạn đã từng dùng thử công cụ AI nào chưa?"*

---

## SOP 2 — CALL DEMO, PROPOSAL & CHỐT SALES (5 BƯỚC)

| Bước | Hành động | Output | Thời gian |
|------|----------|--------|-----------|
| 1 | **Nhắc lịch & Chuẩn bị** | Zoom link sent, tools ready | 15 phút trước call |
| 2 | **Call Demo 30 phút** (10' discovery + 15' demo + 5' pitch) | Call note updated | 30 phút |
| 3 | **Trình bày Offer KM 90%** (4 yếu tố: giá, quyền lợi, cam kết, scarcity) | Lead response | Trong call |
| 4 | **Tạo & Gửi Proposal** (cá nhân hoá) | Proposal file + PDF gửi Zalo | <2h sau call |
| 5 | **Follow-up 24h → Chuyển Client** | Status: won, Client note created | 24h |

**4 yếu tố không thể từ chối:**
1. **Giá:** 10.000.000đ → KM **1.000.000đ**
2. **Quyền lợi:** Setup 1 Agent + Bàn giao mã nguồn + Đào tạo 1-1 trong 48h
3. **Cam kết:** Chạy được thật mới tính hoàn thành
4. **Scarcity:** Mỗi tuần chỉ nhận 3 suất giá 1tr

---

## SOP 3 — TRIỂN KHAI, CSKH & UPSELL (5 BƯỚC)

| Bước | Hành động | Output | Thời gian |
|------|----------|--------|-----------|
| 1 | **Welcome Kit + Tạo Client note** | Client note đầy đủ, Welcome message | Ngay khi nhận tiền |
| 2 | **Triển khai kỹ thuật** (Setup Agent + Video + Hướng dẫn 1-1) | Agent chạy thật | <48h |
| 3 | **Check-in Ngày 7** (hỏi thăm, đo health_score) | Health score updated | Ngày 7 |
| 4 | **Thu thập Testimonial** | Testimonial note + Case Study | Khi KH khen |
| 5 | **Đề xuất Upsell** (gói tháng / tư vấn 3 tháng) | Upsell proposal | Ngày 14-30 |

---

## SOP 4 — CONTENT & ADS CAMPAIGN (3 ĐIỂM XOÁY)

### 3 Nguyên tắc bắt buộc trong MỌI nội dung:

| Point | Nội dung | Emotion |
|-------|----------|---------|
| 1 | Tự mày mò AI = Tốn tiền & Hàng trăm giờ rời rạc | Fear / Pain |
| 2 | OPC-TNC = Đội ngũ Done-For-You AI Agentic có kết quả trong 48H | Relief / Trust |
| 3 | Chủ DN giữ Tư duy Quản trị → Kỹ thuật để OPC-TNC lo | Empowerment |

### Cấu trúc Video Ads (60-90s):
- `0-5s` **Hook:** *"Bạn không cần trở thành kỹ sư AI..."*
- `5-25s` **Pain Story:** Tự mày mò → kết quả không chạy
- `25-50s` **Done-For-You Solution:** OPC-TNC triển khai xong 48h
- `50-60s` **CTA:** Mời đặt lịch demo

---

## OBJECTION HANDLING CHEAT SHEET

| Phản đối | Response |
|----------|----------|
| *"Để anh suy nghĩ thêm"* | *"Em hiểu. Thường anh còn băn khoăn về khâu kỹ thuật hay hiệu quả? Em gửi thêm Video Case study thực tế nhé."* |
| *"Anh chưa có thời gian học"* | *"Anh không cần học lập trình. Bên em cài sẵn trọn gói, anh chỉ việc bấm dùng như chat Zalo."* |
| *"Đắt quá"* | *"Giá gốc 10 triệu, đây là giá trải nghiệm 1 triệu cho 3 suất đầu tiên. Anh tiết kiệm được bao nhiêu giờ/tháng khi có Agent?"* |
| *"Anh bận"* | *"Em chỉ cần 30 phút demo, anh chọn khung giờ [A] hay [B] nhé?"* |

---
type: llm-wiki
wiki_section: ai-agent-roles
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - AI Agent Roles
  - AI Squad
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - ai_agent
  - roles
  - opc_tnc
---

# 🤖 AI AGENT ROLES & EXECUTIVE SQUAD — OPC-TNC

> **Tư duy cốt lõi:** **100% AI AGENT EXECUTION!** Doanh nghiệp OPC-TNC được vận hành hoàn toàn bởi AI Squad. Anh Victor Chuyen giữ vai trò Founder & Visionary, còn **LUCKY (AI Co-Founder)** trực tiếp chỉ đạo, điều phối 5 Tác nhân AI thực thi toàn bộ công việc từ A-Z.

---

## 👑 EXECUTIVE LEADERSHIP

| Vai trò | Người / AI | Trách nhiệm chính |
|---------|------------|-------------------|
| **Founder & CEO** | Victor Chuyen (Trần Ngọc Chuyền) | Định hướng chiến lược, duyệt ngân sách & quyết định cốt lõi. |
| **Co-Founder & COO** | **LUCKY (AI Co-Founder)** | Điều phối 100% AI Squad, quản trị hệ thống Vault & Sheets, tự động hóa toàn bộ quy trình vận hành. |

---

## 👥 TỔNG QUAN 5 AI SQUAD ROLES (DƯỚI SỰ ĐIỀU PHỐI CỦA LUCKY)

| # | Tác nhân AI | Nhiệm vụ chính do Lucky chỉ đạo | KPIs daily/weekly | SOP |
|---|-------------|--------------------------------|-------------------|-----|
| 1 | **Lead Hunter & Outreach Agent** | Quét nhu cầu, tự động soạn outreach, tạo lead | 10 outreach, 3 lead/ngày | [[1_SOP - Lead Intake]] |
| 2 | **Discovery & Sales Agent** | Chuẩn bị kịch bản call, tự sinh Proposal, chốt deal | 2 calls, 1 proposal/ngày | [[2_SOP - Follow-up]] |
| 3 | **Delivery & Setup Agent** | Thiết kế Workflow Agentic, tạo video & tài liệu bàn giao | Bàn giao <48h, 0 lỗi | [[3_SOP - Client Care]] |
| 4 | **Client Retention Agent** | Tự động theo dõi CSKH, thu thập Testimonial & Proposal Upsell | 1 testimonial/tuần | [[3_SOP - Client Care]] |
| 5 | **Content Growth Agent** | Tự động tạo Post, Video Ad Scripts, Graphic Prompts | 1 bài/ngày, 3 scripts/tuần | [[4_SOP - Content & Ads Campaign Directive]] |

---

## ROLE 1: LEAD HUNTER & OUTREACH AGENT

### Nhiệm vụ
- Quét 10 nhu cầu thị trường / ngày (Zalo, FB Group, Form)
- Gửi 10 tin nhắn outreach cá nhân hoá / ngày
- Tạo 3 Lead Notes mới / ngày vào `1_Leads/`
- Chấm điểm BANT cho mỗi lead
- Hẹn lịch call demo cho lead qualified

### KPIs

| Metric | Target | Frequency |
|--------|--------|-----------|
| Market Needs scanned | 10 | Daily |
| Outreach messages sent | 10 | Daily |
| Lead notes created | 3 | Daily |
| Lead score assigned | 100% leads | Per lead |
| Demo appointments set | 2 | Daily |

### Templates sử dụng
- [[Template - Lead]] — Tạo hồ sơ lead
- [[Template - Market Need]] — Ghi nhận insight thị trường

### SOPs tham chiếu
- [[1_SOP - Lead Intake]] — Quy trình 5 bước tiếp nhận

### Khi hoàn thành → Trigger
- Lead có `lead_score ≥ 50` và `status: qualified` → chuyển cho **Role 2**
- Tạo sẵn Call note trong `2_Calls/` với lịch demo

---

## ROLE 2: DISCOVERY & SALES AGENT

### Nhiệm vụ
- Nhắc lịch call 15 phút trước
- Tiến hành Demo 30 phút (10' discovery + 15' demo + 5' pitch)
- Trình bày Offer KM 90% (4 yếu tố)
- Tạo & gửi Proposal cá nhân hoá trong 2h
- Follow-up 24h và chốt thanh toán

### KPIs

| Metric | Target | Frequency |
|--------|--------|-----------|
| Calls completed | 2 | Daily |
| Show-up rate | >80% | Weekly avg |
| Proposals sent | 1 | Daily |
| Close rate | 1/3 calls | Weekly avg |
| Revenue collected | 1.000.000đ | Per close |

### Templates sử dụng
- [[Template - Call]] — Ghi chép cuộc gọi
- [[Template - Proposal]] — Đề xuất cá nhân hoá

### SOPs tham chiếu
- [[2_SOP - Follow-up]] — Quy trình 5 bước chốt sales

### Khi hoàn thành → Trigger
- Khách chuyển khoản → `status: won` → tạo Client note → chuyển cho **Role 3**
- Khách từ chối → `status: lost` → set `lost_reason` → archive

---

## ROLE 3: DELIVERY & SETUP AGENT

### Nhiệm vụ
- Nhận Client note từ Role 2
- Setup Agent/Workflow đúng bài toán cam kết
- Ghi hình video hướng dẫn 3-5 phút
- Tổ chức buổi hướng dẫn 1-1 (15-30 phút)
- Bàn giao mã nguồn/workflow

### KPIs

| Metric | Target | Frequency |
|--------|--------|-----------|
| Delivery time | <48h | Per client |
| Technical errors | 0 | Per delivery |
| Training session | 1 per client | Per client |
| Client satisfaction | ≥8/10 | Per client |

### Templates sử dụng
- [[Template - Client]] — Cập nhật hồ sơ khách

### SOPs tham chiếu
- [[3_SOP - Client Care]] — Bước 1-2

### Khi hoàn thành → Trigger
- Bàn giao xong, `payment_status: paid` → chuyển cho **Role 4** theo dõi

---

## ROLE 4: CLIENT RETENTION AGENT

### Nhiệm vụ
- Check-in ngày 7: hỏi thăm, đo `health_score`
- Check-in ngày 30: đánh giá kết quả dài hạn
- Thu thập testimonial khi khách hài lòng
- Đề xuất upsell gói lớn hơn (Offer 2)

### KPIs

| Metric | Target | Frequency |
|--------|--------|-----------|
| Day 7 check-in | 100% clients | Per client |
| Day 30 check-in | 100% clients | Per client |
| Testimonials collected | 1 | Weekly |
| Upsell proposals | 1 | Monthly |
| Upsell conversion | >20% | Monthly |

### Templates sử dụng
- [[Template - Testimonial]] — Thu thập feedback & case study
- [[Template - Proposal]] — Đề xuất upsell

### SOPs tham chiếu
- [[3_SOP - Client Care]] — Bước 3-5

### Khi hoàn thành → Trigger
- Testimonial thu được → chuyển cho **Role 5** làm content
- Upsell thành công → quay lại **Role 3** triển khai gói mới

---

## ROLE 5: CONTENT GROWTH AGENT

### Nhiệm vụ
- Chuyển đổi Case study & Pain thị trường thành bài viết
- Sản xuất 1 bài viết / ngày
- Viết 3 scripts inbox/email / tuần
- Thiết kế Video Ads theo cấu trúc 60-90s
- Tuân thủ 3 điểm xoáy messaging

### KPIs

| Metric | Target | Frequency |
|--------|--------|-----------|
| Content published | 1 | Daily |
| Scripts written | 3 | Weekly |
| Video ads produced | 1 | Weekly |
| Engagement rate | Tracking | Weekly |

### Templates sử dụng
- [[Template - Content Script]] — Kịch bản nội dung
- [[Template - Email Reply]] — Kịch bản email
- [[Template - Market Need]] — Insight thị trường

### SOPs tham chiếu
- [[4_SOP - Content & Ads Campaign Directive]] — 3 điểm xoáy

### Khi hoàn thành → Trigger
- Content published → generates new inbound leads → quay lại **Role 1**

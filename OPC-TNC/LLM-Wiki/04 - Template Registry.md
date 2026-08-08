---
type: llm-wiki
wiki_section: template-registry
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Template Registry
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - templates
  - opc_tnc
---

# 📋 TEMPLATE REGISTRY — DANH MỤC TEMPLATES OPC-TNC

> AI đọc file này để biết: có bao nhiêu template, khi nào dùng template nào, tạo ở folder nào, đặt tên ra sao.

---

## TỔNG QUAN: 15 TEMPLATES

| # | Template | Type | Folder đích | Naming Format | Sync |
|---|----------|------|-------------|---------------|------|
| 1 | [[Template - Lead]] | `lead` | `1_Leads (…)` | `YYYY-MM-DD - [Tên Lead] [Cty].md` | ✅ |
| 2 | [[Template - Call]] | `call` | `2_Calls (…)` | `YYYY-MM-DD - [Loại] - [Tên].md` | ✅ |
| 3 | [[Template - Offer]] | `offer` | `3_Offers (…)` | `Offer # - [Tên Offer].md` | ✅ |
| 4 | [[Template - Proposal]] | `proposal` | `3_Offers (…)` | `Proposal - [Tên Lead].md` | ❌ |
| 5 | [[Template - Client]] | `client` | `4_Clients (…)` | `Client - [Tên].md` | ✅ |
| 6 | [[Template - Content Script]] | `content-script` | `5_Content/2_Scripts/` | `Script # - [Tên].md` | ❌ |
| 7 | [[Template - Market Need]] | `market-need` | `5_Content/1_Market Needs/` | `YYYY-MM-DD - [Insight].md` | ❌ |
| 8 | [[Template - Email Reply]] | `email-reply` | `5_Content/4_Emails/` | `Email - [Scenario].md` | ❌ |
| 9 | [[Template - Daily]] | `daily` | `6_Daily (…)` | `YYYY-MM-DD.md` | ✅ |
| 10 | [[Template - Project]] | `project` | `8_Projects (…)` | `#_Project - [Tên].md` | ❌ |
| 11 | [[Template - SOP]] | `sop` | `9_Techniques & Support (…)` | `#_SOP - [Tên].md` | ❌ |
| 12 | [[Template - Weekly Review]] | `weekly-review` | `10_Reviews/` | `Week ## - YYYY.md` | ❌ |
| 13 | [[Template - Monthly Report]] | `monthly-report` | `10_Reviews/` | `Month ## - YYYY.md` | ❌ |
| 14 | [[Template - Competitor]] | `competitor` | `7_Resources/4_Competitors/` | `Competitor - [Tên].md` | ❌ |
| 15 | [[Template - Testimonial]] | `testimonial` | `7_Resources/1_Case Studies/` | `Testimonial - [Tên Client].md` | ❌ |

---

## CHI TIẾT TỪNG TEMPLATE

### 1. Template - Lead

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Có lead mới từ outreach, inbox, form đăng ký |
| **Ai tạo** | Lead Hunter Agent / Victor Chuyen |
| **SOP liên quan** | [[1_SOP - Lead Intake]] Bước 2 |
| **Tạo bằng** | QuickAdd hoặc Templater |
| **Tổng fields frontmatter** | 30+ |
| **Sections body** | 9 sections (Thông tin → Nhu cầu → Pain → Mục tiêu → Chẩn đoán → Giải pháp → Hành động → Liên kết → Nhật ký) |

### 2. Template - Call

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Đặt lịch call demo, discovery, follow-up |
| **Ai tạo** | Sales Agent / Victor Chuyen |
| **SOP liên quan** | [[2_SOP - Follow-up]] Bước 1 |
| **Tổng fields** | 20+ |
| **Sections body** | 9 sections (Mục tiêu → Tóm tắt → Pain → Cơ hội AI → Giải pháp → Objection → Kết quả → Task → Liên kết) |

### 3. Template - Offer

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Đóng gói gói dịch vụ mới |
| **Ai tạo** | Victor Chuyen |
| **Tổng fields** | 22+ |
| **Sections body** | 9 sections (Dành cho ai → Vấn đề → Kết quả → Thành phần → Vì sao mua → Giá → Khi nào dùng → Script → Liên kết) |

### 4. Template - Proposal

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Sau call demo, gửi đề xuất cá nhân hoá cho lead |
| **Ai tạo** | Sales Agent |
| **SOP liên quan** | [[2_SOP - Follow-up]] Bước 4 |
| **Tổng fields** | 12+ |
| **Sections body** | 7 sections (Nhu cầu → Giải pháp → Scope → Deliverables → Giá → Timeline → Bước tiếp) |

### 5. Template - Client

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Lead chuyển thành khách (status: won), nhận được thanh toán |
| **Ai tạo** | Sales Agent → chuyển cho Delivery Agent |
| **SOP liên quan** | [[3_SOP - Client Care]] Bước 1 |
| **Tổng fields** | 23+ |
| **Sections body** | 8 sections (Tóm tắt → Mục tiêu → Kết quả → CSKH → Rủi ro → Upsell → Liên kết → Nhật ký) |

### 6. Template - Content Script

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Viết kịch bản inbox, video, post |
| **Ai tạo** | Content Growth Agent |
| **Tổng fields** | 6+ |
| **Sections body** | Mục tiêu → Hook → Pain → Insight → Giải pháp → CTA |

### 7. Template - Market Need

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Ghi nhận insight thị trường từ quét kênh |
| **Ai tạo** | Lead Hunter Agent |
| **Tổng fields** | 4+ |
| **Sections body** | Câu hỏi → Pain lặp → Cơ hội → Offer gắn → Hành động |

### 8. Template - Email Reply

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Soạn kịch bản trả lời inbox/email cho từng tình huống |
| **Ai tạo** | Content Growth Agent / Sales Agent |
| **Tổng fields** | 7+ |
| **Sections body** | Bối cảnh → Subject → Nội dung (Acknowledge→Diagnose→Solution→CTA) → Quick Reply → Objection handling |

### 9. Template - Daily

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Mỗi sáng tạo nhật ký vận hành |
| **Ai tạo** | Victor Chuyen |
| **Tổng fields** | 13+ |
| **Sections body** | KPI Tracking → Mục tiêu → Việc chốt → Follow-up → Call → Content → Offer → CSKH → Review cuối ngày |

### 10. Template - Project

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Lập dự án mới, sprint mới |
| **Tổng fields** | 7+ |
| **Sections body** | Mục tiêu → Đầu ra → Tài nguyên → Task → Liên kết |

### 11. Template - SOP

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Đóng gói quy trình mới |
| **Tổng fields** | 5+ |
| **Sections body** | Mục tiêu → Khi nào dùng → Từng bước → Lỗi thường → Lưu ý |

### 12. Template - Weekly Review

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Cuối tuần, tổng kết KPIs |
| **Tổng fields** | 10+ |
| **Sections body** | KPI Tuần → Win → Điểm nghẽn → Bài học → Kế hoạch tuần tới |

### 13. Template - Monthly Report

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Cuối tháng, báo cáo kinh doanh |
| **Tổng fields** | 10+ |
| **Sections body** | Chỉ số KD → Phân tích kênh → Xếp hạng Offer → CSKH → Chiến lược tháng tới |

### 14. Template - Competitor

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Phân tích đối thủ cạnh tranh mới |
| **Tổng fields** | 8+ |
| **Sections body** | Tổng quan → Sản phẩm & Giá → Điểm mạnh → Điểm yếu → Differentiator OPC-TNC |

### 15. Template - Testimonial

| Thuộc tính | Giá trị |
|------------|---------|
| **Khi nào dùng** | Khách hài lòng, xin feedback & case study |
| **Ai tạo** | Client Care Agent |
| **SOP liên quan** | [[3_SOP - Client Care]] Bước 4 |
| **Tổng fields** | 8+ |
| **Sections body** | Thông tin KH → Before → After → Quote → Bằng chứng |

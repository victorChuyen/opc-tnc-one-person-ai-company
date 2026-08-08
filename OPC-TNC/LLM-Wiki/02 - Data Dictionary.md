---
type: llm-wiki
wiki_section: data-dictionary
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Data Dictionary
  - Field Reference
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - data_dictionary
  - opc_tnc
---

# 📖 DATA DICTIONARY — TỪ ĐIỂN DỮ LIỆU OPC-TNC

> **Mục đích:** Mô tả chi tiết MỌI YAML frontmatter field cho tất cả 15 entity types. AI đọc file này để tạo/validate/parse notes đúng chuẩn.

---

## HƯỚNG DẪN ĐỌC BẢNG

- **Required ✅:** Bắt buộc phải có khi tạo note
- **Synced ✅:** Field được sync 2 chiều Obsidian ↔ Google Sheets
- **Type:** `string` | `enum` | `integer` | `date` | `boolean` | `array` | `wikilink`
- **Default:** Giá trị mặc định khi tạo mới

---

## 1. LEAD (`type: lead`)

> Folder: `1_Leads (…)` | Template: `Template - Lead.md`

### Core Fields

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `lead` | ❌ | Luôn = `lead` |
| `pipeline_stage` | enum | ✅ | `new` | ❌ | `new` / `qualified` / `proposal` / `negotiation` / `won` / `lost` |
| `name` | string | ✅ | `<% tp.file.title %>` | ✅ | Tên file = tên lead |
| `status` | enum | ✅ | `new` | ✅ | `new` / `qualified` / `nurturing` / `proposal` / `negotiation` / `won` / `lost` |
| `priority` | enum | ❌ | `medium` | ❌ | `low` / `medium` / `high` |
| `temperature` | enum | ❌ | `warm` | ❌ | `cold` / `warm` / `hot` |
| `lead_score` | integer | ❌ | `0` | ❌ | 0-100, BANT composite score |

### Contact Info

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `source` | enum | ❌ | `""` | ✅ | `zalo` / `facebook` / `referral` / `website` / `event` / `cold_email` |
| `segment` | string | ❌ | `""` | ❌ | Phân khúc khách (agency / ecom / coach) |
| `industry` | string | ❌ | `""` | ✅ | Ngành nghề |
| `company` | string | ❌ | `""` | ✅ | Tên công ty |
| `role` | string | ❌ | `""` | ❌ | Chức danh |
| `phone` | string | ❌ | `""` | ✅ | Số điện thoại |
| `email` | string | ❌ | `""` | ❌ | Email |
| `zalo` | string | ❌ | `""` | ❌ | Số Zalo |
| `fb_profile` | string | ❌ | `""` | ❌ | Link Facebook profile |

### Qualification & BANT

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `problem` | string | ❌ | `""` | ❌ | Vấn đề / nỗi đau chính |
| `desire` | string | ❌ | `""` | ✅ | Mục tiêu mong muốn |
| `awareness_level` | enum | ❌ | `""` | ❌ | `unaware` / `problem_aware` / `solution_aware` / `product_aware` |
| `offer_fit` | string | ❌ | `""` | ✅ | Offer phù hợp nhất |
| `budget` | string | ❌ | `""` | ❌ | Ngân sách (`<1M` / `1M-5M` / `5M-10M` / `>10M`) |
| `decision_maker` | string | ❌ | `""` | ❌ | Có phải người quyết định? (`true` / `false` / tên người) |

### Next Actions & Dates

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `next_action` | string | ❌ | `""` | ✅ | Hành động tiếp theo cần làm |
| `next_action_date` | date | ❌ | today | ✅ | Ngày thực hiện (YYYY-MM-DD) |
| `conversion_date` | date | ❌ | `""` | ❌ | Ngày chuyển thành client |
| `lost_date` | date | ❌ | `""` | ❌ | Ngày mất deal |
| `lost_reason` | string | ❌ | `""` | ❌ | Lý do mất deal |

### Meta

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Người phụ trách |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `updated` | date | ✅ | today | ❌ | Ngày cập nhật lần cuối |
| `aliases` | array | ❌ | `[<filename>]` | ❌ | Tên thay thế |
| `cssclasses` | array | ❌ | `[lead-note]` | ❌ | CSS class cho Obsidian |
| `tags` | array | ✅ | `[lead, opc_tnc, ai_agentic]` | ❌ | Tags phân loại |

---

## 2. CALL (`type: call`)

> Folder: `2_Calls (…)` | Template: `Template - Call.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `call` | ❌ | Luôn = `call` |
| `pipeline_stage` | string | ✅ | `call` | ✅ | Stage trong pipeline |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên cuộc gọi |
| `lead` | wikilink | ❌ | `""` | ✅ | Link đến lead note |
| `client` | wikilink | ❌ | `""` | ✅ | Link đến client note |
| `call_type` | enum | ✅ | `discovery` | ✅ | `discovery` / `follow_up` / `review` / `closing` |
| `date` | date | ✅ | today | ✅ | Ngày gọi (YYYY-MM-DD) |
| `duration_min` | integer | ❌ | `0` | ❌ | Thời lượng cuộc gọi (phút) |
| `result` | enum | ❌ | `""` | ❌ | `positive` / `neutral` / `negative` / `no_show` |
| `satisfaction` | integer | ❌ | `0` | ❌ | Điểm hài lòng (1-10) |
| `offer_recommended` | string | ❌ | `""` | ✅ | Offer đề xuất cho lead |
| `next_action` | string | ❌ | `""` | ✅ | Hành động tiếp theo |
| `next_action_date` | date | ❌ | `""` | ✅ | Ngày thực hiện |
| `status` | enum | ✅ | `open` | ✅ | `open` / `done` |
| `priority` | enum | ❌ | `medium` | ❌ | `low` / `medium` / `high` |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Người phụ trách |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `updated` | date | ✅ | today | ❌ | Ngày cập nhật |
| `aliases` | array | ❌ | `[<filename>]` | ❌ | Tên thay thế |
| `cssclasses` | array | ❌ | `[call-note]` | ❌ | CSS class |
| `tags` | array | ✅ | `[call, opc_tnc, ai_agentic]` | ❌ | Tags |

---

## 3. OFFER (`type: offer`)

> Folder: `3_Offers (…)` | Template: `Template - Offer.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `offer` | ❌ | Luôn = `offer` |
| `pipeline_stage` | string | ✅ | `offer` | ❌ | Stage |
| `name` | string | ✅ | `<% tp.file.title %>` | ✅ | Tên offer |
| `offer_type` | enum | ❌ | `""` | ✅ | `course` / `consulting` / `toolkit` / `bundle` / `free_resource` |
| `status` | enum | ✅ | `active` | ✅ | `draft` / `active` / `deprecated` |
| `price` | integer | ❌ | `0` | ✅ | Giá (VND) |
| `currency` | string | ❌ | `VND` | ❌ | Đơn vị tiền tệ |
| `target_audience` | string | ❌ | `""` | ✅ | Nhóm khách mục tiêu |
| `problem_solved` | string | ❌ | `""` | ✅ | Vấn đề giải quyết |
| `delivery_format` | enum | ❌ | `""` | ✅ | `online` / `hybrid` / `template` / `app` |
| `cta` | string | ❌ | `""` | ✅ | Call-to-action chính |
| `valid_from` | date | ❌ | `""` | ❌ | Ngày bắt đầu hiệu lực |
| `valid_until` | date | ❌ | `""` | ❌ | Ngày hết hạn |
| `conversion_rate` | integer | ❌ | `0` | ❌ | Tỷ lệ chuyển đổi (%) |
| `total_sold` | integer | ❌ | `0` | ❌ | Tổng số đã bán |
| `priority` | enum | ❌ | `medium` | ❌ | `low` / `medium` / `high` |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `updated` | date | ✅ | today | ❌ | Ngày cập nhật |
| `aliases` | array | ❌ | `[<filename>]` | ❌ | Aliases |
| `cssclasses` | array | ❌ | `[offer-note]` | ❌ | CSS |
| `tags` | array | ✅ | `[offer, opc_tnc, ai_agentic]` | ❌ | Tags |

---

## 4. CLIENT (`type: client`)

> Folder: `4_Clients (…)` | Template: `Template - Client.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `client` | ❌ | Luôn = `client` |
| `pipeline_stage` | string | ✅ | `client` | ❌ | Stage |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên khách |
| `company` | string | ❌ | `""` | ✅ | Công ty |
| `client_status` | enum | ✅ | `active` | ✅ | `active` / `paused` / `churned` / `completed` |
| `service_bought` | string | ❌ | `""` | ✅ | Offer/dịch vụ đã mua |
| `date_bought` | date | ❌ | `""` | ✅ | Ngày mua |
| `value` | integer | ❌ | `0` | ✅ | Giá trị hợp đồng (VND) |
| `currency` | string | ❌ | `VND` | ❌ | Đơn vị tiền |
| `payment_status` | enum | ❌ | `paid` | ❌ | `pending` / `paid` / `partial` / `refunded` |
| `renewal_date` | date | ❌ | `""` | ❌ | Ngày gia hạn |
| `contract_end` | date | ❌ | `""` | ❌ | Ngày kết thúc HĐ |
| `lifetime_value` | integer | ❌ | `0` | ❌ | Tổng giá trị trọn đời (LTV) |
| `health_score` | integer | ❌ | `8` | ❌ | Điểm sức khỏe CSKH (1-10) |
| `nps_score` | integer | ❌ | `0` | ❌ | Net Promoter Score (1-10) |
| `upsell_potential` | enum | ❌ | `medium` | ✅ | `low` / `medium` / `high` |
| `next_action` | string | ❌ | `""` | ✅ | Hành động CSKH tiếp |
| `next_action_date` | date | ❌ | `""` | ✅ | Ngày thực hiện |
| `priority` | enum | ❌ | `medium` | ❌ | `low` / `medium` / `high` |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `updated` | date | ✅ | today | ❌ | Ngày cập nhật |
| `aliases` | array | ❌ | `[<filename>]` | ❌ | Aliases |
| `cssclasses` | array | ❌ | `[client-note]` | ❌ | CSS |
| `tags` | array | ✅ | `[client, opc_tnc, ai_agentic]` | ❌ | Tags |

---

## 5. DAILY (`type: daily`)

> Folder: `6_Daily (…)` | Template: `Template - Daily.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `daily` | ❌ | Luôn = `daily` |
| `pipeline_stage` | string | ❌ | `daily` | ✅ | Focus chính hôm nay |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên file |
| `date` | date | ✅ | today | ✅ | Ngày (YYYY-MM-DD) |
| `day_of_week` | string | ❌ | auto | ❌ | Thứ trong tuần |
| `energy_level` | integer | ❌ | `5` | ❌ | Mức năng lượng (1-10) |
| `status` | enum | ✅ | `open` | ✅ | `open` / `done` |
| `owner` | string | ✅ | `Victor Chuyen` | ✅ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `updated` | date | ✅ | today | ❌ | Ngày cập nhật |
| `aliases` | array | ❌ | `[<filename>]` | ❌ | Aliases |
| `cssclasses` | array | ❌ | `[daily-note]` | ❌ | CSS |
| `tags` | array | ✅ | `[daily, opc_tnc]` | ❌ | Tags |

---

## 6. PROPOSAL (`type: proposal`)

> Folder: `3_Offers (…)` | Template: `Template - Proposal.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `proposal` | ❌ | Luôn = `proposal` |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên proposal |
| `lead` | wikilink | ❌ | `""` | ❌ | Lead liên quan |
| `offer` | wikilink | ❌ | `""` | ❌ | Offer tham chiếu |
| `price` | integer | ❌ | `0` | ❌ | Giá đề xuất |
| `currency` | string | ❌ | `VND` | ❌ | Đơn vị tiền |
| `valid_until` | date | ❌ | today | ❌ | Hạn hiệu lực |
| `status` | enum | ✅ | `draft` | ❌ | `draft` / `sent` / `accepted` / `rejected` |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `updated` | date | ✅ | today | ❌ | Ngày cập nhật |
| `tags` | array | ✅ | `[proposal, opc_tnc, ai_agentic]` | ❌ | Tags |

---

## 7. CONTENT SCRIPT (`type: content-script`)

> Folder: `5_Content/2_Scripts/` | Template: `Template - Content Script.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `content-script` | ❌ | Entity type |
| `content_type` | string | ❌ | `""` | ❌ | Loại nội dung |
| `stage` | string | ❌ | `""` | ❌ | Stage trong pipeline phù hợp |
| `cta` | string | ❌ | `""` | ❌ | CTA chính |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `tags` | array | ✅ | `[content, script, opc_tnc]` | ❌ | Tags |

---

## 8. MARKET NEED (`type: market-need`)

> Folder: `5_Content/1_Market Needs/` | Template: `Template - Market Need.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `market-need` | ❌ | Entity type |
| `date` | date | ✅ | today | ❌ | Ngày ghi nhận |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `tags` | array | ✅ | `[market-need, ai_agentic, opc_tnc]` | ❌ | Tags |

---

## 9. PROJECT (`type: project`)

> Folder: `8_Projects (…)` | Template: `Template - Project.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `project` | ❌ | Entity type |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên dự án |
| `status` | enum | ✅ | `""` | ❌ | `planning` / `active` / `paused` / `completed` |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `start_date` | date | ❌ | `""` | ❌ | Ngày bắt đầu |
| `target_completion` | date | ❌ | `""` | ❌ | Ngày dự kiến hoàn thành |
| `tags` | array | ✅ | `[project, opc_tnc]` | ❌ | Tags |

---

## 10. SOP (`type: sop`)

> Folder: `9_Techniques & Support (…)` | Template: `Template - SOP.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `sop` | ❌ | Entity type |
| `name` | string | ✅ | auto | ❌ | Tên SOP |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `assigned_role` | string | ❌ | `""` | ❌ | Vai trò AI Agent phụ trách |
| `tags` | array | ✅ | `[sop, technique, opc_tnc]` | ❌ | Tags |

---

## 11. COMPETITOR (`type: competitor`)

> Folder: `7_Resources/4_Competitors/` | Template: `Template - Competitor.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `competitor` | ❌ | Entity type |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên file |
| `competitor_name` | string | ❌ | `""` | ❌ | Tên đối thủ |
| `positioning` | string | ❌ | `""` | ❌ | Định vị |
| `price_range` | string | ❌ | `""` | ❌ | Khoảng giá |
| `threat_level` | enum | ❌ | `medium` | ❌ | `low` / `medium` / `high` |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `tags` | array | ✅ | `[competitor, intelligence, opc_tnc]` | ❌ | Tags |

---

## 12. TESTIMONIAL (`type: testimonial`)

> Folder: `7_Resources/1_Case Studies/` | Template: `Template - Testimonial.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `testimonial` | ❌ | Entity type |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên file |
| `client` | wikilink | ❌ | `""` | ❌ | Client liên quan |
| `service_bought` | string | ❌ | `""` | ❌ | Gói đã mua |
| `rating` | integer | ❌ | `5` | ❌ | Đánh giá (1-5) |
| `permission_to_share` | boolean | ❌ | `true` | ❌ | Cho phép chia sẻ |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `tags` | array | ✅ | `[testimonial, case_study, opc_tnc]` | ❌ | Tags |

---

## 13. EMAIL REPLY (`type: email-reply`)

> Folder: `5_Content/4_Emails/` | Template: `Template - Email Reply.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `email-reply` | ❌ | Entity type |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên file |
| `scenario` | string | ❌ | `""` | ❌ | Tình huống áp dụng |
| `target_stage` | string | ❌ | `""` | ❌ | Stage phù hợp |
| `cta_type` | string | ❌ | `""` | ❌ | Loại CTA |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `tags` | array | ✅ | `[script, email, opc_tnc]` | ❌ | Tags |

---

## 14. WEEKLY REVIEW (`type: weekly-review`)

> Folder: `10_Reviews/` | Template: `Template - Weekly Review.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `weekly-review` | ❌ | Entity type |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên file |
| `week_number` | string | ✅ | auto | ❌ | Tuần thứ mấy |
| `year` | string | ✅ | auto | ❌ | Năm |
| `leads_gained` | integer | ❌ | `0` | ❌ | Số lead mới trong tuần |
| `calls_made` | integer | ❌ | `0` | ❌ | Số cuộc gọi |
| `deals_won` | integer | ❌ | `0` | ❌ | Số deal thắng |
| `revenue_generated` | integer | ❌ | `0` | ❌ | Doanh thu (VND) |
| `currency` | string | ❌ | `VND` | ❌ | Đơn vị tiền |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `tags` | array | ✅ | `[review, weekly, opc_tnc]` | ❌ | Tags |

---

## 15. MONTHLY REPORT (`type: monthly-report`)

> Folder: `10_Reviews/` | Template: `Template - Monthly Report.md`

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `monthly-report` | ❌ | Entity type |
| `name` | string | ✅ | `<% tp.file.title %>` | ❌ | Tên file |
| `month` | string | ✅ | auto | ❌ | Tháng |
| `year` | string | ✅ | auto | ❌ | Năm |
| `total_revenue` | integer | ❌ | `0` | ❌ | Tổng doanh thu |
| `total_leads` | integer | ❌ | `0` | ❌ | Tổng leads |
| `total_clients` | integer | ❌ | `0` | ❌ | Tổng clients mới |
| `conversion_rate` | integer | ❌ | `0` | ❌ | Tỷ lệ chuyển đổi (%) |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `created` | date | ✅ | today | ❌ | Ngày tạo |
| `tags` | array | ✅ | `[report, monthly, opc_tnc]` | ❌ | Tags |

---

## 16. LLM WIKI (`type: llm-wiki`)

> Folder: `LLM-Wiki/` | Không có template (tạo thủ công)

| Field | Type | Required | Default | Synced | Values / Description |
|-------|------|----------|---------|--------|---------------------|
| `type` | string | ✅ | `llm-wiki` | ❌ | Entity type |
| `wiki_section` | string | ✅ | varies | ❌ | Section identifier |
| `version` | string | ✅ | `"1.0"` | ❌ | Phiên bản nội dung |
| `last_updated` | date | ✅ | today | ❌ | Ngày cập nhật |
| `owner` | string | ✅ | `Victor Chuyen` | ❌ | Owner |
| `tags` | array | ✅ | `[llm_wiki, opc_tnc]` | ❌ | Tags |

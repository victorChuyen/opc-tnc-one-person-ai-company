---
type: llm-wiki
wiki_section: naming-conventions
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Naming Conventions
  - Tag Rules
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - naming
  - conventions
  - opc_tnc
---

# 📏 NAMING & TAG CONVENTIONS — QUY ƯỚC ĐẶT TÊN OPC-TNC

> AI đọc file này để tạo file mới LUÔN ĐÚNG CHUẨN: đặt tên, gắn tag, wikilink, chọn folder.

---

## 1. FILE NAMING PATTERNS

| Entity Type | Format | Ví dụ |
|-------------|--------|-------|
| `lead` | `YYYY-MM-DD - [Tên Lead] [Tên Cty].md` | `2026-07-30 - Demo Lead 01 Mr. Thắng Win.md` |
| `call` | `YYYY-MM-DD - [Loại Call] - [Tên].md` | `2026-07-30 - Discovery - Mr. Thắng Win.md` |
| `offer` | `Offer # - [Tên Offer].md` | `Offer 1 - Khóa học AI Agentic Nền tảng.md` |
| `proposal` | `Proposal - [Tên Lead].md` | `Proposal - Demo Lead 01.md` |
| `client` | `Client - [Tên].md` | `Client - Mr. Thắng Win.md` |
| `daily` | `YYYY-MM-DD.md` | `2026-07-30.md` |
| `content-script` | `Script # - [Tên].md` | `Script 1 - Hỏi pain.md` |
| `market-need` | `YYYY-MM-DD - [Insight].md` | `2026-08-01 - Insight thị trường.md` |
| `email-reply` | `Email - [Scenario].md` | `Email - Follow-up sau demo.md` |
| `project` | `#_Project - [Tên].md` | `3_Project - Sprint 10 Lead Real Operations.md` |
| `sop` | `#_SOP - [Tên].md` | `1_SOP - Lead Intake.md` |
| `weekly-review` | `Week ## - YYYY.md` | `Week 31 - 2026.md` |
| `monthly-report` | `Month ## - YYYY.md` | `Month 07 - 2026.md` |
| `competitor` | `Competitor - [Tên].md` | `Competitor - Agency XYZ.md` |
| `testimonial` | `Testimonial - [Tên Client].md` | `Testimonial - Mr. Thắng Win.md` |

### Quy tắc chung

1. **Date format:** Luôn dùng `YYYY-MM-DD` (ISO 8601)
2. **Không dùng đuôi kép:** `.md` chỉ xuất hiện 1 lần (KHÔNG `.md.md`)
3. **Dấu gạch ngang cho date:** `2026-07-30` (KHÔNG `2026/07/30`)
4. **Khoảng trắng OK:** Obsidian handle được khoảng trắng trong tên file
5. **Ký tự đặc biệt:** Tránh `/ \ : * ? " < > |` trong tên file

---

## 2. FOLDER ASSIGNMENT RULES

| Type | Folder đích | Ghi chú |
|------|-------------|---------|
| `lead` | `1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)` | |
| `call` | `2_Calls ( mọi cuộc gọi tư vấn, discovery, follow-up.)` | |
| `offer` | `3_Offers ( khóa học, gói tư vấn, công cụ, quà tặng, upsell.)` | |
| `proposal` | `3_Offers (…)` | Cùng folder với offer |
| `client` | `4_Clients ( khách đã mua.)` | |
| `content-script` | `5_Content ( bài viết…)/2_Scripts/` | Subfolder |
| `market-need` | `5_Content (…)/1_Market Needs/` | Subfolder |
| `email-reply` | `5_Content (…)/4_Emails/` | Subfolder |
| `daily` | `6_Daily ( nhật ký vận hành mỗi ngày.)` | |
| `testimonial` | `7_Resources (…)/1_Case Studies/` | |
| `competitor` | `7_Resources (…)/4_Competitors/` | |
| `project` | `8_Projects ( Dự án, Mã nguồn, Tools App, Dịch Vụ Để bán..)` | |
| `sop` | `9_Techniques & Support ( Kỹ thuật & Chăm sóc khách hàng)` | |
| `weekly-review` | `10_Reviews/` | |
| `monthly-report` | `10_Reviews/` | |
| `llm-wiki` | `LLM-Wiki/` | Meta-docs |

---

## 3. TAG CONVENTIONS

### Quy tắc tag

1. **Dùng underscore `_`** — KHÔNG dùng hyphen `-`
   - ✅ `opc_tnc`, `ai_agentic`, `case_study`
   - ❌ `opc-tnc`, `ai-agentic`

2. **Lowercase** — Không viết hoa
   - ✅ `lead`, `client`
   - ❌ `Lead`, `CLIENT`

3. **Không dùng dấu tiếng Việt** trong tags
   - ✅ `content_marketing`
   - ❌ `nội_dung`

### Danh sách tags chuẩn

#### Tags bắt buộc theo type

| Type | Tags bắt buộc |
|------|---------------|
| `lead` | `lead`, `opc_tnc`, `ai_agentic` |
| `call` | `call`, `opc_tnc`, `ai_agentic` |
| `offer` | `offer`, `opc_tnc`, `ai_agentic` |
| `client` | `client`, `opc_tnc`, `ai_agentic` |
| `daily` | `daily`, `opc_tnc` |
| `proposal` | `proposal`, `opc_tnc`, `ai_agentic` |
| `sop` | `sop`, `technique`, `opc_tnc` |
| `testimonial` | `testimonial`, `case_study`, `opc_tnc` |
| `competitor` | `competitor`, `intelligence`, `opc_tnc` |
| `weekly-review` | `review`, `weekly`, `opc_tnc` |
| `monthly-report` | `report`, `monthly`, `opc_tnc` |
| `content-script` | `content`, `script`, `opc_tnc` |
| `market-need` | `market_need`, `ai_agentic`, `opc_tnc` |
| `email-reply` | `script`, `email`, `opc_tnc` |
| `project` | `project`, `opc_tnc` |
| `llm-wiki` | `llm_wiki`, `opc_tnc` |

#### Tags tuỳ chọn (optional)

| Tag | Khi nào dùng |
|-----|-------------|
| `real_operations` | Data thật, không phải demo |
| `sprint` | Thuộc sprint project |
| `lead_intake` | Liên quan quy trình intake |
| `sales_closing` | Liên quan quy trình chốt sales |
| `client_care` | Liên quan CSKH |
| `upsell` | Liên quan bán thêm |
| `content_marketing` | Nội dung marketing |
| `ads_creative` | Quảng cáo sáng tạo |
| `directive` | Chỉ thị nhiệm vụ |

---

## 4. WIKILINK CONVENTIONS

### Khi nào tạo wikilink

| Trường hợp | Tạo link | Ví dụ |
|------------|---------|-------|
| Lead ↔ Call | ✅ | `[[2026-07-30 - Discovery - Mr. Thắng Win]]` |
| Lead ↔ Offer | ✅ | `[[Offer 1 - Khóa học AI Agentic Nền tảng]]` |
| Lead ↔ Client | ✅ | `[[Client - Mr. Thắng Win]]` |
| Call ↔ Lead | ✅ | `[[2026-07-30 - Demo Lead 01 Mr. Thắng Win]]` |
| Client ↔ Testimonial | ✅ | `[[Testimonial - Mr. Thắng Win]]` |
| SOP ↔ Template | ✅ | `[[Template - Lead]]` |
| Daily ↔ Lead/Call | ✅ nếu có tương tác | `[[2026-07-30 - Demo Lead 01 Mr. Thắng Win]]` |
| Notes ↔ Blueprint | ✅ | `[[OPC-TNC – Project Blueprint]]` |

### Format wikilink

```markdown
## 8. Liên kết
- Offer liên quan: [[Offer 1 - Khóa học AI Agentic Nền tảng]]
- Call liên quan: [[2026-07-30 - Discovery - Mr. Thắng Win]]
- Content liên quan: [[Script 2 - Mời đặt lịch demo]]
- Khách hàng tương tự: [[Client - Mr. Thắng Win]]
```

### Quy tắc wikilink

1. **Dùng tên file chính xác** (không cần đường dẫn folder)
2. **Không dùng alias** trong link trừ khi tên quá dài
3. **Section "Liên kết" bắt buộc** trong mọi template Lead, Call, Client, Offer
4. **Wikilink trong frontmatter:** Dùng dạng text thường, KHÔNG dùng `[[]]`

---

## 5. DATE FORMAT STANDARDS

| Nơi sử dụng | Format | Ví dụ |
|-------------|--------|-------|
| Frontmatter YAML | `YYYY-MM-DD` | `2026-07-30` |
| File name | `YYYY-MM-DD` | `2026-07-30 - Lead.md` |
| Nhật ký tương tác | `YYYY-MM-DD` | `- 2026-07-30: Gửi tài nguyên` |
| Google Sheets | `YYYY-MM-DD` | Column date |
| Templater auto | `<% tp.date.now("YYYY-MM-DD") %>` | Auto-fill |

> **Luôn dùng ISO 8601 (YYYY-MM-DD).** KHÔNG dùng DD/MM/YYYY hay MM-DD-YYYY.

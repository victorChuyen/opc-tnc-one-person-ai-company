# OPC-TNC – Project Blueprint

> **Phiên bản:** 3.0 — cập nhật 2026-08-07 19:15  
> **Owner:** Chairman Victor Chuyen  
> **Mục đích file này:** Đây là **tài liệu gốc duy nhất** (Single Source of Truth) mô tả toàn bộ hệ thống OPC-TNC. Bất cứ ai (người hoặc AI) đọc file này đều phải hiểu được kiến trúc, data model, cách vận hành, trạng thái hiện tại, và cách tiếp tục phát triển.

---

## MỤC LỤC

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Kiến trúc tổng quan](#2-kiến-trúc-tổng-quan)
3. [Obsidian Vault — Cấu trúc thư mục](#3-obsidian-vault--cấu-trúc-thư-mục)
4. [Google Sheets — Bảng điều khiển](#4-google-sheets--bảng-điều-khiển)
5. [Apps Script — Đồng bộ 2 chiều](#5-apps-script--đồng-bộ-2-chiều)
6. [Web App 3D Simulator](#6-web-app-3d-simulator)
7. [Data Model — YAML Frontmatter](#7-data-model--yaml-frontmatter)
8. [LLM Wiki & Templates](#8-llm-wiki--templates)
9. [Luồng vận hành](#9-luồng-vận-hành)
10. [Roadmap MVP → V1](#10-roadmap-mvp--v1)
11. [Quy ước làm việc](#11-quy-ước-làm-việc)
12. [Tham chiếu nhanh — IDs & Links](#12-tham-chiếu-nhanh--ids--links)
13. [Changelog](#13-changelog)

---

## 1. Tổng quan dự án

### 1.1. OPC-TNC là gì?

OPC-TNC (One Person Company — Trần Nguyên Chuyên) là hệ thống **CRM + Knowledge Base + 3D Office Simulator + Workflow** cho dịch vụ tư vấn AI Agentic & SaaS, xây trên 4 trụ cột:

| Trụ cột | Công cụ | Vai trò |
|---------|---------|---------|
| **Giao diện 3D** | Web App 3D (`index.html`) | 3D Real-Time Humanoid AI Company Simulator (Hub-and-Spoke 5 C-suite) |
| **Kho tri thức** | Obsidian Vault + LLM Wiki | Lưu trữ 19 wiki docs, notes, templates, SOP, pipeline data |
| **Bảng điều khiển** | Google Sheets | Dashboard, KPI, scoring, báo cáo 9 tabs |
| **Ống đồng bộ** | Google Apps Script + Engine | Sync 2 chiều Obsidian ↔ Sheets ↔ Telegram Bot API |

### 1.2. MVP được thiết kế để:

- Cho phép **1 người (founder/consultant)** vận hành toàn bộ pipeline **Leads → Calls → Offers → Clients → Daily** trực tiếp trong Obsidian
- Dữ liệu luôn có bản sạch trên Google Sheets để phân tích, báo cáo, và cho AI đọc
- Mọi file đều có **YAML frontmatter** chuẩn, giúp AI và các agent có thể parse, lọc, tự động hóa
- Chuẩn hóa cách định nghĩa **Projects, SOP, Resources** để AI có thể đọc, sinh thêm, cập nhật

### 1.3. Offer chính

- **Entry Offer:** Demo AI Agent KM 90% = **1.000.000đ/lead**
- **Target:** Đạt 10 lead → 3-5 lead trả phí → có case study

---

## 2. Kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────────────────┐
│                    KIẾN TRÚC OPC-TNC                            │
│                                                                 │
│  ┌─────────────────┐    Google Drive     ┌──────────────────┐  │
│  │  Obsidian Vault  │◄──── Sync ────────►│ Google Sheets    │  │
│  │  (Local PC)      │    for Desktop      │ (Cloud)          │  │
│  │                  │                     │                  │  │
│  │  D:\OPC-TNC\     │                     │ OPC_TNC_MVP_     │  │
│  │  OPC-TNC\        │                     │ Roadmap          │  │
│  │                  │                     │                  │  │
│  │  ┌────────────┐  │   Apps Script       │  ┌────────────┐ │  │
│  │  │ .md files  │◄─┼──── 2-way sync ───►┼─►│ 5 Tabs     │ │  │
│  │  │ (YAML FM)  │  │   (code.gs)         │  │ (data)     │ │  │
│  │  └────────────┘  │                     │  └────────────┘ │  │
│  │                  │                     │  ┌────────────┐ │  │
│  │  Plugins:        │                     │  │ 4 Tabs     │ │  │
│  │  - QuickAdd      │                     │  │ (mgmt)     │ │  │
│  │  - (Dataview)*   │                     │  └────────────┘ │  │
│  │  - (Templater)*  │                     │                  │  │
│  └─────────────────┘                     └──────────────────┘  │
│                                                                 │
│  * = Cần cài nhưng chưa cài                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Luồng dữ liệu:**
1. User tạo/sửa note `.md` trong Obsidian (lưu local)
2. Google Drive for Desktop sync file lên cloud
3. Apps Script đọc file `.md` từ Drive → parse YAML → ghi vào Sheet (`syncVaultToSheet`)
4. User/AI chỉnh dữ liệu trên Sheet
5. Apps Script đọc Sheet → update frontmatter trong file `.md` (`syncSheetToVault`)

---

## 3. Obsidian Vault — Cấu trúc thư mục

### 3.1. Cây thư mục hiện tại

```
D:\OPC-TNC\OPC-TNC\
│
├── .obsidian/                          ← Config Obsidian
│   ├── plugins/quickadd/               ← Plugin duy nhất đã cài
│   ├── core-plugins.json
│   ├── community-plugins.json          ← ["quickadd"]
│   └── templates.json                  ← {"folder": "_Templates"}
│
├── _Templates/                         ← 13 templates (có trùng lặp)
│   ├── Template - Lead OPC TNC.md
│   ├── Template - Lead OPC.md          ← DUPLICATE — cần xóa
│   ├── Template - Call OPC TNC.md      ← BUG: type=offer thay vì call
│   ├── Template - Call OPC.md          ← DUPLICATE
│   ├── Template - Client OPC TNC.md
│   ├── Template - Client OPC.md        ← DUPLICATE
│   ├── Template - Daily OPC TNC.md
│   ├── Template - Daily OPC.md         ← DUPLICATE
│   ├── Template - Offer OPC.md
│   ├── Template - Content Script OPC.md
│   ├── Template - Market Need OPC.md
│   ├── Template - Project OPC.md
│   └── Template - SOP OPC.md
│
├── _Attachments/                       ← File đính kèm (trống)
│
├── 1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)/
│   ├── 2026-07-30 - Demo Lead 01 Mr. Thắng Win.md    ← 1 file thật
│   ├── 2026-08-01 - Demo Lead 01.md.md                ← BUG: đuôi kép
│   └── 2026-08-01 - Demo Lead 02.md.md                ← BUG: đuôi kép
│
├── 2_Calls ( mọi cuộc gọi tư vấn, discovery, follow-up.)/
│   ├── 2026-07-30 - Discovery - Mr. Thắng Win.md     ← 1 file thật
│   ├── 2026-08-01 - Discovery - Demo Lead 01.md.md
│   └── 2026-08-01 - Discovery - Demo Lead 02.md.md
│
├── 3_Offers ( khóa học, gói tư vấn, công cụ, quà tặng, upsell.)/
│   ├── Offer 0 - Bộ công cụ Prompt Workflow.md.md
│   ├── Offer 1 - Khóa học AI Agentic Nền tảng.md.md
│   ├── Offer 2 - Gói tư vấn triển khai Agentic.md.md
│   └── Proposal - Demo Lead 01.md.md
│
├── 4_Clients ( khách đã mua.)/
│   ├── Client - Mr. Thắng Win.md                     ← 1 file thật
│   ├── Client - Demo Lead 01.md.md
│   └── Client - Demo Lead 02.md.md
│
├── 5_Content ( bài viết, script inbox, email, post giáo dục thị trường.)/
│   ├── 1_Market Needs/
│   │   └── 2026-08-01 - Insight thị trường.md.md
│   ├── 2_Scripts/
│   │   ├── Script 1 - Hỏi pain.md.md
│   │   ├── Script 2 - Mời đặt lịch demo.md.md
│   │   └── Script 3 - Upsell.md.md
│   └── 3_Posts/                                       ← Trống
│
├── 6_Daily ( nhật ký vận hành mỗi ngày.)/
│   ├── 2026-07-30 - Thắng Win.md                     ← 1 file thật
│   ├── 2026-08-01.md.md
│   └── 2026-08-02.md.md
│
├── 7_Resources ( tài liệu AI Agentic, case study, SOP.)/
│   ├── 1_Case Studies/                                ← Trống
│   ├── 2_SOPs/                                        ← Trống
│   └── 3_Tools/                                       ← Trống
│
├── 8_Projects ( Dự án, Mã nguồn, Tools App, Dịch Vụ Để bán..)/
│   ├── OPC Dashboard.md                               ← Dataview queries (thiếu wrapper)
│   ├── 1_Project - OPC Dashboard.md.md                ← 0 bytes, trống
│   └── 2_Project - Agentic Service Blueprint.md.md    ← 0 bytes, trống
│
├── 9_Techniques & Support ( Kỹ thuật & Chăm sóc khách hàng  ← BUG: thiếu )
│   ├── 1_SOP - Lead Intake.md.md
│   ├── 2_SOP - Follow-up.md.md
│   └── 3_SOP - Client Care.md.md
│
└── OPC-TNC – Project Blueprint.md                     ← FILE NÀY
```

### 3.2. Plugins đã cài

| Plugin | Status | Ghi chú |
|--------|--------|---------|
| QuickAdd | ✅ Đã cài | Tạo note nhanh |
| Dataview | ❌ **Chưa cài** | Cần thiết cho Dashboard queries |
| Templater | ❌ **Chưa cài** | Cần cho `<% tp.file.title %>` syntax |
| Tasks | ❌ Chưa cài | Task management cross-file |
| Calendar | ❌ Chưa cài | Daily note navigation |
| Kanban | ❌ Chưa cài | Visual pipeline |

### 3.3. Nguyên tắc tổ chức Vault

- Mọi note thuộc pipeline (Lead/Call/Offer/Client/Daily) **phải có frontmatter chuẩn**
- Template đảm bảo note mới luôn đúng cấu trúc
- Folders 7/8/9 là nơi AI có thể bổ sung kiến thức, SOP, project mà không ảnh hưởng pipeline
- Liên kết giữa modules bằng `[[wikilink]]` trong section "Liên kết"

---

## 4. Google Sheets — Bảng điều khiển

### 4.1. Thông tin kết nối

| Thuộc tính | Giá trị |
|------------|---------|
| **Tên file** | OPC_TNC_MVP_Roadmap |
| **Sheet ID** | `1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24` |
| **URL** | [Google Sheets](https://docs.google.com/spreadsheets/d/1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24/edit) |

### 4.2. Danh sách Tabs (9 tabs)

#### Tabs SYNC (đồng bộ với Obsidian):

**Tab 1: Leads**
| Column | Field | Mô tả |
|--------|-------|-------|
| A | `File name` | Tên file .md trong vault |
| B | `name` | Tên lead |
| C | `phone` | Số điện thoại |
| D | `source` | Kênh đến (Zalo/Facebook/Referral...) |
| E | `status` | Trạng thái (new/qualified/proposal/won/lost) |
| F | `company` | Công ty |
| G | `industry` | Ngành |
| H | `desire` | Mục tiêu mong muốn |
| I | `offer_fit` | Offer phù hợp |
| J | `next_action` | Hành động tiếp theo |
| K | `next_action_date` | Ngày thực hiện (YYYY-MM-DD) |

**Tab 2: Calls**
| Column | Field | Mô tả |
|--------|-------|-------|
| A | `File name` | Tên file .md |
| B | `lead` | Link đến lead note |
| C | `client` | Link đến client nếu đã mua |
| D | `call_type` | Loại (discovery/follow-up/review) |
| E | `date` | Ngày gọi |
| F | `pipeline_stage` | Stage của deal khi call |
| G | `offer_recommended` | Offer đề xuất |
| H | `next_action` | Hành động tiếp theo |
| I | `next_action_date` | Ngày thực hiện |
| J | `status` | Trạng thái (open/done) |

**Tab 3: Offers**
| Column | Field | Mô tả |
|--------|-------|-------|
| A | `File name` | Tên file .md |
| B | `offer_type` | Loại (course/consulting/toolkit/bundle) |
| C | `name` | Tên offer |
| D | `target_audience` | Nhóm khách |
| E | `problem_solved` | Vấn đề chính giải quyết |
| F | `delivery_format` | Hình thức (online/hybrid/template/app) |
| G | `cta` | Call-to-action chính |
| H | `price` | Giá |
| I | `status` | Trạng thái (active/deprecated) |

**Tab 4: Clients**
| Column | Field | Mô tả |
|--------|-------|-------|
| A | `File name` | Tên file .md |
| B | `client` | Tên khách |
| C | `company` | Công ty |
| D | `client_status` | Trạng thái (active/churn/prospect) |
| E | `service_bought` | Offer đã mua |
| F | `date_bought` | Ngày mua |
| G | `value` | Giá trị hợp đồng |
| H | `upsell_potential` | Tiềm năng upsell (low/medium/high) |
| I | `next_action` | Hành động chăm sóc |
| J | `next_action_date` | Ngày thực hiện |

**Tab 5: Daily**
| Column | Field | Mô tả |
|--------|-------|-------|
| A | `File name` | Tên file .md |
| B | `date` | Ngày (YYYY-MM-DD) |
| C | `owner` | Người vận hành |
| D | `pipeline_stage` | Focus chính hôm nay |
| E | `status` | Trạng thái (open/done) |

#### Tabs QUẢN LÝ (không sync):

**Tab 6: Roadmap Checklist** — 38 tasks chia 8 giai đoạn:

| Giai đoạn | Nội dung | Số tasks | Status |
|-----------|----------|----------|--------|
| 0 | Định vị & Offer | 5 | ⬜ Chưa xong |
| 1 | Hệ thống vận hành (vault, template, plugins, dashboard) | 6 | ⬜ Chưa xong |
| 2 | Đóng gói Offer (KM 90%, giá, CTA) | 4 | ⬜ Chưa xong |
| 3 | Nguồn lead (Zalo, FB group, outreach 10 người/ngày) | 5 | ⬜ Chưa xong |
| 4 | Quy trình xử lý lead (tạo note, hỏi 3 câu, demo, chốt) | 8 | ⬜ Chưa xong |
| 5 | SOP Demo (viết SOP 5 bước, test 1-3 khách) | 2 | ⬜ Chưa xong |
| 6 | Thu tiền & Fulfillment (chuyển khoản, giao 48h, feedback) | 4 | ⬜ Chưa xong |
| 7 | Nhân bản quy trình (SOP, case study, gói tháng) | 4 | ⬜ Chưa xong |

**Tab 7: Lead Tracker 1-10** — Bảng theo dõi 10 lead đầu tiên:
- Columns: `Lead #`, `Tên khách`, `Nguồn`, `Ngày liên hệ`, `Ngày demo`, `Kết quả demo`, `Trả phí (1tr)`, `Ngày trả phí`, `Case study`, `Ghi chú`
- Hiện tại: 10 placeholder rows, chưa có data

**Tab 8: Mốc tổng** — 4 milestones lớn:

| Mốc | Nội dung | Trạng thái |
|-----|----------|------------|
| 1 | Hệ thống vận hành hoàn chỉnh (vault + template + QuickAdd + Dashboard) | ⬜ Chưa xong |
| 2 | Offer KM 90% viết rõ ràng, có giới hạn số lượng | ⬜ Chưa xong |
| 3 | Có đủ 10 lead thật được tạo note trong 1_Leads | ⬜ Chưa xong |
| 4 | Có tối thiểu 3-5 lead trả phí thật 1.000.000đ, có case study | ⬜ Chưa xong |

**Tab 9: INFO** — Lưu trữ IDs và links tham chiếu:

| Key | Value |
|-----|-------|
| ID Thư mục Online (Drive) | `15qaLlg9GEeLTi0zofTT_PK5U4QRDtq_h` |
| ID Thư mục Local | `1_Opbp7UTwPoeImKVKR7oqPUYSSYKEjMY` |
| ID Sheet | `1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24` |
| + Các links Miro, NotebookLM, Zalo, tài nguyên AI Creator |

---

## 5. Apps Script — Đồng bộ 2 chiều

### 5.1. Thông tin kết nối

| Thuộc tính | Giá trị |
|------------|---------|
| **Script Editor** | Tiện ích → Apps Script (trong Google Sheets) |
| **Files** | `code.gs` + `Sidebar.html` |
| **Vault Folder ID** | `15qaLlg9GEeLTi0zofTT_PK5U4QRDtq_h` |
| **Sheet ID** | `1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24` |

### 5.2. Cấu hình Mapping — `OPC_CONFIG`

Đây là **trái tim** của hệ thống sync. Object này định nghĩa:
- `folderName`: tên folder trên Google Drive chứa files `.md`
- `sheetName`: tên tab trên Google Sheets
- `fields`: danh sách YAML frontmatter fields cần sync

```js
const OPC_CONFIG = {
  Leads: {
    folderName: '1_Leads',
    sheetName: 'Leads',
    fields: ['name', 'phone', 'source', 'status', 'company', 'industry',
             'desire', 'offer_fit', 'next_action', 'next_action_date']
  },
  Calls: {
    folderName: '2_Calls',
    sheetName: 'Calls',
    fields: ['lead', 'client', 'call_type', 'date', 'pipeline_stage',
             'offer_recommended', 'next_action', 'next_action_date', 'status']
  },
  Offers: {
    folderName: '3_Offers',
    sheetName: 'Offers',
    fields: ['offer_type', 'name', 'target_audience', 'problem_solved',
             'delivery_format', 'cta', 'price', 'status']
  },
  Clients: {
    folderName: '4_Clients',
    sheetName: 'Clients',
    fields: ['client', 'company', 'client_status', 'service_bought',
             'date_bought', 'value', 'upsell_potential', 'next_action',
             'next_action_date']
  },
  Daily: {
    folderName: '6_Daily',
    sheetName: 'Daily',
    fields: ['date', 'owner', 'pipeline_stage', 'status']
  }
};
```

### 5.3. Danh sách Functions

| Function | Mô tả | Gọi từ |
|----------|--------|--------|
| `onOpen()` | Tạo menu "OPC-TNC Sync" | Tự động khi mở Sheet |
| `getConfig()` | Trả config cho Sidebar | Sidebar.html |
| `setupOpcTncSheets()` | Tạo tabs + headers từ OPC_CONFIG | Menu |
| `getFolderByNameInRoot(folderName)` | Tìm folder trong Drive | Internal |
| `parseFrontmatter(text)` | Parse `---` YAML block → object | Internal |
| `updateFrontmatter(text, fields)` | Update YAML fields, giữ body | Internal |
| `syncVaultToSheet(typeKey)` | **Obsidian → Sheet** (generic) | Internal |
| `syncSheetToVault(typeKey)` | **Sheet → Obsidian** (generic) | Internal |
| `syncLeadsToSheet()` | Wrapper: Leads vault → sheet | Menu |
| `syncSheetToLeads()` | Wrapper: Leads sheet → vault | Menu |
| `syncCallsToSheet()` / `syncSheetToCalls()` | Calls sync | Menu |
| `syncOffersToSheet()` / `syncSheetToOffers()` | Offers sync | Menu |
| `syncClientsToSheet()` / `syncSheetToClients()` | Clients sync | Menu |
| `syncDailyToSheet()` / `syncSheetToDaily()` | Daily sync | Menu |

### 5.4. Menu OPC-TNC Sync (trong Google Sheets)

```
OPC-TNC Sync
├── 1. Setup tất cả sheet
├── ──────────────
├── 2. Obsidian → Sheet (Leads)
├──    Sheet → Obsidian (Leads)
├── ──────────────
├── 3. Obsidian → Sheet (Calls)
├──    Sheet → Obsidian (Calls)
├── ──────────────
├── 4. Obsidian → Sheet (Offers)
├──    Sheet → Obsidian (Offers)
├── ──────────────
├── 5. Obsidian → Sheet (Clients)
├──    Sheet → Obsidian (Clients)
├── ──────────────
├── 6. Obsidian → Sheet (Daily)
└──    Sheet → Obsidian (Daily)
```

### 5.5. Sidebar.html

File UI sidebar (trong Apps Script) hỗ trợ thao tác sync nhanh cho Leads. Hiện tại chỉ có 2 nút: "Obsidian → Sheet (Leads)" và "Sheet → Obsidian (Leads)". Hiển thị config (Folder ID, Sheet ID) và log kết quả.

---

## 6. Data Model — YAML Frontmatter

### 6.1. Lead

```yaml
---
type: lead
pipeline_stage: lead
name: <Tên lead>
status: new          # new | qualified | proposal | negotiation | won | lost
priority: medium     # low | medium | high
source: ""           # zalo | facebook | referral | website | event
segment: ""
industry: ""
company: ""
role: ""
phone: ""
email: ""
zalo: ""
fb_profile: ""
problem: ""
desire: ""
awareness_level: ""  # unaware | problem_aware | solution_aware | product_aware
offer_fit: ""
budget: ""
decision_maker: ""
next_action: ""
next_action_date: YYYY-MM-DD
owner: Victor Chuyen
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - lead
  - opc_tnc
  - ai_agentic
---
```

**Fields sync với Sheet:** `name`, `phone`, `source`, `status`, `company`, `industry`, `desire`, `offer_fit`, `next_action`, `next_action_date`

**Fields chỉ trong Obsidian:** `type`, `pipeline_stage`, `priority`, `segment`, `role`, `email`, `zalo`, `fb_profile`, `problem`, `awareness_level`, `budget`, `decision_maker`, `owner`, `created`, `updated`, `tags`

### 6.2. Call

```yaml
---
type: call
pipeline_stage: call
name: <Tên cuộc gọi>
lead: ""             # wikilink hoặc tên lead
client: ""           # wikilink hoặc tên client
call_type: discovery # discovery | follow_up | review | closing
date: YYYY-MM-DD
result: ""           # positive | neutral | negative | no_show
offer_recommended: ""
next_action: ""
next_action_date: ""
status: open         # open | done
owner: Victor Chuyen
tags:
  - call
  - opc_tnc
  - ai_agentic
---
```

**Fields sync với Sheet:** `lead`, `client`, `call_type`, `date`, `pipeline_stage`, `offer_recommended`, `next_action`, `next_action_date`, `status`

**Lưu ý:** Field `result` **có trong template nhưng KHÔNG có trong Apps Script** → không được sync.

### 6.3. Offer

```yaml
---
type: offer
pipeline_stage: offer
name: <Tên offer>
offer_type: ""       # course | consulting | toolkit | bundle | free_resource
target_audience: ""
problem_solved: ""
delivery_format: ""  # online | hybrid | template | app
cta: ""
price: ""
status: active       # draft | active | deprecated
owner: Victor Chuyen
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - offer
  - opc_tnc
  - ai_agentic
---
```

**Fields sync với Sheet:** `offer_type`, `name`, `target_audience`, `problem_solved`, `delivery_format`, `cta`, `price`, `status`

### 6.4. Client

```yaml
---
type: client
pipeline_stage: client
name: <Tên khách>
client_status: active  # active | paused | churned | completed
service_bought: ""
date_bought: ""
value: ""
renewal_date: ""
upsell_potential: ""   # low | medium | high
priority: medium
owner: Victor Chuyen
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - client
  - opc_tnc
  - ai_agentic
---
```

**Fields sync với Sheet:** `client` (→ tương ứng `name` trong Obsidian), `company`, `client_status`, `service_bought`, `date_bought`, `value`, `upsell_potential`, `next_action`, `next_action_date`

**Lưu ý BUG:** Sheet column `client` không khớp với Obsidian field `name`. Cần fix để thống nhất.

### 6.5. Daily

```yaml
---
type: daily
date: YYYY-MM-DD
owner: Victor Chuyen
pipeline_stage: ""   # focus chính hôm nay
status: open         # open | done
tags:
  - daily
  - opc_tnc
---
```

**Fields sync với Sheet:** `date`, `owner`, `pipeline_stage`, `status`

### 6.6. Content Script

```yaml
---
type: content-script
content_type: ""
stage: ""
cta: ""
owner: Victor Chuyen
tags:
  - content
  - script
  - opc_tnc
---
```

Không sync với Sheet.

### 6.7. Market Need

```yaml
---
type: market-need
date: YYYY-MM-DD
owner: Victor Chuyen
tags:
  - market-need
  - ai_agentic
  - opc_tnc
---
```

Không sync với Sheet.

### 6.8. Project

```yaml
---
type: project
status: ""
owner: Victor Chuyen
start_date: ""
tags:
  - project
  - opc_tnc
---
```

Không sync với Sheet.

### 6.9. SOP

```yaml
---
type: sop
owner: Victor Chuyen
tags:
  - sop
  - technique
  - opc_tnc
---
```

Không sync với Sheet.

---

## 7. Template hệ thống

### 7.1. Danh sách templates hiện có

| Template | Type | Sections | Status |
|----------|------|----------|--------|
| **Lead OPC TNC** | `lead` | Thông tin cơ bản, Nhu cầu, Pain, Mục tiêu, Chẩn đoán TNC, Giải pháp gửi trước, Hành động tiếp, Liên kết, Nhật ký | ✅ OK |
| **Call OPC TNC** | ⚠️ `offer` (BUG) | Mục tiêu call, Tóm tắt, Pain, Cơ hội AI, Giải pháp, Objection, Kết quả, Task sau call, Liên kết | 🔴 BUG: type sai |
| **Client OPC TNC** | `client` | Tóm tắt, Mục tiêu triển khai, Kết quả, Chăm sóc, Rủi ro, Upsell, Liên kết, Nhật ký CSKH | ✅ OK |
| **Daily OPC TNC** | `daily` | Mục tiêu hôm nay (6 tasks), Việc chốt, Lead follow-up, Call, Nội dung, Offer, CSKH, Bài học | ✅ OK |
| **Offer OPC** | `offer` | Dành cho ai, Vấn đề, Kết quả, Thành phần, Lý do mua, Giá, Khi nào dùng, Script gửi, Liên kết | ✅ OK |
| **Content Script OPC** | `content-script` | Mục tiêu, Hook, Pain, Insight, Giải pháp, CTA | ✅ OK |
| **Market Need OPC** | `market-need` | Câu hỏi thị trường, Pain lặp, Cơ hội nội dung, Offer gắn, Hành động | ✅ OK |
| **Project OPC** | `project` | Mục tiêu, Đầu ra, Tài nguyên, Task chính, Liên kết | ✅ OK (đơn giản) |
| **SOP OPC** | `sop` | Mục tiêu, Khi nào dùng, Từng bước, Lỗi thường, Lưu ý | ✅ OK (đơn giản) |

### 7.2. Templates DUPLICATE cần xóa

| Giữ (TNC / đầy đủ nhất) | Xóa |
|--------------------------|-----|
| Template - Lead OPC TNC.md | Template - Lead OPC.md |
| Template - Call OPC TNC.md (sau khi fix type) | Template - Call OPC.md |
| Template - Client OPC TNC.md | Template - Client OPC.md |
| Template - Daily OPC TNC.md | Template - Daily OPC.md |

---

## 8. Luồng vận hành

### 8.1. Quy trình hàng ngày

```
SÁNG                           TRƯA                          TỐI
─────                          ─────                         ─────
1. Mở Obsidian                 4. Gọi call discovery/        7. Ghi Daily log
2. Tạo Daily note              follow-up → ghi Call note     8. Review tasks
3. Outreach 10 leads           5. Demo → chốt deal           9. Sync Obsidian→Sheet
   → tạo Lead notes            6. Khách mua → tạo Client     10. Kiểm tra Sheet KPI
```

### 8.2. Pipeline flow chi tiết

```
                  ┌──────────────────────────────────────────────┐
                  │              SALES PIPELINE                   │
                  │                                               │
  Market Need     │  Lead        Call        Offer      Client    │
  ──────────      │  ────        ────        ─────      ──────    │
  Insight từ      │  Lead mới → Discovery → Gửi        Đã mua    │
  thị trường  ───►│  (new)       Call        Proposal   (active)  │
  (5_Content)     │     │           │           │          │      │
                  │     ▼           ▼           ▼          ▼      │
                  │  Qualified → Follow-up → Negotiate → Upsell   │
                  │     │           │           │                  │
                  │     ▼           ▼           ▼                  │
                  │   Lost      No show      Lost                  │
                  └──────────────────────────────────────────────┘
                                                    │
                                                    ▼
                                              Daily log ghi
                                              mọi hoạt động
```

### 8.3. Sync workflow

```
Tạo/sửa note           Drive sync           Apps Script          Sheet
trong Obsidian   ───►   lên Cloud   ───►    parse YAML    ───►   update
                                            + ghi Sheet           rows
     ◄───────────────────────────────────────────────────────────
                    file.setContent()       read Sheet rows
                    update frontmatter      build fields obj
```

### 8.4. Entry point cho AI/người mới

1. **Đọc file này** (Blueprint) — hiểu kiến trúc tổng quan
2. Đi vào `_Templates/` — hiểu data model và cấu trúc note
3. Xem `OPC Dashboard.md` — hiểu Dataview queries
4. Mở Apps Script — hiểu cơ chế sync
5. Xem Roadmap Checklist (Sheet) — hiểu trạng thái MVP
6. Bắt đầu làm việc theo Phase hiện tại trong Roadmap

---

## 9. Trạng thái hiện tại & Vấn đề đã biết

### 9.1. Trạng thái tổng (2026-07-30)

| Hạng mục | Trạng thái | Chi tiết |
|----------|------------|----------|
| **Vault structure** | 🟡 Có nhưng chưa clean | Folder OK, nhưng tên dài, file đuôi kép |
| **Templates** | 🟡 Có nhưng trùng lặp | 13 templates, 4 cặp duplicate, 1 bug type |
| **Plugins** | 🔴 Thiếu critical | Chỉ có QuickAdd, thiếu Dataview + Templater |
| **Dashboard** | 🔴 Không hoạt động | Thiếu code block wrapper, thiếu Dataview plugin |
| **Apps Script** | 🟡 Có nhưng có bugs | folderName sai, clearContents, thiếu fields |
| **Google Sheets** | 🟢 OK | 9 tabs đầy đủ, headers đúng |
| **Data thật** | 🟡 Rất ít | 1 lead thật (Mr. Thắng Win), còn lại demo |
| **Roadmap** | ⬜ 0/38 tasks | Chưa task nào hoàn thành |
| **Milestones** | ⬜ 0/4 mốc | Chưa mốc nào đạt |

### 9.2. Bugs & Issues đã phát hiện

#### 🔴 CRITICAL — Phải sửa trước khi vận hành

| # | Bug | Vị trí | Impact |
|---|-----|--------|--------|
| C1 | `Template - Call OPC TNC.md` có `type: offer` thay vì `type: call` | `_Templates/` | Call notes hiển thị sai trong Dashboard |
| C2 | Plugin **Dataview chưa cài** | `.obsidian/` | Dashboard queries không chạy |
| C3 | Plugin **Templater chưa cài** | `.obsidian/` | `<% tp.file.title %>` không render |
| C4 | **OPC Dashboard.md** thiếu ` ```dataview ` code block wrapper | `8_Projects/` | Queries hiện text thô thay vì bảng |
| C5 | Dashboard query `FROM "1_Leads"` **không khớp folder thật** `1_Leads ( lead mới...)` | `8_Projects/` | Queries trả về 0 kết quả |
| C6 | Apps Script `folderName: '1_Leads'` **không khớp folder Drive** | `code.gs` | Sync crash: "Không tìm thấy folder" |
| C7 | Apps Script `clearContents()` **xóa toàn bộ sheet** mỗi lần sync Vault→Sheet | `code.gs` | Mất data nhập tay trên Sheet |
| C8 | ~15 files có đuôi `.md.md` | Toàn vault | Wikilinks broken, Obsidian display sai |

#### 🟡 MAJOR — Nên sửa sớm

| # | Issue | Chi tiết |
|---|-------|----------|
| M1 | 4 cặp template trùng lặp (OPC vs OPC TNC) | Gây nhầm lẫn khi tạo note |
| M2 | Apps Script Calls.fields thiếu `result` | Field có trong template nhưng không sync |
| M3 | Sheet Clients dùng `client` vs Obsidian dùng `name` | Tên khách không sync đúng |
| M4 | `parseFrontmatter()` không handle YAML arrays (tags) | Tags có thể bị corrupt khi sync ngược |
| M5 | Không có conflict resolution khi sửa cả 2 phía | Data cũ ghi đè data mới |
| M6 | Folder 9 tên thiếu dấu `)` | Convention lỗi |
| M7 | Tags không nhất quán: `opc-tnc` vs `opc_tnc` | Tag view bị split |
| M8 | Liên kết giữa modules toàn bộ text trống (không dùng wikilink) | Graph rời rạc |
| M9 | Sidebar.html chỉ hỗ trợ Leads (không Calls/Offers/Clients/Daily) | Feature incomplete |
| M10 | Data files vẫn còn `<% tp.file.title %>` raw (Templater chưa chạy) | Frontmatter `name` là syntax code |

---

## 10. Roadmap MVP → V1

### 10.1. Milestones

| Mốc | Mô tả | Trạng thái |
|------|-------|------------|
| **M1** | Hệ thống vận hành hoàn chỉnh (vault + template + plugins + dashboard) | ⬜ |
| **M2** | Offer KM 90% viết rõ ràng, có giới hạn | ⬜ |
| **M3** | 10 lead thật trong 1_Leads | ⬜ |
| **M4** | 3-5 lead trả phí 1.000.000đ + case study | ⬜ |

### 10.2. Roadmap chi tiết (8 giai đoạn)

**Giai đoạn 0: Định vị & Offer**
- [ ] Chốt câu định vị OPC-TNC (giúp ai, giải quyết gì, bằng cách nào)
- [ ] Chọn ngách hẹp đầu tiên (agency / coach / shop online / dịch vụ local)
- [ ] Chốt Entry Offer: Demo AI Agent KM 90% = 1.000.000đ/lead
- [ ] Chốt lời hứa kết quả cụ thể của buổi demo
- [ ] Viết pitch 10 giây mở đầu mọi tin nhắn/cuộc gọi

**Giai đoạn 1: Hệ thống vận hành**
- [ ] Tạo cấu trúc vault OPC-TNC
- [ ] Tạo template v2: Lead, Call, Offer, Client, Daily
- [ ] Cấu hình Templates trỏ đúng folder _Templates
- [ ] Cài Dataview
- [ ] Cài QuickAdd + tạo 5 command
- [ ] Viết OPC Dashboard.md

**Giai đoạn 2: Đóng gói Offer**
- [ ] Viết Offer note cho gói demo KM 90%
- [ ] Ghi rõ giá gốc / giá KM / deadline / số lượng giới hạn
- [ ] Liệt kê kết quả cụ thể khách nhận được khi demo
- [ ] Viết CTA duy nhất trên landing page

**Giai đoạn 3: Nguồn lead**
- [ ] Chọn 2 kênh chính (Zalo cá nhân + Facebook group ngách)
- [ ] Viết 5 mẫu tin nhắn outreach mời xem demo
- [ ] Viết 3 content ngắn dạng vấn đề thị trường mỗi ngày
- [ ] Tạo link/form đặt lịch demo
- [ ] Outreach tối thiểu 10 người/ngày trong ngách đã chọn

**Giai đoạn 4: Quy trình xử lý lead**
- [ ] Lead quan tâm → tạo note trong 1_Leads
- [ ] Hỏi nhanh 3 câu: đang làm gì / vướng gì / dùng công cụ gì
- [ ] Mời đặt lịch demo trong 48h
- [ ] Tạo note Call trong 2_Calls trước buổi demo
- [ ] Demo bằng tình huống thật của khách
- [ ] Chốt gói KM 90% trong buổi hoặc trong 24h
- [ ] Khách mua → tạo note trong 4_Clients
- [ ] Khách chưa mua → set next_action_date để follow-up

**Giai đoạn 5: SOP Demo**
- [ ] Viết SOP 5 bước demo AI Agent cho OPC-TNC
- [ ] Kiểm thử SOP với 1-3 khách đầu tiên

**Giai đoạn 6: Thu tiền & Fulfillment**
- [ ] Thiết kế quy trình thu tiền đơn giản
- [ ] Giao kết quả demo/cài đặt trong tối đa 48h
- [ ] Ghi log triển khai vào Nhật ký CSKH trong Client note
- [ ] Xin feedback + xin phép làm case study

**Giai đoạn 7: Nhân bản quy trình**
- [ ] Chuẩn hoá SOP, script outreach/demo/chốt trong 7_Resources
- [ ] Xây 2-3 case study thật từ 10 lead đầu tiên
- [ ] Thiết kế gói tháng / chuyển giao mã nguồn trọn đời
- [ ] Từ lead 11 trở đi, cập nhật giá về mức chuẩn

### 10.3. Upgrade Plan (từ Audit 2026-07-30)

| Phase | Nội dung | Thời gian | Trạng thái |
|-------|----------|-----------|------------|
| 1 | Fix Critical Bugs (templates, files, naming) | ~30 phút | ⬜ |
| 2 | Cài plugins (Dataview, Templater, Tasks) | ~10 phút | ⬜ |
| 3 | Nâng cấp Frontmatter Schema | ~45 phút | ⬜ |
| 4 | Nâng cấp Apps Script V2 (fix bugs, upsert, new fields) | ~90 phút | ⬜ |
| 5 | Xây Dashboard hoàn chỉnh | ~60 phút | ⬜ |
| 6 | Thêm templates mới (Proposal, Weekly Review, Monthly Report) | ~30 phút | ⬜ |
| 7 | Restructure folders | ~15 phút | ⬜ |
| 8 | Xây dựng Wikilinks & Graph | ~20 phút | ⬜ |

---

## 11. Quy ước làm việc

### 11.1. Quy tắc thay đổi hệ thống

> **QUY TẮC VÀNG:** Mỗi thay đổi ảnh hưởng **3 nơi đồng thời**: Obsidian Template → Apps Script OPC_CONFIG → Google Sheets Headers. Phải cập nhật cả 3.

1. **Thêm field YAML mới:**
   - Thêm vào template trong `_Templates/`
   - Thêm vào `OPC_CONFIG.fields` trong `code.gs`
   - Chạy `setupOpcTncSheets()` hoặc thêm column thủ công trên Sheet
   - Ghi vào Changelog (section 13)

2. **Đổi tên folder:**
   - Rename trong Obsidian (không dùng File Explorer)
   - Update `OPC_CONFIG.folderName` trong `code.gs`
   - Update Dataview query paths trong Dashboard
   - Ghi vào Changelog

3. **Xóa field:**
   - KHÔNG bao giờ xóa field đang sync mà không backup
   - Đánh dấu deprecated trước, xóa sau 1 tuần

4. **Tạo note mới:**
   - Luôn dùng template (QuickAdd hoặc Templater)
   - Không tạo file thủ công vì sẽ thiếu frontmatter

5. **Sync data:**
   - Sync thủ công qua menu OPC-TNC Sync
   - Không sync liên tục (tránh quota Google API)
   - Nên sync 2-3 lần/ngày

### 11.2. Naming conventions

| Loại | Format | Ví dụ |
|------|--------|-------|
| Lead | `YYYY-MM-DD - Tên Lead.md` | `2026-07-30 - Mr. Thắng Win.md` |
| Call | `YYYY-MM-DD - Loại - Tên.md` | `2026-07-30 - Discovery - Mr. Thắng Win.md` |
| Offer | `Offer # - Tên Offer.md` | `Offer 1 - Khóa học AI Agentic.md` |
| Client | `Client - Tên.md` | `Client - Mr. Thắng Win.md` |
| Daily | `YYYY-MM-DD.md` | `2026-07-30.md` |
| SOP | `SOP # - Tên.md` | `SOP 1 - Lead Intake.md` |

### 11.3. Tag conventions

- Dùng **underscore**: `opc_tnc`, `ai_agentic` (KHÔNG dùng hyphen `opc-tnc`)
- Tags bắt buộc theo type: `lead`, `call`, `offer`, `client`, `daily`
- Tag chung: `opc_tnc`

---

## 12. Tham chiếu nhanh — IDs & Links

| Resource | ID / URL |
|----------|----------|
| **Google Drive Vault Folder** | `15qaLlg9GEeLTi0zofTT_PK5U4QRDtq_h` |
| **Google Drive Local Folder** | `1_Opbp7UTwPoeImKVKR7oqPUYSSYKEjMY` |
| **Google Sheets Dashboard** | `1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24` |
| **Sheets URL** | [Link](https://docs.google.com/spreadsheets/d/1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24/edit) |
| **Drive Vault URL** | [Link](https://drive.google.com/drive/u/0/folders/15qaLlg9GEeLTi0zofTT_PK5U4QRDtq_h) |
| **Apps Script** | Mở từ: Sheets → Tiện ích → Apps Script |
| **Local Vault Path** | `D:\OPC-TNC\OPC-TNC\` |

---

## 13. Changelog

### 2026-07-30 (v2.0) — Audit & Blueprint rewrite

- **AUDIT:** Đọc toàn bộ vault (14 templates, ~20 data files, Obsidian config, Apps Script code, 9 Google Sheet tabs)
- **PHÁT HIỆN:** 52 vấn đề (15 critical, 17 major, 20 enhancement)
- **BLUEPRINT:** Viết lại hoàn chỉnh file này với đầy đủ:
  - Kiến trúc 3 tầng (Obsidian + Sheets + Apps Script)
  - Cây thư mục chi tiết với trạng thái từng file
  - Data model đầy đủ cho 9 loại note
  - Google Sheets 9 tabs (headers, data, mục đích)
  - Apps Script functions reference
  - Danh sách bugs known
  - Roadmap 8 giai đoạn (38 tasks) từ Google Sheets
  - 4 milestones (Mốc tổng)
  - Upgrade plan 8 phases
  - Quy ước làm việc
  - IDs & links tham chiếu

### 2026-07-30 (v1.0) — Bản MVP đầu tiên

- Định nghĩa kiến trúc vault OPC-TNC
- Thiết lập mapping OPC_CONFIG cho Leads, Calls, Offers, Clients, Daily
- Viết Apps Script sync 2 chiều Obsidian ↔ Sheets
- Tạo file overview này làm Blueprint cho toàn bộ hệ thống

---

> **Ghi nhớ quan trọng:** File này phải được cập nhật mỗi khi có thay đổi kiến trúc, thêm field, đổi folder, hoặc fix bug. Nếu không, Blueprint sẽ lệch với thực tế và người sau sẽ không hiểu đúng hệ thống.
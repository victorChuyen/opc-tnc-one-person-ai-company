---
type: llm-wiki
wiki_section: architecture
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - System Architecture
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - architecture
  - opc_tnc
---

# 🏗️ SYSTEM ARCHITECTURE — OPC-TNC

> Kiến trúc 3 tầng: **Obsidian Vault** (Knowledge) + **Google Sheets** (Dashboard) + **Apps Script** (Sync Engine)

---

## 1. SƠ ĐỒ KIẾN TRÚC TỔNG QUAN

```
┌─────────────────────────────────────────────────────────────────┐
│                    KIẾN TRÚC OPC-TNC v2                         │
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
│  │  - Dataview ✅   │                     │  └────────────┘ │  │
│  │  - Templater ✅  │                     │                  │  │
│  │  - Tasks ✅      │                     │                  │  │
│  │  - Calendar ✅   │                     │                  │  │
│  │  - Kanban ✅     │                     │                  │  │
│  └─────────────────┘                     └──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. LUỒNG DỮ LIỆU

```
Tạo/sửa note           Drive sync           Apps Script          Sheet
trong Obsidian   ───►   lên Cloud   ───►    parse YAML    ───►   update
                                            + ghi Sheet           rows
     ◄───────────────────────────────────────────────────────────
                    file.setContent()       read Sheet rows
                    update frontmatter      build fields obj
```

1. User tạo/sửa note `.md` trong Obsidian (lưu local `D:\OPC-TNC\OPC-TNC\`)
2. Google Drive for Desktop sync file lên cloud
3. Apps Script đọc file `.md` từ Drive → parse YAML → ghi vào Sheet (`syncVaultToSheet`)
4. User/AI chỉnh dữ liệu trên Sheet
5. Apps Script đọc Sheet → update frontmatter trong file `.md` (`syncSheetToVault`)

---

## 3. CÂY THƯ MỤC HIỆN TẠI (2026-07-31)

```
D:\OPC-TNC\OPC-TNC\
│
├── .obsidian/                              ← Config Obsidian (6 plugins)
├── _Templates/                             ← 15 templates chuẩn
├── _Dashboard/                             ← 4 trang dashboard Dataview
│   ├── 00 - Home.md                        ← Command Center
│   ├── 01 - Sales Pipeline.md              ← Phễu bán hàng
│   ├── 02 - Client Health.md               ← Sức khỏe CSKH
│   └── 03 - Revenue Report.md              ← Báo cáo doanh thu
├── _Attachments/                           ← File đính kèm
├── _Archive/                               ← Lưu trữ cũ
│
├── 1_Leads (…)/                            ← Hồ sơ lead
├── 2_Calls (…)/                            ← Ghi chép cuộc gọi
├── 3_Offers (…)/                           ← Gói dịch vụ + Proposals
├── 4_Clients (…)/                          ← Hồ sơ khách hàng
├── 5_Content (…)/                          ← Nội dung marketing
│   ├── 1_Market Needs/
│   ├── 2_Scripts/
│   ├── 3_Posts/
│   └── 4_Emails/
├── 6_Daily (…)/                            ← Nhật ký vận hành
├── 7_Resources (…)/                        ← Tài liệu, case study
│   ├── 1_Case Studies/
│   ├── 2_SOPs/
│   ├── 3_Tools/
│   └── 4_Competitors/
├── 8_Projects (…)/                         ← Dự án, sprint
├── 9_Techniques & Support (…)/             ← SOPs vận hành
├── 10_Reviews/                             ← Weekly/Monthly reviews
├── 11_Media/                               ← Video, ảnh
│   └── VSL/
├── LLM-Wiki/                               ← 🆕 AI Knowledge Base
│
└── OPC-TNC – Project Blueprint.md          ← Tài liệu gốc (v2.0)
```

---

## 4. PLUGINS ĐÃ CÀI ĐẶT

| Plugin | ID | Vai trò | Trạng thái |
|--------|----|---------|------------|
| **QuickAdd** | `quickadd` | Tạo note nhanh bằng template | ✅ Active |
| **Dataview** | `dataview` | Dashboard queries, bảng tự động | ✅ Active |
| **Templater** | `templater-obsidian` | Dynamic templates (`<% tp.* %>`) | ✅ Active |
| **Tasks** | `obsidian-tasks-plugin` | Task management cross-file | ✅ Active |
| **Calendar** | `calendar` | Daily note navigation | ✅ Active |
| **Kanban** | `obsidian-kanban` | Visual pipeline board | ✅ Active |

---

## 5. GOOGLE SHEETS — TABS OVERVIEW

### Sheet ID: `1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24`

#### Tabs SYNC (đồng bộ với Obsidian):

| Tab | Folder Obsidian | Số columns | Sync |
|-----|-----------------|------------|------|
| **Leads** | `1_Leads (…)` | 11 (A-K) | ✅ 2-way |
| **Calls** | `2_Calls (…)` | 10 (A-J) | ✅ 2-way |
| **Offers** | `3_Offers (…)` | 9 (A-I) | ✅ 2-way |
| **Clients** | `4_Clients (…)` | 10 (A-J) | ✅ 2-way |
| **Daily** | `6_Daily (…)` | 5 (A-E) | ✅ 2-way |

#### Tabs QUẢN LÝ (không sync):

| Tab | Mục đích |
|-----|----------|
| **Roadmap Checklist** | 38 tasks chia 8 giai đoạn |
| **Lead Tracker 1-10** | Theo dõi 10 lead đầu tiên |
| **Mốc tổng** | 4 milestones lớn |
| **INFO** | IDs & links tham chiếu |

---

## 6. KẾT NỐI & IDS

| Resource | ID / Path |
|----------|-----------|
| **Local Vault** | `D:\OPC-TNC\OPC-TNC\` |
| **Google Drive Vault Folder** | `15qaLlg9GEeLTi0zofTT_PK5U4QRDtq_h` |
| **Google Drive Local Folder** | `1_Opbp7UTwPoeImKVKR7oqPUYSSYKEjMY` |
| **Google Sheets** | `1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24` |
| **Sheets URL** | [Mở](https://docs.google.com/spreadsheets/d/1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24/edit) |
| **Drive Vault URL** | [Mở](https://drive.google.com/drive/u/0/folders/15qaLlg9GEeLTi0zofTT_PK5U4QRDtq_h) |
| **Apps Script** | Sheets → Tiện ích → Apps Script |

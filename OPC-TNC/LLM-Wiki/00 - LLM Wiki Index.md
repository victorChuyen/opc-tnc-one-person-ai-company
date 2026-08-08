---
type: llm-wiki
wiki_section: index
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - LLM Wiki Home
  - AI Knowledge Base
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - index
  - opc_tnc
---

# 🧠 LLM WIKI — OPC-TNC AI KNOWLEDGE BASE

> **File này là Entry Point duy nhất cho mọi AI/Agent.**  
> Đọc file này = hiểu kiến trúc, data model, quy trình, và cách hành động trong hệ thống OPC-TNC.

---

## ⚡ TÓM TẮT HỆ THỐNG (30 GIÂY)

**OPC-TNC** (One Person Company — Trần Nguyên Chuyên) là hệ thống **CRM + Knowledge Base + Workflow** phục vụ dịch vụ tư vấn AI Agentic, vận hành bởi **1 founder duy nhất**.

| Thuộc tính | Giá trị |
|------------|---------|
| **Owner** | Victor Chuyen (Trần Nguyên Chuyên) |
| **Offer chính** | Demo AI Agent KM 90% = **1.000.000đ/lead** |
| **Target hiện tại** | 10 lead → 3-5 khách trả phí → 3.000.000đ doanh thu |
| **Ngách** | Agency Meta Ads / Ecom / Coach |
| **Sprint active** | [[3_Project - Sprint 10 Lead Real Operations]] |
| **Kiến trúc** | Obsidian Vault + Google Sheets + Apps Script Sync |

---

## 📚 MỤC LỤC WIKI

| # | File | Nội dung | Khi nào đọc |
|---|------|----------|-------------|
| 01 | [[01 - System Architecture]] | Kiến trúc 3 tầng, plugins, folders, Google Sheets | Hiểu tổng quan hệ thống |
| 02 | [[02 - Data Dictionary]] | **Từ điển 200+ fields** cho 15 entity types | Tạo/sửa note, validate data |
| 03 | [[03 - Pipeline Workflow]] | Flowcharts Lead→Client, sync workflow, daily ops | Hiểu luồng vận hành |
| 04 | [[04 - Template Registry]] | Registry 15 templates + khi nào dùng | Tạo note mới |
| 05 | [[05 - SOP Playbook]] | Tổng hợp 4 SOPs thực chiến | Thực thi quy trình |
| 06 | [[06 - Sync Engine Reference]] | Apps Script API, OPC_CONFIG, sync rules | Làm việc với sync |
| 07 | [[07 - AI Agent Roles]] | 5 vai trò AI Agent + KPIs + triggers | Phân công AI làm việc |
| 08 | [[08 - Scoring & Rules Engine]] | BANT scoring, temperature, health score | Chấm điểm / phân loại |
| 09 | [[09 - Content & Messaging Guide]] | Scripts, hooks, CTA, objection handling | Viết nội dung / tin nhắn |
| 10 | [[10 - Naming & Tag Conventions]] | Naming patterns, tags, wikilinks, folders | Tạo file đúng chuẩn |
| 18 | [[18 - Web App 3D Architecture]] | Kiến trúc Web App 3D Office Simulator | Trình diễn & điều khiển 3D |
| 20 | [[20 - AI CFO Finance Engine & Auto Access Gating]] | Kế toán AI, VietQR Webhook, Auto Access Gating | Quản lý dòng tiền & cấp quyền |
| 99 | [[99 - Changelog]] | Lịch sử thay đổi hệ thống | Tra cứu lịch sử |

---

## 🧭 DECISION TREE — BẠN (AI) MUỐN LÀM GÌ?

```
Bạn muốn...
│
├─ Hiểu hệ thống tổng quan?
│  → Đọc [[01 - System Architecture]]
│
├─ Tạo note mới (Lead/Call/Offer/Client)?
│  → Đọc [[04 - Template Registry]] + [[02 - Data Dictionary]]
│
├─ Chấm điểm / phân loại lead?
│  → Đọc [[08 - Scoring & Rules Engine]]
│
├─ Viết tin nhắn outreach / email / script?
│  → Đọc [[09 - Content & Messaging Guide]]
│
├─ Thực hiện quy trình bán hàng (intake → demo → chốt)?
│  → Đọc [[05 - SOP Playbook]]
│
├─ Đặt tên file / gắn tag đúng chuẩn?
│  → Đọc [[10 - Naming & Tag Conventions]]
│
├─ Debug / hiểu sync Obsidian ↔ Sheets?
│  → Đọc [[06 - Sync Engine Reference]]
│
└─ Biết AI Agent nào phụ trách việc gì?
   → Đọc [[07 - AI Agent Roles]]
```

---

## 🚨 KNOWN ISSUES & THINGS TO WATCH

| # | Vấn đề | Trạng thái | Ảnh hưởng |
|---|--------|------------|-----------|
| 1 | Apps Script OPC_CONFIG chưa cập nhật schema v2 | 🟡 Pending | Fields mới không sync |
| 2 | Lead data cũ (trước 2026-07-31) thiếu fields v2 | 🟡 Migrating | Một số lead thiếu `temperature`, `lead_score` |
| 3 | Wikilinks trong notes vẫn rời rạc | 🟡 Ongoing | Graph view chưa đầy đủ |
| 4 | Blueprint chưa cập nhật thực tế | 🟡 To update | Thông tin trong Blueprint có thể lỗi thời |

---

## 🔗 QUICK LINKS

- **Blueprint gốc:** [[OPC-TNC – Project Blueprint]]
- **Command Center:** [[00 - Home]]
- **Sales Pipeline:** [[01 - Sales Pipeline]]
- **Sprint hiện tại:** [[3_Project - Sprint 10 Lead Real Operations]]
- **Google Sheets:** [Mở Dashboard](https://docs.google.com/spreadsheets/d/1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24/edit)

---
type: llm-wiki
wiki_section: pipeline-workflow
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Pipeline Workflow
  - Sales Flow
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - pipeline
  - workflow
  - opc_tnc
---

# 🔄 PIPELINE WORKFLOW — LUỒNG VẬN HÀNH OPC-TNC

> Tài liệu mô tả toàn bộ lifecycle từ Market Need → Lead → Call → Offer → Client → Upsell, bao gồm transition rules và daily ops.

---

## 1. SALES PIPELINE TỔNG QUAN

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

---

## 2. TRANSITION RULES — QUY TẮC CHUYỂN TRẠNG THÁI

### Lead Status Transitions

| Từ Status | → Đến Status | Điều kiện | Ai thực hiện | Tạo notes gì |
|-----------|-------------|-----------|-------------|---------------|
| `new` | `qualified` | Đã hỏi 3 câu BANT, lead_score ≥ 50 | Lead Hunter Agent | Cập nhật Lead note |
| `new` | `lost` | Không phản hồi sau 7 ngày | Lead Hunter Agent | Set `lost_reason`, `lost_date` |
| `qualified` | `nurturing` | Chưa sẵn sàng mua, cần nuôi dưỡng | Sales Agent | Gửi tài nguyên |
| `qualified` | `proposal` | Đã demo, gửi proposal | Sales Agent | Tạo Proposal note trong `3_Offers/` |
| `nurturing` | `qualified` | Phản hồi lại sau nurturing | Lead Hunter Agent | Cập nhật `temperature: hot` |
| `proposal` | `negotiation` | Khách yêu cầu thương lượng giá/scope | Sales Agent | Cập nhật Proposal note |
| `proposal` | `won` | Khách chuyển khoản 1.000.000đ | Sales Agent | Tạo Client note trong `4_Clients/` |
| `proposal` | `lost` | Từ chối sau 7 ngày | Sales Agent | Set `lost_reason` |
| `negotiation` | `won` | Chốt deal thành công | Sales Agent | Tạo Client note |
| `negotiation` | `lost` | Thất bại thương lượng | Sales Agent | Set `lost_reason` |
| `won` | — | Chuyển sang Client pipeline | — | Lead archived, Client active |

### Client Status Transitions

| Từ Status | → Đến Status | Điều kiện | Ai thực hiện |
|-----------|-------------|-----------|-------------|
| `active` | `completed` | Bàn giao thành công, hết scope | Delivery Agent |
| `active` | `paused` | Khách yêu cầu tạm dừng | Client Care Agent |
| `active` | `churned` | Không hài lòng, yêu cầu hoàn tiền | Client Care Agent |
| `completed` | `active` | Mua thêm gói mới (upsell) | Sales Agent |
| `paused` | `active` | Quay lại tiếp tục | Client Care Agent |

### Call Status Flow

| Từ Status | → Đến Status | Điều kiện |
|-----------|-------------|-----------|
| `open` | `done` | Cuộc gọi đã diễn ra, đã ghi kết quả |

---

## 3. CROSS-MODULE RELATIONSHIPS

```
Market Need ──creates──► Lead ──schedules──► Call
                           │                    │
                           │                    ├──recommends──► Offer
                           │                    │
                           ├──converts─────────►│──closes──► Client
                           │                                    │
                           │                                    ├──triggers──► Testimonial
                           │                                    │
                           └──lost──► Archive                   └──upsells──► New Offer
```

### Bảng liên kết giữa Modules

| Module A | Quan hệ | Module B | Field liên kết |
|----------|---------|----------|----------------|
| Lead | 1 → N | Call | Call.`lead` → Lead name |
| Lead | 1 → 0..1 | Client | Khi `status: won` → tạo Client |
| Lead | 1 → 0..N | Proposal | Proposal.`lead` → Lead name |
| Call | N → 1 | Lead | Call.`lead` |
| Call | 0..1 → 1 | Client | Call.`client` |
| Offer | 1 → N | Proposal | Proposal.`offer` → Offer name |
| Client | 1 → 0..N | Testimonial | Testimonial.`client` → Client name |
| SOP | references | Template | Mỗi SOP chỉ dẫn dùng template nào |

---

## 4. DAILY WORKFLOW TIMELINE

```
SÁNG (8:00 - 12:00)                 TRƯA (13:00 - 17:00)              TỐI (19:00 - 21:00)
─────────────────                   ──────────────────────             ─────────────────────
1. Mở Obsidian                      4. Call discovery/follow-up        7. Ghi Daily log
2. Tạo Daily note                      → ghi Call note                 8. Review tasks
3. Outreach 10 leads                5. Demo → chốt deal                9. Sync Obsidian→Sheet
   → tạo Lead notes                6. Khách mua → tạo Client          10. Kiểm tra Sheet KPI
```

### Daily KPIs (Mục tiêu mỗi ngày)

| Metric | Target | Đo lường |
|--------|--------|----------|
| Nhu cầu thị trường quét | 10 | Market Needs created |
| Lead mới tạo | 3 | Notes in `1_Leads/` |
| Tài nguyên đã gửi | 3 | Tasks completed in Lead notes |
| Lịch call đã đặt | 2 | Call notes created |
| Khách cũ đã chăm | 2 | Client CSKH updates |
| Content xuất bản | 1 | Posts/scripts published |

---

## 5. SYNC WORKFLOW

```
Bước 1: Tạo/sửa note          Bước 2: Auto sync            Bước 3: Apps Script         Bước 4: Sheet
trong Obsidian            ───► Google Drive for        ───► Parse YAML            ───► Update rows
(local D:\OPC-TNC\)            Desktop sync lên Cloud       + ghi Sheet

     ◄────────────────────────────────────────────────────────────────
Bước 5: file.setContent()     Bước 4: Build fields obj     Bước 3: Read Sheet rows
     update frontmatter
```

### Sync Frequency Guide

| Thời điểm | Loại sync | Ghi chú |
|-----------|-----------|---------|
| Sau khi tạo 3+ notes mới | Vault → Sheet | Cập nhật data mới |
| Sau khi chỉnh Sheet | Sheet → Vault | Cẩn thận conflict |
| Cuối ngày (9PM) | Vault → Sheet | Backup dữ liệu ngày |
| Đầu tuần | Both directions | Đảm bảo đồng bộ |

> **⚠️ Lưu ý:** Không sync liên tục — Google API có quota. Nên sync 2-3 lần/ngày.

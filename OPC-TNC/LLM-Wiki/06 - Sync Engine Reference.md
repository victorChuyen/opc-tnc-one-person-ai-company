---
type: llm-wiki
wiki_section: sync-engine
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Sync Engine Reference
  - Apps Script API
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - sync
  - apps_script
  - opc_tnc
---

# ⚙️ SYNC ENGINE REFERENCE — APPS SCRIPT API

> Tài liệu kỹ thuật cho Google Apps Script sync engine giữa Obsidian Vault ↔ Google Sheets.

---

## 1. THÔNG TIN KẾT NỐI

| Thuộc tính | Giá trị |
|------------|---------|
| **Script Editor** | Sheets → Tiện ích → Apps Script |
| **Files** | `code.gs` + `Sidebar.html` |
| **Vault Folder ID (Drive)** | `15qaLlg9GEeLTi0zofTT_PK5U4QRDtq_h` |
| **Sheet ID** | `1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24` |

---

## 2. OPC_CONFIG — MAPPING TABLE

> **Đây là trái tim của sync engine.** Object này định nghĩa folder Drive, tab Sheet, và YAML fields cần sync.

```js
const OPC_CONFIG = {
  Leads: {
    folderName: '1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)',
    sheetName: 'Leads',
    fields: ['name', 'phone', 'source', 'status', 'company', 'industry',
             'desire', 'offer_fit', 'next_action', 'next_action_date']
  },
  Calls: {
    folderName: '2_Calls ( mọi cuộc gọi tư vấn, discovery, follow-up.)',
    sheetName: 'Calls',
    fields: ['lead', 'client', 'call_type', 'date', 'pipeline_stage',
             'offer_recommended', 'next_action', 'next_action_date', 'status']
  },
  Offers: {
    folderName: '3_Offers ( khóa học, gói tư vấn, công cụ, quà tặng, upsell.)',
    sheetName: 'Offers',
    fields: ['offer_type', 'name', 'target_audience', 'problem_solved',
             'delivery_format', 'cta', 'price', 'status']
  },
  Clients: {
    folderName: '4_Clients ( khách đã mua.)',
    sheetName: 'Clients',
    fields: ['client', 'company', 'client_status', 'service_bought',
             'date_bought', 'value', 'upsell_potential', 'next_action',
             'next_action_date']
  },
  Daily: {
    folderName: '6_Daily ( nhật ký vận hành mỗi ngày.)',
    sheetName: 'Daily',
    fields: ['date', 'owner', 'pipeline_stage', 'status']
  }
};
```

> **⚠️ Lưu ý:** `folderName` phải match **chính xác** tên folder trên Google Drive (bao gồm dấu ngoặc, khoảng trắng). Nếu đổi tên folder trong Obsidian, phải cập nhật `OPC_CONFIG` tương ứng.

---

## 3. FIELDS SYNC vs LOCAL-ONLY

### Lead: 10 fields sync / 20+ fields local-only

| Synced ✅ | Local-only ❌ |
|-----------|--------------|
| `name`, `phone`, `source`, `status` | `type`, `pipeline_stage`, `priority`, `temperature` |
| `company`, `industry`, `desire` | `lead_score`, `segment`, `role`, `email`, `zalo` |
| `offer_fit`, `next_action`, `next_action_date` | `fb_profile`, `problem`, `awareness_level`, `budget` |
| | `decision_maker`, `conversion_date`, `lost_date`, `lost_reason` |
| | `owner`, `created`, `updated`, `aliases`, `cssclasses`, `tags` |

### Call: 9 fields sync

| Synced ✅ | Local-only ❌ |
|-----------|--------------|
| `lead`, `client`, `call_type`, `date` | `type`, `name`, `duration_min`, `result`, `satisfaction` |
| `pipeline_stage`, `offer_recommended` | `priority`, `owner`, `created`, `updated` |
| `next_action`, `next_action_date`, `status` | `aliases`, `cssclasses`, `tags` |

### Offer: 8 fields sync

| Synced ✅ | Local-only ❌ |
|-----------|--------------|
| `offer_type`, `name`, `target_audience` | `type`, `pipeline_stage`, `currency` |
| `problem_solved`, `delivery_format` | `valid_from`, `valid_until`, `conversion_rate`, `total_sold` |
| `cta`, `price`, `status` | `priority`, `owner`, `created`, `updated`, `tags` |

### Client: 9 fields sync

| Synced ✅ | Local-only ❌ |
|-----------|--------------|
| `client` (= name), `company`, `client_status` | `type`, `pipeline_stage`, `currency` |
| `service_bought`, `date_bought`, `value` | `payment_status`, `renewal_date`, `contract_end` |
| `upsell_potential`, `next_action`, `next_action_date` | `lifetime_value`, `health_score`, `nps_score`, `priority` |

### Daily: 4 fields sync

| Synced ✅ | Local-only ❌ |
|-----------|--------------|
| `date`, `owner`, `pipeline_stage`, `status` | `type`, `name`, `day_of_week`, `energy_level` |

---

## 4. FUNCTION REFERENCE

| Function | Input | Output | Side Effects | Gọi từ |
|----------|-------|--------|-------------|--------|
| `onOpen()` | — | Menu UI | Tạo menu "OPC-TNC Sync" | Auto khi mở Sheet |
| `getConfig()` | — | OPC_CONFIG object | — | Sidebar.html |
| `setupOpcTncSheets()` | — | Tabs + headers | Tạo/reset tab headers từ OPC_CONFIG | Menu |
| `getFolderByNameInRoot(name)` | Folder name | Folder object | — | Internal |
| `parseFrontmatter(text)` | File content string | YAML object | — | Internal |
| `updateFrontmatter(text, fields)` | File content + fields obj | Updated content | — | Internal |
| `syncVaultToSheet(typeKey)` | `"Leads"` / `"Calls"` / etc. | Log message | **Ghi đè Sheet** với data từ vault | Internal |
| `syncSheetToVault(typeKey)` | `"Leads"` / etc. | Log message | **Update frontmatter** trong .md files | Internal |

### Wrapper Functions (Menu)

| Function | Direction | Module |
|----------|-----------|--------|
| `syncLeadsToSheet()` | Vault → Sheet | Leads |
| `syncSheetToLeads()` | Sheet → Vault | Leads |
| `syncCallsToSheet()` / `syncSheetToCalls()` | Both | Calls |
| `syncOffersToSheet()` / `syncSheetToOffers()` | Both | Offers |
| `syncClientsToSheet()` / `syncSheetToClients()` | Both | Clients |
| `syncDailyToSheet()` / `syncSheetToDaily()` | Both | Daily |

---

## 5. KNOWN LIMITATIONS & RULES

| # | Limitation | Impact | Workaround |
|---|-----------|--------|------------|
| 1 | `parseFrontmatter()` không handle YAML arrays (tags) | Tags có thể bị corrupt khi sync ngược | Không sync `tags` field |
| 2 | Không có conflict resolution | Data cũ có thể ghi đè data mới | Sync 1 chiều tại 1 thời điểm |
| 3 | `clearContents()` xóa toàn bộ sheet mỗi sync | Mất data nhập tay | Luôn sync Vault→Sheet trước |
| 4 | Google API quota | ~100 requests/100 giây | Sync tối đa 2-3 lần/ngày |
| 5 | Folder name phải match chính xác | Sync crash nếu đổi tên folder | Cập nhật OPC_CONFIG khi rename |
| 6 | Client column `client` vs Obsidian field `name` | Tên không sync đúng | Manual mapping |

---

## 6. QUY TẮC VÀNG KHI THAY ĐỔI HỆ THỐNG

> **Mỗi thay đổi ảnh hưởng 3 nơi đồng thời:**

```
Template (_Templates/)  ←→  OPC_CONFIG (code.gs)  ←→  Sheet Headers
         ▲                        ▲                         ▲
         │                        │                         │
         └────── PHẢI CẬP NHẬT CẢ 3 ──────────────────────┘
```

1. **Thêm field YAML mới:** Template → OPC_CONFIG.fields → Sheet column
2. **Đổi tên folder:** Obsidian rename → OPC_CONFIG.folderName → Dataview query paths
3. **Xóa field:** KHÔNG xóa ngay — đánh dấu deprecated → xóa sau 1 tuần
4. **Tạo note mới:** LUÔN dùng template (QuickAdd/Templater)

---
aliases:
  - Sales Pipeline
  - Lead Funnel
cssclasses:
  - dashboard-pipeline
---

# 📊 SALES PIPELINE & LEAD MANAGEMENT

> **Quản lý toàn bộ phễu bán hàng từ Lead Mới ➔ Demo ➔ Proposal ➔ Chốt Đơn**

---

## 🎯 TOÀN BỘ LEADS THEO PIPELINE STAGE

### 1. Lead Mới Tiếp Nhận (`status = new`)
```dataview
TABLE 
  source AS "Nguồn",
  segment AS "Phân khúc",
  phone AS "SĐT",
  created AS "Ngày nhận"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND status = "new"
SORT created DESC
```

### 2. Lead Đã Đánh Giá & Nuôi Dưỡng (`status = qualified` / `nurturing`)
```dataview
TABLE 
  company AS "Công ty",
  problem AS "Vấn đề / Pain",
  offer_fit AS "Offer Phù hợp",
  budget AS "Ngân sách",
  next_action AS "Kế hoạch tiếp"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND (status = "qualified" OR status = "nurturing")
SORT priority DESC, next_action_date ASC
```

### 3. Đã Gửi Proposal / Đang Thương Lượng (`status = proposal` / `negotiation`)
```dataview
TABLE 
  company AS "Công ty",
  offer_fit AS "Gói đề xuất",
  budget AS "Giá trị dự kiến",
  decision_maker AS "Người chốt",
  next_action_date AS "Ngày chốt dự kiến"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND (status = "proposal" OR status = "negotiation")
SORT next_action_date ASC
```

### 4. Lead Đã Chốt Mua (`status = won` / `converted`)
```dataview
TABLE 
  company AS "Công ty",
  source AS "Kênh đến",
  conversion_date AS "Ngày chốt",
  owner AS "Owner"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND (status = "won" OR status = "converted")
SORT conversion_date DESC
```

### 5. Lead Thất Bại / Mất Deal (`status = lost`)
```dataview
TABLE 
  company AS "Công ty",
  source AS "Kênh đến",
  lost_reason AS "Lý do thất bại",
  lost_date AS "Ngày mất"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND status = "lost"
SORT lost_date DESC
```

---

## 📈 PHÂN TÍCH BANT SCORING & CHẤM ĐIỂM LEADS

```dataview
TABLE 
  lead_score AS "Điểm Score",
  temperature AS "Nhiệt độ",
  budget AS "Budget",
  decision_maker AS "Decision Maker",
  awareness_level AS "Mức Nhận Thức"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND status != "won" AND status != "lost"
SORT lead_score DESC
```

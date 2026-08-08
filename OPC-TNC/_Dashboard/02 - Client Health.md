---
aliases:
  - Client Health
  - CSKH Dashboard
cssclasses:
  - dashboard-clients
---

# 🤝 CLIENT SUCCESS & RETENTION MANAGEMENT

> **Quản lý khách hàng đã mua, theo dõi chất lượng triển khai, rủi ro Churn & cơ hội Upsell**

---

## 🟢 KHÁCH HÀNG ĐANG HOẠT ĐỘNG (ACTIVE CLIENTS)

```dataview
TABLE 
  company AS "Công ty",
  service_bought AS "Dịch vụ đã mua",
  date_bought AS "Ngày mua",
  value AS "Giá trị (VND)",
  payment_status AS "Thanh toán",
  health_score AS "Sức khỏe CSKH (1-10)"
FROM "4_Clients ( khách đã mua.)"
WHERE type = "client" AND client_status = "active"
SORT health_score ASC
```

---

## 🚨 CẢNH BÁO RỦI RO / KHÁCH HÀNG SỨC KHỎE THẤP (`health_score < 6`)

```dataview
TABLE 
  company AS "Công ty",
  health_score AS "Điểm sức khỏe",
  service_bought AS "Dịch vụ",
  next_action AS "Hành động ứng cứu"
FROM "4_Clients ( khách đã mua.)"
WHERE type = "client" AND health_score < 6
SORT health_score ASC
```

---

## 💎 CƠ HỘI BÁN THÊM / UPSELL (`upsell_potential = high` / `medium`)

```dataview
TABLE 
  company AS "Công ty",
  service_bought AS "Gói đã dùng",
  value AS "Giá trị hợp đồng cũ",
  upsell_potential AS "Tiềm năng Upsell",
  next_action AS "Kế hoạch Upsell"
FROM "4_Clients ( khách đã mua.)"
WHERE type = "client" AND (upsell_potential = "high" OR upsell_potential = "medium")
SORT value DESC
```

---

## 📅 LỊCH GIA HẠN HỢP ĐỒNG

```dataview
TABLE 
  company AS "Công ty",
  service_bought AS "Gói dịch vụ",
  contract_end AS "Hết hạn HĐ",
  renewal_date AS "Ngày nhắc gia hạn"
FROM "4_Clients ( khách đã mua.)"
WHERE type = "client" AND renewal_date != null
SORT renewal_date ASC
```

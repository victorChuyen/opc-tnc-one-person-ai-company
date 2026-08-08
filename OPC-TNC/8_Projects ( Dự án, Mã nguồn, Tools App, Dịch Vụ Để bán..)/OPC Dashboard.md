# 📊 OPC Dashboard (Tổng Quan Systems)

### 📌 A. Lead Pipeline Đang Xử Lý
```dataview
TABLE 
  status AS "Trạng thái",
  priority AS "Ưu tiên",
  temperature AS "Nhiệt độ",
  source AS "Nguồn",
  next_action AS "Next Step",
  next_action_date AS "Ngày tiếp theo"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND status != "won" AND status != "lost"
SORT next_action_date ASC, priority DESC
```

---

### 📞 B. Cuộc Gọi Gần Đây
```dataview
TABLE 
  call_type AS "Loại Call",
  lead AS "Lead",
  result AS "Kết quả",
  satisfaction AS "Đánh giá",
  next_action AS "Next Step",
  date AS "Ngày gọi"
FROM "2_Calls ( mọi cuộc gọi tư vấn, discovery, follow-up.)"
WHERE type = "call"
SORT date DESC
LIMIT 10
```

---

### 🤝 C. Danh Sách Khách Hàng (Clients)
```dataview
TABLE 
  company AS "Công ty",
  service_bought AS "Dịch vụ",
  value AS "Giá trị (VND)",
  payment_status AS "Thanh toán",
  health_score AS "Sức khỏe (1-10)",
  renewal_date AS "Ngày gia hạn"
FROM "4_Clients ( khách đã mua.)"
WHERE type = "client"
SORT renewal_date ASC
```

---

### 🎁 D. Danh Sách Offer Hiện Có
```dataview
TABLE 
  offer_type AS "Loại Offer",
  price AS "Giá (VND)",
  target_audience AS "Đối tượng",
  problem_solved AS "Vấn đề giải quyết",
  status AS "Trạng thái"
FROM "3_Offers ( khóa học, gói tư vấn, công cụ, quà tặng, upsell.)"
WHERE type = "offer"
SORT status ASC, price DESC
```

---

### 📅 E. Nhật Ký Daily Log (7 Ngày Gần Nhất)
```dataview
TABLE 
  energy_level AS "Năng lượng",
  pipeline_stage AS "Focus",
  status AS "Trạng thái",
  date AS "Ngày"
FROM "6_Daily ( nhật ký vận hành mỗi ngày.)"
WHERE type = "daily"
SORT date DESC
LIMIT 7
```

---

### 📥 F. Lead Mới Tạo Trong 7 Ngày Qua
```dataview
TABLE 
  source AS "Nguồn",
  status AS "Trạng thái",
  temperature AS "Nhiệt độ",
  created AS "Ngày tạo"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND created >= date(today) - dur(7 days)
SORT created DESC
```

---

### ⏳ G. Tasks Chưa Hoàn Thành (Toàn Vault)
```dataview
TASK
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)" OR "2_Calls ( mọi cuộc gọi tư vấn, discovery, follow-up.)" OR "3_Offers ( khóa học, gói tư vấn, công cụ, quà tặng, upsell.)" OR "4_Clients ( khách đã mua.)" OR "6_Daily ( nhật ký vận hành mỗi ngày.)"
WHERE !completed
SORT file.mtime DESC
```

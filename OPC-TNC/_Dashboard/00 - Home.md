---
aliases:
  - CRM Home
  - Command Center
cssclasses:
  - dashboard-home
---

# 🚀 OPC-TNC CRM COMMAND CENTER

> **Trang chủ quản trị vận hành AI Agentic Sales Operations**  
> *Cập nhật thời gian thực qua Dataview & Google Sheets Sync*

---

## ⚡ QUICK ACTIONS & LINKS

| Nút Tạo Nhanh | Navigation | Tài Nguyên |
|---------------|------------|------------|
| ➕ [Tạo Lead Mới](file:///D:/OPC-TNC/OPC-TNC/_Templates/Template%20-%20Lead.md) | 📊 [Sales Pipeline](file:///D:/OPC-TNC/OPC-TNC/_Dashboard/01%20-%20Sales%20Pipeline.md) | 📘 [Project Blueprint](file:///D:/OPC-TNC/OPC-TNC/OPC-TNC%20%E2%80%93%20Project%20Blueprint.md) |
| 📞 [Tạo Call Note](file:///D:/OPC-TNC/OPC-TNC/_Templates/Template%20-%20Call.md) | 🤝 [Client Health](file:///D:/OPC-TNC/OPC-TNC/_Dashboard/02%20-%20Client%20Health.md) | 🟢 [Google Sheets Dashboard](https://docs.google.com/spreadsheets/d/1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24/edit) |
| 📅 [Tạo Daily OPC](file:///D:/OPC-TNC/OPC-TNC/_Templates/Template%20-%20Daily.md) | 💰 [Revenue Report](file:///D:/OPC-TNC/OPC-TNC/_Dashboard/03%20-%20Revenue%20Report.md) | 📂 [System Templates](file:///D:/OPC-TNC/OPC-TNC/_Templates) |

---

## 🚨 CẢNH BÁO: LEADS CẦN XỬ LÝ HÔM NAY / QUÁ HẠN

```dataview
TABLE 
  status AS "Trạng thái",
  priority AS "Mức ưu tiên",
  temperature AS "Nhiệt độ",
  next_action AS "Hành động tiếp theo",
  next_action_date AS "Hạn xử lý"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND status != "won" AND status != "lost" AND next_action_date <= date(today)
SORT next_action_date ASC, priority DESC
```

---

## 🔥 TOP HOT LEADS (NHIỆT ĐỘ HOT / BANT CAO)

```dataview
TABLE 
  company AS "Công ty",
  status AS "Giai đoạn",
  lead_score AS "Lead Score",
  budget AS "Ngân sách",
  offer_fit AS "Offer Phù hợp",
  next_action AS "Next Step"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND (temperature = "hot" OR priority = "high" OR lead_score >= 70) AND status != "won" AND status != "lost"
SORT lead_score DESC
```

---

## 📞 CUỘC GỌI VỪA THỰC HIỆN

```dataview
TABLE 
  call_type AS "Loại Call",
  lead AS "Lead",
  result AS "Kết quả",
  satisfaction AS "Đánh giá",
  next_action AS "Việc sau Call"
FROM "2_Calls ( mọi cuộc gọi tư vấn, discovery, follow-up.)"
WHERE type = "call"
SORT date DESC
LIMIT 5
```

---

## 🤝 KHÁCH HÀNG ACTIVE & CẦN CSKH

```dataview
TABLE 
  company AS "Công ty",
  service_bought AS "Dịch vụ đã mua",
  payment_status AS "Thanh toán",
  health_score AS "Sức khỏe CSKH",
  next_action AS "Hành động CSKH"
FROM "4_Clients ( khách đã mua.)"
WHERE type = "client" AND client_status = "active"
SORT health_score ASC
```

---

## 🤖 AI C-SUITE JOB KPI MATRIX (ĐỒNG BỘ TELEGRAM ↔ OBSIDIAN ↔ APP)

```dataview
TABLE 
  agent AS "Giám đốc AI",
  status AS "Trạng thái",
  kpi_target AS "Chỉ tiêu KPI",
  timestamp AS "Thời gian giao"
FROM "6_Daily ( nhật ký vận hành mỗi ngày.)"
WHERE type = "job-kpi"
SORT timestamp DESC
LIMIT 10
```

---

## 📌 TASK CẦN HOÀN THÀNH

```dataview
TASK
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)" OR "2_Calls ( mọi cuộc gọi tư vấn, discovery, follow-up.)" OR "4_Clients ( khách đã mua.)" OR "6_Daily ( nhật ký vận hành mỗi ngày.)"
WHERE !completed
SORT file.mtime DESC
LIMIT 10
```

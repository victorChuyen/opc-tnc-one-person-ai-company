---
aliases:
  - Revenue Report
  - Financial Analytics
cssclasses:
  - dashboard-revenue
---

# 💰 REVENUE & OFFER PERFORMANCE REPORT

> **Thống kê tổng doanh thu từ Khách hàng, Dự báo giá trị Pipeline và Hiệu quả danh mục Offer**

---

## 💵 DOANH THU THỰC TẾ TỪ KHÁCH HÀNG (WON / CLIENTS)

```dataview
TABLE 
  company AS "Khách hàng / Công ty",
  service_bought AS "Sản phẩm / Dịch vụ",
  value AS "Giá trị (VND)",
  payment_status AS "Trạng thái thanh toán",
  date_bought AS "Ngày mua"
FROM "4_Clients ( khách đã mua.)"
WHERE type = "client"
SORT value DESC
```

---

## 🎁 HIỆU QUẢ DANH MỤC OFFER & BẢNG GIÁ

```dataview
TABLE 
  offer_type AS "Loại Offer",
  price AS "Đơn giá (VND)",
  currency AS "Tiền tệ",
  status AS "Trạng thái",
  total_sold AS "Đã bán",
  conversion_rate AS "Tỷ lệ chuyển đổi %"
FROM "3_Offers ( khóa học, gói tư vấn, công cụ, quà tặng, upsell.)"
WHERE type = "offer"
SORT status ASC, price DESC
```

---

## 🎯 DỰ BÁO DOANH THU PIPELINE ĐANG ĐÁNH GIÁ (PROPOSALS & NEGOTIATION)

```dataview
TABLE 
  company AS "Lead / Công ty",
  status AS "Giai đoạn deal",
  offer_fit AS "Offer đề xuất",
  budget AS "Ngân sách dự kiến",
  probability AS "Xác suất chốt"
FROM "1_Leads ( lead mới, lead đang nuôi, lead chưa chốt.)"
WHERE type = "lead" AND (status = "proposal" OR status = "negotiation" OR status = "qualified")
SORT next_action_date ASC
```

# 20 - AI CFO Finance Engine & Auto Access Gating

> **Phiên bản:** 1.0 — 2026-08-07  
> **Owner:** AI CFO (Trưởng Phòng Kế Toán & Tài Chính AI) & Chairman Victor Chuyen  
> **Phạm vi:** Quản lý đối soát doanh thu, Ngân hàng VietQR Webhook, Tự động Cấp quyền Học liệu & Chống thất thoát dòng tiền.

---

## 1. MỤC TIÊU & TƯ DUY HỆ THỐNG

1. **Triệt hạ 100% rủi ro thất thoát dòng tiền** giữa Sales/Marketing và Kế toán.
2. **Kích hoạt quyền truy cập tự động trong 3 giây (Zero-Trust Access Gating)** ngay khi Ngân hàng xác nhận tiền về.
3. **Giảm 95% khối lượng công việc kế toán thủ công**: AI CFO tự động đối soát VietQR Động, gạch nợ `PAID_VERIFIED`, tự đóng dấu Watermark chống leak và gửi link Drive/Telegram VIP.

---

## 2. DATA SCHEMAS (TAB `Transactions` GOOGLE SHEETS & OBSIDIAN)

| Trường | Định dạng | Mô tả |
|---|---|---|
| `Trans_ID` | String | Mã giao dịch hệ thống (`TX-20260807-001`) |
| `Lead_ID` | String | Mã Lead / SĐT khóa chính |
| `Student_Name` | String | Tên học viên |
| `Phone_Zalo` | String | Số điện thoại nhận học liệu |
| `Course_Code` | String | Mã gói (`K01-AGENTIC`, `SAAS-PRO`, `AGENCY-VIP`) |
| `Amount_Expected` | Number | Số tiền niêm yết (VD: 1.000.000 VNĐ) |
| `Amount_Received` | Number | Số tiền thực nhận vào tài khoản |
| `Bank_Ref` | String | Mã giao dịch Ngân hàng (`FT2621983012`) |
| `Payment_Status` | Enum | `PENDING` \| `PAID_VERIFIED` \| `PARTIAL` \| `REFUND` |
| `Access_Status` | Enum | `BLOCKED` \| `GRANTED` |
| `Access_Link` | URL | Link Google Drive / Kho học liệu riêng |
| `Granted_At` | Datetime | Thời gian cấp quyền |

---

## 3. QUY TRÌNH KẾ TOÁN AI AUTOMATION 5 BƯỚC

```
[1. FORM DỜI SÂN] ➔ [2. VIETQR CHUYỂN KHOẢN] ➔ [3. AI CFO DETECT WEBHOOK] ➔ [4. AUTO GRANT ACCESS] ➔ [5. BÁO CÁO TELEGRAM]
```

### Bước 1: VietQR Động
- Sinh mã QR kèm sẵn số tiền & nội dung cố định: `OPC [SĐT] [Mã Khóa]`.

### Bước 2 & 3: Webhook & Đối Soát Realtime
- Casso/Bank Open API đẩy Webhook HTTP POST về `/api/finance/webhook` trên server local/cloud OPC.
- AI CFO khớp 100% `Lead_ID` + `Amount_Expected` ➔ Chuyển `Payment_Status` = `PAID_VERIFIED`.

### Bước 4: Cấp Quyền & Auto Watermarking
- Cấp quyền đọc/tải cho Email học viên trên Google Drive.
- Tự động đóng dấu Watermark: `Dành riêng cho: [Tên + SĐT Học viên]`.

### Bước 5: Thông Báo Realtime
- Bắn thông báo Telegram tới Topic Admin kèm link Drive học liệu đã được cấp.

---

## 4. API SPECIFICATION (`/api/finance/webhook`)

```http
POST /api/finance/webhook
Content-Type: application/json

{
  "phone": "0989890022",
  "amount": 1000000,
  "course_code": "K01-AGENTIC",
  "bank_ref": "FT2621983012"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "paymentStatus": "PAID_VERIFIED",
  "accessStatus": "GRANTED",
  "bankRef": "FT2621983012",
  "accessLink": "https://drive.google.com/drive/folders/opc-tnc-course-k01-agentic",
  "teleGroupLink": "https://t.me/+OPC_VIP_AI_AGENTS",
  "timestamp": "2026-08-07T16:27:00.000Z"
}
```

---
type: llm-wiki
wiki_section: composio-auth
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Composio & Platform Auth Architecture
  - Multi-Platform Credentials Reference
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - composio
  - platform_auth
  - paypal
  - momo
  - google_oauth
  - opc_tnc
---

# 🔌 COMPOSIO & PLATFORM AUTH ARCHITECTURE — HẠ TẦNG KẾT NỐI ĐA NỀN TẢNG CHÍNH THỨC

> **Cập nhật ngày:** 2026-07-31  
> **Chịu trách nhiệm:** LUCKY (AI Co-Founder) & Victor Chuyen (Founder/CEO)

---

## 1. 🏢 DANH SÁCH KÊNH HỖ TRỢ & TRUYỀN THÔNG CHÍNH THỨC

| Kênh truyền thông / Hỗ trợ | Đường dẫn URL chính thức | Mục tiêu vận hành |
|----------------------------|--------------------------|-------------------|
| **Đặt Lịch Tư Vấn Coach AI** | [cal.com/victorchuyen/coachai](https://cal.com/victorchuyen/coachai) | Tự động hóa lịch hẹn Demo 30' |
| **GitHub Repository Profile** | [github.com/victorChuyen](https://github.com/victorChuyen) | Quản lý mã nguồn dự án |
| **Zalo Admin Trực Tiếp** | [zalo.me/0989890022](https://zalo.me/0989890022) | Chat hỗ trợ Founder 1-1 |
| **Telegram Admin Trực Tiếp** | [t.me/victorchuyen](https://t.me/victorchuyen) | Điều hành cấp cao |
| **Group Zalo Hỗ Trợ Cộng Đồng** | [zalo.me/g/tdhmtu261](https://zalo.me/g/tdhmtu261) | Chăm sóc khách hàng & Lead |
| **Email Support Chính Thức** | `support@VictorChuyen.net` | Gửi hóa đơn & tài liệu |
| **Kênh TikTok Official** | [@victorchuyen](https://www.tiktok.com/@victorchuyen) | Video ngắn giáo dục thị trường |
| **Fanpage Facebook Official** | [go.victorchuyen.net](https://www.facebook.com/go.victorchuyen.net/) | Xuất bản bài viết 48h |
| **Group Telegram VibeCode** | [t.me/vibecodocoaching](https://t.me/vibecodocoaching) | Cộng đồng Học viên & Coaching |

---

## 2. 💳 THÔNG TIN THÀNH TOÁN LIVE PRODUCTION

### A. PayPal Live Gateway
- **`PAYPAL_CLIENT_ID`:** `AZxgATR4j89NJDnX3ugOO2MmtLQrxJwcgTZ235tHzd9tMznVBPTR3rwt_Q8Lv1QARhiT5FxOSOWcixYH`
- **`PAYPAL_CLIENT_SECRET`:** `EAwOC3HwfaaSP3Lr9zqUmN4x3f6dXJ5Au3MVlKWCiprk-iiyAy7jFc1RKW5NgisgyRQd4edV5NfkMXui`
- **`PAYPAL_API_URL`:** `https://api-m.paypal.com`

### B. Ví Điện Tử MoMo Gateway V2
- **`MOMO_PARTNER_CODE`:** `MOMOBQUK20250710`
- **`MOMO_ACCESS_KEY`:** `yMVQHRFU46AkE18L`
- **`MOMO_SECRET_KEY`:** `psceGghDPHZtl1OOu4B1aEerHNaWFJ2P`
- **`MOMO_ENDPOINT`:** `https://payment.momo.vn/v2/gateway/api/create`

---

## 3. 🔑 GOOGLE OAUTH 2.0 & CAL.COM API

### A. Google OAuth 2.0 Client Credentials (coaching-vibecode)
- **Project ID:** `coursemarket-488612`
- **Client ID:** `your_google_oauth_client_id.apps.googleusercontent.com`
- **Client Secret:** `your_google_oauth_client_secret`
- **Redirect URI:** `https://edu-victorchuyen.firebaseapp.com/__/auth/handler`

### B. Cal.com Booking API
- **API Key:** `cal_live_13012d21cb77286d280217149ab34699`
- **Event Path:** `victorchuyen/coachai`

---

## 🔌 4. COMPOSIO WORKSPACE & TOOLKITS INTEGRATION

- **Composio Project ID:** `f0807557459_workspace_first_project`
- **Danh sách Toolkits Auth Configured:**
  - Microsoft Teams (Server-to-Server OAuth)
  - Asana (OAuth 2.0)
  - People Data Labs (API Key)
  - Shopify (OAuth 2.0 / API Key)
  - LinkedIn B2B (OAuth 2.0)
  - Google Maps (API Key)
  - OneDrive (OAuth 2.0)
  - DocuSign (OAuth 2.0 E-Signature)
  - Discord Bot (Bot OAuth)
  - Salesforce (OAuth 2.0)

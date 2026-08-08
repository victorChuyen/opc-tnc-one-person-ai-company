---
type: llm-wiki
wiki_section: master-architecture
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Master Architecture Plan
  - Root Foundation Blueprint
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - master_architecture
  - root_foundation
  - opc_tnc
---

# 🏛️ MASTER ARCHITECTURE PLAN — THIẾT LẬP HẠ TẦNG NỀN TẢNG CÔNG TY TÁC NHÂN AI OPC-TNC

> **Tư duy từ Founder Victor Chuyen:** *Xây dựng cái GỐC kiến trúc công nghệ & vận hành trước — Bao gồm Skills cho từng AI Agent, Kênh điều hành Telegram, Quy trình AI Phản biện/QA, Kênh Social Marketing & Hạ tầng Thanh toán tự động — Tránh đi lạc đường vào các tác vụ vụn vặt.*

---

## 🎯 5 TRỤ CỘT HẠ TẦNG GỐC CẦN HOÀN THIỆN (ROOT FOUNDATION)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    5 TRỤ CỘT HẠ TẦNG TÁC NHÂN AI OPC-TNC                    │
│                                                                             │
│ 1. SKILLS MATRIX ──────────► Đóng gói Skillset & Tools riêng cho 5 AI Agents│
│ 2. TELEGRAM COMMAND CENTER ► Kênh giao việc, báo cáo & phê duyệt 24/7        │
│ 3. PEER-REVIEW & QA ENGINE ► Quy trình AI Phản biện / Kiểm định chất lượng   │
│ 4. SOCIAL MEDIA ENGINE ────► Cấu trúc 5 Kênh Social phủ sóng truyền thông   │
│ 5. FINANCIAL ARCHITECTURE ─► Cấu hình STK, VietQR API & SePay Auto-Match    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ NỘI DUNG CHI TIẾT TỪNG TRỤ CỘT KIẾN TRÚC

### 1. 🤖 SKILLS MATRIX — ĐÓNG GÓI CÔNG CỤ & KỸ NĂNG CHO 5 AI AGENTS

Mỗi Tác nhân AI trong AI Squad sẽ sở hữu một bộ **Custom Skills** (chức năng thực thi mã nguồn Python/NodeJS) riêng biệt đặt tại `skills/`:

```
d:\OPC-TNC\OPC-TNC\skills\
├── lead-hunter-skills/          ← Skill: Quét BANT, Parse Zalo Inbox, Auto Score
├── sales-closer-skills/         ← Skill: Generate PDF Proposal, VietQR Generator
├── delivery-engine-skills/      ← Skill: Package Builder, Video Recorder Script
├── retention-care-skills/       ← Skill: Health Monitor, Auto Check-in 7/30
└── content-growth-skills/       ← Skill: Multi-channel Publisher, Image Prompt Gen
```

| Tác nhân AI | Skills Cần Đóng Gói (Code Capabilities) | Đầu Ra Kỹ Thuật |
|-------------|----------------------------------------|-----------------|
| **1. Lead Hunter Agent** | • `parse_inbox_bant()`: Đọc & phân tích câu trả lời BANT<br>• `calculate_lead_score()`: Tự động chấm score 0-100<br>• `generate_zalo_reply()`: Sinh kịch bản nhắn lại | File `1_Leads/*.md` chuẩn YAML v2 |
| **2. Sales Closer Agent** | • `build_proposal_pdf()`: Đóng gói PDF đề xuất giải pháp<br>• `generate_vietqr()`: Tạo mã QR VietQR đúng số tiền 1tr<br>• `objection_handler()`: Sinh kịch bản xử lý phản đối | File `3_Offers/Proposal-*.md` + Mã QR |
| **3. Delivery Engine Agent** | • `package_agent_workflow()`: Đóng gói mã nguồn 48h<br>• `generate_video_script()`: Kịch bản video hướng dẫn 3-5'<br>• `verify_system_setup()`: Kiểm thử workflow | Package zip + Video script trong `4_Clients/` |
| **4. Retention Care Agent** | • `client_health_auditor()`: Đo điểm health_score (1-10)<br>• `schedule_checkin()`: Lịch nhắn ngày 7 và 30<br>• `testimonial_extractor()`: Rút trích feedback thành Case Study | Testimonial note trong `7_Resources/` |
| **5. Content Growth Agent** | • `hook_generator()`: Sinh 10 tiêu đề gây chú ý<br>• `social_format_adapter()`: Biến 1 bài thành 5 format (FB, Zalo, LinkedIn, TikTok, Email)<br>• `midjourney_prompt_builder()`: Tạo prompt vẽ ảnh ad creative | Post notes trong `5_Content/` |

---

## 2. 📲 TELEGRAM COMMAND & CONTROL CENTER (KÊNH ĐIỀU HÀNH 24/7) — ✅ ĐÃ KÍCH HOẠT!

Thiết lập Telegram Bot làm **Trung Tâm Chỉ Đạo & Giao Việc Real-Time** giữa Founder Victor Chuyen và AI Co-Founder LUCKY:

| Thuộc tính | Giá trị đã kết nối |
|------------|--------------------|
| **Bot Name** | `Agentic AI - OPC TNC` |
| **Bot Username** | `@OPC_TNC_BOT` |
| **Bot Token** | `8996244093:AAGroaAR36Mz1B64N-jr-EClQLFgBjtINq8` |
| **Channel / Chat ID** | `-1003415285389` |
| **Trạng thái** | 🟢 **CONNECTED & ONLINE 24/7** (Messages 12, 13, 14 verified) |
| **Script Runner** | `scripts/telegram_command_center.py` & `scripts/telegram_daemon.py` |

```
[Khách inbox / Lead mới] ──► Telegram Bot Notify ──► Lucky xử lý ──► Báo cáo Founder Telegram
[Founder nhắn lệnh Telegram] ──► Bot Webhook ──► Trigger AI Squad ──► Trả kết quả Telegram
```

### Các luồng điều hành Telegram:
1. **📢 Notification Channel (`#opc-notifications`):**
   - Báo cáo ngay khi có Lead mới đăng ký / BANT Score Hot (Score ≥ 80).
   - Thông báo tự động khi có biến động tiền về 1.000.000đ từ Ngân hàng.
2. **⚡ Command Channel (`#opc-commands`):**
   - Founder gõ `/status` ➔ Trả về trạng thái vận hành thời gian thực & số lượng Lead.
   - Founder gõ `/report` ➔ Trả về báo cáo KPI ngày.
   - Founder gõ `/leads` ➔ Liệt kê danh sách các Lead mới nhất.
   - Founder gõ `/outreach` ➔ Hiển thị 5 kịch bản outreach ngách.
   - Founder gõ `/proposal` ➔ Hiển thị đề xuất giá gói 1tr.
   - Founder gõ `/help` ➔ Hiển thị menu hướng dẫn.

---

## 3. 🛡️ AI PEER-REVIEW & QA PROTOCOL (QUY TRÌNH PHẢN BIỆN & KIỂM ĐỊNH CHẤT LƯỢNG)

Để đảm bảo output đạt chất lượng 100% không có lỗi trước khi gửi cho khách hàng, thiết lập quy trình **AI Phản Biện Chéo (Agent Cross-Review)**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    QUY TRÌNH KIỂM ĐỊNH PEER-REVIEW                     │
│                                                                         │
│ Step 1: Agent khởi tạo Output (Ad Script / Proposal / Workflow)         │
│    │                                                                    │
│    ▼                                                                    │
│ Step 2: LUCKY (COO) chỉ định Reviewer Agent phản biện                  │
│    │                                                                    │
│    ├──► Pass (≥ 8.5/10) ──► Tiến hành gửi cho khách / đăng bài          │
│    └──► Fail (< 8.5/10) ──► Trả về Creator Agent kèm lý do sửa (Loop)  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Bảng phân công Phản Biện Chéo:

| Sản phẩm (Deliverable) | Agent Khởi Tạo | Agent Phản Biện (Reviewer) | Tiêu chí kiểm định QA |
|------------------------|----------------|----------------------------|------------------------|
| **Lead Qualification** | Lead Hunter Agent | Sales Closer Agent | Lead có đúng BANT không? SĐT/Zalo có chuẩn không? |
| **Proposal & Pricing** | Sales Closer Agent | LUCKY (AI COO) | Scope 48h có thực tế không? Mã VietQR có khớp STK không? |
| **Content & Ad Scripts** | Content Growth Agent | Lead Hunter Agent | Đúng 3 điểm xoáy chưa? Hook có đủ gắt không? Văn phong có bị trơ không? |
| **Gói Triển Khai 48h** | Delivery Engine Agent | Retention Care Agent | Workflow chạy được thật chưa? Video hướng dẫn có dễ hiểu không? |

---

## 4. 🌐 SOCIAL MEDIA MARKETING ENGINE (5 KÊNH PHỦ SỐNG)

Cấu trúc 5 kênh truyền thông chính của OPC-TNC và định dạng nội dung phân phối tự động:

```
                           ┌─────────────────────────┐
                           │   CONTENT HUB (MASTER)  │
                           │   Obsidian 5_Content/   │
                           └────────────┬────────────┘
                                        │
      ┌────────────────┬────────────────┼────────────────┬────────────────┐
      ▼                ▼                ▼                ▼                ▼
 1. Zalo OA &      2. Facebook      3. LinkedIn       4. TikTok &     5. Email
 Personal Diary    Page & Groups    Business Profile   Reels Short     Newsletter
 (Direct Chat)     (Social Proof)   (B2B Authority)   (Hook Video)    (Nurturing)
```

| Kênh Social | Loại Nội Dung Phù Hợp | Tần Suất | Mục Tiêu |
|-------------|-----------------------|----------|----------|
| **Zalo Cá nhân & OA** | Tin nhắn trực tiếp, Nhật ký ngắn, Case study | Daily | Chốt lịch Demo 1-1, CSKH |
| **Facebook Page & Group** | Post phân tích sâu 3 điểm xoáy, Bài viết Case study | 1 bài/ngày | Giáo dục thị trường, tạo Social Proof |
| **LinkedIn Business** | Bài viết định vị B2B, AI Agentic Automation Architecture | 3 bài/tuần | Tiếp cận CEO, Founder Agency |
| **TikTok & FB Reels** | Video ngắn Talking Head 60-90s, Screen-recording Demo | 3 videos/tuần | Thu hút Lead diện rộng (Top Funnel) |
| **Email Nurturing** | Chuỗi 5 email giáo dục thị trường & mời xem Demo | Automated | Nuôi dưỡng Lead Cool/Warm |

---

## 5. 💳 COMPANY FINANCIAL & PAYMENT ARCHITECTURE (HẠ TẦNG THANH TOÁN)

Chuẩn hóa thông tin tài chính công ty và cơ chế **Auto-Match biến động số dư**:

### 🏛️ Thông Tin Thanh Toán Chính Thức OPC-TNC

| Thuộc tính | Thông tin chuẩn hóa |
|------------|---------------------|
| **Tên Công Ty / Đơn Vị** | OPC-TNC (One Person Company — Trần Nguyên Chuyên) |
| **Chủ Tài Khoản** | Trần Nguyên Chuyên |
| **Số Tài Khoản** | `[SỐ TÀI KHOẢN NGÂN HÀNG CHÍNH THỨC]` |
| **Ngân Hàng** | `[TÊN NGÂN HÀNG — CHI NHÁNH]` |
| **Cú Pháp Chuyển Khoản Chuẩn** | `[TÊN LEAD] AI AGENT` *(Ví dụ: `THANG WIN AI AGENT`)* |
| **VietQR Quick Link API** | `https://img.vietqr.io/image/[BANK_ID]-[STK]-compact2.png?amount=1000000&addInfo=[CONTENT]&accountName=TRAN%20NGUYEN%20CHUYEN` |

### 🔄 Luồng Auto-Match Tiền Về (SePay / Casso Integration):

```
Khách quét VietQR chuyển 1tr ──► Ngân hàng báo tiền về ──► SePay Webhook ──► Python Script Worker ──► Auto update Lead: won ──► Auto tạo Client note
```

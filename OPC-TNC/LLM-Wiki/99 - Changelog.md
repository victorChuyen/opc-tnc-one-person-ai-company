---
type: llm-wiki
wiki_section: changelog
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Changelog
  - System History
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - changelog
  - opc_tnc
---

# 📜 CHANGELOG — LỊCH SỬ THAY ĐỔI HỆ THỐNG OPC-TNC

## 2026-08-08 (v5.0) — Cloudflare Production Tunnel, Dual Autostart, Mobile UX/UI & Go-Live Readiness

### 🆕 Thêm mới & Nâng cấp
- **Production Domain & Cloudflare Tunnel**:
  - Triển khai tên miền sản xuất chính thức **`https://ai.breaths.live`** thông qua Cloudflare Named Tunnel kết nối Node.js Web Server `http://localhost:8085`.
- **Hệ Thống Tự Động Khởi Chạy (Autostart 24/7)**:
  - Tạo bộ công cụ khởi động ngầm 100% khi bật máy: `install_autostart.bat`, `run_opc_background.vbs`, `uninstall_autostart.bat`.
  - Tạo file chạy thủ công có xem log: `run_opc_online.bat`.
- **Phễu Chuyển Đổi Opt-in & Tự Động Hóa Telegram**:
  - Tự động hóa gửi thông tin khách hàng Opt-in từ Web Modal đến Telegram Supergroup Topic #7 và tự động chuyển hướng khách hàng tới Nhóm Zalo Phễu Mã Nguồn **`https://zalo.me/g/tdhmtu261`**.
- **Động Cơ Đa Ngôn Ngữ Song Ngữ (Bilingual i18n VI & EN)**:
  - Tách biệt phễu chuyển đổi 100% cho thị trường Việt Nam (`VI`: Zalo Group) và Quốc tế (`EN`: Telegram Channel `https://t.me/OPCTNC` + Cal.com `https://cal.com/victorchuyen/coachai`).
- **Nâng Cấp Giao Diện Chuẩn Chuyên Nghiệp Mobile**:
  - Áp dụng phông chữ tiêu chuẩn **`Be Vietnam Pro`**, xóa bỏ 100% logo cũ.
  - Tự động ẩn dòng chữ tiêu đề dài trên màn hình di động, mở rộng nút CTA Top Lead Bar lên Full Width 100%.
  - Tích hợp thanh Mobile Sticky Footer Menu Bar cố định dưới đáy màn hình với hiệu ứng kính mờ (Backdrop Blur 20px).
- **Tài liệu Handoff**: Tạo file `HANDOFF.md` và `walkthrough.md` phục vụ các phiên làm việc tiếp theo.

---

## 2026-08-07 (v4.5) — AI CFO Finance Engine, VietQR Webhook & Auto Access Gating

### 🆕 Thêm mới & Nâng cấp
- **AI CFO (Trưởng Phòng Kế Toán AI)**: Đưa AI CFO làm Agent C-Suite thứ 6 trong hệ thống OPC-TNC, hiển thị trên 3D Office Simulator, Org Chart và Left Sidebar.
- **VietQR Webhook & Auto Access Gating**:
  - Nâng cấp `serve_local.mjs` tích hợp API `/api/finance/webhook` & `/api/finance/transactions`.
  - Tự động gạch nợ `PAID_VERIFIED` và cấp quyền truy cập Google Drive & Telegram VIP trong **3 Giây**.
  - Bán thông báo real-time tới Telegram Topic Admin của Chairman Victor.
- **LLM Wiki 20**: Xuất bản `LLM-Wiki/20 - AI CFO Finance Engine & Auto Access Gating.md` chuẩn hóa quy trình 5 bước và Data Schemas tab `Transactions`.

---

## 2026-08-07 (v4.0) — System QA, Monolith Split & 3D Web App Modularization

### 🆕 Thêm mới & Nâng cấp
- **QA & Bảo mật Toàn diện**: Thêm `.gitignore` bảo vệ file `.env` credentials, nâng cấp `opc_facebook_youtube_engine.mjs` tích hợp Telegram Bot API thật qua HTTPS.
- **Tách Monolith & Module hoá**:
  - Trích xuất CSS (1200+ LOC) sang `css/styles.css` kèm hỗ trợ Responsive Mobile Breakpoints.
  - Tách hệ thống Theme Manager sang `js/theme.mjs`.
  - Tách CSDL Ma Trận Truyền Thông sang `data/content_matrix.json`.
  - Nâng cấp `serve_local.mjs` hỗ trợ MIME `.mjs` và các API endpoints `/api/content/matrix`, `/api/sheets/status`.
- **Nâng cấp Hiệu năng 3D Three.js**: Tự động phát hiện thiết bị di động (Mobile detection), tự động giải phóng (dispose) Geometry/Material để chống Memory Leak khi đổi Workstyle.
- **Cập nhật Blueprint v3.0 & Wiki**: Thêm `LLM-Wiki/18 - Web App 3D Architecture.md` và cập nhật `OPC-TNC – Project Blueprint.md` v3.0.

---

## 2026-07-31 (v3.2) — VSL Silicon Valley UI/UX, Composio Live Publisher & 30-Day Video QA Schedule

### 🆕 Thêm mới & Nâng cấp
- **Tái thiết kế toàn diện VSL Landing Page** (`11_Media/VSL/index.HTML`) theo tiêu chuẩn Silicon Valley AI Platform (Obsidian Dark Mode, Liquid Glassmorphism, sửa 100% lỗi cắt/mất chữ, đồng bộ tuyệt đối 2 đồng hồ đếm ngược 10 phút, thay thế 4 nút liên hệ bằng VIP Executive Connect Hub và bổ sung Executive Footer).
- **Nâng cấp Composio Multi-Channel AI Publisher Engine** (`scripts/composio_social_publisher.py` & `.env`) lên **Composio SDK V3**:
  - Tích hợp thực thi qua SDK `c.tools.execute(slug='FACEBOOK_CREATE_POST', ...)` với hỗ trợ tham số `user_id` (`pg-test-007ec7c9-6fd2-4115-97d5-899231d5aa17`).
  - **Hệ thống xác thực Telegram thực tế (No Bullshit Execution):** Mỗi khi xuất bản bài đăng lên Facebook, AI tự động gửi báo cáo xác thực về Telegram Supergroup (`-1003415285389`) kèm **Link ID bài viết Facebook thật** và **đính kèm tệp Video MP4 thật** (`11_Media/Video/`) để kiểm định trực tiếp.
- **Hoàn thành QA 56 Video MP4 Full HD** trong `11_Media/Video` và lập **Lịch xuất bản tự động 30 ngày (90 bài đăng / 3 khung giờ Sáng - Trưa - Tối)**:
  - CSDL lịch đăng JSON: `11_Media/Video/30_day_posting_schedule.json`
  - Báo cáo lịch đăng Markdown: `11_Media/Video/30_DAY_POSTING_SCHEDULE_REPORT.md`
  - Script tự động hóa: `scripts/generate_30day_video_schedule.py`

---

## 2026-07-31 (v3.0) — LLM Wiki & Schema V2

### 🆕 Thêm mới
- **LLM-Wiki folder** — 12 files AI Knowledge Base:
  - `00 - LLM Wiki Index.md` — Entry point cho AI
  - `01 - System Architecture.md` — Kiến trúc 3 tầng
  - `02 - Data Dictionary.md` — Từ điển 200+ fields, 16 entity types
  - `03 - Pipeline Workflow.md` — Transition rules, daily workflow
  - `04 - Template Registry.md` — Registry 15 templates
  - `05 - SOP Playbook.md` — Tổng hợp 4 SOPs + objection handling
  - `06 - Sync Engine Reference.md` — Apps Script API reference
  - `07 - AI Agent Roles.md` — 5 vai trò AI Agent
  - `08 - Scoring & Rules Engine.md` — BANT scoring, temperature, health score
  - `09 - Content & Messaging Guide.md` — Brand voice, scripts, creative prompts
  - `10 - Naming & Tag Conventions.md` — Naming patterns, tag rules, wikilinks
  - `99 - Changelog.md` — File này

### 🐛 Bug Fixes
- **Template - Client.md** — Fix duplicate `health_score` field (xuất hiện 2 lần)
- **Lead Mr. Thắng Win** — Upgrade frontmatter lên schema v2:
  - Thêm: `temperature`, `lead_score`, `cssclasses`, `aliases`, `conversion_date`, `lost_date`, `lost_reason`
  - Fix: tags `opc-tnc` → `opc_tnc`, `ai-agentic` → `ai_agentic`
  - Fix: `pipeline_stage: lead` → `pipeline_stage: new`
  - Thêm: YAML section comments (`# Contact Info`, `# Qualification & BANT`, etc.)

---

## 2026-07-30 (v2.5) — System Upgrade & SOPs

### 🆕 Thêm mới
- **6 Plugins** cài đặt: Dataview, Templater, Tasks, Calendar, Kanban (+ QuickAdd có sẵn)
- **7 Templates mới**: Proposal, Competitor, Testimonial, Email Reply, Weekly Review, Monthly Report, (Content Script upgraded)
- **4 SOPs thực chiến**:
  - SOP 1 — Lead Intake (5 bước)
  - SOP 2 — Follow-up & Closing (5 bước)
  - SOP 3 — Client Care & Upsell (5 bước)
  - SOP 4 — Content & Ads Campaign Directive (3 điểm xoáy)
- **Dashboard folder** (`_Dashboard/`) — 4 trang: Home, Sales Pipeline, Client Health, Revenue Report
- **Sprint Project** — `3_Project - Sprint 10 Lead Real Operations.md`
- **Folders mới**: `10_Reviews/`, `11_Media/VSL/`, `5_Content/4_Emails/`, `7_Resources/4_Competitors/`

### 🔧 Cải thiện
- Templates nâng cấp v2 — thêm fields: `temperature`, `lead_score`, `health_score`, `nps_score`, `lifetime_value`, `currency`, `day_of_week`, `energy_level`, `cssclasses`, `aliases`
- Xóa 4 cặp template duplicate (OPC vs OPC TNC)
- Fix Template - Call.md: `type: offer` → `type: call`
- Fix file names: xóa đuôi `.md.md`
- Folder 9 fix thiếu dấu `)`

---

## 2026-07-30 (v2.0) — Audit & Blueprint Rewrite

### 📊 Audit
- Đọc toàn bộ vault: 14 templates, ~20 data files, Obsidian config, Apps Script code, 9 Google Sheet tabs
- Phát hiện: 52 vấn đề (15 critical, 17 major, 20 enhancement)

### 📝 Blueprint
- Viết lại hoàn chỉnh `OPC-TNC – Project Blueprint.md` v2.0:
  - Kiến trúc 3 tầng
  - Cây thư mục chi tiết
  - Data model 9 loại note
  - Google Sheets 9 tabs
  - Apps Script functions reference
  - Bugs known list
  - Roadmap 8 giai đoạn (38 tasks)
  - 4 milestones
  - Upgrade plan 8 phases
  - Quy ước làm việc
  - IDs & links tham chiếu

---

## 2026-07-30 (v1.0) — MVP Đầu Tiên

### 🏗️ Khởi tạo
- Định nghĩa kiến trúc vault OPC-TNC
- Thiết lập mapping OPC_CONFIG cho 5 modules (Leads, Calls, Offers, Clients, Daily)
- Viết Apps Script sync 2 chiều Obsidian ↔ Sheets
- Tạo Blueprint file gốc
- 1 lead thật: Mr. Thắng Win (Win Agency)

---

> **Quy tắc:** File này PHẢI được cập nhật mỗi khi có thay đổi kiến trúc, thêm/sửa field, đổi folder, fix bug, hoặc thêm template/SOP mới.

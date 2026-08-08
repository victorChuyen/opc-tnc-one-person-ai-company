---
type: llm-wiki
wiki_section: web-app-3d-architecture
version: "3.0"
last_updated: 2026-08-07
owner: Victor Chuyen
aliases:
  - 3D Virtual Office Simulator Architecture
  - OPC-TNC Web App Blueprint
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - architecture
  - 3d_simulator
  - opc_tnc
---

# 🏗️ 18 - ARCHITECTURE BLUEPRINT: 3D HUMANOID AI COMPANY SIMULATOR

> **Owner:** Chairman Victor Chuyen  
> **Mục đích:** Tài liệu kỹ thuật chi tiết về hệ thống Web App 3D Virtual Office Simulator (`index.html`, `css/styles.css`, `serve_local.mjs`).

---

## 1. TỔNG QUAN HỆ THỐNG WEB APP 3D

Web App 3D Virtual Office Simulator là **Bảng Điều Khiển Thị Giác Real-Time** cho công ty AI Agentic One-Person TNC GROUP. Hệ thống kết hợp giữa 3D Graphics r152, UI Cyberpunk Glassmorphism, và REST API backend để mô phỏng sự phối hợp giữa Chairman (Người) và 5 AI Giám Đốc (C-Suite Agents).

```
┌─────────────────────────────────────────────────────────────────────────┐
│              KIẾN TRÚC 3 THÀNH PHẦN CỦA WEB APP 3D                      │
│                                                                         │
│ 1. Frontend UI/UX Layer ──► Modular CSS (styles.css) + HTML5            │
│ 2. 3D Engine Layer      ──► Three.js r152 + Post-Processing (Bloom/FXAA)│
│ 3. API & Automation Core──► Node.js Local Server (serve_local.mjs)      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. MÔ HÌNH HUB-AND-SPOKE (5 AI C-SUITE DIRECTORS)

| AI Director | Vai trò | Mầu diện chẩn | Kỹ năng chính (Skills) |
|-------------|---------|---------------|------------------------|
| **👤 Chairman Victor** | Chủ Tịch (Human) | Gold (`#ffaa00`) | Strategic Vision, Final Approval Gate |
| **👑 AI CEO** | Tổng Giám Đốc (Hub) | Purple (`#9d4edd`) | Uỷ quyền, bóc tách chỉ thị, master framework |
| **📢 AI CMO** | Giám Đốc Marketing | Pink (`#ff007f`) | Meta Ads, Copywriting Hormozi, Competitor Intelligence |
| **💼 AI CSO** | Giám Đốc Sales B2B | Cyan (`#00f2ff`) | Cold Email 3-Step, LinkedIn Outreach, Demo Script |
| **🛠️ AI CPO** | Giám Đốc Kỹ Thuật | Green (`#00ff88`) | SaaS Fullstack, API Design, Deployment |
| **🧬 AI CHRO** | Giám Đốc Nhân Sự AI | Gold (`#ffaa00`) | Agent Spawning, Skill Creation, KPI Scoring |

---

## 3. BA PHONG CÁCH KHÔNG GIAN LÀM VIỆC (WORKSTYLE PRESETS)

1. **🎨 Tự Do & Thư Giãn (Creative Campus)**: Thảm cầu phồng Google, Espresso Bar, Bàn Ping-pong, Ghế hạt đậu.
2. **⚡ Hiệu Quả & Hiện Đại (Cyber Tech Lab)**: Whiteboard kính kép, Server Rack titan, Trạm VR testing.
3. **💼 Sang Trọng & Chuyên Nghiệp (Executive Luxury)**: Gỗ Mahogany, Nẹp mạ vàng, Tủ Cúp Vinh Danh, Executive Lounge.

---

## 5. TỰ ĐỘNG CHẠY NGẦM KHI KHỞI ĐỘNG WINDOWS (SILENT BACKGROUND DAEMON)

Hệ thống được trang bị cơ chế tự động khởi chạy ngầm 100% không hiển thị cửa sổ Command Prompt (tương tự 9router, Ollama, Obsidian):

- **VBScript Silent Launcher:** [run_opc_background.vbs](file:///D:/OPC-TNC/run_opc_background.vbs) khởi chạy `serve_local.mjs` (Port 8085) và Cloudflare Tunnel `opc-tnc-tunnel` (`https://opc.coach.io.vn`) ở chế độ WindowStyle 0 (Ẩn 100%).
- **Trình Cài Đặt 1-Click:** [install_autostart.bat](file:///D:/OPC-TNC/install_autostart.bat) đăng ký shortcut vào thư mục `shell:startup` của Windows.
- **Trình Gỡ Bỏ:** [uninstall_autostart.bat](file:///D:/OPC-TNC/uninstall_autostart.bat) giúp gỡ bỏ khỏi Windows Startup dễ dàng.


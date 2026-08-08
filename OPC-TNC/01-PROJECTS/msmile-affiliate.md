---
project: msmile-affiliate
status: active
started: 2026-07
tags: [project, ecommerce, automation]
path: D:\AI_2026\MSmile Affiliate
---

# 📦 MSmile Affiliate

## Overview
- **Vai trò**: Tự động hoá E-commerce cho MSmile Fashion — Scrape, Content, Dashboard
- **Repo**: `D:\AI_2026\MSmile Affiliate`
- **Dashboard**: `start-dashboard.bat`

## Chức năng chính
- 🕷️ Scraper đa nền tảng (TikTok, Facebook, YouTube, Instagram)
- 🎨 Content AI Generation (`run-creative.mjs`, `run-daily-content.mjs`)
- 🎬 Veo3 Video Generation (`run-veo.mjs`)
- 📊 Dashboard theo dõi hiệu suất (`dashboard-server.mjs`)
- 🤖 Orchestrator AI (`run-orchestrator.mjs`)

## Cấu hình
- `.env.paperclip` — Config Paperclip + 9Router + Ollama
- `docker-compose.9router.yml` — 9Router container

## QA Notes
> [!WARNING]
> - API keys lộ trong `.env.paperclip` → cần rotate
> - Thiếu file `.env` chính (chỉ có `.env.example`)

## Liên kết
- [[paperclip]] — Control Plane
- [[9router-gateway]] — LLM Proxy

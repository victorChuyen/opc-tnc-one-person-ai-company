---
project: 9router-gateway
status: active
started: 2026-07
tags: [project, infrastructure, llm-proxy]
path: D:\All Tool\9router
port: 20128
---

# 🔀 9Router LLM Gateway

## Overview
- **Vai trò**: Self-hosted AI API Proxy — quản lý multi-key, auto-fallback, token compression
- **Port**: `http://localhost:20128`
- **Dashboard**: `http://localhost:20128/dashboard` (pass: `savaco`)
- **Repo**: `D:\All Tool\9router`

## Models (70+)
- `paperclip` (combo route)
- `ag/gemini-3.6-flash-high`, `ag/gemini-3.5-flash-*`
- `kr/claude-opus-5`, `kr/claude-sonnet-5`
- `xai/grok-4`, `groq/llama-3.3-70b`
- `ollama/*` (local models)
- `nvidia/*`, `bpm/*` (external providers)

## API Keys
| Key | Dùng cho |
| :--- | :--- |
| `sk-7c1f91635f52dc7e-mv2ws4-27275291` | Paperclip `.env` |
| `sk-fecfff01bf319250-u6xywi-cf14335e` | MSmile `.env.paperclip` |

## Liên kết
- [[paperclip]] — Control Plane sử dụng 9Router
- [[msmile-affiliate]] — MSmile dùng 9Router fallback
- [[03-RESOURCES/tech-stack]]

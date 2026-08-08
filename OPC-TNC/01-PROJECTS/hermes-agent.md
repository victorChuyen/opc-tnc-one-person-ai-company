---
project: hermes-agent
status: active
tags: [project, agent-core, infrastructure]
path: D:\Hermes-agent
---

# 🤖 Hermes Agent

## Overview
- **Vai trò**: Agent Runtime Core — CLI, TUI, Gateway, Desktop App
- **Repo**: `D:\Hermes-agent`
- **Tính năng**: Memory across sessions, subagents, scheduled jobs, terminal + browser control

## Kiến trúc
- `run_agent.py` — AIAgent class, core conversation loop (~12k LOC)
- `cli.py` — HermesCLI, interactive CLI (~11k LOC)
- `gateway/` — Messaging gateway (Telegram, Discord, Slack, 20+ platforms)
- `plugins/` — Memory, context engine, model providers, kanban, image gen
- `tools/` — Tool implementations, auto-discovered via registry

## Liên kết
- [[paperclip]] — Hermes là adapter runtime cho Paperclip agents
- [[01-PROJECTS/hermes-paperclip-adapter]] — Plugin nối Hermes ↔ Paperclip

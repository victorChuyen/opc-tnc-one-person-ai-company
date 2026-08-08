---
tags: [area, finance, llm]
---

# 🤖 LLM Cost Tracking

## Chi phí API hàng tháng
| Provider | Endpoint | Model chính | Cost/Month | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| 9Router (self-hosted) | localhost:20128 | Multi-provider proxy | $0 (hosting) | Gateway miễn phí |
| Google AI | via 9Router | Gemini 3.6 Flash | $ | Qua API key |
| Ollama (local) | localhost:11434 | qwen3:8b | $0 | GPU local |
| Anthropic | via 9Router | Claude Sonnet 5 | $ | Backup |

## Tips Tối Ưu
- Dùng Gemini Flash cho bulk tasks (rẻ nhất)
- Dùng Ollama cho tasks offline / sensitive
- Dùng Claude chỉ cho complex reasoning
- 9Router auto-fallback giúp tiết kiệm khi provider lỗi

## Liên kết
- [[monthly-budget]]
- [[01-PROJECTS/9router-gateway]]

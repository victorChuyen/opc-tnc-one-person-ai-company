---
type: llm-wiki
wiki_section: mcp-publisher
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - MCP Multi-Channel Auto-Publisher Architecture
  - MCP Gateway Blueprint
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - mcp
  - multi_channel
  - publisher
  - opc_tnc
---

# 🔌 MCP MULTI-CHANNEL AUTO-PUBLISHER ARCHITECTURE (MODEL CONTEXT PROTOCOL)

> **Tư duy kiến trúc từ Founder Victor Chuyen:** Thiết lập Cổng **MCP (Model Context Protocol)** làm trung tâm kết nối APIs thứ 3 để tự động hóa 100% khâu biến 1 bài viết Master thành 5 định dạng truyền thông và phát ĐA KÊNH tự động sau khi được duyệt 1-Click.

---

## 🎯 1. TỔNG QUAN MÔ HÌNH CỔNG MCP DỰ CẢNH (MCP GATEWAY ARCHITECTURE)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 MCP MULTI-CHANNEL PUBLISHING PIPELINE                       │
│                                                                             │
│ [Master Content] ──► MCP Adapter Layer ──► 1-Click QA Telegram Approval     │
│  (5_Content/3_Posts) (Format Transformer)   (Founder / Lucky Approval)    │
│                                                     │                       │
│                                                     ▼ (Approve Pass)        │
│                                          MCP SOCIAL PUBLISHER SERVER        │
│                                                     │                       │
│      ┌────────────────┬─────────────────────┼─────────────────────┐         │
│      ▼                ▼                     ▼                     ▼         │
│ 1. Facebook       2. Zalo OA           3. LinkedIn           4. Email       │
│ Graph API         Open API             v2 API                Resend/SendGrid│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ 2. CÁC THÀNH PHẦN CỐT LÕI CỦA CỔNG MCP PUBLISHER

### A. MCP Server Tool Definition (`mcp_social_publisher`)
Cổng MCP đóng gói các công cụ API thành các chuẩn tool calls:

| MCP Tool Name | Target Platform | 3rd Party API | Dữ liệu truyền vào (Parameters) |
|---------------|-----------------|---------------|----------------------------------|
| `publish_facebook_post` | Facebook Page / Group | Facebook Graph API v19.0 | `page_id`, `message`, `image_url`, `link` |
| `publish_zalo_article` | Zalo Official Account (OA) | Zalo OA Open API v3.0 | `oa_id`, `title`, `abstract`, `body`, `cover_url` |
| `publish_linkedin_post` | LinkedIn Organization / Profile | LinkedIn REST API v2 | `author_urn`, `text`, `media_category` |
| `send_email_newsletter` | Email Campaign | Resend / SendGrid API | `subject`, `html_content`, `recipient_group` |
| `broadcast_multi_channel` | Tất cả 4 kênh đồng thời | MCP Router Engine | `master_post_id`, `channels_enabled` |

---

### B. Bộ Biến Đổi Định Dạng Tự Động (Format Transformation Layer)
Từ 1 bài Master Post trong `5_Content/3_Posts/`, MCP Adapter tự động tối ưu cho từng nền tảng:

1. **Facebook Format:** Giữ nguyên bài viết dài + Thêm Hashtags (`#AIAgentic #OPCTNC`) + Đính kèm Ảnh Ad Creative.
2. **Zalo OA Format:** Tóm tắt 3 câu Hook ngắn + Ảnh Banner + Button `[Đăng Ký Demo 48h]`.
3. **LinkedIn Format:** Chuyển sang giọng văn Chuyên gia B2B + Định dạng Bullet Points + Thêm hashtags doanh nghiệp.
4. **Email Newsletter Format:** Khởi tạo khung HTML responsive + Merge Tag tên khách hàng (`{{First_Name}}`) + Nút CTA chuyển khoản / đặt lịch.

---

## 🛡️ 3. QUY TRÌNH KÍCH HOẠT VÀ PHÊ DUYỆT 1-CLICK

```
Step 1: Content Growth Agent tạo bài viết mới trong 5_Content/3_Posts/
   ⬇
Step 2: MCP Adapter tự động Format ra 4 bản (FB, Zalo, LinkedIn, Email)
   ⬇
Step 3: Lucky gửi Thẻ QA Review kèm Nút Bấm 1-Click tới Telegram Founder
   ⬇
Step 4: Founder bấm nút [✅ Duyệt & Đăng Đa Kênh (Broadcast)]
   ⬇
Step 5: Cổng MCP tự động kích hoạt 4 APIs phát bài đồng thời trong 3 giây!
```

---

## 📋 4. HÀM MÃ NGUỒN CỔNG MCP DỰ KIẾN (`scripts/mcp_social_publisher.py`)

```python
"""
MCP Social Publisher Script Template
"""
import os
import requests

def publish_to_facebook(message, image_url=None):
    token = os.getenv("FACEBOOK_PAGE_ACCESS_TOKEN")
    page_id = os.getenv("FACEBOOK_PAGE_ID")
    # Call Facebook Graph API...
    return True

def publish_to_zalo(title, body):
    token = os.getenv("ZALO_ACCESS_TOKEN")
    # Call Zalo Open API...
    return True

def broadcast_post(master_post_path):
    # Parse master post, call all APIs
    print(f"Broadcasting {master_post_path} across all platforms via MCP Gateway!")
```

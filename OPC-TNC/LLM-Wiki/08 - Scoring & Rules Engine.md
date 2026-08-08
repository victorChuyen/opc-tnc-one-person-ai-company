---
type: llm-wiki
wiki_section: scoring-rules
version: "1.0"
last_updated: 2026-07-31
owner: Victor Chuyen
aliases:
  - Scoring Rules Engine
  - BANT Scoring
cssclasses:
  - llm-wiki
tags:
  - llm_wiki
  - scoring
  - rules
  - opc_tnc
---

# 🎯 SCORING & RULES ENGINE — QUY TẮC CHẤM ĐIỂM OPC-TNC

> AI đọc file này để tự evaluate và phân loại lead, client, và quyết định hành động tiếp theo.

---

## 1. LEAD SCORE — BANT COMPOSITE (0-100)

### Bảng chấm điểm BANT

| Tiêu chí | Điểm | Điều kiện |
|----------|-------|-----------|
| **B - Budget (Ngân sách)** | | |
| | +25 | Xác nhận có ngân sách ≥ 1.000.000đ |
| | +15 | Có ngân sách nhưng chưa rõ mức |
| | +5 | Đang cân nhắc, chưa có ngân sách |
| | 0 | Không có ngân sách |
| **A - Authority (Thẩm quyền)** | | |
| | +25 | CEO / Founder / Chủ DN (ra quyết định trực tiếp) |
| | +15 | Manager / Team Lead (có ảnh hưởng) |
| | +5 | Nhân viên (cần hỏi sếp) |
| **N - Need (Nhu cầu)** | | |
| | +25 | Pain rõ ràng + cấp bách + đã nói ra |
| | +15 | Có nhu cầu nhưng chưa gấp |
| | +5 | Tò mò, chưa có nhu cầu rõ |
| **T - Timeline (Thời gian)** | | |
| | +25 | Muốn làm ngay trong 1-2 tuần |
| | +15 | Lên kế hoạch trong 1 tháng |
| | +5 | Chưa có timeline cụ thể |

### Score Ranges → Hành động

| Score Range | Phân loại | Temperature | Hành động |
|-------------|-----------|-------------|-----------|
| **80-100** | 🔥 Hot Lead | `hot` | Mời demo NGAY, ưu tiên số 1 |
| **60-79** | 🟡 Warm Lead | `warm` | Gửi tài nguyên + hẹn call trong 48h |
| **40-59** | 🟠 Cool Lead | `warm` | Nurturing: gửi case study, content giáo dục |
| **20-39** | 🔵 Cold Lead | `cold` | Thêm vào danh sách nurturing dài hạn |
| **0-19** | ⚪ Not Qualified | `cold` | Theo dõi, không outreach chủ động |

### Cách tính nhanh

```
lead_score = Budget_score + Authority_score + Need_score + Timeline_score
```

**Ví dụ:** Mr. Thắng Win — CEO agency (A=25), có nhu cầu AI Ads (N=25), ngân sách OK (B=15), muốn làm sớm (T=15) → **Score = 80 (Hot Lead)**

---

## 2. TEMPERATURE RULES

| Temperature | Điều kiện | Visual |
|-------------|-----------|--------|
| `hot` | Score ≥ 70 HOẶC khách chủ động hỏi giá HOẶC đã đặt lịch demo | 🔥 |
| `warm` | Score 40-69 HOẶC đã trả lời 3 câu BANT HOẶC đã nhận tài nguyên | 🟡 |
| `cold` | Score < 40 HOẶC không phản hồi > 3 ngày HOẶC chỉ xem content | 🧊 |

### Auto-upgrade Rules

| Sự kiện | Temperature change |
|---------|-------------------|
| Trả lời 3 câu BANT | `cold` → `warm` |
| Hỏi giá / hỏi chi tiết offer | `warm` → `hot` |
| Đặt lịch call demo | → `hot` |
| Không phản hồi 7 ngày | downgrade 1 bậc |
| Mở email/tài nguyên gửi | giữ nguyên hoặc +1 |

---

## 3. HEALTH SCORE — KHÁCH HÀNG (1-10)

### Bảng đánh giá

| Score | Ý nghĩa | Hành động |
|-------|---------|-----------|
| **9-10** | 🟢 Tuyệt vời | Xin testimonial, đề xuất upsell |
| **7-8** | 🟢 Tốt | Duy trì, check-in định kỳ |
| **5-6** | 🟡 Trung bình | Tìm hiểu vấn đề, hỗ trợ thêm |
| **3-4** | 🟠 Có rủi ro | Can thiệp ngay, gọi trực tiếp |
| **1-2** | 🔴 Nguy hiểm | Escalate, risk of churn |

### Tiêu chí đánh giá

| Tiêu chí | Tốt (+2) | Trung bình (+1) | Kém (0) |
|----------|----------|-----------------|---------|
| Agent chạy ổn định | Không lỗi | Lỗi nhỏ, đã fix | Lỗi nghiêm trọng |
| Phản hồi tin nhắn | <24h | 1-3 ngày | >3 ngày / không phản hồi |
| Sử dụng thường xuyên | Hàng ngày | Hàng tuần | Không dùng |
| Feedback tích cực | Khen, chia sẻ | Bình thường | Phàn nàn |
| Mức độ hài lòng | Rất hài lòng | Hài lòng | Không hài lòng |

---

## 4. NPS SCORE (1-10)

| NPS Range | Phân loại | Hành động |
|-----------|-----------|-----------|
| **9-10** | Promoter | Xin referral, testimonial, case study |
| **7-8** | Passive | Tìm cách nâng trải nghiệm |
| **1-6** | Detractor | Can thiệp ngay, tìm hiểu nguyên nhân |

---

## 5. PRIORITY AUTO-ASSIGNMENT

### Lead Priority

| Điều kiện | Priority |
|-----------|----------|
| `lead_score ≥ 80` OR `temperature = hot` | `high` |
| `lead_score 50-79` OR `temperature = warm` | `medium` |
| `lead_score < 50` OR `temperature = cold` | `low` |

### Client Priority

| Điều kiện | Priority |
|-----------|----------|
| `health_score ≤ 4` OR `upsell_potential = high` | `high` |
| `health_score 5-7` | `medium` |
| `health_score ≥ 8` AND `upsell_potential = low` | `low` |

### Call Priority

| Điều kiện | Priority |
|-----------|----------|
| Lead có `temperature = hot` OR `call_type = closing` | `high` |
| `call_type = discovery` | `medium` |
| `call_type = review` OR `follow_up` | `low` |

---

## 6. DECISION MATRIX — SCORE → HÀNH ĐỘNG

```
Lead mới vào hệ thống
        │
        ▼
   Hỏi 3 câu BANT
        │
        ▼
   Tính lead_score
        │
        ├── Score ≥ 70 ──► Mời demo NGAY (SOP 2)
        │                   Set temperature: hot
        │                   Tạo Call note
        │
        ├── Score 50-69 ──► Gửi tài nguyên trước
        │                   Set temperature: warm
        │                   Hẹn call trong 48h
        │
        ├── Score 30-49 ──► Nurturing
        │                   Gửi 1 content/tuần
        │                   Re-evaluate sau 2 tuần
        │
        └── Score < 30 ──► Add to nurturing list
                           Không outreach chủ động
                           Re-evaluate sau 1 tháng
```

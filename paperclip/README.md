# TNC GROUP

Công ty AI Agentic One-Person vận hành bởi CEO Victor. Chuyên cung cấp sản phẩm SaaS, dịch vụ AI Agency, và các hệ thống AI tự động hóa cao.

## Workflow & Mô Hình Hoạt Động

TNC GROUP hoạt động theo mô hình **Hub-and-Spoke (Bánh xe trung tâm)**. 
- **Chairman (Human - Victor)** là người ra quyết định cấp cao nhất.
- Chairman chỉ cần giao tiếp với **AI CEO**.
- CEO sẽ phân rã công việc và điều phối cho các Giám đốc chuyên môn (CMO, CSO, CPO, CHRO).
- Các phòng ban có thể tự mở rộng nhân sự (qua CHRO) khi cần các chuyên môn sâu hơn.

## Sơ Đồ Tổ Chức

* **CEO (Tổng Giám Đốc)** - Điều phối toàn bộ công ty, nhận lệnh từ Chairman.
  * **CMO (Giám Đốc Marketing)** - Chạy Meta Ads, viết Copywriting, phân tích Niche.
  * **CSO (Giám Đốc Sales & Outreach)** - Tìm kiếm khách B2B, gửi Cold Email, chốt sale.
  * **CPO (Giám Đốc Sản Phẩm & Kỹ Thuật)** - Code SaaS, thiết kế hệ thống phần mềm, fix bug.
  * **CHRO (Giám Đốc Nhân Sự AI)** - Tạo thêm Agent mới, viết Skill mới cho công ty.

## Hướng Dẫn Import Vào Paperclip

Để đưa TNC GROUP vào hệ thống quản trị Paperclip, hãy chạy lệnh sau trong Terminal (trên thư mục chứa dự án paperclip):

```bash
pnpm --filter @paperclipai/server exec tsx src/index.ts company import --from D:\AI_2026\TNC_GROUP
```

*Lưu ý: TNC GROUP được thiết kế theo tiêu chuẩn Agent Companies Specification v1.*

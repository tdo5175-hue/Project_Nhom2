# Skill Guidelines & Workflow Rules

File này định nghĩa các nguyên tắc làm việc, tiêu chuẩn kiến trúc, phong cách giao diện và quy trình code bắt buộc cho toàn bộ dự án.

---

## 1. Nguyên Tắc Làm Việc & Giao Tiếp (Workflow)

1. **Lập Kế Hoạch Trước Khi Thực Thi (Planning First):**
   - Trước khi viết mới hoặc sửa đổi code, luôn phải phân tích và trình bày kế hoạch thực hiện rõ ràng (mục tiêu, các file cần tác động, luồng logic).
   - Chỉ bắt đầu code sau khi các bước đã được vạch ra mạch lạc.

2. **Quyền Quyết Định Thuộc Về Người Dùng (User Choice):**
   - Khi có bất kỳ thay đổi nào (về giải pháp kỹ thuật, cấu trúc giao diện, hoặc các phương án lựa chọn), bắt buộc phải đưa ra các tùy chọn (Option A, Option B,...) để người dùng chọn trước khi áp dụng.

---

## 2. Công Nghệ & Cấu Trúc Dự Án (Tech Stack & Architecture)

1. **Công Nghệ Thuần (Pure Stack):**
   - Chỉ sử dụng: **HTML5**, **CSS3**, và **JavaScript (ES6+)**.
   - Không dùng thư viện hay framework ngoài (không jQuery, không Tailwind, không React/Vue) trừ khi có yêu cầu riêng biệt.

2. **Tách File Độc Lập (External Files Only):**
   - Không viết inline CSS (`style="..."`) hoặc inline JS (`onclick="..."`).
   - Không dùng thẻ `<style>` hoặc `<script>` chứa logic dài trong file HTML.
   - Tất cả CSS và JS phải tách thành các file `.css` và `.js` riêng biệt và link vào HTML.

3. **Cấu Trúc Thư Mục Chuẩn:**
   ```text
   project-root/
   ├── .skill/
   │   └── skill.md
   ├── css/
   │   └── style.css
   ├── js/
   │   └── app.js
   ├── images/
   ├── video/
   └── index.html
   ```

---

## 3. Quy Chuẩn Tính Năng Cho Danh Sách (List Management Rules)

Mọi màn hình hoặc thành phần hiển thị danh sách dữ liệu (table, cards, data list) **bắt buộc** phải tích hợp đầy đủ 4 tính năng sau:

1. **Tìm kiếm (Search):**
   - Cho phép tìm kiếm tức thời theo từ khóa.
2. **Lọc (Filter):**
   - Lọc dữ liệu theo trạng thái, danh mục hoặc tiêu chí tương ứng của bài toán.
3. **Sắp xếp (Sort):**
   - Sắp xếp tăng dần / giảm dần theo `title` (tiêu đề/tên).
4. **Phân trang (Pagination):**
   - Hỗ trợ chọn số lượng bản ghi hiển thị trên mỗi trang với các mốc: `10`, `20`, `50`, và `All` (tất cả).

---

## 4. Phong Cách Thiết Kế & Hiệu Ứng (UI/UX Guidelines)

1. **Phong Cách Glassmorphism:**
   - Sử dụng hiệu ứng kính mờ tinh tế:
     - `backdrop-filter: blur(...)`
     - Màu nền trong suốt có độ mờ nhẹ (ví dụ: `rgba(255, 255, 255, 0.1)` hoặc `rgba(15, 23, 42, 0.6)`)
     - Viền nhẹ phản chiếu ánh sáng (border bán mờ: `1px solid rgba(255, 255, 255, 0.15)`)
     - Đổ bóng mềm (`box-shadow`) để tạo chiều sâu lớp kính.

2. **Chống Hiệu Ứng "Màu Mè" & "Kiểu AI":**
   - **Tối giản & Tự nhiên:** Animation/Transition phải ngắn gọn, mượt mà (thời gian `150ms` – `300ms`, dùng hàm `ease-out` hoặc `ease-in-out`).
   - **Tránh:** Gradient cầu vồng chói lọi, hiệu ứng neon phát sáng lòe loẹt, chuyển động xoay giật không mục đích hoặc layout rườm rà thường thấy từ các template AI tạo mẫu.
   - Tập trung vào tính tương phản chữ đọc được (accessibility) và trải nghiệm sử dụng thực tế.
/**
 * ==============================================================================
 * BÀI TẬP 5: MÁY TÍNH GIẢM GIÁ (DISCOUNT CALCULATOR)
 * Môn: Thiết Kế Web & Lập Trình JavaScript Cơ Bản (Buổi 14/10/2026)
 * Sinh viên / Nhóm: Nhóm 2 - Trường Đại học Lạc Hồng (LHU)
 * ==============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * Nhập số tiền hóa đơn. Nếu số tiền > 500.000đ thì giảm giá 10%, ngược lại
 * không giảm. Tính số tiền cuối cùng phải trả.
 * ==============================================================================
 */

// 1. Khai báo các hằng số chính sách giảm giá
// Ngưỡng áp dụng: Hóa đơn trên 500.000đ
const NGUONG_GIAM = 500000;
// Mức chiết khấu: 10% = 0.10
const TI_LE_GIAM = 0.10;

/**
 * Hàm tính giảm giá và hiển thị chi tiết hóa đơn trên trang web
 */
function tinhGiamGiaTrangWeb() {
  const input = document.getElementById("inputAmount");
  const box = document.getElementById("resultBox");
  const valEle = document.getElementById("resultValue");
  const detailsEle = document.getElementById("resultDetails");
  const logEle = document.getElementById("liveLog");

  let raw = input.value.trim();

  // Kiểm tra trường hợp để trống
  if (raw === "") {
    box.className = "result-box";
    valEle.textContent = "Chờ nhập liệu...";
    detailsEle.textContent = "Vui lòng nhập số tiền hóa đơn vào ô trên.";
    return;
  }

  // Ép kiểu chuỗi sang số thực
  let tongTien = parseFloat(raw);

  // Kiểm tra tính hợp lệ: Không phải chữ và tiền >= 0
  if (isNaN(tongTien) || tongTien < 0) {
    box.className = "result-box error";
    valEle.textContent = "Số tiền không hợp lệ";
    detailsEle.innerHTML = "Số tiền hóa đơn không hợp lệ (không được là chữ hoặc số âm).";
    logEle.textContent = `❌ Lỗi: "${raw}" không phải là số tiền hợp lệ!`;
    return;
  }

  // Thuật toán xét giảm giá:
  // Nếu số tiền > 500.000đ -> Giảm 10%, ngược lại không giảm (0đ)
  let tienGiam = 0;
  let phanTram = 0;

  if (tongTien > NGUONG_GIAM) {
    phanTram = 10;
    tienGiam = tongTien * TI_LE_GIAM;
  }

  // Tính số tiền thực tế khách hàng phải trả
  let tienPhaiTra = tongTien - tienGiam;

  // Cập nhật kết quả lên giao diện
  box.className = "result-box success";
  valEle.textContent = tienPhaiTra.toLocaleString("vi-VN") + " VNĐ";
  detailsEle.innerHTML = `
    • Tiền hóa đơn gốc: <strong>${tongTien.toLocaleString("vi-VN")} VNĐ</strong><br>
    • Mức giảm áp dụng: <strong>${phanTram}%</strong> (${phanTram > 0 ? `Tiết kiệm được <strong>-${tienGiam.toLocaleString("vi-VN")} VNĐ</strong>` : "Không đủ điều kiện > 500.000đ"})<br>
    • Số tiền thực tế phải trả: <code>${tongTien.toLocaleString("vi-VN")} - ${tienGiam.toLocaleString("vi-VN")} = ${tienPhaiTra.toLocaleString("vi-VN")} VNĐ</code>
  `;

  // Ghi log
  let logMsg = `Hóa đơn: ${tongTien.toLocaleString("vi-VN")}đ | Giảm: ${phanTram}% (-${tienGiam.toLocaleString("vi-VN")}đ) => Thực trả: ${tienPhaiTra.toLocaleString("vi-VN")}đ`;
  logEle.textContent = logMsg;
  console.log(logMsg);
}

/**
 * Hàm chọn nhanh số tiền mẫu từ preset
 * @param {number} soTien - Số tiền hóa đơn mẫu
 */
function chonNhanh(soTien) {
  document.getElementById("inputAmount").value = soTien;
  tinhGiamGiaTrangWeb();
}

/**
 * Hàm thực thi bằng prompt() và alert() theo đúng chuẩn bài học
 */
function chayPrompt() {
  let raw = prompt("BÀI 5: Nhập số tiền hóa đơn (VNĐ):");
  if (raw === null) return;

  let tongTien = parseFloat(raw);
  if (isNaN(tongTien) || tongTien < 0) {
    console.error("Lỗi: Số tiền hóa đơn không hợp lệ!");
    alert("Lỗi: Vui lòng nhập số tiền hợp lệ (>= 0đ)!");
    return;
  }

  // Rẽ nhánh if...else tính chiết khấu
  let tienGiam = (tongTien > NGUONG_GIAM) ? (tongTien * TI_LE_GIAM) : 0;
  let phanTram = (tongTien > NGUONG_GIAM) ? 10 : 0;
  let tienPhaiTra = tongTien - tienGiam;

  let msg = `CHI TIẾT THANH TOÁN:\n• Tiền gốc: ${tongTien.toLocaleString("vi-VN")} VNĐ\n• Giảm giá: ${phanTram}% (-${tienGiam.toLocaleString("vi-VN")} VNĐ)\n• SỐ TIỀN PHẢI TRẢ: ${tienPhaiTra.toLocaleString("vi-VN")} VNĐ`;
  console.log(msg);
  alert(msg);

  // Đồng bộ lên trang web
  document.getElementById("inputAmount").value = tongTien;
  tinhGiamGiaTrangWeb();
}

/**
 * Sao chép mã nguồn vào clipboard
 */
function saoChepCode() {
  const code = document.getElementById("codeText").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Đã sao chép mã nguồn Bài 5 vào bộ nhớ tạm!");
  });
}

// Tự động kích hoạt tính toán khi mở trang
window.addEventListener("DOMContentLoaded", tinhGiamGiaTrangWeb);

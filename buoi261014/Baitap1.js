/**
 * ==============================================================================
 * BÀI TẬP 1: CHUYỂN ĐỔI TIỀN TỆ ĐƠN GIẢN (USD -> VND)
 * Môn: Thiết Kế Web & Lập Trình JavaScript Cơ Bản (Buổi 14/10/2026)
 * Sinh viên / Nhóm: Nhóm 2 - Trường Đại học Lạc Hồng (LHU)
 * ==============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * Viết mã JS cho phép nhập số lượng USD và tính ra số tiền VND tương ứng
 * (giả sử tỉ giá 25.000). Kết quả hiện ra console.
 * ==============================================================================
 */

// 1. Khai báo hằng số tỉ giá quy đổi cố định (1 USD = 25.000 VNĐ)
// Dùng từ khóa 'const' vì giá trị này không thay đổi trong quá trình thực thi
const TY_GIA = 25000;

/**
 * Hàm tính toán và hiển thị kết quả trực tiếp trên giao diện Web
 */
function tinhVNDTrangWeb() {
  const input = document.getElementById("inputUSD");
  const box = document.getElementById("resultBox");
  const valEle = document.getElementById("resultValue");
  const detailsEle = document.getElementById("resultDetails");
  const logEle = document.getElementById("liveLog");

  let raw = input.value.trim();

  // Kiểm tra trường hợp ô nhập để trống
  if (raw === "") {
    box.className = "result-box";
    valEle.textContent = "Chờ nhập liệu...";
    detailsEle.textContent = "Vui lòng nhập số lượng USD vào ô trên.";
    return;
  }

  // Ép kiểu chuỗi sang số thực
  let usd = parseFloat(raw);

  // Kiểm tra hợp lệ: Không phải số hoặc là số âm
  if (isNaN(usd) || usd < 0) {
    box.className = "result-box error";
    valEle.textContent = "Lỗi nhập liệu";
    detailsEle.innerHTML = "Số tiền USD không hợp lệ (không được là chữ hoặc số âm).";
    logEle.textContent = "❌ Lỗi: Số tiền USD không hợp lệ!";
    return;
  }

  // Thực hiện phép nhân tính ra số tiền VND
  let vnd = usd * TY_GIA;

  // Cập nhật giao diện với định dạng phân cách hàng nghìn
  box.className = "result-box success";
  valEle.textContent = vnd.toLocaleString("vi-VN") + " VNĐ";
  detailsEle.innerHTML = `
    • Số tiền USD: <strong>$${usd.toLocaleString("en-US")}</strong><br>
    • Tỉ giá áp dụng: <strong>1 USD = 25.000 VNĐ</strong><br>
    • Phép toán thực hiện: <code>${usd} × 25.000 = ${vnd.toLocaleString("vi-VN")}</code>
  `;

  // Ghi kết quả ra màn hình console và live log
  let logMsg = `$${usd.toLocaleString("en-US")} USD = ${vnd.toLocaleString("vi-VN")} VND (Console.log)`;
  logEle.textContent = logMsg;
  console.log(logMsg);
}

/**
 * Hàm chọn nhanh số tiền mẫu từ các nút preset
 * @param {number} soUSD - Số tiền USD mẫu
 */
function chonNhanh(soUSD) {
  document.getElementById("inputUSD").value = soUSD;
  tinhVNDTrangWeb();
}

/**
 * Hàm thực thi bằng prompt() và console.log() theo đúng yêu cầu đề bài trên lớp
 */
function chayPrompt() {
  // Nhập số lượng USD từ bàn phím bằng prompt
  let raw = prompt("BÀI 1: Nhập số lượng USD cần đổi sang VND (Ví dụ: 100):");

  // Kiểm tra nếu người dùng nhấn Hủy (Cancel)
  if (raw === null) {
    console.log("-> Bạn đã hủy thao tác quy đổi.");
    return;
  }

  // Ép kiểu chuỗi sang số thực
  let usd = parseFloat(raw);

  // Kiểm tra tính hợp lệ
  if (isNaN(usd) || usd < 0) {
    console.error("Lỗi: Số tiền USD không hợp lệ!");
    alert("Lỗi: Vui lòng nhập số tiền USD hợp lệ >= 0!");
    return;
  }

  // Tính tiền VND
  let vnd = usd * TY_GIA;

  // In ra console theo đúng yêu cầu
  let msg = `$${usd.toLocaleString("en-US")} USD = ${vnd.toLocaleString("vi-VN")} VND`;
  console.log(msg);
  alert("Kết quả (đã in ra console):\n" + msg);

  // Đồng bộ lên giao diện trang web
  document.getElementById("inputUSD").value = usd;
  tinhVNDTrangWeb();
}

/**
 * Hàm sao chép mã nguồn vào clipboard
 */
function saoChepCode() {
  const code = document.getElementById("codeText").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Đã sao chép mã nguồn Bài 1 vào bộ nhớ tạm (Clipboard)!");
  });
}

// Tự động kích hoạt tính toán khi tải trang
window.addEventListener("DOMContentLoaded", tinhVNDTrangWeb);

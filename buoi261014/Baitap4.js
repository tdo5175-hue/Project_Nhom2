/**
 * ==============================================================================
 * BÀI TẬP 4: LOGIC ĐĂNG NHẬP (MÔ PHỎNG)
 * Môn: Thiết Kế Web & Lập Trình JavaScript Cơ Bản (Buổi 14/10/2026)
 * Sinh viên / Nhóm: Nhóm 2 - Trường Đại học Lạc Hồng (LHU)
 * ==============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * Tạo 2 biến username và password cố định. Viết cấu trúc if kiểm tra nếu
 * người dùng nhập đúng cả 2 thì hiện "Đăng nhập thành công", nếu sai 1 trong 2
 * thì hiện "Thông tin không chính xác".
 * ==============================================================================
 */

// 1. Tạo 2 biến username và password cố định theo đúng yêu cầu đề bài
const USER_CORRECT = "admin";
const PASS_CORRECT = "123456";

/**
 * Hàm kiểm tra đăng nhập trên giao diện Web
 */
function kiemTraDangNhapTrangWeb() {
  const uInput = document.getElementById("inputUser");
  const pInput = document.getElementById("inputPass");
  const box = document.getElementById("resultBox");
  const valEle = document.getElementById("resultValue");
  const detailsEle = document.getElementById("resultDetails");
  const logEle = document.getElementById("liveLog");

  let u = uInput.value.trim();
  let p = pInput.value;

  // Kiểm tra trường hợp để trống
  if (u === "" || p === "") {
    box.className = "result-box";
    valEle.textContent = "Chờ nhập liệu...";
    detailsEle.textContent = "Vui lòng nhập cả Username và Password.";
    return;
  }

  // Cấu trúc if...else kiểm tra đồng thời cả 2 điều kiện bằng toán tử &&
  if (u === USER_CORRECT && p === PASS_CORRECT) {
    box.className = "result-box success";
    valEle.textContent = "Đăng nhập thành công";
    detailsEle.innerHTML = `
      • Trạng thái: Cả <code>username</code> và <code>password</code> đều khớp 100%.<br>
      • Chào mừng quản trị viên <strong>${u}</strong> quay trở lại hệ thống!
    `;
    let msg = `Đăng nhập thành công với tài khoản: ${u}`;
    logEle.textContent = msg;
    console.log(msg);
  } else {
    box.className = "result-box error";
    valEle.textContent = "Thông tin không chính xác";
    detailsEle.innerHTML = `
      • Lý do: Tên đăng nhập hoặc mật khẩu không đúng.<br>
      • Lưu ý an ninh: Hệ thống không tiết lộ trường nào bị sai nhằm phòng ngừa kẻ tấn công dò quét tài khoản (Brute Force).
    `;
    let msg = `Cảnh báo: Thông tin không chính xác! (user: ${u})`;
    logEle.textContent = msg;
    console.warn(msg);
  }
}

/**
 * Hàm chọn nhanh tài khoản test mẫu từ preset
 * @param {string} user - Tên đăng nhập
 * @param {string} pass - Mật khẩu
 */
function chonNhanh(user, pass) {
  document.getElementById("inputUser").value = user;
  document.getElementById("inputPass").value = pass;
  kiemTraDangNhapTrangWeb();
}

/**
 * Hàm thực thi bằng prompt() và alert() theo đúng chuẩn bài học
 */
function chayPrompt() {
  // Nhập username và password từ người dùng
  let u = prompt("BÀI 4: Nhập Username (Tài khoản mẫu: admin):");
  if (u === null) return;

  let p = prompt("BÀI 4: Nhập Password (Mật khẩu mẫu: 123456):");
  if (p === null) return;

  // Cấu trúc if kiểm tra:
  // Nếu đúng cả 2 -> Hiện "Đăng nhập thành công"
  // Nếu sai 1 trong 2 -> Hiện "Thông tin không chính xác"
  if (u === USER_CORRECT && p === PASS_CORRECT) {
    console.log("Đăng nhập thành công");
    alert("Đăng nhập thành công");
  } else {
    console.warn("Thông tin không chính xác");
    alert("Thông tin không chính xác");
  }

  // Đồng bộ lên trang web
  document.getElementById("inputUser").value = u;
  document.getElementById("inputPass").value = p;
  kiemTraDangNhapTrangWeb();
}

/**
 * Sao chép mã nguồn vào clipboard
 */
function saoChepCode() {
  const code = document.getElementById("codeText").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Đã sao chép mã nguồn Bài 4 vào bộ nhớ tạm!");
  });
}

// Tự động kiểm tra mẫu khi mở trang
window.addEventListener("DOMContentLoaded", kiemTraDangNhapTrangWeb);

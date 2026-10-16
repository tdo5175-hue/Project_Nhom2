/**
 * ==============================================================================
 * BÀI TẬP 2: KIỂM TRA SỐ CHẴN / SỐ LẺ
 * Môn: Thiết Kế Web & Lập Trình JavaScript Cơ Bản (Buổi 14/10/2026)
 * Sinh viên / Nhóm: Nhóm 2 - Trường Đại học Lạc Hồng (LHU)
 * ==============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * Nhập một số bất kỳ từ bàn phím. Thông báo cho người dùng biết đó là số chẵn
 * hay số lẻ.
 * ==============================================================================
 */

/**
 * Hàm kiểm tra số chẵn lẻ và hiển thị kết quả trên giao diện trang web
 */
function kiemTraSoTrangWeb() {
  const input = document.getElementById("inputNum");
  const box = document.getElementById("resultBox");
  const valEle = document.getElementById("resultValue");
  const detailsEle = document.getElementById("resultDetails");
  const logEle = document.getElementById("liveLog");

  let raw = input.value.trim();

  // Kiểm tra trường hợp để trống
  if (raw === "") {
    box.className = "result-box";
    valEle.textContent = "Chờ nhập liệu...";
    detailsEle.textContent = "Vui lòng nhập một số nguyên vào ô trên.";
    return;
  }

  // Ép kiểu chuỗi sang số
  let n = Number(raw);

  // Kiểm tra hợp lệ: Bắt buộc phải là số nguyên (Number.isInteger)
  if (isNaN(n) || !Number.isInteger(n)) {
    box.className = "result-box error";
    valEle.textContent = "Không phải số nguyên";
    detailsEle.innerHTML = `Giá trị <code>"${raw}"</code> không phải số nguyên hợp lệ (khái niệm chẵn/lẻ chỉ áp dụng cho số nguyên).`;
    logEle.textContent = `❌ Lỗi: "${raw}" không phải là số nguyên!`;
    return;
  }

  // Thuật toán kiểm tra số chẵn: n % 2 === 0
  let isEven = (n % 2 === 0);

  if (isEven) {
    box.className = "result-box even";
    valEle.textContent = "SỐ CHẴN";
    detailsEle.innerHTML = `
      • Giá trị kiểm tra: <strong>${n}</strong><br>
      • Biểu thức tính dư: <code>${n} % 2 = 0</code><br>
      • Kết luận: Số <strong>${n}</strong> chia hết cho 2 nên là <strong>SỐ CHẴN</strong>.
    `;
    let msg = `Số ${n} là SỐ CHẴN (vì ${n} % 2 = 0)`;
    logEle.textContent = msg;
    console.log(msg);
  } else {
    box.className = "result-box odd";
    valEle.textContent = "SỐ LẺ";
    detailsEle.innerHTML = `
      • Giá trị kiểm tra: <strong>${n}</strong><br>
      • Biểu thức tính dư: <code>${n} % 2 = ${n % 2}</code><br>
      • Kết luận: Số <strong>${n}</strong> không chia hết cho 2 nên là <strong>SỐ LẺ</strong>.
    `;
    let msg = `Số ${n} là SỐ LẺ (vì ${n} % 2 !== 0)`;
    logEle.textContent = msg;
    console.log(msg);
  }
}

/**
 * Hàm chọn nhanh giá trị mẫu từ preset
 * @param {number} so - Số nguyên mẫu
 */
function chonNhanh(so) {
  document.getElementById("inputNum").value = so;
  kiemTraSoTrangWeb();
}

/**
 * Hàm thực thi bằng prompt() và alert() theo đúng chuẩn bài học trên lớp
 */
function chayPrompt() {
  // Nhập một số từ bàn phím bằng prompt
  let raw = prompt("BÀI 2: Nhập một số nguyên bất kỳ từ bàn phím (Ví dụ: -4, 0, 15):");

  // Kiểm tra hủy bỏ
  if (raw === null) {
    console.log("-> Bạn đã hủy thao tác.");
    return;
  }

  // Chuyển chuỗi sang số
  let n = Number(raw.trim());

  // Kiểm tra hợp lệ
  if (raw.trim() === "" || isNaN(n) || !Number.isInteger(n)) {
    console.error("Lỗi: Dữ liệu nhập vào phải là một số nguyên!");
    alert("Lỗi: Vui lòng nhập một số nguyên hợp lệ!");
    return;
  }

  // Rẽ nhánh if...else kiểm tra chẵn / lẻ
  let ketLuan = "";
  if (n % 2 === 0) {
    ketLuan = `Số ${n} là SỐ CHẴN (vì ${n} chia hết cho 2).`;
  } else {
    ketLuan = `Số ${n} là SỐ LẺ (vì ${n} không chia hết cho 2).`;
  }

  // Xuất kết quả ra console và alert
  console.log(ketLuan);
  alert(ketLuan);

  // Đồng bộ lên trang web
  document.getElementById("inputNum").value = n;
  kiemTraSoTrangWeb();
}

/**
 * Sao chép mã nguồn vào clipboard
 */
function saoChepCode() {
  const code = document.getElementById("codeText").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Đã sao chép mã nguồn Bài 2 vào bộ nhớ tạm!");
  });
}

// Tự động kích hoạt kiểm tra khi tải trang
window.addEventListener("DOMContentLoaded", kiemTraSoTrangWeb);

/**
 * ==============================================================================
 * BÀI TẬP 6: PHÂN LOẠI TAM GIÁC (KIỂM TRA TAM GIÁC ĐỀU)
 * Môn: Thiết Kế Web & Lập Trình JavaScript Cơ Bản (Buổi 14/10/2026)
 * Sinh viên / Nhóm: Nhóm 2 - Trường Đại học Lạc Hồng (LHU)
 * ==============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * Nhập vào 3 cạnh của một tam giác. Kiểm tra xem đó có phải là tam giác đều không
 * (3 cạnh bằng nhau).
 * ==============================================================================
 */

/**
 * Hàm phân loại tam giác và hiển thị kết quả trên trang web
 */
function kiemTraTamGiacTrangWeb() {
  const aInput = document.getElementById("inputA");
  const bInput = document.getElementById("inputB");
  const cInput = document.getElementById("inputC");
  const box = document.getElementById("resultBox");
  const valEle = document.getElementById("resultValue");
  const detailsEle = document.getElementById("resultDetails");
  const logEle = document.getElementById("liveLog");

  let a = parseFloat(aInput.value);
  let b = parseFloat(bInput.value);
  let c = parseFloat(cInput.value);

  // Kiểm tra trường hợp ô nhập để trống hoặc chưa có dữ liệu hợp lệ
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    box.className = "result-box";
    valEle.textContent = "Chờ nhập liệu...";
    detailsEle.textContent = "Vui lòng nhập đầy đủ độ dài 3 cạnh a, b, c.";
    return;
  }

  // 1. Kiểm tra Bất Đẳng Thức Tam Giác (Điều kiện hình thành tam giác):
  // - Ba cạnh phải là số dương lớn hơn 0: a > 0 && b > 0 && c > 0
  // - Tổng hai cạnh bất kỳ luôn lớn hơn cạnh còn lại:
  //   (a + b > c) && (a + c > b) && (b + c > a)
  let laTamGiac = (a > 0 && b > 0 && c > 0) &&
                  (a + b > c) && (a + c > b) && (b + c > a);

  if (!laTamGiac) {
    box.className = "result-box invalid";
    valEle.textContent = "KHÔNG PHẢI TAM GIÁC";
    detailsEle.innerHTML = `
      • Ba cạnh <code>[${a}, ${b}, ${c}]</code> vi phạm bất đẳng thức tam giác.<br>
      • Nguyên tắc: Tổng 2 cạnh bất kỳ phải lớn hơn cạnh còn lại và cạnh phải &gt; 0.
    `;
    let msg = `[${a}, ${b}, ${c}] => KHÔNG PHẢI tam giác hợp lệ!`;
    logEle.textContent = msg;
    console.warn(msg);
    return;
  }

  // 2. Kiểm tra Tam Giác Đều:
  // Điều kiện: a === b && b === c (theo bắc cầu suy ra a === c)
  if (a === b && b === c) {
    box.className = "result-box equilateral";
    valEle.textContent = "TAM GIÁC ĐỀU";
    detailsEle.innerHTML = `
      • Cả 3 cạnh bằng nhau: <code>a = b = c = ${a}</code>.<br>
      • Ba góc trong tam giác này đều bằng 60°.<br>
      • Thỏa mãn bất đẳng thức tam giác: <code>${a} + ${a} > ${a}</code>.
    `;
    let msg = `[${a}, ${b}, ${c}] => TAM GIÁC ĐỀU`;
    logEle.textContent = msg;
    console.log(msg);
  } else {
    // Phân loại mở rộng nếu không phải tam giác đều
    let isCan = (a === b || b === c || a === c);
    let isVuong = (Math.abs(a*a + b*b - c*c) < 1e-4) ||
                  (Math.abs(a*a + c*c - b*b) < 1e-4) ||
                  (Math.abs(b*b + c*c - a*a) < 1e-4);

    let loaiTamGiac = "Tam giác thường";
    if (isCan && isVuong) loaiTamGiac = "Tam giác vuông cân";
    else if (isVuong) loaiTamGiac = "Tam giác vuông";
    else if (isCan) loaiTamGiac = "Tam giác cân";

    box.className = "result-box other";
    valEle.textContent = "KHÔNG PHẢI TAM GIÁC ĐỀU";
    detailsEle.innerHTML = `
      • Ba cạnh không đồng thời bằng nhau (<code>a=${a}, b=${b}, c=${c}</code>).<br>
      • Phân loại cụ thể: Ba cạnh này tạo thành <strong>${loaiTamGiac}</strong>.
    `;
    let msg = `[${a}, ${b}, ${c}] => KHÔNG PHẢI tam giác đều (Là ${loaiTamGiac})`;
    logEle.textContent = msg;
    console.log(msg);
  }
}

/**
 * Hàm chọn nhanh bộ 3 cạnh mẫu từ preset
 * @param {number} a - Cạnh a
 * @param {number} b - Cạnh b
 * @param {number} c - Cạnh c
 */
function chonNhanh(a, b, c) {
  document.getElementById("inputA").value = a;
  document.getElementById("inputB").value = b;
  document.getElementById("inputC").value = c;
  kiemTraTamGiacTrangWeb();
}

/**
 * Hàm thực thi bằng prompt() và alert() theo đúng chuẩn bài học
 */
function chayPrompt() {
  let aStr = prompt("BÀI 6: Nhập độ dài cạnh thứ nhất (a):");
  if (aStr === null) return;
  let bStr = prompt("BÀI 6: Nhập độ dài cạnh thứ hai (b):");
  if (bStr === null) return;
  let cStr = prompt("BÀI 6: Nhập độ dài cạnh thứ ba (c):");
  if (cStr === null) return;

  let a = parseFloat(aStr);
  let b = parseFloat(bStr);
  let c = parseFloat(cStr);

  // Kiểm tra tính hợp lệ cơ bản
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    console.error("Lỗi: Tất cả 3 cạnh phải là số!");
    alert("Lỗi: Vui lòng nhập số hợp lệ cho cả 3 cạnh!");
    return;
  }

  // Kiểm tra bất đẳng thức tam giác
  let laTamGiac = (a > 0 && b > 0 && c > 0) &&
                  (a + b > c) && (a + c > b) && (b + c > a);

  if (!laTamGiac) {
    console.warn(`Ba cạnh (${a}, ${b}, ${c}) không tạo thành tam giác!`);
    alert(`Ba cạnh (${a}, ${b}, ${c}) KHÔNG tạo thành một tam giác hợp lệ!`);
  } else if (a === b && b === c) {
    // 3 cạnh bằng nhau: Tam giác đều
    console.log(`Tam giác đều: a = b = c = ${a}`);
    alert(`=> Đây là TAM GIÁC ĐỀU (vì 3 cạnh bằng nhau: a = b = c = ${a}).`);
  } else {
    // Không phải tam giác đều
    console.log(`Không phải tam giác đều: a=${a}, b=${b}, c=${c}`);
    alert("=> Đây KHÔNG PHẢI là tam giác đều.");
  }

  // Đồng bộ lên trang web
  document.getElementById("inputA").value = a;
  document.getElementById("inputB").value = b;
  document.getElementById("inputC").value = c;
  kiemTraTamGiacTrangWeb();
}

/**
 * Sao chép mã nguồn vào clipboard
 */
function saoChepCode() {
  const code = document.getElementById("codeText").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Đã sao chép mã nguồn Bài 6 vào bộ nhớ tạm!");
  });
}

// Tự động kiểm tra mẫu khi mở trang
window.addEventListener("DOMContentLoaded", kiemTraTamGiacTrangWeb);

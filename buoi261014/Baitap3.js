/**
 * ==============================================================================
 * BÀI TẬP 3: TÍNH CHỈ SỐ BMI CƠ BẢN
 * Môn: Thiết Kế Web & Lập Trình JavaScript Cơ Bản (Buổi 14/10/2026)
 * Sinh viên / Nhóm: Nhóm 2 - Trường Đại học Lạc Hồng (LHU)
 * ==============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * Nhập chiều cao (m) và cân nặng (kg). Tính BMI = cân nặng / (chiều cao * chiều cao)
 * và in ra kết quả.
 * ==============================================================================
 */

/**
 * Hàm tính chỉ số BMI và xếp loại thể trạng trên giao diện Web
 */
function tinhBMITrangWeb() {
  const hInput = document.getElementById("inputHeight");
  const wInput = document.getElementById("inputWeight");
  const box = document.getElementById("resultBox");
  const valEle = document.getElementById("resultValue");
  const detailsEle = document.getElementById("resultDetails");
  const logEle = document.getElementById("liveLog");

  let h = parseFloat(hInput.value);
  let w = parseFloat(wInput.value);

  // Kiểm tra trường hợp ô nhập chưa có dữ liệu hợp lệ
  if (isNaN(h) || h <= 0 || isNaN(w) || w <= 0) {
    box.className = "result-box";
    valEle.textContent = "Chờ nhập liệu...";
    detailsEle.textContent = "Vui lòng nhập chiều cao (m) và cân nặng (kg) hợp lệ.";
    return;
  }

  // Hỗ trợ tự động nếu người dùng nhập nhầm theo cm (ví dụ: 170cm)
  if (h > 30) {
    h = h / 100;
    hInput.value = h.toFixed(2);
  }

  // Công thức tính BMI = Cân nặng / (Chiều cao * Chiều cao)
  let bmi = w / (h * h);
  let phanLoai = "";
  let advice = "";

  // Phân loại thể trạng theo chuẩn y khoa (WHO)
  if (bmi < 18.5) {
    box.className = "result-box warning";
    phanLoai = "Gầy (Thiếu cân)";
    advice = "Cần tăng cường chế độ ăn uống giàu đạm và dinh dưỡng.";
  } else if (bmi < 24.9) {
    box.className = "result-box normal";
    phanLoai = "Bình thường (Thân hình cân đối)";
    advice = "Hãy duy trì chế độ dinh dưỡng và lối sống lành mạnh này!";
  } else if (bmi < 29.9) {
    box.className = "result-box warning";
    phanLoai = "Thừa cân (Tiền béo phì)";
    advice = "Nên tăng cường tập luyện thể dục và hạn chế đồ ngọt, dầu mỡ.";
  } else {
    box.className = "result-box danger";
    phanLoai = "Béo phì";
    advice = "Cần có kế hoạch giảm cân khoa học và tham vấn chuyên gia dinh dưỡng.";
  }

  // Cập nhật kết quả lên giao diện
  valEle.textContent = `BMI: ${bmi.toFixed(2)}`;
  detailsEle.innerHTML = `
    • Đánh giá thể trạng: <strong>${phanLoai}</strong><br>
    • Công thức: <code>${w} kg / (${h} m)² = ${bmi.toFixed(2)}</code><br>
    • Lời khuyên: ${advice}
  `;

  // Ghi log
  let msg = `Chiều cao: ${h}m | Cân nặng: ${w}kg => BMI: ${bmi.toFixed(2)} (${phanLoai})`;
  logEle.textContent = msg;
  console.log(msg);
}

/**
 * Hàm chọn nhanh giá trị mẫu từ preset
 * @param {number} h - Chiều cao (m)
 * @param {number} w - Cân nặng (kg)
 */
function chonNhanh(h, w) {
  document.getElementById("inputHeight").value = h;
  document.getElementById("inputWeight").value = w;
  tinhBMITrangWeb();
}

/**
 * Hàm thực thi bằng prompt() và alert() theo đúng chuẩn bài học
 */
function chayPrompt() {
  let hStr = prompt("BÀI 3: Nhập chiều cao tính theo MÉT (Ví dụ: 1.70):");
  if (hStr === null) return;

  let wStr = prompt("BÀI 3: Nhập cân nặng tính theo KG (Ví dụ: 65):");
  if (wStr === null) return;

  let h = parseFloat(hStr);
  let w = parseFloat(wStr);

  // Tự động chuyển cm sang mét nếu nhập > 30
  if (h > 30) h = h / 100;

  // Kiểm tra tính hợp lệ
  if (isNaN(h) || h <= 0 || isNaN(w) || w <= 0) {
    console.error("Lỗi: Chiều cao và cân nặng phải là số dương lớn hơn 0!");
    alert("Lỗi: Chiều cao và cân nặng phải là số dương lớn hơn 0!");
    return;
  }

  // Tính BMI
  let bmi = w / (h * h);
  let phanLoai = "";
  if (bmi < 18.5) phanLoai = "Gầy (Thiếu cân)";
  else if (bmi < 24.9) phanLoai = "Bình thường (Cân đối)";
  else if (bmi < 29.9) phanLoai = "Thừa cân (Tiền béo phì)";
  else phanLoai = "Béo phì";

  let msg = `Chỉ số BMI: ${bmi.toFixed(2)}\nThể trạng: ${phanLoai}`;
  console.log(msg);
  alert(msg);

  // Đồng bộ lên trang web
  document.getElementById("inputHeight").value = h;
  document.getElementById("inputWeight").value = w;
  tinhBMITrangWeb();
}

/**
 * Sao chép mã nguồn vào clipboard
 */
function saoChepCode() {
  const code = document.getElementById("codeText").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Đã sao chép mã nguồn Bài 3 vào bộ nhớ tạm!");
  });
}

// Tự động tính toán khi mở trang
window.addEventListener("DOMContentLoaded", tinhBMITrangWeb);

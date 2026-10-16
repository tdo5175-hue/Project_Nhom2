/**
 * ==============================================================================
 * BÀI TẬP TỰ RÈN LUYỆN TẠI NHÀ (HOMEWORK) - JAVASCRIPT CƠ BẢN
 * Môn học: Thiết Kế Web / Lập Trình Web Cơ Bản
 * Đơn vị: Trường Đại học Lạc Hồng (LHU) - Nhóm 2 (Buổi 14/10/2026)
 * ==============================================================================
 * Tài liệu này bao gồm toàn bộ lời giải chi tiết của 6 bài tập:
 * - Bài 1: Chuyển đổi tiền tệ đơn giản (USD -> VND)
 * - Bài 2: Kiểm tra số chẵn / số lẻ
 * - Bài 3: Tính chỉ số BMI cơ bản
 * - Bài 4: Logic Đăng nhập mô phỏng
 * - Bài 5: Máy tính giảm giá (Discount Calculator)
 * - Bài 6: Phân loại tam giác (Kiểm tra tam giác đều)
 * ==============================================================================
 */

// ==============================================================================
// 1. PHƯƠNG THỨC TIỆN ÍCH HỖ TRỢ LOGGER
// ==============================================================================
/**
 * Ghi log đồng thời ra DevTools Console và Màn hình Live Console trên trang web
 * @param {string} message - Nội dung cần log
 * @param {string} type - Loại log: 'info' | 'success' | 'warn' | 'error'
 */
function logToScreen(message, type = "info") {
    console.log(message);
    const liveBox = document.getElementById("liveConsoleContent");
    if (liveBox) {
        const time = new Date().toLocaleTimeString("vi-VN");
        const div = document.createElement("div");
        div.className = `log-line log-${type}`;
        div.innerHTML = `<span class="log-time">[${time}]</span> ${message}`;
        liveBox.appendChild(div);
        liveBox.scrollTop = liveBox.scrollHeight;
    }
}


// ==============================================================================
// BÀI 1: CHUYỂN ĐỔI TIỀN TỆ ĐƠN GIẢN (USD -> VND)
// ==============================================================================
/**
 * ĐỀ BÀI:
 * Viết mã JS cho phép nhập số lượng USD và tính ra số tiền VND tương ứng
 * (giả sử tỉ giá 25.000). Kết quả hiện ra console.
 * 
 * PHÂN TÍCH LOGIC CHI TIẾT:
 * 1. Khai báo hằng số tỉ giá: const TY_GIA = 25000 (Dùng const vì giá trị này không đổi).
 * 2. Đầu vào: Nhập số tiền USD.
 *    - Nếu từ prompt(): Cần dùng parseFloat() để chuyển từ String sang Number.
 * 3. Kiểm tra tính hợp lệ (Validation):
 *    - Người dùng bấm Hủy -> Dừng thực thi.
 *    - Dữ liệu không phải số (isNaN) hoặc < 0 -> Báo lỗi vì tiền tệ không thể âm.
 * 4. Công thức tính toán: soTienVND = soTienUSD * TY_GIA.
 * 5. Đầu ra: In kết quả ra console và định dạng số bằng toLocaleString("vi-VN").
 */

// --- Cách 1: Chạy bằng Prompt / Alert truyền thống theo đúng yêu cầu đề bài ---
function bai1_Prompt() {
    logToScreen("--- BÀI 1: CHUYỂN ĐỔI TIỀN TỆ USD SANG VND ---", "info");

    const TY_GIA = 25000; // 1 USD = 25.000 VND
    let inputUSD = prompt("BÀI 1: Nhập số lượng USD cần đổi sang VND (Ví dụ: 100):");

    // Kiểm tra người dùng nhấn Hủy
    if (inputUSD === null) {
        logToScreen("BÀI 1: Người dùng đã hủy thao tác.", "warn");
        return;
    }

    // Ép kiểu chuỗi sang số thực
    let soTienUSD = parseFloat(inputUSD);

    // Kiểm tra tính hợp lệ
    if (isNaN(soTienUSD) || soTienUSD < 0) {
        let err = "Lỗi: Số tiền USD nhập vào không hợp lệ hoặc bị âm!";
        logToScreen(err, "error");
        alert(err);
        return;
    }

    // Tính toán
    let soTienVND = soTienUSD * TY_GIA;

    // Xuất kết quả
    let ketQuaLog = `Chuyển đổi thành công: $${soTienUSD.toLocaleString("en-US")} USD = ${soTienVND.toLocaleString("vi-VN")} VNĐ (Tỉ giá: 25.000)`;
    logToScreen(ketQuaLog, "success");
    alert(ketQuaLog);

    // Cập nhật kết quả lên giao diện UI nếu có
    const uiInput = document.getElementById("b1_input_usd");
    if (uiInput) uiInput.value = soTienUSD;
    bai1_TinhUI();
}

// --- Cách 2: Chạy trực tiếp từ Form Giao Diện Web ---
function bai1_TinhUI() {
    const TY_GIA = 25000;
    const inputEle = document.getElementById("b1_input_usd");
    const resultBox = document.getElementById("b1_result");
    if (!inputEle || !resultBox) return;

    let val = inputEle.value.trim();
    if (val === "") {
        resultBox.className = "result-display status-waiting";
        resultBox.innerHTML = `Vui lòng nhập số tiền USD vào ô trên rồi bấm nút Tính toán.`;
        return;
    }

    let usd = parseFloat(val);
    if (isNaN(usd) || usd < 0) {
        resultBox.className = "result-display status-error";
        resultBox.innerHTML = `<strong>Lỗi:</strong> Vui lòng nhập số tiền USD dương hợp lệ!`;
        logToScreen(`[Bài 1] Dữ liệu không hợp lệ: "${val}"`, "error");
        return;
    }

    let vnd = usd * TY_GIA;
    resultBox.className = "result-display status-success";
    resultBox.innerHTML = `
        <div class="result-highlight">${vnd.toLocaleString("vi-VN")} VNĐ</div>
        <div class="result-subinfo">
            • Số USD nhập: <strong>$${usd.toLocaleString("en-US")}</strong><br>
            • Tỉ giá cố định: <strong>1 USD = 25.000 VNĐ</strong><br>
            • Phép toán: <code>${usd} × 25.000 = ${vnd}</code>
        </div>
    `;
    logToScreen(`[Bài 1 UI] ${usd.toLocaleString("en-US")} USD = ${vnd.toLocaleString("vi-VN")} VNĐ`, "success");
}


// ==============================================================================
// BÀI 2: KIỂM TRA SỐ CHẴN / SỐ LẺ
// ==============================================================================
/**
 * ĐỀ BÀI:
 * Nhập một số bất kỳ từ bàn phím. Thông báo cho người dùng biết đó là số chẵn
 * hay số lẻ.
 * 
 * PHÂN TÍCH LOGIC CHI TIẾT:
 * 1. Đầu vào: Nhập một số nguyên n từ bàn phím.
 * 2. Kiểm tra tính hợp lệ:
 *    - Trong toán học, khái niệm số chẵn / số lẻ chỉ áp dụng cho TẬP HỢP SỐ NGUYÊN.
 *    - Do đó, cần kiểm tra: Không được để trống, phải là số hợp lệ, và Number.isInteger(n) === true.
 * 3. Thuật toán phân loại:
 *    - Toán tử chia lấy phần dư (%): n % 2.
 *    - Nếu n % 2 === 0: Là SỐ CHẴN (chia hết cho 2).
 *    - Ngược lại n % 2 !== 0: Là SỐ LẺ (không chia hết cho 2).
 *    * Điểm sáng tạo: Xử lý đúng cả số 0 (số chẵn) và các số âm nguyên như -2, -4 (chẵn), -3, -5 (lẻ).
 */

// --- Cách 1: Chạy bằng Prompt / Alert ---
function bai2_Prompt() {
    logToScreen("--- BÀI 2: KIỂM TRA SỐ CHẴN / SỐ LẺ ---", "info");

    let inputVal = prompt("BÀI 2: Nhập một số nguyên bất kỳ (Ví dụ: -6, 0, 15):");
    if (inputVal === null) {
        logToScreen("BÀI 2: Người dùng đã hủy thao tác.", "warn");
        return;
    }

    let n = Number(inputVal.trim());
    if (inputVal.trim() === "" || isNaN(n) || !Number.isInteger(n)) {
        let err = "Lỗi: Giá trị nhập vào phải là một số nguyên (không chứa chữ hoặc phần thập phân)!";
        logToScreen(err, "error");
        alert(err);
        return;
    }

    let ketLuan = (n % 2 === 0) ? `Số ${n} là SỐ CHẴN.` : `Số ${n} là SỐ LẺ.`;
    logToScreen(`BÀI 2: ${ketLuan}`, "success");
    alert(ketLuan);

    const uiInput = document.getElementById("b2_input_num");
    if (uiInput) uiInput.value = n;
    bai2_TinhUI();
}

// --- Cách 2: Chạy trực tiếp từ Form Giao Diện Web ---
function bai2_TinhUI() {
    const inputEle = document.getElementById("b2_input_num");
    const resultBox = document.getElementById("b2_result");
    if (!inputEle || !resultBox) return;

    let raw = inputEle.value.trim();
    if (raw === "") {
        resultBox.className = "result-display status-waiting";
        resultBox.innerHTML = `Vui lòng nhập một số nguyên rồi bấm nút Kiểm tra.`;
        return;
    }

    let n = Number(raw);
    if (isNaN(n) || !Number.isInteger(n)) {
        resultBox.className = "result-display status-error";
        resultBox.innerHTML = `<strong>Lỗi:</strong> "${raw}" không phải là số nguyên hợp lệ! (Chẵn/lẻ chỉ áp dụng cho số nguyên)`;
        logToScreen(`[Bài 2] Lỗi nhập liệu không phải số nguyên: "${raw}"`, "error");
        return;
    }

    let isEven = (n % 2 === 0);
    resultBox.className = isEven ? "result-display status-success" : "result-display status-warning";
    resultBox.innerHTML = `
        <div class="result-highlight">${isEven ? "SỐ CHẴN" : "SỐ LẺ"}</div>
        <div class="result-subinfo">
            • Giá trị kiểm tra: <strong>${n}</strong><br>
            • Biểu thức kiểm tra: <code>${n} % 2 = ${n % 2}</code><br>
            • Kết luận: Số <strong>${n}</strong> ${isEven ? "chia hết cho 2" : "không chia hết cho 2"} nên là <strong>${isEven ? "SỐ CHẴN" : "SỐ LẺ"}</strong>.
        </div>
    `;
    logToScreen(`[Bài 2 UI] Số ${n} là ${isEven ? "SỐ CHẴN" : "SỐ LẺ"}`, "success");
}


// ==============================================================================
// BÀI 3: TÍNH CHỈ SỐ BMI CƠ BẢN
// ==============================================================================
/**
 * ĐỀ BÀI:
 * Nhập chiều cao (m) và cân nặng (kg). Tính BMI = cân nặng / (chiều cao * chiều cao)
 * và in ra kết quả.
 * 
 * PHÂN TÍCH LOGIC CHI TIẾT:
 * 1. Đầu vào:
 *    - Chiều cao h (đơn vị: mét), ví dụ: 1.70
 *    - Cân nặng w (đơn vị: kg), ví dụ: 65
 * 2. Kiểm tra tính hợp lệ:
 *    - Chiều cao và cân nặng bắt buộc phải là số thực dương (h > 0 && w > 0).
 *    - Tránh lỗi chia cho 0 và người dùng nhập nhầm cm thay vì mét.
 * 3. Công thức: BMI = w / (h * h)
 * 4. Phân loại chuẩn Y khoa (WHO & Tiêu chuẩn Châu Á):
 *    - BMI < 18.5: Gầy (Thiếu cân)
 *    - 18.5 <= BMI < 24.9: Bình thường (Cân đối)
 *    - 25 <= BMI < 29.9: Thừa cân (Tiền béo phì)
 *    - BMI >= 30: Béo phì
 */

// --- Cách 1: Chạy bằng Prompt / Alert ---
function bai3_Prompt() {
    logToScreen("--- BÀI 3: TÍNH CHỈ SỐ BMI CƠ BẢN ---", "info");

    let hStr = prompt("BÀI 3: Nhập chiều cao tính theo MÉT (Ví dụ: 1.70):");
    if (hStr === null) return;

    let wStr = prompt("BÀI 3: Nhập cân nặng tính theo KG (Ví dụ: 65):");
    if (wStr === null) return;

    let h = parseFloat(hStr);
    let w = parseFloat(wStr);

    // Hỗ trợ tự động nếu người dùng nhập cm (ví dụ 170cm)
    if (h > 30) {
        h = h / 100;
    }

    if (isNaN(h) || h <= 0 || isNaN(w) || w <= 0) {
        let err = "Lỗi: Chiều cao và cân nặng phải là các số dương lớn hơn 0!";
        logToScreen(err, "error");
        alert(err);
        return;
    }

    let bmi = w / (h * h);
    let phanLoai = "";
    if (bmi < 18.5) phanLoai = "Gầy (Thiếu cân)";
    else if (bmi < 24.9) phanLoai = "Bình thường (Cân đối)";
    else if (bmi < 29.9) phanLoai = "Thừa cân (Tiền béo phì)";
    else phanLoai = "Béo phì";

    let msg = `Chỉ số BMI của bạn là: ${bmi.toFixed(2)} - Tình trạng: ${phanLoai}`;
    logToScreen(`BÀI 3: Chiều cao=${h}m, Cân nặng=${w}kg => BMI=${bmi.toFixed(2)} (${phanLoai})`, "success");
    alert(msg);

    const uiH = document.getElementById("b3_input_h");
    const uiW = document.getElementById("b3_input_w");
    if (uiH) uiH.value = h;
    if (uiW) uiW.value = w;
    bai3_TinhUI();
}

// --- Cách 2: Chạy trực tiếp từ Form Giao Diện Web ---
function bai3_TinhUI() {
    const uiH = document.getElementById("b3_input_h");
    const uiW = document.getElementById("b3_input_w");
    const resultBox = document.getElementById("b3_result");
    if (!uiH || !uiW || !resultBox) return;

    let h = parseFloat(uiH.value);
    let w = parseFloat(uiW.value);

    if (isNaN(h) || h <= 0 || isNaN(w) || w <= 0) {
        resultBox.className = "result-display status-waiting";
        resultBox.innerHTML = `Vui lòng nhập chiều cao (m) và cân nặng (kg) hợp lệ lớn hơn 0.`;
        return;
    }

    // Nếu người dùng nhập nhầm cm (ví dụ 165), cảnh báo và hỗ trợ
    if (h > 30) {
        h = h / 100;
        uiH.value = h.toFixed(2);
    }

    let bmi = w / (h * h);
    let phanLoai = "";
    let statusClass = "status-success";

    if (bmi < 18.5) {
        phanLoai = "Thiếu cân (Gầy) - Cần bồi bổ thêm dinh dưỡng";
        statusClass = "status-warning";
    } else if (bmi < 24.9) {
        phanLoai = "Bình thường (Thân hình cân đối) - Hãy tiếp tục duy trì";
        statusClass = "status-success";
    } else if (bmi < 29.9) {
        phanLoai = "Thừa cân (Tiền béo phì) - Cần chú ý tập luyện thể thao";
        statusClass = "status-warning";
    } else {
        phanLoai = "Béo phì - Cần có kế hoạch kiểm soát cân nặng";
        statusClass = "status-error";
    }

    resultBox.className = `result-display ${statusClass}`;
    resultBox.innerHTML = `
        <div class="result-highlight">BMI: ${bmi.toFixed(2)}</div>
        <div class="result-subinfo">
            • Đánh giá thể trạng: <strong>${phanLoai}</strong><br>
            • Công thức: <code>${w} kg / (${h} m)² = ${bmi.toFixed(2)}</code>
        </div>
    `;
    logToScreen(`[Bài 3 UI] BMI = ${bmi.toFixed(2)} (${phanLoai})`, "success");
}


// ==============================================================================
// BÀI 4: LOGIC ĐĂNG NHẬP (MÔ PHỎNG)
// ==============================================================================
/**
 * ĐỀ BÀI:
 * Tạo 2 biến username và password cố định. Viết cấu trúc if kiểm tra nếu
 * người dùng nhập đúng cả 2 thì hiện "Đăng nhập thành công", nếu sai 1 trong 2
 * thì hiện "Thông tin không chính xác".
 * 
 * PHÂN TÍCH LOGIC CHI TIẾT:
 * 1. Khai báo tài khoản mẫu:
 *    const USER_CORRECT = "admin";
 *    const PASS_CORRECT = "123456";
 * 2. Sử dụng cấu trúc rẽ nhánh if...else:
 *    - Điều kiện kết hợp VÀ (&&):
 *      if (inputUser === USER_CORRECT && inputPass === PASS_CORRECT)
 *      -> Cả 2 đều đúng: Xuất "Đăng nhập thành công"
 *      -> Sai 1 trong 2 hoặc sai cả 2: Xuất "Thông tin không chính xác"
 * 3. Điểm nhấn bảo mật: Thông báo chung khi sai để ngăn chặn kẻ tấn công dò tìm tài khoản.
 */

// --- Cách 1: Chạy bằng Prompt / Alert ---
function bai4_Prompt() {
    logToScreen("--- BÀI 4: LOGIC ĐĂNG NHẬP MÔ PHỎNG ---", "info");

    const USER_CORRECT = "admin";
    const PASS_CORRECT = "123456";

    let inputUser = prompt("BÀI 4: Nhập tên đăng nhập (Mẫu: admin):");
    if (inputUser === null) return;

    let inputPass = prompt("BÀI 4: Nhập mật khẩu (Mẫu: 123456):");
    if (inputPass === null) return;

    if (inputUser === USER_CORRECT && inputPass === PASS_CORRECT) {
        logToScreen("BÀI 4: Đăng nhập thành công!", "success");
        alert("Đăng nhập thành công");
    } else {
        logToScreen("BÀI 4: Thông tin không chính xác!", "warn");
        alert("Thông tin không chính xác");
    }

    const uiUser = document.getElementById("b4_input_user");
    const uiPass = document.getElementById("b4_input_pass");
    if (uiUser) uiUser.value = inputUser;
    if (uiPass) uiPass.value = inputPass;
    bai4_TinhUI();
}

// --- Cách 2: Chạy trực tiếp từ Form Giao Diện Web ---
function bai4_TinhUI() {
    const USER_CORRECT = "admin";
    const PASS_CORRECT = "123456";

    const uiUser = document.getElementById("b4_input_user");
    const uiPass = document.getElementById("b4_input_pass");
    const resultBox = document.getElementById("b4_result");
    if (!uiUser || !uiPass || !resultBox) return;

    let u = uiUser.value.trim();
    let p = uiPass.value;

    if (u === "" || p === "") {
        resultBox.className = "result-display status-waiting";
        resultBox.innerHTML = `Vui lòng nhập đầy đủ Username và Mật khẩu.`;
        return;
    }

    if (u === USER_CORRECT && p === PASS_CORRECT) {
        resultBox.className = "result-display status-success";
        resultBox.innerHTML = `
            <div class="result-highlight">Đăng nhập thành công!</div>
            <div class="result-subinfo">
                • Trạng thái: Xác thực danh tính chính xác 100%.<br>
                • Chào mừng quản trị viên <strong>${u}</strong> đã trở lại hệ thống.
            </div>
        `;
        logToScreen(`[Bài 4 UI] Đăng nhập thành công với tài khoản: ${u}`, "success");
    } else {
        resultBox.className = "result-display status-error";
        resultBox.innerHTML = `
            <div class="result-highlight" style="color: #dc2626;">Thông tin không chính xác</div>
            <div class="result-subinfo">
                • Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.<br>
                • Tài khoản mẫu hợp lệ: <code>admin</code> / Mật khẩu: <code>123456</code>.
            </div>
        `;
        logToScreen(`[Bài 4 UI] Đăng nhập thất bại: Tài khoản hoặc mật khẩu không khớp`, "warn");
    }
}


// ==============================================================================
// BÀI 5: MÁY TÍNH GIẢM GIÁ (DISCOUNT CALCULATOR)
// ==============================================================================
/**
 * ĐỀ BÀI:
 * Nhập số tiền hóa đơn. Nếu số tiền > 500.000đ thì giảm giá 10%, ngược lại
 * không giảm. Tính số tiền cuối cùng phải trả.
 * 
 * PHÂN TÍCH LOGIC CHI TIẾT:
 * 1. Khai báo hằng số nghiệp vụ:
 *    - const NGUONG_GIAM = 500000;
 *    - const PHAN_TRAM_GIAM = 0.10; (10%)
 * 2. Cấu trúc điều kiện if...else:
 *    - Nếu tongTien > 500.000:
 *      tienGiam = tongTien * 0.1;
 *    - Ngược lại:
 *      tienGiam = 0;
 * 3. Tính tiền thực trả:
 *    tienPhaiTra = tongTien - tienGiam;
 */

// --- Cách 1: Chạy bằng Prompt / Alert ---
function bai5_Prompt() {
    logToScreen("--- BÀI 5: MÁY TÍNH GIẢM GIÁ (DISCOUNT CALCULATOR) ---", "info");

    const NGUONG_GIAM = 500000;
    const PHAN_TRAM_GIAM = 0.10;

    let inputAmount = prompt("BÀI 5: Nhập tổng số tiền hóa đơn (VNĐ):");
    if (inputAmount === null) return;

    let tongTien = parseFloat(inputAmount);
    if (isNaN(tongTien) || tongTien < 0) {
        let err = "Lỗi: Số tiền hóa đơn không hợp lệ hoặc bị âm!";
        logToScreen(err, "error");
        alert(err);
        return;
    }

    let tienGiam = 0;
    let rate = 0;

    if (tongTien > NGUONG_GIAM) {
        rate = 10;
        tienGiam = tongTien * PHAN_TRAM_GIAM;
    }

    let tienPhaiTra = tongTien - tienGiam;

    let logMsg = `Hóa đơn: ${tongTien.toLocaleString("vi-VN")}đ | Giảm: ${rate}% (-${tienGiam.toLocaleString("vi-VN")}đ) => Thực trả: ${tienPhaiTra.toLocaleString("vi-VN")}đ`;
    logToScreen(logMsg, "success");
    alert(`CHI TIẾT THANH TOÁN:\n• Tiền gốc: ${tongTien.toLocaleString("vi-VN")} VNĐ\n• Giảm giá: ${rate}% (-${tienGiam.toLocaleString("vi-VN")} VNĐ)\n• Số tiền cuối cùng phải trả: ${tienPhaiTra.toLocaleString("vi-VN")} VNĐ`);

    const uiAmount = document.getElementById("b5_input_amount");
    if (uiAmount) uiAmount.value = tongTien;
    bai5_TinhUI();
}

// --- Cách 2: Chạy trực tiếp từ Form Giao Diện Web ---
function bai5_TinhUI() {
    const NGUONG_GIAM = 500000;
    const PHAN_TRAM_GIAM = 0.10;

    const uiAmount = document.getElementById("b5_input_amount");
    const resultBox = document.getElementById("b5_result");
    if (!uiAmount || !resultBox) return;

    let val = uiAmount.value.trim();
    if (val === "") {
        resultBox.className = "result-display status-waiting";
        resultBox.innerHTML = `Vui lòng nhập số tiền hóa đơn rồi bấm Tính toán.`;
        return;
    }

    let tongTien = parseFloat(val);
    if (isNaN(tongTien) || tongTien < 0) {
        resultBox.className = "result-display status-error";
        resultBox.innerHTML = `<strong>Lỗi:</strong> Số tiền hóa đơn không hợp lệ!`;
        logToScreen(`[Bài 5] Nhập số tiền hóa đơn sai: "${val}"`, "error");
        return;
    }

    let tienGiam = 0;
    let phanTram = 0;

    if (tongTien > NGUONG_GIAM) {
        phanTram = 10;
        tienGiam = tongTien * PHAN_TRAM_GIAM;
    }

    let tienPhaiTra = tongTien - tienGiam;

    resultBox.className = "result-display status-success";
    resultBox.innerHTML = `
        <div class="result-highlight">${tienPhaiTra.toLocaleString("vi-VN")} VNĐ</div>
        <div class="result-subinfo">
            • Hóa đơn gốc: <strong>${tongTien.toLocaleString("vi-VN")} VNĐ</strong><br>
            • Ưu đãi giảm giá: <strong>${phanTram}%</strong> (${phanTram > 0 ? `Tiết kiệm -${tienGiam.toLocaleString("vi-VN")} VNĐ` : "Không đủ điều kiện > 500.000đ"})<br>
            • Số tiền thanh toán: <strong>${tienPhaiTra.toLocaleString("vi-VN")} VNĐ</strong>
        </div>
    `;
    logToScreen(`[Bài 5 UI] Hóa đơn: ${tongTien.toLocaleString("vi-VN")}đ, Giảm: ${phanTram}%, Phải trả: ${tienPhaiTra.toLocaleString("vi-VN")}đ`, "success");
}

function bai5_GanMau(soTien) {
    const uiAmount = document.getElementById("b5_input_amount");
    if (uiAmount) {
        uiAmount.value = soTien;
        bai5_TinhUI();
    }
}


// ==============================================================================
// BÀI 6: PHÂN LOẠI TAM GIÁC (KIỂM TRA TAM GIÁC ĐỀU)
// ==============================================================================
/**
 * ĐỀ BÀI:
 * Nhập vào 3 cạnh của một tam giác. Kiểm tra xem đó có phải là tam giác đều không
 * (3 cạnh bằng nhau).
 * 
 * PHÂN TÍCH LOGIC CHI TIẾT:
 * 1. Điều kiện tồn tại của tam giác (Bất đẳng thức tam giác):
 *    - 3 cạnh phải là số thực dương: a > 0 && b > 0 && c > 0
 *    - Tổng 2 cạnh bất kỳ phải luôn lớn hơn cạnh còn lại:
 *      (a + b > c) && (a + c > b) && (b + c > a)
 *    * Nếu không thỏa mãn: Kết luận KHÔNG PHẢI TAM GIÁC HỢP LỆ.
 * 2. Điều kiện Tam giác đều:
 *    - 3 cạnh bằng nhau: a === b && b === c (theo bắc cầu suy ra a === c).
 * 3. Mở rộng thông minh: Nếu không phải tam giác đều, xác định tiếp:
 *    - Tam giác cân (có 2 cạnh bằng nhau: a === b || b === c || a === c)
 *    - Tam giác vuông (Pytago: a² + b² = c² hoặc b² + c² = a² hoặc a² + c² = b²)
 *    - Tam giác thường.
 */

// --- Cách 1: Chạy bằng Prompt / Alert ---
function bai6_Prompt() {
    logToScreen("--- BÀI 6: PHÂN LOẠI TAM GIÁC ĐỀU ---", "info");

    let aStr = prompt("BÀI 6: Nhập độ dài cạnh thứ nhất (a):");
    if (aStr === null) return;
    let bStr = prompt("BÀI 6: Nhập độ dài cạnh thứ hai (b):");
    if (bStr === null) return;
    let cStr = prompt("BÀI 6: Nhập độ dài cạnh thứ ba (c):");
    if (cStr === null) return;

    let a = parseFloat(aStr);
    let b = parseFloat(bStr);
    let c = parseFloat(cStr);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        let err = "Lỗi: Tất cả 3 cạnh phải là các số hợp lệ!";
        logToScreen(err, "error");
        alert(err);
        return;
    }

    // Bất đẳng thức tam giác
    let laTamGiac = (a > 0 && b > 0 && c > 0) &&
                    (a + b > c) && (a + c > b) && (b + c > a);

    if (!laTamGiac) {
        let err = `Ba cạnh (${a}, ${b}, ${c}) KHÔNG tạo thành một tam giác hợp lệ!`;
        logToScreen(err, "warn");
        alert(err);
        return;
    }

    let ketLuan = "";
    if (a === b && b === c) {
        ketLuan = `TAM GIÁC ĐỀU (vì 3 cạnh bằng nhau: a = b = c = ${a}).`;
    } else {
        ketLuan = `KHÔNG PHẢI TAM GIÁC ĐỀU.`;
    }

    logToScreen(`BÀI 6: a=${a}, b=${b}, c=${c} => ${ketLuan}`, "success");
    alert(`KẾT QUẢ:\n${ketLuan}`);

    const uiA = document.getElementById("b6_input_a");
    const uiB = document.getElementById("b6_input_b");
    const uiC = document.getElementById("b6_input_c");
    if (uiA && uiB && uiC) {
        uiA.value = a; uiB.value = b; uiC.value = c;
        bai6_TinhUI();
    }
}

// --- Cách 2: Chạy trực tiếp từ Form Giao Diện Web ---
function bai6_TinhUI() {
    const uiA = document.getElementById("b6_input_a");
    const uiB = document.getElementById("b6_input_b");
    const uiC = document.getElementById("b6_input_c");
    const resultBox = document.getElementById("b6_result");
    if (!uiA || !uiB || !uiC || !resultBox) return;

    let a = parseFloat(uiA.value);
    let b = parseFloat(uiB.value);
    let c = parseFloat(uiC.value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultBox.className = "result-display status-waiting";
        resultBox.innerHTML = `Vui lòng nhập độ dài của cả 3 cạnh a, b, c.`;
        return;
    }

    // 1. Kiểm tra điều kiện tồn tại tam giác
    let laTamGiacHopLe = (a > 0 && b > 0 && c > 0) &&
                         (a + b > c) &&
                         (a + c > b) &&
                         (b + c > a);

    if (!laTamGiacHopLe) {
        resultBox.className = "result-display status-error";
        resultBox.innerHTML = `
            <div class="result-highlight" style="color: #dc2626;">KHÔNG PHẢI TAM GIÁC</div>
            <div class="result-subinfo">
                • Ba cạnh (${a}, ${b}, ${c}) không thỏa mãn bất đẳng thức tam giác.<br>
                • Nguyên tắc: Cả 3 cạnh phải > 0 và tổng 2 cạnh bất kỳ phải luôn lớn hơn cạnh còn lại.
            </div>
        `;
        logToScreen(`[Bài 6 UI] Không phải tam giác hợp lệ: a=${a}, b=${b}, c=${c}`, "error");
        return;
    }

    // 2. Kiểm tra tam giác đều
    let isEquilateral = (a === b && b === c);

    if (isEquilateral) {
        resultBox.className = "result-display status-success";
        resultBox.innerHTML = `
            <div class="result-highlight">TAM GIÁC ĐỀU</div>
            <div class="result-subinfo">
                • Nhận diện: Cả 3 cạnh đều bằng nhau (<code>a = b = c = ${a}</code>).<br>
                • Ba góc trong tam giác này đều bằng 60°.
            </div>
        `;
        logToScreen(`[Bài 6 UI] Tam giác đều với 3 cạnh = ${a}`, "success");
    } else {
        // Phân loại mở rộng
        let isIsosceles = (a === b || b === c || a === c);
        let isRight = (Math.abs(a*a + b*b - c*c) < 1e-4) ||
                      (Math.abs(a*a + c*c - b*b) < 1e-4) ||
                      (Math.abs(b*b + c*c - a*a) < 1e-4);

        let subType = "Tam giác thường";
        if (isIsosceles && isRight) subType = "Tam giác vuông cân";
        else if (isRight) subType = "Tam giác vuông";
        else if (isIsosceles) subType = "Tam giác cân";

        resultBox.className = "result-display status-warning";
        resultBox.innerHTML = `
            <div class="result-highlight" style="color: #d97706;">KHÔNG PHẢI TAM GIÁC ĐỀU</div>
            <div class="result-subinfo">
                • Lý do: 3 cạnh không bằng nhau (<code>a=${a}, b=${b}, c=${c}</code>).<br>
                • Phân loại cụ thể: Ba cạnh này tạo thành <strong>${subType}</strong>.
            </div>
        `;
        logToScreen(`[Bài 6 UI] Không phải tam giác đều (Là ${subType})`, "warn");
    }
}

function bai6_GanMau(a, b, c) {
    const uiA = document.getElementById("b6_input_a");
    const uiB = document.getElementById("b6_input_b");
    const uiC = document.getElementById("b6_input_c");
    if (uiA && uiB && uiC) {
        uiA.value = a;
        uiB.value = b;
        uiC.value = c;
        bai6_TinhUI();
    }
}

// ==============================================================================
// SAO CHÉP MÃ NGUỒN VÀO CLIPBOARD
// ==============================================================================
function copyCodeBlock(elementId, btnEle) {
    const codeEle = document.getElementById(elementId);
    if (!codeEle) return;
    navigator.clipboard.writeText(codeEle.innerText).then(() => {
        let originalText = btnEle.innerText;
        btnEle.innerText = "✓ Đã sao chép!";
        btnEle.style.backgroundColor = "#10b981";
        btnEle.style.color = "#ffffff";
        setTimeout(() => {
            btnEle.innerText = originalText;
            btnEle.style.backgroundColor = "";
            btnEle.style.color = "";
        }, 2000);
    }).catch(err => {
        alert("Không thể sao chép tự động: " + err);
    });
}

function clearLiveScreen() {
    const liveBox = document.getElementById("liveConsoleContent");
    if (liveBox) {
        liveBox.innerHTML = `<div class="log-line log-info"><span class="log-time">[Hệ thống]</span> Màn hình console đã được làm sạch.</div>`;
    }
}

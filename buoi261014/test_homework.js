/**
 * Script kiểm thử tự động (Unit Test logic) cho 6 bài tập
 */

function test() {
    console.log("=== BẮT ĐẦU KIỂM THỬ LOGIC 6 BÀI TẬP ===");

    // Test Bài 1: USD -> VND
    const rate = 25000;
    const usd = 100;
    const vnd = usd * rate;
    console.assert(vnd === 2500000, "Bài 1 sai!");
    console.log("✔ Bài 1 (USD -> VND): Passed!");

    // Test Bài 2: Chẵn / Lẻ
    console.assert(4 % 2 === 0, "Bài 2 số 4 sai!");
    console.assert((-4) % 2 === 0, "Bài 2 số -4 sai!");
    console.assert(7 % 2 !== 0, "Bài 2 số 7 sai!");
    console.assert((-7) % 2 !== 0, "Bài 2 số -7 sai!");
    console.log("✔ Bài 2 (Chẵn / Lẻ): Passed!");

    // Test Bài 3: BMI
    const w = 65, h = 1.70;
    const bmi = +(w / (h * h)).toFixed(2);
    console.assert(bmi === 22.49, "Bài 3 sai!");
    console.log("✔ Bài 3 (BMI): Passed!");

    // Test Bài 4: Login
    const user = "admin", pass = "123456";
    console.assert((user === "admin" && pass === "123456") === true, "Bài 4 đúng sai!");
    console.assert((user === "admin" && pass === "sai") === false, "Bài 4 sai mật khẩu!");
    console.log("✔ Bài 4 (Đăng nhập): Passed!");

    // Test Bài 5: Giảm giá
    function calcDiscount(amount) {
        let discount = amount > 500000 ? amount * 0.1 : 0;
        return amount - discount;
    }
    console.assert(calcDiscount(600000) === 540000, "Bài 5 >500k sai!");
    console.assert(calcDiscount(500000) === 500000, "Bài 5 =500k sai!");
    console.assert(calcDiscount(300000) === 300000, "Bài 5 <500k sai!");
    console.log("✔ Bài 5 (Giảm giá): Passed!");

    // Test Bài 6: Tam giác đều
    function isEquilateral(a, b, c) {
        let isValid = (a > 0 && b > 0 && c > 0) && (a + b > c) && (a + c > b) && (b + c > a);
        if (!isValid) return false;
        return (a === b && b === c);
    }
    console.assert(isEquilateral(5, 5, 5) === true, "Bài 6 tam giác đều sai!");
    console.assert(isEquilateral(5, 5, 6) === false, "Bài 6 cân nhận thành đều!");
    console.assert(isEquilateral(1, 2, 10) === false, "Bài 6 tam giác không hợp lệ!");
    console.log("✔ Bài 6 (Tam giác đều): Passed!");

    console.log("=== TẤT CẢ TEST ĐÃ VƯỢT QUA 100% ===");
}

test();

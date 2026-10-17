// Paste the deployed Google Apps Script Web App URL (ending in /exec) here.
const GOOGLE_SCRIPT_URL = "";

const form = document.getElementById("userForm");
const submitButton = document.getElementById("submitButton");
const buttonLabel = submitButton.querySelector(".button-label");
const statusMessage = document.getElementById("formStatus");
const messageInput = document.getElementById("message");
const messageCount = document.getElementById("messageCount");
const fields = ["fullName", "email", "phone", "birthDate", "address", "message", "consent"];

function setFieldError(name, message) {
  const field = document.getElementById(name);
  const error = document.getElementById(`${name}Error`);

  field.setAttribute("aria-invalid", String(Boolean(message)));
  error.textContent = message;
}

function clearStatus() {
  statusMessage.textContent = "";
  statusMessage.removeAttribute("data-state");
}

function validateForm() {
  let isValid = true;
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const birthDate = document.getElementById("birthDate");
  const consent = document.getElementById("consent");
  const normalizedPhone = phone.value.replace(/[^\d]/g, "");
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  fields.forEach((name) => setFieldError(name, ""));

  if (fullName.value.trim().length < 2) {
    setFieldError("fullName", "Vui lòng nhập họ tên có ít nhất 2 ký tự.");
    isValid = false;
  }

  if (!email.value.trim() || !email.validity.valid) {
    setFieldError("email", "Vui lòng nhập địa chỉ email hợp lệ.");
    isValid = false;
  }

  if (normalizedPhone.length < 9 || normalizedPhone.length > 15) {
    setFieldError("phone", "Số điện thoại cần có từ 9 đến 15 chữ số.");
    isValid = false;
  }

  if (birthDate.value && birthDate.value > localToday) {
    setFieldError("birthDate", "Ngày sinh không thể ở trong tương lai.");
    isValid = false;
  }

  if (!consent.checked) {
    setFieldError("consent", "Vui lòng đồng ý trước khi gửi thông tin.");
    isValid = false;
  }

  if (!isValid) {
    const firstInvalidField = form.querySelector('[aria-invalid="true"]');
    if (firstInvalidField) firstInvalidField.focus();
  }

  return isValid;
}

function showStatus(message, state) {
  statusMessage.textContent = message;
  if (state) {
    statusMessage.dataset.state = state;
  } else {
    statusMessage.removeAttribute("data-state");
  }
}

form.addEventListener("input", (event) => {
  const target = event.target;
  if (target.name && fields.includes(target.name)) {
    setFieldError(target.name, "");
    clearStatus();
  }

  if (target === messageInput) {
    messageCount.textContent = String(messageInput.value.length);
  }
});

form.addEventListener("change", (event) => {
  const target = event.target;
  if (target.name && fields.includes(target.name)) {
    setFieldError(target.name, "");
    clearStatus();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateForm()) {
    showStatus("Vui lòng kiểm tra lại các trường được đánh dấu.", "error");
    return;
  }

  if (!GOOGLE_SCRIPT_URL) {
    showStatus("Chưa cấu hình Google Sheets. Hãy dán URL Web App vào biến GOOGLE_SCRIPT_URL trong js/baitap3.js.", "error");
    return;
  }

  if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(GOOGLE_SCRIPT_URL)) {
    showStatus("URL Google Apps Script chưa đúng. Hãy dùng URL Web App có dạng https://script.google.com/macros/s/.../exec.", "error");
    return;
  }

  const payload = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    birthDate: document.getElementById("birthDate").value,
    address: document.getElementById("address").value.trim(),
    message: messageInput.value.trim(),
    consent: document.getElementById("consent").checked
  };

  submitButton.disabled = true;
  buttonLabel.textContent = "Đang gửi...";
  showStatus("Đang gửi thông tin đến Google Sheets...");

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    buttonLabel.textContent = "Gửi lại thông tin";
    showStatus("Yêu cầu đã được gửi đến Google Apps Script. Do giới hạn phản hồi cross-origin của Google, trang không thể xác nhận hàng đã được ghi; hãy kiểm tra tab Responses trong Google Sheets. Thông tin vẫn được giữ trên form để bạn có thể gửi lại nếu chưa thấy dữ liệu.");
  } catch (error) {
    buttonLabel.textContent = "Thử gửi lại";
    showStatus("Không thể kết nối để gửi dữ liệu. Vui lòng kiểm tra mạng và URL Web App rồi thử lại.", "error");
    console.error("Không gửi được thông tin đến Google Sheets:", error);
  } finally {
    submitButton.disabled = false;
  }
});

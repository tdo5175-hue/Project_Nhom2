/*
 * Google Sheets setup:
 * 1. Open the destination spreadsheet, then choose Extensions > Apps Script.
 * 2. Paste this file into the spreadsheet's Apps Script project and save.
 * 3. Deploy > New deployment > Web app; execute as yourself and allow access
 *    to anyone. Copy the deployed URL ending in /exec.
 * 4. Paste that URL into GOOGLE_SCRIPT_URL in ../js/baitap3.js.
 * The public deployment can be called by anyone; collect only information
 * appropriate for this form and keep the destination spreadsheet private.
 *
 * The script creates a "Responses" tab with a fixed column order. Do not
 * rename or reorder its header cells after the first submission.
 */
const RESPONSE_SHEET_NAME = "Responses";
const RESPONSE_HEADERS = [
  "Thời gian gửi",
  "Họ và tên",
  "Email",
  "Số điện thoại",
  "Ngày sinh",
  "Địa chỉ",
  "Lời nhắn"
];

function doPost(event) {
  try {
    if (!event || !event.postData || !event.postData.contents) {
      throw new Error("Không nhận được dữ liệu biểu mẫu.");
    }

    const data = JSON.parse(event.postData.contents);
    const row = validateAndBuildRow(data);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error("Hãy gắn Apps Script này với Google Sheets đích.");
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      let sheet = spreadsheet.getSheetByName(RESPONSE_SHEET_NAME);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(RESPONSE_SHEET_NAME);
      }

      if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, RESPONSE_HEADERS.length).setValues([RESPONSE_HEADERS]);
        sheet.setFrozenRows(1);
      } else {
        const existingHeaders = sheet
          .getRange(1, 1, 1, RESPONSE_HEADERS.length)
          .getDisplayValues()[0];
        if (existingHeaders.some((header, index) => header !== RESPONSE_HEADERS[index])) {
          throw new Error("Thứ tự tiêu đề cột trong tab Responses không khớp.");
        }
      }

      const nextRow = sheet.getLastRow() + 1;
      const destination = sheet.getRange(nextRow, 1, 1, row.length);
      destination.setNumberFormat("@");
      destination.setValues([row]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: error.message });
  }
}

function validateAndBuildRow(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Dữ liệu biểu mẫu không hợp lệ.");
  }

  const fullName = requiredText(data.fullName, "Họ và tên", 2, 100);
  const email = requiredText(data.email, "Email", 3, 254);
  const phone = requiredText(data.phone, "Số điện thoại", 9, 20);
  const birthDate = optionalText(data.birthDate, 10);
  const address = optionalText(data.address, 250);
  const message = optionalText(data.message, 1000);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Email không hợp lệ.");
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 9 || phoneDigits.length > 15) {
    throw new Error("Số điện thoại không hợp lệ.");
  }

  if (birthDate) {
    const dateParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
    if (!dateParts) {
      throw new Error("Ngày sinh không hợp lệ.");
    }

    const parsedDate = new Date(Date.UTC(
      Number(dateParts[1]),
      Number(dateParts[2]) - 1,
      Number(dateParts[3])
    ));
    if (parsedDate.toISOString().slice(0, 10) !== birthDate) {
      throw new Error("Ngày sinh không hợp lệ.");
    }
  }

  if (data.consent !== true) {
    throw new Error("Người dùng chưa đồng ý gửi thông tin.");
  }

  return [
    new Date().toISOString(),
    safeSheetText(fullName),
    safeSheetText(email),
    safeSheetText(phone),
    safeSheetText(birthDate),
    safeSheetText(address),
    safeSheetText(message)
  ];
}

function requiredText(value, label, minimum, maximum) {
  if (typeof value !== "string") {
    throw new Error(label + " không hợp lệ.");
  }

  const text = value.trim();
  if (text.length < minimum || text.length > maximum) {
    throw new Error(label + " không hợp lệ.");
  }
  return text;
}

function optionalText(value, maximum) {
  if (typeof value !== "string") {
    throw new Error("Dữ liệu biểu mẫu không hợp lệ.");
  }

  const text = value.trim();
  if (text.length > maximum) {
    throw new Error("Một trường dữ liệu vượt quá độ dài cho phép.");
  }
  return text;
}

function safeSheetText(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * ==============================================================================
 * BACKEND XỬ LÝ ĐẶT VÉ & GỬI EMAIL TỰ ĐỘNG - AI WORKSHOP 2026
 * Tài khoản gửi thư: tdo5175@gmail.com
 * ==============================================================================
 * 
 * KIẾN TRÚC BẢO MẬT:
 * - File này được triển khai độc lập trên Google Apps Script (Server của Google).
 * - KHÔNG chứa mật khẩu hay thông tin nhạy cảm.
 * - Khi triển khai với quyền "Execute as: Me", script tự động sử dụng tài khoản
 *   tdo5175@gmail.com để gửi email mà không cần Gmail App Password ở Frontend.
 * - Email người dùng nhập trên website sẽ là EMAIL NHẬN thư xác nhận.
 * 
 * HƯỚNG DẪN TRIỂN KHAI NHANH CHO SINH VIÊN / GIẢNG VIÊN:
 * 1. Tạo 1 file Google Sheets mới (Ví dụ: "QuanLy_DatVe_AIWorkshop2026").
 * 2. Vào Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. Dán toàn bộ nội dung file này vào.
 * 4. Nhấn Deploy (Triển khai) -> New deployment (Triển khai mới).
 * 5. Chọn loại: "Web app" (Ứng dụng web).
 *    - Description: "Ticket Booking API"
 *    - Execute as: "Me" (tdo5175@gmail.com)
 *    - Who has access: "Anyone" (Bất kỳ ai - để web gửi dữ liệu vào được)
 * 6. Nhấn Deploy -> Cấp quyền truy cập (Authorize access).
 * 7. Sao chép đường link "Web app URL" (có đuôi /exec) và dán vào file js/api-service.js.
 * ==============================================================================
 */

const SENDER_EMAIL = 'tdo5175@gmail.com';
const EVENT_NAME = 'AI & Future Careers Workshop 2026';
const EVENT_TIME = '08:30 - 11:30, Thứ Bảy (26/10/2026)';
const EVENT_LOCATION = 'Hội trường A, Trường Đại Học Lạc Hồng';

/**
 * Xử lý yêu cầu GET: Kiểm tra trạng thái hoạt động của Web App
 */
function doGet(e) {
  const result = {
    status: 'online',
    service: 'Ticket Booking & Email Notification API',
    senderEmail: SENDER_EMAIL,
    eventName: EVENT_NAME,
    timestamp: new Date().toISOString()
  };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Xử lý yêu cầu POST: Nhận dữ liệu đặt vé từ website và gửi email xác nhận
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(30000); // Khóa tránh xung đột khi có nhiều người đặt vé cùng lúc

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 1. Tự động khởi tạo hàng tiêu đề nếu trang tính còn mới
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Thời Gian Đặt',
        'Mã Đơn Vé',
        'Họ Và Tên',
        'Email Khách Hàng',
        'Số Điện Thoại',
        'Loại Vé',
        'Số Lượng',
        'Tổng Tiền',
        'Ghi Chú',
        'Trạng Thái',
        'Email Gửi Thư'
      ];
      sheet.appendRow(headers);

      // Định dạng hàng tiêu đề: In đậm, nền xanh, chữ trắng
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1e40af');
      headerRange.setFontColor('#ffffff');
      headerRange.setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
    }

    // 2. Phân tích dữ liệu JSON gửi từ website
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    const customerName = data.name ? data.name.trim() : 'Quý khách';
    const customerEmail = data.email ? data.email.trim() : '';
    const customerPhone = data.phone ? data.phone.trim() : '';
    const ticketType = data.ticketType || 'Vé Tiêu Chuẩn';
    const quantity = data.quantity || 1;
    const totalPrice = data.totalPrice || '0 đ';
    const note = data.note ? data.note.trim() : 'Không có';
    const ticketCode = data.ticketCode || ('TICKET-' + Date.now().toString().slice(-6));
    const timestamp = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');

    // 3. Ghi dữ liệu vào Google Sheets
    sheet.appendRow([
      timestamp,
      ticketCode,
      customerName,
      customerEmail,
      customerPhone,
      ticketType,
      quantity,
      totalPrice,
      note,
      'Đã Xác Nhận',
      SENDER_EMAIL
    ]);

    // 4. Gửi email xác nhận đến đúng email mà khách hàng đã nhập
    if (customerEmail && customerEmail.includes('@')) {
      sendConfirmationEmail(customerEmail, customerName, ticketCode, ticketType, quantity, totalPrice);
    }

    // 5. Trả về kết quả JSON thành công cho website
    const responseData = {
      status: 'success',
      message: 'Đặt vé thành công và đã gửi email xác nhận!',
      ticketCode: ticketCode,
      customerEmail: customerEmail,
      senderEmail: SENDER_EMAIL
    };

    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Lỗi máy chủ: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Gửi email xác nhận đặt vé đến khách hàng
 * Sử dụng MailApp tích hợp sẵn của Google Apps Script (An toàn, không lộ mật khẩu)
 */
function sendConfirmationEmail(recipientEmail, customerName, ticketCode, ticketType, quantity, totalPrice) {
  try {
    const subject = `[Xác Nhận Đặt Vé] ${EVENT_NAME} - Mã vé: ${ticketCode}`;

    // Nội dung Email thuần tự nhiên, lịch sự
    const plainTextBody = 
      `Xin chào ${customerName},\n\n` +
      `Cảm ơn bạn đã đặt vé tham dự sự kiện "${EVENT_NAME}".\n\n` +
      `THÔNG TIN ĐẶT VÉ CỦA BẠN:\n` +
      `- Mã đơn vé: ${ticketCode}\n` +
      `- Họ và tên: ${customerName}\n` +
      `- Email nhận vé: ${recipientEmail}\n` +
      `- Loại vé: ${ticketType}\n` +
      `- Số lượng vé: ${quantity} vé\n` +
      `- Tổng tiền: ${totalPrice}\n` +
      `- Thời gian tổ chức: ${EVENT_TIME}\n` +
      `- Địa điểm: ${EVENT_LOCATION}\n\n` +
      `Đơn đặt vé của bạn đã được ghi nhận thành công trên hệ thống.\n` +
      `Vui lòng lưu lại thông tin này hoặc xuất trình mã vé tại bàn đón tiếp khi đến tham dự sự kiện.\n\n` +
      `Cảm ơn bạn đã tham gia!\n\n` +
      `Trân trọng,\n` +
      `Ban Tổ Chức ${EVENT_NAME}\n` +
      `Email hỗ trợ: ${SENDER_EMAIL}`;

    // Phiên bản HTML nhã nhặn, cấu trúc sạch sẽ
    const htmlBody = `
      <div style="font-family: Arial, -apple-system, sans-serif; max-width: 580px; margin: 0 auto; color: #1e293b; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1e40af; color: #ffffff; padding: 20px 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; font-weight: bold;">XÁC NHẬN ĐẶT VÉ THÀNH CÔNG</h2>
          <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">${EVENT_NAME}</p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          <p style="margin-top: 0;">Xin chào <strong>${customerName}</strong>,</p>
          <p>Cảm ơn bạn đã đặt vé tham gia chương trình. Đơn đặt vé của bạn đã được ghi nhận thành công trên hệ thống.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #1e40af; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <h4 style="margin: 0 0 12px; color: #1e40af; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Thông Tin Chi Tiết Vé</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
              <tr>
                <td style="padding: 5px 0; color: #64748b; width: 130px;">Mã đơn vé:</td>
                <td style="padding: 5px 0; font-weight: bold; color: #dc2626; font-size: 15px;">${ticketCode}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #64748b;">Họ và tên:</td>
                <td style="padding: 5px 0; font-weight: 600;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #64748b;">Email nhận vé:</td>
                <td style="padding: 5px 0;">${recipientEmail}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #64748b;">Loại vé:</td>
                <td style="padding: 5px 0; font-weight: 600;">${ticketType}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #64748b;">Số lượng:</td>
                <td style="padding: 5px 0;">${quantity} vé</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #64748b;">Tổng tiền:</td>
                <td style="padding: 5px 0; font-weight: bold; color: #059669;">${totalPrice}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #64748b;">Thời gian:</td>
                <td style="padding: 5px 0;">${EVENT_TIME}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #64748b;">Địa điểm:</td>
                <td style="padding: 5px 0;">${EVENT_LOCATION}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 13px; color: #475569; background-color: #eff6ff; padding: 12px; border-radius: 6px; margin: 16px 0;">
            📌 <strong>Lưu ý:</strong> Vui lòng lưu lại email này hoặc xuất trình mã đơn vé <strong>${ticketCode}</strong> khi đến bàn đón tiếp tại sự kiện để làm thủ tục check-in.
          </p>

          <p style="margin-bottom: 0;">Trân trọng,<br><strong>Ban Tổ Chức ${EVENT_NAME}</strong><br><small style="color: #64748b;">Email hỗ trợ: ${SENDER_EMAIL}</small></p>
        </div>

        <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 11.5px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Email xác nhận tự động được gửi từ hệ thống đặt vé • ${SENDER_EMAIL}
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: plainTextBody,
      htmlBody: htmlBody
    });

  } catch (err) {
    Logger.log('Lỗi gửi email xác nhận: ' + err.toString());
  }
}

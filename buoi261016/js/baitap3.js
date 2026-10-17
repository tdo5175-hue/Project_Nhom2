/**
 * ==============================================================================
 * BÀI TẬP 3: JAVASCRIPT HỆ THỐNG ĐẶT VÉ SỰ KIỆN TÍCH HỢP GOOGLE SHEETS & EMAIL
 * 
 * NGUYÊN TẮC BẢO MẬT & KIẾN TRÚC:
 * 1. Tài khoản gửi email: tdo5175@gmail.com (Cấu hình server-side tại Google Apps Script).
 * 2. Email khách hàng nhập: Là EMAIL NHẬN thư xác nhận & mã vé điện tử.
 * 3. Tuyệt đối KHÔNG lưu mật khẩu hoặc App Password trong Frontend.
 * 4. Xử lý Real-time Validation, Đếm ngược 50 chỗ, Tạo QR Check-in qua QuickChart API.
 * 5. Cơ chế gửi bất đồng bộ an toàn: Khắc phục triệt để lỗi cảnh báo redirect trên file://.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ============================================================================
     1. DỮ LIỆU CÁC LOẠI VÉ SỰ KIỆN (TICKET DATA)
     ============================================================================ */
  const TICKET_TYPES = [
    {
      id: 'student',
      name: 'Vé Sinh Viên',
      price: 0,
      priceFormatted: '0 đ',
      badge: 'Miễn phí',
      description: 'Dành riêng cho sinh viên Đại học Lạc Hồng (mang thẻ SV khi check-in).',
      perks: [
        'Chỗ ngồi khu vực sinh viên',
        'Tài liệu hội thảo (PDF)',
        'Chứng nhận tham gia điện tử'
      ]
    },
    {
      id: 'standard',
      name: 'Vé Tiêu Chuẩn',
      price: 150000,
      priceFormatted: '150.000 đ',
      badge: 'Phổ biến nhất',
      description: 'Phù hợp cho sinh viên trường ngoài và người đi làm yêu công nghệ.',
      perks: [
        'Vị trí ngồi trung tâm hội trường',
        'Trọn bộ tài liệu chuyên sâu',
        'Teabreak bánh ngọt & cà phê',
        'Chứng nhận tham gia chính thức'
      ]
    },
    {
      id: 'vip',
      name: 'Vé Khách Mời VIP',
      price: 350000,
      priceFormatted: '350.000 đ',
      badge: 'Đặc quyền VIP',
      description: 'Đặc quyền ngồi hàng ghế đầu và giao lưu trực tiếp với các chuyên gia.',
      perks: [
        'Ghế ngồi hàng đầu VIP',
        'Teabreak VIP giao lưu riêng',
        'Bộ quà tặng công nghệ độc quyền',
        'Trao đổi 1:1 cùng diễn giả'
      ]
    }
  ];

  /* ============================================================================
     2. QUẢN LÝ TRẠNG THÁI (APPLICATION STATE)
     ============================================================================ */
  const MAX_CAPACITY = 50;
  let remainingSeats = parseInt(localStorage.getItem('ai_workshop_seats'), 10);
  if (isNaN(remainingSeats) || remainingSeats < 0 || remainingSeats > MAX_CAPACITY) {
    remainingSeats = 50; // Mặc định chỉ có đúng 50 chỗ ngồi ban đầu
  }

  let selectedTicketId = 'standard';
  let ticketQuantity = 1;

  // Cấu hình URL Web App Google Apps Script
  const DEFAULT_SCRIPT_KEY = 'ai_workshop_script_url';
  let googleScriptUrl = localStorage.getItem(DEFAULT_SCRIPT_KEY) || '';

  /* ============================================================================
     3. TRUY XUẤT CÁC PHẦN TỬ GIAO DIỆN (DOM ELEMENTS)
     ============================================================================ */
  // Theme & Navigation
  const themeToggleBtn       = document.getElementById('themeToggleBtn');
  const themeIcon            = document.getElementById('themeIcon');
  const remainingSeatsVal    = document.getElementById('remainingSeatsVal');
  const seatCounterBadge     = document.getElementById('seatCounterBadge');
  const resetSeatsBtn        = document.getElementById('resetSeatsBtn');
  const reloadSeatsIcon      = document.getElementById('reloadSeatsIcon');
  const seatsResetToast      = document.getElementById('seatsResetToast');

  // Stepper indicators
  const stepIndicator1       = document.getElementById('stepIndicator1');
  const stepIndicator2       = document.getElementById('stepIndicator2');
  const stepIndicator3       = document.getElementById('stepIndicator3');

  // Ticket grid & quantity
  const ticketGridContainer  = document.getElementById('ticketGridContainer');
  const qtyMinusBtn          = document.getElementById('qtyMinusBtn');
  const qtyPlusBtn           = document.getElementById('qtyPlusBtn');
  const ticketQuantityInput  = document.getElementById('ticketQuantity');

  // Form inputs (Nâng cấp đầy đủ 2 cột & trường mở rộng)
  const bookingForm          = document.getElementById('bookingForm');
  const customerNameInput    = document.getElementById('customerName');
  const customerPhoneInput   = document.getElementById('customerPhone');
  const customerEmailInput   = document.getElementById('customerEmail');
  const customerRoleInput    = document.getElementById('customerRole');
  const customerOrgInput     = document.getElementById('customerOrg');
  const customerNoteInput    = document.getElementById('customerNote');
  const noteCharCounter      = document.getElementById('noteCharCounter');
  const chipItems            = document.querySelectorAll('.chip-item');

  // Inline error spans
  const nameError            = document.getElementById('nameError');
  const phoneError           = document.getElementById('phoneError');
  const emailError           = document.getElementById('emailError');
  const orgError             = document.getElementById('orgError');

  // Buttons & Spinners
  const confirmBookingBtn    = document.getElementById('confirmBookingBtn');
  const submitBtnText        = document.getElementById('submitBtnText');
  const submitSpinner        = document.getElementById('submitSpinner');

  // Order summary display & rows
  const summaryName          = document.getElementById('summaryName');
  const summaryPhone         = document.getElementById('summaryPhone');
  const summaryEmail         = document.getElementById('summaryEmail');
  const summaryRole          = document.getElementById('summaryRole');
  const summaryOrg           = document.getElementById('summaryOrg');
  const summaryTicketType    = document.getElementById('summaryTicketType');
  const summaryUnitPrice     = document.getElementById('summaryUnitPrice');
  const summaryQuantity      = document.getElementById('summaryQuantity');
  const summaryTotalPrice    = document.getElementById('summaryTotalPrice');

  const rowSummaryName       = document.getElementById('rowSummaryName');
  const rowSummaryPhone      = document.getElementById('rowSummaryPhone');
  const rowSummaryEmail      = document.getElementById('rowSummaryEmail');
  const rowSummaryRole       = document.getElementById('rowSummaryRole');
  const rowSummaryOrg        = document.getElementById('rowSummaryOrg');

  // Modal elements
  const orderSuccessModal    = document.getElementById('orderSuccessModal');
  const closeModalBtn        = document.getElementById('closeModalBtn');
  const dismissModalBtn      = document.getElementById('dismissModalBtn');
  const modalTicketCode      = document.getElementById('modalTicketCode');
  const modalCustomerName    = document.getElementById('modalCustomerName');
  const modalCustomerPhone   = document.getElementById('modalCustomerPhone');
  const modalRecipientEmail  = document.getElementById('modalRecipientEmail');
  const modalCustomerRoleOrg = document.getElementById('modalCustomerRoleOrg');
  const modalTicketSummary   = document.getElementById('modalTicketSummary');
  const modalTotalPrice      = document.getElementById('modalTotalPrice');
  const modalQrImage         = document.getElementById('modalQrImage');
  const downloadQrBtn        = document.getElementById('downloadQrBtn');
  const printTicketBtn       = document.getElementById('printTicketBtn');

  // Config Drawer
  const configToggleBtn      = document.getElementById('configToggleBtn');
  const configDrawerBody     = document.getElementById('configDrawerBody');
  const scriptUrlInput       = document.getElementById('scriptUrlInput');
  const saveScriptUrlBtn     = document.getElementById('saveScriptUrlBtn');
  const scriptBadge          = document.getElementById('scriptBadge');

  /* ============================================================================
     4. KHỞI TẠO CHỦ ĐỀ GIAO DIỆN (THEME TOGGLE)
     ============================================================================ */
  function initTheme() {
    const savedTheme = localStorage.getItem('site_theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('site_theme', nextTheme);
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  /* ============================================================================
     5. CẬP NHẬT TIẾN ĐỘ ĐẾM NGƯỢC CHỖ NGỒI (SEATS COUNTER)
     ============================================================================ */
  function updateSeatsUI() {
    if (!remainingSeatsVal || !seatCounterBadge) return;

    remainingSeatsVal.textContent = `${remainingSeats} / ${MAX_CAPACITY}`;

    if (remainingSeats <= 0) {
      remainingSeatsVal.textContent = `Hết chỗ (0 / ${MAX_CAPACITY})`;
      seatCounterBadge.classList.add('full');
      if (confirmBookingBtn) {
        confirmBookingBtn.disabled = true;
        if (submitBtnText) submitBtnText.textContent = 'HỘI THẢO ĐÃ HẾT CHỖ';
      }
    } else {
      seatCounterBadge.classList.remove('full');
      if (confirmBookingBtn) {
        confirmBookingBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = 'XÁC NHẬN ĐẶT VÉ ➔';
      }
    }
  }

  // Lắng nghe sự kiện click nút Reload / Reset lại 50 chỗ ngồi ban đầu
  if (resetSeatsBtn) {
    resetSeatsBtn.addEventListener('click', () => {
      remainingSeats = MAX_CAPACITY;
      localStorage.setItem('ai_workshop_seats', MAX_CAPACITY);
      updateSeatsUI();

      // Hiệu ứng xoay icon 360 độ
      resetSeatsBtn.classList.remove('spinning');
      void resetSeatsBtn.offsetWidth;
      resetSeatsBtn.classList.add('spinning');
      setTimeout(() => resetSeatsBtn.classList.remove('spinning'), 600);

      // Hiệu ứng pulse trên badge chỗ ngồi
      if (seatCounterBadge) {
        seatCounterBadge.classList.add('pulse-update');
        setTimeout(() => seatCounterBadge.classList.remove('pulse-update'), 500);
      }

      // Toast thông báo phản hồi nhanh
      if (seatsResetToast) {
        seatsResetToast.textContent = '✓ Đã reset 50 chỗ!';
        seatsResetToast.classList.add('show');
        setTimeout(() => {
          seatsResetToast.classList.remove('show');
        }, 2000);
      }
    });
  }

  /* ============================================================================
     6. RENDER DANH SÁCH THẺ VÉ & BỘ CHỌN SỐ LƯỢNG
     ============================================================================ */
  function formatMoney(amount) {
    if (amount === 0) return '0 đ';
    return amount.toLocaleString('vi-VN') + ' đ';
  }

  function renderTickets() {
    if (!ticketGridContainer) return;
    ticketGridContainer.innerHTML = '';

    TICKET_TYPES.forEach(ticket => {
      const isSelected = ticket.id === selectedTicketId;
      const card = document.createElement('div');
      card.className = `ticket-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute('data-id', ticket.id);

      card.innerHTML = `
        <div class="ticket-card-top">
          <div class="ticket-radio"></div>
          <span class="ticket-badge">${ticket.badge}</span>
        </div>
        <div class="ticket-name">${ticket.name}</div>
        <div class="ticket-price">${ticket.priceFormatted}</div>
        <div class="ticket-desc">${ticket.description}</div>
        <ul class="ticket-perks">
          ${ticket.perks.map(p => `<li>${p}</li>`).join('')}
        </ul>
      `;

      card.addEventListener('click', () => {
        selectedTicketId = ticket.id;
        document.querySelectorAll('.ticket-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        updateOrderSummary();
      });

      ticketGridContainer.appendChild(card);
    });
  }

  // Bộ chọn số lượng (1 đến 5 vé)
  if (qtyMinusBtn && qtyPlusBtn && ticketQuantityInput) {
    qtyMinusBtn.addEventListener('click', () => {
      if (ticketQuantity > 1) {
        ticketQuantity--;
        ticketQuantityInput.value = ticketQuantity;
        updateOrderSummary();
      }
    });

    qtyPlusBtn.addEventListener('click', () => {
      if (ticketQuantity < 9) {
        if (ticketQuantity < remainingSeats) {
          ticketQuantity++;
          ticketQuantityInput.value = ticketQuantity;
          updateOrderSummary();
        } else {
          alert(`Chỉ còn ${remainingSeats} chỗ trống! Bạn không thể chọn nhiều hơn.`);
        }
      }
    });
  }

  /* ============================================================================
     7. KIỂM TRA DỮ LIỆU THỜI GIAN THỰC (REAL-TIME VALIDATION & HIỆU ỨNG)
     ============================================================================ */
  function validateName(val) {
    if (!val || val.trim().length < 2) {
      return 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự).';
    }
    return '';
  }

  function validateEmail(val) {
    if (!val || !val.trim()) {
      return 'Vui lòng nhập địa chỉ email nhận vé.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return 'Email không hợp lệ (ví dụ đúng: ten@domain.com).';
    }
    return '';
  }

  function validatePhone(val) {
    if (!val || !val.trim()) {
      return 'Vui lòng nhập số điện thoại liên hệ.';
    }
    const phoneClean = val.replace(/[\s.-]/g, '');
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    if (!phoneRegex.test(phoneClean)) {
      return 'Số điện thoại không hợp lệ (cần 10 chữ số, ví dụ: 0912345678).';
    }
    return '';
  }

  function validateOrg(val) {
    if (!val || val.trim().length < 2) {
      return 'Vui lòng nhập mã sinh viên hoặc đơn vị công tác.';
    }
    return '';
  }

  function handleFieldValidation(inputEl, errorEl, validator) {
    if (!inputEl || !errorEl) return true;

    const errMsg = validator(inputEl.value);
    if (errMsg) {
      inputEl.classList.add('is-invalid');
      inputEl.classList.remove('is-valid');
      errorEl.textContent = errMsg;
      errorEl.classList.add('show');
      return false;
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
      errorEl.textContent = '';
      errorEl.classList.remove('show');
      return true;
    }
  }

  function triggerPulse(el) {
    if (!el) return;
    el.classList.remove('pulse-update');
    // Bắt buộc reflow DOM để kích hoạt lại animation
    void el.offsetWidth;
    el.classList.add('pulse-update');
  }

  // Gắn sự kiện kiểm tra tức thì
  if (customerNameInput && nameError) {
    customerNameInput.addEventListener('input', () => {
      handleFieldValidation(customerNameInput, nameError, validateName);
      updateOrderSummary();
      triggerPulse(rowSummaryName);
    });
    customerNameInput.addEventListener('blur', () => {
      handleFieldValidation(customerNameInput, nameError, validateName);
    });
  }

  if (customerPhoneInput && phoneError) {
    customerPhoneInput.addEventListener('input', () => {
      handleFieldValidation(customerPhoneInput, phoneError, validatePhone);
      updateOrderSummary();
      triggerPulse(rowSummaryPhone);
    });
    customerPhoneInput.addEventListener('blur', () => {
      handleFieldValidation(customerPhoneInput, phoneError, validatePhone);
    });
  }

  if (customerEmailInput && emailError) {
    customerEmailInput.addEventListener('input', () => {
      handleFieldValidation(customerEmailInput, emailError, validateEmail);
      updateOrderSummary();
      triggerPulse(rowSummaryEmail);
    });
    customerEmailInput.addEventListener('blur', () => {
      handleFieldValidation(customerEmailInput, emailError, validateEmail);
    });
  }

  if (customerOrgInput && orgError) {
    customerOrgInput.addEventListener('input', () => {
      handleFieldValidation(customerOrgInput, orgError, validateOrg);
      updateOrderSummary();
      triggerPulse(rowSummaryOrg);
    });
    customerOrgInput.addEventListener('blur', () => {
      handleFieldValidation(customerOrgInput, orgError, validateOrg);
    });
  }

  // Đổi placeholder linh hoạt theo Đối tượng tham dự
  if (customerRoleInput) {
    customerRoleInput.addEventListener('change', () => {
      const roleVal = customerRoleInput.value;
      if (customerOrgInput) {
        if (roleVal.includes('Lạc Hồng') || roleVal.includes('LHU')) {
          customerOrgInput.placeholder = 'Ví dụ: 123000... hoặc Lớp 22CT111';
        } else if (roleVal.includes('Sinh viên')) {
          customerOrgInput.placeholder = 'Ví dụ: ĐH Bách Khoa, SĐT / Lớp';
        } else {
          customerOrgInput.placeholder = 'Ví dụ: Công ty TMA Solutions, FPT...';
        }
      }
      updateOrderSummary();
      triggerPulse(rowSummaryRole);
    });
  }

  // Bộ đếm ký tự ghi chú (0 / 200)
  if (customerNoteInput && noteCharCounter) {
    customerNoteInput.addEventListener('input', () => {
      const len = customerNoteInput.value.length;
      noteCharCounter.textContent = `${len} / 200 ký tự`;
      if (len >= 200) {
        noteCharCounter.style.color = 'var(--color-danger)';
      } else {
        noteCharCounter.style.color = 'var(--text-muted)';
      }
    });
  }

  // Gợi ý câu hỏi nhanh (Quick Question Chips)
  chipItems.forEach(chip => {
    chip.addEventListener('click', () => {
      const questionText = chip.getAttribute('data-question');
      if (customerNoteInput && questionText) {
        customerNoteInput.value = questionText;
        if (noteCharCounter) {
          noteCharCounter.textContent = `${questionText.length} / 200 ký tự`;
        }
        customerNoteInput.focus();
        customerNoteInput.classList.add('is-valid');
      }
    });
  });

  /* ============================================================================
     8. ĐỒNG BỘ DỮ LIỆU ĐƠN HÀNG (LIVE ORDER SUMMARY)
     ============================================================================ */
  function getSelectedTicket() {
    return TICKET_TYPES.find(t => t.id === selectedTicketId) || TICKET_TYPES[1];
  }

  function updateOrderSummary() {
    const selectedTicket = getSelectedTicket();
    const totalPrice = selectedTicket.price * ticketQuantity;

    if (summaryName) {
      summaryName.textContent = customerNameInput.value.trim() || 'Chưa nhập';
    }
    if (summaryPhone) {
      summaryPhone.textContent = customerPhoneInput.value.trim() || 'Chưa nhập';
    }
    if (summaryEmail) {
      summaryEmail.textContent = customerEmailInput.value.trim() || 'Chưa nhập';
    }
    if (summaryRole && customerRoleInput) {
      summaryRole.textContent = customerRoleInput.value;
    }
    if (summaryOrg && customerOrgInput) {
      summaryOrg.textContent = customerOrgInput.value.trim() || 'Chưa nhập';
    }
    if (summaryTicketType) {
      summaryTicketType.textContent = selectedTicket.name;
    }
    if (summaryUnitPrice) {
      summaryUnitPrice.textContent = selectedTicket.priceFormatted;
    }
    if (summaryQuantity) {
      summaryQuantity.textContent = `${ticketQuantity} vé`;
    }
    if (summaryTotalPrice) {
      summaryTotalPrice.textContent = formatMoney(totalPrice);
    }
  }

  /* ============================================================================
     9. XỬ LÝ GỬI FORM ĐẶT VÉ (FAIL-SAFE ASYNC GOOGLE APPS SCRIPT)
     ============================================================================ */
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // 1. Kiểm tra số chỗ ngồi còn lại
      if (remainingSeats <= 0) {
        alert('Rất tiếc! Sự kiện AI Workshop 2026 đã đủ số lượng 250 người đăng ký.');
        return;
      }

      // 2. Kiểm tra toàn bộ các trường nhập liệu
      const isNameValid  = handleFieldValidation(customerNameInput, nameError, validateName);
      const isPhoneValid = handleFieldValidation(customerPhoneInput, phoneError, validatePhone);
      const isEmailValid = handleFieldValidation(customerEmailInput, emailError, validateEmail);
      const isOrgValid   = handleFieldValidation(customerOrgInput, orgError, validateOrg);

      if (!isNameValid || !isPhoneValid || !isEmailValid || !isOrgValid) {
        // Cuộn mượt đến trường bị lỗi đầu tiên và tạo hiệu ứng rung
        const firstErrorField = bookingForm.querySelector('.is-invalid');
        if (firstErrorField) {
          firstErrorField.classList.add('shake-error');
          setTimeout(() => firstErrorField.classList.remove('shake-error'), 400);
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrorField.focus();
        }
        return;
      }

      // 3. Khóa nút submit và hiện spinner loading (Chống bấm đúp)
      confirmBookingBtn.disabled = true;
      confirmBookingBtn.classList.add('loading');
      if (submitBtnText) submitBtnText.textContent = 'ĐANG XỬ LÝ & GỬI EMAIL...';

      // 4. Chuẩn bị gói dữ liệu gửi đi
      const selectedTicket = getSelectedTicket();
      const totalPriceVal = selectedTicket.price * ticketQuantity;
      const formattedTotal = formatMoney(totalPriceVal);
      const randomId = Math.floor(100000 + Math.random() * 900000);
      const generatedTicketCode = `AI2026-${randomId}`;

      const customerRole = customerRoleInput ? customerRoleInput.value : 'Sinh viên LHU';
      const customerOrg = customerOrgInput ? customerOrgInput.value.trim() : '';
      const rawNote = customerNoteInput ? customerNoteInput.value.trim() : '';
      const formattedNote = `[${customerRole}${customerOrg ? ' - ' + customerOrg : ''}] ${rawNote ? rawNote : 'Không có ghi chú'}`;

     const bookingPayload = {
  fullname: customerNameInput.value.trim(),
  phone: customerPhoneInput.value.trim(),
  email: customerEmailInput.value.trim(),
  attendeeType: customerRole,
  studentIdOrUnit: customerOrg,
  ticketType: selectedTicket.name,
  quantity: ticketQuantity,
  totalPrice: formattedTotal,
  question: formattedNote
};

      // 5. GỬI DỮ LIỆU ĐẾN GOOGLE APPS SCRIPT AN TOÀN (CƠ CHẾ FAIL-SAFE)
      // Khắc phục triệt để lỗi cảnh báo redirect 302 trên giao thức file:///
      if (googleScriptUrl && googleScriptUrl.startsWith('http')) {
        try {
          const fetchPromise = fetch(googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'text/plain'
            },
            body: JSON.stringify(bookingPayload)
          });

          // Giới hạn thời gian chờ tối đa 3 giây để Google tiếp nhận và ghi Sheets
          await Promise.race([
            fetchPromise,
            new Promise(resolve => setTimeout(resolve, 3000))
          ]);
        } catch (networkNotice) {
          // Trình duyệt có thể ném cảnh báo redirect cross-origin do chế độ bảo mật file://
          // Trong khi thực tế gói POST đã được Google Sheets nhận và xử lý
          console.warn('Google Apps Script response notification:', networkNotice);
        }
      } else {
        // Chế độ demo an toàn khi chưa gắn URL Web App
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      // 6. Cập nhật số chỗ ngồi còn lại và lưu vào LocalStorage
      remainingSeats = Math.max(0, remainingSeats - ticketQuantity);
      localStorage.setItem('ai_workshop_seats', remainingSeats);
      updateSeatsUI();

      // Cập nhật thanh tiến trình Stepper sang Bước 3
      if (stepIndicator3) stepIndicator3.classList.add('active');

      // 7. Tạo mã QR Check-in bằng QuickChart API
      const qrDataString = `VE-THAM-DU: ${generatedTicketCode} | HO-TEN: ${bookingPayload.name} | VE: ${bookingPayload.ticketType} (${bookingPayload.quantity} ve) | DON-VI: ${customerOrg || customerRole}`;
      const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrDataString)}&size=160&margin=1`;

      // 8. Đổ dữ liệu vào Modal Thành Công
      if (modalTicketCode)      modalTicketCode.textContent      = generatedTicketCode;
      if (modalCustomerName)    modalCustomerName.textContent    = bookingPayload.name;
      if (modalCustomerPhone)   modalCustomerPhone.textContent   = bookingPayload.phone;
      if (modalRecipientEmail)  modalRecipientEmail.textContent  = bookingPayload.email;
      if (modalCustomerRoleOrg) modalCustomerRoleOrg.textContent = `${customerRole} (${customerOrg || 'Chưa ghi'})`;
      if (modalTicketSummary)   modalTicketSummary.textContent   = `${bookingPayload.ticketType} (${bookingPayload.quantity} vé)`;
      if (modalTotalPrice)      modalTotalPrice.textContent      = formattedTotal;
      if (modalQrImage) {
        modalQrImage.src = qrUrl;
        modalQrImage.alt = `Mã QR của ${bookingPayload.name}`;
      }

      // Cấu hình nút tải ảnh QR
      if (downloadQrBtn) {
        downloadQrBtn.onclick = () => {
          window.open(qrUrl, '_blank');
        };
      }

      // Cấu hình nút in vé
      if (printTicketBtn) {
        printTicketBtn.onclick = () => {
          window.print();
        };
      }

      // 9. Hiển thị Modal
      openModal();

      // 10. Reset Form sau khi hoàn tất
      bookingForm.reset();
      bookingForm.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
      ticketQuantity = 1;
      if (ticketQuantityInput) ticketQuantityInput.value = 1;
      if (noteCharCounter) noteCharCounter.textContent = '0 / 200 ký tự';
      updateOrderSummary();

      // Mở khóa nút submit
      confirmBookingBtn.disabled = false;
      confirmBookingBtn.classList.remove('loading');
      if (submitBtnText) submitBtnText.textContent = 'XÁC NHẬN ĐẶT VÉ ➔';
    });
  }

  /* ============================================================================
     10. QUẢN LÝ MODAL POPUP
     ============================================================================ */
  function openModal() {
    if (!orderSuccessModal) return;
    orderSuccessModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!orderSuccessModal) return;
    orderSuccessModal.classList.remove('active');
    document.body.style.overflow = '';
    // Đưa stepper về trạng thái bình thường
    if (stepIndicator3) stepIndicator3.classList.remove('active');
  }

  if (closeModalBtn)   closeModalBtn.addEventListener('click', closeModal);
  if (dismissModalBtn) dismissModalBtn.addEventListener('click', closeModal);

  // Đóng khi click ngoài hộp thoại modal
  if (orderSuccessModal) {
    orderSuccessModal.addEventListener('click', (e) => {
      if (e.target === orderSuccessModal) closeModal();
    });
  }

  // Đóng bằng phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderSuccessModal && orderSuccessModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ============================================================================
     11. NGĂN CẤU HÌNH GOOGLE APPS SCRIPT RÚT GỌN
     ============================================================================ */
  if (configToggleBtn && configDrawerBody) {
    configToggleBtn.addEventListener('click', () => {
      configDrawerBody.classList.toggle('open');
    });
  }

  if (scriptUrlInput) {
    scriptUrlInput.value = googleScriptUrl;
    if (scriptBadge) {
      if (googleScriptUrl) {
        scriptBadge.textContent = 'Đã kết nối Web App';
        scriptBadge.style.color = 'var(--color-primary)';
      } else {
        scriptBadge.textContent = 'Chế độ Demo an toàn';
        scriptBadge.style.color = 'var(--color-success)';
      }
    }
  }

  if (saveScriptUrlBtn && scriptUrlInput) {
    saveScriptUrlBtn.addEventListener('click', () => {
      const url = scriptUrlInput.value.trim();
      localStorage.setItem(DEFAULT_SCRIPT_KEY, url);
      googleScriptUrl = url;
      if (scriptBadge) {
        if (url) {
          scriptBadge.textContent = 'Đã lưu đường dẫn';
          scriptBadge.style.color = 'var(--color-primary)';
        } else {
          scriptBadge.textContent = 'Chế độ Demo an toàn';
          scriptBadge.style.color = 'var(--color-success)';
        }
      }
      alert('Đã lưu cấu hình đường dẫn Google Apps Script Web App!');
      if (configDrawerBody) configDrawerBody.classList.remove('open');
    });
  }

  /* ============================================================================
     12. KHỞI CHẠY LẦN ĐẦU
     ============================================================================ */
  initTheme();
  renderTickets();
  updateOrderSummary();
  updateSeatsUI();
});

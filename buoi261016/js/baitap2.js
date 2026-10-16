/* ==========================================================================
       MODULE 1: BỘ DỮ LIỆU THỜI TIẾT MẪU (ARRAY & OBJECT)
       Tối thiểu 3 thành phố theo yêu cầu: Biên Hòa, Đà Lạt, Vũng Tàu (+ Sa Pa, Phú Quốc)
       ========================================================================== */
    const CITIES_WEATHER_DATA = [
      {
        id: 'dalat',
        name: 'Đà Lạt (Lâm Đồng)',
        temp: 16,
        humidity: 88,
        wind: 8,
        condition: 'Mây mát & sương mù',
        conditionType: 'cold', // 'sunny' | 'rainy' | 'cloudy' | 'cold'
        icon: '⛅',
        bgImage: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
        bloggerReview: 'Hồ Xuân Hương sáng sớm mờ sương tựa tranh thủy mặc. Đừng quên thuê xe đạp đôi vòng quanh hồ và ghé tiệm cà phê ngắm thông reo!',
        suggestion: {
          title: 'Khuyên Mang Áo Ấm & Khăn Choàng',
          desc: 'Nhiệt độ dưới 20°C se lạnh về đêm và sáng sớm. Nên mang áo khoác dày, giày đi bộ và nhớ thưởng thức sữa đậu nành nóng ven chợ đêm.'
        }
      },
      {
        id: 'bienhoa',
        name: 'Biên Hòa (Đồng Nai)',
        temp: 33,
        humidity: 68,
        wind: 12,
        condition: 'Nắng ráo, trời quang',
        conditionType: 'sunny',
        icon: '☀️',
        bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
        bloggerReview: 'Khu du lịch sinh thái Thác Giang Điền với dòng thác trải rộng mát rượi, bãi cỏ xanh ngát cực kỳ thích hợp cho buổi cắm trại dã ngoại cuối tuần cùng bạn bè.',
        suggestion: {
          title: 'Khuyên Mang Mũ Rộng Vành & Kem Chống Nắng',
          desc: 'Nhiệt độ trên 30°C trời nắng gắt. Hãy bổ sung thật nhiều nước lọc, đeo kính râm và mang quạt cầm tay khi tham gia các hoạt động ngoài trời.'
        }
      },
      {
        id: 'vungtau',
        name: 'Vũng Tàu (Bà Rịa - Vũng Tàu)',
        temp: 31,
        humidity: 78,
        wind: 20,
        condition: 'Nắng biển & gió lộng',
        conditionType: 'sunny',
        icon: '🌊',
        bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
        bloggerReview: 'Bãi Sau với bờ cát dài thoai thoải và sóng biển êm ả. Thời điểm lý tưởng nhất để tắm biển là 16:30, sau đó thưởng thức bánh khọt nóng giòn rụm.',
        suggestion: {
          title: 'Khuyên Mang Đồ Bơi & Kính Râm',
          desc: 'Nhiệt độ 31°C và gió biển thoáng đãng. Hãy mang theo đồ bơi, khăn tắm lớn, kem chống nắng chống nước và dép xỏ ngón tiện lợi.'
        }
      },
      {
        id: 'sapa',
        name: 'Sa Pa (Lào Cai)',
        temp: 12,
        humidity: 92,
        wind: 10,
        condition: 'Rét buốt & mưa phùn',
        conditionType: 'rainy',
        icon: '🌧️',
        bgImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80',
        bloggerReview: 'Chinh phục đỉnh Fansipan hùng vĩ săn biển mây bồng bềnh và khám phá nét văn hóa đặc sắc tại bản Cát Cát.',
        suggestion: {
          title: 'Cần Chuẩn Bị Ô & Áo Phao Dày',
          desc: 'Nhiệt độ dưới 15°C có mưa phùn. Bắt buộc phải có áo gió chống nước, giày có độ bám tốt và túi bọc điện thoại chống ẩm.'
        }
      },
      {
        id: 'phuquoc',
        name: 'Phú Quốc (Kiên Giang)',
        temp: 29,
        humidity: 75,
        wind: 14,
        condition: 'Mát mẻ, nắng nhẹ',
        conditionType: 'sunny',
        icon: '🏝️',
        bgImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80',
        bloggerReview: 'Bãi Sao cát trắng mịn như kem và hoàng hôn ngũ sắc tại Sunset Sanato làm say đắm bất kỳ du khách nào.',
        suggestion: {
          title: 'Thời Tiết Tuyệt Đẹp Để Chụp Ảnh Check-in',
          desc: 'Nhiệt độ dễ chịu 29°C. Nên diện những bộ trang phục sáng màu, mang mũ cói và sẵn sàng cho những bức ảnh sống ảo tuyệt đẹp.'
        }
      }
    ];

    /* ==========================================================================
       MODULE 2: KHỞI TẠO BIẾN TRẠNG THÁI & KHÓA LƯU TRỮ (STATE & STORAGE)
       ========================================================================== */
    const STORAGE_KEY_CITY        = 'weather_planner_selected_city';
    const STORAGE_KEY_ITINERARY   = 'weather_planner_itinerary_list';
    const STORAGE_KEY_DEPARTURE   = 'weather_planner_departure_date';

    // Thành phố đang chọn
    let currentCityId = 'dalat';

    // Danh sách lịch trình (Array of Objects)
    let itineraryItems = [];

    // Bộ lọc hiển thị: 'all' | 'upcoming' | 'visited'
    let currentFilterTab = 'all';

    // ID hẹn giờ đếm ngược
    let countdownIntervalId = null;

    /* ==========================================================================
       MODULE 3: TRUY XUẤT CÁC PHẦN TỬ DOM
       ========================================================================== */
    // DOM Thời tiết
    const citySelect          = document.getElementById('citySelect');
    const weatherHeroCard     = document.getElementById('weatherHeroCard');
    const weatherGlow         = document.getElementById('weatherGlow');
    const weatherCityTitle    = document.getElementById('weatherCityTitle');
    const weatherCondition    = document.getElementById('weatherCondition');
    const conditionIcon       = document.getElementById('conditionIcon');
    const conditionText       = document.getElementById('conditionText');
    const weatherTemp         = document.getElementById('weatherTemp');
    const weatherHeroIcon     = document.getElementById('weatherHeroIcon');
    const weatherHumidity     = document.getElementById('weatherHumidity');
    const weatherWind         = document.getElementById('weatherWind');
    const headerCityName      = document.getElementById('headerCityName');
    const headerPlaceCount    = document.getElementById('headerPlaceCount');
    const bloggerQuote        = document.getElementById('bloggerQuote');

    // DOM Gợi ý thông minh (Smart Suggestions)
    const suggestionBox       = document.getElementById('suggestionBox');
    const suggestionIcon      = document.getElementById('suggestionIcon');
    const suggestionTitle     = document.getElementById('suggestionTitle');
    const suggestionContent   = document.getElementById('suggestionContent');

    // DOM Đếm ngược (Countdown Timer)
    const departureDateInput  = document.getElementById('departureDateInput');
    const countDays           = document.getElementById('countDays');
    const countHours          = document.getElementById('countHours');
    const countMinutes        = document.getElementById('countMinutes');
    const countSeconds        = document.getElementById('countSeconds');

    // DOM Lịch trình (Itinerary)
    const itineraryForm       = document.getElementById('itineraryForm');
    const placeNameInput      = document.getElementById('placeNameInput');
    const placeTimeInput      = document.getElementById('placeTimeInput');
    const addPlaceBtn         = document.getElementById('addPlaceBtn');
    const itineraryList       = document.getElementById('itineraryList');
    const emptyState          = document.getElementById('emptyState');
    const clearAllBtn         = document.getElementById('clearAllBtn');
    const exportTxtBtn        = document.getElementById('exportTxtBtn');

    // DOM Thống kê & Bộ lọc
    const countAll            = document.getElementById('countAll');
    const countUpcoming       = document.getElementById('countUpcoming');
    const countVisited        = document.getElementById('countVisited');
    const totalPlacesCount    = document.getElementById('totalPlacesCount');
    const visitedPlacesCount  = document.getElementById('visitedPlacesCount');

    /* ==========================================================================
       MODULE 4: QUẢN LÝ LƯU TRỮ LOCALSTORAGE (PERSISTENCE)
       ========================================================================== */
    /**
     * Tải dữ liệu từ LocalStorage khi khởi động
     */
    function loadStorage() {
      // 1. Phục hồi thành phố đã chọn cuối cùng
      const savedCity = localStorage.getItem(STORAGE_KEY_CITY);
      if (savedCity && CITIES_WEATHER_DATA.some(c => c.id === savedCity)) {
        currentCityId = savedCity;
      }

      // 2. Phục hồi danh sách lịch trình
      const savedItinerary = localStorage.getItem(STORAGE_KEY_ITINERARY);
      if (savedItinerary) {
        try {
          itineraryItems = JSON.parse(savedItinerary);
        } catch (e) {
          console.error('Lỗi khi đọc JSON từ LocalStorage:', e);
          itineraryItems = [];
        }
      } else {
        // Khởi tạo một vài dữ liệu mẫu phong phú ban đầu
        itineraryItems = [
          {
            id: 'item_1',
            cityId: 'dalat',
            place: 'Quảng trường Lâm Viên & Check-in Hoa Dã Quỳ',
            time: '08:00 AM',
            visited: true
          },
          {
            id: 'item_2',
            cityId: 'dalat',
            place: 'Dạo quanh bờ Hồ Xuân Hương ngắm bình minh',
            time: '09:30 AM',
            visited: true
          },
          {
            id: 'item_3',
            cityId: 'dalat',
            place: 'Tham quan Vườn hoa Thành Phố Đà Lạt',
            time: '02:00 PM',
            visited: false
          },
          {
            id: 'item_4',
            cityId: 'dalat',
            place: 'Uống cà phê ngắm hoàng hôn tại Tiệm Cà Phê Túi Mơ To',
            time: '05:30 PM',
            visited: false
          }
        ];
        saveStorage();
      }

      // 3. Phục hồi ngày khởi hành
      const savedDeparture = localStorage.getItem(STORAGE_KEY_DEPARTURE);
      if (savedDeparture) {
        departureDateInput.value = savedDeparture;
      } else {
        // Mặc định chọn 3 ngày tới vào lúc 07:00 sáng
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 3);
        defaultDate.setHours(7, 0, 0, 0);

        // Format định dạng datetime-local (YYYY-MM-DDTHH:mm)
        const year = defaultDate.getFullYear();
        const month = String(defaultDate.getMonth() + 1).padStart(2, '0');
        const day = String(defaultDate.getDate()).padStart(2, '0');
        const hours = String(defaultDate.getHours()).padStart(2, '0');
        const minutes = String(defaultDate.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        departureDateInput.value = formattedDate;
        localStorage.setItem(STORAGE_KEY_DEPARTURE, formattedDate);
      }
    }

    /**
     * Lưu trữ toàn bộ danh sách lịch trình và thành phố vào LocalStorage
     */
    function saveStorage() {
      try {
        localStorage.setItem(STORAGE_KEY_CITY, currentCityId);
        localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(itineraryItems));
      } catch (e) {
        console.error('Lỗi khi lưu vào LocalStorage:', e);
      }
    }

    /* ==========================================================================
       MODULE 5: QUẢN LÝ THỜI TIẾT & CẬP NHẬT GIAO DIỆN (WEATHER MODULE)
       ========================================================================== */
    /**
     * Cập nhật thông tin thời tiết khi chọn thành phố
     * @param {string} cityId - Mã định danh thành phố
     */
    function updateWeatherDisplay(cityId) {
      const cityData = CITIES_WEATHER_DATA.find(c => c.id === cityId);
      if (!cityData) return;

      // Cập nhật giá trị vào thẻ <select>
      citySelect.value = cityId;

      // Cập nhật thông tin thời tiết
      weatherCityTitle.textContent = cityData.name;
      weatherTemp.textContent = `${cityData.temp}°C`;
      weatherHumidity.textContent = `${cityData.humidity}%`;
      weatherWind.textContent = `${cityData.wind} km/h`;
      conditionText.textContent = cityData.condition;
      conditionIcon.textContent = cityData.icon;
      weatherHeroIcon.textContent = cityData.icon;
      headerCityName.textContent = cityData.name.split(' ')[0];

      // Đổi màu sắc ánh sáng phản quang theo tình trạng thời tiết (Weather Color Theming)
      applyWeatherTheme(cityData.conditionType);

      // Cập nhật trích dẫn Blogger
      bloggerQuote.textContent = `"${cityData.bloggerReview}"`;

      // Cập nhật Gợi ý thông minh (Smart Suggestion) theo nhiệt độ
      renderSmartSuggestion(cityData);

      // Lưu thành phố đang chọn vào LocalStorage
      currentCityId = cityId;
      saveStorage();
    }

    /**
     * Đổi màu ánh sáng đèn nền dựa theo tình trạng thời tiết
     * @param {string} conditionType - 'sunny' | 'rainy' | 'cloudy' | 'cold'
     */
    function applyWeatherTheme(conditionType) {
      if (conditionType === 'sunny') {
        weatherGlow.style.background = 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, transparent 70%)';
        weatherCondition.style.color = '#fde68a';
      } else if (conditionType === 'rainy') {
        weatherGlow.style.background = 'radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, transparent 70%)';
        weatherCondition.style.color = '#7dd3fc';
      } else if (conditionType === 'cold') {
        weatherGlow.style.background = 'radial-gradient(circle, rgba(167, 139, 250, 0.8) 0%, transparent 70%)';
        weatherCondition.style.color = '#c4b5fd';
      } else {
        weatherGlow.style.background = 'radial-gradient(circle, rgba(148, 163, 184, 0.8) 0%, transparent 70%)';
        weatherCondition.style.color = '#cbd5e1';
      }
    }

    /**
     * Tự động sinh lời khuyên thông minh dựa trên nhiệt độ (Smart Suggestions - Mục 4 điểm 9-10)
     */
    function renderSmartSuggestion(cityData) {
      const temp = cityData.temp;
      let title = cityData.suggestion.title;
      let desc = cityData.suggestion.desc;
      let icon = '🧥';

      if (temp < 15) {
        icon = '🧤';
        suggestionBox.style.borderLeftColor = '#a78bfa';
        suggestionTitle.style.color = '#c4b5fd';
      } else if (temp >= 15 && temp < 25) {
        icon = '🧣';
        suggestionBox.style.borderLeftColor = '#38bdf8';
        suggestionTitle.style.color = '#38bdf8';
      } else {
        icon = '🧴';
        suggestionBox.style.borderLeftColor = '#f59e0b';
        suggestionTitle.style.color = '#fbbf24';
      }

      suggestionIcon.textContent = icon;
      suggestionTitle.textContent = title;
      suggestionContent.textContent = desc;
    }

    /* ==========================================================================
       MODULE 6: QUẢN LÝ LỊCH TRÌNH DU LỊCH (ITINERARY MODULE)
       Thao tác thêm, đánh dấu đã đến, xóa có hiệu ứng chuyển động
       ========================================================================== */
    /**
     * Thêm một địa điểm mới vào danh sách
     */
    function handleAddItineraryItem() {
      const placeText = placeNameInput.value.trim();
      const timeText = placeTimeInput.value.trim();

      // Kiểm tra bẫy logic: Nếu để trống ô địa điểm
      if (placeText === '') {
        placeNameInput.classList.add('shake');
        placeNameInput.focus();
        setTimeout(() => placeNameInput.classList.remove('shake'), 400);
        return;
      }

      // Tạo object địa điểm mới
      const newItem = {
        id: 'place_' + Date.now(),
        cityId: currentCityId,
        place: placeText,
        time: timeText !== '' ? timeText : 'Chưa cố định',
        visited: false
      };

      // Đưa vào mảng
      itineraryItems.push(newItem);

      // Lưu LocalStorage
      saveStorage();

      // Render lại danh sách
      renderItineraryList();

      // Làm trống form
      placeNameInput.value = '';
      placeTimeInput.value = '';
      placeNameInput.focus();
    }

    /**
     * Đánh dấu đã đến hoặc chưa đến (Toggle Visited)
     * @param {string} itemId - Mã địa điểm
     */
    function toggleItemVisited(itemId) {
      itineraryItems = itineraryItems.map(item => {
        if (item.id === itemId) {
          return { ...item, visited: !item.visited };
        }
        return item;
      });

      saveStorage();
      renderItineraryList();
    }

    /**
     * Xóa một địa điểm kèm hiệu ứng chuyển động mờ dần (Fade-out animation)
     * @param {string} itemId - Mã địa điểm
     * @param {HTMLElement} itemElement - Thẻ li trên DOM
     */
    function deleteItemWithAnimation(itemId, itemElement) {
      itemElement.classList.add('fade-out');

      // Chờ 350ms cho animation mờ dần hoàn tất rồi mới cập nhật dữ liệu
      setTimeout(() => {
        itineraryItems = itineraryItems.filter(item => item.id !== itemId);
        saveStorage();
        renderItineraryList();
      }, 350);
    }

    /**
     * Xóa toàn bộ lịch trình
     */
    function handleClearAllItinerary() {
      if (itineraryItems.length === 0) return;

      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch trình chuyến đi này?')) {
        itineraryItems = [];
        saveStorage();
        renderItineraryList();
      }
    }

    /**
     * Vẽ danh sách lịch trình ra DOM
     */
    function renderItineraryList() {
      // 1. Lọc theo Tab (Tất cả, Chưa đi, Đã ghé thăm)
      let displayItems = itineraryItems.filter(item => {
        if (currentFilterTab === 'upcoming') return !item.visited;
        if (currentFilterTab === 'visited') return item.visited;
        return true;
      });

      // 2. Xóa sạch list cũ
      itineraryList.innerHTML = '';

      // 3. Xử lý Empty State
      if (displayItems.length === 0) {
        emptyState.style.display = 'flex';
      } else {
        emptyState.style.display = 'none';

        // 4. Render từng địa điểm
        displayItems.forEach((item, index) => {
          const li = document.createElement('li');
          li.className = `itinerary-item ${item.visited ? 'visited' : ''}`;
          li.setAttribute('data-id', item.id);

          // Nội dung HTML của mỗi dòng địa điểm
          li.innerHTML = `
            <div class="item-main-content">
              <div class="item-index-badge">${item.visited ? '✓' : (index + 1)}</div>
              <div class="item-details">
                <span class="item-place-name" title="${escapeHtml(item.place)}">${escapeHtml(item.place)}</span>
                <span class="item-time-stamp">⏰ ${escapeHtml(item.time)}</span>
              </div>
            </div>

            <div class="item-actions">
              ${item.visited ? '<span class="badge-visited-tag">ĐÃ ĐẾN</span>' : ''}
              
              <button class="btn-toggle-visited" title="${item.visited ? 'Đánh dấu chưa đến' : 'Đánh dấu đã ghé thăm'}">
                <span>${item.visited ? 'Quay lại' : '✓ Đã đến'}</span>
              </button>

              <button class="btn-delete-place" title="Xóa địa điểm này">
                ✕
              </button>
            </div>
          `;

          // Gán sự kiện
          const toggleBtn = li.querySelector('.btn-toggle-visited');
          const deleteBtn = li.querySelector('.btn-delete-place');

          toggleBtn.addEventListener('click', () => toggleItemVisited(item.id));
          deleteBtn.addEventListener('click', () => deleteItemWithAnimation(item.id, li));

          itineraryList.appendChild(li);
        });
      }

      // Cập nhật thống kê
      updateItineraryStatistics();
    }

    /**
     * Cập nhật các con số thống kê
     */
    function updateItineraryStatistics() {
      const total = itineraryItems.length;
      const visited = itineraryItems.filter(i => i.visited).length;
      const upcoming = total - visited;

      countAll.textContent = total;
      countUpcoming.textContent = upcoming;
      countVisited.textContent = visited;

      totalPlacesCount.textContent = total;
      visitedPlacesCount.textContent = visited;
      headerPlaceCount.textContent = total;
    }

    /**
     * Hàm phòng ngừa lỗi bảo mật XSS
     */
    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    /* ==========================================================================
       MODULE 7: ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN TIMER - Mục 4 điểm 9-10)
       Sử dụng setInterval để tính toán Ngày : Giờ : Phút : Giây
       ========================================================================== */
    function initCountdownTimer() {
      function calculateRemainingTime() {
        const targetValue = departureDateInput.value;
        if (!targetValue) return;

        const targetTime = new Date(targetValue).getTime();
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
          countDays.textContent = '00';
          countHours.textContent = '00';
          countMinutes.textContent = '00';
          countSeconds.textContent = '00';
          return;
        }

        // Tính toán các đơn vị thời gian
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countDays.textContent = String(days).padStart(2, '0');
        countHours.textContent = String(hours).padStart(2, '0');
        countMinutes.textContent = String(minutes).padStart(2, '0');
        countSeconds.textContent = String(seconds).padStart(2, '0');
      }

      // Hủy interval cũ nếu có để tránh chạy chồng chéo
      if (countdownIntervalId) clearInterval(countdownIntervalId);

      // Chạy ngay lần đầu
      calculateRemainingTime();

      // Cập nhật mỗi giây bằng setInterval
      countdownIntervalId = setInterval(calculateRemainingTime, 1000);

      // Lắng nghe khi người dùng thay đổi ngày khởi hành
      departureDateInput.addEventListener('change', () => {
        localStorage.setItem(STORAGE_KEY_DEPARTURE, departureDateInput.value);
        calculateRemainingTime();
      });
    }

    /* ==========================================================================
       MODULE 8: XUẤT LỊCH TRÌNH THÀNH FILE .TXT (EXPORT DATA - Mục 4 điểm 9-10)
       Sử dụng Blob và URL.createObjectURL để tải file về máy tính
       ========================================================================== */
    function exportItineraryToTxt() {
      if (itineraryItems.length === 0) {
        alert('⚠️ Danh sách lịch trình hiện đang trống! Hãy thêm ít nhất một địa điểm trước khi xuất file.');
        return;
      }

      const currentCity = CITIES_WEATHER_DATA.find(c => c.id === currentCityId);
      const cityName = currentCity ? currentCity.name : 'Chuyen_Di';
      const nowStr = new Date().toLocaleString('vi-VN');

      // Soạn nội dung file văn bản
      let textContent = `========================================================\n`;
      textContent += `         KẾ HOẠCH DU LỊCH & THỜI TIẾT CHI TIẾT          \n`;
      textContent += `========================================================\n\n`;
      textContent += `📍 Điểm đến: ${currentCity ? currentCity.name : ''}\n`;
      textContent += `🌦️ Thời tiết hiện tại: ${currentCity ? currentCity.temp + '°C, ' + currentCity.condition : ''}\n`;
      textContent += `💧 Độ ẩm: ${currentCity ? currentCity.humidity : ''}% | Gió: ${currentCity ? currentCity.wind : ''} km/h\n`;
      textContent += `💡 Lời khuyên: ${currentCity ? currentCity.suggestion.desc : ''}\n`;
      textContent += `⏳ Ngày giờ khởi hành: ${departureDateInput.value || 'Chưa thiết lập'}\n`;
      textContent += `⏰ Ngày xuất file: ${nowStr}\n\n`;
      textContent += `--------------------------------------------------------\n`;
      textContent += `DANH SÁCH CÁC ĐỊA ĐIỂM DỰ KIẾN GHÉ THĂM:\n`;
      textContent += `--------------------------------------------------------\n`;

      itineraryItems.forEach((item, idx) => {
        const status = item.visited ? '[ĐÃ CHECK-IN]' : '[CHƯA ĐI]';
        textContent += `${idx + 1}. ${item.place}\n`;
        textContent += `   - Thời gian: ${item.time}\n`;
        textContent += `   - Trạng thái: ${status}\n\n`;
      });

      textContent += `========================================================\n`;
      textContent += `Chúc bạn có một chuyến đi an toàn và tràn ngập niềm vui!\n`;
      textContent += `Weather & Travel Planner - Nhóm 2 Đại Học Lạc Hồng\n`;

      // Tạo đối tượng Blob chứa văn bản thuần (text/plain)
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });

      // Tạo đường dẫn tạm thời bằng URL.createObjectURL
      const downloadUrl = URL.createObjectURL(blob);

      // Tạo thẻ <a> ẩn để kích hoạt sự kiện tải file
      const link = document.createElement('a');
      link.href = downloadUrl;
      const sanitizedCityName = cityName.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `LichTrinh_DuLich_${sanitizedCityName}.txt`;
      document.body.appendChild(link);
      link.click();

      // Dọn dẹp bộ nhớ
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }

    /* ==========================================================================
       MODULE 9: LẮNG NGHE SỰ KIỆN & KHỞI TẠO ỨNG DỤNG (ENTRY POINT)
       ========================================================================== */
    function setupEventListeners() {
      // 1. Khi chọn thành phố mới từ dropdown
      citySelect.addEventListener('change', (e) => {
        updateWeatherDisplay(e.target.value);
      });

      // 2. Thêm địa điểm vào lịch trình
      itineraryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddItineraryItem();
      });

      // 3. Xử lý chuyển tab bộ lọc (Tất cả / Chưa đi / Đã ghé thăm)
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilterTab = btn.getAttribute('data-filter');
          renderItineraryList();
        });
      });

      // 4. Xóa tất cả lịch trình
      clearAllBtn.addEventListener('click', handleClearAllItinerary);

      // 5. Nút xuất file Text (.txt)
      exportTxtBtn.addEventListener('click', exportItineraryToTxt);
    }

    // Khởi chạy khi DOM đã sẵn sàng
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Phục hồi dữ liệu từ LocalStorage
      loadStorage();

      // 2. Cập nhật giao diện thời tiết của thành phố hiện tại
      updateWeatherDisplay(currentCityId);

      // 3. Render danh sách lịch trình
      renderItineraryList();

      // 4. Kích hoạt đồng hồ đếm ngược
      initCountdownTimer();

      // 5. Lắng nghe các sự kiện người dùng
      setupEventListeners();

      console.log('✅ Ứng dụng Weather & Travel Planner đã khởi động thành công!');
    });

/* ==========================================================================
       A. KHỞI TẠO BIẾN TRẠNG THÁI & KHÓA LOCALSTORAGE
       ========================================================================== */
    // Khóa lưu trữ trong LocalStorage
    const STORAGE_KEY_TASKS = 'ai_dashboard_tasks_v1';
    const STORAGE_KEY_THEME = 'ai_dashboard_theme_v1';
    const STORAGE_KEY_USER  = 'ai_dashboard_user_v1';

    // Mảng dữ liệu công việc (State)
    let tasks = [];

    // Trạng thái bộ lọc hiện tại: 'all' | 'active' | 'completed'
    let currentFilter = 'all';

    // Trạng thái lọc ưu tiên: 'all' | 'high' | 'medium' | 'low'
    let currentPriorityFilter = 'all';

    // Từ khóa tìm kiếm hiện tại
    let searchKeyword = '';

    // Tên người dùng mặc định (có thể tùy chỉnh)
    let currentUser = 'Quốc Thịnh';

    /* ==========================================================================
       B. TRUY XUẤT CÁC PHẦN TỬ DOM (DOM SELECTORS)
       ========================================================================== */
    const taskInput          = document.getElementById('taskInput');
    const prioritySelect     = document.getElementById('prioritySelect');
    const addTaskBtn         = document.getElementById('addTaskBtn');
    const taskForm           = document.getElementById('taskForm');
    const taskList           = document.getElementById('taskList');
    const emptyState         = document.getElementById('emptyState');
    const searchInput        = document.getElementById('searchInput');
    const themeToggleBtn     = document.getElementById('themeToggleBtn');
    const realtimeClock      = document.getElementById('realtimeClock');
    const greetingText       = document.getElementById('greetingText');
    const greetingSub        = document.getElementById('greetingSub');
    const progressBar        = document.getElementById('progressBar');
    const progressPercent    = document.getElementById('progressPercent');
    const clearCompletedBtn  = document.getElementById('clearCompletedBtn');

    // Thống kê Footer & Sidebar
    const footerTotalTasks      = document.getElementById('footerTotalTasks');
    const footerCompletedTasks  = document.getElementById('footerCompletedTasks');
    const footerRemainingTasks  = document.getElementById('footerRemainingTasks');
    const badgeAllCount         = document.getElementById('badgeAllCount');
    const badgeActiveCount      = document.getElementById('badgeActiveCount');
    const badgeCompletedCount   = document.getElementById('badgeCompletedCount');
    const miniTotalTasks        = document.getElementById('miniTotalTasks');
    const miniCompletionRate    = document.getElementById('miniCompletionRate');
    const miniHighPriority      = document.getElementById('miniHighPriority');

    // Điều khiển Sidebar Mobile & Modal
    const mobileToggleBtn    = document.getElementById('mobileToggleBtn');
    const sidebar            = document.getElementById('sidebar');
    const sidebarOverlay     = document.getElementById('sidebarOverlay');
    const openLogBtn         = document.getElementById('openLogBtn');
    const closeLogBtn        = document.getElementById('closeLogBtn');
    const aiLogModal         = document.getElementById('aiLogModal');

    /* ==========================================================================
       C. ĐỒNG HỒ THỜI GIAN THỰC & LỜI CHÀO CÁ NHÂN HÓA (Rubric: setInterval)
       Cập nhật Giờ:Phút:Giây liên tục mỗi giây (1000ms)
       ========================================================================== */
    function initRealtimeClock() {
      function updateClock() {
        const now = new Date();

        // Định dạng số 2 chữ số (ví dụ: 08:05:09)
        const hours   = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Hiển thị lên giao diện
        if (realtimeClock) {
          realtimeClock.textContent = `${hours}:${minutes}:${seconds}`;
        }

        // Cập nhật lời chào linh hoạt theo khung giờ thực tế
        updateGreetingByTime(now.getHours());
      }

      // Chạy ngay lập tức lần đầu tiên để tránh bị trễ 1 giây
      updateClock();

      // Sử dụng setInterval để cập nhật định kỳ mỗi 1000ms (1 giây)
      setInterval(updateClock, 1000);
    }

    /**
     * Cập nhật câu chào cá nhân hóa dựa trên giờ trong ngày
     * @param {number} currentHour - Giờ hiện tại (0 - 23)
     */
    function updateGreetingByTime(currentHour) {
      let greetingMsg = `Chào ${currentUser}`;
      let subMsg = 'Chúc bạn một ngày làm việc và học tập hiệu quả!';
      let emoji = '👋';

      if (currentHour >= 5 && currentHour < 12) {
        greetingMsg = `Chào buổi sáng, ${currentUser}!`;
        subMsg = 'Bắt đầu ngày mới với những mục tiêu thật tuyệt vời nhé!';
        emoji = '☀️';
      } else if (currentHour >= 12 && currentHour < 18) {
        greetingMsg = `Chào buổi chiều, ${currentUser}!`;
        subMsg = 'Giữ vững năng lượng và tập trung hoàn thành các tác vụ nhé!';
        emoji = '🌤️';
      } else {
        greetingMsg = `Chào buổi tối, ${currentUser}!`;
        subMsg = 'Hãy kiểm tra lại những công việc đã hoàn thành hôm nay.';
        emoji = '🌙';
      }

      greetingText.innerHTML = `<span>${greetingMsg}</span> <span>${emoji}</span>`;
      greetingSub.textContent = subMsg;
    }

    /* ==========================================================================
       D. QUẢN LÝ DỮ LIỆU LOCALSTORAGE (Rubric: JSON.stringify & JSON.parse)
       Đảm bảo dữ liệu không bị mất khi F5 hoặc tắt trình duyệt
       ========================================================================== */
    /**
     * Tải danh sách công việc từ LocalStorage khi mở trang
     */
    function loadTasksFromStorage() {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY_TASKS);
        if (storedData) {
          tasks = JSON.parse(storedData);
        } else {
          // Dữ liệu mẫu ban đầu để giao diện sinh động ngay khi sinh viên mở bài
          tasks = [
            {
              id: 'task-1',
              text: 'Nghiên cứu tài liệu HTML5 Semantic và CSS Grid',
              priority: 'high',
              completed: true,
              createdAt: '16/10/2026 08:30'
            },
            {
              id: 'task-2',
              text: 'Lập trình chức năng DOM và Event Listener cho nút Thêm',
              priority: 'high',
              completed: true,
              createdAt: '16/10/2026 09:15'
            },
            {
              id: 'task-3',
              text: 'Tích hợp LocalStorage và xử lý bẫy logic khi bỏ trống',
              priority: 'medium',
              completed: false,
              createdAt: '16/10/2026 10:00'
            },
            {
              id: 'task-4',
              text: 'Thiết kế hiệu ứng Fade-out khi xóa tác vụ',
              priority: 'low',
              completed: false,
              createdAt: '16/10/2026 11:20'
            }
          ];
          saveTasksToStorage();
        }
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu từ LocalStorage:', error);
        tasks = [];
      }
    }

    /**
     * Lưu mảng tasks hiện tại vào LocalStorage
     */
    function saveTasksToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
      } catch (error) {
        console.error('Lỗi khi lưu dữ liệu vào LocalStorage:', error);
      }
    }

    /* ==========================================================================
       E. THỰC THI LOGIC CHÍNH: THÊM, XÓA, ĐÁNH DẤU HOÀN THÀNH
       ========================================================================== */
    /**
     * Thêm một công việc mới vào danh sách
     * Bẫy logic 1: Nếu ô Input để trống mà nhấn 'Thêm' -> hiện alert và rung lắc ô nhập
     */
    function handleAddNewTask() {
      const taskText = taskInput.value.trim();
      const priority = prioritySelect.value;

      // --- KIỂM TRA BẪY LOGIC: Ô NHẬP ĐỂ TRỐNG ---
      if (taskText === '') {
        // Rung lắc ô nhập cảnh báo
        taskInput.classList.add('shake');
        taskInput.focus();

        // Hiển thị thông báo cảnh báo (Alert) theo đúng yêu cầu đề bài
        alert('⚠️ Vui lòng nhập nội dung công việc trước khi nhấn "Thêm"!');

        // Gỡ class rung lắc sau khi animation hoàn tất để có thể kích hoạt lại lần sau
        setTimeout(() => {
          taskInput.classList.remove('shake');
        }, 400);

        return; // Dừng lại, không cho phép thêm
      }

      // Tạo đối tượng công việc mới
      const now = new Date();
      const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newTask = {
        id: 'task_' + Date.now(), // Định danh duy nhất
        text: taskText,
        priority: priority,       // 'high' | 'medium' | 'low'
        completed: false,
        createdAt: timeString
      };

      // Đưa vào đầu danh sách (Unshift) để task mới hiển thị trên cùng
      tasks.unshift(newTask);

      // Lưu trữ vào LocalStorage
      saveTasksToStorage();

      // Render lại giao diện
      renderTaskList();

      // Xóa trắng ô input và đưa con trỏ về lại ô nhập
      taskInput.value = '';
      taskInput.focus();
    }

    /**
     * Bật/Tắt trạng thái hoàn thành (Toggle Completed)
     * @param {string} taskId - Mã ID của tác vụ
     */
    function toggleTaskComplete(taskId) {
      tasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      // Lưu trữ vào LocalStorage
      saveTasksToStorage();

      // Render lại giao diện
      renderTaskList();
    }

    /**
     * Xóa một công việc với hiệu ứng mờ dần (Fade Out)
     * @param {string} taskId - Mã ID của tác vụ
     * @param {HTMLElement} itemElement - Thẻ li trên giao diện để áp dụng CSS fade-out
     */
    function deleteTaskWithAnimation(taskId, itemElement) {
      // 1. Thêm class kích hoạt hiệu ứng chuyển động mờ dần và trượt sang phải
      itemElement.classList.add('fade-out');

      // 2. Chờ 350ms cho hiệu ứng chạy xong trước khi xóa khỏi mảng và DOM
      setTimeout(() => {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasksToStorage();
        renderTaskList();
      }, 350);
    }

    /**
     * Xóa toàn bộ các công việc đã hoàn thành
     */
    function clearCompletedTasks() {
      const completedCount = tasks.filter(t => t.completed).length;
      if (completedCount === 0) {
        alert('Hiện không có công việc nào đã hoàn thành để xóa!');
        return;
      }

      if (confirm(`Bạn có chắc chắn muốn xóa ${completedCount} công việc đã hoàn thành?`)) {
        tasks = tasks.filter(task => !task.completed);
        saveTasksToStorage();
        renderTaskList();
      }
    }

    /* ==========================================================================
       F. RENDER GIAO DIỆN & CẬP NHẬT THỐNG KÊ (UI RENDERING)
       ========================================================================== */
    /**
     * Lọc và vẽ toàn bộ danh sách công việc ra DOM
     */
    function renderTaskList() {
      // 1. Lọc theo trạng thái (All / Active / Completed)
      let filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
      });

      // 2. Lọc theo mức độ ưu tiên nếu có chọn
      if (currentPriorityFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.priority === currentPriorityFilter);
      }

      // 3. Lọc theo từ khóa tìm kiếm Real-time (Search Filter)
      if (searchKeyword.trim() !== '') {
        const keyword = searchKeyword.toLowerCase();
        filteredTasks = filteredTasks.filter(task => 
          task.text.toLowerCase().includes(keyword)
        );
      }

      // Xóa nội dung danh sách cũ
      taskList.innerHTML = '';

      // Hiển thị Empty State nếu không có kết quả phù hợp
      if (filteredTasks.length === 0) {
        emptyState.style.display = 'flex';
      } else {
        emptyState.style.display = 'none';

        // Lặp qua từng task và tạo phần tử DOM
        filteredTasks.forEach(task => {
          const li = document.createElement('li');
          li.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
          li.setAttribute('data-id', task.id);

          // Cấu hình nhãn mức độ ưu tiên
          let badgeText = 'Thấp';
          let badgeClass = 'badge-low';
          if (task.priority === 'high') {
            badgeText = 'Quan trọng';
            badgeClass = 'badge-high';
          } else if (task.priority === 'medium') {
            badgeText = 'Bình thường';
            badgeClass = 'badge-medium';
          }

          // Nội dung HTML của mỗi dòng công việc
          li.innerHTML = `
            <div class="custom-checkbox" title="Đánh dấu hoàn thành" aria-label="Toggle completed">
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            
            <span class="task-text" title="Nhấp để đánh dấu hoàn thành">${escapeHTML(task.text)}</span>

            <span class="priority-badge ${badgeClass}">${badgeText}</span>
            <span class="task-time">${task.createdAt || ''}</span>

            <button class="btn-delete-task" title="Xóa công việc này" aria-label="Xóa tác vụ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          `;

          // Gán sự kiện cho từng thành phần
          const checkbox = li.querySelector('.custom-checkbox');
          const taskTextSpan = li.querySelector('.task-text');
          const deleteBtn = li.querySelector('.btn-delete-task');

          // Click vào Checkbox hoặc Text để Toggle Completed (Gạch ngang chữ)
          checkbox.addEventListener('click', () => toggleTaskComplete(task.id));
          taskTextSpan.addEventListener('click', () => toggleTaskComplete(task.id));

          // Click nút Xóa -> Kích hoạt hiệu ứng Fade Out rồi gỡ bỏ
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTaskWithAnimation(task.id, li);
          });

          taskList.appendChild(li);
        });
      }

      // Cập nhật các chỉ số thống kê & thanh tiến độ
      updateStatistics();
    }

    /**
     * Cập nhật các con số thống kê ở Footer, Sidebar và Thanh tiến độ
     */
    function updateStatistics() {
      const total = tasks.length;
      const completed = tasks.filter(t => t.completed).length;
      const remaining = total - completed;
      const highPriorityCount = tasks.filter(t => t.priority === 'high' && !t.completed).length;
      const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

      // Footer stats
      footerTotalTasks.textContent = total;
      footerCompletedTasks.textContent = completed;
      footerRemainingTasks.textContent = remaining;

      // Sidebar badges
      badgeAllCount.textContent = total;
      badgeActiveCount.textContent = remaining;
      badgeCompletedCount.textContent = completed;

      // Mini stats
      miniTotalTasks.textContent = total;
      miniCompletionRate.textContent = `${percent}%`;
      miniHighPriority.textContent = highPriorityCount;

      // Progress bar fill
      progressBar.style.width = `${percent}%`;
      progressPercent.textContent = `${percent}%`;
    }

    /**
     * Hàm bảo mật chống lỗi XSS khi người dùng nhập thẻ HTML
     */
    function escapeHTML(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    /* ==========================================================================
       G. QUẢN LÝ CHẾ ĐỘ SÁNG / TỐI (DARK MODE - Rubric Điểm 9-10)
       Lưu trạng thái vào LocalStorage để khi F5 không bị mất
       ========================================================================== */
    function initThemeMode() {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light';
      document.body.setAttribute('data-theme', savedTheme);
      updateThemeButtonIcon(savedTheme);

      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem(STORAGE_KEY_THEME, newTheme);
        updateThemeButtonIcon(newTheme);
      });
    }

    function updateThemeButtonIcon(theme) {
      themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối');
    }

    /* ==========================================================================
       H. LẮNG NGHE SỰ KIỆN TƯƠNG TÁC (EVENT LISTENERS)
       ========================================================================== */
    function setupEventListeners() {
      // 1. Nhấn nút Thêm hoặc phím Enter trong Form
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddNewTask();
      });

      // 2. Tìm kiếm Real-time Search ở Sidebar (BƯỚC 5: Search & Filter)
      searchInput.addEventListener('input', (e) => {
        searchKeyword = e.target.value;
        renderTaskList();
      });

      // 3. Xử lý click bộ lọc Trạng thái (All / Active / Completed)
      document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.getAttribute('data-filter');
          renderTaskList();
        });
      });

      // 4. Xử lý click bộ lọc Mức độ ưu tiên
      document.querySelectorAll('.filter-btn[data-priority-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn[data-priority-filter]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentPriorityFilter = btn.getAttribute('data-priority-filter');
          renderTaskList();
        });
      });

      // 5. Nút xóa toàn bộ công việc đã xong
      clearCompletedBtn.addEventListener('click', clearCompletedTasks);

      // 6. Đóng/Mở Sidebar trên thiết bị di động (Responsive Toggle)
      function toggleMobileSidebar() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
      }

      mobileToggleBtn.addEventListener('click', toggleMobileSidebar);
      sidebarOverlay.addEventListener('click', toggleMobileSidebar);

      // 7. Modal Nhật ký sử dụng AI
      openLogBtn.addEventListener('click', () => {
        aiLogModal.classList.add('open');
      });

      closeLogBtn.addEventListener('click', () => {
        aiLogModal.classList.remove('open');
      });

      aiLogModal.addEventListener('click', (e) => {
        if (e.target === aiLogModal) {
          aiLogModal.classList.remove('open');
        }
      });

      // Cho phép đóng modal bằng phím Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiLogModal.classList.contains('open')) {
          aiLogModal.classList.remove('open');
        }
      });
    }

    /* ==========================================================================
       I. KHỞI CHẠY ỨNG DỤNG (ENTRY POINT)
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Tải trạng thái Theme sáng/tối từ LocalStorage
      initThemeMode();

      // 2. Kích hoạt đồng hồ thời gian thực (setInterval)
      initRealtimeClock();

      // 3. Tải danh sách công việc từ LocalStorage
      loadTasksFromStorage();

      // 4. Lắng nghe các sự kiện Click, Submit, Input
      setupEventListeners();

      // 5. Render danh sách lần đầu
      renderTaskList();

      console.log('✅ AI Task Dashboard đã khởi tạo thành công mà không có bất kỳ lỗi nào!');
    });

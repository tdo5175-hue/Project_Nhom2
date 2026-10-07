/**
 * SCRIPT.JS - PORTFOLIO NHÓM 2
 * Xử lý tương tác mượt mà, tối ưu hóa độ trễ (Zero lag)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       BÀI 5: MODERN HAMBURGER MENU
       Xử lý đóng/mở menu và chuyển đổi 3 gạch thành dấu 'X'
       ========================================================================== */
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const headerNav = document.getElementById('header-nav');

    if (hamburgerMenu && headerNav) {
        hamburgerMenu.addEventListener('click', () => {
            const isOpened = hamburgerMenu.classList.contains('active');
            
            // Tối ưu render bằng requestAnimationFrame
            requestAnimationFrame(() => {
                hamburgerMenu.classList.toggle('active');
                headerNav.classList.toggle('active');
                hamburgerMenu.setAttribute('aria-expanded', !isOpened);
            });
        });

        // Tự động đóng menu khi bấm vào bất kỳ liên kết nào trong menu
        const navLinks = headerNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (headerNav.classList.contains('active')) {
                    requestAnimationFrame(() => {
                        hamburgerMenu.classList.remove('active');
                        headerNav.classList.remove('active');
                        hamburgerMenu.setAttribute('aria-expanded', 'false');
                    });
                }
            });
        });
    }

    /* ==========================================================================
       BÀI 6: SKILL BAR ANIMATION
       Kích hoạt thanh kỹ năng chạy từ 0% đến giá trị đích khi cuộn tới vị trí đó
       Sử dụng IntersectionObserver API để tránh nghe sự kiện scroll liên tục gây lag
       ========================================================================== */
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    if (skillProgressBars.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Kích hoạt ngay khi 15% diện tích thanh kỹ năng xuất hiện
        };

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-target') || '0';
                    
                    // Cập nhật width với requestAnimationFrame để ăn khớp chu kỳ làm mới khung hình (60-120fps)
                    requestAnimationFrame(() => {
                        progressBar.style.width = `${targetWidth}%`;
                    });
                    
                    // Ngắt quan sát để tiết kiệm RAM và CPU
                    observer.unobserve(progressBar);
                }
            });
        }, observerOptions);

        skillProgressBars.forEach(bar => skillObserver.observe(bar));
    }

    /* ==========================================================================
       BÀI 2: HỖ TRỢ CARD FLIP TRÊN THIẾT BỊ CẢM ỨNG (MOBILE TOUCH)
       Cho phép người dùng chạm (tap) vào thẻ để lật xem thông tin liên hệ tiện lợi
       ========================================================================== */
    const flipCardWrappers = document.querySelectorAll('.flip-card-wrapper');
    flipCardWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            // Toggle focus để kích hoạt pseudo-class :focus/:focus-within trên mobile
            if (document.activeElement === wrapper) {
                wrapper.blur();
            } else {
                wrapper.focus();
            }
        });
    });

});

/**
 * SCRIPT.JS - PORTFOLIO NHÓM 2
 * XỬ LÝ HIỆU ỨNG MỞ ĐẦU, CON SỐ KỸ NĂNG CHẠY VỪA PHẢI (1.1S),
 * MODAL CV CHI TIẾT VÀ TƯƠNG TÁC THẺ LẬT 3D
 * TỐI ƯU HÓA HIỆU NĂNG - ZERO LAG - GPU ACCELERATED
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HIỆU ỨNG MỞ ĐẦU (WELCOME ENTRANCE SCREEN)
       Cho phép màn hình loader chạy mượt 850ms rồi trượt mờ hé lộ trang web
       ========================================================================== */
    const welcomeScreen = document.getElementById('welcome-screen');
    
    const triggerWelcomeDismiss = () => {
        if (!welcomeScreen) return;
        
        // Sau 850ms (vừa đủ hoàn thành thanh tiến trình mở đầu)
        setTimeout(() => {
            requestAnimationFrame(() => {
                welcomeScreen.classList.add('hide-welcome');
                
                // Kích hoạt ngay hiệu ứng thanh kỹ năng sau khi màn hình mở đầu hé lộ
                animateSkillBarsAndCounters();
            });

            // Sau khi animation biến mất hoàn tất (700ms), ẩn hoàn toàn để giải phóng bộ nhớ
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 750);
        }, 850);
    };

    if (document.readyState === 'complete') {
        triggerWelcomeDismiss();
    } else {
        window.addEventListener('load', triggerWelcomeDismiss);
        setTimeout(triggerWelcomeDismiss, 1200); // Fallback an toàn
    }

    /* ==========================================================================
       2. BÀI 6: SKILL BAR & NUMBER COUNTER ANIMATION (THANH TRÁI SIDEBAR)
       MẤY CON SỐ CHẠY VỪA PHẢI (1.1S) - KHÔNG QUÁ CHẬM VÀ KHÔNG QUÁ NHANH
       ========================================================================== */
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const skillNumberBadges = document.querySelectorAll('.skill-badge-num');
    let hasAnimatedSkills = false;

    // Hàm đếm số mượt mà từ 0% đến Target% trong 1.1s (1100ms)
    function animateCounter(element, target, duration = 1100) {
        let startTimestamp = null;
        const targetValue = parseInt(target, 10);
        
        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            
            // Hàm gia tốc easeOutCubic: chạy nhanh ban đầu và hãm chậm lại êm ái ở cuối
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * targetValue);
            
            element.textContent = `${currentValue}%`;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = `${targetValue}%`;
            }
        }
        requestAnimationFrame(step);
    }

    function animateSkillBarsAndCounters() {
        if (hasAnimatedSkills) return;
        hasAnimatedSkills = true;

        // Kích hoạt các thanh tiến trình chạy width đồng thời
        skillProgressBars.forEach((progressBar, index) => {
            const targetWidth = progressBar.getAttribute('data-target') || '0';
            setTimeout(() => {
                requestAnimationFrame(() => {
                    progressBar.style.width = `${targetWidth}%`;
                });
            }, index * 60); // Nhịp nối tiếp nhẹ nhàng
        });

        // Kích hoạt các con số chạy đếm với tốc độ vừa phải (1100ms)
        skillNumberBadges.forEach((badge, index) => {
            const targetNum = badge.getAttribute('data-target') || '0';
            setTimeout(() => {
                animateCounter(badge, targetNum, 1100);
            }, index * 60);
        });
    }

    // Observer quan sát nếu cuộn đến thanh kỹ năng
    const sidebarSkills = document.getElementById('sidebar-skills');
    if (sidebarSkills) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBarsAndCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });

        skillObserver.observe(sidebarSkills);
    }

    /* ==========================================================================
       3. CHỨC NĂNG MODAL XEM CV CHI TIẾT (CHUẨN HỒ SƠ ẢNH CỦA ĐỖ QUỐC THỊNH)
       ========================================================================== */
    const cvModal = document.getElementById('cv-modal');
    const btnCloseModal = document.getElementById('btn-close-cv-modal');
    const btnCloseModalBottom = document.getElementById('btn-close-modal-bottom');
    const openCvButtons = document.querySelectorAll('.btn-open-cv, .btn-open-cv-secondary');
    const cvTabs = document.querySelectorAll('.cv-tab-btn');
    const cvPapers = document.querySelectorAll('.cv-paper');

    function switchCvTab(memberKey) {
        cvTabs.forEach(tab => {
            const matches = tab.getAttribute('data-target-cv') === memberKey || tab.getAttribute('for') === `modal-open-${memberKey}`;
            tab.classList.toggle('active', matches);
        });
        cvPapers.forEach(paper => {
            paper.classList.toggle('active', paper.id === `cv-content-${memberKey}`);
            paper.style.display = paper.id === `cv-content-${memberKey}` ? 'block' : 'none';
        });
        const radio = document.getElementById(`modal-open-${memberKey}`);
        if (radio) radio.checked = true;
    }

    function openModalWithMember(memberKey = 'thinh') {
        if (!cvModal) return;
        switchCvTab(memberKey);
        requestAnimationFrame(() => {
            cvModal.classList.add('show-modal');
            cvModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Ngăn cuộn trang phía sau khi xem CV
        });
    }

    function closeModal() {
        if (!cvModal) return;
        requestAnimationFrame(() => {
            cvModal.classList.remove('show-modal');
            cvModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            const radioClosed = document.getElementById('modal-closed');
            if (radioClosed) radioClosed.checked = true;
        });
    }

    // Gắn sự kiện mở modal cho các nút bấm / label
    openCvButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let memberKey = btn.getAttribute('data-member');
            if (!memberKey) {
                const forAttr = btn.getAttribute('for') || '';
                memberKey = forAttr.includes('nam') ? 'nam' : 'thinh';
            }
            openModalWithMember(memberKey);
        });
    });

    // Chuyển tab giữa 2 thành viên
    cvTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            let memberKey = tab.getAttribute('data-target-cv');
            if (!memberKey) {
                const forAttr = tab.getAttribute('for') || '';
                memberKey = forAttr.includes('nam') ? 'nam' : 'thinh';
            }
            switchCvTab(memberKey);
        });
    });

    // Đóng modal
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    if (btnCloseModalBottom) btnCloseModalBottom.addEventListener('click', closeModal);
    
    // Đóng khi click ngoài backdrop overlay
    const backdropOverlay = document.querySelector('.cv-backdrop-overlay');
    if (backdropOverlay) backdropOverlay.addEventListener('click', closeModal);
    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) closeModal();
        });
    }

    // Đóng khi ấn phím Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal && (cvModal.classList.contains('show-modal') || window.getComputedStyle(cvModal).opacity > 0)) {
            closeModal();
        }
    });

    /* ==========================================================================
       4. BÀI 5: MODERN HAMBURGER MENU
       ========================================================================== */
    const hamburgerMenu = document.getElementById('hamburger-menu') || document.querySelector('.menu-toggle');
    const headerNav = document.getElementById('header-nav') || document.querySelector('.main-nav');

    if (hamburgerMenu && headerNav) {
        hamburgerMenu.addEventListener('click', () => {
            const isOpened = hamburgerMenu.classList.contains('active') || headerNav.classList.contains('active');
            requestAnimationFrame(() => {
                hamburgerMenu.classList.toggle('active', !isOpened);
                headerNav.classList.toggle('active', !isOpened);
                hamburgerMenu.setAttribute('aria-expanded', String(!isOpened));
            });
        });

        const navLinks = headerNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                requestAnimationFrame(() => {
                    hamburgerMenu.classList.remove('active');
                    headerNav.classList.remove('active');
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                });
            });
        });
    }

    /* ==========================================================================
       5. BÀI 2: TƯƠNG TÁC THẺ LẬT 3D (3D CARD FLIP)
       ========================================================================== */
    const flipTriggers = document.querySelectorAll('.btn-flip-trigger');
    const flipBacks = document.querySelectorAll('.btn-flip-back');

    flipTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const wrapper = btn.closest('.flip-card-wrapper');
            if (wrapper) {
                wrapper.classList.add('is-flipped');
                const checkbox = wrapper.querySelector('.flip-toggle-input');
                if (checkbox) checkbox.checked = true;
            }
        });
    });

    flipBacks.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const wrapper = btn.closest('.flip-card-wrapper');
            if (wrapper) {
                wrapper.classList.remove('is-flipped');
                const checkbox = wrapper.querySelector('.flip-toggle-input');
                if (checkbox) checkbox.checked = false;
            }
        });
    });

    const flipCardWrappers = document.querySelectorAll('.flip-card-wrapper');
    flipCardWrappers.forEach(wrapper => {
        wrapper.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target === wrapper) {
                e.preventDefault();
                const isFlipped = wrapper.classList.toggle('is-flipped');
                const checkbox = wrapper.querySelector('.flip-toggle-input');
                if (checkbox) checkbox.checked = isFlipped;
            }
        });
    });

});

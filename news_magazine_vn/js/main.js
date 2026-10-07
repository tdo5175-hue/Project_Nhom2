/**
 * MAIN.JS — SCRIPT DÙNG CHUNG CHO INDEX / ARTICLE / PORTFOLIO
 * - Giao diện Sáng / Tối (lưu localStorage)
 * - Header đổi trạng thái khi cuộn, menu mobile, ô tìm kiếm
 * - Khởi tạo AOS (Animate On Scroll) + dự phòng khi không tải được
 * - Micro-interactions: ripple khi click, nút lên đầu trang, toast
 * - Thanh tiến trình cuộn (dùng transform: scaleX — không gây reflow)
 */
(function () {
    'use strict';

    const root = document.documentElement;
    const THEME_KEY = 'tm-theme';

    /* ---------------------------------------------------------------
       1. GIAO DIỆN SÁNG / TỐI
       --------------------------------------------------------------- */
    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        document.querySelectorAll('.theme-toggle').forEach((btn) => {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
            btn.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
        });
    }

    function initTheme() {
        applyTheme(root.getAttribute('data-theme') || 'light');
        document.querySelectorAll('.theme-toggle').forEach((btn) => {
            btn.addEventListener('click', () => {
                const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                applyTheme(next);
                try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* bỏ qua */ }
                showToast(next === 'dark' ? '🌙 Đã bật giao diện tối' : '☀️ Đã bật giao diện sáng');
            });
        });
    }

    /* ---------------------------------------------------------------
       2. TOAST THÔNG BÁO
       --------------------------------------------------------------- */
    let toastEl = null;
    let toastTimer = null;

    function showToast(message) {
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.className = 'toast';
            toastEl.setAttribute('role', 'status');
            toastEl.setAttribute('aria-live', 'polite');
            document.body.appendChild(toastEl);
        }
        toastEl.textContent = message;
        requestAnimationFrame(() => toastEl.classList.add('is-visible'));
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
    }
    window.showToast = showToast;

    /* ---------------------------------------------------------------
       3. HEADER KHI CUỘN + THANH TIẾN TRÌNH + NÚT LÊN ĐẦU TRANG
       Gộp chung vào 1 vòng requestAnimationFrame để tối ưu hiệu năng
       --------------------------------------------------------------- */
    function initScrollUI() {
        const header = document.querySelector('.site-header');
        const progress = document.querySelector('.progress-bar');
        const toTop = document.querySelector('.back-to-top');
        const progressTarget = document.querySelector('[data-progress-target]');
        let ticking = false;

        function update() {
            const y = window.scrollY;
            if (header) header.classList.toggle('is-scrolled', y > 10);
            if (toTop) toTop.classList.toggle('is-visible', y > 600);

            if (progress) {
                let ratio;
                if (progressTarget) {
                    const rect = progressTarget.getBoundingClientRect();
                    const total = rect.height - window.innerHeight;
                    ratio = total > 0 ? -rect.top / total : 1;
                } else {
                    const total = document.documentElement.scrollHeight - window.innerHeight;
                    ratio = total > 0 ? y / total : 0;
                }
                progress.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        update();

        if (toTop) {
            toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }
    }

    /* ---------------------------------------------------------------
       4. MENU MOBILE (off-canvas trượt bằng translateX)
       --------------------------------------------------------------- */
    function initMobileNav() {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.main-nav');
        const backdrop = document.querySelector('.nav-backdrop');
        if (!toggle || !nav) return;

        function setOpen(open) {
            toggle.setAttribute('aria-expanded', String(open));
            nav.classList.toggle('is-open', open);
            if (backdrop) backdrop.classList.toggle('is-open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        }

        toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
        if (backdrop) backdrop.addEventListener('click', () => setOpen(false));
        nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1080 && nav.classList.contains('is-open')) setOpen(false);
        });
    }

    /* ---------------------------------------------------------------
       5. Ô TÌM KIẾM
       --------------------------------------------------------------- */
    function initSearch() {
        const toggle = document.querySelector('.search-toggle');
        const panel = document.querySelector('.search-panel');
        if (!toggle || !panel) return;
        const input = panel.querySelector('input');

        function setOpen(open) {
            panel.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            if (open && input) setTimeout(() => input.focus(), 150);
        }

        toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
            if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
                e.preventDefault();
                setOpen(true);
            }
        });

        panel.querySelectorAll('[data-keyword]').forEach((btn) => {
            btn.addEventListener('click', () => {
                if (input) {
                    input.value = btn.dataset.keyword;
                    input.form.requestSubmit ? input.form.requestSubmit() : input.form.submit();
                }
            });
        });
    }

    /* ---------------------------------------------------------------
       6. RIPPLE KHI CLICK NÚT (micro-interaction)
       --------------------------------------------------------------- */
    function initRipple() {
        document.addEventListener('pointerdown', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;
            const rect = btn.getBoundingClientRect();
            const dot = document.createElement('span');
            dot.className = 'ripple';
            // Đặt vị trí điểm gợn bằng transform-origin tĩnh (không animate left/top)
            dot.style.left = `${e.clientX - rect.left}px`;
            dot.style.top = `${e.clientY - rect.top}px`;
            btn.appendChild(dot);
            dot.addEventListener('animationend', () => dot.remove());
        });
    }

    /* ---------------------------------------------------------------
       7. ẢNH LỖI -> ẩn ảnh, giữ nền gradient dự phòng
       --------------------------------------------------------------- */
    function initImageFallback() {
        document.querySelectorAll('.media img').forEach((img) => {
            const markMissing = () => img.classList.add('img-missing');
            if (img.complete && img.naturalWidth === 0) markMissing();
            img.addEventListener('error', markMissing);
        });
    }

    /* ---------------------------------------------------------------
       8. NGÀY HIỆN TẠI (tiếng Việt)
       --------------------------------------------------------------- */
    function initDate() {
        const days = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const text = `${days[now.getDay()]}, ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
        document.querySelectorAll('[data-today]').forEach((el) => {
            el.textContent = text;
            el.setAttribute('datetime', `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
        });
        document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = now.getFullYear(); });
    }

    /* ---------------------------------------------------------------
       9. ĐĂNG KÝ BẢN TIN (mô phỏng, không gửi dữ liệu)
       --------------------------------------------------------------- */
    function initNewsletter() {
        document.querySelectorAll('.js-newsletter').forEach((form) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = form.querySelector('input[type="email"]');
                if (input && input.checkValidity()) {
                    form.classList.add('is-done');
                    showToast('✅ Cảm ơn bạn! Đã đăng ký nhận bản tin.');
                    input.value = '';
                } else if (input) {
                    input.reportValidity();
                }
            });
        });
    }

    /* ---------------------------------------------------------------
       10. AOS — ANIMATE ON SCROLL
       --------------------------------------------------------------- */
    function initAOS() {
        if (typeof window.AOS === 'undefined') {
            root.classList.add('no-aos');
            return;
        }
        // Khi phần tử đã xuất hiện xong -> gắn class aos-done để hover không bị delay
        // (đăng ký TRƯỚC khi init để bắt cả các phần tử đã nằm trong màn hình)
        document.addEventListener('aos:in', (e) => {
            const el = e.detail;
            if (!el || !el.dataset) return;
            const total = (parseInt(el.dataset.aosDuration, 10) || 800) + (parseInt(el.dataset.aosDelay, 10) || 0);
            setTimeout(() => el.classList.add('aos-done'), total + 60);
        });
        window.AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            anchorPlacement: 'top-bottom'
        });
        // Làm mới vị trí khi ảnh tải xong
        window.addEventListener('load', () => window.AOS.refresh());
    }

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initScrollUI();
        initMobileNav();
        initSearch();
        initRipple();
        initImageFallback();
        initDate();
        initNewsletter();
        initAOS();
    });
})();

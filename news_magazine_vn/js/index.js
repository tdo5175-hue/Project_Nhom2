/**
 * INDEX.JS — TƯƠNG TÁC RIÊNG CỦA TRANG CHỦ TIN MỚI
 * - Lọc tin theo 7 chuyên mục (tabs) + tìm kiếm theo từ khóa tức thì
 * - Lưu bài viết (Bookmark localStorage)
 * - Bộ đếm số liệu sinh động (Count-up animation)
 * - Thẻ lật 3D hỗ trợ chạm (mobile) & bàn phím
 * - Scrollspy: tự động tô sáng menu theo chuyên mục đang cuộn
 * - Thăm dò ý kiến độc giả (Interactive Reader Poll)
 * - Form đăng ký nhận bản tin (Newsletter)
 * - Cập nhật ngày hôm nay tự động theo định dạng tiếng Việt
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ---------- 1. CẬP NHẬT NGÀY THÁNG TIẾNG VIỆT ---------- */
    const todayEl = document.querySelector('[data-today]');
    if (todayEl) {
        const now = new Date();
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayName = days[now.getDay()];
        const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        todayEl.textContent = `${dayName}, ${dateStr}`;
    }

    /* ---------- 2. LỌC TIN THEO CHUYÊN MỤC & TÌM KIẾM ---------- */
    const cards = Array.from(document.querySelectorAll('#news-grid .news-card'));
    const tabs = document.querySelectorAll('.filter-tab');
    const emptyState = document.getElementById('empty-state');
    const resultText = document.getElementById('search-result');
    let currentFilter = 'all';
    let currentKeyword = '';

    /* Bỏ dấu tiếng Việt để tìm kiếm thân thiện hơn */
    const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

    function applyFilters() {
        const kw = normalize(currentKeyword.trim());
        let visible = 0;

        cards.forEach((card) => {
            const matchCat = currentFilter === 'all' || card.dataset.category === currentFilter;
            const matchKw = !kw || normalize(card.textContent).includes(kw);
            const show = matchCat && matchKw;

            if (show) {
                visible++;
                card.classList.remove('is-hidden');
                requestAnimationFrame(() => card.classList.remove('is-hiding'));
            } else if (!card.classList.contains('is-hidden')) {
                card.classList.add('is-hiding');
                setTimeout(() => {
                    if (card.classList.contains('is-hiding')) card.classList.add('is-hidden');
                }, 280);
            }
        });

        if (emptyState) emptyState.hidden = visible !== 0;

        if (resultText) {
            if (kw) {
                resultText.innerHTML = '';
                resultText.append(`Tìm thấy ${visible} bài viết cho từ khóa "${currentKeyword}". `);
                const clear = document.createElement('button');
                clear.type = 'button';
                clear.textContent = 'Xóa bộ lọc tìm kiếm';
                clear.addEventListener('click', () => {
                    currentKeyword = '';
                    const input = document.getElementById('site-search');
                    if (input) input.value = '';
                    applyFilters();
                });
                resultText.append(clear);
            } else {
                resultText.textContent = '';
            }
        }
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => {
                t.classList.toggle('is-active', t === tab);
                t.setAttribute('aria-selected', String(t === tab));
            });
            currentFilter = tab.dataset.filter;
            applyFilters();
        });
    });

    /* ---------- 3. TÌM KIẾM BÀI VIẾT ---------- */
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = searchForm.querySelector('input');
            currentKeyword = input ? input.value : '';
            currentFilter = 'all';
            tabs.forEach((t) => {
                const on = t.dataset.filter === 'all';
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', String(on));
            });
            applyFilters();
            document.querySelector('.search-panel')?.classList.remove('is-open');
            document.querySelector('.search-toggle')?.setAttribute('aria-expanded', 'false');
            document.getElementById('tin-moi')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Các nút gợi ý từ khóa
    document.querySelectorAll('.search-hint button').forEach((btn) => {
        btn.addEventListener('click', () => {
            const kw = btn.dataset.keyword || btn.textContent;
            const input = document.getElementById('site-search');
            if (input) input.value = kw;
            currentKeyword = kw;
            currentFilter = 'all';
            tabs.forEach((t) => {
                const on = t.dataset.filter === 'all';
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', String(on));
            });
            applyFilters();
            document.querySelector('.search-panel')?.classList.remove('is-open');
            document.querySelector('.search-toggle')?.setAttribute('aria-expanded', 'false');
            document.getElementById('tin-moi')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ---------- 4. LƯU BÀI VIẾT (BOOKMARK LOCALSTORAGE) ---------- */
    const SAVE_KEY = 'tm-saved';
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(SAVE_KEY)) || []; } catch (e) { saved = []; }

    document.querySelectorAll('.save-btn').forEach((btn) => {
        const id = btn.dataset.save;
        if (saved.includes(id)) {
            btn.setAttribute('aria-pressed', 'true');
            btn.setAttribute('aria-label', 'Bỏ lưu bài viết');
        }

        btn.addEventListener('click', () => {
            const on = btn.getAttribute('aria-pressed') !== 'true';
            btn.setAttribute('aria-pressed', String(on));
            btn.setAttribute('aria-label', on ? 'Bỏ lưu bài viết' : 'Lưu bài viết');
            saved = on ? [...new Set([...saved, id])] : saved.filter((x) => x !== id);
            try { localStorage.setItem(SAVE_KEY, JSON.stringify(saved)); } catch (e) { /* bỏ qua */ }
            if (window.showToast) window.showToast(on ? '🔖 Đã lưu bài viết vào mục yêu thích' : 'Đã bỏ lưu bài viết');
        });
    });

    /* ---------- 5. BỘ ĐẾM SỐ LIỆU TỰ ĐỘNG CHẠY KHI CUỘN TỚI ---------- */
    const counters = document.querySelectorAll('[data-count]');
    const countUp = (el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1400;
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target).toLocaleString('vi-VN');
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    countUp(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach((c) => io.observe(c));
    } else {
        counters.forEach((c) => { c.textContent = c.dataset.count; });
    }

    /* ---------- 6. THẺ LẬT 3D (FLIP CARDS) ---------- */
    document.querySelectorAll('.flip').forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            card.classList.toggle('is-flipped');
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('is-flipped');
            }
        });
    });

    /* ---------- 7. SCROLLSPY TÔ SÁNG MENU THEO CHUYÊN MỤC ---------- */
    const navLinks = Array.from(document.querySelectorAll('.main-nav .nav-link[href^="#"]'));
    const sections = navLinks
        .map((a) => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = `#${entry.target.id}`;
                navLinks.forEach((a) => {
                    const active = a.getAttribute('href') === id;
                    a.classList.toggle('is-active', active);
                    if (active) a.setAttribute('aria-current', 'location');
                    else a.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-40% 0px -50% 0px' });
        sections.forEach((s) => spy.observe(s));
    }

    /* ---------- 8. THĂM DÒ Ý KIẾN BẠN ĐỌC (READER POLL) ---------- */
    const pollCard = document.getElementById('reader-poll');
    const btnVote = document.getElementById('btn-vote');
    const pollMsg = document.getElementById('poll-msg');

    if (pollCard && btnVote) {
        const POLL_KEY = 'tm-poll-voted';
        const hasVoted = localStorage.getItem(POLL_KEY);

        const showResults = () => {
            pollCard.classList.add('has-voted');
            pollCard.querySelectorAll('.poll-bar').forEach((bar) => {
                const pct = bar.dataset.pct || '0';
                bar.style.width = `${pct}%`;
            });
            if (pollMsg) pollMsg.textContent = '✓ Cảm ơn bạn! Ý kiến của bạn đã được ghi nhận.';
            btnVote.disabled = true;
            btnVote.textContent = 'Đã bình chọn';
        };

        if (hasVoted) {
            showResults();
        }

        btnVote.addEventListener('click', () => {
            const selected = pollCard.querySelector('input[name="poll-choice"]:checked');
            if (!selected) {
                if (window.showToast) window.showToast('Vui lòng chọn một phương án bình chọn!');
                return;
            }
            try { localStorage.setItem(POLL_KEY, selected.value); } catch (e) {}
            showResults();
            if (window.showToast) window.showToast('🎉 Cảm ơn bạn đã tham gia khảo sát ý kiến!');
        });
    }

    /* ---------- 9. FORM ĐĂNG KÝ NHẬN BẢN TIN (NEWSLETTER) ---------- */
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput ? emailInput.value.trim() : '';
            if (!email || !email.includes('@')) {
                if (window.showToast) window.showToast('Vui lòng nhập địa chỉ email hợp lệ!');
                emailInput?.focus();
                return;
            }
            if (window.showToast) window.showToast('✉️ Đăng ký thành công! Bạn sẽ nhận được bản tin vào sáng mai.');
            if (emailInput) emailInput.value = '';
        });
    }
});

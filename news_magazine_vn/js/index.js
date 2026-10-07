/**
 * INDEX.JS — TƯƠNG TÁC RIÊNG CỦA TRANG CHỦ
 * - Lọc tin theo chuyên mục (tabs) + tìm kiếm theo từ khóa
 * - Lưu bài viết (localStorage)
 * - Bộ đếm số liệu chạy khi cuộn tới
 * - Thẻ lật (flip) hỗ trợ chạm / bàn phím
 * - Scrollspy: tô sáng menu theo section đang xem
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const cards = Array.from(document.querySelectorAll('#news-grid .news-card'));
    const tabs = document.querySelectorAll('.filter-tab');
    const emptyState = document.getElementById('empty-state');
    const resultText = document.getElementById('search-result');
    let currentFilter = 'all';
    let currentKeyword = '';

    /* Bỏ dấu tiếng Việt để tìm kiếm thân thiện hơn */
    const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

    /* ---------- 1. Ẩn / hiện thẻ bằng opacity + scale rồi mới display:none ---------- */
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
                }, 300);
            }
        });

        if (emptyState) emptyState.hidden = visible !== 0;

        if (resultText) {
            if (kw) {
                resultText.innerHTML = '';
                resultText.append(`Tìm thấy ${visible} bài viết cho "${currentKeyword}".`);
                const clear = document.createElement('button');
                clear.type = 'button';
                clear.textContent = 'Xóa tìm kiếm';
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

    /* ---------- 2. Tìm kiếm ---------- */
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = searchForm.querySelector('input');
            currentKeyword = input ? input.value : '';
            // Khi tìm kiếm: đưa bộ lọc về "Tất cả"
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

    /* ---------- 3. Lưu bài viết ---------- */
    const SAVE_KEY = 'tm-saved';
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(SAVE_KEY)) || []; } catch (e) { saved = []; }

    document.querySelectorAll('.save-btn').forEach((btn) => {
        const id = btn.dataset.save;
        if (saved.includes(id)) btn.setAttribute('aria-pressed', 'true');

        btn.addEventListener('click', () => {
            const on = btn.getAttribute('aria-pressed') !== 'true';
            btn.setAttribute('aria-pressed', String(on));
            btn.setAttribute('aria-label', on ? 'Bỏ lưu bài viết' : 'Lưu bài viết');
            saved = on ? [...new Set([...saved, id])] : saved.filter((x) => x !== id);
            try { localStorage.setItem(SAVE_KEY, JSON.stringify(saved)); } catch (e) { /* bỏ qua */ }
            if (window.showToast) window.showToast(on ? '🔖 Đã lưu bài viết' : 'Đã bỏ lưu bài viết');
        });
    });

    /* ---------- 4. Bộ đếm số liệu ---------- */
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

    /* ---------- 5. Thẻ lật: chạm (mobile) + Enter/Space ---------- */
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

    /* ---------- 6. Scrollspy menu ---------- */
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
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach((s) => spy.observe(s));
    }
});


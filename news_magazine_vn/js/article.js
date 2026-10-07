/**
 * ARTICLE.JS — TƯƠNG TÁC DÀNH CHO TRANG CHI TIẾT BÀI BÁO (ARTICLE.HTML)
 * - Tùy chỉnh kích thước cỡ chữ (A- / A+)
 * - Sao chép link bài viết vào clipboard
 * - Nút Lưu bài viết (Bookmark lưu localStorage)
 * - Nút Đánh giá (Feedback)
 * - Nút Theo dõi tác giả (Follow)
 * - Mục lục bài viết (TOC) tự động làm nổi bật mục khi cuộn đến
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ---------- 1. Tùy chỉnh cỡ chữ đọc bài ---------- */
    const articleBody = document.getElementById('article-body');
    let currentFontSizeRem = 1.08; // Cỡ chữ mặc định

    document.querySelectorAll('.tool-btn[data-font]').forEach(btn => {
        btn.addEventListener('click', () => {
            const delta = parseInt(btn.dataset.font, 10);
            if (delta === 1 && currentFontSizeRem < 1.35) {
                currentFontSizeRem += 0.08;
            } else if (delta === -1 && currentFontSizeRem > 0.92) {
                currentFontSizeRem -= 0.08;
            }
            if (articleBody) {
                articleBody.style.setProperty('--fs', `${currentFontSizeRem}rem`);
                if (window.showToast) window.showToast(`Cỡ chữ: ${Math.round(currentFontSizeRem * 16)}px`);
            }
        });
    });

    /* ---------- 2. Sao chép liên kết bài viết ---------- */
    const btnCopyLink = document.getElementById('btn-copy-link');
    if (btnCopyLink) {
        btnCopyLink.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                if (window.showToast) window.showToast('📋 Đã sao chép liên kết bài viết!');
            }).catch(() => {
                if (window.showToast) window.showToast('Link: ' + window.location.href);
            });
        });
    }

    /* ---------- 3. Lưu bài viết (Bookmark) ---------- */
    const btnSaveArticle = document.getElementById('btn-save-article');
    const ARTICLE_SAVE_KEY = 'tm-saved-article-lead';
    if (btnSaveArticle) {
        let isSaved = localStorage.getItem(ARTICLE_SAVE_KEY) === 'true';
        btnSaveArticle.setAttribute('aria-pressed', String(isSaved));

        btnSaveArticle.addEventListener('click', () => {
            isSaved = !isSaved;
            btnSaveArticle.setAttribute('aria-pressed', String(isSaved));
            localStorage.setItem(ARTICLE_SAVE_KEY, String(isSaved));
            if (window.showToast) {
                window.showToast(isSaved ? '🔖 Đã lưu bài viết vào danh sách đọc!' : 'Đã bỏ lưu bài viết.');
            }
        });
    }

    /* ---------- 4. Feedback đánh giá bài viết ---------- */
    const feedbackBtns = document.querySelectorAll('.js-feedback');
    feedbackBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            feedbackBtns.forEach(b => b.classList.remove('is-chosen'));
            btn.classList.add('is-chosen');
            const countEl = btn.querySelector('.count');
            if (countEl) {
                let num = parseInt(countEl.textContent, 10) || 0;
                countEl.textContent = num + 1;
            }
            if (window.showToast) window.showToast('❤️ Cảm ơn bạn đã gửi phản hồi!');
        });
    });

    /* ---------- 5. Nút theo dõi ban biên tập ---------- */
    const followBtn = document.querySelector('.js-follow');
    if (followBtn) {
        followBtn.addEventListener('click', () => {
            const isFollowing = followBtn.getAttribute('aria-pressed') === 'true';
            followBtn.setAttribute('aria-pressed', String(!isFollowing));
            followBtn.textContent = isFollowing ? '+ Theo dõi' : '✓ Đang theo dõi';
            if (window.showToast) {
                window.showToast(isFollowing ? 'Đã hủy theo dõi tác giả.' : '🔔 Đang theo dõi Ban Biên tập Tin Mới!');
            }
        });
    }

    /* ---------- 6. Mục lục bài viết (TOC) Highlight khi cuộn ---------- */
    const tocLinks = document.querySelectorAll('.toc-box a[href^="#"]');
    const sections = Array.from(tocLinks).map(link => {
        const id = link.getAttribute('href').replace('#', '');
        return document.getElementById(id);
    }).filter(Boolean);

    if ('IntersectionObserver' in window && sections.length > 0) {
        const tocObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    tocLinks.forEach(link => {
                        const match = link.getAttribute('href') === `#${id}`;
                        link.classList.toggle('is-active', match);
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -65% 0px'
        });

        sections.forEach(sec => tocObserver.observe(sec));
    }
});


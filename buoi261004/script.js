/**
 * MINI GT™ Official Showcase & Pre-Order Portal
 * JavaScript Interactive Core
 * Nhóm 2 - Đại Học Lạc Hồng
 */

// 1. CARS DATABASE
const CARS_DATABASE = {
  'MGTS0026': {
    code: 'MGTS0026',
    subcode: 'MGT01232 - MGT01235 (Box Set 4 Xe)',
    title: 'Lamborghini Huracán Sterrato All-Terrain Set',
    brand: 'Lamborghini Officially Licensed',
    category: 'preorder sets',
    price: 1850000,
    priceFormatted: '1.850.000₫',
    image: './image/lambo-sterrato-set.png',
    status: 'Pre-Order (Hạn chót: 28/09/2026)',
    scale: '1:64 Scale (~7.2 cm/xe)',
    material: 'Thân vỏ hợp kim kẽm Die-cast, lốp cao su có vân địa hình',
    packaging: 'Hộp Box Set Collector Camouflage đặc biệt',
    description: 'Bộ sưu tập gồm 4 chiếc Lamborghini Huracán Sterrato địa hình với 4 màu sơn ngụy trang camo sa mạc, tuyết trắng, rừng nhiệt đới và rêu quân đội. Thanh giá nóc nóc thể thao, đèn chiếu sương mù trước và ốp vòm bánh xe đinh tán sắc sảo.',
    specs: {
      'Tỉ lệ': '1:64 True Die-Cast',
      'Thương hiệu': 'MINI GT (TSM-Model)',
      'Bản quyền': 'Automobili Lamborghini S.p.A.',
      'Quy cách': 'Bộ 4 xe kèm hộp Box Set độc quyền',
      'Đặc điểm': 'Lốp cao su thật, gầm đúc logo kim loại'
    }
  },
  'MGT01413': {
    code: 'MGT01413',
    subcode: 'UHD Version (Lance Stroll #18)',
    title: 'Aston Martin AMR24 #18 Lance Stroll 2024 F1 2024 Las Vegas GP',
    brand: 'Aston Martin Aramco F1® Team',
    category: 'preorder f1',
    price: 420000,
    priceFormatted: '420.000₫',
    image: './image/aston-amr24-stroll.png',
    status: 'Pre-Order (Hạn chót: 28/09/2026)',
    scale: '1:64 Scale (~8.5 cm)',
    material: 'Thân kim loại Die-cast, cánh gió khí động học, lốp Pirelli',
    packaging: 'Hộp giấy tiêu chuẩn seal ni-lông chống giả',
    description: 'Chiến mã AMR24 của tay đua Lance Stroll tại chặng đua đêm Las Vegas Grand Prix 2024. Phiên bản UHD (Ultra High Definition) với dàn tem nhà tài trợ sắc nét và lồng bảo vệ Halo bảo đảm an toàn chuẩn F1.',
    specs: {
      'Tỉ lệ': '1:64 True Die-Cast',
      'Thương hiệu': 'MINI GT (TSM-Model)',
      'Bản quyền': 'Formula 1® & Aston Martin Aramco',
      'Dòng xe': 'UHD (Ultra High Definition)',
      'Tay đua': 'Lance Stroll (#18)'
    }
  },
  'MGT01396': {
    code: 'MGT01396',
    subcode: 'UHD Version (Fernando Alonso #14)',
    title: 'Aston Martin AMR24 #14 Fernando Alonso 2024 F1 2024 Las Vegas GP',
    brand: 'Aston Martin Aramco F1® Team',
    category: 'preorder f1',
    price: 450000,
    priceFormatted: '450.000₫',
    image: './image/aston-amr24-alonso.png',
    status: 'Pre-Order (Hạn chót: 28/09/2026)',
    scale: '1:64 Scale (~8.5 cm)',
    material: 'Thân kim loại Die-cast, cánh gió khí động học, lốp Pirelli',
    packaging: 'Hộp giấy tiêu chuẩn seal ni-lông chống giả',
    description: 'Mô hình xe đua F1 của nhà vô địch 2 lần Fernando Alonso tại giải đua Las Vegas GP 2024. Sơn xanh đặc trưng Racing Green kết hợp các dải màu dạ quang rực rỡ dưới ánh đèn laser đêm Vegas.',
    specs: {
      'Tỉ lệ': '1:64 True Die-Cast',
      'Thương hiệu': 'MINI GT (TSM-Model)',
      'Bản quyền': 'Formula 1® & Aston Martin Aramco',
      'Dòng xe': 'UHD (Ultra High Definition)',
      'Tay đua': 'Fernando Alonso (#14)'
    }
  },
  'MGT00820': {
    code: 'MGT00820',
    subcode: 'IMSA 12H Sebring Winner',
    title: 'Porsche 911 GT3 R #77 "Rexy" AO Racing 12H Sebring',
    brand: 'Porsche Motorsport Officially Licensed',
    category: 'instock aoracing',
    price: 390000,
    priceFormatted: '390.000₫',
    image: './image/rexy.jpg',
    status: 'Có sẵn giao ngay (In Stock)',
    scale: '1:64 Scale (~7.0 cm)',
    material: 'Hợp kim kẽm Die-cast cao cấp, lốp cao su',
    packaging: 'Hộp nguyên seal niêm phong',
    description: 'Chiếc Porsche 911 GT3 R mang livery chú khủng long bạo chúa T-Rex xanh lá nổi tiếng của đội đua AO Racing tại giải vô địch IMSA WeatherTech SportsCar Championship.',
    specs: {
      'Tỉ lệ': '1:64 True Die-Cast',
      'Thương hiệu': 'MINI GT (TSM-Model)',
      'Bản quyền': 'Porsche AG & AO Racing',
      'Livery': 'Rexy The T-Rex (#77)',
      'Tình trạng': 'Sẵn sàng giao hàng toàn quốc'
    }
  },
  'MGT00821': {
    code: 'MGT00821',
    subcode: 'Pink Dinosaur Edition',
    title: 'Porsche 911 GT3 R #77 "Roxy" Pink Dinosaur Edition',
    brand: 'Porsche Motorsport Officially Licensed',
    category: 'instock aoracing',
    price: 390000,
    priceFormatted: '390.000₫',
    image: './image/Roxy.webp',
    status: 'Có sẵn giao ngay (In Stock)',
    scale: '1:64 Scale (~7.0 cm)',
    material: 'Hợp kim kẽm Die-cast cao cấp, lốp cao su',
    packaging: 'Hộp nguyên seal niêm phong',
    description: 'Phiên bản khủng long hồng Roxy nữ tính nhưng đầy tốc độ của AO Racing. Điểm nhấn đặc trưng là nụ cười ngộ nghĩnh cùng hàng răng khủng long trên cản trước xe.',
    specs: {
      'Tỉ lệ': '1:64 True Die-Cast',
      'Thương hiệu': 'MINI GT (TSM-Model)',
      'Bản quyền': 'Porsche AG & AO Racing',
      'Livery': 'Roxy The Pink Dino (#77)',
      'Tình trạng': 'Sẵn sàng giao hàng toàn quốc'
    }
  },
  'MGT00822': {
    code: 'MGT00822',
    subcode: 'Spike The Dragon',
    title: 'Porsche 911 GT3 R "Spike" Dragon SKE Motorsport',
    brand: 'Porsche Motorsport Officially Licensed',
    category: 'instock aoracing',
    price: 390000,
    priceFormatted: '390.000₫',
    image: './image/ske.webp',
    status: 'Có sẵn giao ngay (In Stock)',
    scale: '1:64 Scale (~7.0 cm)',
    material: 'Hợp kim kẽm Die-cast cao cấp, lốp cao su',
    packaging: 'Hộp nguyên seal niêm phong',
    description: 'Hoàn thiện bộ ba linh vật AO Racing với chú rồng tím Spike The Dragon. Livery vảy rồng hung hãn cùng phối màu tím khói thể hiện sức mạnh vượt trội trên đường đua.',
    specs: {
      'Tỉ lệ': '1:64 True Die-Cast',
      'Thương hiệu': 'MINI GT (TSM-Model)',
      'Bản quyền': 'Porsche AG & AO Racing',
      'Livery': 'Spike The Dragon',
      'Tình trạng': 'Sẵn sàng giao hàng toàn quốc'
    }
  }
};

// 2. APP STATE & PERSISTENCE
let cart = JSON.parse(localStorage.getItem('minigt_clean_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('minigt_clean_wishlist') || '[]');
let currentSlide = 0;
let slideInterval = null;
let activeDiscount = 0; // percentage
let userOrders = JSON.parse(localStorage.getItem('minigt_orders') || '[]');

// SAMPLE SEED ORDER IF EMPTY
if (userOrders.length === 0) {
  userOrders.push({
    orderId: 'MGT-ORD-202688',
    custName: 'Nguyễn Văn Minh',
    custPhone: '0988164164',
    items: ['Aston Martin AMR24 #14 Fernando Alonso (#MGT01396)'],
    total: '450.000₫',
    date: '02/10/2026',
    status: 'Đã nhận cọc Pre-order (Chờ xuất xưởng đợt 28/09/2026)',
    payMethod: 'Cọc 30%'
  });
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initCountdown();
  initHeaderSearch();
  initMobileNav();
  updateCartUI();
  updateWishlistUI();
});

/* ==========================================================================
   1. HERO CAROUSEL CONTROLS
   ========================================================================== */
function initHeroCarousel() {
  startCarouselAuto();
  const wrapper = document.querySelector('.showcase-carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopCarouselAuto);
    wrapper.addEventListener('mouseleave', startCarouselAuto);
  }
}

function showSlide(index) {
  const slides = document.querySelectorAll('.showcase-slide');
  const dots = document.querySelectorAll('.carousel-dots-bar .dot');
  if (!slides.length) return;

  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function setSlide(idx) {
  showSlide(idx);
}

function startCarouselAuto() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 7000);
}

function stopCarouselAuto() {
  if (slideInterval) clearInterval(slideInterval);
}

/* ==========================================================================
   2. COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const targetDate = new Date('2026-09-28T23:59:59').getTime();
  
  const d = document.getElementById('timerDays');
  const h = document.getElementById('timerHours');
  const m = document.getElementById('timerMins');
  const s = document.getElementById('timerSecs');

  function tick() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (d) d.innerText = '00';
      if (h) h.innerText = '00';
      if (m) m.innerText = '00';
      if (s) s.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (d) d.innerText = String(days).padStart(2, '0');
    if (h) h.innerText = String(hours).padStart(2, '0');
    if (m) m.innerText = String(minutes).padStart(2, '0');
    if (s) s.innerText = String(seconds).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

/* ==========================================================================
   3. CATALOG FILTERING, LIVE SEARCH & SORT
   ========================================================================== */
function filterCatalog(category, btnElement) {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const cards = document.querySelectorAll('.catalog-card-item');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCat.includes(category)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  const statusBar = document.getElementById('searchStatusBar');
  if (statusBar) statusBar.style.display = 'none';
}

function filterCategoryDirect(category) {
  const targetPill = document.querySelector(`.filter-pill[data-category="${category}"]`);
  if (targetPill) {
    targetPill.click();
  }
  const catalog = document.getElementById('catalog-section');
  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
}

function initHeaderSearch() {
  const searchInput = document.getElementById('headerSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const mobileInput = document.getElementById('mobileSearchInput');

  function doSearch(val) {
    const query = val.toLowerCase().trim();
    const cards = document.querySelectorAll('.catalog-card-item');
    let matched = 0;

    if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

    cards.forEach(card => {
      const code = card.getAttribute('data-code').toLowerCase();
      const title = card.querySelector('.card-title').innerText.toLowerCase();
      const codeLine = card.querySelector('.card-code-line').innerText.toLowerCase();

      if (query === '' || code.includes(query) || title.includes(query) || codeLine.includes(query)) {
        card.style.display = 'flex';
        matched++;
      } else {
        card.style.display = 'none';
      }
    });

    const statusBar = document.getElementById('searchStatusBar');
    const kwLabel = document.getElementById('searchKeywordLabel');
    const resCount = document.getElementById('searchResultCount');

    if (statusBar && query) {
      statusBar.style.display = 'flex';
      if (kwLabel) kwLabel.innerText = `"${val}"`;
      if (resCount) resCount.innerText = matched;
    } else if (statusBar) {
      statusBar.style.display = 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => doSearch(e.target.value));
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      doSearch('');
    });
  }

  if (mobileInput) {
    mobileInput.addEventListener('input', (e) => {
      doSearch(e.target.value);
      closeMobileNav();
      document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function resetSearchFilter() {
  const searchInput = document.getElementById('headerSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  
  const allPill = document.querySelector('.filter-pill[data-category="all"]');
  if (allPill) allPill.click();
}

function handleSortChange() {
  const sortVal = document.getElementById('sortSelect').value;
  const grid = document.getElementById('productCardsGrid');
  const cards = Array.from(grid.querySelectorAll('.catalog-card-item'));

  cards.sort((a, b) => {
    const priceA = parseInt(a.getAttribute('data-price') || '0', 10);
    const priceB = parseInt(b.getAttribute('data-price') || '0', 10);
    const codeA = a.getAttribute('data-code') || '';
    const codeB = b.getAttribute('data-code') || '';

    if (sortVal === 'price-asc') return priceA - priceB;
    if (sortVal === 'price-desc') return priceB - priceA;
    if (sortVal === 'code-asc') return codeA.localeCompare(codeB);
    if (sortVal === 'code-desc') return codeB.localeCompare(codeA);
    return 0;
  });

  cards.forEach(card => grid.appendChild(card));
}

/* ==========================================================================
   4. QUICK VIEW MODAL
   ========================================================================== */
function openQuickView(code) {
  const item = CARS_DATABASE[code];
  if (!item) return;

  const content = document.getElementById('quickViewContent');
  let specsRows = '';
  for (const [key, val] of Object.entries(item.specs)) {
    specsRows += `<tr><td>${key}:</td><td>${val}</td></tr>`;
  }

  content.innerHTML = `
    <div class="qv-media-frame">
      <img src="${item.image}" alt="${item.title}">
    </div>
    <div class="qv-details-wrap">
      <span class="car-brand-tag">${item.brand}</span>
      <h2>${item.title}</h2>
      <div class="qv-code-row">
        <span class="qv-code">#${item.code}</span>
        <span class="qv-subcode">${item.subcode}</span>
      </div>
      <p class="qv-desc">${item.description}</p>
      
      <table class="qv-specs-table">
        <tbody>${specsRows}</tbody>
      </table>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px;">
        <span style="font-size: 11px; color: #64748b; display: block;">Tình trạng:</span>
        <strong style="color: #d90429; font-size: 13.5px;">${item.status}</strong>
      </div>

      <div class="qv-price-cta-row">
        <div class="qv-price">${item.priceFormatted}</div>
        <button class="btn-fast-order" onclick="addToCart('${item.code}'); closeQuickView();">
          <i class="fa-solid fa-cart-plus"></i> Đặt cọc mô hình này
        </button>
      </div>
    </div>
  `;

  document.getElementById('quickViewModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  document.getElementById('quickViewModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

/* ==========================================================================
   5. CART DRAWER & MANAGEMENT
   ========================================================================== */
function openCartDrawer() {
  document.getElementById('cartDrawerBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawerBackdrop').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function addToCart(code) {
  const car = CARS_DATABASE[code];
  if (!car) return;

  const existing = cart.find(c => c.code === code);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      code: car.code,
      title: car.title,
      price: car.price,
      priceFormatted: car.priceFormatted,
      image: car.image,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Đã thêm <strong>#${car.code}</strong> vào giỏ hàng Pre-order!`);
}

function changeCartQty(code, delta) {
  const item = cart.find(c => c.code === code);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.code !== code);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(code) {
  cart = cart.filter(c => c.code !== code);
  saveCart();
  updateCartUI();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
}

function applyVoucher() {
  const input = document.getElementById('voucherCodeInput');
  const msgEl = document.getElementById('voucherAppliedMsg');
  const val = input ? input.value.trim().toUpperCase() : '';

  if (val === 'MINIGT10') {
    activeDiscount = 0.10; // 10%
    if (msgEl) {
      msgEl.innerText = '✓ Đã áp dụng mã MINIGT10 (Giảm 10% tổng đơn)';
      msgEl.style.display = 'block';
    }
    showToast('Áp dụng mã giảm giá 10% thành công!');
  } else if (val === 'FREESHIP') {
    activeDiscount = 0.05; // 5%
    if (msgEl) {
      msgEl.innerText = '✓ Đã áp dụng mã FREESHIP (Hỗ trợ 5% phí vận chuyển)';
      msgEl.style.display = 'block';
    }
    showToast('Áp dụng mã FREESHIP thành công!');
  } else {
    alert('Mã giảm giá không hợp lệ. Bạn có thể thử mã: MINIGT10');
  }

  updateCartUI();
}

function saveCart() {
  localStorage.setItem('minigt_clean_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCountEl = document.getElementById('cartCount');
  const drawerCountEl = document.getElementById('drawerItemCount');
  
  if (cartCountEl) cartCountEl.innerText = totalCount;
  if (drawerCountEl) drawerCountEl.innerText = totalCount;

  const listEl = document.getElementById('cartDrawerList');
  const footerEl = document.getElementById('cartDrawerFooter');
  const subtotalEl = document.getElementById('drawerSubtotalPrice');
  const discountRow = document.getElementById('drawerDiscountRow');
  const discountEl = document.getElementById('drawerDiscountPrice');
  const totalEl = document.getElementById('drawerTotalPrice');

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="empty-drawer-box">
        <i class="fa-solid fa-cart-arrow-down"></i>
        <p>Giỏ hàng Pre-order của bạn đang trống</p>
        <button class="btn-card-order" onclick="closeCartDrawer()" style="margin-top: 14px;">Xem danh mục mô hình</button>
      </div>
    `;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'block';

  let subtotal = 0;
  listEl.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-row-item">
        <div class="cart-thumb-box">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-info-box">
          <div class="cart-info-title">${item.title}</div>
          <div class="cart-info-code">#${item.code}</div>
          <div class="cart-row-bottom">
            <div class="qty-control">
              <button type="button" onclick="changeCartQty('${item.code}', -1)">-</button>
              <span>${item.qty}</span>
              <button type="button" onclick="changeCartQty('${item.code}', 1)">+</button>
            </div>
            <span class="cart-row-price">${itemTotal.toLocaleString('vi-VN')}₫</span>
            <button class="btn-del-cart" onclick="removeFromCart('${item.code}')" title="Xóa"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const discountAmount = subtotal * activeDiscount;
  const finalTotal = subtotal - discountAmount;

  if (subtotalEl) subtotalEl.innerText = subtotal.toLocaleString('vi-VN') + '₫';
  
  if (activeDiscount > 0 && discountRow && discountEl) {
    discountRow.style.display = 'flex';
    discountEl.innerText = `-${discountAmount.toLocaleString('vi-VN')}₫`;
  } else if (discountRow) {
    discountRow.style.display = 'none';
  }

  if (totalEl) totalEl.innerText = finalTotal.toLocaleString('vi-VN') + '₫';
}

/* ==========================================================================
   6. WISHLIST MANAGEMENT
   ========================================================================== */
function toggleWishlist(code) {
  const idx = wishlist.indexOf(code);
  const cardFavBtns = document.querySelectorAll(`.catalog-card-item[data-code="${code}"] .card-fav-btn`);

  if (idx > -1) {
    wishlist.splice(idx, 1);
    cardFavBtns.forEach(btn => btn.classList.remove('active'));
    showToast('Đã bỏ khỏi danh sách yêu thích');
  } else {
    wishlist.push(code);
    cardFavBtns.forEach(btn => btn.classList.add('active'));
    showToast('Đã lưu vào danh sách yêu thích ❤');
  }

  localStorage.setItem('minigt_clean_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

function toggleWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawerBackdrop');
  if (drawer) {
    drawer.classList.toggle('active');
    if (drawer.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
      renderWishlistDrawer();
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}

function updateWishlistUI() {
  const countEl = document.getElementById('wishlistCount');
  const drawerCountEl = document.getElementById('wishlistDrawerCount');
  if (countEl) countEl.innerText = wishlist.length;
  if (drawerCountEl) drawerCountEl.innerText = wishlist.length;

  wishlist.forEach(code => {
    const cardFavBtns = document.querySelectorAll(`.catalog-card-item[data-code="${code}"] .card-fav-btn`);
    cardFavBtns.forEach(btn => btn.classList.add('active'));
  });
}

function renderWishlistDrawer() {
  const listEl = document.getElementById('wishlistDrawerList');
  if (!listEl) return;

  if (wishlist.length === 0) {
    listEl.innerHTML = `
      <div class="empty-drawer-box">
        <i class="fa-regular fa-heart"></i>
        <p>Bạn chưa lưu mẫu xe yêu thích nào</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = wishlist.map(code => {
    const car = CARS_DATABASE[code];
    if (!car) return '';
    return `
      <div class="cart-row-item">
        <div class="cart-thumb-box">
          <img src="${car.image}" alt="${car.title}">
        </div>
        <div class="cart-info-box">
          <div class="cart-info-title">${car.title}</div>
          <div class="cart-info-code">#${car.code}</div>
          <div class="cart-row-bottom">
            <span class="cart-row-price">${car.priceFormatted}</span>
            <button class="btn-card-order" onclick="addToCart('${car.code}'); toggleWishlist('${car.code}');"><i class="fa-solid fa-cart-plus"></i> Chuyển vào giỏ</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   7. CHECKOUT PRE-ORDER FLOW & RECEIPT
   ========================================================================== */
function openCheckoutModal() {
  if (cart.length === 0) {
    alert('Giỏ hàng của bạn đang trống!');
    return;
  }

  closeCartDrawer();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const finalTotal = subtotal * (1 - activeDiscount);

  const finalTotalEl = document.getElementById('checkoutFinalTotal');
  if (finalTotalEl) finalTotalEl.innerText = finalTotal.toLocaleString('vi-VN') + '₫';

  document.getElementById('checkoutModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleOrderCheckout(e) {
  e.preventDefault();

  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const address = document.getElementById('custAddress').value;
  const payMethod = document.querySelector('input[name="payMethod"]:checked').value;
  const notes = document.getElementById('custNotes').value;

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const finalTotal = (subtotal * (1 - activeDiscount)).toLocaleString('vi-VN') + '₫';

  const orderId = 'MGT-ORD-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString('vi-VN');

  const newOrder = {
    orderId: orderId,
    custName: name,
    custPhone: phone,
    custAddress: address,
    items: cart.map(i => `${i.title} (#${i.code}) x${i.qty}`),
    total: finalTotal,
    date: orderDate,
    status: 'Đã nhận cọc Pre-order thành công (Hạn giao đợt 28/09/2026)',
    payMethod: payMethod
  };

  userOrders.unshift(newOrder);
  localStorage.setItem('minigt_orders', JSON.stringify(userOrders));

  // Render Receipt
  const receiptEl = document.getElementById('orderSuccessReceipt');
  if (receiptEl) {
    receiptEl.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <i class="fa-solid fa-circle-check" style="font-size: 48px; color: #10b981; margin-bottom: 10px;"></i>
        <h3 style="font-size: 20px; font-weight: 800; color: #0f172a;">ĐẶT CỌC PRE-ORDER THÀNH CÔNG!</h3>
        <p style="font-size: 13px; color: #64748b;">Mã đơn hàng: <strong style="color: #d90429;">${orderId}</strong></p>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
        <p><strong>Người nhận:</strong> ${name} — <strong>SĐT:</strong> ${phone}</p>
        <p><strong>Địa chỉ:</strong> ${address}</p>
        <p><strong>Ngày lập đơn:</strong> ${orderDate}</p>
        <p><strong>Danh sách xe:</strong></p>
        <ul style="padding-left: 20px; margin: 6px 0;">
          ${cart.map(i => `<li>${i.title} — <strong>#${i.code}</strong> (x${i.qty})</li>`).join('')}
        </ul>
        <p style="border-top: 1px dashed #cbd5e1; padding-top: 8px; margin-top: 8px;">
          <strong>Tổng giá trị đơn:</strong> <span style="font-size: 16px; font-weight: 800; color: #d90429;">${finalTotal}</span>
        </p>
      </div>

      <div style="font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">
        <i class="fa-solid fa-bell" style="color: #f59e0b;"></i> Nhân viên MINI GT Vietnam sẽ gọi điện xác thực thông tin và gửi phiếu xuất kho điện tử cho bạn trong vòng 24h.
      </div>

      <button class="btn-fast-order" style="width: 100%; justify-content: center;" onclick="closeOrderSuccessModal()">
        <i class="fa-solid fa-house"></i> Trở Về Trang Chủ
      </button>
    `;
  }

  // Clear Cart
  cart = [];
  saveCart();
  updateCartUI();

  closeCheckoutModal();
  document.getElementById('orderSuccessModal').classList.add('active');
}

function closeOrderSuccessModal() {
  document.getElementById('orderSuccessModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

/* ==========================================================================
   8. ORDER TRACKER SYSTEM
   ========================================================================== */
function openOrderTrackerModal() {
  document.getElementById('orderTrackerModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderTrackerModal() {
  document.getElementById('orderTrackerModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function performOrderTrack() {
  const input = document.getElementById('trackInput');
  const resBox = document.getElementById('trackerResultBox');
  const val = input ? input.value.trim().toLowerCase() : '';

  if (!val) {
    alert('Vui lòng nhập SĐT hoặc mã đơn hàng!');
    return;
  }

  const found = userOrders.filter(o => 
    o.custPhone.toLowerCase().includes(val) || o.orderId.toLowerCase().includes(val)
  );

  resBox.style.display = 'block';

  if (found.length === 0) {
    resBox.innerHTML = `
      <div style="text-align: center; color: #64748b; font-size: 13px;">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 24px; color: #f59e0b; margin-bottom: 6px;"></i>
        <p>Không tìm thấy đơn hàng nào khớp với "<strong>${val}</strong>". Bạn vui lòng kiểm tra lại số điện thoại hoặc mã đơn.</p>
      </div>
    `;
    return;
  }

  resBox.innerHTML = found.map(order => `
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 12px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <strong>Mã: ${order.orderId}</strong>
        <span style="color: #10b981; font-weight: 700;">${order.status}</span>
      </div>
      <p style="color: #475569;">Khách hàng: ${order.custName} | SĐT: ${order.custPhone}</p>
      <p style="color: #64748b;">Mẫu xe: ${order.items.join(', ')}</p>
      <p style="color: #d90429; font-weight: 700; margin-top: 4px;">Tổng tiền: ${order.total}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   9. REVIEWS & NEWSLETTER
   ========================================================================== */
function toggleReviewForm() {
  const form = document.getElementById('collectorReviewForm');
  if (form) {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
}

let userRating = 5;
function setRating(val) {
  userRating = val;
  const stars = document.querySelectorAll('.star-rating-picker i');
  stars.forEach((s, idx) => {
    if (idx < val) s.classList.add('active');
    else s.classList.remove('active');
  });
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('revName').value;
  const car = document.getElementById('revCar').value;
  const comment = document.getElementById('revComment').value;

  const reviewsGrid = document.getElementById('reviewsGrid');
  if (reviewsGrid) {
    let starsHtml = '';
    for (let i = 0; i < userRating; i++) starsHtml += '<i class="fa-solid fa-star"></i>';

    const newRevCard = document.createElement('div');
    newRevCard.className = 'review-card';
    newRevCard.innerHTML = `
      <div class="review-stars">${starsHtml}</div>
      <p class="review-text">"${comment}"</p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">${name.charAt(0).toUpperCase()}</div>
        <div class="reviewer-info">
          <strong>${name}</strong>
          <span>Người sưu tầm vừa đánh giá</span>
        </div>
      </div>
    `;
    reviewsGrid.prepend(newRevCard);
  }

  showToast('Cảm ơn bạn! Đánh giá đã được gửi thành công.');
  document.getElementById('collectorReviewForm').reset();
  toggleReviewForm();
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('nlEmail').value;
  showToast(`Đăng ký thành công! Email <strong>${email}</strong> đã vào danh sách VIP.`);
  document.getElementById('nlEmail').value = '';
}

/* ==========================================================================
   10. MOBILE DRAWER & TOAST HELPER
   ========================================================================== */
function initMobileNav() {
  const btn = document.getElementById('mobileMenuBtn');
  const close = document.getElementById('closeMobileNav');
  const drawer = document.getElementById('mobileNavBackdrop');

  if (btn && drawer) btn.addEventListener('click', () => drawer.classList.add('active'));
  if (close && drawer) close.addEventListener('click', closeMobileNav);

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}

function closeMobileNav() {
  const drawer = document.getElementById('mobileNavBackdrop');
  if (drawer) drawer.classList.remove('active');
}

function showToast(message) {
  const wrapper = document.getElementById('toastWrapper');
  if (!wrapper) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;
  
  wrapper.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}


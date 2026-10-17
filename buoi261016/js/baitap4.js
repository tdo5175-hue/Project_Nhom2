/**
 * ==============================================================================
 * AURA SOUND — JAVASCRIPT ES6+ CHUẨN THƯƠNG MẠI
 * Môn học: Thiết Kế Web Nâng Cao — Đại Học Lạc Hồng (Nhóm 2)
 * Tách file độc lập, không dùng thư viện ngoài, tương tác mượt mà và trực quan
 * ==============================================================================
 */

"use strict";

/* --------------------------------------------------------------------------
   1. BỘ TỪ ĐIỂN SONG NGỮ (i18n VI / EN)
   -------------------------------------------------------------------------- */
const i18n = {
  vi: {
    pageTitle: "AURA SOUND — Thiết Bị Âm Thanh Cao Cấp",
    navShowroom: "Showroom Sản Phẩm",
    navCollection: "Bộ Sưu Tập",
    navSpecs: "Thông Số Kỹ Thuật",
    navAbout: "Về Thương Hiệu",
    navReviews: "Đánh Giá",
    specBtn: "Đề Bài & Rubric",
    cartLabel: "Giỏ hàng",
    heroBadge: "SẢN PHẨM NỔI BẬT NĂM 2026",
    heroHeadline: "AURA Studio One.<br>Âm thanh trung thực từng chi tiết.",
    heroLead: "Tai nghe chống ồn chủ động thông minh với màng loa Beryllium 40mm. Thời lượng pin 40 giờ, hoàn thiện bằng khung nhôm siêu nhẹ và đệm tai bọc da êm ái suốt cả ngày.",
    priceFrom: "Giá bán:",
    vatIncluded: "(Bảo hành 24 tháng chính hãng)",
    heroCtaShowroom: "Chọn Phiên Bản & Đặt Mua",
    heroCtaCatalog: "Xem Toàn Bộ Sản Phẩm",
    trust1: "Miễn phí giao hàng",
    trust2: "Đổi trả trong 30 ngày",
    trust3: "Bảo hành 1 đổi 1",
    featBar1Title: "Giao Hàng Hỏa Tốc",
    featBar1Desc: "Nhận hàng trong 2-4 giờ tại nội thành",
    featBar2Title: "Bảo Hành 24 Tháng",
    featBar2Desc: "Chính sách 1 đổi 1 nếu lỗi nhà sản xuất",
    featBar3Title: "30 Ngày Dùng Thử",
    featBar3Desc: "Hoàn tiền 100% nếu không hài lòng",
    featBar4Title: "Hỗ Trợ Kỹ Thuật 24/7",
    featBar4Desc: "Chuyên viên âm học tư vấn trực tiếp",
    showroomTitle: "Trải Nghiệm Studio One",
    showroomSub: "Chọn màu sắc phù hợp với cá tính của bạn. Mọi phiên bản đều sử dụng hợp kim nhôm cao cấp.",
    currentEditionLabel: "Phiên bản đang xem:",
    chooseColor: "Tùy Chọn Màu Sắc:",
    swatchObsidian: "Đen Nhám",
    swatchGold: "Vàng Champagne",
    swatchSilver: "Bạc Ánh Kim",
    descObsidian: "Sắc đen nhám sang trọng. Lớp phủ chống bám mồ hôi và dấu vân tay, dễ dàng vệ sinh trong quá trình sử dụng hàng ngày.",
    descGold: "Sắc vàng Champagne thanh lịch. Lớp hoàn thiện nhôm phay xước tinh xảo mang lại nét sang trọng và tinh tế.",
    descSilver: "Sắc bạc ánh kim hiện đại. Trọng lượng siêu nhẹ với khung nhôm hàng không bền bỉ theo thời gian.",
    feat1: "Màng loa Dynamic 40mm Beryllium chất lượng cao",
    feat2: "Pin 40 giờ liên tục • Sạc nhanh 10 phút dùng 5 giờ",
    feat3: "Chống ồn chủ động thích ứng với 4 chế độ môi trường",
    addShowroomToBag: "Thêm Vào Giỏ Hàng",
    specsTitle: "Bảng Thông Số Kỹ Thuật",
    specsSub: "Thông số chi tiết được kiểm định chính xác theo tiêu chuẩn quốc tế.",
    tabAcoustics: "Âm Thanh & Màng Loa",
    tabBattery: "Pin & Kết Nối",
    tabBuild: "Vật Liệu & Kích Thước",
    specDriverKey: "Kiểu Màng Loa",
    specDriverVal: "Dynamic 40mm phủ lớp Beryllium độ phản hồi cao",
    specFreqKey: "Dải Tần Số Đáp Ứng",
    specAncKey: "Công Nghệ Chống Ồn",
    specAncNote: "Hybrid Active Noise Cancelling với 6 micro khử nhiễu",
    specCodecKey: "Bộ Giải Mã Hỗ Trợ",
    specPlaytimeKey: "Thời Gian Nghe Nhạc",
    specPlaytimeVal: "40 Giờ (Bật chống ồn) / 55 Giờ (Tắt chống ồn)",
    specFastChargeKey: "Sạc Nhanh",
    specFastChargeVal: "Sạc 10 phút sử dụng được 5 giờ nghe liên tục",
    specPortKey: "Cổng Sạc & Tín Hiệu",
    specPortNote: "Cổng USB-C Power Delivery & jack cắm analog 3.5mm",
    specFrameKey: "Khung Thân Tai Nghe",
    specFrameVal: "Hợp kim nhôm nguyên khối gia công CNC chính xác",
    specCushionKey: "Đệm Tai & Vòm Đeo",
    specCushionVal: "Bọt biển nhớ (Memory foam) bọc da mềm thoáng khí",
    specWeightKey: "Trọng Lượng",
    specWaterKey: "Kháng Nước & Mồ Hôi",
    specWaterNote: "Chuẩn IP54 (Chống giọt bắn và bụi bẩn thông thường)",
    catalogTitle: "Bộ Sưu Tập Thiết Bị Âm Thanh",
    catalogSub: "Tìm kiếm và chọn lựa sản phẩm phù hợp với nhu cầu giải trí và công việc của bạn.",
    searchPlaceholder: "Tìm theo tên sản phẩm...",
    catAll: "Tất Cả",
    catOverEar: "Tai Nghe Chụp Tai",
    catWireless: "Tai Nghe Không Dây",
    catSpeaker: "Loa Bluetooth",
    sortLabel: "Sắp xếp:",
    sortNameAsc: "Tên sản phẩm (A → Z)",
    sortNameDesc: "Tên sản phẩm (Z → A)",
    sortPriceAsc: "Giá (Thấp đến Cao)",
    sortPriceDesc: "Giá (Cao đến Thấp)",
    pageSizeLabel: "Hiển thị:",
    pageSizeAll: "Tất cả",
    aboutBadge: "TRIẾT LÝ AURA SOUND",
    aboutHeading: "Chất Lượng Vượt Trội, Thiết Kế Vượt Thời Gian",
    aboutText1: "Tại AURA SOUND, chúng tôi tin rằng một chiếc tai nghe tốt không chỉ có âm thanh hay mà còn phải tạo cảm giác thoải mái khi sử dụng hàng ngày và bền bỉ qua năm tháng.",
    aboutText2: "Mỗi sản phẩm đều trải qua quy trình kiểm tra âm học nghiêm ngặt với các tiêu chuẩn khắt khe nhất để bảo đảm độ méo tiếng thấp nhất và độ chi tiết cao nhất.",
    statWarranty: "Bảo hành 1 đổi 1 toàn diện",
    statBattery: "Thời lượng pin liên tục",
    statSatisfaction: "Khách hàng đánh giá hài lòng",
    reviewsTitle: "Đánh Giá Từ Khách Hàng",
    reviewsSub: "Cảm nhận thực tế từ những người đã trải nghiệm sản phẩm AURA SOUND.",
    review1Text: "“Studio One đeo rất êm tai, tôi làm việc 8 tiếng một ngày không bị cấn hay đau đầu. Khả năng chống ồn của tai nghe giúp tôi tập trung hơn rất nhiều.”",
    review1Role: "Kỹ Sư Phần Mềm • Đã mua Studio One",
    review2Text: "“Chiếc Wave Mini nhỏ gọn và kết nối rất nhanh với cả laptop và điện thoại. Hộp sạc bằng kim loại cầm rất chắc tay và pin dùng được cả tuần.”",
    review2Role: "Nhà Thiết Kế • Đã mua Wave Mini",
    review3Text: "“Loa Room Speaker phát âm thanh phòng khách rất ấm và rõ tiếng bass. Thiết kế tối giản đặt trên kệ sách trông rất đẹp mắt và gọn gàng.”",
    review3Role: "Nhiếp Ảnh Gia • Đã mua Room Speaker",
    newsTitle: "Đăng Ký Nhận Thông Tin Ưu Đãi",
    newsDesc: "Nhận ngay thông báo về sản phẩm mới và các chương trình giảm giá định kỳ từ AURA SOUND.",
    newsletterPlaceholder: "Nhập địa chỉ email của bạn...",
    subscribeBtn: "Đăng Ký",
    newsletterSuccess: "Cảm ơn bạn đã đăng ký! Chúng tôi đã gửi thông tin ưu đãi vào email của bạn.",
    footerAbout: "Chuyên cung cấp các thiết bị âm thanh cá nhân chất lượng cao, mang đến trải nghiệm nghe nhạc chân thực và sống động.",
    footerProducts: "SẢN PHẨM",
    footerServices: "CHÍNH SÁCH",
    footerContact: "HỆ THỐNG CỬA HÀNG",
    footWarranty: "Chính Sách Bảo Hành 24 Tháng",
    footDelivery: "Chính Sách Vận Chuyển",
    footCare: "Chính Sách Đổi Trả 30 Ngày",
    footPrivacy: "Bảo Mật Thông Tin Khách Hàng",
    footTerms: "Điều Khoản Mua Hàng",
    zaloTooltip: "Tư Vấn Nhanh",
    voucherEyebrow: "ƯU ĐÃI KHÁCH HÀNG MỚI",
    voucherTitle: "Tặng Bạn Mã Giảm Giá 10%",
    voucherDesc: "Nhập mã giảm giá này khi thanh toán để được giảm ngay 10% cho đơn hàng đầu tiên của bạn tại AURA SOUND.",
    codeLabel: "MÃ KHUYẾN MÃI:",
    copyCode: "Sao Chép Mã",
    copiedCode: "Đã Sao Chép! ✓",
    exploreWithVoucher: "Xem Sản Phẩm Ngay",
    voucherExpiry: "Áp dụng cho tất cả sản phẩm tai nghe và loa",
    showingCount: "Hiển thị {start} – {end} trong tổng số {total} sản phẩm",
    emptyCatalog: "Không tìm thấy sản phẩm nào phù hợp.",
    addedToCart: "Đã thêm “{name}” vào giỏ hàng thành công!",
    cartSummary: "Giỏ hàng có {count} sản phẩm • Tổng tiền: {total}"
  },

  en: {
    pageTitle: "AURA SOUND — Premium Audio Equipment",
    navShowroom: "Showroom",
    navCollection: "Collection",
    navSpecs: "Specifications",
    navAbout: "About Us",
    navReviews: "Reviews",
    specBtn: "Brief & Rubric",
    cartLabel: "Shopping Bag",
    heroBadge: "FEATURED RELEASE 2026",
    heroHeadline: "AURA Studio One.<br>True audio fidelity in every detail.",
    heroLead: "Smart active noise-cancelling headphones equipped with custom 40mm Beryllium drivers. 40 hours of playback, crafted from ultralight aluminum alloy with all-day memory foam comfort.",
    priceFrom: "Price:",
    vatIncluded: "(24-month official warranty included)",
    heroCtaShowroom: "Configure & Order",
    heroCtaCatalog: "Explore All Products",
    trust1: "Free Nationwide Shipping",
    trust2: "30-Day Money Back",
    trust3: "1-to-1 Replacement",
    featBar1Title: "Express Delivery",
    featBar1Desc: "Same-day delivery in metro areas",
    featBar2Title: "24-Month Warranty",
    featBar2Desc: "Official replacement guarantee",
    featBar3Title: "30-Day Trial",
    featBar3Desc: "100% refund if not satisfied",
    featBar4Title: "24/7 Technical Support",
    featBar4Desc: "Direct consultation with audio specialists",
    showroomTitle: "Explore Studio One",
    showroomSub: "Select the edition that best complements your style. Every piece is precision crafted from high-grade aluminum.",
    currentEditionLabel: "Current edition:",
    chooseColor: "Available Finishes:",
    swatchObsidian: "Matte Black",
    swatchGold: "Champagne Gold",
    swatchSilver: "Titanium Silver",
    descObsidian: "Timeless matte black finish. Oleophobic coating protects against fingerprints, keeping your gear clean during daily commutes.",
    descGold: "Understated champagne gold. Precision brushed aluminum texture offering subtle elegance and sophistication.",
    descSilver: "Crisp titanium silver. Lightweight aerospace aluminum frame built for lasting durability.",
    feat1: "High-grade 40mm Beryllium dynamic acoustic driver",
    feat2: "40 hours continuous battery • 10-minute fast charge for 5 hours",
    feat3: "Adaptive active noise cancellation with 4 environment modes",
    addShowroomToBag: "Add To Shopping Bag",
    specsTitle: "Technical Specifications",
    specsSub: "Meticulously measured and verified to international acoustic standards.",
    tabAcoustics: "Acoustics & Drivers",
    tabBattery: "Battery & Ports",
    tabBuild: "Materials & Specs",
    specDriverKey: "Driver Architecture",
    specDriverVal: "40mm Dynamic driver coated with transient Beryllium",
    specFreqKey: "Frequency Response",
    specAncKey: "Noise Cancellation",
    specAncNote: "Hybrid Active Noise Cancelling with 6 beamforming mics",
    specCodecKey: "Supported Codecs",
    specPlaytimeKey: "Playback Battery Life",
    specPlaytimeVal: "40 Hours (ANC On) / 55 Hours (ANC Off)",
    specFastChargeKey: "Fast Charging",
    specFastChargeVal: "10 mins charge provides 5 hours of playback",
    specPortKey: "Ports & Connectivity",
    specPortNote: "USB-C Power Delivery & 3.5mm analog audio jack",
    specFrameKey: "Chassis Material",
    specFrameVal: "Single-billet CNC machined aluminum frame",
    specCushionKey: "Ear Cushions & Band",
    specCushionVal: "Breathable protein leather with memory foam core",
    specWeightKey: "Net Weight",
    specWaterKey: "Weather Resistance",
    specWaterNote: "IP54 rated against dust and light water splashes",
    catalogTitle: "The Audio Collection",
    catalogSub: "Search and choose the ideal sound gear for work, travel, and personal listening.",
    searchPlaceholder: "Search by product name...",
    catAll: "All Pieces",
    catOverEar: "Over-Ear",
    catWireless: "Wireless Earbuds",
    catSpeaker: "Bluetooth Speakers",
    sortLabel: "Sort By:",
    sortNameAsc: "Name (A → Z)",
    sortNameDesc: "Name (Z → A)",
    sortPriceAsc: "Price (Low to High)",
    sortPriceDesc: "Price (High to Low)",
    pageSizeLabel: "Show:",
    pageSizeAll: "All",
    aboutBadge: "THE AURA PHILOSOPHY",
    aboutHeading: "Superior Quality, Enduring Design",
    aboutText1: "At AURA SOUND, we believe great headphones should not only sound pristine but also feel effortless to wear every day and last for years.",
    aboutText2: "Every product undergoes strict acoustic testing in certified chambers to deliver minimal harmonic distortion and authentic musical fidelity.",
    statWarranty: "24-Month official warranty",
    statBattery: "Continuous battery life",
    statSatisfaction: "Customer satisfaction rating",
    reviewsTitle: "Customer Reviews",
    reviewsSub: "Candid feedback from verified listeners who use AURA SOUND every day.",
    review1Text: "“Studio One is remarkably comfortable. I wear it for 8 hours of coding each day with zero ear pressure. The ANC keeps me completely focused.”",
    review1Role: "Software Engineer • Verified Studio One Buyer",
    review2Text: "“Wave Mini connects instantly to both my phone and laptop. The aluminum charging case feels solid and the battery lasts an entire week.”",
    review2Role: "Product Designer • Verified Wave Mini Buyer",
    review3Text: "“Room Speaker delivers warm room-filling acoustics with tight bass. Its clean minimalist form looks perfect on my bookshelf.”",
    review3Role: "Photographer • Verified Room Speaker Buyer",
    newsTitle: "Subscribe for Special Offers",
    newsDesc: "Receive new release updates and seasonal discount alerts directly from AURA SOUND.",
    newsletterPlaceholder: "Enter your email address...",
    subscribeBtn: "Subscribe",
    newsletterSuccess: "Thank you for subscribing! We have dispatched your welcome coupon.",
    footerAbout: "Provider of high-fidelity personal audio gear designed for authentic, comfortable everyday listening.",
    footerProducts: "PRODUCTS",
    footerServices: "POLICIES",
    footerContact: "FLAGSHIP STORES",
    footWarranty: "24-Month Warranty Policy",
    footDelivery: "Shipping Policy",
    footCare: "30-Day Return Policy",
    footPrivacy: "Privacy Policy",
    footTerms: "Terms of Service",
    zaloTooltip: "Quick Chat",
    voucherEyebrow: "NEW CUSTOMER PRIVILEGE",
    voucherTitle: "Enjoy 10% Off Your First Order",
    voucherDesc: "Apply this coupon code during checkout to enjoy 10% savings on your inaugural order at AURA SOUND.",
    codeLabel: "PROMO CODE:",
    copyCode: "Copy Code",
    copiedCode: "Copied! ✓",
    exploreWithVoucher: "Shop Products Now",
    voucherExpiry: "Applicable to all over-ear, wireless, and speaker pieces",
    showingCount: "Displaying {start} – {end} of {total} products",
    emptyCatalog: "No products matched your search keyword.",
    addedToCart: "Added “{name}” to your cart successfully!",
    cartSummary: "Cart contains {count} items • Total: {total}"
  }
};

let currentLang = "vi";

/* --------------------------------------------------------------------------
   2. DANH SÁCH SẢN PHẨM THƯƠNG MẠI
   -------------------------------------------------------------------------- */
const productsData = [
  {
    id: "prod-1",
    nameVi: "AURA Studio One",
    nameEn: "AURA Studio One",
    category: "overear",
    price: 3490000,
    badgeVi: "BÁN CHẠY",
    badgeEn: "BESTSELLER",
    descVi: "Tai nghe chống ồn chủ động, màng loa 40mm Beryllium, pin 40 giờ liên tục.",
    descEn: "Over-ear active noise cancelling headphones, 40mm Beryllium driver, 40-hour battery.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-2",
    nameVi: "AURA Wave Mini",
    nameEn: "AURA Wave Mini",
    category: "wireless",
    price: 1890000,
    badgeVi: "MỚI",
    badgeEn: "NEW",
    descVi: "Tai nghe True Wireless nhỏ gọn vỏ nhôm, kháng nước IPX5, hộp sạc dùng 28 giờ.",
    descEn: "Compact True Wireless aluminum earbuds, IPX5 water resistant, 28-hour case.",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-3",
    nameVi: "AURA Room Speaker",
    nameEn: "AURA Room Speaker",
    category: "speaker",
    price: 2750000,
    badgeVi: "TIÊU CHUẨN",
    badgeEn: "STANDARD",
    descVi: "Loa Bluetooth âm thanh 360 độ, dải bass ấm áp, phù hợp phòng ngủ và bàn làm việc.",
    descEn: "360-degree Bluetooth room speaker with warm bass for office or bedroom.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-4",
    nameVi: "AURA Horizon Soundbar",
    nameEn: "AURA Horizon Soundbar",
    category: "speaker",
    price: 5250000,
    badgeVi: "DOLBY AUDIO",
    badgeEn: "DOLBY AUDIO",
    descVi: "Loa thanh vòm hỗ trợ Dolby Audio, cổng HDMI eARC và kết nối Bluetooth 5.3.",
    descEn: "Surround soundbar with Dolby Audio support, HDMI eARC, and Bluetooth 5.3.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-5",
    nameVi: "AURA Studio Pro",
    nameEn: "AURA Studio Pro",
    category: "overear",
    price: 4890000,
    badgeVi: "KIỂM ÂM",
    badgeEn: "PRO REFERENCE",
    descVi: "Tai nghe phòng thu chuyên nghiệp, dải tần 10Hz - 45kHz, đệm tai thoáng khí.",
    descEn: "Professional studio reference headphones with 10Hz-45kHz frequency range.",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-6",
    nameVi: "AURA Pulse Sport",
    nameEn: "AURA Pulse Sport",
    category: "wireless",
    price: 1590000,
    badgeVi: "THỂ THAO",
    badgeEn: "SPORT",
    descVi: "Tai nghe không dây thể thao có móc vành tai, chuẩn kháng nước IP67 an tâm khi chạy bộ.",
    descEn: "Secure ear-hook wireless sports earbuds with IP67 sweat & water resistance.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-7",
    nameVi: "AURA Monolith Tower",
    nameEn: "AURA Monolith Tower",
    category: "speaker",
    price: 8900000,
    badgeVi: "CAO CẤP",
    badgeEn: "PREMIUM",
    descVi: "Cặp loa đứng công suất 200W, thùng gỗ tự nhiên, âm trường rộng lớn và sống động.",
    descEn: "Pair of 200W floorstanding towers crafted from natural wood with wide soundstage.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-8",
    nameVi: "AURA DAC/Amp USB-C",
    nameEn: "AURA DAC/Amp USB-C",
    category: "overear",
    price: 2190000,
    badgeVi: "PHỤ KIỆN",
    badgeEn: "ACCESSORY",
    descVi: "Bộ giải mã DAC di động jack 3.5mm cho điện thoại và máy tính, giải mã chuẩn Hi-Res 32-bit.",
    descEn: "Portable 32-bit Hi-Res USB-C DAC amplifier for smartphones and laptops.",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80"
  }
];

/* --------------------------------------------------------------------------
   3. TRẠNG THÁI (STATE)
   -------------------------------------------------------------------------- */
const state = {
  cart: [],
  searchQuery: "",
  category: "all",
  sortBy: "name-asc",
  pageSize: 10,
  currentPage: 1,
  activeColor: "obsidian"
};

const showroomColors = {
  obsidian: {
    nameVi: "AURA Studio One (Đen Nhám)",
    nameEn: "AURA Studio One (Matte Black)",
    editionLabelVi: "Đen Nhám (Matte Black)",
    editionLabelEn: "Matte Black",
    descKey: "descObsidian",
    price: 3490000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85"
  },
  gold: {
    nameVi: "AURA Studio One (Vàng Champagne)",
    nameEn: "AURA Studio One (Champagne Gold)",
    editionLabelVi: "Vàng Champagne (Gold)",
    editionLabelEn: "Champagne Gold",
    descKey: "descGold",
    price: 3690000,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=85"
  },
  silver: {
    nameVi: "AURA Studio One (Bạc Ánh Kim)",
    nameEn: "AURA Studio One (Titanium Silver)",
    editionLabelVi: "Bạc Ánh Kim (Silver)",
    editionLabelEn: "Titanium Silver",
    descKey: "descSilver",
    price: 3490000,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=85"
  }
};

/* --------------------------------------------------------------------------
   4. TIỆN ÍCH ĐỊNH DẠNG & THÔNG BÁO
   -------------------------------------------------------------------------- */
function formatPrice(amount) {
  if (currentLang === "en") {
    const usd = (amount / 24500).toFixed(2);
    return `$${usd}`;
  }
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

let toastTimer = null;
function showToast(message) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 2600);
}

/* --------------------------------------------------------------------------
   5. BỘ CHUYỂN NGỮ (i18n)
   -------------------------------------------------------------------------- */
function applyLanguage(lang) {
  currentLang = lang;
  const dict = i18n[lang];
  document.documentElement.lang = lang;
  document.title = dict.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) el.placeholder = dict[key];
  });

  const langFlag = document.getElementById("langFlag");
  if (langFlag) langFlag.textContent = lang === "vi" ? "EN" : "VI";

  updateShowroom(false);
  renderCatalog();
}

/* --------------------------------------------------------------------------
   6. SHOWROOM BỘ CHỌN MÀU SẮC
   -------------------------------------------------------------------------- */
function updateShowroom(withFade = true) {
  const item = showroomColors[state.activeColor];
  if (!item) return;

  const imgEl = document.getElementById("showroomProductImg");
  const nameEl = document.getElementById("showroomProductName");
  const priceEl = document.getElementById("showroomProductPrice");
  const badgeEl = document.getElementById("showroomColorBadge");
  const descEl = document.getElementById("showroomColorDesc");

  const name = currentLang === "vi" ? item.nameVi : item.nameEn;
  const editionName = currentLang === "vi" ? item.editionLabelVi : item.editionLabelEn;

  if (nameEl) nameEl.textContent = name;
  if (priceEl) priceEl.textContent = formatPrice(item.price);
  if (badgeEl) badgeEl.textContent = editionName;
  if (descEl) descEl.textContent = i18n[currentLang][item.descKey];

  if (imgEl) {
    if (withFade) {
      imgEl.classList.add("fade-out");
      setTimeout(() => {
        imgEl.src = item.image;
        imgEl.alt = name;
        imgEl.classList.remove("fade-out");
      }, 150);
    } else {
      imgEl.src = item.image;
      imgEl.alt = name;
    }
  }

  document.querySelectorAll(".color-pill-btn").forEach((btn) => {
    const isSelected = btn.dataset.colorId === state.activeColor;
    btn.classList.toggle("active", isSelected);
    btn.setAttribute("aria-checked", String(isSelected));
  });
}

function initShowroom() {
  document.querySelectorAll(".color-pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const colorId = btn.dataset.colorId;
      if (colorId && colorId !== state.activeColor) {
        state.activeColor = colorId;
        updateShowroom(true);
      }
    });
  });

  const addShowroomBtn = document.getElementById("addShowroomBtn");
  if (addShowroomBtn) {
    addShowroomBtn.addEventListener("click", () => {
      const item = showroomColors[state.activeColor];
      const prodName = currentLang === "vi" ? item.nameVi : item.nameEn;
      addToCart({ id: `showroom-${state.activeColor}`, name: prodName, price: item.price });
    });
  }
}

/* --------------------------------------------------------------------------
   7. BẢNG THÔNG SỐ TABS (CHUẨN ARIA)
   -------------------------------------------------------------------------- */
function initSpecTabs() {
  const tabLinks = [...document.querySelectorAll(".spec-tab-link")];
  const tabPanels = [...document.querySelectorAll(".spec-panel-body")];

  function activateTab(tab) {
    const targetPanelId = tab.dataset.tabTarget;

    tabLinks.forEach((t) => {
      const isCurrent = t === tab;
      t.classList.toggle("active", isCurrent);
      t.setAttribute("aria-selected", String(isCurrent));
      t.tabIndex = isCurrent ? 0 : -1;
    });

    tabPanels.forEach((panel) => {
      const isMatch = panel.id === targetPanelId;
      panel.classList.toggle("active", isMatch);
      panel.hidden = !isMatch;
    });
  }

  tabLinks.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));

    tab.addEventListener("keydown", (e) => {
      let nextIndex = index;
      if (e.key === "ArrowRight") nextIndex = (index + 1) % tabLinks.length;
      else if (e.key === "ArrowLeft") nextIndex = (index - 1 + tabLinks.length) % tabLinks.length;
      else return;

      e.preventDefault();
      tabLinks[nextIndex].focus();
      activateTab(tabLinks[nextIndex]);
    });
  });
}

/* --------------------------------------------------------------------------
   8. QUẢN LÝ DANH MỤC SẢN PHẨM (CHUẨN 4 TÍNH NĂNG .SKILL)
   -------------------------------------------------------------------------- */
function getFilteredAndSortedList() {
  let list = [...productsData];

  // 1. Tìm kiếm (Search)
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter((p) => {
      const name = (currentLang === "vi" ? p.nameVi : p.nameEn).toLowerCase();
      const desc = (currentLang === "vi" ? p.descVi : p.descEn).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }

  // 2. Lọc danh mục (Filter)
  if (state.category !== "all") {
    list = list.filter((p) => p.category === state.category);
  }

  // 3. Sắp xếp (Sort)
  list.sort((a, b) => {
    const nameA = currentLang === "vi" ? a.nameVi : a.nameEn;
    const nameB = currentLang === "vi" ? b.nameVi : b.nameEn;

    switch (state.sortBy) {
      case "name-asc":
        return nameA.localeCompare(nameB);
      case "name-desc":
        return nameB.localeCompare(nameA);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return list;
}

function renderCatalog() {
  const gridEl = document.getElementById("productGrid");
  const countInfoEl = document.getElementById("catalogCountInfo");
  const paginationWrap = document.getElementById("paginationWrap");
  if (!gridEl) return;

  const filtered = getFilteredAndSortedList();
  const totalCount = filtered.length;

  if (totalCount === 0) {
    gridEl.innerHTML = `
      <div class="catalog-empty-box">
        <p>${i18n[currentLang].emptyCatalog}</p>
      </div>
    `;
    if (countInfoEl) {
      countInfoEl.textContent = i18n[currentLang].showingCount
        .replace("{start}", "0").replace("{end}", "0").replace("{total}", "0");
    }
    if (paginationWrap) paginationWrap.innerHTML = "";
    return;
  }

  // 4. Phân trang (Pagination)
  const pageSize = state.pageSize === "all" ? totalCount : Number(state.pageSize);
  const totalPages = Math.ceil(totalCount / pageSize);

  if (state.currentPage > totalPages) {
    state.currentPage = 1;
  }

  const startIndex = (state.currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const currentItems = filtered.slice(startIndex, endIndex);

  gridEl.innerHTML = currentItems.map((prod) => {
    const name = currentLang === "vi" ? prod.nameVi : prod.nameEn;
    const desc = currentLang === "vi" ? prod.descVi : prod.descEn;
    const badge = currentLang === "vi" ? prod.badgeVi : prod.badgeEn;
    const categoryName = i18n[currentLang][`cat${capitalize(prod.category)}`] || prod.category;

    return `
      <article class="ecom-product-card" data-product-id="${prod.id}">
        <div class="card-thumb-wrap">
          <img src="${prod.image}" alt="${name}" class="card-thumb-img" loading="lazy" decoding="async">
          <span class="card-tag-badge">${badge}</span>
        </div>
        <div class="card-content-body">
          <span class="card-cat-label">${categoryName}</span>
          <h3 class="card-prod-title">${name}</h3>
          <p class="card-prod-summary">${desc}</p>
          <div class="card-action-bar">
            <span class="card-prod-price">${formatPrice(prod.price)}</span>
            <button class="btn-card-add-cart" type="button" data-add-id="${prod.id}">
              + Thêm
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  if (countInfoEl) {
    const text = i18n[currentLang].showingCount
      .replace("{start}", String(startIndex + 1))
      .replace("{end}", String(endIndex))
      .replace("{total}", String(totalCount));
    countInfoEl.textContent = text;
  }

  gridEl.querySelectorAll("[data-add-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prod = productsData.find((p) => p.id === btn.dataset.addId);
      if (prod) {
        const prodName = currentLang === "vi" ? prod.nameVi : prod.nameEn;
        addToCart({ id: prod.id, name: prodName, price: prod.price });
      }
    });
  });

  renderPaginationButtons(totalPages);
}

function capitalize(str) {
  if (!str) return "";
  if (str === "overear") return "OverEar";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderPaginationButtons(totalPages) {
  const paginationWrap = document.getElementById("paginationWrap");
  if (!paginationWrap) return;

  if (totalPages <= 1 || state.pageSize === "all") {
    paginationWrap.innerHTML = "";
    return;
  }

  let html = `
    <button class="page-link-btn" type="button" data-page="prev" ${state.currentPage === 1 ? "disabled" : ""} aria-label="Trang trước">Trước</button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === state.currentPage;
    html += `
      <button class="page-link-btn ${isActive ? "active" : ""}" type="button" data-page="${i}">${i}</button>
    `;
  }

  html += `
    <button class="page-link-btn" type="button" data-page="next" ${state.currentPage === totalPages ? "disabled" : ""} aria-label="Trang sau">Sau</button>
  `;

  paginationWrap.innerHTML = html;

  paginationWrap.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.dataset.page;
      if (val === "prev" && state.currentPage > 1) {
        state.currentPage--;
      } else if (val === "next" && state.currentPage < totalPages) {
        state.currentPage++;
      } else if (!isNaN(Number(val))) {
        state.currentPage = Number(val);
      }
      renderCatalog();
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function initCatalogToolbar() {
  const searchInput = document.getElementById("productSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const categoryFilters = document.getElementById("categoryFilters");
  const sortSelect = document.getElementById("productSortSelect");
  const pageSizeSelect = document.getElementById("pageSizeSelect");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      state.currentPage = 1;
      if (clearSearchBtn) {
        clearSearchBtn.hidden = state.searchQuery.length === 0;
      }
      renderCatalog();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      state.searchQuery = "";
      clearSearchBtn.hidden = true;
      state.currentPage = 1;
      renderCatalog();
    });
  }

  if (categoryFilters) {
    categoryFilters.querySelectorAll(".filter-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryFilters.querySelectorAll(".filter-tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.category = btn.dataset.category || "all";
        state.currentPage = 1;
        renderCatalog();
      });
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });
  }

  if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", (e) => {
      state.pageSize = e.target.value === "all" ? "all" : Number(e.target.value);
      state.currentPage = 1;
      renderCatalog();
    });
  }
}

/* --------------------------------------------------------------------------
   9. GIỎ HÀNG (SHOPPING CART)
   -------------------------------------------------------------------------- */
function addToCart(product) {
  state.cart.push(product);
  const badge = document.getElementById("bagCount");
  if (badge) badge.textContent = String(state.cart.length);
  const msg = i18n[currentLang].addedToCart.replace("{name}", product.name);
  showToast(msg);
}

function initCartButton() {
  const bagBtn = document.getElementById("bagButton");
  if (bagBtn) {
    bagBtn.addEventListener("click", () => {
      if (state.cart.length === 0) {
        showToast(currentLang === "vi" ? "Giỏ hàng hiện đang trống." : "Your shopping bag is empty.");
        return;
      }
      const total = state.cart.reduce((sum, item) => sum + item.price, 0);
      const msg = i18n[currentLang].cartSummary
        .replace("{count}", String(state.cart.length))
        .replace("{total}", formatPrice(total));
      showToast(msg);
    });
  }
}

/* --------------------------------------------------------------------------
   10. POPUP MODAL VOUCHER 10% (SAU 10S)
   -------------------------------------------------------------------------- */
function initVoucherModal() {
  const modalBackdrop = document.getElementById("voucherModalBackdrop");
  const closeBtn = document.getElementById("closeVoucherModalBtn");
  const applyBtn = document.getElementById("applyVoucherNowBtn");
  const copyBtn = document.getElementById("copyCouponBtn");
  const couponCodeVal = document.getElementById("couponCodeVal");

  function openVoucher() {
    if (sessionStorage.getItem("aura_voucher_closed")) return;
    if (modalBackdrop) modalBackdrop.removeAttribute("hidden");
  }

  function closeVoucher() {
    if (modalBackdrop) modalBackdrop.setAttribute("hidden", "true");
    sessionStorage.setItem("aura_voucher_closed", "true");
  }

  // Tự động bật sau 10 giây (theo yêu cầu đề bài)
  setTimeout(openVoucher, 10000);

  if (closeBtn) closeBtn.addEventListener("click", closeVoucher);
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      closeVoucher();
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (copyBtn && couponCodeVal) {
    copyBtn.addEventListener("click", () => {
      const code = couponCodeVal.textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        const copyBtnText = document.getElementById("copyBtnText");
        if (copyBtnText) copyBtnText.textContent = i18n[currentLang].copiedCode;
        showToast(currentLang === "vi" ? "Đã sao chép mã AURA10!" : "Copied code AURA10!");
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = i18n[currentLang].copyCode;
        }, 2000);
      });
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeVoucher();
    });
  }
}

/* --------------------------------------------------------------------------
   11. MODAL ĐẶC TẢ ĐỀ BÀI & RUBRIC
   -------------------------------------------------------------------------- */
function initSpecModal() {
  const openBtn = document.getElementById("openSpecModalBtn");
  const modalBackdrop = document.getElementById("specModalBackdrop");
  const closeBtn = document.getElementById("closeSpecModalBtn");
  const closeBottomBtn = document.getElementById("closeSpecModalBottomBtn");

  function openModal() {
    if (modalBackdrop) modalBackdrop.removeAttribute("hidden");
  }

  function closeModal() {
    if (modalBackdrop) modalBackdrop.setAttribute("hidden", "true");
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeBottomBtn) closeBottomBtn.addEventListener("click", closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      const voucherModal = document.getElementById("voucherModalBackdrop");
      if (voucherModal && !voucherModal.hasAttribute("hidden")) {
        voucherModal.setAttribute("hidden", "true");
        sessionStorage.setItem("aura_voucher_closed", "true");
      }
    }
  });
}

/* --------------------------------------------------------------------------
   12. STICKY HEADER & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initHeaderAndNav() {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const langToggle = document.getElementById("languageToggle");

  // Sticky Header cuộn đổi shadow nhẹ
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 30);
    }
  }, { passive: true });

  // Toggle mobile drawer
  function toggleMobileMenu(isOpen) {
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    }
    if (primaryNav) primaryNav.classList.toggle("is-open", isOpen);
    if (drawerBackdrop) drawerBackdrop.classList.toggle("is-open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = primaryNav?.classList.contains("is-open");
      toggleMobileMenu(!isOpen);
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", () => toggleMobileMenu(false));
  }

  if (primaryNav) {
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleMobileMenu(false));
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const nextLang = currentLang === "vi" ? "en" : "vi";
      applyLanguage(nextLang);
    });
  }
}

/* --------------------------------------------------------------------------
   13. FORM ĐĂNG KÝ BẢN TIN (NEWSLETTER)
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const msgEl = document.getElementById("newsletterMsg");
  const inputEl = document.getElementById("newsletterEmailInput");

  if (form && msgEl && inputEl) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = inputEl.value.trim();
      if (!email) return;

      msgEl.textContent = i18n[currentLang].newsletterSuccess;
      inputEl.value = "";
      setTimeout(() => {
        msgEl.textContent = "";
      }, 5000);
    });
  }
}

/* --------------------------------------------------------------------------
   14. KHỞI CHẠY (INITIALIZATION)
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initHeaderAndNav();
  initShowroom();
  initSpecTabs();
  initCatalogToolbar();
  renderCatalog();
  initCartButton();
  initVoucherModal();
  initSpecModal();
  initNewsletter();
  applyLanguage(currentLang);
});

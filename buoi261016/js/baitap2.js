/**
 * ==============================================================================
 * BÀI TẬP 2: KẾ HOẠCH DU LỊCH & THỜI TIẾT TRỰC TIẾP (DYNAMIC GLASSMORPHISM)
 * Nhóm 2 - Đại Học Lạc Hồng
 * Công nghệ: JavaScript ES6+ thuần, Open-Meteo Realtime API, LocalStorage
 * Tính năng mới: Chế độ 3 Nấc Thông Minh (Auto Ngày/Đêm theo giờ thực, Sáng Light, Tối Dark)
 * Tối ưu hóa toàn diện cho Mobile & Icon thời tiết tinh tế hợp lý
 * ==============================================================================
 */

/**
 * ------------------------------------------------------------------------------
 * 1. BỘ DỮ LIỆU 34 TỈNH THÀNH VIỆT NAM (ARRAY OF OBJECTS)
 * Tối thiểu gồm Biên Hòa (Đồng Nai), Đà Lạt (Lâm Đồng), Vũng Tàu (Bà Rịa - Vũng Tàu)
 * Kèm tọa độ vệ tinh, phân vùng, ảnh nền ban ngày (Day) & ban đêm (Night) chất lượng cao
 * ------------------------------------------------------------------------------
 */
const VIETNAM_34_PROVINCES = [
  // MIỀN BẮC (12 tỉnh thành)
  {
    id: 'hanoi',
    name: 'Hà Nội',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 21.0285,
    lng: 105.8542,
    bgDay: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Thủ đô nghìn năm văn hiến mờ sương sớm quanh Hồ Gươm. Đừng quên dạo bộ phố cổ, thưởng thức cà phê trứng béo ngậy và ngắm hoàng hôn trên cầu Long Biên lịch sử.',
    clothingAdvice: 'Khí hậu biến nhiệt theo mùa; mùa đông lạnh cần áo khoác dày, mùa hè nên chuẩn bị ô che nắng và trang phục trang nhã khi viếng di tích văn hóa.',
    recommendedPlaces: [
      { name: 'Hồ Hoàn Kiếm & Phố Cổ Hà Nội', category: 'Cảnh quan & Văn hóa', defaultTime: '07:30 AM', icon: '🏛️' },
      { name: 'Hoàng Thành Thăng Long ngàn năm', category: 'Di tích lịch sử', defaultTime: '09:30 AM', icon: '🏯' },
      { name: 'Văn Miếu - Quốc Tử Giám', category: 'Di tích giáo dục cổ', defaultTime: '02:30 PM', icon: '📜' },
      { name: 'Cầu Long Biên hoàng hôn Sông Hồng', category: 'Check-in biểu tượng', defaultTime: '05:30 PM', icon: '🌉' }
    ]
  },
  {
    id: 'quangninh',
    name: 'Quảng Ninh (Hạ Long)',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 20.9505,
    lng: 107.0734,
    bgDay: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Vịnh Hạ Long tựa bức tranh thủy mặc khổng lồ giữa đất trời với hàng nghìn đảo đá vôi kỳ ảo. Hãy thử chèo kayak len lỏi qua hang Luồn để tận hưởng cảm giác ngoạn mục.',
    clothingAdvice: 'Nên mang trang phục bãi biển nhẹ mát mùa hè, kính râm chống lóa mặt nước và giày leo núi bám tốt khi viếng danh thắng non thiêng Yên Tử.',
    recommendedPlaces: [
      { name: 'Du thuyền khám phá Vịnh Hạ Long', category: 'Kỳ quan thiên nhiên thế giới', defaultTime: '08:00 AM', icon: '⛵' },
      { name: 'Danh thắng Non thiêng Chùa Yên Tử', category: 'Tâm linh & Cảnh quan', defaultTime: '10:00 AM', icon: '⛰️' },
      { name: 'Bảo tàng Quảng Ninh kiến trúc than đá', category: 'Văn hóa & Nghệ thuật', defaultTime: '02:00 PM', icon: '🏛️' },
      { name: 'Bãi biển Bãi Cháy ngắm cầu Bãi Cháy', category: 'Nghỉ dưỡng ven biển', defaultTime: '04:30 PM', icon: '🏖️' }
    ]
  },
  {
    id: 'haiphong',
    name: 'Hải Phòng',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 20.8449,
    lng: 106.6881,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Thành phố Cảng hoa phượng đỏ rực rỡ với quần đảo Cát Bà xanh màu ngọc bích. Food tour Hải Phòng với bánh đa cua và bánh mì cay chắc chắn sẽ chinh phục bạn.',
    clothingAdvice: 'Mang giày bệt hoặc giày thể thao mềm để thoải mái đi bộ khám phá ẩm thực quanh khu phố cổ.',
    recommendedPlaces: [
      { name: 'Quần đảo Cát Bà & Vịnh Lan Hạ', category: 'Khu dự trữ sinh quyển', defaultTime: '08:30 AM', icon: '🏝️' },
      { name: 'Khu du lịch Bến Nghiêng - Đồ Sơn', category: 'Lịch sử & Bãi tắm', defaultTime: '11:00 AM', icon: '🌊' },
      { name: 'Food Tour Ga Hải Phòng & Chợ Cát Bi', category: 'Ẩm thực đường phố', defaultTime: '03:00 PM', icon: '🍲' },
      { name: 'Nhà hát Lớn Hải Phòng cổ kính', category: 'Kiến trúc Pháp cổ', defaultTime: '07:00 PM', icon: '🎭' }
    ]
  },
  {
    id: 'ninhbinh',
    name: 'Ninh Bình (Tràng An)',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 20.2506,
    lng: 105.9745,
    bgDay: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Tràng An non nước hữu tình với những dòng sông uốn lượn quanh chân núi đá vôi. Trải nghiệm leo gần 500 bậc đá Hang Múa ngắm trọn thung lũng Tam Cốc đẹp mê hồn.',
    clothingAdvice: 'Mặc trang phục màu sáng để chụp ảnh chèo thuyền; mang nón lá hoặc mũ rộng vành che nắng.',
    recommendedPlaces: [
      { name: 'Quần thể danh thắng Tràng An', category: 'Di sản thế giới UNESCO', defaultTime: '08:00 AM', icon: '🛶' },
      { name: 'Hang Múa ngắm thung lũng lúa', category: 'Leo núi ngắm toàn cảnh', defaultTime: '10:30 AM', icon: '🐉' },
      { name: 'Cố đô Hoa Lư linh thiêng', category: 'Di tích lịch sử kinh đô xưa', defaultTime: '02:00 PM', icon: '⛩️' },
      { name: 'Quần thể Chùa Bái Đính nguy nga', category: 'Tâm linh Phật giáo', defaultTime: '04:00 PM', icon: '🛕' }
    ]
  },
  {
    id: 'laocai',
    name: 'Lào Cai (Sa Pa)',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 22.3364,
    lng: 103.8438,
    bgDay: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Sa Pa bồng bềnh trong biển mây trắng muốt, nơi bạn có thể chạm tay vào Nóc nhà Đông Dương Fansipan và thưởng thức nồi lẩu cá tầm nóng hổi trong tiết trời lạnh buốt.',
    clothingAdvice: 'Nhiệt độ vùng cao thường dưới 15°C; chuẩn bị áo phao dày, áo giữ nhiệt, khăn quàng cổ và giày chống trơn trượt.',
    recommendedPlaces: [
      { name: 'Đỉnh Fansipan 3.143m Nóc nhà Đông Dương', category: 'Chinh phục đỉnh cao', defaultTime: '08:00 AM', icon: '🏔️' },
      { name: 'Bản Cát Cát của người H’Mông', category: 'Văn hóa bản địa vùng cao', defaultTime: '11:00 AM', icon: '🏡' },
      { name: 'Đèo Ô Quy Hồ & Cổng Trời lộng gió', category: 'Tứ đại đỉnh đèo', defaultTime: '04:00 PM', icon: '🌄' },
      { name: 'Nhà thờ Đá Sa Pa cổ kính', category: 'Kiến trúc biểu tượng', defaultTime: '07:30 PM', icon: '⛪' }
    ]
  },
  {
    id: 'hagiang',
    name: 'Hà Giang',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 22.8233,
    lng: 104.9836,
    bgDay: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Hà Giang hùng vĩ với con đèo Mã Pí Lèng huyền thoại và dòng sông Nho Quế màu ngọc bích xẻ đôi hẻm núi Tu Sản. Cảm giác chinh phục những dốc cua ngoạn mục không đâu sánh bằng.',
    clothingAdvice: 'Cung đường phượt dốc cao và gió lạnh; cần trang phục gọn gàng cản gió, giày thể thao bám đá và kính bảo hộ.',
    recommendedPlaces: [
      { name: 'Đèo Mã Pí Lèng & Đi thuyền Hẻm Tu Sản', category: 'Kỳ quan đèo dốc sông Nho Quế', defaultTime: '08:30 AM', icon: '🏞️' },
      { name: 'Cột cờ Quốc gia Lũng Cú cực Bắc', category: 'Điểm cực thiêng liêng', defaultTime: '11:30 AM', icon: '🚩' },
      { name: 'Dinh thự Vua Mèo Vương Chính Đức', category: 'Kiến trúc đá bề thế', defaultTime: '02:30 PM', icon: '🏰' },
      { name: 'Cánh đồng hoa Tam Giác Mạch', category: 'Sắc hoa cao nguyên đá', defaultTime: '04:30 PM', icon: '🌸' }
    ]
  },
  {
    id: 'caobang',
    name: 'Cao Bằng',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 22.6664,
    lng: 106.2639,
    bgDay: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Thác Bản Giốc tung bọt trắng xóa như dải lụa tiên giữa biên cương. Không gian trong lành tĩnh mịch của suối Lê-nin biếc xanh đem lại sự bình yên tuyệt đối.',
    clothingAdvice: 'Mang trang phục năng động, túi chống nước cho điện thoại khi chèo bè tre ngắm chân thác nước Bản Giốc.',
    recommendedPlaces: [
      { name: 'Thác Bản Giốc thác nước tự nhiên', category: 'Kỳ quan thác nước biên giới', defaultTime: '08:30 AM', icon: '🌊' },
      { name: 'Động Ngườm Ngao thạch nhũ vàng', category: 'Hang động kỳ vĩ', defaultTime: '11:00 AM', icon: '🪨' },
      { name: 'Di tích Pác Bó & Suối Lê-nin', category: 'Cội nguồn lịch sử', defaultTime: '02:00 PM', icon: '🌿' },
      { name: 'Đèo Mẻ Pia 14 tầng dốc đứng', category: 'Cung đường đèo hiểm trở', defaultTime: '04:30 PM', icon: '🛣️' }
    ]
  },
  {
    id: 'sonla',
    name: 'Sơn La (Mộc Châu)',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 20.8436,
    lng: 104.6468,
    bgDay: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Mộc Châu xanh mướt những đồi chè bát ngát và rừng mận trắng tinh khôi mùa hoa nở rộ. Đừng quên thử sữa tươi nóng và bê chao giòn rụm thơm lừng.',
    clothingAdvice: 'Ngày nắng dịu nhưng đêm vùng thảo nguyên hạ nhiệt rất nhanh; nên mang áo khoác len mỏng và giày đi bộ dã ngoại.',
    recommendedPlaces: [
      { name: 'Đồi chè Trái Tim Mộc Châu xanh ngát', category: 'Cảnh quan thảo nguyên', defaultTime: '07:30 AM', icon: '🌱' },
      { name: 'Thác Dải Yếm & Cầu Kính Tình Yêu', category: 'Thác nước & Trải nghiệm', defaultTime: '10:00 AM', icon: '🌉' },
      { name: 'Rừng thông Bản Áng dạo hồ cắm trại', category: 'Sinh thái dã ngoại', defaultTime: '02:30 PM', icon: '🌲' },
      { name: 'Thung lũng Mận Nà Ka hái quả', category: 'Vườn cây trái đặc sản', defaultTime: '04:30 PM', icon: '🍎' }
    ]
  },
  {
    id: 'yenbai',
    name: 'Yên Bái (Mù Cang Chải)',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 21.7168,
    lng: 104.8979,
    bgDay: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Những sóng lúa bậc thang vàng óng ở Mù Cang Chải tựa như vân tay của trời đất khắc tạc vào sườn núi. Đèo Khau Phạ mùa dù lượn bay trên mùa vàng đẹp khó quên.',
    clothingAdvice: 'Nắng núi khá gắt ban trưa nhưng se lạnh ban sáng; mặc trang phục thể thao thoải mái, mang nón vải và kem chống nắng.',
    recommendedPlaces: [
      { name: 'Đồi Mâm Xôi & Móng Ngựa Mù Cang Chải', category: 'Tuyệt tác ruộng bậc thang', defaultTime: '07:30 AM', icon: '🌾' },
      { name: 'Đèo Khau Phạ dù lượn mùa vàng', category: 'Đèo mây hùng vĩ Tây Bắc', defaultTime: '10:30 AM', icon: '🪂' },
      { name: 'Bản du lịch cộng đồng Lìm Mông', category: 'Văn hóa Thái - Mông', defaultTime: '02:00 PM', icon: '🏡' },
      { name: 'Hồ Thác Bà nghìn đảo xanh', category: 'Hồ sinh thái', defaultTime: '04:00 PM', icon: '🏝️' }
    ]
  },
  {
    id: 'thanhhoa',
    name: 'Thanh Hóa (Pù Luông)',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 19.8067,
    lng: 105.7852,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Pù Luông ẩn mình giữa thung lũng mây mờ với những cọn nước tre róc rách và khu nghỉ dưỡng sinh thái bình yên. Biển Sầm Sơn sôi động đón gió lộng ngập tràn sức sống.',
    clothingAdvice: 'Chuẩn bị đồ bơi nếu đi biển Sầm Sơn, và giày leo núi êm ái khi trekking qua các bản làng Don, Kho Mường ở Pù Luông.',
    recommendedPlaces: [
      { name: 'Khu bảo tồn thiên nhiên Pù Luông', category: 'Sinh thái ruộng bậc thang', defaultTime: '08:00 AM', icon: '🏞️' },
      { name: 'Bãi biển Sầm Sơn đón sóng hè', category: 'Bãi biển nghỉ dưỡng', defaultTime: '11:00 AM', icon: '🏖️' },
      { name: 'Di sản Thành Nhà Hồ đá xanh cổ', category: 'Di sản văn hóa UNESCO', defaultTime: '02:30 PM', icon: '🧱' },
      { name: 'Suối Cá Thần Cẩm Lương kỳ thú', category: 'Thắng cảnh thiên nhiên', defaultTime: '04:30 PM', icon: '🐟' }
    ]
  },
  {
    id: 'nghean',
    name: 'Nghệ An',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 18.6734,
    lng: 105.6813,
    bgDay: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Vùng đất Lam Hồng mộc mạc với di tích Làng Sen quê Bác tỏa hương thơm ngát và đảo chè Thanh Chương uốn lượn giữa lòng hồ xanh ngăn ngắt.',
    clothingAdvice: 'Gió Lào mùa hạ thổi khá khô nóng; nên uống nhiều nước lọc, mặc áo chống nắng và đội mũ rộng vành.',
    recommendedPlaces: [
      { name: 'Khu di tích Kim Liên Làng Sen quê Bác', category: 'Di tích lịch sử cội nguồn', defaultTime: '08:00 AM', icon: '🪷' },
      { name: 'Đảo Chè Thanh Chương chèo thuyền', category: 'Ốc đảo chè xanh mát', defaultTime: '10:30 AM', icon: '🍃' },
      { name: 'Bãi biển Cửa Lò dạo mát hải sản', category: 'Bãi tắm & Mực nhảy', defaultTime: '03:30 PM', icon: '🌅' },
      { name: 'Vườn quốc gia Pù Mát thác Kèm', category: 'Khu dự trữ sinh quyển', defaultTime: '05:00 PM', icon: '🌳' }
    ]
  },
  {
    id: 'quangbinh',
    name: 'Quảng Bình',
    region: 'bac',
    regionName: 'Miền Bắc',
    lat: 17.4690,
    lng: 106.6223,
    bgDay: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Vương quốc hang động thế giới sở hữu động Thiên Đường lộng lẫy như cung điện ngầm và suối Nước Moọc mát lạnh như ngọc thạch.',
    clothingAdvice: 'Thám hiểm hang động cần giày lội nước có độ bám cao, đèn pin đeo trán và áo thun thể thao nhanh khô.',
    recommendedPlaces: [
      { name: 'Động Phong Nha di sản hang ngầm', category: 'Kỳ quan thiên nhiên thế giới', defaultTime: '08:30 AM', icon: '🛶' },
      { name: 'Động Thiên Đường hoàng cung dưới lòng đất', category: 'Thạch nhũ kỳ vĩ tráng lệ', defaultTime: '11:00 AM', icon: '✨' },
      { name: 'Khu sinh thái Suối Nước Moọc kayak', category: 'Dòng suối xanh mát lạnh', defaultTime: '02:30 PM', icon: '🏞️' },
      { name: 'Đồi cát Quang Phú ngắm biển Nhật Lệ', category: 'Trượt cát sa mạc ven biển', defaultTime: '05:00 PM', icon: '🏜️' }
    ]
  },

  // MIỀN TRUNG & TÂY NGUYÊN (12 tỉnh thành)
  {
    id: 'hue',
    name: 'Thừa Thiên Huế',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 16.4637,
    lng: 107.5909,
    bgDay: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Cố đô Huế trầm mặc soi bóng xuống dòng sông Hương thơ mộng. Thưởng thức cơm hến cay nồng, nghe ca Huế trên thuyền rồng mang lại trải nghiệm hoài niệm sâu lắng.',
    clothingAdvice: 'Mặc áo dài truyền thống hoặc trang phục kín đáo khi viếng lăng tẩm và Đại Nội; Huế hay có mưa bất chợt nên chuẩn bị ô.',
    recommendedPlaces: [
      { name: 'Đại Nội Kinh thành Huế hoàng cung', category: 'Di sản văn hóa thế giới', defaultTime: '08:00 AM', icon: '🏯' },
      { name: 'Chùa Thiên Mụ & Tháp Phước Duyên', category: 'Cổ tự đệ nhất bên sông Hương', defaultTime: '10:30 AM', icon: '🛕' },
      { name: 'Lăng Khải Định kiến trúc tinh xảo', category: 'Kiến trúc lăng tẩm hoàng gia', defaultTime: '02:00 PM', icon: '🏛️' },
      { name: 'Nghe Ca Huế du thuyền Sông Hương đêm', category: 'Nhã nhạc cung đình di sản', defaultTime: '07:30 PM', icon: '🎵' }
    ]
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 16.0544,
    lng: 108.2022,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Thành phố biển hiện đại với bờ biển Mỹ Khê trải dài cát trắng mịn, bán đảo Sơn Trà hoang sơ và Cầu Vàng Bà Nà Hills như dải lụa nâng niu giữa lưng chừng mây.',
    clothingAdvice: 'Thời tiết ấm áp nắng vàng; trang phục đi biển thoáng mát, mang áo khoác mỏng nếu đi cáp treo lên đỉnh Bà Nà.',
    recommendedPlaces: [
      { name: 'Bán đảo Sơn Trà & Chùa Linh Ứng', category: 'Biển đảo & Tượng Phật Bà', defaultTime: '08:00 AM', icon: '🌊' },
      { name: 'Bà Nà Hills & Check-in Cầu Vàng', category: 'Nghỉ dưỡng & Cầu Bàn Tay', defaultTime: '10:30 AM', icon: '🌉' },
      { name: 'Danh thắng Ngũ Hành Sơn hang động', category: 'Kỳ quan đá cẩm thạch', defaultTime: '03:00 PM', icon: '⛰️' },
      { name: 'Cầu Rồng xem phun lửa và nước đêm', category: 'Biểu tượng kiến trúc sông Hàn', defaultTime: '08:30 PM', icon: '🐉' }
    ]
  },
  {
    id: 'quangnam',
    name: 'Quảng Nam (Hội An)',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 15.8801,
    lng: 108.3380,
    bgDay: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Phố cổ Hội An quyến rũ với những bức tường vàng hoa giấy, đèn lồng ngũ sắc lung linh soi bóng sông Hoài và vị đậm đà của tô mì Quảng trứ danh.',
    clothingAdvice: 'Nên thuê xe đạp dạo ngõ nhỏ, chọn trang phục phong cách vintage để chụp những khung hình đậm chất hoài cổ.',
    recommendedPlaces: [
      { name: 'Phố cổ Hội An & Chùa Cầu trăm tuổi', category: 'Di sản văn hóa nhân loại UNESCO', defaultTime: '08:30 AM', icon: '🏮' },
      { name: 'Thánh địa Mỹ Sơn di sản Chămpa', category: 'Di tích đền tháp cổ', defaultTime: '11:00 AM', icon: '🛕' },
      { name: 'Rừng dừa Bảy Mẫu thuyền thúng', category: 'Trải nghiệm múa thuyền thúng', defaultTime: '03:00 PM', icon: '🥥' },
      { name: 'Thả hoa đăng ước nguyện sông Hoài', category: 'Lãng mạn đêm phố cổ', defaultTime: '07:00 PM', icon: '✨' }
    ]
  },
  {
    id: 'quangngai',
    name: 'Quảng Ngãi (Đảo Lý Sơn)',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 15.1205,
    lng: 108.7923,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Đảo ngọc Lý Sơn hình thành từ nham thạch núi lửa cổ đại với làn nước biển trong vắt nhìn thấy đáy san hô. Cổng Tò Vò lúc hoàng hôn tạo nên bức tranh huyền ảo.',
    clothingAdvice: 'Gió biển và nắng đảo rất mạnh; cần bôi kem chống nắng đầy đủ, mang kính râm và dép đi biển bám đá.',
    recommendedPlaces: [
      { name: 'Cổng Tò Vò vách đá nham thạch tự nhiên', category: 'Kỳ quan địa chất núi lửa', defaultTime: '06:00 AM', icon: '🪨' },
      { name: 'Đỉnh Thới Lới cột cờ Tổ quốc', category: 'Miệng núi lửa cổ ngắm toàn cảnh', defaultTime: '09:00 AM', icon: '🌋' },
      { name: 'Đảo Bé An Bình lặn ngắm san hô', category: 'Bãi biển thiên đường xanh biếc', defaultTime: '02:00 PM', icon: '🤿' },
      { name: 'Chùa Hang trong lòng vách đá cổ', category: 'Tâm linh biển đảo thiêng liêng', defaultTime: '04:30 PM', icon: '⛩️' }
    ]
  },
  {
    id: 'binhdinh',
    name: 'Bình Định (Quy Nhơn)',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 13.7830,
    lng: 109.2197,
    bgDay: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Quy Nhơn hoang sơ và thi vị với con đường ven eo biển lộng gió Eo Gió và bãi biển Kỳ Co trong xanh như ngọc bích.',
    clothingAdvice: 'Nắng gió miền duyên hải miền Trung; chuẩn bị mũ cói rộng vành, kính râm và trang phục sáng màu chụp ảnh biển.',
    recommendedPlaces: [
      { name: 'Eo Gió eo biển đón bình minh đẹp nhất', category: 'Vách đá lộng gió kỳ vĩ', defaultTime: '06:00 AM', icon: '🌅' },
      { name: 'Bãi biển Kỳ Co cát vàng biển ngọc', category: 'Maldives của Việt Nam', defaultTime: '09:30 AM', icon: '🏖️' },
      { name: 'Khu du lịch Ghềnh Ráng Tiên Sa Bãi Trứng', category: 'Thi ca & Bãi đá Trứng', defaultTime: '02:30 PM', icon: '🥚' },
      { name: 'Tháp Đôi Chămpa trung tâm phố', category: 'Kiến trúc Chăm cổ đại', defaultTime: '05:00 PM', icon: '🛕' }
    ]
  },
  {
    id: 'phuyen',
    name: 'Phú Yên',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 13.0882,
    lng: 109.3075,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Xứ sở hoa vàng trên cỏ xanh với kiệt tác địa chất Gành Đá Đĩa gồm hàng vạn cột đá bazan đen óng và Mũi Điện đón ánh bình minh đầu tiên trên đất liền.',
    clothingAdvice: 'Thời tiết ấm áp nắng vàng quanh năm; chuẩn bị váy áo maxi dài, nón rộng vành và dép bám đá san hô.',
    recommendedPlaces: [
      { name: 'Gành Đá Đĩa kiệt tác bazan tổ ong', category: 'Di tích quốc gia đặc biệt', defaultTime: '07:30 AM', icon: '🪨' },
      { name: 'Mũi Điện & Hải đăng Đại Lãnh', category: 'Đón bình minh đầu tiên', defaultTime: '05:30 AM', icon: '🗼' },
      { name: 'Bãi Xép hoa vàng trên cỏ xanh', category: 'Thảo nguyên ven biển', defaultTime: '02:30 PM', icon: '🌼' },
      { name: 'Tháp Nghinh Phong quảng trường gió', category: 'Kiến trúc biểu tượng mới', defaultTime: '05:30 PM', icon: '🏛️' }
    ]
  },
  {
    id: 'khanhhoa',
    name: 'Khánh Hòa (Nha Trang)',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 12.2388,
    lng: 109.1967,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Vịnh biển Nha Trang tuyệt mỹ với nước biển trong vắt quanh năm, các môn thể thao lặn biển ngắm rạn san hô rực rỡ và ẩm thực nem nướng thơm lừng khó quên.',
    clothingAdvice: 'Nắng ấm chan hòa; mang đồ bơi, kính lặn ngắm san hô, kem chống nắng thân thiện môi trường và khăn tắm lớn.',
    recommendedPlaces: [
      { name: 'Tour 4 đảo Vịnh Nha Trang ngắm san hô', category: 'Sinh thái biển đảo hàng đầu', defaultTime: '08:30 AM', icon: '🤿' },
      { name: 'Tháp Bà Ponagar linh thiêng cổ kính', category: 'Di sản văn hóa kiến trúc Chăm', defaultTime: '11:30 AM', icon: '🛕' },
      { name: 'Viện Hải dương học Nha Trang', category: 'Thế giới sinh vật biển phong phú', defaultTime: '02:30 PM', icon: '🐬' },
      { name: 'Quảng trường 2/4 & Tháp Trầm Hương', category: 'Dạo mát bờ biển trung tâm', defaultTime: '06:30 PM', icon: '🏙️' }
    ]
  },
  {
    id: 'ninhthuan',
    name: 'Ninh Thuận (Phan Rang)',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 11.5647,
    lng: 108.9950,
    bgDay: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Vùng đất nắng và gió với vịnh Vĩnh Hy êm đềm tựa bức tranh thủy mặc, những chùm nho mọng nước và đồi cát Nam Cương lượn sóng tựa sa mạc.',
    clothingAdvice: 'Thời tiết khô ráo đặc trưng bán khô hạn; mang nón che nắng, kem dưỡng ẩm da và uống nhiều nước khoáng.',
    recommendedPlaces: [
      { name: 'Vịnh Vĩnh Hy & Hang Rái san hô cổ', category: 'Vịnh biển kỳ vĩ & Hang đá sóng', defaultTime: '08:00 AM', icon: '🌊' },
      { name: 'Vườn Nho Ba Mọi thưởng thức nho tươi', category: 'Nông nghiệp sinh thái trĩu quả', defaultTime: '11:00 AM', icon: '🍇' },
      { name: 'Tháp Po Klong Garai đỉnh cao gạch nung', category: 'Kiến trúc tháp Chăm uy nghi', defaultTime: '03:00 PM', icon: '🛕' },
      { name: 'Đồi cát Nam Cương mềm mại chiều tà', category: 'Sa mạc cát bay hoang sơ', defaultTime: '05:00 PM', icon: '🏜️' }
    ]
  },
  {
    id: 'binhthuan',
    name: 'Bình Thuận (Mũi Né)',
    region: 'trung',
    regionName: 'Miền Trung',
    lat: 10.9805,
    lng: 108.2615,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Mũi Né với Bàu Trắng tựa sa mạc Sahara thu nhỏ bên hồ sen thanh khiết. Trải nghiệm lái xe địa hình vượt cồn cát và thưởng thức hải sản tại làng chài sẽ làm bạn say đắm.',
    clothingAdvice: 'Trang phục thể thao năng động, kính râm chống cát bay khi trải nghiệm xe địa hình đồi cát.',
    recommendedPlaces: [
      { name: 'Bàu Trắng đồi cát trắng xe địa hình', category: 'Sa mạc cát trắng & Hồ sen', defaultTime: '06:00 AM', icon: '🏎️' },
      { name: 'Suối Tiên Mũi Né nhũ cát đỏ cam', category: 'Dòng suối phù sa độc đáo', defaultTime: '10:00 AM', icon: '🏞️' },
      { name: 'Làng chài Mũi Né tấp nập thuyền thúng', category: 'Đời sống ngư dân biển sớm', defaultTime: '03:30 PM', icon: '🛶' },
      { name: 'Hải đăng Kê Gà ngọn đèn biển cổ nhất', category: 'Di tích ngọn hải đăng đá', defaultTime: '05:00 PM', icon: '🗼' }
    ]
  },
  {
    id: 'kontum',
    name: 'Kon Tum (Măng Đen)',
    region: 'trung',
    regionName: 'Tây Nguyên',
    lat: 14.3497,
    lng: 108.0005,
    bgDay: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Thị trấn Măng Đen mát lạnh quanh năm với rừng thông bạt ngàn và thác Pa Sỹ thơ mộng. Nhà thờ Gỗ Kon Tum trăm tuổi lưu giữ trọn vẹn hồn cốt kiến trúc Ba Na.',
    clothingAdvice: 'Khí hậu ôn đới sương mù se lạnh; mang áo ấm cardigan, khăn choàng mỏng và giày đi bộ dã ngoại êm ái.',
    recommendedPlaces: [
      { name: 'Thị trấn Măng Đen & Thác Pa Sỹ', category: 'Đà Lạt thứ hai Tây Nguyên', defaultTime: '08:00 AM', icon: '🌲' },
      { name: 'Nhà thờ Gỗ Kon Tum trăm tuổi Gothic', category: 'Kiến trúc gỗ kết hợp Ba Na', defaultTime: '11:00 AM', icon: '⛪' },
      { name: 'Cầu treo Kon Klor & Nhà Rông Kon Klor', category: 'Nhà rông lớn nhất Tây Nguyên', defaultTime: '02:30 PM', icon: '🛖' },
      { name: 'Hồ Đăk Ke phẳng lặng bóng thông reo', category: 'Hồ nước tự nhiên sinh thái', defaultTime: '04:30 PM', icon: '🛶' }
    ]
  },
  {
    id: 'gialai',
    name: 'Gia Lai (Pleiku)',
    region: 'trung',
    regionName: 'Tây Nguyên',
    lat: 13.9833,
    lng: 108.0000,
    bgDay: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Biển Hồ T’Nưng tựa viên ngọc bích soi bóng mây trời Pleiku. Núi lửa Chư Đang Ya mùa hoa dã quỳ nở vàng rực khắp triền đồi đất đỏ bazan.',
    clothingAdvice: 'Gió cao nguyên lộng mát ban trưa nhưng khô ráo; chuẩn bị nón rộng vành, kính râm và kem dưỡng da.',
    recommendedPlaces: [
      { name: 'Biển Hồ T’Nưng Đôi mắt Pleiku xanh ngắt', category: 'Miệng núi lửa cổ đại tự nhiên', defaultTime: '08:00 AM', icon: '👁️' },
      { name: 'Núi lửa Chư Đang Ya mùa hoa dã quỳ', category: 'Thắng cảnh thiên nhiên hoang sơ', defaultTime: '10:30 AM', icon: '🌼' },
      { name: 'Hàng thông trăm tuổi & Đồi chè Biển Hồ', category: 'Con đường tình yêu Tây Nguyên', defaultTime: '03:00 PM', icon: '🌲' },
      { name: 'Chùa Minh Thành kiến trúc uy nghiêm', category: 'Quần thể Phật giáo tráng lệ', defaultTime: '05:00 PM', icon: '🛕' }
    ]
  },
  {
    id: 'daklak',
    name: 'Đắk Lắk (Buôn Ma Thuột)',
    region: 'trung',
    regionName: 'Tây Nguyên',
    lat: 12.6667,
    lng: 108.0383,
    bgDay: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Thủ phủ cà phê Buôn Ma Thuột với hương cà phê nồng nàn thơm phức, dòng thác Dray Nur khói sương tung trắng xóa và tiếng cồng chiêng ngân vang bên hồ Lắk.',
    clothingAdvice: 'Khí hậu ấm áp nắng vàng; nên mặc trang phục mộc mạc thoải mái để dạo buôn làng và thưởng thức cà phê nguyên chất.',
    recommendedPlaces: [
      { name: 'Bảo tàng Thế giới Cà phê kiến trúc Nhà Dài', category: 'Bảo tàng chuyên đề thế giới', defaultTime: '08:30 AM', icon: '☕' },
      { name: 'Cụm thác khói Dray Nur - Dray Sap', category: 'Hùng vĩ thác nước đất đỏ', defaultTime: '11:00 AM', icon: '🌊' },
      { name: 'Hồ Lắk & Buôn Jun của người M’Nông', category: 'Hồ nước ngọt tự nhiên lớn nhất', defaultTime: '03:00 PM', icon: '🛶' },
      { name: 'Khu du lịch Buôn Đôn cầu treo sông Sêrêpôk', category: 'Văn hóa buôn làng voi', defaultTime: '05:00 PM', icon: '🐘' }
    ]
  },

  // MIỀN NAM (10 tỉnh thành)
  {
    id: 'dalat',
    name: 'Đà Lạt (Lâm Đồng)',
    region: 'nam',
    regionName: 'Cao nguyên Nam Trung Bộ',
    lat: 11.9404,
    lng: 108.4583,
    bgDay: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Hồ Xuân Hương sáng sớm mờ sương tựa tranh thủy mặc. Đừng quên thuê xe đạp đôi vòng quanh hồ, săn mây đồi chè Cầu Đất và thưởng thức ly sữa đậu nành nóng ven chợ đêm.',
    clothingAdvice: 'Nhiệt độ dưới 20°C se lạnh về đêm và sáng sớm. Nên mang áo khoác dày, khăn quàng cổ và giày đi bộ thoải mái.',
    recommendedPlaces: [
      { name: 'Hồ Xuân Hương & Quảng trường Lâm Viên', category: 'Biểu tượng trung tâm phố núi', defaultTime: '07:30 AM', icon: '🌸' },
      { name: 'Đồi chè Cầu Đất săn mây sáng sớm', category: 'Săn mây & Đồi chè bạt ngàn', defaultTime: '05:45 AM', icon: '☁️' },
      { name: 'Vườn hoa Thành Phố & Thung Lũng Tình Yêu', category: 'Muôn hoa ngát hương khoe sắc', defaultTime: '02:00 PM', icon: '🌺' },
      { name: 'Chợ đêm Đà Lạt thưởng thức sữa đậu nành', category: 'Ẩm thực đường phố ấm nóng', defaultTime: '07:30 PM', icon: '🥛' }
    ]
  },
  {
    id: 'tphcm',
    name: 'TP. Hồ Chí Minh',
    region: 'nam',
    regionName: 'Miền Nam',
    lat: 10.8231,
    lng: 106.6297,
    bgDay: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Đô thị sôi động hiện đại bậc nhất Việt Nam với những tòa nhà chọc trời lung linh soi bóng sông Sài Gòn, phố đi bộ Nguyễn Huệ tấp nập và thiên đường ẩm thực hẻm.',
    clothingAdvice: 'Khí hậu nhiệt đới nắng ấm; chuẩn bị trang phục thoáng mát, quạt cầm tay và áo mưa nhỏ phòng cơn mưa rào bất chợt chiều tà.',
    recommendedPlaces: [
      { name: 'Bến Bạch Đằng & Xe buýt sông Waterbus', category: 'Ngắm cảnh sông Sài Gòn', defaultTime: '08:00 AM', icon: '🛥️' },
      { name: 'Dinh Độc Lập & Nhà thờ Đức Bà cổ kính', category: 'Di tích lịch sử & Kiến trúc', defaultTime: '10:00 AM', icon: '🏛️' },
      { name: 'Bảo tàng Chứng tích Chiến tranh', category: 'Lịch sử & Hòa bình nhân loại', defaultTime: '02:30 PM', icon: '🕊️' },
      { name: 'Phố đi bộ Nguyễn Huệ & Chợ Bến Thành', category: 'Sôi động nhịp sống đô thị đêm', defaultTime: '07:30 PM', icon: '✨' }
    ]
  },
  {
    id: 'bienhoa',
    name: 'Biên Hòa (Đồng Nai)',
    region: 'nam',
    regionName: 'Miền Nam',
    lat: 10.9460,
    lng: 106.8234,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Khu du lịch sinh thái Thác Giang Điền với dòng thác trải rộng mát rượi và bãi cỏ xanh ngát cực kỳ thích hợp cho buổi dã ngoại cắm trại cuối tuần cùng bạn bè.',
    clothingAdvice: 'Nhiệt độ trên 30°C trời nắng ấm. Hãy mang mũ rộng vành, kem chống nắng và bổ sung nước lọc khi tham gia các hoạt động cắm trại ngoài trời.',
    recommendedPlaces: [
      { name: 'Khu du lịch sinh thái Thác Giang Điền', category: 'Dã ngoại cắm trại ven thác', defaultTime: '08:00 AM', icon: '🌊' },
      { name: 'Khu du lịch Bửu Long Vịnh Hạ Long thu nhỏ', category: 'Thắng cảnh hồ núi thanh bình', defaultTime: '10:30 AM', icon: '🏞️' },
      { name: 'Vườn Quốc gia Cát Tiên sinh quyển thế giới', category: 'Rừng nhiệt đới nguyên sinh', defaultTime: '02:00 PM', icon: '🌳' },
      { name: 'Làng gốm Biên Hòa ven sông Đồng Nai', category: 'Làng nghề gốm men xanh cổ truyền', defaultTime: '04:30 PM', icon: '🏺' }
    ]
  },
  {
    id: 'vungtau',
    name: 'Vũng Tàu (Bà Rịa - Vũng Tàu)',
    region: 'nam',
    regionName: 'Miền Nam',
    lat: 10.3460,
    lng: 107.0843,
    bgDay: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Bãi Sau với bờ cát dài thoai thoải và sóng biển êm ả. Thời điểm lý tưởng nhất để tắm biển là 16:30, sau đó thưởng thức bánh khọt nóng giòn rụm thơm ngon khó cưỡng.',
    clothingAdvice: 'Nhiệt độ khoảng 31°C và gió biển thoáng đãng. Hãy mang theo đồ bơi, khăn tắm lớn, kem chống nắng và dép xỏ ngón tiện lợi.',
    recommendedPlaces: [
      { name: 'Bãi Sau Thùy Vân tắm biển lộng gió', category: 'Bãi tắm bờ cát phẳng mịn', defaultTime: '06:30 AM', icon: '🏖️' },
      { name: 'Hải đăng Vũng Tàu trên đỉnh Núi Nhỏ', category: 'Toàn cảnh vịnh biển lộng lẫy', defaultTime: '09:30 AM', icon: '🗼' },
      { name: 'Tượng Chúa Kito Vua ngắm Mũi Nghinh Phong', category: 'Biểu tượng check-in thành phố', defaultTime: '03:00 PM', icon: '⛪' },
      { name: 'Thưởng thức bánh khọt Gốc Vú Sữa nóng giòn', category: 'Ẩm thực đặc sản biển trứ danh', defaultTime: '06:00 PM', icon: '🥟' }
    ]
  },
  {
    id: 'tayninh',
    name: 'Tây Ninh',
    region: 'nam',
    regionName: 'Miền Nam',
    lat: 11.3103,
    lng: 106.0983,
    bgDay: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Núi Bà Đen nóc nhà Nam Bộ với tuyến cáp treo hiện đại đưa bạn lên mây viếng tượng Phật Bà uy nghi. Tòa Thánh Tây Ninh rực rỡ sắc màu kiến trúc tôn giáo độc nhất vô nhị.',
    clothingAdvice: 'Đỉnh núi Bà Đen gió lạnh và sương mù; nên có áo khoác gió mỏng và trang phục lịch sự khi lễ bái.',
    recommendedPlaces: [
      { name: 'Quần thể Danh thắng Núi Bà Đen nóc nhà Nam Bộ', category: 'Cáp treo & Tượng Phật Bà', defaultTime: '07:30 AM', icon: '⛰️' },
      { name: 'Tòa Thánh Tây Ninh kiến trúc rực rỡ', category: 'Tôn giáo Cao Đài độc đáo', defaultTime: '11:30 AM', icon: '🛕' },
      { name: 'Hồ Dầu Tiếng ngắm hoàng hôn cắm trại', category: 'Hồ nhân tạo lớn nhất', defaultTime: '03:30 PM', icon: '🏕️' },
      { name: 'Thung lũng Ma Thiên Lãnh thiên nhiên', category: 'Sinh thái suối đá kỳ thú', defaultTime: '05:00 PM', icon: '🏞️' }
    ]
  },
  {
    id: 'tiengiang',
    name: 'Tiền Giang (Mỹ Tho)',
    region: 'nam',
    regionName: 'Miền Tây Nam Bộ',
    lat: 10.3544,
    lng: 106.3653,
    bgDay: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Xuồng ba lá nhẹ nhàng lướt qua rạch dừa nước rợp bóng mát ở cù lao Thới Sơn. Ngọt ngào câu hò đờn ca tài tử và vị mật ong hoa nhãn ngọt lịm miệt vườn.',
    clothingAdvice: 'Mặc trang phục gọn gàng thoáng mát, giày chống trượt khi lên xuống bến xuồng và nón lá che nắng.',
    recommendedPlaces: [
      { name: 'Cù lao Thới Sơn chèo xuồng rạch dừa', category: 'Sinh thái miệt vườn sông nước', defaultTime: '08:30 AM', icon: '🛶' },
      { name: 'Chùa Vĩnh Tràng giao thoa Á - Âu cổ tự', category: 'Kiến trúc Phật giáo tráng lệ', defaultTime: '11:00 AM', icon: '🛕' },
      { name: 'Chợ nổi Cái Bè trên sông Tiền', category: 'Văn hóa buôn bán ghe xuồng', defaultTime: '06:00 AM', icon: '🍍' },
      { name: 'Trại rắn Đồng Tâm khám phá bò sát', category: 'Bảo tồn động vật quý', defaultTime: '02:30 PM', icon: '🐍' }
    ]
  },
  {
    id: 'bentre',
    name: 'Bến Tre',
    region: 'nam',
    regionName: 'Miền Tây Nam Bộ',
    lat: 10.2415,
    lng: 106.3759,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Xứ sở ba dải cù lao xanh ngút ngàn bóng dừa. Trải nghiệm tát mương bắt cá, đạp xe qua những con đường làng rợp bóng cây và tự tay gói kẹo dừa thơm ngát.',
    clothingAdvice: 'Trang phục thôn dã nhẹ nhàng, mang dép quai hậu để dễ dàng tham gia các trò chơi dân gian miệt vườn.',
    recommendedPlaces: [
      { name: 'Cồn Phụng & Di tích Đạo Dừa thanh tịnh', category: 'Sinh thái sông Tiền', defaultTime: '08:30 AM', icon: '🥥' },
      { name: 'Khu du lịch sinh thái Lan Vương', category: 'Trò chơi dân gian vui nhộn', defaultTime: '11:00 AM', icon: '🎣' },
      { name: 'Làng nghề làm kẹo dừa thủ công', category: 'Nghề di sản văn hóa', defaultTime: '02:30 PM', icon: '🍬' },
      { name: 'Vườn cây trái Cái Mơn - Chợ Lách', category: 'Vựa cây giống bạt ngàn', defaultTime: '04:30 PM', icon: '🍊' }
    ]
  },
  {
    id: 'cantho',
    name: 'Cần Thơ',
    region: 'nam',
    regionName: 'Miền Tây Nam Bộ',
    lat: 10.0452,
    lng: 105.7469,
    bgDay: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Cần Thơ gạo trắng nước trong với Chợ nổi Cái Răng nhộn nhịp tiếng rao hàng từ lúc tờ mờ sáng và bến Ninh Kiều lung linh ánh đèn hoa đăng đêm.',
    clothingAdvice: 'Đi chợ nổi từ sáng sớm tinh mơ (05:30) nên có áo khoác gió nhẹ; ban ngày mặc trang phục mùa hè mát mẻ.',
    recommendedPlaces: [
      { name: 'Chợ nổi Cái Răng họp sáng sớm', category: 'Văn hóa chợ nổi sông nước', defaultTime: '05:30 AM', icon: '🍉' },
      { name: 'Bến Ninh Kiều & Cầu Tình Yêu', category: 'Biểu tượng thơ mộng Tây Đô', defaultTime: '09:00 AM', icon: '🌉' },
      { name: 'Nhà cổ Bình Thủy kiến trúc Pháp - Nam Bộ', category: 'Nhà cổ trăm năm di sản', defaultTime: '02:00 PM', icon: '🏡' },
      { name: 'Cồn Sơn trải nghiệm cá lóc bay độc đáo', category: 'Nông nghiệp sinh thái', defaultTime: '04:00 PM', icon: '🐟' }
    ]
  },
  {
    id: 'angiang',
    name: 'An Giang',
    region: 'nam',
    regionName: 'Miền Tây Nam Bộ',
    lat: 10.3759,
    lng: 105.4185,
    bgDay: 'https://images.unsplash.com/photo-1548625361-12c8230fef6b?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Vùng Thất Sơn huyền bí với rừng tràm Trà Sư tắc ráng lướt thảm bèo xanh mướt như ngọc bích và Miếu Bà Chúa Xứ Núi Sam linh thiêng đón triệu dòng người chiêm bái.',
    clothingAdvice: 'Mặc trang phục sáng màu chụp ảnh bèo xanh; chuẩn bị nón rộng vành và trang phục trang nghiêm khi viếng Miếu Bà.',
    recommendedPlaces: [
      { name: 'Rừng tràm Trà Sư thảm bèo xanh ngọc', category: 'Hệ sinh thái ngập nước', defaultTime: '08:00 AM', icon: '🛶' },
      { name: 'Miếu Bà Chúa Xứ Núi Sam Châu Đốc', category: 'Lễ hội tâm linh quốc gia', defaultTime: '11:00 AM', icon: '🛕' },
      { name: 'Hồ Tà Pạ & Cánh đồng thốt nốt Tri Tôn', category: 'Cảnh quan xứ Thất Sơn', defaultTime: '03:30 PM', icon: '🌴' },
      { name: 'Chợ Châu Đốc thiên đường các loại mắm ngon', category: 'Ẩm thực miền biên viễn', defaultTime: '05:30 PM', icon: '🦐' }
    ]
  },
  {
    id: 'phuquoc',
    name: 'Kiên Giang (Phú Quốc)',
    region: 'nam',
    regionName: 'Miền Tây Nam Bộ',
    lat: 10.2289,
    lng: 103.9572,
    bgDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    bgNight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80',
    bloggerReview: 'Đảo Ngọc thiên đường với bãi Sao bờ cát trắng mịn như kem và hoàng hôn ngũ sắc mê hoặc tại Sunset Sanato làm say đắm bất kỳ du khách nào.',
    clothingAdvice: 'Thời tiết nắng nhẹ ấm áp quanh năm. Nên chuẩn bị trang phục sáng màu chụp ảnh check-in, kính râm và đồ bơi.',
    recommendedPlaces: [
      { name: 'Bãi Sao cát trắng mịn biển trong vắt', category: 'Bãi biển thiên đường nghỉ dưỡng', defaultTime: '08:00 AM', icon: '🏖️' },
      { name: 'Cáp treo Hòn Thơm vượt biển 3 dây kỷ lục', category: 'Cáp treo vượt biển thế giới', defaultTime: '11:00 AM', icon: '🚡' },
      { name: 'Thị trấn Hoàng Hôn Sunset Town & Cầu Hôn', category: 'Kiến trúc Địa Trung Hải', defaultTime: '04:30 PM', icon: '🌅' },
      { name: 'Chợ đêm Phú Quốc hải sản tươi rói', category: 'Ẩm thực đêm đảo ngọc', defaultTime: '07:30 PM', icon: '🦞' }
    ]
  }
];

/**
 * ------------------------------------------------------------------------------
 * 2. BẢNG MÃ WMO VÀ ICON THỜI TIẾT TINH TẾ (WEATHER CODES & ICONS)
 * Icon mây, nắng, mưa, gió, sương mù tinh giản, hợp lý theo đúng yêu cầu
 * ------------------------------------------------------------------------------
 */
const WMO_WEATHER_MAP = {
  0:  { desc: 'Trời quang đãng, nắng đẹp', type: 'sunny', icon: '☀️', glyph: 'Nắng ráo' },
  1:  { desc: 'Trời ít mây, nắng nhẹ', type: 'sunny', icon: '🌤️', glyph: 'Nắng nhẹ' },
  2:  { desc: 'Mây rải rác từng đợt', type: 'cloudy', icon: '⛅', glyph: 'Mây rải rác' },
  3:  { desc: 'Nhiều mây, trời dịu mát', type: 'cloudy', icon: '☁️', glyph: 'Nhiều mây' },
  45: { desc: 'Sương mù giăng mắc', type: 'cold', icon: '🌫️', glyph: 'Sương mù' },
  48: { desc: 'Sương mù dày đặc buốt lạnh', type: 'cold', icon: '🌫️', glyph: 'Sương mù dày' },
  51: { desc: 'Mưa phùn nhẹ rải rác', type: 'rainy', icon: '🌦️', glyph: 'Mưa phùn' },
  53: { desc: 'Mưa phùn hạt vừa', type: 'rainy', icon: '🌦️', glyph: 'Mưa phùn' },
  55: { desc: 'Mưa phùn dày hạt ẩm ướt', type: 'rainy', icon: '🌧️', glyph: 'Mưa phùn dày' },
  61: { desc: 'Mưa rào nhẹ thoáng qua', type: 'rainy', icon: '🌧️', glyph: 'Mưa rào nhẹ' },
  63: { desc: 'Mưa rào vừa diện rộng', type: 'rainy', icon: '🌧️', glyph: 'Mưa rào' },
  65: { desc: 'Mưa to xối xả', type: 'rainy', icon: '⛈️', glyph: 'Mưa to' },
  71: { desc: 'Rét buốt, có tuyết nhẹ', type: 'cold', icon: '❄️', glyph: 'Tuyết nhẹ' },
  73: { desc: 'Rét đậm diện rộng', type: 'cold', icon: '❄️', glyph: 'Rét đậm' },
  75: { desc: 'Rét hại buốt giá vùng cao', type: 'cold', icon: '🥶', glyph: 'Rét buốt' },
  80: { desc: 'Mưa rào ngắt quãng', type: 'rainy', icon: '🌦️', glyph: 'Mưa ngắt quãng' },
  81: { desc: 'Mưa rào xối xả từng cơn', type: 'rainy', icon: '🌧️', glyph: 'Mưa rào to' },
  82: { desc: 'Mưa dông rất to kèm gió', type: 'rainy', icon: '⛈️', glyph: 'Mưa dông' },
  95: { desc: 'Có dông sét cục bộ', type: 'rainy', icon: '⚡', glyph: 'Dông sét' },
  96: { desc: 'Dông sét kèm mưa đá nhẹ', type: 'rainy', icon: '⛈️', glyph: 'Mưa đá' },
  99: { desc: 'Dông bão mạnh có sấm sét', type: 'rainy', icon: '🌪️', glyph: 'Dông bão' }
};

/**
 * ------------------------------------------------------------------------------
 * 3. QUẢN LÝ TRẠNG THÁI & LOCALSTORAGE
 * ------------------------------------------------------------------------------
 */
const STORAGE_KEY_CITY        = 'weather_planner_selected_city';
const STORAGE_KEY_ITINERARY   = 'weather_planner_itinerary_list';
const STORAGE_KEY_DEPARTURE   = 'weather_planner_departure_date';
const STORAGE_KEY_THEME_MODE  = 'weather_planner_theme_mode'; // 'auto' | 'light' | 'dark'

let currentCityId = 'dalat';
let itineraryItems = [];
let currentFilterTab = 'all';
let searchQuery = '';
let sortOrder = 'title-asc';
let pageSizeOption = 'all';
let currentPage = 1;
let countdownIntervalId = null;
let currentRegionFilter = 'all';
let weatherCache = {};
let currentThemeMode = 'auto'; // Mặc định tự động theo giờ thực

/**
 * ------------------------------------------------------------------------------
 * 4. TRUY XUẤT DOM ELEMENTS
 * ------------------------------------------------------------------------------
 */
// DOM Theme Mode Buttons
const themeToggleBtns         = document.querySelectorAll('.theme-toggle-btn');

// DOM Chọn thành phố & Vùng miền
const citySelect              = document.getElementById('citySelect');
const regionPills             = document.querySelectorAll('.region-pill');
const provinceChipsRibbon     = document.getElementById('provinceChipsRibbon');
const provinceSearchInput     = document.getElementById('provinceSearchInput');

// DOM Card Thời tiết & Hiệu ứng Glow
const weatherHeroCard         = document.getElementById('weatherHeroCard');
const weatherGlow             = document.getElementById('weatherGlow');
const weatherCityTitle        = document.getElementById('weatherCityTitle');
const weatherRegionTag        = document.getElementById('weatherRegionTag');
const weatherTemp             = document.getElementById('weatherTemp');
const weatherApparentTemp     = document.getElementById('weatherApparentTemp');
const conditionText           = document.getElementById('conditionText');
const conditionIcon           = document.getElementById('conditionIcon');
const weatherHeroIcon         = document.getElementById('weatherHeroIcon');
const weatherHumidity         = document.getElementById('weatherHumidity');
const weatherWind             = document.getElementById('weatherWind');
const weatherPrecip           = document.getElementById('weatherPrecip');
const liveSatelliteIndicator  = document.getElementById('liveSatelliteIndicator');
const refreshWeatherBtn       = document.getElementById('refreshWeatherBtn');
const weatherLastUpdated      = document.getElementById('weatherLastUpdated');

// DOM Gợi ý & Blogger Review
const suggestionBox           = document.getElementById('suggestionBox');
const suggestionIcon          = document.getElementById('suggestionIcon');
const suggestionTitle         = document.getElementById('suggestionTitle');
const suggestionContent       = document.getElementById('suggestionContent');
const bloggerQuote            = document.getElementById('bloggerQuote');

// DOM Đếm ngược khởi hành
const departureDateInput      = document.getElementById('departureDateInput');
const countDays               = document.getElementById('countDays');
const countHours              = document.getElementById('countHours');
const countMinutes            = document.getElementById('countMinutes');
const countSeconds            = document.getElementById('countSeconds');

// DOM Địa điểm đề xuất (Tầng 1 Cột Phải)
const recommendedGrid         = document.getElementById('recommendedGrid');
const recommendedHeading      = document.getElementById('recommendedHeading');

// DOM Form tạo thêm địa điểm (Tầng 2 Cột Phải)
const itineraryForm           = document.getElementById('itineraryForm');
const placeNameInput          = document.getElementById('placeNameInput');
const placeTimeInput          = document.getElementById('placeTimeInput');
const placeNoteInput          = document.getElementById('placeNoteInput');
const addPlaceBtn             = document.getElementById('addPlaceBtn');
const formCityTitle           = document.getElementById('formCityTitle');

// DOM Danh sách & Quản lý (Search, Filter, Sort, Pagination)
const itineraryList           = document.getElementById('itineraryList');
const emptyState              = document.getElementById('emptyState');
const itinerarySearchInput    = document.getElementById('itinerarySearchInput');
const itinerarySortSelect     = document.getElementById('itinerarySortSelect');
const pageSizeSelect          = document.getElementById('pageSizeSelect');
const filterTabBtns           = document.querySelectorAll('.tab-btn');
const clearAllBtn             = document.getElementById('clearAllBtn');
const exportTxtBtn            = document.getElementById('exportTxtBtn');
const paginationContainer     = document.getElementById('paginationContainer');

// DOM Thống kê
const totalPlacesCount        = document.getElementById('totalPlacesCount');
const visitedPlacesCount      = document.getElementById('visitedPlacesCount');
const upcomingPlacesCount     = document.getElementById('upcomingPlacesCount');
const itineraryProgressFill   = document.getElementById('itineraryProgressFill');
const itineraryProgressText   = document.getElementById('itineraryProgressText');
const headerCityName          = document.getElementById('headerCityName');
const headerPlaceCount        = document.getElementById('headerPlaceCount');
const headerRealClock         = document.getElementById('headerRealClock');

/**
 * ------------------------------------------------------------------------------
 * 5. KHỞI TẠO DỮ LIỆU & THEME MODE (3 NẤC THÔNG MINH: AUTO NGÀY/ĐÊM - SÁNG - TỐI)
 * ------------------------------------------------------------------------------
 */
function loadStorage() {
  // 1. Phục hồi thành phố đã chọn cuối cùng
  const savedCity = localStorage.getItem(STORAGE_KEY_CITY);
  if (savedCity && VIETNAM_34_PROVINCES.some(c => c.id === savedCity)) {
    currentCityId = savedCity;
  }

  // 2. Phục hồi chế độ theme: 'auto' | 'light' | 'dark'
  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME_MODE);
  if (savedTheme && ['auto', 'light', 'dark'].includes(savedTheme)) {
    currentThemeMode = savedTheme;
  }

  // 3. Phục hồi danh sách lịch trình
  const savedItinerary = localStorage.getItem(STORAGE_KEY_ITINERARY);
  if (savedItinerary) {
    try {
      itineraryItems = JSON.parse(savedItinerary);
    } catch (e) {
      console.warn('Lỗi đọc JSON từ LocalStorage, khởi tạo mảng rỗng:', e);
      itineraryItems = [];
    }
  } else {
    itineraryItems = [
      {
        id: 'plan_1',
        cityId: 'dalat',
        place: 'Đồi chè Cầu Đất săn mây sáng sớm',
        time: '05:45 AM',
        note: 'Chuẩn bị áo ấm dày và xuất phát từ 05:00 sáng',
        visited: true
      },
      {
        id: 'plan_2',
        cityId: 'dalat',
        place: 'Hồ Xuân Hương & Quảng trường Lâm Viên',
        time: '08:30 AM',
        note: 'Dạo bộ quanh hồ ngắm bình minh và check-in nụ hoa Atiso',
        visited: true
      },
      {
        id: 'plan_3',
        cityId: 'dalat',
        place: 'Vườn hoa Thành Phố & Thung Lũng Tình Yêu',
        time: '02:00 PM',
        note: 'Ngắm các loài cẩm tú cầu và dã quỳ khoe sắc',
        visited: false
      },
      {
        id: 'plan_4',
        cityId: 'dalat',
        place: 'Chợ đêm Đà Lạt thưởng thức sữa đậu nành nóng',
        time: '07:30 PM',
        note: 'Thưởng thức bánh tráng nướng nóng hổi ven chợ đêm',
        visited: false
      }
    ];
    saveStorage();
  }

  // 4. Phục hồi ngày khởi hành (Countdown Timer)
  const savedDeparture = localStorage.getItem(STORAGE_KEY_DEPARTURE);
  if (savedDeparture) {
    departureDateInput.value = savedDeparture;
  } else {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    defaultDate.setHours(7, 30, 0, 0);

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

function saveStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_CITY, currentCityId);
    localStorage.setItem(STORAGE_KEY_ITINERARY, JSON.stringify(itineraryItems));
    localStorage.setItem(STORAGE_KEY_THEME_MODE, currentThemeMode);
  } catch (e) {
    console.error('Lỗi khi lưu trữ LocalStorage:', e);
  }
}

/**
 * ------------------------------------------------------------------------------
 * QUẢN LÝ THEME MODE (TỰ ĐỘNG THEO GIỜ THỰC + SÁNG LIGHT + TỐI DARK)
 * Giờ thực tế: 06:00 - 18:00 là Sáng (Light Glass); 18:00 - 06:00 là Tối (Dark Glass)
 * ------------------------------------------------------------------------------
 */
function applyThemeMode(mode) {
  currentThemeMode = mode;
  saveStorage();

  // Cập nhật trạng thái active trên các nút gạt theme
  themeToggleBtns.forEach(btn => {
    if (btn.getAttribute('data-theme') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const city = VIETNAM_34_PROVINCES.find(c => c.id === currentCityId) || VIETNAM_34_PROVINCES[0];

  let isLight = false;
  if (mode === 'light') {
    isLight = true;
  } else if (mode === 'dark') {
    isLight = false;
  } else {
    // Chế độ 'auto': tự động theo giờ thực tế hiện tại
    const currentHour = new Date().getHours();
    isLight = (currentHour >= 6 && currentHour < 18);
  }

  if (isLight) {
    document.documentElement.classList.add('theme-light');
    document.documentElement.classList.remove('theme-dark');
    document.body.style.backgroundImage = `
      linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(241, 245, 249, 0.82)),
      url('${city.bgDay || city.bgNight}')
    `;
  } else {
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.remove('theme-light');
    document.body.style.backgroundImage = `
      linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.84)),
      url('${city.bgNight || city.bgDay}')
    `;
  }
}

/**
 * ------------------------------------------------------------------------------
 * 6. HIỂN THỊ DẢI 34 TỈNH THÀNH & ĐỒNG BỘ THẺ <SELECT>
 * ------------------------------------------------------------------------------
 */
function renderProvincesSelectors() {
  // 1. Render đầy đủ 34 tỉnh thành vào thẻ <select id="citySelect">
  citySelect.innerHTML = '';
  VIETNAM_34_PROVINCES.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} - ${p.regionName}`;
    if (p.id === currentCityId) opt.selected = true;
    citySelect.appendChild(opt);
  });

  // 2. Render dải thẻ Chips trực quan bên cạnh
  renderProvinceChips();
}

function renderProvinceChips() {
  if (!provinceChipsRibbon) return;
  provinceChipsRibbon.innerHTML = '';

  const keyword = provinceSearchInput ? provinceSearchInput.value.trim().toLowerCase() : '';

  const filteredProvinces = VIETNAM_34_PROVINCES.filter(p => {
    const matchRegion = (currentRegionFilter === 'all') || (p.region === currentRegionFilter);
    const matchSearch = !keyword || p.name.toLowerCase().includes(keyword) || p.regionName.toLowerCase().includes(keyword);
    return matchRegion && matchSearch;
  });

  if (filteredProvinces.length === 0) {
    provinceChipsRibbon.innerHTML = `<span class="empty-chips-hint">Không tìm thấy tỉnh nào phù hợp với từ khóa "${escapeHtml(keyword)}".</span>`;
    return;
  }

  filteredProvinces.forEach(p => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `province-chip-btn ${p.id === currentCityId ? 'active' : ''}`;
    chip.setAttribute('data-id', p.id);
    chip.setAttribute('title', `Xem thời tiết và lịch trình tại ${p.name}`);

    // Đếm số điểm lịch trình đã lên cho tỉnh này
    const countForCity = itineraryItems.filter(item => item.cityId === p.id).length;
    const badgeHtml = countForCity > 0 ? `<span class="chip-count-badge">${countForCity}</span>` : '';

    chip.innerHTML = `
      <span class="chip-name">${escapeHtml(p.name)}</span>
      ${badgeHtml}
    `;

    chip.addEventListener('click', () => {
      switchCity(p.id);
    });

    provinceChipsRibbon.appendChild(chip);
  });
}

function switchCity(cityId) {
  if (!cityId || !VIETNAM_34_PROVINCES.some(p => p.id === cityId)) return;
  currentCityId = cityId;
  saveStorage();

  // Đồng bộ lại thẻ <select>
  citySelect.value = cityId;

  // Cập nhật trạng thái active trên dải Chips
  document.querySelectorAll('.province-chip-btn').forEach(btn => {
    if (btn.getAttribute('data-id') === cityId) {
      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      btn.classList.remove('active');
    }
  });

  // Cập nhật Header
  const currentCityObj = VIETNAM_34_PROVINCES.find(p => p.id === cityId);
  if (currentCityObj && headerCityName) {
    headerCityName.textContent = currentCityObj.name.split('(')[0].trim();
  }
  if (formCityTitle && currentCityObj) {
    formCityTitle.textContent = `Thêm điểm muốn đến tại ${currentCityObj.name}`;
  }

  // Cập nhật background theo theme hiện tại
  applyThemeMode(currentThemeMode);

  // Tải thời tiết trực tiếp
  fetchLiveWeather(cityId);

  // Render địa điểm đề xuất (Tầng 1)
  renderRecommendedPlaces();

  // Render danh sách lịch trình (Tầng 2)
  currentPage = 1;
  renderItineraryList();
}

/**
 * ------------------------------------------------------------------------------
 * 7. QUẢN LÝ THỜI TIẾT TRỰC TIẾP & DYNAMIC WEATHER THEME
 * Tích hợp Open-Meteo Satellite API, thay đổi màu sắc chủ đạo theo thời tiết
 * Thêm icon thời tiết sinh động, hợp lý
 * ------------------------------------------------------------------------------
 */
async function fetchLiveWeather(cityId, forceRefresh = false) {
  const city = VIETNAM_34_PROVINCES.find(c => c.id === cityId);
  if (!city) return;

  // Cập nhật thông tin ban đầu
  weatherCityTitle.textContent = city.name;
  if (weatherRegionTag) weatherRegionTag.textContent = city.regionName;
  bloggerQuote.textContent = `"${city.bloggerReview}"`;

  // Kiểm tra cache trong 10 phút
  const now = Date.now();
  if (!forceRefresh && weatherCache[cityId] && (now - weatherCache[cityId].timestamp < 600000)) {
    applyWeatherData(weatherCache[cityId].data, city);
    return;
  }

  // Hiệu ứng đang tải vệ tinh
  weatherHeroCard.classList.add('is-syncing');
  if (liveSatelliteIndicator) liveSatelliteIndicator.textContent = 'Đang đồng bộ vệ tinh...';

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    if (!data.current) throw new Error('Không có trường current trong dữ liệu API');

    weatherCache[cityId] = {
      timestamp: now,
      data: data.current
    };

    applyWeatherData(data.current, city);
  } catch (err) {
    console.warn(`Lỗi kết nối vệ tinh (${err.message}). Dùng chế độ giả lập thông minh.`, err);
    applyFallbackWeather(city);
  } finally {
    weatherHeroCard.classList.remove('is-syncing');
  }
}

function applyWeatherData(current, city) {
  const temp = Math.round(current.temperature_2m);
  const apparent = Math.round(current.apparent_temperature);
  const humidity = Math.round(current.relative_humidity_2m);
  const wind = Math.round(current.wind_speed_10m);
  const precip = current.precipitation !== undefined ? current.precipitation : 0;
  const code = current.weather_code !== undefined ? current.weather_code : 0;

  const wmo = WMO_WEATHER_MAP[code] || { desc: 'Thời tiết ổn định', type: 'cloudy', icon: '⛅', glyph: 'Mát mẻ' };

  weatherTemp.textContent = `${temp}°C`;
  if (weatherApparentTemp) weatherApparentTemp.textContent = `${apparent}°C`;
  conditionText.textContent = wmo.desc;
  weatherHumidity.textContent = `${humidity}%`;
  weatherWind.textContent = `${wind} km/h`;
  if (weatherPrecip) weatherPrecip.textContent = `${precip} mm`;

  // Gán icon thời tiết tinh tế
  if (weatherHeroIcon) {
    weatherHeroIcon.textContent = wmo.icon;
    weatherHeroIcon.style.display = 'inline-block';
  }

  // Thay đổi màu sắc chủ đạo và hiệu ứng ánh sáng (Weather Theming)
  applyDynamicWeatherTheme(wmo.type, temp, wmo);

  const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  if (weatherLastUpdated) weatherLastUpdated.textContent = `Cập nhật: ${timeStr} (Vệ tinh trực tiếp)`;
  if (liveSatelliteIndicator) liveSatelliteIndicator.textContent = 'Trực tiếp vệ tinh';

  // Kích hoạt gợi ý thông minh (Smart Suggestions)
  renderSmartSuggestion(temp, precip, city);
}

function applyFallbackWeather(city) {
  let temp = 28;
  let humidity = 72;
  let wind = 10;
  let conditionType = 'sunny';
  let desc = 'Nắng ráo, mây nhẹ';
  let icon = '☀️';

  if (city.id === 'dalat') {
    temp = 17; humidity = 88; wind = 8; conditionType = 'cold'; desc = 'Se lạnh, sương mù nhẹ'; icon = '🌫️';
  } else if (city.id === 'laocai' || city.id === 'hagiang') {
    temp = 15; humidity = 90; wind = 9; conditionType = 'cold'; desc = 'Mây mù vùng cao, rét buốt'; icon = '❄️';
  } else if (city.id === 'vungtau') {
    temp = 31; humidity = 78; wind = 18; conditionType = 'sunny'; desc = 'Nắng biển & gió lộng'; icon = '🌊';
  } else if (city.id === 'bienhoa') {
    temp = 33; humidity = 68; wind = 12; conditionType = 'sunny'; desc = 'Nắng ráo, trời quang'; icon = '☀️';
  }

  weatherTemp.textContent = `${temp}°C`;
  if (weatherApparentTemp) weatherApparentTemp.textContent = `${temp + 1}°C`;
  conditionText.textContent = desc;
  weatherHumidity.textContent = `${humidity}%`;
  weatherWind.textContent = `${wind} km/h`;
  if (weatherPrecip) weatherPrecip.textContent = '0 mm';

  if (weatherHeroIcon) {
    weatherHeroIcon.textContent = icon;
    weatherHeroIcon.style.display = 'inline-block';
  }

  applyDynamicWeatherTheme(conditionType, temp, { icon: icon, glyph: 'Mát mẻ' });

  if (weatherLastUpdated) weatherLastUpdated.textContent = `Chế độ tự động offline`;
  if (liveSatelliteIndicator) liveSatelliteIndicator.textContent = 'Ngoại tuyến';

  renderSmartSuggestion(temp, 0, city);
}

/**
 * Đổi màu sắc chủ đạo và quầng sáng (Glow) theo tình trạng thời tiết
 */
function applyDynamicWeatherTheme(type, temp, wmoInfo) {
  let glowColor = 'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, transparent 70%)';
  let themeColor = '#f59e0b';
  let iconGlyph = wmoInfo ? wmoInfo.glyph : 'Nắng';

  if (type === 'sunny') {
    glowColor = 'radial-gradient(circle, rgba(245, 158, 11, 0.55) 0%, transparent 70%)';
    themeColor = '#fbbf24';
  } else if (type === 'rainy') {
    glowColor = 'radial-gradient(circle, rgba(56, 189, 248, 0.55) 0%, transparent 70%)';
    themeColor = '#38bdf8';
  } else if (type === 'cold' || temp < 18) {
    glowColor = 'radial-gradient(circle, rgba(167, 139, 250, 0.55) 0%, transparent 70%)';
    themeColor = '#c4b5fd';
  } else {
    glowColor = 'radial-gradient(circle, rgba(148, 163, 184, 0.45) 0%, transparent 70%)';
    themeColor = '#cbd5e1';
  }

  if (weatherGlow) weatherGlow.style.background = glowColor;
  if (conditionIcon) {
    conditionIcon.style.color = themeColor;
    conditionIcon.textContent = iconGlyph;
  }
}

/**
 * Gợi ý trang phục thông minh theo nhiệt độ (Smart Suggestions - Mục 4 điểm 9-10)
 */
function renderSmartSuggestion(temp, precip, city) {
  let title = 'Tư vấn hành trình & Trang phục';
  let desc = city.clothingAdvice || '';
  let themeBorder = '#38bdf8';
  let icon = '🧥';

  if (precip > 0.5) {
    title = 'Khuyên chuẩn bị ô dù & Áo mưa';
    desc = `Khu vực hiện có mưa (${precip} mm). Nên chuẩn bị sẵn ô dù hoặc áo mưa nhẹ, ưu tiên các hoạt động trong nhà và bảo tàng.`;
    themeBorder = '#38bdf8';
    icon = '🌂';
  } else if (temp < 15) {
    title = 'Khuyên mang áo khoác dày & Khăn ấm';
    desc = `Nhiệt độ dưới 15°C buốt lạnh về đêm và sáng sớm. Nên mang áo khoác phao, áo giữ nhiệt và giày đi bộ giữ ấm cơ thể.`;
    themeBorder = '#a78bfa';
    icon = '🧣';
  } else if (temp >= 15 && temp <= 24) {
    title = 'Thời tiết mát mẻ - Khuyên mang áo len nhẹ';
    desc = `Nhiệt độ ${temp}°C cực kỳ lý tưởng cho các hoạt động dã ngoại ngoài trời. Nên mặc áo cardigan mỏng hoặc áo khoác gió.`;
    themeBorder = '#38bdf8';
    icon = '🧥';
  } else {
    title = 'Khuyên mang kem chống nắng & Mũ rộng vành';
    desc = `Nhiệt độ trên 30°C trời nắng gắt. Hãy bổ sung thật nhiều nước lọc, thoa kem chống nắng và chuẩn bị kính râm.`;
    themeBorder = '#f59e0b';
    icon = '🧢';
  }

  if (suggestionBox) suggestionBox.style.borderLeftColor = themeBorder;
  if (suggestionIcon) {
    suggestionIcon.textContent = icon;
    suggestionIcon.style.display = 'inline-block';
  }
  if (suggestionTitle) {
    suggestionTitle.textContent = title;
    suggestionTitle.style.color = themeBorder;
  }
  if (suggestionContent) suggestionContent.textContent = desc;
}

/**
 * ------------------------------------------------------------------------------
 * 8. ĐỀ XUẤT ĐỊA ĐIỂM (TẦNG 1 CỘT PHẢI) & 1-CLICK THÊM VÀO LỊCH TRÌNH
 * ------------------------------------------------------------------------------
 */
function renderRecommendedPlaces() {
  const city = VIETNAM_34_PROVINCES.find(c => c.id === currentCityId);
  if (!city || !recommendedGrid) return;

  if (recommendedHeading) {
    recommendedHeading.textContent = `Địa điểm đề xuất tại ${city.name}`;
  }

  recommendedGrid.innerHTML = '';

  city.recommendedPlaces.forEach(item => {
    const isAdded = itineraryItems.some(
      it => it.cityId === currentCityId && it.place.toLowerCase() === item.name.toLowerCase()
    );

    const card = document.createElement('div');
    card.className = `recommended-card ${isAdded ? 'is-added' : ''}`;

    card.innerHTML = `
      <div class="rec-content">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span class="rec-tag">${escapeHtml(item.category)}</span>
          <span class="rec-icon-glyph">${item.icon || '📍'}</span>
        </div>
        <h4 class="rec-title">${escapeHtml(item.name)}</h4>
        <span class="rec-time">Gợi ý: ${escapeHtml(item.defaultTime)}</span>
      </div>
      <button type="button" class="btn-rec-add" ${isAdded ? 'disabled' : ''}>
        ${isAdded ? '✓ Đã trong kế hoạch' : '+ Thêm vào lịch trình'}
      </button>
    `;

    if (!isAdded) {
      const btn = card.querySelector('.btn-rec-add');
      btn.addEventListener('click', () => {
        addItemToItinerary(item.name, item.defaultTime, `Điểm đề xuất nổi bật của ${city.name}`);
      });
    }

    recommendedGrid.appendChild(card);
  });
}

/**
 * ------------------------------------------------------------------------------
 * 9. QUẢN LÝ LỊCH TRÌNH DU LỊCH (ITINERARY MODULE - TẦNG 2 CỘT PHẢI)
 * ------------------------------------------------------------------------------
 */
function addItemToItinerary(placeText, timeText, noteText = '') {
  const cleanPlace = placeText.trim();
  if (!cleanPlace) return;

  const newItem = {
    id: 'plan_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    cityId: currentCityId,
    place: cleanPlace,
    time: timeText && timeText.trim() ? timeText.trim() : 'Linh hoạt',
    note: noteText ? noteText.trim() : '',
    visited: false
  };

  itineraryItems.unshift(newItem);
  saveStorage();

  renderItineraryList();
  renderRecommendedPlaces();
  renderProvinceChips();
}

function handleFormSubmit() {
  const place = placeNameInput.value.trim();
  const time = placeTimeInput.value.trim();
  const note = placeNoteInput ? placeNoteInput.value.trim() : '';

  if (!place) {
    placeNameInput.classList.add('shake-input');
    placeNameInput.focus();
    setTimeout(() => placeNameInput.classList.remove('shake-input'), 400);
    return;
  }

  addItemToItinerary(place, time, note);

  placeNameInput.value = '';
  placeTimeInput.value = '';
  if (placeNoteInput) placeNoteInput.value = '';
  placeNameInput.focus();
}

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

function deleteItemWithAnimation(itemId, element) {
  element.classList.add('fade-slide-out');

  setTimeout(() => {
    itineraryItems = itineraryItems.filter(item => item.id !== itemId);
    saveStorage();
    renderItineraryList();
    renderRecommendedPlaces();
    renderProvinceChips();
  }, 220);
}

function handleClearAll() {
  const currentCityItems = itineraryItems.filter(i => i.cityId === currentCityId);
  if (currentCityItems.length === 0) return;

  const city = VIETNAM_34_PROVINCES.find(c => c.id === currentCityId);
  const cityName = city ? city.name : 'thành phố này';

  if (confirm(`Bạn có chắc chắn muốn xóa toàn bộ ${currentCityItems.length} địa điểm trong lịch trình tại ${cityName}?`)) {
    itineraryItems = itineraryItems.filter(i => i.cityId !== currentCityId);
    saveStorage();
    renderItineraryList();
    renderRecommendedPlaces();
    renderProvinceChips();
  }
}

/**
 * Render danh sách lịch trình tuân thủ đầy đủ 4 quy chuẩn của .skill/skill.md:
 * 1. Tìm kiếm (Search)
 * 2. Lọc (Filter)
 * 3. Sắp xếp trên title (Sort Title A-Z / Z-A)
 * 4. Phân trang (Pagination 10, 20, 50, all)
 */
function renderItineraryList() {
  let list = itineraryItems.filter(i => i.cityId === currentCityId);

  if (currentFilterTab === 'upcoming') {
    list = list.filter(i => !i.visited);
  } else if (currentFilterTab === 'visited') {
    list = list.filter(i => i.visited);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(i =>
      i.place.toLowerCase().includes(q) ||
      (i.time && i.time.toLowerCase().includes(q)) ||
      (i.note && i.note.toLowerCase().includes(q))
    );
  }

  if (sortOrder === 'title-asc') {
    list.sort((a, b) => a.place.localeCompare(b.place, 'vi'));
  } else if (sortOrder === 'title-desc') {
    list.sort((a, b) => b.place.localeCompare(a.place, 'vi'));
  } else if (sortOrder === 'time') {
    list.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  }

  updateItineraryStatistics();

  const totalRecords = list.length;
  let itemsToDisplay = list;
  let totalPages = 1;

  if (pageSizeOption !== 'all') {
    const limit = parseInt(pageSizeOption, 10);
    totalPages = Math.max(1, Math.ceil(totalRecords / limit));
    if (currentPage > totalPages) currentPage = totalPages;

    const startIdx = (currentPage - 1) * limit;
    itemsToDisplay = list.slice(startIdx, startIdx + limit);
  } else {
    currentPage = 1;
  }

  renderPagination(totalPages, totalRecords);

  itineraryList.innerHTML = '';

  if (itemsToDisplay.length === 0) {
    emptyState.style.display = 'flex';
  } else {
    emptyState.style.display = 'none';

    itemsToDisplay.forEach((item, idx) => {
      const realIndex = (pageSizeOption !== 'all')
        ? ((currentPage - 1) * parseInt(pageSizeOption, 10) + idx + 1)
        : (idx + 1);

      const li = document.createElement('li');
      li.className = `itinerary-item ${item.visited ? 'visited' : ''}`;
      li.setAttribute('data-id', item.id);

      li.innerHTML = `
        <div class="item-left-block">
          <button type="button" class="btn-check-toggle" title="${item.visited ? 'Đánh dấu chưa đến' : 'Đánh dấu đã ghé thăm'}">
            ${item.visited ? '✓' : realIndex}
          </button>
          
          <div class="item-text-wrap">
            <div class="item-heading-line">
              <span class="item-place-name" title="${escapeHtml(item.place)}">${escapeHtml(item.place)}</span>
              ${item.visited ? '<span class="visited-tag">ĐÃ ĐẾN</span>' : '<span class="upcoming-tag">CHƯA ĐI</span>'}
            </div>
            <div class="item-sub-meta">
              <span class="item-time-val">⏰ ${escapeHtml(item.time)}</span>
              ${item.note ? `<span class="meta-dot">•</span><span class="item-note-val">${escapeHtml(item.note)}</span>` : ''}
            </div>
          </div>
        </div>

        <div class="item-actions-block">
          <button type="button" class="btn-toggle-visited" title="${item.visited ? 'Đánh dấu chưa đến' : 'Đánh dấu đã ghé thăm'}">
            ${item.visited ? 'Chưa ghé' : 'Đã đến'}
          </button>
          <button type="button" class="btn-delete-item" title="Xóa địa điểm này">
            ✕
          </button>
        </div>
      `;

      const checkToggle = li.querySelector('.btn-check-toggle');
      const toggleVisited = li.querySelector('.btn-toggle-visited');
      const deleteBtn = li.querySelector('.btn-delete-item');

      checkToggle.addEventListener('click', () => toggleItemVisited(item.id));
      toggleVisited.addEventListener('click', () => toggleItemVisited(item.id));
      deleteBtn.addEventListener('click', () => deleteItemWithAnimation(item.id, li));

      itineraryList.appendChild(li);
    });
  }
}

function updateItineraryStatistics() {
  const currentCityItems = itineraryItems.filter(i => i.cityId === currentCityId);
  const total = currentCityItems.length;
  const visited = currentCityItems.filter(i => i.visited).length;
  const upcoming = total - visited;
  const percent = total > 0 ? Math.round((visited / total) * 100) : 0;

  if (totalPlacesCount) totalPlacesCount.textContent = total;
  if (visitedPlacesCount) visitedPlacesCount.textContent = visited;
  if (upcomingPlacesCount) upcomingPlacesCount.textContent = upcoming;
  if (headerPlaceCount) headerPlaceCount.textContent = `${visited}/${total}`;

  if (itineraryProgressFill) itineraryProgressFill.style.width = `${percent}%`;
  if (itineraryProgressText) itineraryProgressText.textContent = `${percent}%`;
}

function renderPagination(totalPages, totalRecords) {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = '';

  if (totalPages <= 1 || pageSizeOption === 'all') {
    paginationContainer.style.display = 'none';
    return;
  }

  paginationContainer.style.display = 'flex';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = `page-nav-btn ${currentPage === 1 ? 'disabled' : ''}`;
  prevBtn.textContent = 'Trước';
  prevBtn.disabled = (currentPage === 1);
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderItineraryList();
    }
  });
  paginationContainer.appendChild(prevBtn);

  for (let p = 1; p <= totalPages; p++) {
    const numBtn = document.createElement('button');
    numBtn.type = 'button';
    numBtn.className = `page-num-btn ${p === currentPage ? 'active' : ''}`;
    numBtn.textContent = p;
    numBtn.addEventListener('click', () => {
      currentPage = p;
      renderItineraryList();
    });
    paginationContainer.appendChild(numBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = `page-nav-btn ${currentPage === totalPages ? 'disabled' : ''}`;
  nextBtn.textContent = 'Sau';
  nextBtn.disabled = (currentPage === totalPages);
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderItineraryList();
    }
  });
  paginationContainer.appendChild(nextBtn);
}

/**
 * ------------------------------------------------------------------------------
 * 10. ĐỒNG HỒ ĐẾM NGƯỢC KHỞI HÀNH (COUNTDOWN TIMER - MỤC 4 ĐIỂM 9-10)
 * ------------------------------------------------------------------------------
 */
function initCountdownTimer() {
  function tickCountdown() {
    const targetValue = departureDateInput.value;
    if (!targetValue) return;

    const targetTime = new Date(targetValue).getTime();
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      countDays.textContent = '00';
      countHours.textContent = '00';
      countMinutes.textContent = '00';
      countSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countDays.textContent = String(days).padStart(2, '0');
    countHours.textContent = String(hours).padStart(2, '0');
    countMinutes.textContent = String(minutes).padStart(2, '0');
    countSeconds.textContent = String(seconds).padStart(2, '0');
  }

  if (countdownIntervalId) clearInterval(countdownIntervalId);
  tickCountdown();
  countdownIntervalId = setInterval(tickCountdown, 1000);

  departureDateInput.addEventListener('change', () => {
    localStorage.setItem(STORAGE_KEY_DEPARTURE, departureDateInput.value);
    tickCountdown();
  });
}

/**
 * ------------------------------------------------------------------------------
 * 11. XUẤT DỮ LIỆU RA FILE .TXT (EXPORT TO TEXT - MỤC 4 ĐIỂM 9-10)
 * Sử dụng Blob và URL.createObjectURL theo đúng chuẩn kỹ năng
 * ------------------------------------------------------------------------------
 */
function exportItineraryToTxt() {
  const currentCity = VIETNAM_34_PROVINCES.find(c => c.id === currentCityId);
  const cityName = currentCity ? currentCity.name : 'Du_Lich';
  const currentCityItems = itineraryItems.filter(i => i.cityId === currentCityId);

  if (currentCityItems.length === 0) {
    alert(`Lịch trình tại ${cityName} hiện chưa có địa điểm nào. Hãy thêm ít nhất một địa điểm trước khi xuất file.`);
    return;
  }

  const exportDate = new Date().toLocaleString('vi-VN');
  const departureDate = departureDateInput.value ? departureDateInput.value.replace('T', ' ') : 'Chưa thiết lập';

  let txt = `========================================================================\n`;
  txt += `       KẾ HOẠCH DU LỊCH & THỜI TIẾT TRỰC TIẾP (WEATHER PLANNER)         \n`;
  txt += `                 Nhóm 2 - Đại Học Lạc Hồng (Bài Tập 2)                  \n`;
  txt += `========================================================================\n\n`;
  txt += `ĐIỂM ĐẾN:            ${cityName} (${currentCity ? currentCity.regionName : ''})\n`;
  txt += `THỜI TIẾT HIỆN TẠI:  ${weatherTemp.textContent}, ${conditionText.textContent}\n`;
  txt += `ĐỘ ẨM & TỐC ĐỘ GIÓ:  Độ ẩm ${weatherHumidity.textContent} | Gió ${weatherWind.textContent}\n`;
  txt += `DỰ KIẾN KHỞI HÀNH:   ${departureDate}\n`;
  txt += `THỜI ĐIỂM XUẤT FILE: ${exportDate}\n\n`;
  txt += `------------------------------------------------------------------------\n`;
  txt += `DANH SÁCH CHI TIẾT CÁC ĐỊA ĐIỂM GHÉ THĂM TẠI ${cityName.toUpperCase()}:\n`;
  txt += `------------------------------------------------------------------------\n\n`;

  currentCityItems.forEach((item, index) => {
    const statusText = item.visited ? '[ĐÃ CHECK-IN]' : '[CHƯA ĐI]';
    txt += `${index + 1}. ${item.place}\n`;
    txt += `   - Thời gian ghé thăm: ${item.time}\n`;
    txt += `   - Trạng thái:         ${statusText}\n`;
    if (item.note) {
      txt += `   - Ghi chú:            ${item.note}\n`;
    }
    txt += `\n`;
  });

  txt += `------------------------------------------------------------------------\n`;
  txt += `LỜI KHUYÊN TRANG PHỤC & HÀNH TRÌNH:\n`;
  txt += `${suggestionContent ? suggestionContent.textContent : ''}\n\n`;
  txt += `REVIEW TỪ TRAVEL BLOGGER:\n`;
  txt += `${bloggerQuote ? bloggerQuote.textContent : ''}\n\n`;
  txt += `========================================================================\n`;
  txt += `Chúc bạn có một chuyến đi an toàn, tràn ngập niềm vui và trải nghiệm thú vị!\n`;

  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  const safeName = cityName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '_');
  link.download = `LichTrinh_DuLich_${safeName}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

/**
 * ------------------------------------------------------------------------------
 * 12. ĐỒNG HỒ THỜI GIAN THỰC HEADER & TỰ ĐỘNG CHUYỂN NGÀY/ĐÊM
 * ------------------------------------------------------------------------------
 */
function initHeaderClock() {
  function tick() {
    if (!headerRealClock) return;
    const now = new Date();
    headerRealClock.textContent = now.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Nếu đang ở chế độ 'auto', kiểm tra xem có chuyển ngày/đêm không
    if (currentThemeMode === 'auto') {
      const h = now.getHours();
      const shouldBeLight = (h >= 6 && h < 18);
      const isCurrentlyLight = document.documentElement.classList.contains('theme-light');
      if (shouldBeLight !== isCurrentlyLight) {
        applyThemeMode('auto');
      }
    }
  }
  tick();
  setInterval(tick, 1000);
}

/**
 * ------------------------------------------------------------------------------
 * 13. LẮNG NGHE SỰ KIỆN GIAO DIỆN (EVENT LISTENERS)
 * ------------------------------------------------------------------------------
 */
function setupEventListeners() {
  // 1. Chuyển đổi theme mode: Auto / Light / Dark
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-theme');
      applyThemeMode(mode);
    });
  });

  // 2. Khi chọn thành phố từ thẻ <select id="citySelect">
  citySelect.addEventListener('change', (e) => {
    switchCity(e.target.value);
  });

  // 3. Tìm kiếm tỉnh thành trên dải chips
  if (provinceSearchInput) {
    provinceSearchInput.addEventListener('input', () => {
      renderProvinceChips();
    });
  }

  // 4. Bộ lọc vùng miền (Tất cả, Miền Bắc, Miền Trung, Miền Nam)
  regionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      regionPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentRegionFilter = pill.getAttribute('data-region');
      renderProvinceChips();
    });
  });

  // 5. Nút làm mới thời tiết trực tiếp
  if (refreshWeatherBtn) {
    refreshWeatherBtn.addEventListener('click', () => {
      fetchLiveWeather(currentCityId, true);
    });
  }

  // 6. Thêm địa điểm vào lịch trình từ form
  itineraryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit();
  });

  // 7. Tìm kiếm trong danh sách lịch trình
  if (itinerarySearchInput) {
    itinerarySearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      currentPage = 1;
      renderItineraryList();
    });
  }

  // 8. Sắp xếp trên title theo chuẩn skill.md (title-asc, title-desc, time, default)
  if (itinerarySortSelect) {
    itinerarySortSelect.addEventListener('change', (e) => {
      sortOrder = e.target.value;
      renderItineraryList();
    });
  }

  // 9. Phân trang (10, 20, 50, all theo chuẩn skill.md)
  if (pageSizeSelect) {
    pageSizeSelect.addEventListener('change', (e) => {
      pageSizeOption = e.target.value;
      currentPage = 1;
      renderItineraryList();
    });
  }

  // 10. Bộ lọc Tab trạng thái (Tất cả, Chưa đi, Đã đến)
  filterTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilterTab = btn.getAttribute('data-filter');
      currentPage = 1;
      renderItineraryList();
    });
  });

  // 11. Xóa tất cả lịch trình của thành phố hiện tại
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', handleClearAll);
  }

  // 12. Xuất file văn bản .txt
  if (exportTxtBtn) {
    exportTxtBtn.addEventListener('click', exportItineraryToTxt);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/**
 * ------------------------------------------------------------------------------
 * 14. KHỞI CHẠY ỨNG DỤNG (ENTRY POINT)
 * ------------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  initHeaderClock();
  applyThemeMode(currentThemeMode);
  renderProvincesSelectors();
  switchCity(currentCityId);
  initCountdownTimer();
  setupEventListeners();

  console.log('✅ Weather & Travel Planner: Sẵn sàng với Theme Ngày/Đêm & Responsive Di Động!');
});

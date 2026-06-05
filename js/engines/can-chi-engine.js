/* ============================================================
   can-chi-engine.js — Engine tính Can Chi, Tiết Khí, Thập Nhị Trực,
   Giờ Hoàng Đạo / Hắc Đạo
   Lịch Việt Nam 888
   Phụ thuộc: can-chi.js, tiet-khi.js, lunar-engine.js
   ============================================================ */

var CanChiEngine = (function() {
  'use strict';

  /* ============================================================
     CAN CHI NĂM
     ============================================================ */

  /* ---- Tính Can của năm dương lịch ---- */
  function getCanNam(nam) {
    /* Giáp Tý = 1984, Can lặp 10 năm */
    var idx = (nam - 4) % 10;
    if (idx < 0) idx += 10;
    return THIEN_CAN[idx];
  }

  /* ---- Tính Chi của năm dương lịch ---- */
  function getChiNam(nam) {
    /* Giáp Tý = 1984, Chi lặp 12 năm */
    var idx = (nam - 4) % 12;
    if (idx < 0) idx += 12;
    return DIA_CHI[idx];
  }

  /* ---- Tính Can Chi năm đầy đủ ---- */
  function getCanChiNam(nam) {
    return { can: getCanNam(nam), chi: getChiNam(nam) };
  }

  /* ============================================================
     CAN CHI THÁNG
     Tháng âm lịch → Can Chi tháng dựa trên can năm
     ============================================================ */

  /* Bảng Can đầu tháng Giêng theo Can năm */
  /* Năm Can Giáp/Kỷ → tháng Giêng là Bính Dần */
  /* Năm Can Ất/Canh → tháng Giêng là Mậu Dần  */
  /* Năm Can Bính/Tân → tháng Giêng là Canh Dần */
  /* Năm Can Đinh/Nhâm → tháng Giêng là Nhâm Dần */
  /* Năm Can Mậu/Quý → tháng Giêng là Giáp Dần  */
  var CAN_THANG_GIENG = {
    'Giáp': 2, /* Bính = index 2 */
    'Kỷ':   2,
    'Ất':   4, /* Mậu = index 4 */
    'Canh': 4,
    'Bính': 6, /* Canh = index 6 */
    'Tân':  6,
    'Đinh': 8, /* Nhâm = index 8 */
    'Nhâm': 8,
    'Mậu':  0, /* Giáp = index 0 */
    'Quý':  0
  };

  /* ---- Tính Can tháng âm lịch (tháng 1-12) theo can năm ---- */
  function getCanThang(thangAm, canNam) {
    /* canNam: tên can như "Giáp", "Ất", ... */
    var startIdx = CAN_THANG_GIENG[canNam];
    if (startIdx === undefined) startIdx = 0;
    /* thangAm bắt đầu từ 1, tháng Giêng = index startIdx */
    var idx = (startIdx + thangAm - 1) % 10;
    return THIEN_CAN[idx];
  }

  /* ---- Chi tháng: tháng 1 = Dần (index 2), tháng 2 = Mão, ... ---- */
  function getChiThang(thangAm) {
    /* Tháng 1 âm lịch = Dần (index 2 trong DIA_CHI) */
    var idx = (thangAm + 1) % 12;
    return DIA_CHI[idx];
  }

  /* ---- Can Chi tháng đầy đủ ---- */
  function getCanChiThang(thangAm, canNam) {
    return {
      can: getCanThang(thangAm, canNam),
      chi: getChiThang(thangAm)
    };
  }

  /* ============================================================
     CAN CHI NGÀY
     Công thức tính dựa trên số Julian
     ============================================================ */

  /* ---- Tính Can ngày từ số Julian ---- */
  function getCanNgayFromJD(jd) {
    /* JD ngày Giáp Tý (1/1/1900) = 2415021 → Canh Tý */
    /* Số ngày từ một mốc Giáp Tý cố định */
    /* 2415021 mod 10 = 1 → can index = (jd - 1) % 10 */
    var idx = (jd + 9) % 10;
    if (idx < 0) idx += 10;
    return THIEN_CAN[idx];
  }

  /* ---- Tính Chi ngày từ số Julian ---- */
  function getChiNgayFromJD(jd) {
    var idx = (jd + 1) % 12;
    if (idx < 0) idx += 12;
    return DIA_CHI[idx];
  }

  /* ---- Can Chi ngày từ ngày dương lịch ---- */
  function getCanChiNgay(dd, mm, yyyy) {
    /* Tính số Julian */
    var a  = Math.floor((14 - mm) / 12);
    var y  = yyyy + 4800 - a;
    var m  = mm + 12 * a - 3;
    var jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
           + Math.floor(y / 4) - Math.floor(y / 100)
           + Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
         + Math.floor(y / 4) - 32083;
    }
    return {
      can: getCanNgayFromJD(jd),
      chi: getChiNgayFromJD(jd),
      jd:  jd
    };
  }

  /* ============================================================
     CAN CHI GIỜ
     ============================================================ */

  /* ---- Giờ Tý = 23h-1h, Sửu = 1h-3h, ... ---- */
  /* Chi giờ tính theo giờ thực */
  function getChiGio(hour) {
    /* Giờ Tý: 23-1, Sửu: 1-3, ... */
    var adjusted = (hour + 1) % 24;
    var idx = Math.floor(adjusted / 2);
    return DIA_CHI[idx];
  }

  /* ---- Can giờ tính theo Can ngày ---- */
  /* Quy tắc: Can ngày Giáp/Kỷ → giờ Tý = Giáp */
  /*          Can ngày Ất/Canh  → giờ Tý = Bính */
  /*          Can ngày Bính/Tân → giờ Tý = Mậu  */
  /*          Can ngày Đinh/Nhâm → giờ Tý = Canh */
  /*          Can ngày Mậu/Quý  → giờ Tý = Nhâm */
  var CAN_GIO_TY = {
    'Giáp': 0, /* Giáp = index 0 */
    'Kỷ':   0,
    'Ất':   2, /* Bính = index 2 */
    'Canh': 2,
    'Bính': 4, /* Mậu = index 4 */
    'Tân':  4,
    'Đinh': 6, /* Canh = index 6 */
    'Nhâm': 6,
    'Mậu':  8, /* Nhâm = index 8 */
    'Quý':  8
  };

  function getCanGio(chiGio, canNgay) {
    var startIdx = CAN_GIO_TY[canNgay];
    if (startIdx === undefined) startIdx = 0;
    var chiIdx = DIA_CHI.indexOf(chiGio);
    if (chiIdx === -1) chiIdx = 0;
    var idx = (startIdx + chiIdx) % 10;
    return THIEN_CAN[idx];
  }

  function getCanChiGio(hour, canNgay) {
    var chi = getChiGio(hour);
    var can = getCanGio(chi, canNgay);
    return { can: can, chi: chi };
  }

  /* ============================================================
     TIẾT KHÍ
     Tính Solar Longitude bằng thuật toán gần đúng
     ============================================================ */

  /* ---- Tính Solar Longitude cho ngày dd/mm/yyyy (độ) ---- */
  function getSolarLongitude(dd, mm, yyyy) {
    /* Tính JD */
    var a  = Math.floor((14 - mm) / 12);
    var y  = yyyy + 4800 - a;
    var m  = mm + 12 * a - 3;
    var jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
           + Math.floor(y / 4) - Math.floor(y / 100)
           + Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
         + Math.floor(y / 4) - 32083;
    }

    var T   = (jd - 2451545.0) / 36525;
    var T2  = T * T;
    var dr  = Math.PI / 180;
    var M   = 357.52910 + 35999.05030 * T - 0.0001559 * T2;
    var L0  = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    var DL  = (1.914600 - 0.004817 * T) * Math.sin(dr * M)
            + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M)
            +  0.000290 * Math.sin(dr * 3 * M);
    var L   = L0 + DL;
    var omega = 125.04 - 1934.136 * T;
    L = L - 0.00569 - 0.00478 * Math.sin(dr * omega);
    L = L % 360;
    if (L < 0) L += 360;
    return L;
  }

  /* ---- Lấy thông tin Tiết Khí của ngày dd/mm/yyyy ---- */
  function getTietKhiNgay(dd, mm, yyyy) {
    var lng = getSolarLongitude(dd, mm, yyyy);
    return getTietKhiByLng(lng);
  }

  /* ============================================================
     THẬP NHỊ TRỰC
     Tính dựa trên Chi tháng + Chi ngày
     ============================================================ */

  /* 12 trực theo thứ tự */
  var THAP_NHI_TRUC = [
    'Kiến', 'Trừ', 'Mãn', 'Bình',
    'Định', 'Chấp', 'Phá', 'Nguy',
    'Thành', 'Thu', 'Khai', 'Bế'
  ];

  /* ---- Tính Trực của ngày ---- */
  /* Công thức: (index Chi ngày - index Chi tháng + 12) % 12 */
  function getThapNhiTruc(chiNgay, chiThang) {
    var iNgay  = DIA_CHI.indexOf(chiNgay);
    var iThang = DIA_CHI.indexOf(chiThang);
    if (iNgay === -1 || iThang === -1) return THAP_NHI_TRUC[0];
    var idx = (iNgay - iThang + 12) % 12;
    return THAP_NHI_TRUC[idx];
  }

  /* ============================================================
     GIỜ HOÀNG ĐẠO / HẮC ĐẠO
     Tính 12 giờ tốt/xấu theo Can ngày
     ============================================================ */

  /*
   * Quy tắc truyền thống:
   * - Can ngày Giáp/Kỷ: Hoàng Đạo ở giờ Tý, Sửu, Mão, Ngọ, Thân, Dậu
   * - Can ngày Ất/Canh: Hoàng Đạo ở giờ Dần, Sửu, Tỵ, Ngọ, Thân, Hợi
   * - Can ngày Bính/Tân: Hoàng Đạo ở giờ Tý, Dần, Mão, Tỵ, Dậu, Hợi
   * - Can ngày Đinh/Nhâm: Hoàng Đạo ở giờ Tý, Mão, Thìn, Ngọ, Dậu, Tuất
   * - Can ngày Mậu/Quý: Hoàng Đạo ở giờ Sửu, Dần, Thìn, Tỵ, Tuất, Hợi
   */
  var HOANG_DAO_THEO_CAN = {
    'Giáp': ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'],
    'Kỷ':   ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'],
    'Ất':   ['Dần', 'Sửu', 'Tỵ', 'Ngọ', 'Thân', 'Hợi'],
    'Canh': ['Dần', 'Sửu', 'Tỵ', 'Ngọ', 'Thân', 'Hợi'],
    'Bính': ['Tý', 'Dần', 'Mão', 'Tỵ', 'Dậu', 'Hợi'],
    'Tân':  ['Tý', 'Dần', 'Mão', 'Tỵ', 'Dậu', 'Hợi'],
    'Đinh': ['Tý', 'Mão', 'Thìn', 'Ngọ', 'Dậu', 'Tuất'],
    'Nhâm': ['Tý', 'Mão', 'Thìn', 'Ngọ', 'Dậu', 'Tuất'],
    'Mậu':  ['Sửu', 'Dần', 'Thìn', 'Tỵ', 'Tuất', 'Hợi'],
    'Quý':  ['Sửu', 'Dần', 'Thìn', 'Tỵ', 'Tuất', 'Hợi']
  };

  /* ---- Kiểm tra giờ có là Hoàng Đạo không ---- */
  function isHoangDao(chiGio, canNgay) {
    var list = HOANG_DAO_THEO_CAN[canNgay] || [];
    return list.indexOf(chiGio) !== -1;
  }

  /* ---- Lấy danh sách 12 giờ với trạng thái Hoàng Đạo / Hắc Đạo ---- */
  function getDanhSachGio(canNgay) {
    var result = [];
    for (var i = 0; i < DIA_CHI.length; i++) {
      var chi    = DIA_CHI[i];
      var good   = isHoangDao(chi, canNgay);
      var gioInfo = GIO_DIA_CHI[i];
      result.push({
        chi:    chi,
        loai:   good ? 'Hoàng Đạo' : 'Hắc Đạo',
        good:   good,
        from:   gioInfo ? gioInfo.from : (i * 2 - 1),
        to:     gioInfo ? gioInfo.to   : (i * 2 + 1)
      });
    }
    return result;
  }

  /* ============================================================
     PHÂN TÍCH ĐẦY ĐỦ MỘT NGÀY DL
     Trả về object tổng hợp tất cả thông tin lịch
     ============================================================ */
  function phanTichNgay(dd, mm, yyyy, tz) {
    tz = (tz !== undefined) ? tz : 7;

    /* Chuyển sang âm lịch */
    var am   = LunarEngine.convertSolar2Lunar(dd, mm, yyyy, tz);

    /* Can Chi ngày */
    var ccNgay  = getCanChiNgay(dd, mm, yyyy);

    /* Can Chi tháng (theo âm lịch) */
    var canNam  = getCanNam(am.year);
    var ccThang = getCanChiThang(am.month, canNam);

    /* Can Chi năm âm lịch */
    var ccNam   = getCanChiNam(am.year);

    /* Tiết Khí */
    var tietKhi = getTietKhiNgay(dd, mm, yyyy);

    /* Thập Nhị Trực */
    var truc    = getThapNhiTruc(ccNgay.chi, ccThang.chi);

    /* Danh sách 12 giờ */
    var danhSachGio = getDanhSachGio(ccNgay.can);

    /* Thứ trong tuần */
    var thuMap = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    var dow    = new Date(yyyy, mm - 1, dd).getDay();

    return {
      duong:  { dd: dd, mm: mm, yyyy: yyyy },
      am:     am,
      thu:    thuMap[dow],
      ccNgay:  ccNgay,
      ccThang: ccThang,
      ccNam:   ccNam,
      tietKhi: tietKhi,
      truc:    truc,
      danhSachGio: danhSachGio
    };
  }

  /* ============================================================
     Public API
     ============================================================ */
  return {
    getCanNam:        getCanNam,
    getChiNam:        getChiNam,
    getCanChiNam:     getCanChiNam,
    getCanThang:      getCanThang,
    getChiThang:      getChiThang,
    getCanChiThang:   getCanChiThang,
    getCanChiNgay:    getCanChiNgay,
    getCanChiGio:     getCanChiGio,
    getChiGio:        getChiGio,
    getSolarLongitude: getSolarLongitude,
    getTietKhiNgay:   getTietKhiNgay,
    getThapNhiTruc:   getThapNhiTruc,
    isHoangDao:       isHoangDao,
    getDanhSachGio:   getDanhSachGio,
    phanTichNgay:     phanTichNgay,
    THAP_NHI_TRUC:    THAP_NHI_TRUC,
    HOANG_DAO_THEO_CAN: HOANG_DAO_THEO_CAN
  };
})();

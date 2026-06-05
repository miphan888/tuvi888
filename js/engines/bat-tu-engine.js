/* ============================================================
   bat-tu-engine.js — Engine tính Tứ Trụ Bát Tự (Bát Môn)
   Lịch Việt Nam 888
   QUAN TRỌNG: Tháng tính theo tiết khí, không theo âm lịch
   Phụ thuộc: lunar-engine.js, can-chi-engine.js, can-chi.js
   ============================================================ */

var BatTuEngine = (function() {
  'use strict';

  /* ============================================================
     BẢNG THÁNG TIẾT KHÍ
     Mỗi tháng Can Chi bắt đầu từ tiết (không phải sóc)
     Tháng 1 (Dần): bắt đầu từ Lập Xuân (Solar Lng ≈ 315)
     Tháng 2 (Mão): bắt đầu từ Kinh Trập (345)
     Tháng 3 (Thìn): bắt đầu từ Thanh Minh (15)
     ...
     ============================================================ */

  /* Solar Longitude bắt đầu mỗi tháng Can Chi (tháng 1=Dần → lng=315) */
  var THANG_TIET_KHI_LNG = [315, 345, 15, 45, 75, 105, 135, 165, 195, 225, 255, 285];
  /* Tên tiết khí đầu mỗi tháng */
  var THANG_TIET_TEN     = [
    'Lập Xuân', 'Kinh Trập', 'Thanh Minh', 'Lập Hạ',
    'Mang Chủng', 'Tiểu Thử', 'Lập Thu', 'Bạch Lộ',
    'Hàn Lộ', 'Lập Đông', 'Đại Tuyết', 'Tiểu Hàn'
  ];

  /* ============================================================
     _getThangTietKhi — Xác định tháng Can Chi theo tiết khí
     Trả về số 1-12 (1=Dần, 2=Mão, ..., 12=Sửu)
     ============================================================ */
  function _getThangTietKhi(dd, mm, yyyy) {
    var lng = CanChiEngine.getSolarLongitude(dd, mm, yyyy);

    /* Tìm tháng dựa trên Solar Longitude */
    /* Tháng 3 (Thìn) bắt đầu lng=15, tháng 1 (Dần) lng=315, tháng 2 (Mão) lng=345 */
    /* Sắp xếp: 315→tháng1, 345→tháng2, 15→tháng3, 45→tháng4, ..., 285→tháng12 */

    var thang = 1; /* Mặc định tháng 1 (Dần) */

    /* Kiểm tra từng ngưỡng */
    for (var i = THANG_TIET_KHI_LNG.length - 1; i >= 0; i--) {
      var ngưỡng = THANG_TIET_KHI_LNG[i];
      /* Xử lý đặc biệt cho tháng 1 (315) và tháng 2 (345) vượt qua 360 */
      if (i === 0) {
        /* Tháng Dần: lng >= 315 */
        if (lng >= 315) { thang = 1; break; }
      } else if (i === 1) {
        /* Tháng Mão: lng >= 345 */
        if (lng >= 345) { thang = 2; break; }
      } else {
        /* Các tháng còn lại: lng >= ngưỡng */
        if (lng >= ngưỡng) { thang = i + 1; break; }
      }
    }

    /* Trường hợp lng < 15 (chưa qua Thanh Minh) và >= 285 đã qua Tiểu Hàn */
    if (lng >= 285 && lng < 315) { thang = 12; }
    if (lng >= 315)              { thang = 1;  }
    if (lng >= 345)              { thang = 2;  }
    if (lng < 15)                { thang = 2;  } /* Sau Kinh Trập, trước Thanh Minh */

    return thang;
  }

  /* ============================================================
     _getNamCan Chi — Lấy can chi năm theo tiết khí
     Năm bắt đầu từ Lập Xuân, không phải từ mùng 1 Tết
     ============================================================ */
  function _getCanChiNamTietKhi(dd, mm, yyyy) {
    var lng = CanChiEngine.getSolarLongitude(dd, mm, yyyy);

    /* Nếu chưa qua Lập Xuân (lng < 315 và đang đầu năm dl), */
    /* tức là vẫn thuộc năm Can Chi cũ */
    var namCanChi = yyyy;
    /* Lập Xuân ≈ 3-5/2 hàng năm */
    /* Nếu lng >= 315 → đã qua Lập Xuân của năm này */
    /* Nếu lng < 315 và mm <= 2 → chưa qua Lập Xuân → thuộc năm trước */
    if (lng < 315 && mm <= 2) {
      namCanChi = yyyy - 1;
    }

    return {
      can: CanChiEngine.getCanNam(namCanChi),
      chi: CanChiEngine.getChiNam(namCanChi),
      nam: namCanChi
    };
  }

  /* ============================================================
     tinhTuTru — Tính 4 trụ Can Chi
     Tham số: { ngay, thang, nam, gioSinh, muiGio }
     gioSinh: index 0-11 của DIA_CHI (Địa Chi giờ)
     Trả về object: { nam, thang, ngay, gio }
     mỗi trụ có: { can, chi, nguHanh }
     ============================================================ */
  function tinhTuTru(params) {
    var dd      = params.ngay;
    var mm      = params.thang;
    var yyyy    = params.nam;
    var gioIdx  = params.gioSinh || 0; /* Index trong DIA_CHI */
    var muiGio  = params.muiGio  || 7;

    /* ---- Trụ NĂM ---- */
    var ccNam = _getCanChiNamTietKhi(dd, mm, yyyy);

    /* ---- Trụ THÁNG ---- */
    var thangTK   = _getThangTietKhi(dd, mm, yyyy);
    var chiThang  = CanChiEngine.getChiThang(thangTK);
    var canThang  = CanChiEngine.getCanThang(thangTK, ccNam.can);

    /* ---- Trụ NGÀY ---- */
    var ccNgay = CanChiEngine.getCanChiNgay(dd, mm, yyyy);

    /* ---- Trụ GIỜ ---- */
    var chiGio = DIA_CHI[gioIdx % 12];
    var canGio = CanChiEngine.getCanGio(chiGio, ccNgay.can);

    /* ---- Build kết quả ---- */
    function buildTru(can, chi) {
      return {
        can:      can,
        chi:      chi,
        nguHanh:  NGU_HANH_CAN[can] || ''
      };
    }

    return {
      nam:   buildTru(ccNam.can,  ccNam.chi),
      thang: buildTru(canThang,   chiThang),
      ngay:  buildTru(ccNgay.can, ccNgay.chi),
      gio:   buildTru(canGio,     chiGio)
    };
  }

  /* ============================================================
     phanTichNguHanh — Đếm Kim-Mộc-Thủy-Hỏa-Thổ trong 8 chữ
     4 Can + 4 Chi
     ============================================================ */
  function phanTichNguHanh(tuTru) {
    var dem = { Kim: 0, Moc: 0, Thuy: 0, Hoa: 0, Tho: 0 };

    /* Hàm đếm một Ngũ Hành */
    function count(nh) {
      if (nh === 'Kim')   dem.Kim++;
      else if (nh === 'Mộc')  dem.Moc++;
      else if (nh === 'Thủy') dem.Thuy++;
      else if (nh === 'Hỏa')  dem.Hoa++;
      else if (nh === 'Thổ')  dem.Tho++;
    }

    /* 4 Can */
    var cacTru = [tuTru.nam, tuTru.thang, tuTru.ngay, tuTru.gio];
    for (var i = 0; i < cacTru.length; i++) {
      count(NGU_HANH_CAN[cacTru[i].can] || '');
      count(NGU_HANH_CHI[cacTru[i].chi] || '');
    }

    var total = dem.Kim + dem.Moc + dem.Thuy + dem.Hoa + dem.Tho;
    return {
      Kim:   dem.Kim,
      Moc:   dem.Moc,
      Thuy:  dem.Thuy,
      Hoa:   dem.Hoa,
      Tho:   dem.Tho,
      total: total
    };
  }

  /* ============================================================
     xacDinhVuong Nhuoc — Xác định Nhật Chủ (Can ngày) mạnh hay yếu
     Dựa trên tháng sinh và các trụ hỗ trợ
     ============================================================ */

  /* Bảng vượng-suy của 10 Can theo 12 tháng (Chi tháng) */
  /* Giá trị: 4=Vượng, 3=Tướng, 2=Hưu, 1=Tù, 0=Tử */
  var VUONG_SUY_CAN_THANG = {
    /* Can Giáp (Mộc Dương) */
    'Giáp': { Dần:4, Mão:4, Thìn:2, Tỵ:1, Ngọ:1, Mùi:2, Thân:0, Dậu:0, Tuất:2, Hợi:3, Tý:3, Sửu:2 },
    /* Can Ất (Mộc Âm) */
    'Ất':   { Dần:3, Mão:4, Thìn:2, Tỵ:1, Ngọ:1, Mùi:2, Thân:0, Dậu:0, Tuất:2, Hợi:4, Tý:3, Sửu:2 },
    /* Can Bính (Hỏa Dương) */
    'Bính': { Dần:3, Mão:3, Thìn:1, Tỵ:4, Ngọ:4, Mùi:3, Thân:2, Dậu:1, Tuất:1, Hợi:0, Tý:0, Sửu:1 },
    /* Can Đinh (Hỏa Âm) */
    'Đinh': { Dần:3, Mão:3, Thìn:1, Tỵ:3, Ngọ:4, Mùi:3, Thân:2, Dậu:1, Tuất:1, Hợi:0, Tý:0, Sửu:1 },
    /* Can Mậu (Thổ Dương) */
    'Mậu':  { Dần:1, Mão:1, Thìn:4, Tỵ:3, Ngọ:3, Mùi:4, Thân:2, Dậu:2, Tuất:4, Hợi:1, Tý:0, Sửu:4 },
    /* Can Kỷ (Thổ Âm) */
    'Kỷ':   { Dần:1, Mão:1, Thìn:4, Tỵ:3, Ngọ:3, Mùi:4, Thân:2, Dậu:2, Tuất:4, Hợi:1, Tý:0, Sửu:4 },
    /* Can Canh (Kim Dương) */
    'Canh': { Dần:0, Mão:0, Thìn:2, Tỵ:1, Ngọ:1, Mùi:2, Thân:4, Dậu:4, Tuất:2, Hợi:1, Tý:1, Sửu:2 },
    /* Can Tân (Kim Âm) */
    'Tân':  { Dần:0, Mão:0, Thìn:2, Tỵ:1, Ngọ:1, Mùi:2, Thân:3, Dậu:4, Tuất:2, Hợi:1, Tý:1, Sửu:2 },
    /* Can Nhâm (Thủy Dương) */
    'Nhâm': { Dần:1, Mão:1, Thìn:1, Tỵ:0, Ngọ:0, Mùi:1, Thân:3, Dậu:3, Tuất:1, Hợi:4, Tý:4, Sửu:1 },
    /* Can Quý (Thủy Âm) */
    'Quý':  { Dần:1, Mão:1, Thìn:1, Tỵ:0, Ngọ:0, Mùi:1, Thân:3, Dậu:3, Tuất:1, Hợi:3, Tý:4, Sửu:1 }
  };

  function xacDinhVuongNhuoc(tuTru, nguHanh) {
    var canNgay  = tuTru.ngay.can;
    var chiThang = tuTru.thang.chi;
    var nhNgay   = NGU_HANH_CAN[canNgay] || '';

    /* Điểm vượng từ tháng sinh */
    var diemThang = (VUONG_SUY_CAN_THANG[canNgay] || {})[chiThang] || 2;

    /* Điểm hỗ trợ từ trụ khác (cùng ngũ hành hoặc sinh ra nhật chủ) */
    var diemHoTro = 0;
    var cacTru = [tuTru.nam, tuTru.thang, tuTru.gio];
    for (var i = 0; i < cacTru.length; i++) {
      var nhCan = NGU_HANH_CAN[cacTru[i].can] || '';
      var nhChi = NGU_HANH_CHI[cacTru[i].chi] || '';
      /* Cùng ngũ hành → hỗ trợ mạnh */
      if (nhCan === nhNgay) diemHoTro += 2;
      if (nhChi === nhNgay) diemHoTro += 2;
      /* Sinh ra nhật chủ → hỗ trợ */
      if (TUONG_SINH[nhCan] === nhNgay) diemHoTro += 1;
      if (TUONG_SINH[nhChi] === nhNgay) diemHoTro += 1;
    }

    var tongDiem = diemThang * 2 + diemHoTro;
    var vuong    = tongDiem >= 8;

    return {
      canNgay:   canNgay,
      nhNgay:    nhNgay,
      diemThang: diemThang,
      diemHoTro: diemHoTro,
      tongDiem:  tongDiem,
      vuong:     vuong,
      ketLuan:   vuong ? 'Thân Vượng' : 'Thân Nhược'
    };
  }

  /* ============================================================
     xacDinhDungThan — Xác định Dụng Thần, Hỷ Thần, Kỵ Thần
     ============================================================ */
  function xacDinhDungThan(vuongNhuoc) {
    var nhNgay  = vuongNhuoc.nhNgay;
    var isVuong = vuongNhuoc.vuong;

    /* Ngũ Hành tương sinh của nhật chủ */
    var nhSinh  = null;
    for (var k in TUONG_SINH) {
      if (TUONG_SINH[k] === nhNgay) { nhSinh = k; break; }
    }
    /* Ngũ Hành bị nhật chủ sinh */
    var nhDuocSinh = TUONG_SINH[nhNgay] || null;
    /* Ngũ Hành khắc nhật chủ */
    var nhKhac = null;
    for (var k2 in TUONG_KHAC) {
      if (TUONG_KHAC[k2] === nhNgay) { nhKhac = k2; break; }
    }
    /* Ngũ Hành bị nhật chủ khắc */
    var nhBiKhac = TUONG_KHAC[nhNgay] || null;

    var dungThan, hyThan, kyThan;

    if (isVuong) {
      /* Thân Vượng cần ức chế → Dụng Thần là thứ khắc hoặc tiết lộ nhật chủ */
      dungThan = nhKhac   || nhDuocSinh || '';
      hyThan   = nhBiKhac || '';
      kyThan   = nhSinh   || nhNgay;
    } else {
      /* Thân Nhược cần phù trợ → Dụng Thần là thứ sinh hoặc cùng ngũ hành */
      dungThan = nhSinh   || nhNgay;
      hyThan   = nhNgay   || '';
      kyThan   = nhKhac   || nhBiKhac || '';
    }

    return {
      dungThan:   dungThan,
      hyThan:     hyThan,
      kyThan:     kyThan,
      lyGiai: isVuong
        ? 'Nhật Chủ Thân Vượng — cần ' + dungThan + ' để điều hòa, tiết lộ khí vượng.'
        : 'Nhật Chủ Thân Nhược — cần ' + dungThan + ' để phù trợ, tăng cường sức mạnh.'
    };
  }

  /* ============================================================
     tinhThapThan — Tính Thập Thần cho mỗi Can Chi so với Nhật Chủ
     ============================================================ */
  var THAP_THAN_BANG = {
    /* [nhDay][nhTarget] → thập thần */
  };

  /* Thập Thần: tên theo quan hệ Ngũ Hành */
  function tinhThapThan(canNhom, canNgay) {
    var nhNgom = NGU_HANH_CAN[canNhom] || '';
    var nhNgay = NGU_HANH_CAN[canNgay] || '';
    var amDuongNhom = AM_DUONG_CAN[canNhom];
    var amDuongNgay = AM_DUONG_CAN[canNgay];
    var cungAmDuong = (amDuongNhom === amDuongNgay);

    if (nhNgom === nhNgay) {
      return cungAmDuong ? 'Tỷ Kiên' : 'Kiếp Tài';
    }
    if (TUONG_SINH[nhNgay] === nhNgom) {
      /* Nhật chủ sinh nhóm */
      return cungAmDuong ? 'Thực Thần' : 'Thương Quan';
    }
    if (TUONG_SINH[nhNgom] === nhNgay) {
      /* Nhóm sinh nhật chủ */
      return cungAmDuong ? 'Thiên Ấn' : 'Chính Ấn';
    }
    if (TUONG_KHAC[nhNgay] === nhNgom) {
      /* Nhật chủ khắc nhóm → Tài */
      return cungAmDuong ? 'Thiên Tài' : 'Chính Tài';
    }
    if (TUONG_KHAC[nhNgom] === nhNgay) {
      /* Nhóm khắc nhật chủ → Quan Sát */
      return cungAmDuong ? 'Thiên Quan' : 'Chính Quan';
    }
    return '—';
  }

  /* ============================================================
     phanTichDayDu — Phân tích toàn diện Tứ Trụ
     ============================================================ */
  function phanTichDayDu(params) {
    /* Tính 4 trụ */
    var tuTru = tinhTuTru(params);

    /* Ngũ Hành */
    var nguHanh = phanTichNguHanh(tuTru);

    /* Vượng/Nhược */
    var vuongNhuoc = xacDinhVuongNhuoc(tuTru, nguHanh);

    /* Dụng Thần */
    var dungThan = xacDinhDungThan(vuongNhuoc);

    /* Thập Thần cho mỗi Can */
    var canNgay = tuTru.ngay.can;
    var cacThan = {
      canNam:   tinhThapThan(tuTru.nam.can,   canNgay),
      canThang: tinhThapThan(tuTru.thang.can, canNgay),
      canGio:   tinhThapThan(tuTru.gio.can,   canNgay)
    };

    return {
      tuTru:      tuTru,
      nguHanh:    nguHanh,
      vuongNhuoc: vuongNhuoc,
      dungThan:   dungThan,
      cacThan:    cacThan,
      params:     params
    };
  }

  /* ============================================================
     Public API
     ============================================================ */
  return {
    tinhTuTru:      tinhTuTru,
    phanTichNguHanh: phanTichNguHanh,
    xacDinhVuongNhuoc: xacDinhVuongNhuoc,
    xacDinhDungThan: xacDinhDungThan,
    tinhThapThan:   tinhThapThan,
    phanTichDayDu:  phanTichDayDu
  };
})();

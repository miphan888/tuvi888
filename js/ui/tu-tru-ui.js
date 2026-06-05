// ══════════════════════════════════════════════════════
// TU-TRU-UI.JS — Giao diện Tứ Trụ Bát Tự
// Hiện kết quả đầy đủ KHÔNG cần AI
// AI chỉ là tính năng bổ sung
// ══════════════════════════════════════════════════════

var _tuTru = null;

// ─── COLORS NGŨ HÀNH ────────────────────────────────
var HANH_COLORS = {
  'Mộc': { color: '#2D6A00', bg: '#e8f5e0' },
  'Hỏa': { color: '#B80000', bg: '#fce8e8' },
  'Thổ': { color: '#7A5500', bg: '#fff3d0' },
  'Kim': { color: '#555555', bg: '#f0f0f0' },
  'Thủy': { color: '#004080', bg: '#e0f0ff' }
};

var THAP_THAN_TEN = [
  'Tỷ Kiên', 'Kiếp Tài', 'Thực Thần', 'Thương Quan', 'Thiên Tài',
  'Chính Tài', 'Thiên Quan', 'Chính Quan', 'Thiên Ấn', 'Chính Ấn'
];

var TUONG_SINH = { 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' };
var TUONG_KHAC = { 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc' };


// ══════════════════════════════════════════════════════
// KHỞI TẠO
// ══════════════════════════════════════════════════════

function initTuTru() {
  var fields = ['batu-day', 'batu-month', 'batu-year'];
  for (var i = 0; i < fields.length; i++) {
    var el = document.getElementById(fields[i]);
    if (el) {
      el.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') tuTruPhanTich();
      });
    }
  }
}


// ══════════════════════════════════════════════════════
// HÀM CHÍNH: PHÂN TÍCH
// ══════════════════════════════════════════════════════

function tuTruPhanTich() {
  var ten = document.getElementById('batu-ten').value.trim() || 'Chưa nhập';
  var day = parseInt(document.getElementById('batu-day').value);
  var month = parseInt(document.getElementById('batu-month').value);
  var year = parseInt(document.getElementById('batu-year').value);
  var gio = parseInt(document.getElementById('batu-gio').value);
  var tz = parseInt(document.getElementById('batu-tz').value);
  var gtEl = document.querySelector('input[name="batu-gt"]:checked');
  var gioiTinh = gtEl ? gtEl.value : 'nam';

  if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    alert('Vui lòng nhập đầy đủ ngày tháng năm sinh hợp lệ.');
    return;
  }

  try {
    var data = null;

    // ─── Gọi đúng tên hàm từ BatTuEngine ───
    if (typeof BatTuEngine !== 'undefined') {
      console.log('[TuTru] BatTuEngine keys:', Object.keys(BatTuEngine));

      if (typeof BatTuEngine.phanTichDayDu === 'function') {
        data = BatTuEngine.phanTichDayDu(day, month, year, gio, tz, gioiTinh);
      } else if (typeof BatTuEngine.tinhTuTru === 'function') {
        data = BatTuEngine.tinhTuTru(day, month, year, gio, tz);
      } else if (typeof BatTuEngine.phanTich === 'function') {
        data = BatTuEngine.phanTich(day, month, year, gio, tz, gioiTinh);
      } else if (typeof BatTuEngine.phanTichBatTu === 'function') {
        data = BatTuEngine.phanTichBatTu(day, month, year, gio, tz, gioiTinh);
      } else if (typeof BatTuEngine.tinhBatTu === 'function') {
        data = BatTuEngine.tinhBatTu(day, month, year, gio, tz);
      } else if (typeof BatTuEngine.calculate === 'function') {
        data = BatTuEngine.calculate(day, month, year, gio, tz);
      } else {
        // Thử method đầu tiên tìm thấy
        var methods = Object.keys(BatTuEngine);
        for (var mk = 0; mk < methods.length; mk++) {
          if (typeof BatTuEngine[methods[mk]] === 'function') {
            console.log('[TuTru] Trying:', methods[mk]);
            try {
              data = BatTuEngine[methods[mk]](day, month, year, gio, tz, gioiTinh);
              if (data) break;
            } catch(ee) { console.log('[TuTru] Failed:', methods[mk], ee.message); }
          }
        }
      }
    }

    // Thử hàm global
    if (!data && typeof phanTichBatTu === 'function') data = phanTichBatTu(day, month, year, gio, tz);
    if (!data && typeof tinhBatTu === 'function') data = tinhBatTu(day, month, year, gio, tz);
    if (!data && typeof tinhTuTru === 'function') data = tinhTuTru(day, month, year, gio, tz);

    console.log('[TuTru] Raw data:', data);

    // Fallback tự tính
    if (!data) {
      console.log('[TuTru] Engine không trả dữ liệu, dùng fallback tự tính');
      data = tuTruTuTinh(day, month, year, gio, tz);
    }

    if (!data) {
      alert('Không thể phân tích. Xem F12 Console.');
      return;
    }

    // ═══ CHUẨN HÓA DỮ LIỆU ═══
    var CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
    var NGU_HANH_CAN = ['Mộc','Mộc','Hỏa','Hỏa','Thổ','Thổ','Kim','Kim','Thủy','Thủy'];
    var NGU_HANH_CHI = ['Thủy','Thổ','Mộc','Mộc','Thổ','Hỏa','Hỏa','Thổ','Kim','Kim','Thổ','Thủy'];

    if (!data.tuTru) {
      var cN = 0, cT = 0, cNg = 0, cGi = 0;
      var zN = 0, zT = 0, zNg = 0, zGi = 0;

      if (data.canNam !== undefined) {
        cN = data.canNam; zN = data.chiNam;
        cT = data.canThang; zT = data.chiThang;
        cNg = data.canNgay; zNg = data.chiNgay;
        cGi = data.canGio || 0; zGi = data.chiGio || 0;
      } else if (data.nam && typeof data.nam === 'object') {
        cN = data.nam.can || 0; zN = data.nam.chi || 0;
        cT = (data.thang && data.thang.can) || 0; zT = (data.thang && data.thang.chi) || 0;
        cNg = (data.ngay && data.ngay.can) || 0; zNg = (data.ngay && data.ngay.chi) || 0;
        cGi = (data.gio && data.gio.can) || 0; zGi = (data.gio && data.gio.chi) || 0;
      } else if (data.yearPillar) {
        cN = data.yearPillar.can || 0; zN = data.yearPillar.chi || 0;
        cT = data.monthPillar ? data.monthPillar.can || 0 : 0;
        zT = data.monthPillar ? data.monthPillar.chi || 0 : 0;
        cNg = data.dayPillar ? data.dayPillar.can || 0 : 0;
        zNg = data.dayPillar ? data.dayPillar.chi || 0 : 0;
        cGi = data.hourPillar ? data.hourPillar.can || 0 : 0;
        zGi = data.hourPillar ? data.hourPillar.chi || 0 : 0;
      }

      // String → index
      if (typeof cN === 'string') cN = CAN.indexOf(cN);
      if (typeof zN === 'string') zN = CHI.indexOf(zN);
      if (typeof cT === 'string') cT = CAN.indexOf(cT);
      if (typeof zT === 'string') zT = CHI.indexOf(zT);
      if (typeof cNg === 'string') cNg = CAN.indexOf(cNg);
      if (typeof zNg === 'string') zNg = CHI.indexOf(zNg);
      if (typeof cGi === 'string') cGi = CAN.indexOf(cGi);
      if (typeof zGi === 'string') zGi = CHI.indexOf(zGi);

      cN = ((cN || 0) + 10) % 10; zN = ((zN || 0) + 12) % 12;
      cT = ((cT || 0) + 10) % 10; zT = ((zT || 0) + 12) % 12;
      cNg = ((cNg || 0) + 10) % 10; zNg = ((zNg || 0) + 12) % 12;
      cGi = ((cGi || 0) + 10) % 10; zGi = ((zGi || 0) + 12) % 12;

      var napAmFunc = (typeof getNapAmCanChi === 'function') ? getNapAmCanChi : null;
      var naNam = napAmFunc ? napAmFunc(cN, zN) || '' : '';
      var naThang = napAmFunc ? napAmFunc(cT, zT) || '' : '';
      var naNgay = napAmFunc ? napAmFunc(cNg, zNg) || '' : '';
      var naGio = napAmFunc ? napAmFunc(cGi, zGi) || '' : '';

      data.tuTru = {
        nam:   { can: cN, chi: zN, canStr: CAN[cN], chiStr: CHI[zN], hanh: NGU_HANH_CAN[cN], napAm: naNam },
        thang: { can: cT, chi: zT, canStr: CAN[cT], chiStr: CHI[zT], hanh: NGU_HANH_CAN[cT], napAm: naThang },
        ngay:  { can: cNg, chi: zNg, canStr: CAN[cNg], chiStr: CHI[zNg], hanh: NGU_HANH_CAN[cNg], napAm: naNgay },
        gio:   { can: cGi, chi: zGi, canStr: CAN[cGi], chiStr: CHI[zGi], hanh: NGU_HANH_CAN[cGi], napAm: naGio }
      };
    } else {
      var kk = ['nam', 'thang', 'ngay', 'gio'];
      for (var ki = 0; ki < kk.length; ki++) {
        var tr = data.tuTru[kk[ki]];
        if (!tr) continue;
        if (!tr.canStr && typeof tr.can === 'number') tr.canStr = CAN[tr.can];
        if (!tr.chiStr && typeof tr.chi === 'number') tr.chiStr = CHI[tr.chi];
        if (!tr.hanh && typeof tr.can === 'number') tr.hanh = NGU_HANH_CAN[tr.can];
        if (!tr.napAm && typeof tr.can === 'number' && typeof getNapAmCanChi === 'function') {
          tr.napAm = getNapAmCanChi(tr.can, tr.chi) || '';
        }
      }
    }

    if (!data.nhatChu) data.nhatChu = data.tuTru.ngay;

    if (!data.nguHanh) {
      var dem = { 'Kim': 0, 'Mộc': 0, 'Thủy': 0, 'Hỏa': 0, 'Thổ': 0 };
      var k4 = ['nam', 'thang', 'ngay', 'gio'];
      for (var di = 0; di < k4.length; di++) {
        var tru2 = data.tuTru[k4[di]];
        if (!tru2) continue;
        var hC = (typeof tru2.can === 'number') ? NGU_HANH_CAN[tru2.can] : tru2.hanh;
        var hZ = (typeof tru2.chi === 'number') ? NGU_HANH_CHI[tru2.chi] : '';
        if (hC && dem[hC] !== undefined) dem[hC]++;
        if (hZ && dem[hZ] !== undefined) dem[hZ]++;
      }
      data.nguHanh = dem;
    }

    // Dùng engine phân tích thêm nếu có
    if (typeof BatTuEngine !== 'undefined') {
      if (!data.vuongNhuoc && typeof BatTuEngine.xacDinhVuongNhuoc === 'function') {
        try { var vn = BatTuEngine.xacDinhVuongNhuoc(data); if (vn) data.vuongNhuoc = vn; } catch(e2) {}
      }
      if (!data.dungThanData && typeof BatTuEngine.xacDinhDungThan === 'function') {
        try { var dt2 = BatTuEngine.xacDinhDungThan(data); if (dt2) data.dungThanData = dt2; } catch(e3) {}
      }
      if (!data.thapThan && typeof BatTuEngine.tinhThapThan === 'function') {
        try { var tt2 = BatTuEngine.tinhThapThan(data); if (tt2) data.thapThan = tt2; } catch(e4) {}
      }
    }

    console.log('[TuTru] Chuẩn hóa xong:', data);

    data.ten = ten;
    data.gioiTinh = gioiTinh;
    data.ngaySinh = { day: day, month: month, year: year, gio: gio, tz: tz };
    _tuTru = data;

    renderTuTru();
    renderThapThan();
    renderNguHanh();
    renderSinhKhac();
    renderThanVuong();
    renderDungThan();
    renderLoiKhuyen();

    document.getElementById('batu-ho-ten').textContent = ten;
    document.getElementById('batu-result').style.display = '';
    document.getElementById('batu-tabs').style.display = '';
    tuTruTab('nguhanh');

  } catch (e) {
    console.error('[TuTru] Lỗi:', e);
    alert('Lỗi: ' + e.message + '\nXem F12 Console.');
  }
}


// ══════════════════════════════════════════════════════
// FALLBACK: TỰ TÍNH TỪ CAN-CHI
// ══════════════════════════════════════════════════════

function tuTruTuTinh(dd, mm, yy, gio, tz) {
  var CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
  var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
  var NGU_HANH_CAN = ['Mộc','Mộc','Hỏa','Hỏa','Thổ','Thổ','Kim','Kim','Thủy','Thủy'];
  var NGU_HANH_CHI = ['Thủy','Thổ','Mộc','Mộc','Thổ','Hỏa','Hỏa','Thổ','Kim','Kim','Thổ','Thủy'];

  // Tìm hàm chuyển âm lịch
  var lunarFunc = null;
  if (typeof convertSolar2Lunar === 'function') lunarFunc = convertSolar2Lunar;
  else if (typeof LunarEngine !== 'undefined' && typeof LunarEngine.solar2Lunar === 'function') lunarFunc = LunarEngine.solar2Lunar;
  else if (typeof LunarEngine !== 'undefined' && typeof LunarEngine.convertSolar2Lunar === 'function') lunarFunc = LunarEngine.convertSolar2Lunar;
  else if (typeof SolarToLunar === 'function') lunarFunc = SolarToLunar;

  var lunarMonth = mm;
  if (lunarFunc) {
    try {
      var lunar = lunarFunc(dd, mm, yy, tz || 7);
      if (lunar) {
        lunarMonth = Array.isArray(lunar) ? lunar[1] : (lunar.month || mm);
      }
    } catch(e) { console.log('[TuTru] Lunar error:', e); }
  }

  var canNam = (yy + 6) % 10;
  var chiNam = (yy + 8) % 12;
  var jd = tuTruJD(dd, mm, yy);
  var canNgay = (jd + 9) % 10;
  var chiNgay = (jd + 1) % 12;
  var canThang = (canNam * 2 + lunarMonth) % 10;
  var chiThang = (lunarMonth + 1) % 12;
  var canGio = 0, chiGio = 0;
  if (gio >= 0 && gio <= 11) {
    chiGio = gio;
    canGio = (canNgay * 2 + gio) % 10;
  }

  var napAmFunc = (typeof getNapAmCanChi === 'function') ? getNapAmCanChi : null;
  var naNam = napAmFunc ? napAmFunc(canNam, chiNam) || '' : '';
  var naThang = napAmFunc ? napAmFunc(canThang, chiThang) || '' : '';
  var naNgay = napAmFunc ? napAmFunc(canNgay, chiNgay) || '' : '';
  var naGio = (gio >= 0 && napAmFunc) ? napAmFunc(canGio, chiGio) || '' : '';

  return {
    tuTru: {
      nam:   { can: canNam, chi: chiNam, canStr: CAN[canNam], chiStr: CHI[chiNam], hanh: NGU_HANH_CAN[canNam], napAm: naNam },
      thang: { can: canThang, chi: chiThang, canStr: CAN[canThang], chiStr: CHI[chiThang], hanh: NGU_HANH_CAN[canThang], napAm: naThang },
      ngay:  { can: canNgay, chi: chiNgay, canStr: CAN[canNgay], chiStr: CHI[chiNgay], hanh: NGU_HANH_CAN[canNgay], napAm: naNgay },
      gio:   { can: canGio, chi: chiGio, canStr: CAN[canGio], chiStr: CHI[chiGio], hanh: NGU_HANH_CAN[canGio], napAm: naGio }
    },
    nhatChu: { can: canNgay, chi: chiNgay, canStr: CAN[canNgay], chiStr: CHI[chiNgay], hanh: NGU_HANH_CAN[canNgay] },
    nguHanh: tuTruDemNguHanh(canNam, chiNam, canThang, chiThang, canNgay, chiNgay, canGio, chiGio, NGU_HANH_CAN, NGU_HANH_CHI),
    thangSinh: lunarMonth
  };
}

function tuTruJD(dd, mm, yy) {
  var a = Math.floor((14 - mm) / 12);
  var y = yy + 4800 - a;
  var m = mm + 12 * a - 3;
  return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function tuTruDemNguHanh(cN, zN, cT, zT, cNg, zNg, cGi, zGi, NHC, NHCH) {
  var dem = { 'Kim': 0, 'Mộc': 0, 'Thủy': 0, 'Hỏa': 0, 'Thổ': 0 };
  var cans = [cN, cT, cNg, cGi];
  var chis = [zN, zT, zNg, zGi];
  for (var i = 0; i < 4; i++) {
    if (NHC[cans[i]]) dem[NHC[cans[i]]]++;
    if (NHCH[chis[i]]) dem[NHCH[chis[i]]]++;
  }
  return dem;
}// ══════════════════════════════════════════════════════
// RENDER 4 TRỤ
// ══════════════════════════════════════════════════════

function renderTuTru() {
  var wrap = document.getElementById('batu-4tru');
  if (!wrap || !_tuTru || !_tuTru.tuTru) return;

  var tru = _tuTru.tuTru;
  var labels = ['Trụ Năm', 'Trụ Tháng', 'Trụ Ngày', 'Trụ Giờ'];
  var keys = ['nam', 'thang', 'ngay', 'gio'];

  var html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">';

  for (var i = 0; i < 4; i++) {
    var t = tru[keys[i]];
    if (!t) continue;
    var canStr = t.canStr || '?';
    var chiStr = t.chiStr || '?';
    var hanh = t.hanh || '';
    var napAm = t.napAm || '';
    var isNC = (i === 2);
    var hc = HANH_COLORS[hanh] || { color: '#333', bg: '#f5f5f5' };

    html += '<div style="background:#fff;border:' + (isNC ? '2px solid var(--red)' : '1px solid var(--cream3)') + ';border-radius:6px;padding:14px;text-align:center">';
    html += '<div style="font-size:11px;color:var(--ink3);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:10px">' + labels[i] + (isNC ? ' ★ Nhật Chủ' : '') + '</div>';
    html += '<div style="font-family:Noto Serif,serif;font-size:22px;font-weight:700;color:var(--red);line-height:1.3">' + canStr + '</div>';
    html += '<div style="font-family:Noto Serif,serif;font-size:22px;font-weight:700;color:var(--red);line-height:1.3">' + chiStr + '</div>';
    html += '<div style="font-size:13px;color:' + hc.color + ';margin-top:8px;font-weight:600">' + hanh + '</div>';
    if (napAm) html += '<div style="font-size:11px;color:var(--ink3);margin-top:4px;font-style:italic">' + napAm + '</div>';
    html += '</div>';
  }
  html += '</div>';
  wrap.innerHTML = html;
}


// ══════════════════════════════════════════════════════
// RENDER THẬP THẦN
// ══════════════════════════════════════════════════════

function renderThapThan() {
  var wrap = document.getElementById('batu-thap-than');
  if (!wrap || !_tuTru || !_tuTru.tuTru) return;

  var tru = _tuTru.tuTru;
  var nhatChu = _tuTru.nhatChu || tru.ngay;
  if (!nhatChu) return;

  var ncCan = (typeof nhatChu.can === 'number') ? nhatChu.can : 0;
  var labels = ['Năm', 'Tháng', 'Ngày', 'Giờ'];
  var keys = ['nam', 'thang', 'ngay', 'gio'];

  var html = '<div style="font-size:13px;font-weight:600;color:var(--ink2);margin-bottom:8px">Thập Thần</div>';
  html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';

  for (var i = 0; i < 4; i++) {
    var t = tru[keys[i]];
    if (!t) continue;
    var tCan = (typeof t.can === 'number') ? t.can : 0;
    var ttIdx = (tCan - ncCan + 10) % 10;
    var ttName = THAP_THAN_TEN[ttIdx] || '—';
    if (i === 2) ttName = '★ Nhật Chủ';

    html += '<div style="text-align:center;font-size:12px;padding:8px;background:#fff;border:1px solid var(--cream3);border-radius:4px">';
    html += '<div style="color:var(--ink3);margin-bottom:4px">' + labels[i] + '</div>';
    html += '<div style="color:var(--red);font-weight:700;font-size:13px">' + ttName + '</div>';
    html += '</div>';
  }
  html += '</div>';
  wrap.innerHTML = html;
}


// ══════════════════════════════════════════════════════
// RENDER NGŨ HÀNH BARS
// ══════════════════════════════════════════════════════

function renderNguHanh() {
  var wrap = document.getElementById('batu-hanh-bars');
  var nxWrap = document.getElementById('batu-hanh-nhanxet');
  if (!wrap || !_tuTru) return;

  var nh = _tuTru.nguHanh;
  if (!nh) { wrap.innerHTML = ''; return; }

  var total = 0;
  var hanhs = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
  for (var i = 0; i < hanhs.length; i++) total += (nh[hanhs[i]] || 0);
  if (total === 0) total = 1;

  var vuong = '', thieu = '';
  var maxVal = 0, minVal = 99;

  var html = '';
  for (var j = 0; j < hanhs.length; j++) {
    var h = hanhs[j];
    var val = nh[h] || 0;
    var pct = Math.round(val / total * 100);
    var hc = HANH_COLORS[h] || { color: '#333', bg: '#eee' };

    if (val > maxVal) { maxVal = val; vuong = h; }
    if (val < minVal) { minVal = val; thieu = h; }

    html += '<div class="hanh-bar-row">';
    html += '<div class="hanh-bar-label" style="color:' + hc.color + '">' + h + '</div>';
    html += '<div class="hanh-bar-track"><div class="hanh-bar-fill" style="width:' + pct + '%;background:' + hc.color + '"></div></div>';
    html += '<div class="hanh-bar-count">' + val + '/8 (' + pct + '%)</div>';
    html += '</div>';
  }
  wrap.innerHTML = html;

  // Nhận xét
  if (nxWrap) {
    var nxHtml = '<div class="luan-giai-box"><h3>📊 Nhận Xét Ngũ Hành</h3><p>';
    nxHtml += '<strong style="color:' + (HANH_COLORS[vuong] || {}).color + '">' + vuong + '</strong> vượng nhất (' + maxVal + '/8). ';
    if (minVal === 0) {
      nxHtml += '<strong style="color:' + (HANH_COLORS[thieu] || {}).color + '">' + thieu + '</strong> hoàn toàn thiếu — cần bổ sung qua màu sắc, hướng, nghề nghiệp.';
    } else {
      nxHtml += '<strong style="color:' + (HANH_COLORS[thieu] || {}).color + '">' + thieu + '</strong> yếu nhất (' + minVal + '/8).';
    }

    // Nhật Chủ
    var ncHanh = (_tuTru.nhatChu && _tuTru.nhatChu.hanh) ? _tuTru.nhatChu.hanh : '';
    if (ncHanh) {
      var ncVal = nh[ncHanh] || 0;
      nxHtml += '<br>Nhật Chủ thuộc <strong style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + ncHanh + '</strong> (' + ncVal + '/8). ';
      if (ncVal >= 3) {
        nxHtml += 'Nhật Chủ được hỗ trợ tốt.';
      } else if (ncVal <= 1) {
        nxHtml += 'Nhật Chủ yếu, cần bổ sung.';
      }
    }

    nxHtml += '</p></div>';
    nxWrap.innerHTML = nxHtml;
  }
}


// ══════════════════════════════════════════════════════
// RENDER TƯƠNG SINH TƯƠNG KHẮC
// ══════════════════════════════════════════════════════

function renderSinhKhac() {
  var wrap = document.getElementById('batu-sinh-khac');
  if (!wrap) return;

  var html = '<div style="font-size:13px;color:var(--ink2);line-height:2">';

  // Tương Sinh
  html += '<p><strong>Tương Sinh:</strong></p><p>';
  var hanhs = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];
  for (var i = 0; i < hanhs.length; i++) {
    var h = hanhs[i];
    var hc = HANH_COLORS[h] || {};
    html += '<strong style="color:' + hc.color + '">' + h + '</strong>';
    html += ' → sinh → ';
  }
  html += '<strong style="color:' + HANH_COLORS['Mộc'].color + '">Mộc</strong>';
  html += '</p>';

  // Tương Khắc
  html += '<p style="margin-top:8px"><strong>Tương Khắc:</strong></p><p>';
  var khac = [['Mộc','Thổ'],['Thổ','Thủy'],['Thủy','Hỏa'],['Hỏa','Kim'],['Kim','Mộc']];
  for (var k = 0; k < khac.length; k++) {
    var a = khac[k][0], b = khac[k][1];
    html += '<strong style="color:' + HANH_COLORS[a].color + '">' + a + '</strong>';
    html += ' ⚔ ';
    html += '<strong style="color:' + HANH_COLORS[b].color + '">' + b + '</strong>';
    if (k < 4) html += ' · ';
  }
  html += '</p></div>';

  // Nhật Chủ info
  if (_tuTru && _tuTru.nhatChu) {
    var ncHanh = _tuTru.nhatChu.hanh || '';
    if (ncHanh) {
      var ncColor = (HANH_COLORS[ncHanh] || {}).color || '#333';
      html += '<div style="margin-top:12px;padding:10px 14px;background:var(--cream);border-radius:6px;font-size:13px">';
      html += '🔑 Nhật Chủ <strong style="color:' + ncColor + '">' + (_tuTru.nhatChu.canStr || '') + ' ' + ncHanh + '</strong>';
      html += ' → được <strong style="color:' + (HANH_COLORS[TUONG_SINH[ncHanh]] || {}).color + '">' + (TUONG_SINH[ncHanh] || '') + '</strong> sinh';
      html += ', khắc <strong style="color:' + (HANH_COLORS[TUONG_KHAC[ncHanh]] || {}).color + '">' + (TUONG_KHAC[ncHanh] || '') + '</strong>';

      // Hành nào sinh Nhật Chủ
      var sinhNC = '';
      for (var sk in TUONG_SINH) { if (TUONG_SINH[sk] === ncHanh) { sinhNC = sk; break; } }
      if (sinhNC) {
        html += ', được <strong style="color:' + (HANH_COLORS[sinhNC] || {}).color + '">' + sinhNC + '</strong> sinh';
      }
      html += '</div>';
    }
  }

  wrap.innerHTML = html;
}


// ══════════════════════════════════════════════════════
// RENDER THÂN VƯỢNG / NHƯỢC
// ══════════════════════════════════════════════════════

function renderThanVuong() {
  var wrap = document.getElementById('batu-than-vuong');
  if (!wrap || !_tuTru) return;

  var tru = _tuTru.tuTru;
  var nc = _tuTru.nhatChu || tru.ngay;
  if (!nc) return;

  var ncHanh = nc.hanh || '';
  var nh = _tuTru.nguHanh || {};

  // Hành sinh Nhật Chủ
  var sinhNC = '';
  for (var k in TUONG_SINH) { if (TUONG_SINH[k] === ncHanh) { sinhNC = k; break; } }

  // Đếm hỗ trợ vs khắc chế
  var hoTro = (nh[ncHanh] || 0) + (nh[sinhNC] || 0);
  var khacChe = 0;
  for (var h in nh) { if (h !== ncHanh && h !== sinhNC) khacChe += nh[h]; }

  var isVuong = hoTro >= khacChe;
  var ketLuan = isVuong ? 'THÂN VƯỢNG' : 'THÂN NHƯỢC';

  _tuTru.thanVuong = isVuong;

  var html = '<div class="result-grid" style="grid-template-columns:1fr 1fr;margin-top:0">';

  // Ô Nhật Chủ
  html += '<div class="result-box highlight">';
  html += '<div class="rb-label">Nhật Chủ</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + (nc.canStr || '') + ' ' + (nc.chiStr || '') + '</div>';
  html += '<div class="rb-sub">Hành ' + ncHanh + '</div>';
  html += '</div>';

  // Ô Kết Luận
  html += '<div class="result-box highlight">';
  html += '<div class="rb-label">Kết Luận</div>';
  html += '<div class="rb-value" style="color:' + (isVuong ? '#1A5C00' : '#B80000') + '">' + ketLuan + '</div>';
  html += '<div class="rb-sub">Hỗ trợ: ' + hoTro + ' · Khắc chế: ' + khacChe + '</div>';
  html += '</div>';
  html += '</div>';

  // Chi tiết
  html += '<div class="luan-giai-box" style="margin-top:14px"><h3>📋 Phân Tích Chi Tiết</h3>';
  html += '<p style="line-height:1.9">';
  html += 'Nhật Chủ <strong>' + (nc.canStr || '') + '</strong> thuộc hành <strong style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + ncHanh + '</strong>.<br>';
  html += '• Hành cùng loại (' + ncHanh + '): <strong>' + (nh[ncHanh] || 0) + '</strong> điểm<br>';
  html += '• Hành sinh Nhật Chủ (' + sinhNC + ' sinh ' + ncHanh + '): <strong>' + (nh[sinhNC] || 0) + '</strong> điểm<br>';
  html += '• Tổng lực hỗ trợ: <strong style="color:#1A5C00">' + hoTro + '</strong>/8<br>';
  html += '• Tổng lực khắc chế: <strong style="color:#B80000">' + khacChe + '</strong>/8<br>';
  html += '<br>';

  if (isVuong) {
    html += '→ Nhật Chủ được hỗ trợ <strong>nhiều hơn</strong> bị khắc chế → <strong style="color:#1A5C00">Thân Vượng</strong>.<br>';
    html += '→ Cần hành <strong>khắc chế / tiết chế</strong> (Thực Thương, Tài, Quan Sát) để cân bằng.<br>';
    html += '→ Người thân vượng thường mạnh mẽ, tự chủ, nhưng cần biết kiểm soát.';
  } else {
    html += '→ Nhật Chủ bị khắc chế <strong>nhiều hơn</strong> được hỗ trợ → <strong style="color:#B80000">Thân Nhược</strong>.<br>';
    html += '→ Cần hành <strong>sinh trợ</strong> (Ấn Thụ, Tỷ Kiếp) để bổ sung sức mạnh.<br>';
    html += '→ Người thân nhược cần dựa vào quý nhân, môi trường tốt để phát triển.';
  }

  html += '</p></div>';
  wrap.innerHTML = html;
}


// ══════════════════════════════════════════════════════
// RENDER DỤNG THẦN
// ══════════════════════════════════════════════════════

function renderDungThan() {
  var wrap = document.getElementById('batu-dung-than');
  if (!wrap || !_tuTru) return;

  var nc = _tuTru.nhatChu || (_tuTru.tuTru ? _tuTru.tuTru.ngay : null);
  if (!nc) return;

  var ncHanh = nc.hanh || '';
  var isVuong = _tuTru.thanVuong;

  var dungThan = '', hyThan = '', kyThan = '';

  if (isVuong) {
        // Vượng → dụng thần khắc/tiết
    dungThan = TUONG_KHAC[ncHanh] || '';
    // Hỷ thần = hành sinh dụng thần
    for (var ks in TUONG_SINH) { if (TUONG_SINH[ks] === dungThan) { hyThan = ks; break; } }
    // Kỵ thần = hành sinh nhật chủ
    for (var ks2 in TUONG_SINH) { if (TUONG_SINH[ks2] === ncHanh) { kyThan = ks2; break; } }
  } else {
    // Nhược → dụng thần sinh trợ
    for (var ks3 in TUONG_SINH) { if (TUONG_SINH[ks3] === ncHanh) { dungThan = ks3; break; } }
    hyThan = ncHanh;
    kyThan = TUONG_KHAC[ncHanh] || '';
  }

  _tuTru.dungThan = dungThan;
  _tuTru.hyThan = hyThan;
  _tuTru.kyThan = kyThan;

  var hcDT = HANH_COLORS[dungThan] || { color: '#333' };
  var hcHT = HANH_COLORS[hyThan] || { color: '#333' };
  var hcKT = HANH_COLORS[kyThan] || { color: '#333' };

  var html = '<div class="result-grid" style="grid-template-columns:repeat(3,1fr);margin-top:0">';
  html += '<div class="result-box highlight"><div class="rb-label">Dụng Thần</div>';
  html += '<div class="rb-value" style="color:' + hcDT.color + '">' + dungThan + '</div>';
  html += '<div class="rb-sub">Hành cần bổ sung</div></div>';
  html += '<div class="result-box"><div class="rb-label">Hỷ Thần</div>';
  html += '<div class="rb-value" style="color:' + hcHT.color + '">' + hyThan + '</div>';
  html += '<div class="rb-sub">Hành hỗ trợ</div></div>';
  html += '<div class="result-box"><div class="rb-label">Kỵ Thần</div>';
  html += '<div class="rb-value" style="color:' + hcKT.color + '">' + kyThan + '</div>';
  html += '<div class="rb-sub">Hành cần tránh</div></div>';
  html += '</div>';

  // Giải thích
  html += '<div class="luan-giai-box" style="margin-top:14px"><h3>📋 Giải Thích</h3><p>';
  if (isVuong) {
    html += 'Thân Vượng → cần hành <strong style="color:' + hcDT.color + '">' + dungThan + '</strong> để khắc chế/tiết chế Nhật Chủ. ';
    html += 'Hành <strong style="color:' + hcHT.color + '">' + hyThan + '</strong> sinh ' + dungThan + ' nên cũng tốt. ';
    html += 'Tránh hành <strong style="color:' + hcKT.color + '">' + kyThan + '</strong> vì sinh thêm Nhật Chủ.';
  } else {
    html += 'Thân Nhược → cần hành <strong style="color:' + hcDT.color + '">' + dungThan + '</strong> để sinh trợ Nhật Chủ. ';
    html += 'Hành <strong style="color:' + hcHT.color + '">' + hyThan + '</strong> (cùng Nhật Chủ) cũng hỗ trợ. ';
    html += 'Tránh hành <strong style="color:' + hcKT.color + '">' + kyThan + '</strong> vì khắc chế Nhật Chủ thêm.';
  }
  html += '</p></div>';
  wrap.innerHTML = html;
}


// ══════════════════════════════════════════════════════
// RENDER LỜI KHUYÊN
// ══════════════════════════════════════════════════════

function renderLoiKhuyen() {
  var wrap = document.getElementById('batu-loi-khuyen');
  if (!wrap || !_tuTru || !_tuTru.dungThan) return;

  var dt = _tuTru.dungThan;
  var ht = _tuTru.hyThan || '';
  var kt = _tuTru.kyThan || '';
  var ncHanh = (_tuTru.nhatChu && _tuTru.nhatChu.hanh) ? _tuTru.nhatChu.hanh : '';

  var hcDT = HANH_COLORS[dt] || { color: '#333' };
  var hcHT = HANH_COLORS[ht] || { color: '#333' };
  var hcKT = HANH_COLORS[kt] || { color: '#333' };

  var MAU = { 'Mộc':'Xanh lá, xanh lục, xanh ngọc', 'Hỏa':'Đỏ, hồng, cam, tím', 'Thổ':'Vàng, nâu, be, kem', 'Kim':'Trắng, bạc, xám, ánh kim', 'Thủy':'Đen, xanh đậm, xanh dương' };
  var HUONG = { 'Mộc':'Đông, Đông Nam', 'Hỏa':'Nam', 'Thổ':'Trung tâm, Đông Bắc, Tây Nam', 'Kim':'Tây, Tây Bắc', 'Thủy':'Bắc' };
  var NGHE = { 'Mộc':'Giáo dục, xuất bản, thời trang, nông nghiệp, gỗ nội thất, hoa cây cảnh', 'Hỏa':'Năng lượng, nhà hàng, giải trí, truyền thông, điện tử, quảng cáo', 'Thổ':'Bất động sản, xây dựng, nông sản, gốm sứ, khoáng sản, tư vấn', 'Kim':'Cơ khí, ngân hàng, tài chính, kim loại, ô tô, công nghệ, luật', 'Thủy':'Vận tải, du lịch, thủy sản, logistics, xuất nhập khẩu, ngoại giao' };
  var SO = { 'Mộc':'3, 8', 'Hỏa':'2, 7', 'Thổ':'5, 0 (10)', 'Kim':'4, 9', 'Thủy':'1, 6' };
  var VAT = { 'Mộc':'Cây xanh, đồ gỗ, tranh phong cảnh', 'Hỏa':'Đèn pha lê, nến, đồ đỏ, đá ruby', 'Thổ':'Đá phong thủy, gốm sứ, thạch anh vàng', 'Kim':'Chuông gió kim loại, đồng hồ, thạch anh trắng', 'Thủy':'Bể cá, thác nước mini, đá obsidian' };

  var html = '';

  // Tổng quan
  html += '<div class="luan-giai-box" style="margin-bottom:16px"><h3>📋 Tổng Quan</h3><p>';
  html += 'Nhật Chủ <strong style="color:' + (HANH_COLORS[ncHanh]||{}).color + '">' + ncHanh + '</strong>, ';
  html += 'Thân <strong>' + (_tuTru.thanVuong ? 'Vượng' : 'Nhược') + '</strong>. ';
  html += 'Dụng Thần <strong style="color:' + hcDT.color + '">' + dt + '</strong> — ';
  html += _tuTru.thanVuong ? 'cần khắc chế để cân bằng.' : 'cần sinh trợ để bổ sung.';
  html += '</p></div>';

  // Grid
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';

  html += '<div class="sk-box"><div class="sk-title">🎨 Màu Sắc Nên Dùng</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">✓ ' + dt + ':</strong> ' + (MAU[dt]||'') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">✓ ' + ht + ':</strong> ' + (MAU[ht]||'') + '</div>';
  html += '<div class="sk-item" style="color:#c00"><strong>✗ Tránh ' + kt + ':</strong> ' + (MAU[kt]||'') + '</div></div>';

  html += '<div class="sk-box"><div class="sk-title">🧭 Hướng Hợp</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">Tốt nhất:</strong> ' + (HUONG[dt]||'') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">Tốt:</strong> ' + (HUONG[ht]||'') + '</div>';
  html += '<div class="sk-item" style="color:#c00"><strong>Tránh:</strong> ' + (HUONG[kt]||'') + '</div></div>';

  html += '<div class="sk-box"><div class="sk-title">💼 Nghề Nghiệp Hợp</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">' + dt + ':</strong> ' + (NGHE[dt]||'') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">' + ht + ':</strong> ' + (NGHE[ht]||'') + '</div></div>';

  html += '<div class="sk-box"><div class="sk-title">🔢 Số Hợp</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">Tốt nhất (' + dt + '):</strong> ' + (SO[dt]||'') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">Tốt (' + ht + '):</strong> ' + (SO[ht]||'') + '</div>';
  html += '<div class="sk-item" style="color:#c00"><strong>Tránh (' + kt + '):</strong> ' + (SO[kt]||'') + '</div></div>';

  html += '<div class="sk-box"><div class="sk-title">🏺 Vật Phẩm Phong Thủy</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">' + dt + ':</strong> ' + (VAT[dt]||'') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">' + ht + ':</strong> ' + (VAT[ht]||'') + '</div></div>';

  html += '<div class="sk-box"><div class="sk-title">⚠️ Điều Cần Tránh</div>';
  html += '<div class="sk-item" style="color:#c00">Tránh hành <strong>' + kt + '</strong></div>';
  html += '<div class="sk-item" style="color:#c00">Tránh màu: ' + (MAU[kt]||'') + '</div>';
  html += '<div class="sk-item" style="color:#c00">Tránh hướng: ' + (HUONG[kt]||'') + '</div></div>';

  html += '</div>';
  wrap.innerHTML = html;
}


// ══════════════════════════════════════════════════════
// CHUYỂN TAB
// ══════════════════════════════════════════════════════

function tuTruTab(name) {
  var tabs = ['nguhanh', 'thanvuong', 'dungthan', 'ailuan'];
  for (var i = 0; i < tabs.length; i++) {
    var el = document.getElementById('tab-' + tabs[i]);
    if (el) el.style.display = (tabs[i] === name) ? '' : 'none';
  }
  var btns = document.querySelectorAll('#batu-tabs .sub-tab');
  for (var j = 0; j < btns.length; j++) {
    btns[j].className = 'sub-tab' + (j === tabs.indexOf(name) ? ' active' : '');
  }
}


// ══════════════════════════════════════════════════════
// GỌI AI
// ══════════════════════════════════════════════════════

function tuTruGoiAI() {
  if (!_tuTru) { alert('Vui lòng phân tích trước.'); return; }

  var loading = document.getElementById('batu-ai-loading');
  var result = document.getElementById('batu-ai-result');
  if (loading) loading.style.display = '';
  if (result) result.style.display = 'none';

  var tru = _tuTru.tuTru;
  var msg = 'Phân tích Tứ Trụ Bát Tự cho ' + _tuTru.ten + ' (' + _tuTru.gioiTinh + '):\n';
  msg += 'Trụ Năm: ' + tru.nam.canStr + ' ' + tru.nam.chiStr + ' (' + tru.nam.hanh + ')\n';
  msg += 'Trụ Tháng: ' + tru.thang.canStr + ' ' + tru.thang.chiStr + ' (' + tru.thang.hanh + ')\n';
  msg += 'Trụ Ngày: ' + tru.ngay.canStr + ' ' + tru.ngay.chiStr + ' (' + tru.ngay.hanh + ') — Nhật Chủ\n';
  if (tru.gio) msg += 'Trụ Giờ: ' + tru.gio.canStr + ' ' + tru.gio.chiStr + ' (' + tru.gio.hanh + ')\n';
  msg += 'Thân: ' + (_tuTru.thanVuong ? 'Vượng' : 'Nhược') + '\n';
  msg += 'Dụng Thần: ' + (_tuTru.dungThan || '') + '\n';

  if (typeof AIService === 'undefined' || typeof AIService.ask !== 'function') {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><p>⚠️ AI chưa sẵn sàng. Kết quả phân tích cục bộ phía trên vẫn đầy đủ.</p></div>';
    }
    return;
  }

  var sys = 'Bạn là chuyên gia Tứ Trụ Bát Tự. Phân tích: 1) Nhật Chủ vượng/nhược tại sao, 2) Dụng thần giải thích, 3) Sự nghiệp tài chính sức khỏe tình cảm, 4) Màu sắc hướng nghề hợp. Tiếng Việt 250-400 từ.';

  AIService.ask(sys, msg).then(function(text) {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><h3>🤖 AI Luận Đoán</h3><p>' + text.replace(/\n/g, '<br>') + '</p></div>';
    }
  }).catch(function(err) {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><p>⚠️ ' + (err.message || 'AI tạm bận') + '. Kết quả cục bộ phía trên vẫn đầy đủ.</p></div>';
    }
  });
}
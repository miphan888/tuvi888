/* ============================================================
   lich-am-ui.js — Module UI cho trang Lịch Âm Dương
   Lịch Việt Nam 888
   Export hàm initLichAm() được gọi bởi app.js
   Phụ thuộc: lunar-engine.js, can-chi-engine.js,
              can-chi.js, tiet-khi.js, lich-am-ai.js
   ============================================================ */

/* ---- Trạng thái hiện tại của calendar ---- */
var _laCalMonth = null;  /* Tháng đang hiển thị (1-12) */
var _laCalYear  = null;  /* Năm đang hiển thị */
var _laSelected = null;  /* Ngày đang chọn { dd, mm, yyyy } */
var _laThongTin = null;  /* Thông tin ngày đã tra cứu */
var _laTz       = 7;     /* Múi giờ mặc định UTC+7 */

/* ============================================================
   initLichAm — Hàm khởi tạo, app.js gọi sau khi inject HTML
   ============================================================ */
function initLichAm() {
  var now = new Date();

  /* Điền mặc định ngày hôm nay vào form */
  var ddEl = document.getElementById('la-ngay');
  var mmEl = document.getElementById('la-thang');
  var yyEl = document.getElementById('la-nam');
  if (ddEl) ddEl.value = now.getDate();
  if (mmEl) mmEl.value = now.getMonth() + 1;
  if (yyEl) yyEl.value = now.getFullYear();

  /* Khởi tạo calendar tháng hiện tại */
  _laCalMonth = now.getMonth() + 1;
  _laCalYear  = now.getFullYear();
  _laRenderCalendar(_laCalMonth, _laCalYear);

  /* Tự động tra hôm nay */
  lichAmTraCuu();
}

/* ============================================================
   lichAmTraCuu — Tra cứu ngày theo form input
   (onclick inline trong lich-am.html)
   ============================================================ */
function lichAmTraCuu() {
  var dd   = parseInt(getInputVal('la-ngay'),  10);
  var mm   = parseInt(getInputVal('la-thang'), 10);
  var yyyy = parseInt(getInputVal('la-nam'),   10);

  /* Validate */
  if (!dd || !mm || !yyyy) {
    showToast('Vui lòng nhập đầy đủ ngày, tháng, năm.', 'error');
    return;
  }
  if (dd < 1 || dd > 31 || mm < 1 || mm > 12) {
    showToast('Ngày hoặc tháng không hợp lệ.', 'error');
    return;
  }
  if (yyyy < 1900 || yyyy > 2100) {
    showToast('Năm phải từ 1900 đến 2100.', 'error');
    return;
  }

  /* Kiểm tra ngày tồn tại */
  var testDate = new Date(yyyy, mm - 1, dd);
  if (testDate.getMonth() !== mm - 1) {
    showToast('Ngày ' + dd + '/' + mm + '/' + yyyy + ' không tồn tại.', 'error');
    return;
  }

  /* Gọi engine phân tích */
  var thongTin;
  try {
    thongTin = CanChiEngine.phanTichNgay(dd, mm, yyyy, _laTz);
  } catch (e) {
    showToast('Lỗi khi tính toán lịch: ' + e.message, 'error');
    return;
  }

  _laThongTin = thongTin;
  _laSelected = { dd: dd, mm: mm, yyyy: yyyy };

  /* Hiển thị kết quả */
  _laHienThiKetQua(thongTin);

  /* Cập nhật calendar về tháng được tra */
  _laCalMonth = mm;
  _laCalYear  = yyyy;
  _laRenderCalendar(_laCalMonth, _laCalYear);

  /* Tự động gọi AI luận giải */
  var aiBox = document.getElementById('la-ai-container');
  if (aiBox) {
    showEl('la-ai-section');
    LichAmAI.luanGiai(thongTin, aiBox);
  }
}

/* ============================================================
   lichAmLuanGiaiLai — Thử lại AI (hàm global cho onclick)
   ============================================================ */
function lichAmLuanGiaiLai() {
  if (!_laThongTin) return;
  var aiBox = document.getElementById('la-ai-container');
  if (aiBox) {
    LichAmAI.luanGiai(_laThongTin, aiBox);
  }
}

/* ============================================================
   _laHienThiKetQua — Render bảng kết quả tra cứu
   ============================================================ */
function _laHienThiKetQua(tt) {
  var kq = document.getElementById('la-ket-qua');
  if (!kq) return;

  var am   = tt.am;
  var amStr = _laFormatAm(am);

  /* Build HTML kết quả */
  var html = '';
  html += '<div class="la-result-grid">';

  /* Thẻ ngày âm lịch — to, nổi bật */
  html += '<div class="la-result-main">';
  html += '  <div class="la-result-so">' + am.day + '</div>';
  html += '  <div class="la-result-am-label">' + amStr + '</div>';
  html += '  <div class="la-result-thu">' + tt.thu + ' — ' + _pad(tt.duong.dd) + '/' + _pad(tt.duong.mm) + '/' + tt.duong.yyyy + '</div>';
  html += '</div>';

  /* Cột thông tin chi tiết */
  html += '<div class="la-result-detail">';

  /* Can Chi */
  html += '<div class="la-info-group">';
  html += '  <div class="la-info-label">Can Chi Ngày</div>';
  html += '  <div class="la-info-value la-cc-badge">' + tt.ccNgay.can + ' ' + tt.ccNgay.chi + '</div>';
  html += '</div>';

  html += '<div class="la-info-group">';
  html += '  <div class="la-info-label">Can Chi Tháng</div>';
  html += '  <div class="la-info-value la-cc-badge">' + tt.ccThang.can + ' ' + tt.ccThang.chi + '</div>';
  html += '</div>';

  html += '<div class="la-info-group">';
  html += '  <div class="la-info-label">Can Chi Năm</div>';
  html += '  <div class="la-info-value la-cc-badge">' + tt.ccNam.can + ' ' + tt.ccNam.chi + '</div>';
  html += '</div>';

  html += '<div class="la-info-group">';
  html += '  <div class="la-info-label">Tiết Khí</div>';
  html += '  <div class="la-info-value">' + (tt.tietKhi ? tt.tietKhi.ten : '—') + '</div>';
  html += '</div>';

  html += '<div class="la-info-group">';
  html += '  <div class="la-info-label">Thập Nhị Trực</div>';
  html += '  <div class="la-info-value la-truc-badge">' + tt.truc + '</div>';
  html += '</div>';

  html += '</div>'; /* /.la-result-detail */

  html += '</div>'; /* /.la-result-grid */

  /* Giờ Hoàng Đạo / Hắc Đạo */
  html += '<div class="la-gio-section">';
  html += '<h4 class="la-gio-title">🕐 12 Giờ Hoàng Đạo — Hắc Đạo</h4>';
  html += '<div class="la-gio-grid">';
  var dsg = tt.danhSachGio || [];
  for (var i = 0; i < dsg.length; i++) {
    var g = dsg[i];
    var cls = g.good ? 'la-gio-item la-gio-good' : 'la-gio-item la-gio-bad';
    html += '<div class="' + cls + '">';
    html += '  <div class="la-gio-chi">' + g.chi + '</div>';
    html += '  <div class="la-gio-range">' + _pad(g.from) + 'h–' + _pad(g.to) + 'h</div>';
    html += '  <div class="la-gio-badge ' + (g.good ? 'la-badge-good' : 'la-badge-bad') + '">';
    html += (g.good ? '✦ Hoàng Đạo' : '✦ Hắc Đạo');
    html += '  </div>';
    html += '</div>';
  }
  html += '</div></div>';

  kq.innerHTML = html;
  showEl('la-ket-qua');
}

/* ============================================================
   _laRenderCalendar — Vẽ calendar grid tháng mm/yyyy
   ============================================================ */
function _laRenderCalendar(mm, yyyy) {
  var calEl = document.getElementById('la-calendar');
  if (!calEl) return;

  /* Cập nhật tiêu đề tháng */
  var titleEl = document.getElementById('la-cal-title');
  if (titleEl) titleEl.textContent = 'Tháng ' + mm + ' / ' + yyyy;

  var now = new Date();
  var todayD = now.getDate();
  var todayM = now.getMonth() + 1;
  var todayY = now.getFullYear();

  /* Lấy danh sách ngày */
  var days;
  try {
    days = LunarEngine.getMonthCalendar(mm, yyyy, _laTz);
  } catch (e) {
    calEl.innerHTML = '<p class="text-center text-ink3">Không thể tải dữ liệu calendar.</p>';
    return;
  }

  /* Build HTML */
  var html = '';

  /* Header thứ */
  var headers = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  html += '<div class="la-cal-header">';
  for (var h = 0; h < headers.length; h++) {
    var isWeekend = (h === 0 || h === 6);
    html += '<div class="la-cal-weekday' + (isWeekend ? ' la-cal-weekend' : '') + '">' + headers[h] + '</div>';
  }
  html += '</div>';

  /* Grid ngày */
  html += '<div class="la-cal-grid">';
  for (var i = 0; i < days.length; i++) {
    var day    = days[i];
    var isToday   = (!day.otherMonth && day.solar.d === todayD && day.solar.m === todayM && day.solar.y === todayY);
    var isSelected = (_laSelected &&
                      day.solar.d === _laSelected.dd &&
                      day.solar.m === _laSelected.mm &&
                      day.solar.y === _laSelected.yyyy);
    var isWeekendDay = (i % 7 === 0 || i % 7 === 6);

    var cls = 'la-cal-day';
    if (day.otherMonth) cls += ' la-cal-other';
    if (isToday)        cls += ' la-cal-today';
    if (isSelected)     cls += ' la-cal-selected';
    if (isWeekendDay)   cls += ' la-cal-weekend-day';

    /* Data attribute để click */
    var dataAttr = 'data-d="' + day.solar.d + '" data-m="' + day.solar.m + '" data-y="' + day.solar.y + '"';

    /* Nhãn âm nhỏ */
    var amLabel = day.lunar.day === 1
      ? day.lunar.day + '/' + day.lunar.month + (day.lunar.leap ? '(n)' : '')
      : String(day.lunar.day);

    html += '<div class="' + cls + '" ' + dataAttr + ' onclick="_laClickDay(this)">';
    html += '  <span class="la-cal-solar">' + day.solar.d + '</span>';
    html += '  <span class="la-cal-lunar">' + amLabel + '</span>';
    html += '</div>';
  }
  html += '</div>';

  calEl.innerHTML = html;
}

/* ============================================================
   _laClickDay — Xử lý click vào ô ngày trên calendar
   ============================================================ */
function _laClickDay(el) {
  var dd   = parseInt(el.getAttribute('data-d'), 10);
  var mm   = parseInt(el.getAttribute('data-m'), 10);
  var yyyy = parseInt(el.getAttribute('data-y'), 10);

  /* Cập nhật form */
  var ddEl = document.getElementById('la-ngay');
  var mmEl = document.getElementById('la-thang');
  var yyEl = document.getElementById('la-nam');
  if (ddEl) ddEl.value = dd;
  if (mmEl) mmEl.value = mm;
  if (yyEl) yyEl.value = yyyy;

  /* Tra cứu ngày đó */
  lichAmTraCuu();
}

/* ============================================================
   lichAmPrevMonth / lichAmNextMonth — Chuyển tháng calendar
   ============================================================ */
function lichAmPrevMonth() {
  _laCalMonth--;
  if (_laCalMonth < 1) {
    _laCalMonth = 12;
    _laCalYear--;
  }
  _laRenderCalendar(_laCalMonth, _laCalYear);
}

function lichAmNextMonth() {
  _laCalMonth++;
  if (_laCalMonth > 12) {
    _laCalMonth = 1;
    _laCalYear++;
  }
  _laRenderCalendar(_laCalMonth, _laCalYear);
}

/* ============================================================
   Tiện ích nội bộ
   ============================================================ */

/* ---- Pad số ---- */
function _pad(n) {
  return n < 10 ? '0' + n : String(n);
}

/* ---- Format chuỗi âm lịch ---- */
function _laFormatAm(am) {
  var s = 'Tháng ' + am.month;
  if (am.leap) s += ' nhuận';
  s += ' năm ' + am.year;
  return s;
}

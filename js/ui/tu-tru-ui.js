/* ============================================================
   tu-tru-ui.js — Module UI cho trang Tứ Trụ Bát Tự
   Lịch Việt Nam 888
   Export hàm initTuTru() được gọi bởi app.js
   Phụ thuộc: bat-tu-engine.js, tu-tru-ai.js, can-chi.js
   ============================================================ */

/* ---- Lưu kết quả hiện tại ---- */
var _ttKetQuaHienTai = null;

/* ============================================================
   initTuTru — Hàm khởi tạo, app.js gọi sau khi inject HTML
   ============================================================ */
function initTuTru() {
  /* Điền năm mặc định */
  var namEl = document.getElementById('tt-nam');
  if (namEl && !namEl.value) namEl.value = new Date().getFullYear() - 30;

  /* Bind tab switching */
  _ttBindTabs();

  /* Focus trường đầu tiên */
  var hoTenEl = document.getElementById('tt-ho-ten');
  if (hoTenEl) setTimeout(function() { hoTenEl.focus(); }, 100);
}

/* ============================================================
   tuTruPhanTich — Được gọi khi bấm nút "Phân Tích"
   ============================================================ */
function tuTruPhanTich() {
  /* Đọc form */
  var hoTen    = getInputVal('tt-ho-ten');
  var gioiTinh = getInputVal('tt-gioi-tinh') || 'nam';
  var ngay     = parseInt(getInputVal('tt-ngay'),  10);
  var thang    = parseInt(getInputVal('tt-thang'), 10);
  var nam      = parseInt(getInputVal('tt-nam'),   10);
  var gioSinh  = parseInt(getInputVal('tt-gio'),   10) || 0; /* Index DIA_CHI */
  var muiGio   = parseInt(getInputVal('tt-mui-gio'), 10) || 7;

  /* Validate */
  if (!ngay || !thang || !nam) {
    showToast('Vui lòng nhập đầy đủ ngày, tháng, năm sinh.', 'error');
    return;
  }
  if (ngay < 1 || ngay > 31 || thang < 1 || thang > 12) {
    showToast('Ngày hoặc tháng không hợp lệ.', 'error');
    return;
  }
  if (nam < 1900 || nam > 2100) {
    showToast('Năm sinh phải từ 1900 đến 2100.', 'error');
    return;
  }

  /* Tính Tứ Trụ */
  var ketQua;
  try {
    ketQua = BatTuEngine.phanTichDayDu({
      hoTen:     hoTen || 'Không rõ',
      gioiTinh:  gioiTinh,
      ngay:      ngay,
      thang:     thang,
      nam:       nam,
      gioSinh:   gioSinh,
      muiGio:    muiGio
    });
  } catch (e) {
    showToast('Lỗi tính Tứ Trụ: ' + e.message, 'error');
    return;
  }

  _ttKetQuaHienTai = ketQua;

  /* Hiển thị kết quả */
  _ttHienThiTuTru(ketQua);
  _ttHienThiNguHanh(ketQua);
  _ttHienThiVuongNhuoc(ketQua);
  _ttHienThiDungThan(ketQua);

  /* Hiện section kết quả */
  showEl('tt-result-section');

  /* Chuyển về tab đầu tiên */
  _ttSwitchTab('tu-tru');

  /* Reset AI tab */
  var aiContainer = document.getElementById('tt-ai-container');
  if (aiContainer) aiContainer.innerHTML = '';
}

/* ============================================================
   tuTruLuanDoanLai — Thử lại AI (global cho onclick)
   ============================================================ */
function tuTruLuanDoanLai() {
  if (!_ttKetQuaHienTai) return;
  var aiContainer = document.getElementById('tt-ai-container');
  if (aiContainer) TuTruAI.luanDoan(_ttKetQuaHienTai, aiContainer);
}

/* ============================================================
   _ttHienThiTuTru — Render 4 Trụ dạng ô
   ============================================================ */
function _ttHienThiTuTru(kq) {
  var el = document.getElementById('tt-bon-tru');
  if (!el) return;

  var tt     = kq.tuTru;
  var ct     = kq.cacThan;
  var cacTru = [
    { tru: tt.nam,   label: 'Năm',   than: ct.canNam,   idx: 0 },
    { tru: tt.thang, label: 'Tháng', than: ct.canThang, idx: 1 },
    { tru: tt.ngay,  label: 'Ngày',  than: 'Nhật Chủ',  idx: 2 },
    { tru: tt.gio,   label: 'Giờ',   than: ct.canGio,   idx: 3 }
  ];

  var html = '';
  for (var i = 0; i < cacTru.length; i++) {
    var t    = cacTru[i];
    var nh   = t.tru.nguHanh;
    var isNgay = (i === 2);
    html += '<div class="tt-tru-cell' + (isNgay ? ' tt-tru-nhat-chu' : '') + '">';
    html += '  <div class="tt-tru-label">' + t.label + '</div>';
    html += '  <div class="tt-tru-can" style="color:' + _ttNhColor(nh) + '">' + t.tru.can + '</div>';
    html += '  <div class="tt-tru-chi" style="color:' + _ttNhColor(NGU_HANH_CHI[t.tru.chi] || '') + '">' + t.tru.chi + '</div>';
    html += '  <div class="tt-tru-nh tt-nh-badge tt-nh-' + nh + '">' + nh + '</div>';
    html += '  <div class="tt-tru-than">' + (t.than || '—') + '</div>';
    html += '</div>';
  }

  el.innerHTML = html;
}

/* ============================================================
   _ttHienThiNguHanh — Biểu đồ bar ngang Ngũ Hành
   ============================================================ */
function _ttHienThiNguHanh(kq) {
  var el = document.getElementById('tt-ngu-hanh-chart');
  if (!el) return;

  var nh    = kq.nguHanh;
  var total = nh.total || 1;
  var items = [
    { ten: 'Kim',  val: nh.Kim,  cls: 'tt-nh-Kim'  },
    { ten: 'Mộc',  val: nh.Moc,  cls: 'tt-nh-Moc'  },
    { ten: 'Thủy', val: nh.Thuy, cls: 'tt-nh-Thuy' },
    { ten: 'Hỏa',  val: nh.Hoa,  cls: 'tt-nh-Hoa'  },
    { ten: 'Thổ',  val: nh.Tho,  cls: 'tt-nh-Tho'  }
  ];

  var html = '';
  for (var i = 0; i < items.length; i++) {
    var it  = items[i];
    var pct = Math.round((it.val / total) * 100);
    html += '<div class="tt-bar-row">';
    html += '  <div class="tt-bar-label">' + it.ten + '</div>';
    html += '  <div class="tt-bar-track">';
    html += '    <div class="tt-bar-fill ' + it.cls + '" style="width:' + pct + '%">' + (it.val > 0 ? it.val : '') + '</div>';
    html += '  </div>';
    html += '  <div class="tt-bar-count">' + it.val + '</div>';
    html += '</div>';
  }

  el.innerHTML = html;
}

/* ============================================================
   _ttHienThiVuongNhuoc — Tab Thân Vượng/Nhược
   ============================================================ */
function _ttHienThiVuongNhuoc(kq) {
  var el = document.getElementById('tt-vuong-nhuoc-content');
  if (!el) return;

  var vn  = kq.vuongNhuoc;
  var cls = vn.vuong ? 'tt-vn-vuong' : 'tt-vn-nhuoc';
  var icon = vn.vuong ? '💪' : '🌱';

  var html = '';
  html += '<div class="tt-vn-card ' + cls + '">';
  html += '  <div class="tt-vn-icon">' + icon + '</div>';
  html += '  <div class="tt-vn-ket">' + vn.ketLuan + '</div>';
  html += '  <div class="tt-vn-can">Nhật Chủ: <strong>' + vn.canNgay + ' (' + vn.nhNgay + ')</strong></div>';
  html += '</div>';

  html += '<div class="tt-vn-detail">';
  html += '  <div class="tt-vn-row"><span>Điểm vượng từ tháng sinh:</span><strong>' + vn.diemThang + '/4</strong></div>';
  html += '  <div class="tt-vn-row"><span>Điểm hỗ trợ từ các trụ:</span><strong>' + vn.diemHoTro + '</strong></div>';
  html += '  <div class="tt-vn-row tt-vn-total"><span>Tổng điểm:</span><strong>' + vn.tongDiem + ' / 20</strong></div>';
  html += '  <p class="tt-vn-note">Thân Vượng khi tổng ≥ 8. Thân Nhược khi tổng < 8.</p>';
  html += '</div>';

  el.innerHTML = html;
}

/* ============================================================
   _ttHienThiDungThan — Tab Dụng Thần
   ============================================================ */
function _ttHienThiDungThan(kq) {
  var el = document.getElementById('tt-dung-than-content');
  if (!el) return;

  var dt = kq.dungThan;

  var html = '';
  html += '<div class="tt-dt-grid">';

  html += '<div class="tt-dt-card tt-dt-dung">';
  html += '  <div class="tt-dt-icon">✦</div>';
  html += '  <div class="tt-dt-label">Dụng Thần</div>';
  html += '  <div class="tt-dt-value">' + (dt.dungThan || '—') + '</div>';
  html += '</div>';

  html += '<div class="tt-dt-card tt-dt-hy">';
  html += '  <div class="tt-dt-icon">❤</div>';
  html += '  <div class="tt-dt-label">Hỷ Thần</div>';
  html += '  <div class="tt-dt-value">' + (dt.hyThan || '—') + '</div>';
  html += '</div>';

  html += '<div class="tt-dt-card tt-dt-ky">';
  html += '  <div class="tt-dt-icon">✗</div>';
  html += '  <div class="tt-dt-label">Kỵ Thần</div>';
  html += '  <div class="tt-dt-value">' + (dt.kyThan || '—') + '</div>';
  html += '</div>';

  html += '</div>'; /* /.tt-dt-grid */

  html += '<div class="tt-dt-ly-giai">';
  html += '  <p>' + dt.lyGiai + '</p>';
  html += '</div>';

  el.innerHTML = html;
}

/* ============================================================
   _ttBindTabs — Gắn sự kiện chuyển tab
   ============================================================ */
function _ttBindTabs() {
  var tabs = document.querySelectorAll('.tt-tab-btn');
  for (var i = 0; i < tabs.length; i++) {
    (function(tab) {
      tab.addEventListener('click', function() {
        var tabName = tab.getAttribute('data-tab');
        _ttSwitchTab(tabName);

        /* Nếu chọn tab AI và có kết quả, tự động gọi AI */
        if (tabName === 'ai' && _ttKetQuaHienTai) {
          var aiContainer = document.getElementById('tt-ai-container');
          if (aiContainer && aiContainer.innerHTML.trim() === '') {
            TuTruAI.luanDoan(_ttKetQuaHienTai, aiContainer);
          }
        }
      });
    })(tabs[i]);
  }
}

/* ============================================================
   _ttSwitchTab — Chuyển tab nội dung
   ============================================================ */
function _ttSwitchTab(tabName) {
  /* Active tab button */
  var tabs = document.querySelectorAll('.tt-tab-btn');
  for (var i = 0; i < tabs.length; i++) {
    var t = tabs[i];
    if (t.getAttribute('data-tab') === tabName) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  }

  /* Hiện/ẩn panel */
  var panels = document.querySelectorAll('.tt-tab-panel');
  for (var j = 0; j < panels.length; j++) {
    var p = panels[j];
    if (p.getAttribute('data-panel') === tabName) {
      p.classList.remove('hidden');
    } else {
      p.classList.add('hidden');
    }
  }
}

/* ---- Lấy màu CSS var cho Ngũ Hành ---- */
function _ttNhColor(nh) {
  var map = {
    'Kim':  'var(--kim-color)',
    'Mộc':  'var(--moc-color)',
    'Thủy': 'var(--thuy-color)',
    'Hỏa':  'var(--hoa-color)',
    'Thổ':  'var(--tho-color)'
  };
  return map[nh] || 'var(--ink)';
}

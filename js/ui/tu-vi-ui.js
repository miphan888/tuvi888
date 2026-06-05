/* ============================================================
   tu-vi-ui.js — Module UI cho trang Tử Vi Đẩu Số
   Lịch Việt Nam 888
   Export hàm initTuVi() được gọi bởi app.js
   ============================================================ */

/* ---- Lưu lá số hiện tại để AI luận giải ---- */
var _tvLaSoHienTai = null;

/* ---- Tên 12 cung theo thứ tự lá số ---- */
var TV_TEN_CUNG = [
  'Mệnh','Phụ Mẫu','Phúc Đức','Điền Trạch',
  'Quan Lộc','Nô Bộc','Thiên Di','Tật Ách',
  'Tài Bạch','Tử Tức','Phu Thê','Huynh Đệ'
];

/* ---- Vị trí 12 cung trên grid 4x4 (bỏ ô giữa) ---- */
/* Grid 4 cột x 4 hàng = 16 ô, 4 ô giữa (5,6,9,10 theo 1-index) là trung tâm */
/* Thứ tự đi vòng ngoài: dưới trái → trên trái → trên phải → dưới phải */
var TV_GRID_ORDER = [8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9];
/* Vị trí cell trong grid (0-indexed, 4 cột) tương ứng với thứ tự vòng ngoài */
var TV_CELL_POS = [12, 8, 4, 0, 1, 2, 3, 7, 11, 15, 14, 13];

/* ============================================================
   initTuVi — Hàm khởi tạo, app.js gọi sau khi inject HTML
   ============================================================ */
function initTuVi() {
  /* Bind tab switching */
  _tvBindTabs();
  /* Bind nút đóng popup */
  _tvBindPopup();
  /* Focus vào field đầu tiên */
  var hoTenEl = document.getElementById('tv-ho-ten');
  if (hoTenEl) {
    setTimeout(function() { hoTenEl.focus(); }, 100);
  }
}

/* ============================================================
   tvLapLaSo — Được gọi khi bấm nút "Lập Lá Số Tử Vi"
   (onclick inline trong tu-vi.html)
   ============================================================ */
function tvLapLaSo() {
  /* --- Đọc form --- */
  var hoTen    = getInputVal('tv-ho-ten');
  var gioiTinh = getInputVal('tv-gioi-tinh') || 'nam';
  var ngay     = parseInt(getInputVal('tv-ngay'),  10);
  var thang    = parseInt(getInputVal('tv-thang'), 10);
  var nam      = parseInt(getInputVal('tv-nam'),   10);
  var gioSinh  = getInputVal('tv-gio');   /* Địa Chi giờ, vd: "Tý" */

  /* --- Validate --- */
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

  /* --- Gọi engine tính lá số --- */
  var params = {
    hoTen:     hoTen || 'Không rõ',
    gioiTinh:  gioiTinh,
    ngay:      ngay,
    thang:     thang,
    nam:       nam,
    gioSinh:   gioSinh || 'Tý',   /* Mặc định Tý nếu không rõ */
    muiGio:    7
  };

  var laSo;
  try {
    laSo = TuViEngine.lapLaSo(params);
  } catch(e) {
    console.error('[TuViUI] Lỗi engine:', e);
    showToast('Lỗi tính lá số: ' + e.message, 'error');
    return;
  }

  /* Lưu lại để AI dùng */
  _tvLaSoHienTai = laSo;

  /* --- Render kết quả --- */
  _tvRenderTuTru(laSo);
  _tvRenderMenhGrid(laSo);
  _tvRenderLaSo(laSo);
  _tvRenderDaiVan(laSo);
  _tvRenderTieuVan(laSo);

  /* Hiện khu vực kết quả */
  showEl('tv-result');

  /* Reset tab AI về trạng thái ban đầu */
  var aiBox = document.getElementById('tv-ai-result-box');
  if (aiBox) aiBox.innerHTML = '';

  /* Cuộn xuống kết quả */
  setTimeout(function() {
    var resultEl = document.getElementById('tv-result');
    if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/* ============================================================
   _tvRenderTuTru — Render ô Tứ Trụ (Năm, Tháng, Ngày, Giờ)
   ============================================================ */
function _tvRenderTuTru(laSo) {
  var container = document.getElementById('tv-tu-tru');
  if (!container) return;

  var tru = laSo.tuTru;
  var items = [
    { label: 'Năm',   data: tru.nam   },
    { label: 'Tháng', data: tru.thang },
    { label: 'Ngày',  data: tru.ngay  },
    { label: 'Giờ',   data: tru.gio   }
  ];

  var html = '';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var cc = (it.data.can || '?') + ' ' + (it.data.chi || '?');
    html +=
      '<div class="tv-tru-item">' +
        '<div class="tv-tru-label">' + it.label + '</div>' +
        '<div class="tv-tru-can-chi">' + cc + '</div>' +
        '<div class="tv-tru-hanh">' + (it.data.hanh || '') + '</div>' +
      '</div>';
  }
  container.innerHTML = html;
}

/* ============================================================
   _tvRenderMenhGrid — Render Mệnh, Cục, Chủ Mệnh, Thân Chủ
   ============================================================ */
function _tvRenderMenhGrid(laSo) {
  var container = document.getElementById('tv-menh-grid');
  if (!container) return;

  var items = [
    { label: 'Mệnh',       value: laSo.menhHanh,  sub: 'Ngũ Hành' },
    { label: 'Cục',        value: laSo.cucTen,     sub: 'Số ' + laSo.cucSo },
    { label: 'Chủ Mệnh',  value: laSo.chuMenh,    sub: 'Tinh chủ mệnh' },
    { label: 'Thân Chủ',  value: laSo.thanChu,     sub: 'Tinh thân chủ' }
  ];

  var html = '';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    html +=
      '<div class="tv-menh-item">' +
        '<div class="tv-menh-label">' + it.label + '</div>' +
        '<div class="tv-menh-value">' + (it.value || '?') + '</div>' +
        '<div class="tv-menh-sub">' + it.sub + '</div>' +
      '</div>';
  }
  container.innerHTML = html;
}

// ══════════════════════════════════════════════════════
// RENDER LÁ SỐ 12 CUNG (GRID 4x4) — FIXED
// ══════════════════════════════════════════════════════

function tvRenderLaSo(laSo) {
  var wrap = document.getElementById('tv-la-so-grid');
  if (!wrap || !laSo || !laSo.cung) return;

  var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

  // Vị trí 12 cung trong grid 4x4 (truyền thống)
  // Row 1: Tỵ   Ngọ   Mùi   Thân
  // Row 2: Thìn [---center---] Dậu
  // Row 3: Mão  [---center---] Tuất
  // Row 4: Dần  Sửu   Tý    Hợi
  var gridMap = [
    { chi: 5,  row: 1, col: 1 },  // Tỵ
    { chi: 6,  row: 1, col: 2 },  // Ngọ
    { chi: 7,  row: 1, col: 3 },  // Mùi
    { chi: 8,  row: 1, col: 4 },  // Thân
    { chi: 4,  row: 2, col: 1 },  // Thìn
    { chi: 9,  row: 2, col: 4 },  // Dậu
    { chi: 3,  row: 3, col: 1 },  // Mão
    { chi: 10, row: 3, col: 4 },  // Tuất
    { chi: 2,  row: 4, col: 1 },  // Dần
    { chi: 1,  row: 4, col: 2 },  // Sửu
    { chi: 0,  row: 4, col: 3 },  // Tý
    { chi: 11, row: 4, col: 4 }   // Hợi
  ];

  // Tìm cung theo Địa Chi index
  function timCung(chiIdx) {
    for (var i = 0; i < laSo.cung.length; i++) {
      var c = laSo.cung[i];
      var cChi = c.diaChi;
      if (typeof cChi === 'string') cChi = CHI.indexOf(cChi);
      if (cChi === chiIdx) return { cung: c, idx: i };
    }
    return null;
  }

  // Build grid
  var html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);gap:4px;max-width:720px;margin:0 auto">';

  // Trung tâm (row 2-3, col 2-3)
  html += '<div style="grid-column:2/4;grid-row:2/4;';
  html += 'background:linear-gradient(135deg,#FDF6E3,#F5E6C8);';
  html += 'border:1px solid var(--cream3);border-radius:8px;';
  html += 'display:flex;flex-direction:column;align-items:center;justify-content:center;';
  html += 'padding:16px;text-align:center">';
  html += '<div style="font-family:Noto Serif,serif;font-size:20px;color:var(--red);font-weight:700;margin-bottom:6px">Lá Số Tử Vi</div>';
  html += '<div style="font-size:13px;color:var(--ink2);margin-bottom:4px">' + (laSo.ten || '') + '</div>';
  if (laSo.menh || laSo.menhChu) html += '<div style="font-family:Noto Serif,serif;font-size:14px;font-weight:700;color:var(--ink)">Mệnh: ' + (laSo.menh || laSo.menhChu || '') + '</div>';
  if (laSo.cuc || laSo.tenCuc) html += '<div style="font-size:12px;color:var(--ink3)">Cục: <strong style="color:var(--red)">' + (laSo.cuc || laSo.tenCuc || '') + '</strong></div>';
  if (laSo.nguHanhMenh || laSo.hanhMenh) html += '<div style="font-size:12px;color:var(--ink3);margin-top:2px">Ngũ Hành: <strong>' + (laSo.nguHanhMenh || laSo.hanhMenh || '') + '</strong></div>';
  html += '</div>';

  // 12 cung
  for (var g = 0; g < gridMap.length; g++) {
    var gm = gridMap[g];
    var found = timCung(gm.chi);
    var cung = found ? found.cung : null;
    var cungIdx = found ? found.idx : 0;

    html += '<div style="grid-column:' + gm.col + ';grid-row:' + gm.row + ';';

    if (cung) {
      var tenCung = cung.ten || '—';
      var diaChi = cung.diaChi;
      if (typeof diaChi === 'number') diaChi = CHI[diaChi] || '?';
      var saoArr = cung.sao || [];
      var isMenh = (tenCung === 'Mệnh');
      var isThan = (tenCung === 'Thân' || cung.isThan);

      // Style
      if (isMenh) {
        html += 'border:2px solid var(--red);background:#FFF5F5;';
      } else if (isThan) {
        html += 'border:2px solid var(--gold);background:#FFFDF0;';
      } else {
        html += 'border:1px solid var(--border);background:#FFFDF5;';
      }
      html += 'border-radius:5px;padding:7px;font-size:11px;min-height:120px;position:relative;cursor:pointer;overflow:hidden"';
      html += ' onclick="tvMoCungPopup(' + cungIdx + ')"';
      html += '>';

      // Tên cung + Địa Chi
      html += '<div style="font-size:10px;font-weight:600;color:var(--ink3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">' + tenCung + '</div>';
      html += '<div style="font-family:Noto Serif,serif;font-size:12px;font-weight:700;color:var(--ink3)">' + diaChi + '</div>';

      // Badge
      if (isMenh) html += '<span style="position:absolute;top:4px;right:4px;font-size:9px;padding:1px 5px;border-radius:3px;background:var(--red);color:#FFD700;font-weight:700">MỆNH</span>';
      if (isThan) html += '<span style="position:absolute;top:4px;right:4px;font-size:9px;padding:1px 5px;border-radius:3px;background:var(--gold);color:#fff;font-weight:700">THÂN</span>';

      // Sao
      if (saoArr.length > 0) {
        html += '<div style="margin-top:5px;display:flex;flex-wrap:wrap;gap:2px">';
        for (var si = 0; si < saoArr.length; si++) {
          html += '<span style="font-size:10px;font-weight:600;padding:1px 4px;border-radius:3px;white-space:nowrap;' + tvSaoStyle(saoArr[si]) + '">' + saoArr[si] + '</span>';
        }
        html += '</div>';
      }

    } else {
      // Cung trống
      html += 'border:1px solid var(--border);background:#FFFDF5;border-radius:5px;padding:7px;min-height:120px">';
      html += '<div style="font-size:10px;color:var(--ink3)">' + CHI[gm.chi] + '</div>';
    }

    html += '</div>';
  }

  html += '</div>';
  wrap.innerHTML = html;
}

/* ============================================================
   tvShowCungPopup — Hiện popup chi tiết cung khi click
   ============================================================ */
function tvShowCungPopup(cungIdx) {
  if (!_tvLaSoHienTai) return;
  var cung = _tvLaSoHienTai.cacCung[cungIdx];
  if (!cung) return;

  var titleEl = document.getElementById('tv-popup-title');
  var bodyEl  = document.getElementById('tv-popup-body');
  var overlay = document.getElementById('tv-popup-overlay');

  if (!titleEl || !bodyEl || !overlay) return;

  /* Tiêu đề popup */
  titleEl.textContent = 'Cung ' + cung.ten + ' — ' + cung.diaChi;

  /* Danh sách sao chi tiết */
  var saoList = cung.sao || [];
  var saoHtml = '';
  if (saoList.length === 0) {
    saoHtml = '<p style="color:var(--ink3);font-style:italic;">Không có sao trong cung này.</p>';
  } else {
    saoHtml = '<div style="display:flex;flex-wrap:wrap;gap:var(--sp-xs);">';
    for (var i = 0; i < saoList.length; i++) {
      var sao = saoList[i];
      var loaiLabel = '';
      var loaiColor = 'var(--ink2)';
      if (sao.loai === 'chinh-tinh' || sao.loai === 'chinh') {
        loaiLabel = '★ Chính Tinh';
        loaiColor = 'var(--gold)';
      } else if (sao.loai === 'phu-tinh' || sao.loai === 'phu') {
        loaiLabel = '☆ Phụ Tinh';
        loaiColor = 'var(--primary)';
      } else if (sao.loai === 'tu-hoa') {
        loaiLabel = '◈ Tứ Hóa';
        loaiColor = 'var(--green-good)';
      } else {
        loaiLabel = '· Tạp Tinh';
        loaiColor = 'var(--ink3)';
      }
      saoHtml +=
        '<div style="background:var(--surface2);border-radius:var(--radius-sm);padding:var(--sp-xs) var(--sp-sm);min-width:120px;">' +
          '<div style="font-weight:600;color:' + loaiColor + ';">' + sao.ten + '</div>' +
          '<div style="font-size:0.75rem;color:var(--ink3);">' + loaiLabel + ' · ' + (sao.hanh || '') + '</div>' +
        '</div>';
    }
    saoHtml += '</div>';
  }

  /* Thông tin bổ sung */
  var extraHtml = '';
  if (cung.laMenhCung) extraHtml += '<p style="color:var(--gold);font-weight:600;margin-top:var(--sp-sm);">⭐ Đây là Cung Mệnh</p>';
  if (cung.laThanCung) extraHtml += '<p style="color:var(--primary);font-weight:600;margin-top:var(--sp-xs);">💫 Đây là Cung Thân</p>';
  if (cung.tuanKhong)  extraHtml += '<p style="color:var(--red-bad);margin-top:var(--sp-xs);">⚠️ Cung bị Triệt</p>';

  bodyEl.innerHTML =
    '<div style="padding:var(--sp-md);">' +
      '<h4 style="margin-bottom:var(--sp-sm);color:var(--ink1);">Các sao trong cung:</h4>' +
      saoHtml +
      extraHtml +
    '</div>';

  /* Hiện overlay */
  overlay.classList.remove('hidden');
}

/* ============================================================
   _tvBindPopup — Bind sự kiện đóng popup
   ============================================================ */
function _tvBindPopup() {
  var closeBtn = document.getElementById('tv-popup-close');
  var overlay  = document.getElementById('tv-popup-overlay');

  if (closeBtn) {
    closeBtn.onclick = function() {
      if (overlay) overlay.classList.add('hidden');
    };
  }

  if (overlay) {
    overlay.onclick = function(e) {
      if (e.target === overlay) overlay.classList.add('hidden');
    };
  }
}

/* ============================================================
   _tvRenderDaiVan — Render lưới Đại Vận
   ============================================================ */
function _tvRenderDaiVan(laSo) {
  var container = document.getElementById('tv-dai-van-grid');
  if (!container) return;

  var daiVanList  = laSo.daiVanList  || [];
  var dvHienTai   = laSo.dvHienTai;
  var namHienTai  = new Date().getFullYear();

  var html = '';
  for (var i = 0; i < daiVanList.length; i++) {
    var dv = daiVanList[i];
    var isHienTai = dvHienTai && dv.namBatDau === dvHienTai.namBatDau;
    var cls = 'tv-dai-van-item' + (isHienTai ? ' hien-tai' : '');

    html +=
      '<div class="' + cls + '">' +
        '<div class="tv-dv-tuoi">Tuổi ' + (dv.tuoiBatDau || '') + (dv.tuoiKetThuc ? '–' + dv.tuoiKetThuc : '+') + '</div>' +
        '<div class="tv-dv-can-chi">' + (dv.can || '') + ' ' + (dv.chi || '') + '</div>' +
        '<div class="tv-dv-nam">' + (dv.namBatDau || '') + '–' + (dv.namKetThuc || '') + '</div>' +
        (isHienTai ? '<div class="tv-dv-badge">Hiện tại</div>' : '') +
      '</div>';
  }

  container.innerHTML = html || '<p style="color:var(--ink3);padding:var(--sp-md);">Không tính được Đại Vận.</p>';
}

/* ============================================================
   _tvRenderTieuVan — Render Tiểu Vận của đại vận hiện tại
   ============================================================ */
function _tvRenderTieuVan(laSo) {
  var container = document.getElementById('tv-tieu-van-grid');
  if (!container) return;

  var tieuVanList = laSo.tieuVanList || [];
  var namHienTai  = new Date().getFullYear();

  var html = '';
  for (var i = 0; i < tieuVanList.length; i++) {
    var tv = tieuVanList[i];
    var isNow = tv.nam === namHienTai;
    var cls   = 'tv-dai-van-item' + (isNow ? ' hien-tai' : '');

    html +=
      '<div class="' + cls + '" style="min-width:100px;">' +
        '<div class="tv-dv-can-chi">' + (tv.can || '') + ' ' + (tv.chi || '') + '</div>' +
        '<div class="tv-dv-nam">Năm ' + (tv.nam || '') + '</div>' +
        (isNow ? '<div class="tv-dv-badge">Hiện tại</div>' : '') +
      '</div>';
  }

  container.innerHTML = html || '<p style="color:var(--ink3);">Không có dữ liệu tiểu vận.</p>';
}

/* ============================================================
   _tvBindTabs — Bind sự kiện chuyển tab (Đại Vận / AI Luận Giải)
   ============================================================ */
function _tvBindTabs() {
  var tabWrap = document.querySelector('.tv-tabs-wrap');
  if (!tabWrap) return;

  var tabBtns = tabWrap.querySelectorAll('.tab-btn');
  for (var i = 0; i < tabBtns.length; i++) {
    (function(btn) {
      btn.onclick = function() {
        /* Bỏ active tất cả tab btn */
        for (var j = 0; j < tabBtns.length; j++) {
          tabBtns[j].classList.remove('active');
        }
        btn.classList.add('active');

        /* Ẩn tất cả tab content */
        var contents = tabWrap.querySelectorAll('.tab-content');
        for (var k = 0; k < contents.length; k++) {
          contents[k].classList.remove('active');
        }

        /* Hiện tab content tương ứng */
        var targetId = btn.getAttribute('data-tab');
        var targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
      };
    })(tabBtns[i]);
  }
}

/* ============================================================
   tvLuanGiai — Gọi AI luận giải lá số
   (onclick inline trong tu-vi.html)
   ============================================================ */
function tvLuanGiai() {
  if (!_tvLaSoHienTai) {
    showToast('Vui lòng lập lá số trước.', 'error');
    return;
  }

  /* Kiểm tra AI module */
  if (typeof TuViAI === 'undefined' || typeof TuViAI.luanGiai !== 'function') {
    showToast('Module AI chưa sẵn sàng.', 'error');
    return;
  }

  var btn   = document.getElementById('tv-btn-ai');
  var aiBox = document.getElementById('tv-ai-result-box');
  if (!aiBox) return;

  /* Trạng thái loading */
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang luận giải...'; }
  aiBox.innerHTML =
    '<div style="text-align:center;padding:var(--sp-lg);color:var(--ink3);">' +
      '<div class="loading-spinner" style="margin:0 auto var(--sp-md);"></div>' +
      '<p>AI đang phân tích lá số...</p>' +
    '</div>';

  /* Gọi AI */
  TuViAI.luanGiai(_tvLaSoHienTai, function(err, ketQua) {
    if (btn) { btn.disabled = false; btn.textContent = '✨ Luận Giải Lá Số bằng AI'; }

    if (err) {
      aiBox.innerHTML =
        '<div style="color:var(--red-bad);padding:var(--sp-md);">' +
          '<strong>Lỗi:</strong> ' + err +
        '</div>';
      return;
    }

    /* Render kết quả: chuyển dòng thành <p> */
    var paragraphs = ketQua.split('\n');
    var html = '';
    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i].trim();
      if (p) {
        html += '<p style="margin-bottom:var(--sp-sm);line-height:1.75;">' + p + '</p>';
      }
    }

    aiBox.innerHTML =
      '<div style="background:var(--surface2);border-radius:var(--radius-md);padding:var(--sp-lg);margin-top:var(--sp-md);">' +
        '<h4 style="margin-bottom:var(--sp-md);color:var(--gold);">🌟 Luận Giải Lá Số Tử Vi</h4>' +
        html +
        '<p style="font-size:0.8rem;color:var(--ink3);margin-top:var(--sp-md);border-top:1px solid var(--border1);padding-top:var(--sp-sm);">' +
          'Thông tin mang tính tham khảo, không thay thế tư vấn chuyên gia.' +
        '</p>' +
      '</div>';
  });
}

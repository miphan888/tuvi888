/* ============================================================
   lich-am-ai.js — Module AI luận giải Lịch Âm
   Dùng AIService.ask() từ ai-service.js (Gemini API)
   Lịch Việt Nam 888
   ============================================================ */

var LichAmAI = (function() {
  'use strict';

  /* ============================================================
     SYSTEM PROMPT — Chuyên gia lịch pháp phương Đông
     ============================================================ */
  var SYSTEM_PROMPT =
    'Bạn là chuyên gia lịch pháp và phong thủy phương Đông, am hiểu sâu sắc về ' +
    'âm dương lịch Việt Nam, ngũ hành, can chi, tiết khí, thập nhị trực và các ' +
    'phương pháp chọn ngày giờ tốt theo cổ truyền. ' +
    'Khi phân tích một ngày cụ thể, bạn:\n' +
    '1. Đánh giá tổng quan ngày tốt hay xấu dựa trên trực, tiết khí, can chi\n' +
    '2. Liệt kê việc nên làm trong ngày (3-5 việc)\n' +
    '3. Liệt kê việc cần kiêng kỵ (2-3 việc)\n' +
    '4. Gợi ý hướng xuất hành tốt nhất\n' +
    '5. Nêu 2-3 giờ Hoàng Đạo tốt nhất và lý do\n' +
    'Viết bằng tiếng Việt, 250-400 từ, giọng văn trang trọng, gần gũi. ' +
    'Chia đoạn rõ ràng. KHÔNG dùng ký hiệu markdown (**, ##, -, *). Viết văn xuôi tự nhiên.';

  /* ============================================================
     _buildUserMessage — Xây dựng nội dung gửi cho AI
     ============================================================ */
  function _buildUserMessage(thongTin) {
    var msg = 'PHÂN TÍCH NGÀY:\n';
    msg += 'Ngày dương lịch: ' + _pad(thongTin.duong.dd) + '/' + _pad(thongTin.duong.mm) + '/' + thongTin.duong.yyyy + '\n';
    msg += 'Thứ: ' + thongTin.thu + '\n';

    /* Âm lịch */
    var am = thongTin.am;
    msg += 'Ngày âm lịch: ' + am.day + '/' + am.month + (am.leap ? ' (nhuận)' : '') + '/' + am.year + '\n\n';

    /* Can Chi */
    msg += 'CAN CHI:\n';
    msg += 'Ngày: ' + thongTin.ccNgay.can + ' ' + thongTin.ccNgay.chi + '\n';
    msg += 'Tháng: ' + thongTin.ccThang.can + ' ' + thongTin.ccThang.chi + '\n';
    msg += 'Năm: ' + thongTin.ccNam.can + ' ' + thongTin.ccNam.chi + '\n\n';

    /* Tiết khí */
    msg += 'Tiết khí: ' + (thongTin.tietKhi ? thongTin.tietKhi.ten : 'Không xác định') + '\n';
    msg += 'Thập Nhị Trực: ' + thongTin.truc + '\n\n';

    /* Giờ Hoàng Đạo */
    var hoangDao = [];
    var dsgArr = thongTin.danhSachGio || [];
    for (var i = 0; i < dsgArr.length; i++) {
      if (dsgArr[i].good) {
        hoangDao.push(dsgArr[i].chi + ' (' + _fmtGio(dsgArr[i].from) + '-' + _fmtGio(dsgArr[i].to) + ')');
      }
    }
    msg += 'Giờ Hoàng Đạo: ' + hoangDao.join(', ') + '\n\n';

    msg += 'Hãy luận giải chi tiết về ngày này theo phong thủy và lịch pháp cổ truyền Việt Nam.';
    return msg;
  }

  /* ---- Pad số ---- */
  function _pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  /* ---- Format giờ ---- */
  function _fmtGio(h) {
    return _pad(h) + 'h';
  }

  /* ============================================================
     luanGiai — Gọi AI phân tích ngày
     thongTin: object từ CanChiEngine.phanTichNgay()
     containerEl: element HTML để hiển thị kết quả
     ============================================================ */
  function luanGiai(thongTin, containerEl) {
    if (!containerEl) return;

    /* Kiểm tra API key */
    if (!AIService.isConfigured()) {
      containerEl.innerHTML =
        '<div class="la-ai-box la-ai-error">' +
          '<span class="la-ai-icon">⚠️</span>' +
          '<p>' + AIService.getErrorMessage(new Error('API_KEY_NOT_SET')) + '</p>' +
        '</div>';
      return;
    }

    /* Hiện loading */
    containerEl.innerHTML =
      '<div class="la-ai-box la-ai-loading">' +
        '<div class="loading-spinner"></div>' +
        '<p>🤖 AI đang phân tích ngày... Vui lòng chờ.</p>' +
      '</div>';

    var userMsg = _buildUserMessage(thongTin);

    AIService.ask(SYSTEM_PROMPT, userMsg, { cache: true })
      .then(function(ketQua) {
        /* Format kết quả: xuống dòng → <br> */
        var html = ketQua
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n\n+/g, '</p><p>')
          .replace(/\n/g, '<br>');

        containerEl.innerHTML =
          '<div class="la-ai-box">' +
            '<div class="la-ai-header">' +
              '<span class="la-ai-icon">🤖</span>' +
              '<strong>AI Luận Giải Ngày ' + _pad(thongTin.duong.dd) + '/' + _pad(thongTin.duong.mm) + '/' + thongTin.duong.yyyy + '</strong>' +
            '</div>' +
            '<div class="la-ai-content"><p>' + html + '</p></div>' +
          '</div>';
      })
      .catch(function(err) {
        containerEl.innerHTML =
          '<div class="la-ai-box la-ai-error">' +
            '<span class="la-ai-icon">❌</span>' +
            '<p>' + AIService.getErrorMessage(err) + '</p>' +
            '<button class="btn btn-secondary btn-sm mt-sm" onclick="lichAmLuanGiaiLai()">↻ Thử lại</button>' +
          '</div>';
      });
  }

  /* ============================================================
     Public API
     ============================================================ */
  return {
    luanGiai: luanGiai
  };
})();

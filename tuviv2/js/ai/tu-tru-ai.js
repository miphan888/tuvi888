/* ============================================================
   tu-tru-ai.js — Module AI luận đoán Tứ Trụ Bát Tự
   Dùng AIService.ask() từ ai-service.js (Gemini API)
   Lịch Việt Nam 888
   ============================================================ */

var TuTruAI = (function() {
  'use strict';

  /* ============================================================
     SYSTEM PROMPT — Thầy Tứ Trụ uyên thâm
     ============================================================ */
  var SYSTEM_PROMPT =
    'Bạn là thầy Tứ Trụ Bát Tự uyên thâm theo trường phái Trung Hoa cổ điển, ' +
    'am hiểu Thập Thần, Ngũ Hành sinh khắc, Dụng Thần, Hỷ Kỵ Thần, ' +
    'Đại Vận và Lưu Niên. Khi phân tích lá số Tứ Trụ, bạn:\n' +
    '1. Nhận xét tổng quan bát tự và cục cách\n' +
    '2. Phân tích tình trạng Nhật Chủ (vượng hay nhược) và lý do\n' +
    '3. Xác định Dụng Thần, Hỷ Thần, Kỵ Thần và ảnh hưởng\n' +
    '4. Luận đoán sự nghiệp, tài lộc theo ngũ hành\n' +
    '5. Nhận xét tình duyên, hôn nhân\n' +
    '6. Sức khỏe và điểm cần lưu ý\n' +
    '7. Lời khuyên: màu sắc may mắn, hướng tốt, nghề nghiệp phù hợp\n' +
    'Viết bằng tiếng Việt, 350-500 từ, giọng văn trang trọng, súc tích. ' +
    'Chia thành đoạn ngắn. KHÔNG dùng markdown (**, ##, -, *).';

  /* ============================================================
     _buildUserMessage — Xây dựng message mô tả Tứ Trụ
     ============================================================ */
  function _buildUserMessage(ketQua) {
    var p   = ketQua.params;
    var tt  = ketQua.tuTru;
    var nh  = ketQua.nguHanh;
    var vn  = ketQua.vuongNhuoc;
    var dt  = ketQua.dungThan;
    var ct  = ketQua.cacThan;

    var msg = 'LÁ SỐ TỨ TRỤ BÁT TỰ\n';
    msg += 'Họ tên: '     + (p.hoTen || 'Không rõ') + '\n';
    msg += 'Giới tính: '  + (p.gioiTinh === 'nu' ? 'Nữ' : 'Nam') + '\n';
    msg += 'Ngày sinh DL: ' + p.ngay + '/' + p.thang + '/' + p.nam + '\n\n';

    msg += 'TỨ TRỤ (CAN-CHI):\n';
    msg += 'Giờ:   ' + tt.gio.can   + ' ' + tt.gio.chi   + ' (' + tt.gio.nguHanh   + ') — ' + ct.canGio   + '\n';
    msg += 'Ngày:  ' + tt.ngay.can  + ' ' + tt.ngay.chi  + ' (' + tt.ngay.nguHanh  + ') — Nhật Chủ\n';
    msg += 'Tháng: ' + tt.thang.can + ' ' + tt.thang.chi + ' (' + tt.thang.nguHanh + ') — ' + ct.canThang + '\n';
    msg += 'Năm:   ' + tt.nam.can   + ' ' + tt.nam.chi   + ' (' + tt.nam.nguHanh   + ') — ' + ct.canNam   + '\n\n';

    msg += 'NGŨ HÀNH PHÂN BỐ:\n';
    msg += 'Kim: ' + nh.Kim + '  Mộc: ' + nh.Moc + '  Thủy: ' + nh.Thuy + '  Hỏa: ' + nh.Hoa + '  Thổ: ' + nh.Tho + '\n\n';

    msg += 'NHẬT CHỦ: ' + vn.canNgay + ' (' + vn.nhNgay + ') — ' + vn.ketLuan + '\n';
    msg += 'Điểm vượng từ tháng: ' + vn.diemThang + '/4, Tổng điểm: ' + vn.tongDiem + '\n\n';

    msg += 'DỤNG THẦN: ' + dt.dungThan + '\n';
    msg += 'HỶ THẦN: '   + dt.hyThan   + '\n';
    msg += 'KỴ THẦN: '   + dt.kyThan   + '\n';
    msg += 'Lý giải: '   + dt.lyGiai   + '\n\n';

    msg += 'Hãy luận đoán chi tiết lá số này theo Tứ Trụ Bát Tự phương Đông.';
    return msg;
  }

  /* ============================================================
     luanDoan — Gọi AI phân tích Tứ Trụ
     ketQua: object từ BatTuEngine.phanTichDayDu()
     containerEl: element để hiển thị kết quả
     ============================================================ */
  function luanDoan(ketQua, containerEl) {
    if (!containerEl) return;

    if (!AIService.isConfigured()) {
      containerEl.innerHTML =
        '<div class="tt-ai-box tt-ai-error">' +
          '<p>' + AIService.getErrorMessage(new Error('API_KEY_NOT_SET')) + '</p>' +
        '</div>';
      return;
    }

    containerEl.innerHTML =
      '<div class="tt-ai-box tt-ai-loading">' +
        '<div class="loading-spinner"></div>' +
        '<p>🤖 AI đang phân tích Tứ Trụ... Vui lòng chờ.</p>' +
      '</div>';

    var userMsg = _buildUserMessage(ketQua);

    AIService.ask(SYSTEM_PROMPT, userMsg, { cache: true })
      .then(function(text) {
        var html = text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n\n+/g, '</p><p>')
          .replace(/\n/g, '<br>');

        containerEl.innerHTML =
          '<div class="tt-ai-box">' +
            '<div class="tt-ai-header">' +
              '<span>🤖</span>' +
              '<strong>AI Luận Đoán Tứ Trụ</strong>' +
            '</div>' +
            '<div class="tt-ai-content"><p>' + html + '</p></div>' +
          '</div>';
      })
      .catch(function(err) {
        containerEl.innerHTML =
          '<div class="tt-ai-box tt-ai-error">' +
            '<p>' + AIService.getErrorMessage(err) + '</p>' +
            '<button class="btn btn-secondary btn-sm mt-sm" onclick="tuTruLuanDoanLai()">↻ Thử lại</button>' +
          '</div>';
      });
  }

  return { luanDoan: luanDoan };
})();

/* ============================================================
   can-chi.js — Dữ liệu Thiên Can, Địa Chi, Ngũ Hành, Nạp Âm
   Lịch Việt Nam 888
   ============================================================ */

/* ---- 10 Thiên Can ---- */
var THIEN_CAN = [
  'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu',
  'Kỷ',  'Canh', 'Tân', 'Nhâm', 'Quý'
];

/* ---- 12 Địa Chi ---- */
var DIA_CHI = [
  'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ',
  'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
];

/* ---- Ngũ Hành của 10 Thiên Can ---- */
var NGU_HANH_CAN = {
  'Giáp': 'Mộc', 'Ất':  'Mộc',
  'Bính': 'Hỏa', 'Đinh': 'Hỏa',
  'Mậu':  'Thổ', 'Kỷ':  'Thổ',
  'Canh': 'Kim', 'Tân':  'Kim',
  'Nhâm': 'Thủy','Quý':  'Thủy'
};

/* ---- Ngũ Hành của 12 Địa Chi ---- */
var NGU_HANH_CHI = {
  'Tý':   'Thủy', 'Sửu':  'Thổ',
  'Dần':  'Mộc',  'Mão':  'Mộc',
  'Thìn': 'Thổ',  'Tỵ':   'Hỏa',
  'Ngọ':  'Hỏa',  'Mùi':  'Thổ',
  'Thân': 'Kim',  'Dậu':  'Kim',
  'Tuất': 'Thổ',  'Hợi':  'Thủy'
};

/* ---- Âm Dương của 10 Thiên Can (Dương: index chẵn, Âm: index lẻ) ---- */
var AM_DUONG_CAN = {
  'Giáp': 'Dương', 'Ất':   'Âm',
  'Bính': 'Dương', 'Đinh': 'Âm',
  'Mậu':  'Dương', 'Kỷ':   'Âm',
  'Canh': 'Dương', 'Tân':  'Âm',
  'Nhâm': 'Dương', 'Quý':  'Âm'
};

/* ---- Âm Dương của 12 Địa Chi ---- */
var AM_DUONG_CHI = {
  'Tý':   'Dương', 'Sửu':  'Âm',
  'Dần':  'Dương', 'Mão':  'Âm',
  'Thìn': 'Dương', 'Tỵ':   'Âm',
  'Ngọ':  'Dương', 'Mùi':  'Âm',
  'Thân': 'Dương', 'Dậu':  'Âm',
  'Tuất': 'Dương', 'Hợi':  'Âm'
};

/* ---- 60 Nạp Âm Giáp Tý (theo thứ tự từ Giáp Tý đến Quý Hợi) ---- */
/* Mỗi cặp 2 năm có cùng Nạp Âm */
var NAP_AM_60 = [
  /* 0  Giáp Tý,  Ất Sửu  */ 'Hải Trung Kim',   /* Kim trong biển */
  /* 1  Bính Dần, Đinh Mão */ 'Lư Trung Hỏa',    /* Lửa trong lò */
  /* 2  Mậu Thìn, Kỷ Tỵ   */ 'Đại Lâm Mộc',     /* Gỗ rừng lớn */
  /* 3  Canh Ngọ, Tân Mùi  */ 'Lộ Bàng Thổ',    /* Đất bên đường */
  /* 4  Nhâm Thân, Quý Dậu */ 'Kiếm Phong Kim',  /* Kim đầu kiếm */
  /* 5  Giáp Tuất, Ất Hợi  */ 'Sơn Đầu Hỏa',    /* Lửa đỉnh núi */
  /* 6  Bính Tý,  Đinh Sửu */ 'Giản Hạ Thủy',   /* Nước dưới suối */
  /* 7  Mậu Dần, Kỷ Mão    */ 'Thành Đầu Thổ',  /* Đất trên thành */
  /* 8  Canh Thìn, Tân Tỵ  */ 'Bạch Lạp Kim',   /* Kim nến trắng */
  /* 9  Nhâm Ngọ, Quý Mùi  */ 'Dương Liễu Mộc', /* Gỗ cây dương */
  /* 10 Giáp Thân, Ất Dậu  */ 'Tuyền Trung Thủy','/* Nước trong suối */',
  /* 11 Bính Tuất, Đinh Hợi */ 'Ốc Thượng Thổ',  /* Đất trên nóc */
  /* 12 Mậu Tý,  Kỷ Sửu   */ 'Tích Lịch Hỏa',  /* Lửa sấm sét */
  /* 13 Canh Dần, Tân Mão  */ 'Tùng Bách Mộc',  /* Gỗ tùng bách */
  /* 14 Nhâm Thìn, Quý Tỵ */ 'Trường Lưu Thủy', /* Nước chảy dài */
  /* 15 Giáp Ngọ, Ất Mùi  */ 'Sa Trung Kim',    /* Kim trong cát */
  /* 16 Bính Thân, Đinh Dậu*/ 'Sơn Hạ Hỏa',    /* Lửa dưới núi */
  /* 17 Mậu Tuất, Kỷ Hợi  */ 'Bình Địa Mộc',   /* Gỗ đất bằng */
  /* 18 Canh Tý,  Tân Sửu */ 'Bích Thượng Thổ', /* Đất trên vách */
  /* 19 Nhâm Dần, Quý Mão */ 'Kim Bạc Kim',     /* Kim lá vàng */
  /* 20 Giáp Thìn, Ất Tỵ  */ 'Phúc Đăng Hỏa',  /* Lửa đèn đuốc */
  /* 21 Bính Ngọ, Đinh Mùi */ 'Thiên Hà Thủy',  /* Nước sông trời */
  /* 22 Mậu Thân, Kỷ Dậu  */ 'Đại Trạch Thổ',  /* Đất nền lớn */
  /* 23 Canh Tuất, Tân Hợi */ 'Thoa Xuyến Kim', /* Kim trâm nhẫn */
  /* 24 Nhâm Tý,  Quý Sửu */ 'Tang Đố Mộc',    /* Gỗ dâu táo */
  /* 25 Giáp Dần, Ất Mão  */ 'Đại Khê Thủy',   /* Nước khe lớn */
  /* 26 Bính Thìn, Đinh Tỵ */ 'Sa Trung Thổ',   /* Đất trong cát */
  /* 27 Mậu Ngọ, Kỷ Mùi   */ 'Thiên Thượng Hỏa','/* Lửa trên trời */',
  /* 28 Canh Thân, Tân Dậu */ 'Thạch Lựu Mộc',  /* Gỗ thạch lựu */
  /* 29 Nhâm Tuất, Quý Hợi */ 'Đại Hải Thủy'    /* Nước biển lớn */
];

/* ---- Bảng tra Nạp Âm theo Can Chi ---- */
/* Trả về Nạp Âm cho một năm can-chi */
function getNapAm(can, chi) {
  var iCan = THIEN_CAN.indexOf(can);
  var iChi = DIA_CHI.indexOf(chi);
  if (iCan === -1 || iChi === -1) return '';
  /* Vị trí trong chu kỳ 60: (iCan + iChi * phần dư) */
  /* Công thức: vị trí = ((iChi - iCan % 12) mà vòng đúng) */
  /* Cách đơn giản: số thứ tự trong 60 = (iCan + iChi * 5) % 60 chia 2 */
  var idx60 = ((iChi % 12) * 5 + Math.floor(iCan / 2)) % 30;
  return NAP_AM_60[idx60] || '';
}

/* ---- Ngũ Hành tương sinh ---- */
var TUONG_SINH = {
  'Mộc': 'Hỏa',   /* Mộc sinh Hỏa */
  'Hỏa': 'Thổ',   /* Hỏa sinh Thổ */
  'Thổ': 'Kim',   /* Thổ sinh Kim */
  'Kim':  'Thủy', /* Kim sinh Thủy */
  'Thủy': 'Mộc'   /* Thủy sinh Mộc */
};

/* ---- Ngũ Hành tương khắc ---- */
var TUONG_KHAC = {
  'Mộc': 'Thổ',   /* Mộc khắc Thổ */
  'Thổ': 'Thủy',  /* Thổ khắc Thủy */
  'Thủy': 'Hỏa',  /* Thủy khắc Hỏa */
  'Hỏa': 'Kim',   /* Hỏa khắc Kim */
  'Kim':  'Mộc'   /* Kim khắc Mộc */
};

/* ---- Màu CSS variable cho mỗi Ngũ Hành ---- */
var NGU_HANH_COLOR = {
  'Kim':   'var(--kim-color)',
  'Mộc':   'var(--moc-color)',
  'Thủy':  'var(--thuy-color)',
  'Hỏa':   'var(--hoa-color)',
  'Thổ':   'var(--tho-color)'
};

/* ---- Giờ Địa Chi theo khung giờ thực ---- */
/* Mỗi Địa Chi = 2 giờ dương lịch */
var GIO_DIA_CHI = [
  { chi: 'Tý',   from: 23, to: 1  },
  { chi: 'Sửu',  from: 1,  to: 3  },
  { chi: 'Dần',  from: 3,  to: 5  },
  { chi: 'Mão',  from: 5,  to: 7  },
  { chi: 'Thìn', from: 7,  to: 9  },
  { chi: 'Tỵ',   from: 9,  to: 11 },
  { chi: 'Ngọ',  from: 11, to: 13 },
  { chi: 'Mùi',  from: 13, to: 15 },
  { chi: 'Thân', from: 15, to: 17 },
  { chi: 'Dậu',  from: 17, to: 19 },
  { chi: 'Tuất', from: 19, to: 21 },
  { chi: 'Hợi',  from: 21, to: 23 }
];

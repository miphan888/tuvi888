/* ============================================================
   tiet-khi.js — Dữ liệu 24 Tiết Khí
   Lịch Việt Nam 888
   ============================================================ */

/* ---- 24 Tiết Khí với Solar Longitude tương ứng ---- */
/* Solar Longitude là góc mặt trời (độ) đánh dấu mỗi tiết khí */
var TIET_KHI = [
  {
    id: 0,
    ten: 'Xuân Phân',
    solarLng: 0,
    moTa: 'Ngày đêm bằng nhau, mùa xuân phân chia. Tiết trời ấm áp, vạn vật sinh sôi.'
  },
  {
    id: 1,
    ten: 'Thanh Minh',
    solarLng: 15,
    moTa: 'Trời quang mây tạnh, không khí trong lành. Thời điểm tảo mộ, thăm viếng tổ tiên.'
  },
  {
    id: 2,
    ten: 'Cốc Vũ',
    solarLng: 30,
    moTa: 'Mưa xuân nhuần thấm, nuôi dưỡng ngũ cốc. Cây cối phát triển mạnh mẽ.'
  },
  {
    id: 3,
    ten: 'Lập Hạ',
    solarLng: 45,
    moTa: 'Vào mùa hạ, khí trời ấm nóng dần. Cây cối xanh tốt, muôn vật trưởng thành.'
  },
  {
    id: 4,
    ten: 'Tiểu Mãn',
    solarLng: 60,
    moTa: 'Hạt lúa bắt đầu đầy đặn. Mưa nhiều hơn, chuẩn bị cho vụ mùa.'
  },
  {
    id: 5,
    ten: 'Mang Chủng',
    solarLng: 75,
    moTa: 'Mùa cấy trồng lúa nước. Bận rộn với đồng áng, thu hoạch và gieo cấy.'
  },
  {
    id: 6,
    ten: 'Hạ Chí',
    solarLng: 90,
    moTa: 'Ngày dài nhất trong năm, đỉnh điểm mùa hạ. Khí dương đạt cực thịnh.'
  },
  {
    id: 7,
    ten: 'Tiểu Thử',
    solarLng: 105,
    moTa: 'Bắt đầu mùa nóng, nhưng chưa phải nóng nhất. Mưa nhiều, ẩm ướt.'
  },
  {
    id: 8,
    ten: 'Đại Thử',
    solarLng: 120,
    moTa: 'Nóng nhất trong năm. Cần giữ sức khỏe, tránh nắng gắt, bổ sung nước.'
  },
  {
    id: 9,
    ten: 'Lập Thu',
    solarLng: 135,
    moTa: 'Vào mùa thu, khí trời se lạnh dần. Lá vàng rụng, thu hoạch hoa màu.'
  },
  {
    id: 10,
    ten: 'Xử Thử',
    solarLng: 150,
    moTa: 'Nắng nóng lui dần, gió thu mát mẻ. Khí hậu dễ chịu, sức khỏe cải thiện.'
  },
  {
    id: 11,
    ten: 'Bạch Lộ',
    solarLng: 165,
    moTa: 'Sương trắng xuất hiện ban đêm. Khí trời lạnh hơn, báo hiệu mùa thu chính thức.'
  },
  {
    id: 12,
    ten: 'Thu Phân',
    solarLng: 180,
    moTa: 'Ngày đêm bằng nhau trong thu. Khí dương âm cân bằng, tiết trời mát mẻ.'
  },
  {
    id: 13,
    ten: 'Hàn Lộ',
    solarLng: 195,
    moTa: 'Sương lạnh xuất hiện. Nhiệt độ giảm mạnh, cần giữ ấm cơ thể.'
  },
  {
    id: 14,
    ten: 'Sương Giáng',
    solarLng: 210,
    moTa: 'Sương muối bắt đầu đóng băng. Mùa thu cuối, chuẩn bị đón đông.'
  },
  {
    id: 15,
    ten: 'Lập Đông',
    solarLng: 225,
    moTa: 'Vào mùa đông, trời lạnh giá. Vạn vật thu mình, dưỡng sức để xuân về.'
  },
  {
    id: 16,
    ten: 'Tiểu Tuyết',
    solarLng: 240,
    moTa: 'Tuyết nhỏ bắt đầu rơi ở phương Bắc. Ở Việt Nam, trời rét đậm, hanh khô.'
  },
  {
    id: 17,
    ten: 'Đại Tuyết',
    solarLng: 255,
    moTa: 'Tuyết lớn, rét nhất mùa đông. Cần bổ sung dinh dưỡng, giữ ấm cơ thể.'
  },
  {
    id: 18,
    ten: 'Đông Chí',
    solarLng: 270,
    moTa: 'Đêm dài nhất trong năm. Khí âm đạt cực thịnh, dương khí bắt đầu trỗi dậy.'
  },
  {
    id: 19,
    ten: 'Tiểu Hàn',
    solarLng: 285,
    moTa: 'Lạnh giá tăng cao. Cần bổ thận, giữ ấm, ăn uống đủ chất dinh dưỡng.'
  },
  {
    id: 20,
    ten: 'Đại Hàn',
    solarLng: 300,
    moTa: 'Lạnh nhất trong năm. Phòng bệnh hô hấp, tim mạch khi thời tiết khắc nghiệt.'
  },
  {
    id: 21,
    ten: 'Lập Xuân',
    solarLng: 315,
    moTa: 'Vào mùa xuân, vạn vật hồi sinh. Khởi đầu tốt lành cho năm mới, gieo trồng.'
  },
  {
    id: 22,
    ten: 'Vũ Thủy',
    solarLng: 330,
    moTa: 'Mưa xuân tưới tắm đất trời. Cây cối đâm chồi nảy lộc, đất đai màu mỡ.'
  },
  {
    id: 23,
    ten: 'Kinh Trập',
    solarLng: 345,
    moTa: 'Sấm sét đánh thức côn trùng ngủ đông. Đất đai ấm lại, muôn loài thức tỉnh.'
  }
];

/* ---- Lấy tên tiết khí theo Solar Longitude ---- */
/* Trả về tiết khí hiện tại dựa trên vị trí mặt trời */
function getTietKhiByLng(solarLng) {
  /* Chuẩn hoá về 0-360 */
  solarLng = ((solarLng % 360) + 360) % 360;
  /* Tìm tiết khí mà solarLng >= tiết này và < tiết kế tiếp */
  for (var i = TIET_KHI.length - 1; i >= 0; i--) {
    if (solarLng >= TIET_KHI[i].solarLng) {
      return TIET_KHI[i];
    }
  }
  /* Trường hợp solarLng < 15 → quay lại tiết cuối cùng */
  return TIET_KHI[TIET_KHI.length - 1];
}

/* ---- Lấy tiết khí theo tên ---- */
function getTietKhiByTen(ten) {
  for (var i = 0; i < TIET_KHI.length; i++) {
    if (TIET_KHI[i].ten === ten) return TIET_KHI[i];
  }
  return null;
}

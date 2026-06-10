/**
 * THIÊN BÀN — Star Database
 * Miếu Hãm từ sách: Tử Vi Đẩu Số Toàn Thư (Vũ Tài Lục dịch)
 * Luận giải từ sách gốc Hi Di Trần Đoàn
 */
'use strict';

// ─── MIẾU HÃM 14 CHÍNH TINH (trực tiếp từ sách) ───
// Trang 897: "Tử Vi miếu Dần Ngọ; vượng Thân Hợi Thìn Tị Tý Sửu Mùi; không có hãm địa"
// Trang 1015: "Tý Ngọ là miếu địa của Thiên Cơ; bình thường Tị Hợi Thìn Tuất; hãm Sửu Mùi"
// Trang 1088: "Thái Dương miếu Ngọ Mão; vượng Dần Thìn Tị; hãm Tuất Hợi Tý"
// Trang 1159: "Vũ Khúc miếu Sửu Mùi Tuất; vượng Tý Ngọ; bình thường Tị Hợi"
// Trang 1206: "Thiên Đồng miếu Tị Hợi; vượng Tý Thân; hãm Ngọ Sửu Mùi Dậu"
// Trang 1230: "Liêm Trinh miếu Dần Thân; bình thường Tý Ngọ Thìn Tuất Sửu Mùi; hãm Tị Hợi Mão Dậu"
// Trang 1287: "Thiên Phủ miếu Tý Sửu Dần Mùi; vượng Ngọ Mão Thìn Tuất; bình thường Dậu Tị Thân Hợi"
// Trang 1315-1322: "Thái Âm miếu Dậu Hợi Tuất; vượng Tý Sửu; hãm Ngọ Dần Thìn Tị Mão"
// Trang 1370: "Tham Lang miếu Thìn Tuất Sửu Mùi; vượng Tý Ngọ; hãm Tị Hợi Mão"
// Trang 1438: "Cự Môn miếu Mão Dậu Dần Thân; vượng Tý Ngọ Hợi; hãm Tị Thìn Tuất Sửu Mùi"
// Trang 1500: "Thiên Tướng miếu Tý Ngọ Dần Thân; đắc Tị Hợi Sửu Mùi; hãm Mão Dậu Thìn Tuất"
// Trang 1576: "Thiên Lương miếu Tuất Thìn Ngọ; vượng Sửu Mùi Tý Mão Dần Thân; hãm Tị Hợi Dậu"
// Trang 1650: "Thất Sát miếu Dần Thân Tý Ngọ; bình Mão Dậu Sửu Mùi Tị Hợi; vô hãm địa"
// Trang 1715: "Phá Quân miếu Tý Ngọ; vượng Thìn Tuất Sửu Mùi; hãm Tị Hợi Dần Thân Mão Dậu"

const MIEU_HAM = {
  'Tử Vi':      { mieu:[2,6],    vuong:[8,11,4,5,0,1,7], ham:[] },
  'Thiên Cơ':   { mieu:[0,6],    vuong:[],  binh:[5,11,4,10], ham:[1,7] },
  'Thái Dương': { mieu:[6,3],    vuong:[2,4,5], ham:[10,11,0] },
  'Vũ Khúc':    { mieu:[1,7,10], vuong:[0,6],   binh:[5,11],  ham:[] },
  'Thiên Đồng': { mieu:[5,11],   vuong:[0,8],   ham:[6,1,7,9] },
  'Liêm Trinh': { mieu:[2,8],    binh:[0,6,4,10,1,7], ham:[5,11,3,9] },
  'Thiên Phủ':  { mieu:[0,1,2,7],vuong:[6,3,4,10], binh:[9,5,8,11], ham:[] },
  'Thái Âm':    { mieu:[9,11,10],vuong:[0,1],   ham:[6,2,4,5,3] },
  'Tham Lang':  { mieu:[4,10,1,7],vuong:[0,6],  ham:[5,11,3] },
  'Cự Môn':     { mieu:[3,9,2,8], vuong:[0,6,11],ham:[5,4,10,1,7] },
  'Thiên Tướng':{ mieu:[0,6,2,8], dac:[5,11,1,7],ham:[3,9,4,10] },
  'Thiên Lương':{ mieu:[10,4,6],  vuong:[1,7,0,3,2,8], ham:[5,11,9] },
  'Thất Sát':   { mieu:[2,8,0,6], binh:[3,9,1,7,5,11], ham:[] },
  'Phá Quân':   { mieu:[0,6],     vuong:[4,10,1,7], ham:[5,11,2,8,3,9] }
};

window.getMieuHam = function(name, cung) {
  const t = MIEU_HAM[name];
  if (!t) return '';
  if (t.mieu && t.mieu.includes(cung)) return 'Miếu';
  if (t.vuong && t.vuong.includes(cung)) return 'Vượng';
  if (t.dac && t.dac.includes(cung)) return 'Đắc';
  if (t.binh && t.binh.includes(cung)) return 'Bình';
  if (t.ham && t.ham.includes(cung)) return 'Hãm';
  return 'Đắc';
};

// ─── LUẬN GIẢI SAO (từ sách) ───
window.STAR_INFO = {
  'Tử Vi': {
    hanh: 'Thổ', nhom: 'Chính Diệu', amduong: 'Dương',
    icon: '☯', color: '#FFD97D',
    tomtat: 'Đế Tọa tinh — chủ về quyền quý, địa vị, phúc thọ. Sao chủ lĩnh của toàn lá số.',
    cachdoan: [
      'Miếu vượng: quyền quý, được người tôn trọng, lãnh đạo giỏi',
      'Hội Tả Hữu Xương Khúc Khôi Việt Lộc Tồn: phú quý vô song',
      'Gặp Tứ Sát xung phá: thành bại bất thường, nhiều trắc trở',
      'Tử Vi không có hãm địa vì tự giải cứu được'
    ],
    phu: 'Tử Vi là đế tọa, có thể giáng phúc tiêu tai ở các cung, hoá giải tính ác hư của các sao hung.'
  },
  'Thiên Cơ': {
    hanh: 'Mộc', nhom: 'Chính Diệu', amduong: 'Âm',
    icon: '⚙', color: '#74C0FC',
    tomtat: 'Mưu trí tinh — chủ về thông minh, mưu lược, biến động. Ưa di chuyển.',
    cachdoan: [
      'Miếu Tý Ngọ: thông minh xuất chúng, mưu lược cao siêu',
      'Hội Thiên Lương: người tu hành, triết học, tôn giáo',
      'Hãm Sửu Mùi gặp Tứ Sát: bôn ba, lao đao, đổi thay nhiều',
      'Thiên Cơ ưa biến động, mệnh có Cơ thường thay đổi nghề nghiệp'
    ],
    phu: 'Thiên Cơ là sao mưu trí, miếu ở Tý Ngọ, hãm ở Sửu Mùi.'
  },
  'Thái Dương': {
    hanh: 'Hỏa', nhom: 'Chính Diệu', amduong: 'Dương',
    icon: '☀', color: '#FFA94D',
    tomtat: 'Nhật tinh — chủ về danh dự, công danh, phụ thân, anh em. Biểu tượng của ánh sáng.',
    cachdoan: [
      'Miếu Ngọ Mão: quý hiển, danh vọng lớn, được người tôn trọng',
      'Vượng Dần Thìn Tị: công danh phát đạt, thuận lợi',
      'Hãm Tuất Hợi Tý: cha mất sớm, công danh trắc trở, mờ nhạt',
      'Nam mệnh quan trọng hơn nữ mệnh với sao này'
    ],
    phu: 'Thái Dương miếu địa Ngọ Mão, vượng địa Dần Thìn Tị, hãm Tuất Hợi Tý.'
  },
  'Vũ Khúc': {
    hanh: 'Kim', nhom: 'Chính Diệu', amduong: 'Âm',
    icon: '💰', color: '#A8FF78',
    tomtat: 'Tài Tinh — chủ về tiền bạc, sự nghiệp, ý chí cứng rắn. Sao cô đơn với nữ mệnh.',
    cachdoan: [
      'Miếu Sửu Mùi Tuất: giàu có, uy danh lẫy lừng, sự nghiệp vững chắc',
      'Hội Thiên Phủ hoặc Lộc Tồn: giàu to, tích lũy được nhiều',
      'Vũ Khúc Phá Quân: bôn ba, đổi thay, cuộc đời sóng gió',
      'Nữ mệnh Vũ Khúc: sao cô độc, dễ cô quả hoặc khuất phục chồng'
    ],
    phu: 'Vũ Khúc miếu địa Sửu Mùi Tuất, vượng Tý Ngọ.'
  },
  'Thiên Đồng': {
    hanh: 'Thủy Kim', nhom: 'Chính Diệu', amduong: 'Dương',
    icon: '🌊', color: '#74C0FC',
    tomtat: 'Phúc tinh — chủ về phúc thọ, nhàn hạ, hưởng thụ. Người có mệnh Thiên Đồng thường hưởng phúc.',
    cachdoan: [
      'Miếu Tị Hợi: phúc hậu, nhàn hạ, sống thọ hưởng phúc',
      'Vượng Tý Thân: xuất ngoại tay trắng làm nên',
      'Hãm Ngọ Sửu Mùi Dậu: lao khổ, bôn ba, ít phúc',
      'Thiên Đồng ưa Nhật Nguyệt, Văn Xương làm tá'
    ],
    phu: 'Thiên Đồng là phúc tinh, miếu Tị Hợi, hãm Ngọ Sửu Mùi Dậu.'
  },
  'Liêm Trinh': {
    hanh: 'Hỏa', nhom: 'Chính Diệu', amduong: 'Âm',
    icon: '⚔', color: '#FF6B6B',
    tomtat: 'Thứ Tướng tinh — chủ về pháp luật, quan sự, thị phi. Có tính cứng rắn, dễ phạm tội tù.',
    cachdoan: [
      'Miếu Dần Thân: văn võ song toàn, uy danh lẫy lừng',
      'Hãm Tị Hợi Mão Dậu: dễ phạm tù tội, thị phi, tai họa',
      'Liêm Trinh Phá Quân gặp Tứ Sát: đại hung, nguy hiểm tính mạng',
      'Liêm Trinh Thất Sát miếu vượng: giàu có, tích phú vi nhân'
    ],
    phu: 'Liêm Trinh miếu Dần Thân, hãm Tị Hợi Mão Dậu. Chủ về quan sự, hình pháp.'
  },
  'Thiên Phủ': {
    hanh: 'Thổ', nhom: 'Chính Diệu', amduong: 'Dương',
    icon: '🏛', color: '#FFD97D',
    tomtat: 'Nam Đẩu đệ nhất tinh — chủ về tài lộc, điền trạch, phúc thọ. Sao của sự giàu có bền vững.',
    cachdoan: [
      'Miếu Tý Sửu Dần Mùi: giàu có, phúc hậu, điền trạch rộng',
      'Vượng Ngọ Mão Thìn Tuất: văn võ đều hay, quyền quý',
      'Hội Tử Vi: quyền quý danh lợi lưỡng toàn',
      'Gặp Không Kiếp Tứ Sát: cô lập, tài lộc giảm sút'
    ],
    phu: 'Thiên Phủ miếu Tý Sửu Dần Mùi, vượng Ngọ Mão Thìn Tuất. Chủ về tài bạch điền trạch.'
  },
  'Thái Âm': {
    hanh: 'Thủy', nhom: 'Chính Diệu', amduong: 'Âm',
    icon: '🌙', color: '#B78FFF',
    tomtat: 'Nguyệt tinh — chủ về tài phú, mẫu thân, vợ. Sao của sự êm đềm, nhu mì.',
    cachdoan: [
      'Miếu Dậu Hợi Tuất: giàu có, hưởng phúc, vợ đẹp hiền',
      'Vượng Tý Sửu: tài phú, êm đềm, phú quý',
      'Hãm Ngọ Dần Thìn Tị Mão: tài lộc kém, hôn nhân trắc trở',
      'Thái Âm ưa ban đêm sinh, ban ngày sinh tính hơi giảm'
    ],
    phu: 'Thái Âm miếu Dậu Hợi Tuất, vượng Tý Sửu, hãm Ngọ Dần Thìn Tị Mão.'
  },
  'Tham Lang': {
    hanh: 'Thủy Mộc', nhom: 'Chính Diệu', amduong: 'Dương',
    icon: '🐉', color: '#4ECDB4',
    tomtat: 'Bắc Đẩu tinh — chủ về dục vọng, đa tài, phú quý muộn. Sao của sự biến ảo.',
    cachdoan: [
      'Miếu Thìn Tuất Sửu Mùi (Tứ Mộ): giàu to, phát muộn nhưng bền',
      'Vượng Tý Ngọ: tài năng đa dạng, sự nghiệp thành công',
      'Hãm Tị Hợi Mão: bôn ba, đa dục, dễ sa vào tệ nạn',
      'Tham Lang nhập miếu thọ nguyên thần (sống thọ)'
    ],
    phu: 'Tham Lang miếu Thìn Tuất Sửu Mùi, vượng Tý Ngọ.'
  },
  'Cự Môn': {
    hanh: 'Thủy', nhom: 'Chính Diệu', amduong: 'Âm',
    icon: '💬', color: '#74C0FC',
    tomtat: 'Ám tinh — chủ về thị phi, khẩu thiệt, tài năng ngôn ngữ. Sao của sự tranh cãi.',
    cachdoan: [
      'Miếu Mão Dậu Dần Thân: tài năng ngôn ngữ, đàm phán giỏi',
      'Vượng Tý Ngọ Hợi: nói năng khéo léo, thành công qua miệng lưỡi',
      'Hãm Tị Thìn Tuất Sửu Mùi: nhiều thị phi, miệng lưỡi gây họa',
      'Cự Môn Thiên Cơ: thầy kiện, nhà tranh biện, luật sư'
    ],
    phu: 'Cự Môn miếu Mão Dậu Dần Thân, vượng Tý Ngọ Hợi, hãm Tị Thìn Tuất Sửu Mùi.'
  },
  'Thiên Tướng': {
    hanh: 'Thủy', nhom: 'Chính Diệu', amduong: 'Dương',
    icon: '🛡', color: '#74C0FC',
    tomtat: 'Ấn Tinh — chủ về ấn tín, quyền uy, phúc lộc. Sao bảo hộ, trợ giúp.',
    cachdoan: [
      'Miếu Tý Ngọ Dần Thân: văn võ đều hay, thực lộc thiên chung',
      'Đắc Tị Hợi Sửu Mùi: phúc lộc, được cấp trên giúp đỡ',
      'Hãm Mão Dậu Thìn Tuất: thành bại vô thường, ít được trợ giúp',
      'Thiên Tướng đi cặp Thiên Phủ Thiên Lương: quyền quý'
    ],
    phu: 'Thiên Tướng miếu Tý Ngọ Dần Thân, đắc Tị Hợi Sửu Mùi, hãm Mão Dậu.'
  },
  'Thiên Lương': {
    hanh: 'Thổ', nhom: 'Chính Diệu', amduong: 'Dương',
    icon: '⚖', color: '#FFD97D',
    tomtat: 'Âm Phúc tinh — chủ về phúc thọ, giải nạn, y dược. Sao của sự trường thọ và đạo đức.',
    cachdoan: [
      'Miếu Tuất Thìn Ngọ: phúc thọ, đức độ, giải nạn cho người',
      'Vượng Sửu Mùi Tý Mão Dần Thân: bình sinh phúc thọ',
      'Hãm Tị Hợi Dậu: chán trần tục, thích tu hành',
      'Thiên Lương Thiên Cơ hội Văn Xương Tả Hữu: quan tư thanh hiển'
    ],
    phu: 'Thiên Lương miếu Tuất Thìn Ngọ. Cư Ngọ vi quan tư thanh hiển triều đường.'
  },
  'Thất Sát': {
    hanh: 'Hỏa Kim', nhom: 'Chính Diệu', amduong: 'Dương',
    icon: '⚡', color: '#FF6B6B',
    tomtat: 'Tướng tinh — chủ về uy quyền, chinh phạt. Hung mạnh nhưng có thể thành đại tướng.',
    cachdoan: [
      'Miếu Dần Thân Tý Ngọ: uy danh lẫy lừng, tước lộc vinh xương',
      'Bình thường: sóng gió nhưng có thể thành công',
      'Vô hãm địa — sách ghi "Thất Sát thuủ thân chung thị yểu" là câu nói bị tam sao thất bổn',
      'Thất Sát Phá Quân Tham Lang: Sát Phá Lang, cách bôn ba lập nghiệp'
    ],
    phu: 'Thất Sát miếu Dần Thân Tý Ngọ, vô hãm địa.'
  },
  'Phá Quân': {
    hanh: 'Thủy', nhom: 'Chính Diệu', amduong: 'Âm',
    icon: '💥', color: '#FF6B6B',
    tomtat: 'Hao Tinh — chủ về phá hoại, cải cách, đổi thay. Hung mạnh nhưng miếu vượng có thể thành công lớn.',
    cachdoan: [
      'Miếu Tý Ngọ: quan tư thanh hiển, làm tới vị tam công',
      'Vượng Thìn Tuất Sửu Mùi: phát tài, sự nghiệp qua đổi thay',
      'Hãm Tị Hợi Dần Thân Mão Dậu: hao tán, phá bại, giang hồ lưu lạc',
      'Phá Quân Vũ Khúc: bôn ba, đổi thay nghề nghiệp nhiều lần'
    ],
    phu: 'Phá Quân miếu Tý Ngọ, vượng Thìn Tuất Sửu Mùi, hãm Tị Hợi Dần Thân Mão Dậu.'
  },
  // Phụ tinh
  'Lộc Tồn': {
    hanh: 'Thổ', nhom: 'Phụ Tinh', amduong: 'Dương',
    icon: '💎', color: '#A8FF78',
    tomtat: 'Bắc Đẩu tinh — chủ về phú quý, tước lộc, thọ khảo. Sao tốt nhất trong phụ tinh.',
    cachdoan: [
      'Thủ Mệnh hoặc Tài Bạch Điền Trạch: giàu có suốt đời',
      'Lộc Tồn Thiên Mã (Lộc Mã giao trì): phát tài phương xa',
      'Song Lộc (Lộc Tồn + Hóa Lộc): phú quý song toàn, bà Lã Hậu chuyên quyền',
      'Lộc Tồn gặp Không Kiếp Hỏa Linh: tài lộc bị hao tán'
    ],
    phu: 'Lộc Tồn Bắc Đẩu tinh, thuộc hành thổ. Thập nhị cung đều là miếu địa.'
  },
  'Kình Dương': {
    hanh: 'Kim', nhom: 'Thiên Diệu', amduong: 'Dương',
    icon: '⚔', color: '#FF6B6B',
    tomtat: 'Hung tinh — chủ về xung phá, tranh đấu. Hung nhưng miếu vượng có thể thành tướng.',
    cachdoan: [
      'Mệnh có Kình Dương: tính cứng rắn, hay tranh đấu',
      'Kình Dương độc thủ: cô đơn, hay tai nạn thương tích',
      'Gặp sao tốt hội chiếu: uy dũng, làm tướng quân',
      'Kình Dương Hóa Kị: đại hung, thị phi nhiều'
    ],
    phu: 'Kình Dương thuộc Kim, là Dương Nhận, hung tinh đứng đầu.'
  },
  'Đà La': {
    hanh: 'Kim', nhom: 'Thiên Diệu', amduong: 'Âm',
    icon: '🔩', color: '#FF6B6B',
    tomtat: 'Hung tinh — chủ về trở ngại, chậm trễ, ám hại. Hung nhẹ hơn Kình Dương.',
    cachdoan: [
      'Đà La chủ về sự trì trệ, cù lần, chậm thành công',
      'Mệnh có Đà La: hay bị ám hại, ngầm phá',
      'Dương Đà gặp nhau: hung mạnh hơn',
      'Đà La gặp sao tốt: giảm bớt tác hại'
    ],
    phu: 'Đà La thuộc Kim, hung tinh, chủ về cản trở và ám hại.'
  },
  'Hỏa Tinh': {
    hanh: 'Hỏa', nhom: 'Thiên Diệu', amduong: 'Dương',
    icon: '🔥', color: '#FF6B6B',
    tomtat: 'Tứ Sát hung tinh — chủ về đột biến, tai nạn, bệnh tật. Hung mạnh.',
    cachdoan: [
      'Hỏa Tinh độc thủ: đột biến, tai nạn bất ngờ',
      'Hỏa Tinh Lộc Tồn: hao tán tài lộc',
      'Hỏa Tinh Tử Vi: giảm uy quyền của Tử Vi',
      'Hỏa Linh đi cặp: hung mạnh hơn'
    ],
    phu: 'Hỏa Tinh thuộc Hỏa, Tứ Sát hung tinh, chủ đột biến hung.'
  },
  'Linh Tinh': {
    hanh: 'Hỏa', nhom: 'Thiên Diệu', amduong: 'Âm',
    icon: '⚡', color: '#FF6B6B',
    tomtat: 'Tứ Sát hung tinh — chủ về bí mật, âm mưu, tai họa ngầm.',
    cachdoan: [
      'Linh Tinh chủ về tai họa âm thầm, bệnh tật',
      'Linh Tinh Lộc Tồn: tài lộc bị hao tán âm thầm',
      'Hỏa Linh đi cặp: hung mạnh, phá cách nhiều',
      'Gặp sao tốt nhiều: giảm bớt tác hại'
    ],
    phu: 'Linh Tinh thuộc Hỏa, Tứ Sát hung tinh, chủ tai họa ngầm.'
  },
  'Văn Xương': {
    hanh: 'Kim', nhom: 'Phụ Tinh', amduong: 'Dương',
    icon: '📜', color: '#74C0FC',
    tomtat: 'Văn tinh — chủ về khoa bảng, học vấn, văn chương. Sao tốt cho học hành thi cử.',
    cachdoan: [
      'Văn Xương miếu Tị Dậu Sửu: khoa bảng, thi cử đậu đạt',
      'Hội Tử Vi Thiên Lương: quan tư thanh hiển',
      'Xương Khúc cùng cung: văn tài xuất chúng',
      'Hóa Kị Văn Xương: học hành trắc trở, giấy tờ gặp rắc rối'
    ],
    phu: 'Văn Xương chủ về khoa bảng thi cử. Miếu Tị Dậu Sửu.'
  },
  'Văn Khúc': {
    hanh: 'Thủy', nhom: 'Phụ Tinh', amduong: 'Âm',
    icon: '🎵', color: '#74C0FC',
    tomtat: 'Văn tinh — chủ về nghệ thuật, âm nhạc, tài hoa. Thiên về văn nghệ hơn khoa bảng.',
    cachdoan: [
      'Văn Khúc miếu Thìn Tuất Sửu Mùi: tài hoa, nghệ thuật',
      'Xương Khúc cùng cung: tài hoa phi thường',
      'Văn Khúc Hóa Kị: tài nghệ bị phá, nhiều trắc trở',
      'Tân Can Văn Khúc Hóa Lộc: tài nghệ nổi tiếng'
    ],
    phu: 'Văn Khúc thiên về nghệ thuật âm nhạc, bổ sung cho Văn Xương.'
  },
  'Tả Phù': {
    hanh: 'Thổ', nhom: 'Phụ Tinh', amduong: 'Dương',
    icon: '🤝', color: '#74C0FC',
    tomtat: 'Cát tinh — chủ về quý nhân trợ giúp, bề trên che chở. Sao được phù trợ.',
    cachdoan: [
      'Tả Phù Hữu Bật cùng cung Mệnh: quyền quý, được trợ giúp nhiều',
      'Giáp Mệnh (Tả Hữu hai bên): được nhiều người phù trợ',
      'Tả Phù không ưa Không Kiếp',
      'Nhâm Can Tả Phù Hóa Khoa: quý nhân phù trợ mạnh'
    ],
    phu: 'Tả Phù là phụ tinh cát, chủ về quý nhân trợ giúp từ bên trên.'
  },
  'Hữu Bật': {
    hanh: 'Thủy', nhom: 'Phụ Tinh', amduong: 'Âm',
    icon: '🤝', color: '#74C0FC',
    tomtat: 'Cát tinh — chủ về bạn bè phù trợ, đồng liêu giúp đỡ. Đi cặp với Tả Phù.',
    cachdoan: [
      'Tả Hữu hội mệnh: quyền quý, được nhiều người ủng hộ',
      'Giáp Tả Hữu: tay vịn vững chắc, cuộc đời bình ổn',
      'Mậu Can Hữu Bật Hóa Khoa: bạn bè, đồng liêu giúp đỡ',
      'Hữu Bật Thiên Tướng: phúc lai lâm'
    ],
    phu: 'Hữu Bật là phụ tinh cát, chủ về bạn bè, đồng liêu phù trợ.'
  },
  'Thiên Khôi': {
    hanh: 'Hỏa', nhom: 'Thiên Diệu', amduong: 'Dương',
    icon: '👑', color: '#FFD97D',
    tomtat: 'Quý nhân tinh — được bề trên thiên vị, giúp đỡ. Sao của may mắn quý nhân.',
    cachdoan: [
      'Khôi Việt hội Mệnh: quý nhân nhiều, được chiều chuộng',
      'Khôi Việt Xương Khúc Lộc Tồn: phú quý đến bậc đại thần',
      'Là thiên ất quý nhân của Tử Vi',
      'Nam mệnh đặc biệt tốt với Thiên Khôi'
    ],
    phu: 'Thiên Khôi là Thiên Ất Quý Nhân, phúc thọ, được quý nhân chiếu cố.'
  },
  'Thiên Việt': {
    hanh: 'Hỏa', nhom: 'Thiên Diệu', amduong: 'Âm',
    icon: '👑', color: '#FFD97D',
    tomtat: 'Quý nhân tinh âm — được người dưới, người đồng lứa giúp đỡ. Đi cặp Thiên Khôi.',
    cachdoan: [
      'Khôi Việt hội Mệnh Thân: quý nhân nhiều phía',
      'Nữ mệnh đặc biệt tốt với Thiên Việt',
      'Việt Đà tiếng nói khoan thai (âm giọng đẹp)',
      'Giáp Bát Tọa Tam Thai: sớm dự lâu đài nghenh ngang'
    ],
    phu: 'Thiên Việt là Thái Ất Quý Nhân, đi cặp Thiên Khôi.'
  },
  'Thiên Mã': {
    hanh: 'Hỏa', nhom: 'Phụ Tinh', amduong: 'Dương',
    icon: '🐎', color: '#A8FF78',
    tomtat: 'Động tinh — chủ về di chuyển, bôn ba, phát tài phương xa. Cần Lộc Tồn làm cặp.',
    cachdoan: [
      'Thiên Mã thủ Mệnh: nhiều di chuyển, ít ở nhà',
      'Lộc Mã giao trì (Lộc Tồn + Thiên Mã): phát tài phương xa',
      'Thiên Mã gặp Triệt Tuần: bị cản trở, xe ngựa gãy bánh',
      'Vũ Khúc Thiên Mã: giàu có nơi xa'
    ],
    phu: 'Thiên Mã chủ về di chuyển. Lộc Mã giao trì phát tài viễn quận.'
  },
  'Địa Không': {
    hanh: 'Hỏa', nhom: 'Hung Tinh', amduong: 'Dương',
    icon: '🌑', color: '#FF6B6B',
    tomtat: 'Hung tinh — chủ về hao tán, trống không. Khắc Lộc Tồn, phá tài cách.',
    cachdoan: [
      'Không Kiếp đồng cung: đại hung, tài cách bị phá',
      'Địa Không Lộc Tồn: song hoa cái (tài bị phá sạch)',
      'Không Kiếp Tị Hợi: công danh phát đạt (trường hợp đặc biệt)',
      'Mệnh có Không Kiếp: dễ trắng tay, hư vô'
    ],
    phu: 'Địa Không thuộc Hỏa, hung tinh, hao tán tài lộc.'
  },
  'Địa Kiếp': {
    hanh: 'Hỏa', nhom: 'Hung Tinh', amduong: 'Âm',
    icon: '🌑', color: '#FF6B6B',
    tomtat: 'Hung tinh — chủ về kiếp đoạt, cướp phá. Đi cặp Địa Không.',
    cachdoan: [
      'Địa Kiếp Địa Không cùng cung: đại hung',
      'Địa Kiếp Lộc Tồn: tài lộc bị kiếp đoạt',
      'Mệnh có Địa Kiếp: hay bị mất mát, bị người lấy đi',
      'Gặp sao tốt nhiều: có thể hóa giải'
    ],
    phu: 'Địa Kiếp thuộc Hỏa, hung tinh, kiếp đoạt tài lộc.'
  },
  'Hồng Loan': {
    hanh: 'Thủy', nhom: 'Tạp Tinh', amduong: 'Âm',
    icon: '💕', color: '#FF6B8A',
    tomtat: 'Đào hoa tinh — chủ về hôn nhân, ái tình, nhan sắc. Sao của hỷ sự.',
    cachdoan: [
      'Hồng Loan Thiên Hỷ hội Mệnh: năm có hỷ sự (cưới hỏi, sinh con)',
      'Hồng Loan miếu Dần Mão Tý Hợi: nhan sắc tốt, hôn nhân thuận',
      'Hồng Loan hãm gặp sát: tình duyên trắc trở, đa đoan',
      'Lưu niên gặp Hồng Loan: năm đó dễ có hỷ sự'
    ],
    phu: 'Hồng Loan chủ hôn nhân ái tình. Miếu Dần Mão Tý Hợi.'
  },
  'Thiên Hỷ': {
    hanh: 'Thủy', nhom: 'Tạp Tinh', amduong: 'Dương',
    icon: '🎊', color: '#FF6B8A',
    tomtat: 'Đào hoa tinh — đối cung Hồng Loan. Chủ về hỷ sự, vui mừng.',
    cachdoan: [
      'Thiên Hỷ hội Mệnh: nhiều hỷ sự, vui vẻ',
      'Thiên Hỷ Hồng Loan cùng cung Mệnh: hôn nhân tốt đẹp',
      'Đi cặp Hồng Loan: xét hỷ sự quan trọng',
      'Lưu niên Thiên Hỷ chiếu Mệnh: năm đó có tin vui'
    ],
    phu: 'Thiên Hỷ đối cung Hồng Loan, chủ về hỷ sự vui mừng.'
  },
  'Thiên Hình': {
    hanh: 'Hỏa', nhom: 'Tạp Tinh', amduong: 'Dương',
    icon: '⚖', color: '#FF9F43',
    tomtat: 'Hình tinh — chủ về hình pháp, tù ngục, quan sự. Sao của pháp luật.',
    cachdoan: [
      'Thiên Hình thủ Mệnh: liên quan nghề pháp luật, y tế, quân sự',
      'Thiên Hình Liêm Trinh: dễ phạm tù tội',
      'Thiên Hình Thất Sát: vũ dũng, sát phạt',
      'Thiên Hình lưu niên chiếu Mệnh: năm đó dễ kiện tụng'
    ],
    phu: 'Thiên Hình chủ hình pháp, tù ngục. Từ Dậu thuận theo tháng.'
  },
  'Thiên Đức': {
    hanh: 'Thổ', nhom: 'Tạp Tinh', amduong: 'Dương',
    icon: '✨', color: '#FFD97D',
    tomtat: 'Đức tinh — chủ về phúc đức, giải tai ách. Sao cát trợ giúp giải nạn.',
    cachdoan: [
      'Thiên Đức Thiên Nguyệt Đức hội Mệnh: phúc đức dày, giải nạn',
      'Gặp hung tinh: Thiên Đức giảm bớt tác hại',
      'Thiên Đức cung Phúc Đức: người có âm đức nhiều',
      'Lưu niên Thiên Đức: năm đó được giải nạn'
    ],
    phu: 'Thiên Đức chủ về phúc đức, giải tai ách.'
  },
  'Long Trì': {
    hanh: 'Thủy', nhom: 'Tạp Tinh', amduong: 'Dương',
    icon: '🐉', color: '#4ECDB4',
    tomtat: 'Cát tinh — chủ về tài hoa, văn chương, danh tiếng.',
    cachdoan: [
      'Long Trì Phượng Các hội Mệnh: văn tài xuất chúng',
      'Hội Xương Khúc: viết lách giỏi, nổi tiếng',
      'Long Trì miếu Thìn (Long cư Long vị): đặc cách',
      'Cát tinh, ít gây tác hại'
    ],
    phu: 'Long Trì chủ văn tài, danh tiếng. Từ Thìn thuận theo ngày.'
  },
  'Phượng Các': {
    hanh: 'Mộc Kim', nhom: 'Tạp Tinh', amduong: 'Âm',
    icon: '🦅', color: '#4ECDB4',
    tomtat: 'Cát tinh — chủ về tài hoa, văn nghệ, nhan sắc. Đi cặp Long Trì.',
    cachdoan: [
      'Long Trì Phượng Các cùng cung Mệnh: tài hoa, thanh lịch',
      'Phượng Các miếu Dậu (Phụng cư Kim hương): đặc cách đẹp',
      'Hội Xương Khúc Tả Hữu: tài văn nghệ xuất sắc',
      'Cát tinh, hỗ trợ nhan sắc và tài hoa'
    ],
    phu: 'Phượng Các chủ văn nghệ, nhan sắc. Đi cặp Long Trì.'
  },
  'Cô Thần': {
    hanh: 'Hỏa', nhom: 'Tạp Tinh', amduong: 'Dương',
    icon: '🕯', color: '#A9B8CC',
    tomtat: 'Cô độc tinh — chủ về cô đơn, lẻ loi, xa cách người thân.',
    cachdoan: [
      'Cô Thần Quả Tú cùng Mệnh: cô đơn, ít người thân',
      'Nam mệnh Cô Thần: xa cha mẹ hoặc khắc vợ',
      'Cô Thần hội hung tinh: cô độc hơn',
      'An ở Tứ Mã: Dần Thân Tị Hợi'
    ],
    phu: 'Cô Thần chủ về cô đơn, lẻ loi. An ở Tứ Mã cung.'
  },
  'Quả Tú': {
    hanh: 'Hỏa', nhom: 'Tạp Tinh', amduong: 'Âm',
    icon: '🕯', color: '#A9B8CC',
    tomtat: 'Cô độc tinh — chủ về góa bụa, cô đơn. Tương tự Cô Thần nhưng dành cho nữ.',
    cachdoan: [
      'Quả Tú thủ Mệnh nữ: dễ góa bụa hoặc không chồng',
      'Cô Quả cùng Mệnh: rất cô đơn',
      'Gặp Hóa Kị hoặc hung tinh: tăng tính cô độc',
      'An ở Tứ Mộ: Thìn Tuất Sửu Mùi'
    ],
    phu: 'Quả Tú chủ về góa bụa, cô đơn. An ở Tứ Mộ cung.'
  },
  'Thiên Khốc': {
    hanh: 'Kim', nhom: 'Tạp Tinh', amduong: 'Âm',
    icon: '😢', color: '#A9B8CC',
    tomtat: 'Ưu sầu tinh — chủ về đau khổ, than vãn, nước mắt.',
    cachdoan: [
      'Thiên Khốc Thiên Hư cùng Mệnh: nhiều buồn khổ',
      'Hội hung tinh: đau khổ, bi quan',
      'Lưu niên Thiên Khốc: năm đó có chuyện buồn',
      'Mắt tròn Vũ Kị chẳng nhầm một ai (miêu tả diện mạo)'
    ],
    phu: 'Thiên Khốc chủ ưu sầu, đau khổ. Từ Ngọ nghịch theo ngày.'
  },
  'Thiên Hư': {
    hanh: 'Thủy', nhom: 'Tạp Tinh', amduong: 'Dương',
    icon: '💨', color: '#A9B8CC',
    tomtat: 'Không hư tinh — chủ về hư hao, mơ hồ, không thực tế.',
    cachdoan: [
      'Thiên Hư Thiên Khốc cùng Mệnh: sầu khổ, hư hao',
      'Đồng Không Hư Nhẫn lắm lời thị phi',
      'Hội Địa Không Địa Kiếp: hư hao tài lộc',
      'Lưu niên Thiên Hư: năm đó kế hoạch không thành'
    ],
    phu: 'Thiên Hư chủ hư hao, không thực. Từ Ngọ thuận theo ngày.'
  },
  'Đào Hoa': {
    hanh: 'Mộc', nhom: 'Tạp Tinh', amduong: 'Dương',
    icon: '🌸', color: '#FF6B8A',
    tomtat: 'Đào hoa tinh — chủ về tình cảm, nhan sắc, đào hoa. Dễ lụy vì tình.',
    cachdoan: [
      'Đào Hoa thủ Mệnh: nhan sắc, đào hoa nhiều, đa tình',
      'Đào Hoa Hồng Loan: tình duyên phong phú',
      'Đào Hoa gặp hung tinh: lụy vì tình, dễ thất bại vì ái tình',
      'Tham Đào tóc tốt xanh rậm (miêu tả diện mạo)'
    ],
    phu: 'Đào Hoa chủ về tình duyên, nhan sắc.'
  },
  'Tràng Sinh': {
    hanh: 'Thủy', nhom: 'Tràng Sinh', amduong: 'Dương',
    icon: '🌱', color: '#B78FFF',
    tomtat: 'Đất sống của ngũ hành — nhiều tài cán, sớm thành công, hạnh phúc vô cùng.',
    cachdoan: ['Mệnh có Tràng Sinh: tài năng, được nhiều người ủng hộ', 'Đại vận Tràng Sinh: vận tốt, nhiều cơ hội mới'],
    phu: 'Tràng Sinh là đất sống, gặp Tràng Sinh là người nhiều tài cán.'
  },
  'Mộc Dục': {
    hanh: 'Thủy', nhom: 'Tràng Sinh', amduong: 'Âm',
    icon: '🌊', color: '#B78FFF',
    tomtat: 'Giai đoạn tắm rửa, còn non nớt — đàn ông cô độc khắc cha mẹ; đàn bà phá bại nhà mình.',
    cachdoan: ['Mộc Dục thủ Mệnh: thay đổi nhiều, khó ổn định', 'Đại vận Mộc Dục: nhiều thay đổi, không ổn định'],
    phu: 'Mộc Dục là giai đoạn non nớt, dễ bị tổn thương.'
  },
  'Lâm Quan': {
    hanh: 'Mộc', nhom: 'Tràng Sinh', amduong: 'Dương',
    icon: '🌲', color: '#B78FFF',
    tomtat: 'Giai đoạn biết đội mũ lập nghiệp — ban đầu bần hàn, càng về sau càng quý hiển.',
    cachdoan: ['Mệnh Lâm Quan: nghị lực cao, cuộc đời đi lên', 'Lâm Quan = Lộc Kiến của vòng Tràng Sinh'],
    phu: 'Lâm Quan còn gọi là Lộc Kiến, giai đoạn cực thịnh của Lộc Tồn.'
  },
  'Đế Vượng': {
    hanh: 'Kim', nhom: 'Tràng Sinh', amduong: 'Dương',
    icon: '👑', color: '#B78FFF',
    tomtat: 'Giai đoạn cực thịnh — công thành danh toại, đang hưởng vinh hoa.',
    cachdoan: ['Mệnh Đế Vượng: quyền uy tột đỉnh', 'Đại vận Đế Vượng: giai đoạn thành công nhất'],
    phu: 'Đế Vượng là giai đoạn đỉnh cao của vòng Tràng Sinh.'
  },
};

window.STAR_INFO = window.STAR_INFO || {};

// Bổ sung các sao phụ còn thiếu
Object.assign(window.STAR_INFO, {
  'Tam Thai': {
    hanh: 'Thổ', nhom: 'Tạp Tinh', amduong: 'Dương', icon: '🌟', color: '#B78FFF',
    tomtat: 'Văn tinh — chủ về văn chương, tước vị. Sớm dự lâu đài.',
    cachdoan: ['Giáp Bát Tọa Tam Thai: sớm dự lâu đài nghenh ngang', 'Tam Thai miếu Dậu Sửu: tài hoa xuất chúng'],
    phu: 'Tam Thai Bát Tọa chủ về văn chương, chốn thi đình danh vọi vọi cao.'
  },
  'Bát Tọa': {
    hanh: 'Kim', nhom: 'Tạp Tinh', amduong: 'Âm', icon: '🏆', color: '#B78FFF',
    tomtat: 'Vũ tinh — chủ về địa vị, danh vọng. Đi cặp Tam Thai.',
    cachdoan: ['Tam Thai Bát Tọa hội Mệnh: chức tước cao', 'Bát Tọa Thiên Khôi Việt: thăng tiến nhanh'],
    phu: 'Tam Thai Bát Tọa là cặp sao tước vị, chủ về danh tiếng quyền uy.'
  },
  'Thiên Diệu': { hanh:'Hỏa', nhom:'Tạp Tinh', amduong:'Dương', icon:'✨', color:'#FFD97D',
    tomtat: 'Cát tinh nhỏ — chủ về sáng sủa, nhan sắc.', cachdoan:[], phu:'' },
  'Phúc Đức (TS)': { hanh:'Thổ', nhom:'Thái Tuế', amduong:'Dương', icon:'🍀', color:'#A9B8CC',
    tomtat: 'Vòng Thái Tuế — Phúc Đức, cung thứ 10 trong vòng 12 sao Thái Tuế.',
    cachdoan:['Lưu niên gặp vị trí này: may mắn, phúc đức'], phu:'' },
  'Tràng Sinh': { hanh:'Thủy', nhom:'Tràng Sinh', amduong:'Dương', icon:'🌱', color:'#B78FFF',
    tomtat:'Đầu vòng Tràng Sinh — sinh khí mới, tài năng, được phù trợ.',
    cachdoan:['Mệnh có Tràng Sinh: sống lâu, tài cán, nhiều quý nhân'], phu:'Tràng Sinh là đất sinh khí.' },
  'Mộc Dục': { hanh:'Thủy', nhom:'Tràng Sinh', amduong:'Âm', icon:'🛁', color:'#B78FFF',
    tomtat:'Mộc Dục — giai đoạn non nớt, đa dục, dễ thay đổi.',
    cachdoan:['Mộc Dục: đa tình, thay đổi, sóng gió đầu đời'], phu:'Mộc Dục là giai đoạn tắm rửa, còn trẻ non.' },
  'Quan Đới': { hanh:'Mộc', nhom:'Tràng Sinh', amduong:'Dương', icon:'🎓', color:'#B78FFF',
    tomtat:'Quan Đới — tuổi trưởng thành, bắt đầu lập nghiệp.',
    cachdoan:['Vận Quan Đới: bước vào nghề nghiệp, xây dựng sự nghiệp'], phu:'' },
  'Lâm Quan': { hanh:'Mộc', nhom:'Tràng Sinh', amduong:'Dương', icon:'🌲', color:'#B78FFF',
    tomtat:'Lâm Quan (Lộc Kiến) — bắt đầu đỉnh cao, nghị lực, thành đạt.',
    cachdoan:['Mệnh Lâm Quan: đầu đời khó, càng về sau càng thịnh'], phu:'' },
  'Đế Vượng': { hanh:'Kim', nhom:'Tràng Sinh', amduong:'Dương', icon:'👑', color:'#B78FFF',
    tomtat:'Đế Vượng — cực thịnh, quyền uy tột đỉnh.', cachdoan:['Đế Vượng: giai đoạn thành công rực rỡ nhất'], phu:'' },
  'Suy': { hanh:'Thổ', nhom:'Tràng Sinh', amduong:'Âm', icon:'📉', color:'#A9B8CC',
    tomtat:'Suy — bắt đầu đi xuống, dần giảm sút.', cachdoan:['Vận Suy: nên bảo toàn, không nên mạo hiểm'], phu:'' },
  'Bệnh': { hanh:'Thủy', nhom:'Tràng Sinh', amduong:'Âm', icon:'🤒', color:'#A9B8CC',
    tomtat:'Bệnh — sức khỏe yếu, rắc rối.', cachdoan:['Vận Bệnh: chú ý sức khỏe, ít mạo hiểm'], phu:'' },
  'Tử': { hanh:'Thủy', nhom:'Tràng Sinh', amduong:'Âm', icon:'⚰', color:'#7A8BA0',
    tomtat:'Tử — tận cùng, kết thúc, chuyển giao.', cachdoan:['Vận Tử: cẩn thận, tránh liều lĩnh'], phu:'' },
  'Mộ': { hanh:'Thổ', nhom:'Tràng Sinh', amduong:'Âm', icon:'🪦', color:'#7A8BA0',
    tomtat:'Mộ — tàng trữ, thu về, không phát lộ.', cachdoan:['Vận Mộ: tích lũy, không phô trương'], phu:'' },
  'Tuyệt': { hanh:'Mộc', nhom:'Tràng Sinh', amduong:'Dương', icon:'🌑', color:'#7A8BA0',
    tomtat:'Tuyệt — đứt đoạn, chấm dứt hoàn toàn.', cachdoan:['Vận Tuyệt: hay có sự chia xa, đổi thay'], phu:'' },
  'Thai': { hanh:'Kim', nhom:'Tràng Sinh', amduong:'Dương', icon:'🥚', color:'#B78FFF',
    tomtat:'Thai — mầm mống mới, khởi đầu.', cachdoan:['Vận Thai: cơ hội mới bắt đầu hình thành'], phu:'' },
  'Dưỡng': { hanh:'Thổ', nhom:'Tràng Sinh', amduong:'Âm', icon:'🌿', color:'#B78FFF',
    tomtat:'Dưỡng — nuôi dưỡng, tích lũy chờ thời.', cachdoan:['Vận Dưỡng: dưỡng sức, chờ cơ hội tốt'], phu:'' },
  // Vòng Thái Tuế
  'Thái Tuế': { hanh:'Thổ', nhom:'Thái Tuế', amduong:'Dương', icon:'⚡', color:'#FF9F43',
    tomtat:'Thái Tuế — sao hung của năm, gây biến động, thay đổi lớn.',
    cachdoan:['Năm Thái Tuế chiếu Mệnh: không nên khởi sự lớn','Thái Tuế ở cung Quan: thay đổi công việc'], phu:'' },
  'Thiếu Dương': { hanh:'Hỏa', nhom:'Thái Tuế', icon:'🌤', color:'#A9B8CC', tomtat:'Vòng Thái Tuế — Thiếu Dương, vui vẻ nhẹ nhàng.', cachdoan:[], phu:'' },
  'Tang Môn': { hanh:'Mộc', nhom:'Thái Tuế', icon:'😢', color:'#A9B8CC', tomtat:'Tang Môn — sao tang tóc, đau buồn, có người thân mất.',
    cachdoan:['Lưu niên Tang Môn chiếu Mệnh: đề phòng tang tóc'], phu:'' },
  'Thiếu Âm': { hanh:'Thủy', nhom:'Thái Tuế', icon:'🌙', color:'#A9B8CC', tomtat:'Vòng Thái Tuế — Thiếu Âm, êm đềm.', cachdoan:[], phu:'' },
  'Quan Phù': { hanh:'Hỏa', nhom:'Thái Tuế', icon:'⚖', color:'#FF9F43', tomtat:'Quan Phù — kiện tụng, quan sự, rắc rối pháp lý.',
    cachdoan:['Lưu niên Quan Phù: cẩn thận tranh chấp pháp lý'], phu:'' },
  'Tử Phù': { hanh:'Thủy', nhom:'Thái Tuế', icon:'💀', color:'#7A8BA0', tomtat:'Tử Phù — hung sát, nguy hiểm.', cachdoan:[], phu:'' },
  'Tuế Phá': { hanh:'Kim', nhom:'Thái Tuế', icon:'💥', color:'#FF6B6B', tomtat:'Tuế Phá — phá hoại, mất mát tài sản trong năm.',
    cachdoan:['Lưu niên Tuế Phá: tránh đầu tư lớn'], phu:'' },
  'Long Đức': { hanh:'Thổ', nhom:'Thái Tuế', icon:'🐉', color:'#4ECDB4', tomtat:'Long Đức — may mắn, phúc lộc đến.', cachdoan:[], phu:'' },
  'Bạch Hổ': { hanh:'Kim', nhom:'Thái Tuế', icon:'🐯', color:'#FF9F43', tomtat:'Bạch Hổ — hung sát, tai nạn, thương tích.',
    cachdoan:['Lưu niên Bạch Hổ chiếu Thân Mệnh: cẩn thận tai nạn'], phu:'' },
  'Điếu Khách': { hanh:'Thủy', nhom:'Thái Tuế', icon:'😔', color:'#A9B8CC', tomtat:'Điếu Khách — buồn bã, có tang sự.', cachdoan:[], phu:'' },
  'Trực Phù': { hanh:'Thổ', nhom:'Thái Tuế', icon:'🛡', color:'#A9B8CC', tomtat:'Trực Phù — sao cuối vòng Thái Tuế, bình thường.', cachdoan:[], phu:'' },
  // Vòng Bác Sĩ
  'Bác Sĩ': { hanh:'Thủy', nhom:'Bác Sĩ', icon:'👨‍⚕️', color:'#74C0FC', tomtat:'Bác Sĩ — thông minh, học vấn cao, tài năng.', cachdoan:['Vận Bác Sĩ: thuận lợi học hành, thi cử'], phu:'' },
  'Lực Sĩ': { hanh:'Hỏa', nhom:'Bác Sĩ', icon:'💪', color:'#74C0FC', tomtat:'Lực Sĩ — sức mạnh, vũ lực, tranh đấu.', cachdoan:[], phu:'' },
  'Thanh Long': { hanh:'Mộc', nhom:'Bác Sĩ', icon:'🐉', color:'#4ECDB4', tomtat:'Thanh Long — may mắn, tốt lành, phát tài.',
    cachdoan:['Vận Thanh Long: tốt, nhiều cơ hội phát triển'], phu:'' },
  'Tiểu Hao': { hanh:'Thổ', nhom:'Bác Sĩ', icon:'📉', color:'#A9B8CC', tomtat:'Tiểu Hao — hao tổn nhỏ.', cachdoan:[], phu:'' },
  'Tướng Quân': { hanh:'Kim', nhom:'Bác Sĩ', icon:'⚔', color:'#FF9F43', tomtat:'Tướng Quân — oai phong, quyền uy.', cachdoan:[], phu:'' },
  'Tấu Thư': { hanh:'Thủy', nhom:'Bác Sĩ', icon:'📜', color:'#74C0FC', tomtat:'Tấu Thư — văn thư, tấu trình, giấy tờ.', cachdoan:[], phu:'' },
  'Phi Liêm': { hanh:'Hỏa', nhom:'Bác Sĩ', icon:'🔥', color:'#FF6B6B', tomtat:'Phi Liêm — hung tinh, tai họa, sóng gió.', cachdoan:[], phu:'' },
  'Hỉ Thần': { hanh:'Thổ', nhom:'Bác Sĩ', icon:'🎊', color:'#4ECDB4', tomtat:'Hỉ Thần — vui vẻ, hỷ sự.', cachdoan:[], phu:'' },
  'Bệnh Phù': { hanh:'Thủy', nhom:'Bác Sĩ', icon:'🤒', color:'#A9B8CC', tomtat:'Bệnh Phù — bệnh tật, sức khỏe kém.', cachdoan:['Vận Bệnh Phù: chú ý sức khỏe'], phu:'' },
  'Đại Hao': { hanh:'Hỏa', nhom:'Bác Sĩ', icon:'💸', color:'#FF6B6B', tomtat:'Đại Hao — hao tổn lớn, mất nhiều tiền.', cachdoan:['Vận Đại Hao: cẩn thận chi tiêu, không đầu tư lớn'], phu:'' },
  'Phục Binh': { hanh:'Kim', nhom:'Bác Sĩ', icon:'🪖', color:'#A9B8CC', tomtat:'Phục Binh — hung tinh, ẩn họa, quân sự.', cachdoan:[], phu:'' },
  'Quan Phủ': { hanh:'Thổ', nhom:'Bác Sĩ', icon:'🏛', color:'#FF9F43', tomtat:'Quan Phủ — quan sự, kiện tụng.', cachdoan:['Vận Quan Phủ: dễ có rắc rối pháp lý'], phu:'' },
});

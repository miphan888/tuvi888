// ══════════════════════════════════════════════════════
// VAN-KHAN-DATA.JS — Dữ liệu 24 bài văn khấn truyền thống
// ══════════════════════════════════════════════════════

const VAN_KHAN_DATA = [

// ─── GIA TIÊN ───────────────────────────────────────
{
  id: "1",
  slug: "van-khan-gia-tien-ram-mung-1",
  title: "Văn Khấn Gia Tiên Ngày Rằm & Mùng 1",
  category: "gia-tien",
  description: "Bài văn khấn cúng gia tiên vào ngày Rằm và Mùng 1 hàng tháng",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Thúc Bá Đệ Huynh, Cô Di Tỷ Muội họ nội họ ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, tín chủ con thành tâm sửa biện hương hoa phẩm vật, trà quả và các thứ cúng dâng, bày ra trước án, thành tâm kính mời:

Các cụ Tổ Khảo, Tổ Tỷ, chư vị Hương linh gia tiên nội ngoại của họ {{tenChuNha}}, cúi xin thương xót tín chủ, giáng về linh sàng, chứng giám lòng thành, thụ hưởng lễ vật.

Cúi xin phù hộ độ trì cho con cháu được vạn sự bình an, gia đạo hưng long thịnh vượng, mọi việc hanh thông, bổng lộc đủ đầy, gia đình hòa thuận, trên thuận dưới hòa.

Chúng con lễ bạc tâm thành, trước án kính lễ, cúi xin được phù hộ độ trì.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Hương thơm, hoa tươi, trầu cau, rượu, nước, trái cây ngũ quả, xôi chè hoặc cơm canh, vàng mã."
},

{
  id: "2",
  slug: "van-khan-cung-gio",
  title: "Văn Khấn Cúng Giỗ",
  category: "gia-tien",
  description: "Bài văn khấn ngày giỗ kỵ hằng năm của người thân đã khuất",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenOngBa","moiQuanHe"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân.

Hôm nay là {{ngayAmLich}}, là ngày kỵ nhật của {{moiQuanHe}} chúng con.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Thành tâm sửa biện hương hoa, lễ vật, trà quả, cơm canh, thức ăn, vàng mã, dâng lên trước linh vị của:

{{moiQuanHe}}: {{tenOngBa}}

Kính cẩn trình thưa: Năm qua tháng lại, ngày kỵ nhật lại đến. Con cháu trong gia đình tưởng nhớ ân đức sinh thành dưỡng dục của {{moiQuanHe}}, nay sắm sửa lễ vật, hoa quả, hương đăng, dâng lên cúng kính, kính mời {{moiQuanHe}} {{tenOngBa}} linh thiêng về chứng giám, thụ hưởng lễ vật.

Cúi xin {{moiQuanHe}} phù hộ độ trì cho toàn thể con cháu được mạnh khỏe bình an, công việc hanh thông, gia đạo hưng long, con cháu học hành tấn tới, phúc lộc song toàn.

Chúng con lễ bạc tâm thành, cúi đầu kính lễ, kính xin {{moiQuanHe}} chứng giám.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Hương, hoa tươi, trầu cau, rượu trắng, cơm canh các món mà người đã khuất yêu thích, trái cây, bánh kẹo, vàng mã."
},

// ─── LỄ TẾT ─────────────────────────────────────────
{
  id: "3",
  slug: "van-khan-giao-thua-ngoai-troi",
  title: "Văn Khấn Giao Thừa Ngoài Trời",
  category: "le-tet",
  description: "Bài văn khấn cúng Giao Thừa ngoài sân, tiễn Quan Hành Khiển cũ, đón Quan Hành Khiển mới",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: [],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Đức Đương Lai Hạ Sinh Di Lặc Tôn Phật.
Con lạy Đức Thiên Địa, Đức Bình Đẳng Đại Từ Phật.

Nay là {{ngayAmLich}}, nhằm đêm Trừ Tịch, năm cũ sắp qua, năm mới sắp đến.

Tín chủ con là: {{tenChuNha}}
Ngụ tại: {{diaChi}}

Thành tâm kính lễ, sắm sửa hương hoa, trà quả, phẩm vật dâng lên trước án, kính mời:

Ngài Cựu Niên Đương Cai Hành Khiển Hành Binh Chi Thần, Ngài Tân Niên Đương Cai Hành Khiển Hành Binh Chi Thần, Quan Phán Quan, cùng chư vị Thần Linh cai quản trong khu vực này.

Kính cẩn thưa: Năm cũ sắp qua, tín chủ con thành tâm bày tiệc kính tiễn Quan Hành Khiển năm cũ, và thành tâm nghênh đón Quan Hành Khiển năm mới cùng chư vị Thần Linh về khu vực này. Kính xin chư vị phù hộ độ trì cho gia đình tín chủ con và toàn thể mọi người trong năm mới được mọi điều tốt lành, bình an hạnh phúc, vạn sự như ý, công thành danh toại.

Kính xin tiêu tai giải nạn, phù hộ độ trì, ban phước lộc cho gia đình chúng con.

Chúng con lễ bạc tâm thành, cúi đầu kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Mâm cỗ mặn hoặc chay, hương, đèn nến, hoa tươi, trầu cau, rượu, trái cây, vàng mã (tiền vàng, mũ áo). Cúng ngoài sân, hướng về phía Đông hoặc phương tốt."
},

{
  id: "4",
  slug: "van-khan-giao-thua-trong-nha",
  title: "Văn Khấn Giao Thừa Trong Nhà",
  category: "le-tet",
  description: "Bài văn khấn cúng Giao Thừa tại bàn thờ gia tiên trong nhà",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Đức Phật Hoàng Trời Đất, Bề Trên chư vị Tôn Thần.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Thúc Bá Đệ Huynh, Cô Di Tỷ Muội họ nội họ ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, nhằm đêm Giao Thừa thiêng liêng, năm cũ sắp qua, năm mới sắp đến. Tín chủ con thành tâm sắm sửa hương hoa, phẩm vật, lễ nghi kính dâng trước bàn thờ tổ tiên.

Kính mời các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương linh gia tiên nội ngoại họ {{tenChuNha}}, cúi xin giáng về chứng giám tấm lòng thành kính của con cháu trong đêm Giao Thừa này.

Cúi xin tổ tiên phù hộ độ trì cho gia đình chúng con trong năm mới: sức khỏe dồi dào, bình an hạnh phúc, công việc hanh thông thuận lợi, tài lộc phong phú, gia đạo hưng long, con cháu học hành tấn tới, vạn sự như ý.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Mâm cỗ đầy đủ, hương, đèn nến, hoa tươi, trầu cau, rượu, nước, trái cây ngũ quả, bánh chưng, mứt kẹo, vàng mã."
},

{
  id: "5",
  slug: "van-khan-mung-1-tet",
  title: "Văn Khấn Mùng 1 Tết Nguyên Đán",
  category: "le-tet",
  description: "Bài văn khấn cúng ngày đầu năm mới Tết Nguyên Đán",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Đức Phật Hoàng Trời Đất, Sơn Thần, Thổ Địa, Táo Quân, Long Mạch cùng tất cả các vị Thần Linh cai quản trong xứ này.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Thúc Bá Đệ Huynh, Cô Di Tỷ Muội họ nội họ ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày mùng 1 Tết Nguyên Đán, tín chủ con thành tâm sắm sửa hương hoa, lễ vật dâng lên trước bàn thờ, kính mời các bậc Cao Tổ, Tổ tiên, Hương linh nội ngoại về hưởng lễ.

Kính xin các cụ gia tiên phù hộ độ trì cho toàn thể con cháu trong năm mới: thân tâm an lạc, gia đạo hưng long, tài lộc dồi dào, công danh sự nghiệp thăng tiến, tình duyên thuận lợi, con cháu học hành tấn tới, sức khỏe tốt lành, vạn sự hanh thông.

Chúng con lễ bạc tâm thành, trước án kính lễ, cúi xin chứng giám.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Bánh chưng, xôi gấc, gà luộc, các món truyền thống ngày Tết, hoa tươi, trái cây, hương, rượu, vàng mã."
},

{
  id: "6",
  slug: "van-khan-mung-2-tet-tien-ong-ba",
  title: "Văn Khấn Mùng 2 Tết - Tiễn Ông Bà",
  category: "le-tet",
  description: "Bài văn khấn cúng tiễn ông bà tổ tiên sau những ngày Tết",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Thúc Bá Đệ Huynh, Cô Di Tỷ Muội họ nội họ ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày mùng 2 Tết Nguyên Đán. Những ngày Tết con cháu đã thành tâm phụng dưỡng, trà quả hương hoa, nay kính dâng thêm mâm lễ thết tiễn.

Kính thưa các cụ Tổ Tiên, chư vị Hương linh gia tiên nội ngoại: con cháu chúng con lòng thành kính dâng lễ vật, kính mời các cụ thụ hưởng và hồi hướng âm phủ. Xin các cụ phù hộ độ trì cho con cháu trong năm mới an khang thịnh vượng, gia đình hòa thuận hạnh phúc.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Như mâm cỗ ngày Tết, hương, hoa, vàng mã, sau khi cúng xong hóa vàng tiễn ông bà."
},

{
  id: "7",
  slug: "van-khan-mung-3-tet-hoa-vang",
  title: "Văn Khấn Mùng 3 Tết - Hóa Vàng",
  category: "le-tet",
  description: "Bài văn khấn lễ hóa vàng mùng 3 Tết, tiễn vong linh tổ tiên về âm phủ",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân, Long mạch Tôn thần.
Con lạy các cụ Tổ Tiên, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày mùng 3 Tết Nguyên Đán, tín chủ con thành tâm sắm sửa lễ vật, hương hoa, trà quả, vàng mã, dâng lên cúng tế, kính tiễn Tổ Tiên, chư vị Hương linh gia tiên.

Kính thưa các cụ: Nhân dịp Tết Nguyên Đán, con cháu đã được hưởng không khí ấm áp, đoàn tụ gia đình. Nay ngày mùng 3, kính xin các cụ Tổ Tiên phù hộ cho toàn thể con cháu, hồi hướng âm phủ, và tiếp tục phù hộ độ trì cho gia đình chúng con suốt năm mới được bình an, khỏe mạnh, hạnh phúc, sự nghiệp thăng tiến.

Chúng con nay xin hóa vàng mã, kính dâng các cụ nhận lấy để dùng nơi âm phủ.

Chúng con lễ bạc tâm thành, cúi đầu kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Mâm cúng, hương, hoa, vàng mã nhiều loại (tiền vàng, quần áo, đồ dùng). Sau cúng tiến hành hóa vàng tại sân."
},

{
  id: "8",
  slug: "van-khan-ram-thang-gieng",
  title: "Văn Khấn Rằm Tháng Giêng (Tết Nguyên Tiêu)",
  category: "le-tet",
  description: "Bài văn khấn cúng Rằm tháng Giêng — Tết Nguyên Tiêu, lễ cúng quan trọng đầu năm",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Đức Phật Thích Ca Mâu Ni.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân, Long mạch Tôn thần.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày Rằm tháng Giêng — Tết Nguyên Tiêu. Tín chủ con thành tâm sắm sửa hương hoa, phẩm vật, lễ nghi, dâng lên trước án.

Kính mời Chư Phật, Bồ Tát, chư vị Tôn thần, Tổ tiên, Hương linh gia tiên nội ngoại giáng lâm chứng giám, thụ hưởng lễ vật.

Cúi xin phù hộ độ trì cho gia đình chúng con trong năm mới: thân tâm an lạc, bình an khỏe mạnh, công việc thuận lợi hanh thông, tài lộc dồi dào, gia đạo hưng long, con cháu học hành tấn tới.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Hương, hoa tươi, trái cây, xôi chè, bánh trôi, chè trôi nước, vàng mã. Nên cúng chay để cầu phúc đầu năm."
},

{
  id: "9",
  slug: "van-khan-tet-thanh-minh",
  title: "Văn Khấn Tết Thanh Minh (Tảo Mộ)",
  category: "le-tet",
  description: "Bài văn khấn cúng tại mộ phần trong dịp Tết Thanh Minh tảo mộ",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenOngBa","moiQuanHe"],
  optionalFields: [],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Hoàng Thiên Hậu Thổ, Nhạc Sơn Thần Linh.
Con lạy các ngài Thổ địa, Mộ phần Thổ thần, các ngài Thần linh cai quản nơi đây.

Con lạy: {{moiQuanHe}} {{tenOngBa}} đang yên nghỉ tại đây.

Tín chủ con là: {{tenChuNha}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, nhân ngày Tết Thanh Minh, con cháu chúng con đến thăm viếng, sửa sang mộ phần cho {{moiQuanHe}}, dâng lên lễ vật nhỏ mọn: hương hoa, trà quả, vàng mã.

Kính thưa {{moiQuanHe}} {{tenOngBa}}: Con cháu luôn tưởng nhớ công ơn của {{moiQuanHe}}. Nay nhân dịp Thanh Minh, con cháu thành kính đến thắp hương, dọn dẹp mộ phần, xin {{moiQuanHe}} an lòng nơi cõi vĩnh hằng, phù hộ cho con cháu mạnh khỏe, bình an, làm ăn thuận lợi.

Chúng con lễ bạc tâm thành, kính cẩn cúi lạy.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Hương, hoa tươi, trái cây, xôi gà, cơm nếp hoặc các lễ vật đơn giản. Mang theo xẻng, cuốc để dọn cỏ mộ phần."
},

{
  id: "10",
  slug: "van-khan-tet-doan-ngo",
  title: "Văn Khấn Tết Đoan Ngọ (Mùng 5/5)",
  category: "le-tet",
  description: "Bài văn khấn cúng ngày Tết Đoan Ngọ mùng 5 tháng 5 Âm lịch",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân Tôn thần.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày Tết Đoan Ngọ — ngày diệt sâu bọ, xua đuổi tà ma, cầu bình an sức khỏe. Tín chủ con thành tâm sắm sửa hương hoa, lễ vật, rượu nếp, hoa quả dâng lên trước án.

Kính cẩn trình thưa: Tín chủ con thành tâm dâng lễ, kính mời chư vị Thần Linh, Tổ tiên giáng về chứng giám. Cúi xin chư vị phù hộ cho gia đình chúng con trong ngày Đoan Ngọ: xua tan tà khí bệnh tật, ban phúc lộc bình an, gia đình khỏe mạnh hạnh phúc, mùa màng bội thu, mọi việc hanh thông.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Rượu nếp cái hoa vàng, bánh tro, hoa quả (vải, mận, xoài...), cơm rượu, thịt vịt. Theo phong tục, buổi sáng ăn hoa quả, cơm rượu để diệt sâu bọ."
},

{
  id: "11",
  slug: "van-khan-le-vu-lan",
  title: "Văn Khấn Lễ Vu Lan (Rằm Tháng 7)",
  category: "le-tet",
  description: "Bài văn khấn lễ Vu Lan báo hiếu và cúng cô hồn ngày Rằm tháng 7",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Đức Địa Tạng Vương Bồ Tát.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy các cụ Tổ Tiên, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày Rằm tháng Bảy — Lễ Vu Lan Bồn, ngày báo hiếu cha mẹ tổ tiên. Tín chủ con thành tâm sắm sửa hương hoa, lễ vật, cháo lá đa, gạo muối, vàng mã dâng lên trước án.

Kính dâng lên Chư Phật, Bồ Tát, kính mời Tổ Tiên, Hương linh gia tiên giáng về chứng giám. Tín chủ con cũng thành tâm cúng dường cho các cô hồn, các vong linh lang thang không nơi nương tựa, xin Phật Trời chứng giám lòng thành.

Cúi xin Chư Phật phù hộ cho cha mẹ, tổ tiên chúng con được siêu độ về cõi Phật. Cúi xin các cụ gia tiên phù hộ độ trì cho con cháu được bình an, hạnh phúc.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Cúng Phật: xôi, chè, hoa quả chay. Cúng gia tiên: mâm mặn. Cúng cô hồn: cháo loãng, gạo muối, bánh kẹo, tiền vàng, quần áo giấy. Cúng cô hồn ở ngoài sân hoặc trước cửa."
},

{
  id: "12",
  slug: "van-khan-ram-trung-thu",
  title: "Văn Khấn Rằm Trung Thu",
  category: "le-tet",
  description: "Bài văn khấn cúng ngày Rằm Trung Thu tháng 8 Âm lịch",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân Tôn thần.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày Rằm tháng Tám — Tết Trung Thu, đêm trăng tròn sáng nhất trong năm. Tín chủ con thành tâm sắm sửa hương hoa, bánh Trung Thu, hoa quả, trà ngon dâng lên trước án.

Kính mời chư vị Thần Linh, Tổ Tiên, Hương linh gia tiên giáng về chứng giám, thụ hưởng lễ vật. Cúi xin phù hộ cho toàn thể gia đình chúng con: hòa thuận hạnh phúc, con cháu được vui tươi khỏe mạnh, học hành giỏi giang, mọi người được đoàn tụ sum vầy.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Bánh Trung Thu, hoa quả (bưởi, hồng, chuối...), trà, hương, đèn nến, đèn lồng. Cúng vào tối Rằm khi trăng mọc."
},

{
  id: "13",
  slug: "van-khan-ong-cong-ong-tao",
  title: "Văn Khấn Ông Công Ông Táo (23 Tháng Chạp)",
  category: "le-tet",
  description: "Bài văn khấn tiễn Táo Quân về trời ngày 23 tháng Chạp",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Đức Đông Trù Tư Mệnh Táo Phủ Thần Quân.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày hai mươi ba tháng Chạp, tín chủ con thành tâm sắm sửa hương hoa, trà quả, y phục (mũ, áo hia), cá chép vàng, vàng mã và các thứ phẩm vật dâng lên trước án thờ Táo Quân.

Kính cẩn thưa với ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân: Năm qua, ngài đã ngự tại gia đình chúng con, chứng kiến mọi việc lớn nhỏ trong nhà. Nay đến ngày về trời tâu báo, kính xin ngài lên thiên đình tâu với Ngọc Hoàng Thượng Đế những điều tốt đẹp, phù hộ cho gia đình chúng con trong năm mới gặp nhiều may mắn, bình an hạnh phúc. Kính xin ngài nhận lễ vật mọn mà con cháu thành tâm dâng cúng.

Chúng con lễ bạc tâm thành, trước án kính lễ, tiễn ngài lên đường.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Mũ, áo, hia (bằng giấy), cá chép (thả sông hoặc cá chép giấy), hương, hoa, trái cây, xôi chè, kẹo. Sau khi cúng, hóa vàng mã và thả cá chép."
},

{
  id: "14",
  slug: "van-khan-tat-nien",
  title: "Văn Khấn Cúng Tất Niên",
  category: "le-tet",
  description: "Bài văn khấn cúng Tất Niên cuối năm, tạ ơn thần linh và tổ tiên",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Thúc Bá Đệ Huynh, Cô Di Tỷ Muội họ nội họ ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày cuối năm — Tất Niên. Tín chủ con thành tâm sắm sửa hương hoa, phẩm vật, cỗ bàn dâng lên trước án, kính tạ ơn chư vị Thần Linh và gia tiên đã phù hộ trong suốt một năm qua.

Kính thưa chư vị Thần Linh và Tổ Tiên: Năm cũ sắp qua, con cháu chúng con xin tạ ơn sự phù hộ độ trì trong suốt năm qua. Kính mời chư vị về thụ hưởng lễ vật, chứng giám lòng thành. Kính xin tiếp tục phù hộ cho gia đình chúng con trong năm mới được an khang thịnh vượng, vạn sự hanh thông.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Mâm cỗ đầy đủ (gà luộc, xôi, canh, các món mặn), hương, hoa, trầu cau, rượu, vàng mã."
},

// ─── NHÀ MỚI ────────────────────────────────────────
{
  id: "15",
  slug: "van-khan-nhap-trach",
  title: "Văn Khấn Nhập Trạch (Về Nhà Mới)",
  category: "nha-moi",
  description: "Bài văn khấn lễ nhập trạch khi chuyển về nhà mới, cầu xin thần linh phù hộ",
  requiredFields: ["tenChuNha","diaChi","diaChiMoi","ngayDuong"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Con lạy ngài Bản cảnh Thành Hoàng, ngài Bản xứ Thổ địa, Long mạch Tôn thần cai quản tại địa chỉ: {{diaChiMoi}}
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Nơi ở cũ: {{diaChi}}
Nay chuyển về nhà mới tại: {{diaChiMoi}}

Hôm nay là {{ngayAmLich}}, là ngày lành tháng tốt, tín chủ con thành tâm sắm sửa hương hoa, phẩm vật, lễ nghi dâng lên trước án, kính cáo các đấng Thần Linh.

Kính cẩn trình thưa: Tín chủ con nay được an cư lạc nghiệp tại ngôi nhà mới, địa chỉ {{diaChiMoi}}. Kính xin các ngài Thổ thần, Long mạch, Táo quân và các vị Thần Linh cai quản nơi đây chứng giám, phù hộ cho gia đình tín chủ con được định cư bình an. Kính mời Tổ Tiên, Hương linh gia tiên theo về ngôi nhà mới, tiếp tục phù hộ cho con cháu.

Cúi xin chư vị phù hộ độ trì: nhà cửa bình an, gia đình hòa thuận, làm ăn phát đạt, sức khỏe dồi dào, vạn sự hanh thông như ý.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Mâm ngũ quả, hoa tươi, hương, đèn nến, trầu cau, rượu, gạo muối, nước, vàng mã. Mang theo bếp lửa (đèn thắp sẵn) từ nhà cũ sang nhà mới."
},

{
  id: "16",
  slug: "van-khan-dong-tho",
  title: "Văn Khấn Động Thổ",
  category: "nha-moi",
  description: "Bài văn khấn lễ động thổ trước khi khởi công xây dựng nhà",
  requiredFields: ["tenChuNha","diaChi","ngayDuong"],
  optionalFields: [],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Hoàng Thiên Hậu Thổ Địa kỳ linh.
Con lạy ngài Bản xứ Thổ địa Tôn thần, Long mạch Tôn thần, các ngài Đương Niên Phương Vị chi Thần, các ngài Tiền Hậu Địa Chủ Tài Thần.

Tín chủ con là: {{tenChuNha}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày lành tháng tốt, tín chủ con chuẩn bị khởi công xây dựng nhà tại: {{diaChi}}

Tín chủ con thành tâm sắm sửa hương hoa, lễ vật, trầu rượu, dâng lên trước án, kính cáo các đấng Thần Linh cai quản đất đai nơi đây.

Kính cẩn trình thưa: Tín chủ con nay khởi công xây dựng nhà ở, kính xin các ngài Thổ thần, Long mạch, Thần Đất chứng giám và phù hộ độ trì cho công trình được hanh thông suôn sẻ, công thợ bình an không tai nạn, nhà xây kiên cố vững chắc, hoàn thành đúng kế hoạch, gia đình an cư lạc nghiệp.

Chúng con lễ bạc tâm thành, trước án kính lễ, kính xin được phù hộ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Hương, hoa, trầu cau, rượu, gạo muối, ngũ quả, vàng mã. Chủ nhà tự tay cuốc xuống đất 3 nhát đầu tiên sau khi cúng."
},

// ─── KHAI TRƯƠNG ────────────────────────────────────
{
  id: "17",
  slug: "van-khan-khai-truong",
  title: "Văn Khấn Khai Trương",
  category: "khai-truong",
  description: "Bài văn khấn cúng khai trương cửa hàng, công ty, doanh nghiệp",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenCuaHang"],
  optionalFields: [],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Thần Tài, Thổ Địa, Táo Quân, Môn Quan, Hộ Xá, Tỉnh Môn Lộ Thần.
Con lạy ngài Bản cảnh Thành Hoàng, Bản xứ Thổ địa cai quản nơi đây.

Tín chủ con là: {{tenChuNha}}
Địa chỉ kinh doanh: {{diaChi}}

Hôm nay là {{ngayAmLich}}, ngày khai trương {{tenCuaHang}}, tín chủ con thành tâm sắm sửa hương hoa, phẩm vật dâng lên trước án, kính cáo chư vị Thần Linh.

Kính cẩn trình thưa: Tín chủ con nay mở cửa kinh doanh tại địa chỉ {{diaChi}}, cơ sở mang tên {{tenCuaHang}}. Kính xin chư vị Thần Linh, Thần Tài Thổ Địa chứng giám và phù hộ độ trì cho việc kinh doanh được thuận lợi, khách hàng tấp nập, buôn may bán đắt, tài lộc dồi dào, làm ăn phát đạt, nhân viên bình an, công việc hanh thông. Cầu cho {{tenCuaHang}} ngày càng lớn mạnh, uy tín và phát triển bền vững.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Mâm ngũ quả (không dùng quả lê, chuối xanh), hoa tươi, hương, đèn nến, gà luộc hoặc heo quay, rượu, trầu cau, bánh kẹo. Chú ý chọn ngày tốt để khai trương."
},

// ─── THÔI NÔI / ĐẦY THÁNG ──────────────────────────
{
  id: "18",
  slug: "van-khan-thoi-noi-be-trai",
  title: "Văn Khấn Thôi Nôi Bé Trai",
  category: "thoi-noi",
  description: "Bài văn khấn lễ thôi nôi cho bé trai tròn 1 tuổi",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenCon"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Đức Phật Thích Ca, Đức Quan Âm Bồ Tát.
Con lạy Hoàng Thiên Hậu Thổ, chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân.
Con lạy Mười Hai Bà Mụ, Đức Ông Bổn Mạng.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, gia đình chúng con tổ chức lễ thôi nôi cho con trai là {{tenCon}}, tròn một tuổi.

Tín chủ con thành tâm sắm sửa hương hoa, xôi chè, lễ vật dâng lên trước án, kính cáo chư vị Thần Linh và Mười Hai Bà Mụ.

Kính cẩn thưa: Nhờ ơn Trời Phật, Mười Hai Bà Mụ, Đức Ông Bổn Mạng và Tổ Tiên phù hộ, con trai chúng con {{tenCon}} nay đã tròn một tuổi, khỏe mạnh bình an. Chúng con thành tâm dâng lễ tạ ơn, kính xin chư vị tiếp tục phù hộ cho {{tenCon}} lớn lên khỏe mạnh, thông minh, học hành giỏi giang, trở thành người có ích cho gia đình và xã hội.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Xôi gấc (12 đĩa nhỏ tượng trưng 12 Bà Mụ), chè đậu, bánh trôi, hoa quả, hương, đèn nến, vàng mã. Làm lễ bày ra 12 vật dụng cho bé chọn."
},

{
  id: "19",
  slug: "van-khan-thoi-noi-be-gai",
  title: "Văn Khấn Thôi Nôi Bé Gái",
  category: "thoi-noi",
  description: "Bài văn khấn lễ thôi nôi cho bé gái tròn 1 tuổi",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenCon"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Đức Phật Thích Ca, Đức Quan Âm Bồ Tát.
Con lạy Hoàng Thiên Hậu Thổ, chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân.
Con lạy Mười Hai Bà Mụ, Đức Bà Bổn Mạng.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, gia đình chúng con tổ chức lễ thôi nôi cho con gái là {{tenCon}}, tròn một tuổi.

Tín chủ con thành tâm sắm sửa hương hoa, xôi chè, lễ vật dâng lên trước án, kính cáo chư vị Thần Linh và Mười Hai Bà Mụ.

Kính cẩn thưa: Nhờ ơn Trời Phật, Mười Hai Bà Mụ, Đức Bà Bổn Mạng và Tổ Tiên phù hộ, con gái chúng con {{tenCon}} nay đã tròn một tuổi, khỏe mạnh bình an. Chúng con thành tâm dâng lễ tạ ơn, kính xin chư vị tiếp tục phù hộ cho {{tenCon}} lớn lên khỏe mạnh, xinh đẹp, hiền ngoan, thông minh, học hành tấn tới, tương lai tươi sáng.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Xôi gấc (12 đĩa nhỏ), chè đậu, bánh trôi, hoa quả, hương, đèn nến, vàng mã. Làm lễ bày ra 12 vật dụng cho bé chọn (kim chỉ, sách vở, gương, tiền...)."
},

{
  id: "20",
  slug: "van-khan-day-thang",
  title: "Văn Khấn Đầy Tháng",
  category: "thoi-noi",
  description: "Bài văn khấn lễ đầy tháng cho em bé mới sinh",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenCon","gioiTinhCon"],
  optionalFields: ["tenVo"],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Đức Quan Âm Bồ Tát, Đức Phật Thích Ca Mâu Ni.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân Tôn thần.
Con lạy Mười Hai Bà Mụ, Đức Ông (Bà) Bổn Mạng.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Hương linh gia tiên nội ngoại.

Tín chủ (chúng) con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, gia đình chúng con tổ chức lễ đầy tháng cho {{conLabel}} là {{tenCon}}.

Tín chủ con thành tâm sắm sửa hương hoa, xôi chè, lễ vật dâng lên trước án.

Kính cẩn thưa: Nhờ ân Phật Thánh, Mười Hai Bà Mụ và các bậc Tổ Tiên phù hộ, {{conLabel}} {{tenCon}} của chúng con nay đã tròn một tháng, mẹ tròn con vuông. Chúng con thành tâm dâng lễ, tạ ơn Mười Hai Bà Mụ đã nặn hình hài, tạo dáng hảo tướng cho {{tenCon}}. Kính xin Mười Hai Bà Mụ, Tổ Tiên tiếp tục phù hộ cho {{tenCon}} lớn lên khỏe mạnh, ngoan ngoãn, thông minh sáng dạ.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Xôi gấc (12 đĩa nhỏ tượng trưng 12 Bà Mụ), chè, bánh trôi, hoa quả, hương, đèn nến, vàng mã, quần áo đỏ cho bé."
},

// ─── XE MỚI ─────────────────────────────────────────
{
  id: "21",
  slug: "van-khan-cung-xe-moi",
  title: "Văn Khấn Cúng Xe Mới",
  category: "xe-moi",
  description: "Bài văn khấn cúng xe mới mua, cầu bình an khi lưu thông trên đường",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","bienSoXe"],
  optionalFields: [],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Thần Xe, Thần Giao Thông, Thần Đường Sá.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa Tôn thần.

Tín chủ con là: {{tenChuNha}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, tín chủ con vừa sắm được chiếc xe mới, biển số: {{bienSoXe}}.

Tín chủ con thành tâm sắm sửa hương hoa, lễ vật, trái cây dâng lên trước mũi xe và trước án thờ, kính cáo chư vị Thần Linh.

Kính cẩn thưa với chư vị Thần Linh: Tín chủ con hôm nay làm lễ ra mắt xe mới biển số {{bienSoXe}}, kính xin chư vị Thần Linh, Thần Xe, Thần Đường Sá chứng giám và phù hộ độ trì cho tín chủ con mỗi khi đi lại đều được bình an vô sự, xuất hành gặp may, không tai nạn, không va chạm, đi đến nơi về đến chốn. Phù hộ cho chiếc xe này luôn hoạt động bền bỉ, an toàn.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Hoa quả ngũ sắc, hương, đèn, rượu, tiền vàng. Cúng tại xe hoặc bàn thờ gia tiên. Sau đó dán bùa bình an vào xe."
},

// ─── CHÙA / ĐỀN / PHỦ ───────────────────────────────
{
  id: "22",
  slug: "van-khan-di-chua-cau-binh-an",
  title: "Văn Khấn Đi Chùa Cầu Bình An",
  category: "chua-den",
  description: "Bài văn khấn khi đến chùa, đền, phủ để cầu bình an cho bản thân và gia đình",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenChua"],
  optionalFields: [],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy Đức Phật Thích Ca Mâu Ni, Đức Phật A Di Đà, Đức Quan Âm Bồ Tát, Đức Đại Thế Chí Bồ Tát.
Con lạy chư vị Bồ Tát, La Hán, Hộ Pháp, Già Lam tại {{tenChua}}.
Con lạy Tam Bảo thường trụ.

Con tên là: {{tenChuNha}}
Ngụ tại: {{diaChi}}

Hôm nay là {{ngayAmLich}}, con thành tâm đến {{tenChua}}, dâng lên trước Tam Bảo hương hoa, lễ vật mọn, thành tâm khấu đầu đảnh lễ.

Kính lạy Đức Phật từ bi, kính lạy chư vị Bồ Tát hỷ xả: Con là người phàm trần, nghiệp chướng còn nhiều. Con thành tâm quy y Tam Bảo, xin sám hối những lỗi lầm đã phạm trong cuộc đời. Kính xin Chư Phật, Bồ Tát gia hộ cho con và toàn thể gia đình được thân tâm an lạc, bệnh tật tiêu trừ, tai ương xa lánh, cuộc sống bình an, hạnh phúc, sự nghiệp thuận lợi, công việc hanh thông.

Nguyện đem công đức này hướng về tất cả. Đệ tử và chúng sinh đều trọn thành Phật đạo.

Con lễ bạc tâm thành, kính cẩn cúi lạy.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật chùa: Hoa tươi, trái cây, bánh kẹo chay, nhang, đèn. Không dùng lễ mặn khi cúng Phật. Ăn mặc lịch sự, kín đáo khi vào chùa."
},

// ─── HÔN NHÂN ────────────────────────────────────────
{
  id: "23",
  slug: "van-khan-le-dam-ngo",
  title: "Văn Khấn Lễ Dạm Ngõ",
  category: "hon-nhan",
  description: "Bài văn khấn tại lễ dạm ngõ, xin phép gia tiên nhà gái cho đôi trẻ được tìm hiểu",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenChong","tenVo"],
  optionalFields: [],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân Tôn thần.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Hương linh gia tiên nội ngoại hai họ.

Hôm nay là {{ngayAmLich}}, gia đình chúng con tổ chức lễ Dạm Ngõ.

Gia đình tín chủ con là: {{tenChuNha}}
Ngụ tại: {{diaChi}}

Hôm nay, hai gia đình chúng con gặp gỡ để chàng trai {{tenChong}} và cô gái {{tenVo}} được chính thức tìm hiểu nhau trước sự chứng kiến của hai họ.

Tín chủ con thành tâm sắm sửa hương hoa, trầu cau, lễ vật dâng lên trước án gia tiên, kính cáo Tổ Tiên hai họ.

Kính cẩn thưa: Con cháu {{tenChong}} và {{tenVo}} nay đã đến tuổi dựng vợ gả chồng, hai gia đình xin trình thưa với Tổ Tiên hai họ về mối lương duyên này. Kính xin Tổ Tiên, các bậc Hương linh chứng giám và phù hộ cho đôi trẻ được duyên phận tốt lành, sau này nên vợ nên chồng, gia đình hạnh phúc, trăm năm bền vững.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Trầu cau, rượu, hoa quả, bánh kẹo, chè. Nhà trai mang sang nhà gái trình gia tiên."
},

{
  id: "24",
  slug: "van-khan-le-an-hoi",
  title: "Văn Khấn Lễ Ăn Hỏi",
  category: "hon-nhan",
  description: "Bài văn khấn tại lễ ăn hỏi, chính thức đặt vấn đề hôn nhân với hai họ và tổ tiên",
  requiredFields: ["tenChuNha","diaChi","ngayDuong","tenChong","tenVo"],
  optionalFields: [],
  content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật.
Con lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con lạy ngài Bản cảnh Thành Hoàng, Thổ địa, Táo quân Tôn thần.
Con lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Thúc Bá Đệ Huynh, Cô Di Tỷ Muội Hương linh gia tiên hai họ.

Hôm nay là {{ngayAmLich}}, gia đình chúng con long trọng tổ chức lễ Ăn Hỏi.

Gia đình chúng con là: {{tenChuNha}}
Ngụ tại: {{diaChi}}

Nay, chàng trai {{tenChong}} và cô gái {{tenVo}} được hai bên gia đình và dòng họ đồng ý hứa hôn. Lễ ăn hỏi hôm nay là bước đầu chính thức xác nhận hôn ước của đôi trẻ.

Tín chủ con thành tâm sắm sửa lễ vật, hương hoa dâng lên trước ban thờ Tổ Tiên, kính cáo gia tiên hai họ.

Kính cẩn thưa: Hôm nay nhân ngày lành tháng tốt, hai gia đình chúng con chính thức tổ chức lễ Ăn Hỏi, xin trình thưa với Tổ Tiên hai họ về mối lương duyên giữa {{tenChong}} và {{tenVo}}. Kính xin các bậc Tổ Tiên, Hương linh hai họ chứng giám và ban phước lành cho đôi trẻ. Kính xin phù hộ cho đám cưới được tổ chức tốt lành, đôi trẻ sau này ăn ở hòa thuận, gia đình hạnh phúc, con cái đầy đàn, trăm năm bền chặt.

Chúng con lễ bạc tâm thành, trước án kính lễ.

Nam mô A Di Đà Phật! (3 lần)`,
  note: "Lễ vật: Tráp trầu cau, bánh cốm, bánh phu thê, mứt sen, chè, rượu, hoa quả, nến hồng (theo phong tục địa phương). Số tráp lẻ: 3, 5, 7, 9, hoặc 11 tráp."
}

]; // end VAN_KHAN_DATA

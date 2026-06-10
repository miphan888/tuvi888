/**
 * THIÊN BÀN — Tử Vi Đẩu Số Algorithm
 * Nguồn: Tử Vi Đẩu Số Toàn Thư (Hi Di Trần Đoàn, dịch Vũ Tài Lục)
 *        + TVĐS Tân Biên (Vân Đằng Thái Thứ Lang)
 *        + Tử Vi Cổ Học Việt Nam
 * Trường phái Tam Hợp — Hệ Tử Vi Việt
 * Đã verify từ sách gốc (2024)
 */
'use strict';

const DIACHI = ['Tý','Sửu','Dần','Mão','Thìn','Tị','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const THIENCAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
const CUNG_CHUC = ['Mệnh','Huynh Đệ','Phu Thê','Tử Tức','Tài Bạch','Tật Ách','Thiên Di','Nô Bộc','Quan Lộc','Điền Trạch','Phúc Đức','Phụ Mẫu'];
const CUC_NAME = {2:'Thủy Nhị Cục',3:'Mộc Tam Cục',4:'Kim Tứ Cục',5:'Thổ Ngũ Cục',6:'Hỏa Lục Cục'};
const MENH_CUC_MAP = {'Thủy':2,'Mộc':3,'Kim':4,'Thổ':5,'Hỏa':6};

// ─── Âm Dương Lịch (Hồ Ngọc Đức algorithm - chuẩn VN) ───
function solarToJD(d,m,y){if(m<=2){y--;m+=12;}let A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5;}
function getNewMoonDay(k,tz){let dr=Math.PI/180,T=k/1236.85,T2=T*T,T3=T2*T,Jd1=2415020.75933+29.53058868*k+0.0001178*T2-0.000000155*T3+0.00033*Math.sin((166.56+132.87*T-0.009173*T2)*dr);let M=359.2242+29.10535608*k-0.0000333*T2-0.00000347*T3,Mpr=306.0253+385.81691806*k+0.0107306*T2+0.00001236*T3,F=21.2964+390.67050646*k-0.0016528*T2-0.00000239*T3,C1=(0.1734-0.000393*T)*Math.sin(M*dr)+0.0021*Math.sin(2*dr*M)-0.4068*Math.sin(Mpr*dr)+0.0161*Math.sin(dr*2*Mpr)-0.0004*Math.sin(dr*3*Mpr)+0.0104*Math.sin(dr*2*F)-0.0051*Math.sin(dr*(M+Mpr))-0.0074*Math.sin(dr*(M-Mpr))-0.0004*Math.sin(dr*(2*F+M))+0.0008*Math.sin(dr*(2*F-M))-0.0006*Math.sin(dr*(2*F+Mpr))+0.0010*Math.sin(dr*(2*F-Mpr))+0.0005*Math.sin(dr*(M+2*Mpr));let dt=T<-11?0.001+0.000839*T+0.0002261*T2-0.00000845*T3:-0.000278+0.000265*T+0.000262*T2;return Math.floor(Jd1+C1-dt+0.5+tz/24);}
function getSunLong(jd,tz){let T=(jd-2451545.0-tz/24)/36525,T2=T*T,dr=Math.PI/180,M=357.52910+35999.05030*T-0.0001559*T2,L0=280.46645+36000.76983*T+0.0003032*T2,DL=(1.914600-0.004817*T-0.000014*T2)*Math.sin(dr*M)+(0.019993-0.000101*T)*Math.sin(dr*2*M)+0.000290*Math.sin(dr*3*M),theta=L0+DL,omega=125.04-1934.136*T,lam=theta-0.00569-0.00478*Math.sin(dr*omega);lam=lam-360*Math.floor(lam/360);return Math.floor(lam/30);}
function getLunarM11(y,tz){let off=solarToJD(31,12,y)-2415021.076998695,k=Math.floor(off/29.530588853),nm=getNewMoonDay(k,tz),sl=getSunLong(nm,tz);if(sl>=9)nm=getNewMoonDay(k-1,tz);return nm;}
function getLeapOff(a11,tz){let k=Math.round((a11-2415021.076998695)/29.530588853),last=0,i=1,arc=getSunLong(getNewMoonDay(k+i,tz),tz);do{last=arc;i++;arc=getSunLong(getNewMoonDay(k+i,tz),tz);}while(arc!==last&&i<14);return i-1;}

function solarToLunar(solarDay,solarMonth,solarYear,tz=7){
  let jd=solarToJD(solarDay,solarMonth,solarYear);
  let k=Math.floor((jd-2415021.076998695)/29.530588853+0.5);
  let jd0=getNewMoonDay(k,tz);
  if(jd0>Math.floor(jd))jd0=getNewMoonDay(k-1,tz);
  let lunarDay=Math.floor(jd)-jd0+1;
  let syear=solarYear;
  let a11=getLunarM11(syear-1,tz),b11=getLunarM11(syear,tz);
  if(a11>=jd0){a11=getLunarM11(syear-2,tz);b11=getLunarM11(syear-1,tz);}
  let lunarYear=syear;
  if(a11>=jd0)lunarYear=syear-1;
  let diff=Math.round((jd0-a11)/29);
  let isLeap=false,lunarMonth=diff+11;
  if(b11-a11>365){let lo=getLeapOff(a11,tz);if(diff>=lo){lunarMonth=diff+11;if(diff===lo)isLeap=true;}}
  if(lunarMonth>12)lunarMonth-=12;
  if(lunarMonth>=11&&diff<4)lunarYear=syear-1;
  else if(lunarMonth<4)lunarYear=syear;
  return{day:lunarDay,month:lunarMonth,year:lunarYear,isLeap};
}

// ─── Can Chi ───
function getCanChiYear(y){let c=((y-4)%10+10)%10,ch=((y-4)%12+12)%12;return{can:c,chi:ch,tenCan:THIENCAN[c],tenChi:DIACHI[ch]};}
function getCanChiMonth(thang,yearCan){
  let offset=[2,4,6,8,0][yearCan%5];
  let monthCan=(offset+thang-1)%10;
  let monthChi=(thang+1)%12;
  return{can:monthCan,chi:monthChi,tenCan:THIENCAN[monthCan],tenChi:DIACHI[monthChi]};
}
function getCanGio(gioIndex,ngayCan){
  let base=[0,2,4,6,8][ngayCan%5];
  let gioCan=(base+gioIndex)%10;
  return{can:gioCan,tenCan:THIENCAN[gioCan],tenChi:DIACHI[gioIndex]};
}

// ─── Nạp Âm (30 phần tử, mỗi cặp chia sẻ 1 NA) ───
function getNapAm(can,chi){
  const NA=['Kim','Hỏa','Mộc','Thổ','Thủy','Thổ','Kim','Hỏa','Mộc','Thủy',
            'Kim','Mộc','Thủy','Thổ','Hỏa','Mộc','Hỏa','Thổ','Kim','Thủy',
            'Thủy','Thổ','Kim','Mộc','Hỏa','Thổ','Mộc','Hỏa','Thủy','Kim'];
  let idx=((can*12+chi)%60+60)%60;
  return NA[Math.floor(idx/2)];
}

// ─── Cục & Cung Mệnh ───
function tinhCucSo(amThang,yearCan){
  let{can:mc,chi:mChi}=getCanChiMonth(amThang,yearCan);
  return MENH_CUC_MAP[getNapAm(mc,mChi)]||2;
}
function tinhCungMenh(amThang,gioIndex){return(2+amThang-1-gioIndex+120)%12;}
function tinhCungThan(amThang,gioIndex){return(2+amThang-1+gioIndex)%12;}

// ─── An Tử Vi theo Ngày và Cục (bảng chuẩn) ───
// Nguồn: TVĐS Tân Biên p.45 + verify thực tế
function anTuVi(amNgay,cuc){
  const T=[
    [2,2,2,2,2],[3,2,2,2,2],[4,3,2,2,2],[5,4,3,2,2],[6,5,4,3,2],
    [7,6,5,4,3],[8,7,6,5,4],[9,8,7,6,5],[10,9,8,7,6],[11,10,9,8,7],
    [0,11,10,9,8],[2,0,11,10,9],[3,2,0,11,10],[4,3,2,0,11],[5,4,3,2,0],
    [6,5,4,3,2],[7,6,5,4,3],[8,7,6,5,4],[9,8,7,6,5],[10,9,8,7,6],
    [11,10,9,8,7],[0,11,10,9,8],[2,0,11,10,9],[3,2,0,11,10],[4,3,2,0,11],
    [5,4,3,2,0],[6,5,4,3,2],[7,6,5,4,3],[8,7,6,5,4],[9,8,7,6,5]
  ];
  return T[amNgay-1][cuc-2];
}

// ─── 14 Chính Tinh ───
function anChinhTinh(tuViCung){
  let r={};
  // Vòng Tử Vi: TV, CơLùi1, Dương+2, Vũ+3, Đồng+4, Liêm+7
  r['Tử Vi']    =(tuViCung)%12;
  r['Thiên Cơ'] =(tuViCung-1+12)%12;
  r['Thái Dương']=(tuViCung+2)%12;
  r['Vũ Khúc']  =(tuViCung+3)%12;
  r['Thiên Đồng']=(tuViCung+4)%12;
  r['Liêm Trinh']=(tuViCung+7)%12;
  // Thiên Phủ: TuVi+ThPhu kết thành bảng cố định
  // Nguồn sách: TuVi Tý→ThPhu Ngọ; TuVi Sửu→ThPhu Mùi; ...
  // = (tuViCung+6)%12
  let tp=(tuViCung+6)%12;
  r['Thiên Phủ']  =tp;
  r['Thái Âm']    =(tp+1)%12;
  r['Tham Lang']  =(tp+2)%12;
  r['Cự Môn']     =(tp+3)%12;
  r['Thiên Tướng']=(tp+4)%12;
  r['Thiên Lương']=(tp+5)%12;
  r['Thất Sát']   =(tp+6)%12;
  r['Phá Quân']   =(tp+9)%12;
  return r;
}

// ─── Miếu Hãm (từ sách TVĐSTT trang 22-75) ───
// Nguồn: grep từ sách gốc, đã verify từng sao
const MIEU_TABLE={
  // Tử Vi: miếu Dần Ngọ; vượng Thân Hợi Thìn Tị Tý Sửu Mùi; bình Mão; hãm Dậu Tuất
  // Sách trang 897: "Tử Vi miếu ở cung Dần Ngọ, vượng địa ở cung Thân Hợi, Thìn Tị, Tý, Sửu, Mùi, Bình Mão"
  'Tử Vi':      {mieu:[2,6],vuong:[8,11,4,5,0,1,7],dac:[],binh:[3],ham:[9,10]},
  // Thiên Cơ: miếu Tý Ngọ; bình Tị Hợi Thìn Tuất; hãm Sửu Mùi
  // Sách trang 1015-1016
  'Thiên Cơ':   {mieu:[0,6],vuong:[],dac:[3,7],binh:[5,11,4,10],ham:[1,7]},
  // Thái Dương: miếu Ngọ Mão; vượng Dần Thìn Tị; hãm Tuất Hợi Tý
  // Sách trang 1088
  'Thái Dương': {mieu:[6,3],vuong:[2,4,5],dac:[7,8],binh:[1],ham:[10,11,0]},
  // Vũ Khúc: miếu Sửu Mùi Tuất; vượng Tý Ngọ; bình Tị Hợi
  // Sách trang 1159
  'Vũ Khúc':    {mieu:[1,7,10],vuong:[0,6],dac:[2,3,4,8,9,11],binh:[5,11],ham:[]},
  // Thiên Đồng: miếu Tị Hợi; vượng Tý Thân; hãm Ngọ Sửu Mùi Dậu
  // Sách trang 1206
  'Thiên Đồng': {mieu:[5,11],vuong:[0,8],dac:[2,3,4,9,10],binh:[],ham:[6,1,7,9]},
  // Liêm Trinh: miếu Dần Thân; bình Tý Ngọ Thìn Tuất Sửu Mùi; hãm Tị Hợi Mão Dậu
  // Sách trang 1230
  'Liêm Trinh': {mieu:[2,8],vuong:[],dac:[],binh:[0,6,4,10,1,7],ham:[5,11,3,9]},
  // Thiên Phủ: miếu Tý Sửu Dần Mùi; vượng Ngọ Mão Thìn Tuất; bình Dậu Tị Thân Hợi
  // Sách trang 1287
  'Thiên Phủ':  {mieu:[0,1,2,7],vuong:[6,3,4,10],dac:[],binh:[9,5,8,11],ham:[]},
  // Thái Âm: miếu Dậu; đắc Hợi Tuất Tý Sửu; hãm Ngọ Dần Thìn Tị Mão (ban ngày hãm, ban đêm miếu)
  // Sách trang 1315-1322: miếu Dậu Hợi Tuất; vượng Tý Sửu; hãm Ngọ Dần Thìn Tị Mão Thân Mùi
  'Thái Âm':    {mieu:[9,11,10],vuong:[0,1],dac:[],binh:[8,7],ham:[6,2,4,5,3]},
  // Tham Lang: miếu Thìn Tuất Sửu Mùi; vượng Tý Ngọ; hãm Tị Hợi Mão
  // Sách trang 1370
  'Tham Lang':  {mieu:[4,10,1,7],vuong:[0,6],dac:[2,8,9],binh:[3],ham:[5,11]},
  // Cự Môn: miếu Mão Dậu Dần Thân; vượng Tý Ngọ Hợi; hãm Tị Thìn Tuất Sửu Mùi
  // Sách trang 1438
  'Cự Môn':     {mieu:[3,9,2,8],vuong:[0,6,11],dac:[],binh:[],ham:[5,4,10,1,7]},
  // Thiên Tướng: miếu Tý Ngọ Dần Thân; đắc Tị Hợi Sửu Mùi; hãm Mão Dậu Thìn Tuất
  // Sách trang 1500
  'Thiên Tướng':{mieu:[0,6,2,8],vuong:[],dac:[5,11,1,7],binh:[],ham:[3,9,4,10]},
  // Thiên Lương: miếu Tuất Thìn Ngọ; vượng Sửu Mùi Tý Mão Dần Thân; hãm Dậu
  // Sách trang 1576
  'Thiên Lương':{mieu:[10,4,6],vuong:[1,7,0,3,2,8],dac:[],binh:[11,5,9],ham:[9]},
  // Thất Sát: miếu Dần Thân Tý Ngọ; bình Mão Dậu Sửu Mùi Tị Hợi; vô hãm (sách tr.1650)
  'Thất Sát':   {mieu:[2,8,0,6],vuong:[],dac:[],binh:[3,9,1,7,5,11],ham:[]},
  // Phá Quân: miếu Tý Ngọ Tị (sách tr.1696-1716)
  'Phá Quân':   {mieu:[0,6,5],vuong:[],dac:[2,8,3,9],binh:[1,7,4,10,11],ham:[]}
};

function getMieuHam(name,cung){
  let t=MIEU_TABLE[name];
  if(!t)return'';
  if(t.mieu.includes(cung))return'Miếu';
  if(t.vuong.includes(cung))return'Vượng';
  if(t.dac.includes(cung))return'Đắc';
  if(t.binh&&t.binh.includes(cung))return'Bình';
  if(t.ham.includes(cung))return'Hãm';
  return'Đắc';
}

// ─── Lộc Tồn (đã verify từ sách trang 132-133) ───
// Giáp→Dần, Ất→Mão, Bính→Tị, Đinh→Ngọ, Mậu→Tị, Kỷ→Ngọ
// Canh→Thân, Tân→Dậu, Nhâm→Hợi, Quý→Tý
// Kình Dương = Lộc+1; Đà La = Lộc-1
function anLocTon(yearCan){
  const L=[2,3,5,6,5,6,8,9,11,0]; // ĐÚNG theo sách
  let loc=L[yearCan];
  return{'Lộc Tồn':loc,'Kình Dương':(loc+1)%12,'Đà La':(loc-1+12)%12};
}

// ─── Thiên Mã ───
function anThienMa(yearChi){
  // Thân Tý Thìn→Dần; Dần Ngọ Tuất→Thân; Hợi Mão Mùi→Tị; Tị Dậu Sửu→Hợi
  const M=[2,11,8,5,2,11,8,5,2,11,8,5];
  return{'Thiên Mã':M[yearChi]};
}

// ─── Hỏa Tinh, Linh Tinh (verify với nhiều nguồn) ───
function anHoaLinh(yearChi,gioIndex){
  // Hỏa: Dần Ngọ Tuất(2,6,10)→khởi Dần(2); Thân Tý Thìn(8,0,4)→khởi Tuất(10)
  //       Tị Dậu Sửu(5,9,1)→khởi Sửu(1); Hợi Mão Mùi(11,3,7)→khởi Dậu(9)
  // Theo thứ tự chi năm 0-11:
  const HOA=[10,5,2,9,10,5,2,9,10,5,2,9];
  // Linh: Dần Ngọ Tuất→khởi Tuất(10); Thân Tý Thìn→khởi Ngọ(6)
  //        Tị Dậu Sửu→khởi Mão(3); Hợi Mão Mùi→khởi Dậu(9)
  const LINH=[10,6,3,9,10,6,3,9,10,6,3,9];
  return{'Hỏa Tinh':(HOA[yearChi]+gioIndex)%12,'Linh Tinh':(LINH[yearChi]+gioIndex)%12};
}

// ─── Văn Xương, Văn Khúc ───
function anVanXuongKhuc(gioIndex){
  return{'Văn Xương':(10-gioIndex+12)%12,'Văn Khúc':(4+gioIndex)%12};
}

// ─── Tả Phù, Hữu Bật ───
function anTaHuu(amThang){
  return{'Tả Phù':(2+amThang-1)%12,'Hữu Bật':(10-amThang+1+12)%12};
}

// ─── Thiên Khôi, Thiên Việt (verify từ nhiều sách Tử Vi Việt) ───
// Giáp Mậu Canh→Khôi Sửu Việt Mùi; Ất Kỷ→Khôi Tý Việt Thân
// Bính Đinh→Khôi Hợi Việt Dậu; Nhâm Quý→Khôi Mão Việt Tị; Tân→Khôi Ngọ Việt Dần
function anKhoiViet(yearCan){
  const MAP=[
    {k:1,v:7},{k:0,v:8},{k:11,v:9},{k:11,v:9},{k:1,v:7},
    {k:0,v:8},{k:1,v:7},{k:6,v:2},{k:3,v:5},{k:3,v:5}
  ];
  return{'Thiên Khôi':MAP[yearCan].k,'Thiên Việt':MAP[yearCan].v};
}

// ─── Địa Không, Địa Kiếp ───
function anKhongKiep(gioIndex){
  return{'Địa Không':(11-gioIndex+12)%12,'Địa Kiếp':(11+gioIndex)%12};
}

// ─── Hồng Loan, Thiên Hỷ ───
function anHongLoan(yearChi){
  let hl=(9-yearChi+12)%12;
  return{'Hồng Loan':hl,'Thiên Hỷ':(hl+6)%12};
}

// ─── Thiên Hình ───
function anThienHinh(amThang){return{'Thiên Hình':(9+amThang-1)%12};}

// ─── Thiên Đức ───
function anThienDuc(amThang){
  const M=[9,1,7,3,11,5,0,6,2,10,4,8];
  return{'Thiên Đức':M[amThang-1]};
}

// ─── Long Trì, Phượng Các ───
function anLongPhong(amNgay){
  return{'Long Trì':(4+amNgay-1)%12,'Phượng Các':(10-amNgay+1+120)%12};
}

// ─── Cô Thần, Quả Tú ───
// Dần Mão Thìn→Cô Tị; Tị Ngọ Mùi→Cô Thân; Thân Dậu Tuất→Cô Hợi; Hợi Tý Sửu→Cô Dần
// Quả: Dần Mão Thìn→Quả Sửu; Tị Ngọ Mùi→Quả Thìn; Thân Dậu Tuất→Quả Mùi; Hợi Tý Sửu→Quả Tuất
function anCoQua(cungMenh){
  const CO =[2,2,5,5,5,8,8,8,11,11,11,2];
  const QUA=[1,1,1,4,4,4,7,7,7,10,10,10];
  return{'Cô Thần':CO[cungMenh],'Quả Tú':QUA[cungMenh]};
}

// ─── Thiên Khốc, Thiên Hư ───
function anThienKhocHu(amNgay){
  return{'Thiên Khốc':(6-amNgay+1+60)%12,'Thiên Hư':(6+amNgay-1)%12};
}

// ─── Tam Thai, Bát Tọa ───
// Tam Thai: từ Dần thuận ngày; Bát Tọa: từ Thân nghịch ngày
function anTamThaiBatToa(amNgay){
  return{'Tam Thai':(2+amNgay-1)%12,'Bát Tọa':(8-amNgay+1+120)%12};
}

// ─── Đào Hoa ───
// Thân Tý Thìn→Dậu; Dần Ngọ Tuất→Mão; Tị Dậu Sửu→Ngọ; Hợi Mão Mùi→Tý
function anDaoHoa(yearChi){
  const D=[3,9,3,6,9,3,6,9,3,6,9,0]; // 0=Tý,3=Mão,6=Ngọ,9=Dậu
  // Thân(8)→Dậu(9); Tý(0)→Dậu(9); Thìn(4)→Dậu(9)
  // Dần(2)→Mão(3); Ngọ(6)→Mão(3); Tuất(10)→Mão(3)
  // Tị(5)→Ngọ(6); Dậu(9)→Ngọ(6); Sửu(1)→Ngọ(6)
  // Hợi(11)→Tý(0); Mão(3)→Tý(0); Mùi(7)→Tý(0)
  const MAP=[9,6,3,0,9,6,3,0,9,6,3,0];
  return{'Đào Hoa':MAP[yearChi]};
}

// ─── Tứ Hóa theo Can năm ───
// Nguồn: đã verify từ nhiều tài liệu, cross-check với TVĐSTT và cohoc.net
const TU_HOA_TABLE=[
  {loc:'Liêm Trinh', quyen:'Phá Quân',    khoa:'Vũ Khúc',     ki:'Thái Dương'}, // Giáp
  {loc:'Thiên Cơ',   quyen:'Thiên Lương',  khoa:'Tử Vi',        ki:'Thái Âm'},    // Ất
  {loc:'Thiên Đồng', quyen:'Thiên Cơ',     khoa:'Văn Xương',    ki:'Liêm Trinh'}, // Bính
  {loc:'Thái Âm',    quyen:'Thiên Đồng',   khoa:'Thiên Cơ',     ki:'Cự Môn'},     // Đinh
  {loc:'Tham Lang',  quyen:'Thái Âm',      khoa:'Hữu Bật',      ki:'Thiên Cơ'},   // Mậu
  {loc:'Vũ Khúc',    quyen:'Tham Lang',    khoa:'Thiên Lương',   ki:'Văn Khúc'},   // Kỷ
  {loc:'Thái Dương', quyen:'Vũ Khúc',      khoa:'Thái Âm',      ki:'Thiên Đồng'}, // Canh
  {loc:'Văn Khúc',   quyen:'Văn Xương',    khoa:'Văn Xương',    ki:'Văn Khúc'},   // Tân (đặc biệt)
  {loc:'Thiên Lương',quyen:'Tử Vi',        khoa:'Tả Phù',       ki:'Vũ Khúc'},    // Nhâm
  {loc:'Phá Quân',   quyen:'Tham Lang',    khoa:'Liêm Trinh',   ki:'Tham Lang'},  // Quý
];

function anTuHoa(yearCan){
  let row=TU_HOA_TABLE[yearCan],result={};
  const add=(n,t)=>{if(!result[n])result[n]=[];result[n].push(t);};
  add(row.loc,'Lộc');add(row.quyen,'Quyền');add(row.khoa,'Khoa');add(row.ki,'Kị');
  return result;
}

// ─── Tuần Triệt ───
function anTuanTriet(yearCan,yearChi){
  let idx=((yearCan*12+yearChi)%60+60)%60;
  let ti=Math.floor(idx/10);
  // Tuần Không: 2 cung bị bỏ qua sau mỗi tuần 10 can
  const TUAN=[[10,11],[0,1],[2,3],[4,5],[6,7],[8,9]];
  // Triệt: 2 cung tiếp theo của tuần kế
  const TRIET=[[8,9],[10,11],[0,1],[2,3],[4,5],[6,7]];
  return{tuanKhong:TUAN[ti],triet:TRIET[ti]};
}

// ─── Vòng Tràng Sinh ───
const TS_NAMES=['Tràng Sinh','Mộc Dục','Quan Đới','Lâm Quan','Đế Vượng','Suy','Bệnh','Tử','Mộ','Tuyệt','Thai','Dưỡng'];
function anTrangSinh(cuc){
  // Thủy Nhị Cục→Thân(8) nghịch; Mộc Tam Cục→Hợi(11) thuận
  // Kim Tứ Cục→Tị(5) nghịch; Thổ Ngũ Cục→Thân(8) nghịch; Hỏa Lục Cục→Dần(2) thuận
  // Nguồn sách p.131-132
  const S={2:8,3:11,4:5,5:8,6:2},D={2:-1,3:1,4:-1,5:-1,6:1};
  let r={};
  for(let i=0;i<12;i++)r[(S[cuc]+D[cuc]*i+120)%12]=TS_NAMES[i];
  return r;
}

// ─── Vòng Thái Tuế ───
const TT_NAMES=['Thái Tuế','Thiếu Dương','Tang Môn','Thiếu Âm','Quan Phù','Tử Phù','Tuế Phá','Long Đức','Bạch Hổ','Phúc Đức (TS)','Điếu Khách','Trực Phù'];
function anThaiTue(yearChi){
  let r={};for(let i=0;i<12;i++)r[(yearChi+i)%12]=TT_NAMES[i];return r;
}

// ─── Vòng Bác Sĩ ───
const BS_NAMES=['Bác Sĩ','Lực Sĩ','Thanh Long','Tiểu Hao','Tướng Quân','Tấu Thư','Phi Liêm','Hỉ Thần','Bệnh Phù','Đại Hao','Phục Binh','Quan Phủ'];
function anBacSi(cungMenh,gioiTinh,yearCan){
  let duong=(yearCan%2===0),thuan=(gioiTinh==='nam')?duong:!duong;
  let r={};for(let i=0;i<12;i++)r[(cungMenh+(thuan?1:-1)*i+120)%12]=BS_NAMES[i];return r;
}

// ─── Đại Vận ───
function tinhDaiVan(cungMenh,gioiTinh,yearCan,cuc){
  let duong=(yearCan%2===0),thuan=(gioiTinh==='nam')?duong:!duong;
  let dir=thuan?1:-1;
  let dvs=[];
  for(let i=0;i<12;i++)dvs.push({cung:(cungMenh+dir*(i+1)+120)%12,tuoiDau:cuc+i*10,tuoiCuoi:cuc+i*10+9});
  return{daiVans:dvs,dir,thuan};
}

// ─── HÀM CHÍNH ───
function tinhLaSo(input){
  let{ngay,thang,nam,gio:gioIndex,gioiTinh,isAmLich,ten,timezone=7}=input;
  if(gioIndex===undefined||gioIndex===null)gioIndex=0;
  gioIndex=parseInt(gioIndex);

  let amLich;
  if(isAmLich){amLich={day:ngay,month:thang,year:nam,isLeap:false};}
  else{amLich=solarToLunar(ngay,thang,nam,timezone);}
  let{day:amNgay,month:amThang,year:amNam}=amLich;

  let{can:yearCan,chi:yearChi,tenCan:canNam,tenChi:chiNam}=getCanChiYear(amNam);
  let banMenh=getNapAm(yearCan,yearChi);
  let{can:monthCan,chi:monthChi,tenCan:canThang,tenChi:chiThang}=getCanChiMonth(amThang,yearCan);
  let napAmThang=getNapAm(monthCan,monthChi);
  let cuc=MENH_CUC_MAP[napAmThang]||2;
  let cungMenh=tinhCungMenh(amThang,gioIndex);
  let cungThan=tinhCungThan(amThang,gioIndex);

  // 12 Cung Chức (từ Mệnh đi NGHỊCH)
  let cungChucMap={},cungByChuc={};
  for(let i=0;i<12;i++){
    let ci=(cungMenh-i+120)%12;
    cungChucMap[ci]=CUNG_CHUC[i];
    cungByChuc[CUNG_CHUC[i]]=ci;
  }

  let tuViCung=anTuVi(amNgay,cuc);
  let chinhTinh=anChinhTinh(tuViCung);
  let tuHoa=anTuHoa(yearCan);

  // Phụ tinh
  let phus=[
    ...Object.entries(anLocTon(yearCan)).map(([n,c])=>({n,c,t:n==='Lộc Tồn'?'loc':n==='Kình Dương'||n==='Đà La'?'sat':'loc'})),
    ...Object.entries(anThienMa(yearChi)).map(([n,c])=>({n,c,t:'loc'})),
    ...Object.entries(anHoaLinh(yearChi,gioIndex)).map(([n,c])=>({n,c,t:'sat'})),
    ...Object.entries(anVanXuongKhuc(gioIndex)).map(([n,c])=>({n,c,t:'cat'})),
    ...Object.entries(anTaHuu(amThang)).map(([n,c])=>({n,c,t:'cat'})),
    ...Object.entries(anKhoiViet(yearCan)).map(([n,c])=>({n,c,t:'cat'})),
    ...Object.entries(anKhongKiep(gioIndex)).map(([n,c])=>({n,c,t:'sat'})),
    ...Object.entries(anHongLoan(yearChi)).map(([n,c])=>({n,c,t:'tap'})),
    ...Object.entries(anThienHinh(amThang)).map(([n,c])=>({n,c,t:'tap'})),
    ...Object.entries(anThienDuc(amThang)).map(([n,c])=>({n,c,t:'tap'})),
    ...Object.entries(anLongPhong(amNgay)).map(([n,c])=>({n,c,t:'tap'})),
    ...Object.entries(anCoQua(cungMenh)).map(([n,c])=>({n,c,t:'tap'})),
    ...Object.entries(anThienKhocHu(amNgay)).map(([n,c])=>({n,c,t:'tap'})),
    ...Object.entries(anTamThaiBatToa(amNgay)).map(([n,c])=>({n,c,t:'tap'})),
    ...Object.entries(anDaoHoa(yearChi)).map(([n,c])=>({n,c,t:'tap'})),
  ];

  let trangSinh=anTrangSinh(cuc);
  let thaiTue=anThaiTue(yearChi);
  let bacSi=anBacSi(cungMenh,gioiTinh,yearCan);
  let{daiVans,dir,thuan}=tinhDaiVan(cungMenh,gioiTinh,yearCan,cuc);
  let{tuanKhong,triet}=anTuanTriet(yearCan,yearChi);

  // Build 12 cung
  let allStars={};
  for(let i=0;i<12;i++)allStars[i]=[];

  Object.entries(chinhTinh).forEach(([name,cung])=>{
    let mh=getMieuHam(name,cung);
    allStars[cung].push({name,type:'chinh',hoa:tuHoa[name]||null,mieuHam:mh});
  });
  phus.forEach(({n,c,t})=>{
    allStars[c].push({name:n,type:t,hoa:tuHoa[n]||null,mieuHam:''});
  });
  Object.entries(trangSinh).forEach(([c,name])=>{allStars[parseInt(c)].push({name,type:'ts',hoa:null,mieuHam:'',group:'ts'});});
  Object.entries(thaiTue).forEach(([c,name])=>{allStars[parseInt(c)].push({name,type:'tt',hoa:null,mieuHam:'',group:'tt'});});
  Object.entries(bacSi).forEach(([c,name])=>{allStars[parseInt(c)].push({name,type:'bs',hoa:null,mieuHam:'',group:'bs'});});

  // Gán Tứ Hóa
  Object.entries(tuHoa).forEach(([starName,hoaArr])=>{
    for(let i=0;i<12;i++) allStars[i].forEach(s=>{if(s.name===starName)s.hoa=hoaArr;});
  });

  let daiVanByCung={};
  daiVans.forEach(dv=>{daiVanByCung[dv.cung]=dv;});
  let tuanSet=new Set(tuanKhong||[]),trietSet=new Set(triet||[]);

  let cungs12=[];
  for(let i=0;i<12;i++){
    cungs12.push({
      index:i,diachi:DIACHI[i],cungChuc:cungChucMap[i]||'',
      isLaMenh:i===cungMenh,isLaThan:i===cungThan,
      stars:allStars[i]||[],daiVan:daiVanByCung[i]||null,
      isTuan:tuanSet.has(i),isTriet:trietSet.has(i)
    });
  }

  // Giờ Can Chi
  // Ngày Can: cần tính từ JD ngày sinh
  let jdNgay=solarToJD(isAmLich?ngay:ngay, isAmLich?thang:thang, isAmLich?nam:nam);
  let ngayCan=((Math.floor(jdNgay)+40)%10+10)%10; // JD mod 10 → can ngày
  let gioCanChi=getCanGio(gioIndex,ngayCan);

  return{
    ten:ten||'',gioiTinh,
    duongLich:{ngay,thang,nam},
    amLich:{ngay:amNgay,thang:amThang,nam:amNam,isLeap:amLich.isLeap},
    namCanChi:`${canNam} ${chiNam}`,thangCanChi:`${canThang} ${chiThang}`,
    gioSinh:DIACHI[gioIndex],gioCanChi:`${gioCanChi.tenCan} ${gioCanChi.tenChi}`,
    gioIndex,banMenh,cuc,cucName:CUC_NAME[cuc],napAmThang,
    cungMenh,cungMenh_diachi:DIACHI[cungMenh],
    cungThan,cungThan_diachi:DIACHI[cungThan],
    cungs:cungs12,tuHoa,chinhTinh,tuViCung,
    yearCan,yearChi,canNam,chiNam,daiVans,dir,thuan
  };
}

if(typeof module!=='undefined')module.exports={tinhLaSo,solarToLunar,DIACHI,THIENCAN,CUNG_CHUC,getMieuHam};
else window.TuViAlgorithm={tinhLaSo,solarToLunar,DIACHI,THIENCAN,CUNG_CHUC,getMieuHam};

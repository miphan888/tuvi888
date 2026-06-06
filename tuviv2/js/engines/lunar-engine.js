/* ============================================================
   lunar-engine.js — Engine chuyển đổi Dương Lịch ↔ Âm Lịch
   Lịch Việt Nam 888
   Thuật toán dựa theo công trình của Hồ Ngọc Đức (1998-2004)
   Hỗ trợ năm 1900-2100, tính tháng nhuận chính xác
   ============================================================ */

var LunarEngine = (function() {
  'use strict';

  /* ============================================================
     HẰNG SỐ
     ============================================================ */
  /* Số ngày Julius tại 1/1/1900 0h UTC */
  var JULIAN_DAY_JAN_1_1900 = 2415021.076998695;

  /* ============================================================
     _sunLongitude — Tính kinh độ mặt trời (độ) tại thời điểm JD
     ============================================================ */
  function _sunLongitude(jdn) {
    var T  = (jdn - 2451545.0) / 36525;   /* Thế kỷ Julian từ J2000 */
    var T2 = T * T;
    var dr = Math.PI / 180;

    var M  = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    var L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    var DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M)
           + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M)
           +  0.000290 * Math.sin(dr * 3 * M);

    var L = L0 + DL;           /* Kinh độ biểu kiến */
    var omega = 125.04 - 1934.136 * T;
    L = L - 0.00569 - 0.00478 * Math.sin(dr * omega);
    L = L * dr;                /* Chuyển sang radian */
    L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2)); /* Chuẩn về [0, 2π] */
    return L / dr;             /* Trả về độ */
  }

  /* ============================================================
     _newMoon — Tính ngày Julian của điểm Sóc thứ k
     (k = 0 là điểm Sóc gần J2000 nhất)
     ============================================================ */
  function _newMoon(k) {
    var T  = k / 1236.85;      /* Julian century */
    var T2 = T * T;
    var T3 = T2 * T;
    var dr = Math.PI / 180;

    var Jd1 = 2415020.75933 + 29.53058868 * k
            + 0.0001178 * T2 - 0.000000155 * T3
            + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

    var M  = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    var Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    var F  = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

    var C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr)
           + 0.0021  * Math.sin(2 * dr * M)
           - 0.4068  * Math.sin(Mpr * dr)
           + 0.0161  * Math.sin(dr * 2 * Mpr)
           - 0.0004  * Math.sin(dr * 3 * Mpr)
           + 0.0104  * Math.sin(dr * 2 * F)
           - 0.0051  * Math.sin(dr * (M + Mpr))
           - 0.0074  * Math.sin(dr * (M - Mpr))
           + 0.0004  * Math.sin(dr * (2 * F + M))
           - 0.0004  * Math.sin(dr * (2 * F - M))
           - 0.0006  * Math.sin(dr * (2 * F + Mpr))
           + 0.0010  * Math.sin(dr * (2 * F - Mpr))
           + 0.0005  * Math.sin(dr * (M + 2 * Mpr));

    var deltaT;
    if (T < -11) {
      deltaT = 0.001 + 0.000839 * T + 0.0002261 * T2
             - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltaT = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }

    return Jd1 + C1 - deltaT;
  }

  /* ============================================================
     _sunLongitudeAtNewMoon — Tính kinh độ mặt trời tại điểm Sóc thứ k
     ============================================================ */
  function _sunLongitudeAtNewMoon(k) {
    return _sunLongitude(_newMoon(k));
  }

  /* ============================================================
     _getNewMoonDay — Ngày Julian của điểm Sóc thứ k tính theo múi giờ
     ============================================================ */
  function _getNewMoonDay(k, tz) {
    return Math.floor(_newMoon(k) + 0.5 + tz / 24);
  }

  /* ============================================================
     _getLunarMonth11 — Tìm tháng 11 âm lịch (tháng chứa Đông Chí)
     của năm dương lịch y
     ============================================================ */
  function _getLunarMonth11(y, tz) {
    /* Số Julian của ngày 31/12/y */
    var off = _jdFromDate(31, 12, y) - 2415021;
    /* k = số điểm sóc kể từ điểm sóc chuẩn 1/1/1900 */
    var k = Math.floor(off / 29.530588853);
    var nm = _getNewMoonDay(k, tz);

    /* Lùi lại nếu điểm Sóc vẫn ở tháng 12 dương lịch */
    var sunLng = _sunLongitude(nm - 0.5 - tz / 24);
    if (sunLng >= 270) {
      nm = _getNewMoonDay(k - 1, tz);
    }
    return nm;
  }

  /* ============================================================
     _getLeapMonthOffset — Tìm offset tháng nhuận trong năm âm lịch
     bắt đầu từ a11 (tháng 11 năm trước) đến a11b (tháng 11 năm sau)
     Trả về 0 nếu không có tháng nhuận
     ============================================================ */
  function _getLeapMonthOffset(a11, tz) {
    var k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    var last;
    var i = 1;
    var arc = _sunLongitude(_getNewMoonDay(k + i, tz) - 0.5 - tz / 24);
    do {
      last = arc;
      i++;
      arc = _sunLongitude(_getNewMoonDay(k + i, tz) - 0.5 - tz / 24);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  /* ============================================================
     _jdFromDate — Số Julian từ ngày dd/mm/yyyy
     ============================================================ */
  function _jdFromDate(dd, mm, yyyy) {
    var a = Math.floor((14 - mm) / 12);
    var y = yyyy + 4800 - a;
    var m = mm + 12 * a - 3;
    var jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
           + Math.floor(y / 4) - Math.floor(y / 100)
           + Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
         + Math.floor(y / 4) - 32083;
    }
    return jd;
  }

  /* ============================================================
     _jdToDate — Chuyển số Julian sang ngày dd/mm/yyyy
     ============================================================ */
  function _jdToDate(jd) {
    var z, a, alpha, b, c, d, e, dd, mm, yyyy;
    if (jd > 2299160) {
      /* Gregorian */
      a = jd + 32044;
      alpha = Math.floor((4 * a + 3) / 146097);
      a = a - Math.floor((146097 * alpha) / 4);
      b = a;
    } else {
      alpha = 0;
      b = jd + 1524;
    }
    c  = Math.floor((4 * b + 3) / 1461);
    d  = b - Math.floor((1461 * c) / 4);
    e  = Math.floor((5 * d + 2) / 153);
    dd = d - Math.floor((153 * e + 2) / 5) + 1;
    mm = e + 3 - 12 * Math.floor(e / 10);
    yyyy = 100 * alpha + c - 4800 + Math.floor(e / 10);
    return [dd, mm, yyyy];
  }

  /* ============================================================
     convertSolar2Lunar — Chuyển ngày dương lịch sang âm lịch
     Tham số: dd, mm, yyyy (int), tz (số thực, VD: 7 = UTC+7)
     Trả về object: { day, month, year, leap, jd }
     ============================================================ */
  function convertSolar2Lunar(dd, mm, yyyy, tz) {
    tz = (tz !== undefined) ? tz : 7;

    var dayNumber = _jdFromDate(dd, mm, yyyy);
    var k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);

    /* Tìm điểm Sóc gần nhất */
    var monthStart = _getNewMoonDay(k + 1, tz);
    if (monthStart > dayNumber) {
      monthStart = _getNewMoonDay(k, tz);
    }

    /* Tìm tháng 11 năm trước */
    var a11 = _getLunarMonth11(yyyy, tz);
    var b11 = a11;

    /* Nếu dayNumber < a11, tức là ngày này thuộc năm trước */
    var lunarYear;
    if (a11 >= monthStart) {
      lunarYear = yyyy;
      a11 = _getLunarMonth11(yyyy - 1, tz);
    } else {
      lunarYear = yyyy + 1;
      b11 = _getLunarMonth11(yyyy + 1, tz);
    }

    var lunarDay   = dayNumber - monthStart + 1;
    var diff       = Math.floor((monthStart - a11) / 29);
    var lunarLeap  = 0;
    var lunarMonth = diff + 11;

    /* Kiểm tra có tháng nhuận trong năm không */
    if (b11 - a11 > 365) {
      var leapMonthDiff = _getLeapMonthOffset(a11, tz);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }

    /* Điều chỉnh tháng về 1-12 */
    if (lunarMonth > 12) {
      lunarMonth -= 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }

    return {
      day:   lunarDay,
      month: lunarMonth,
      year:  lunarYear,
      leap:  lunarLeap,
      jd:    dayNumber
    };
  }

  /* ============================================================
     convertLunar2Solar — Chuyển âm lịch sang dương lịch
     Tham số: lunarDay, lunarMonth, lunarYear (int),
              lunarLeap (0 hoặc 1), tz (số thực)
     Trả về object: { dd, mm, yyyy }
     ============================================================ */
  function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, tz) {
    tz = (tz !== undefined) ? tz : 7;
    lunarLeap = lunarLeap || 0;

    var k, a11, b11, leapMonthDiff, off;

    if (lunarMonth < 11) {
      a11 = _getLunarMonth11(lunarYear - 1, tz);
      b11 = _getLunarMonth11(lunarYear,     tz);
    } else {
      a11 = _getLunarMonth11(lunarYear,     tz);
      b11 = _getLunarMonth11(lunarYear + 1, tz);
    }

    k   = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    off = lunarMonth - 11;
    if (off < 0) off += 12;

    if (b11 - a11 > 365) {
      leapMonthDiff = _getLeapMonthOffset(a11, tz);
      var leapMonth = leapMonthDiff - 2;
      if (leapMonth < 0) leapMonth += 12;
      if (lunarLeap !== 0 && lunarMonth !== leapMonth) {
        /* Tháng nhuận không đúng với thực tế → trả về ngày không hợp lệ */
        return { dd: 0, mm: 0, yyyy: 0 };
      }
      if (lunarLeap !== 0 || off >= leapMonthDiff - 2) {
        off += 1;
      }
    }

    var monthStart = _getNewMoonDay(k + off, tz);
    var result     = _jdToDate(monthStart + lunarDay - 1);
    return { dd: result[0], mm: result[1], yyyy: result[2] };
  }

  /* ============================================================
     getMonthCalendar — Lấy danh sách ngày trong tháng dương lịch
     Trả về mảng các object { solar, lunar } cho calendar grid
     ============================================================ */
  function getMonthCalendar(month, year, tz) {
    tz = (tz !== undefined) ? tz : 7;
    var days = [];
    /* Số ngày trong tháng */
    var daysInMonth = new Date(year, month, 0).getDate();
    /* Ngày đầu tuần của ngày 1 (0=CN, 1=T2, ..., 6=T7) */
    var firstDow = new Date(year, month - 1, 1).getDay();

    /* Padding ngày từ tháng trước */
    var prevMonth = month - 1 < 1 ? 12 : month - 1;
    var prevYear  = month - 1 < 1 ? year - 1 : year;
    var daysInPrev = new Date(prevYear, prevMonth, 0).getDate();

    for (var i = firstDow - 1; i >= 0; i--) {
      var d = daysInPrev - i;
      var lunar = convertSolar2Lunar(d, prevMonth, prevYear, tz);
      days.push({ solar: { d: d, m: prevMonth, y: prevYear }, lunar: lunar, otherMonth: true });
    }

    /* Các ngày trong tháng hiện tại */
    for (var d2 = 1; d2 <= daysInMonth; d2++) {
      var lunar2 = convertSolar2Lunar(d2, month, year, tz);
      days.push({ solar: { d: d2, m: month, y: year }, lunar: lunar2, otherMonth: false });
    }

    /* Padding ngày từ tháng sau cho đủ số hàng */
    var remaining = 42 - days.length; /* 6 hàng x 7 cột */
    var nextMonth = month + 1 > 12 ? 1 : month + 1;
    var nextYear  = month + 1 > 12 ? year + 1 : year;
    for (var d3 = 1; d3 <= remaining; d3++) {
      var lunar3 = convertSolar2Lunar(d3, nextMonth, nextYear, tz);
      days.push({ solar: { d: d3, m: nextMonth, y: nextYear }, lunar: lunar3, otherMonth: true });
    }

    return days;
  }

  /* ============================================================
     Public API
     ============================================================ */
  return {
    convertSolar2Lunar:  convertSolar2Lunar,
    convertLunar2Solar:  convertLunar2Solar,
    getMonthCalendar:    getMonthCalendar
  };
})();

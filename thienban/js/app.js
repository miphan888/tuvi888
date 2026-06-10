/**
 * THIÊN BÀN — Main Application
 * UI Controller, Rendering, Interactions
 */
'use strict';

// ─── State ───
const State = {
  theme: localStorage.getItem('thienban_theme') || 'dark',
  currentView: 'landing',
  lasoBD: null,
  activeDrawerStar: null,
  activeTab: 'laso',
};

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(State.theme);
  bindEvents();
  initStarfield();
  showView('landing');
});

// ─── Theme ───
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  State.theme = t;
  localStorage.setItem('thienban_theme', t);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = t === 'dark' ? '☀' : '☾';
}

// ─── Starfield ───
function initStarfield() {
  const canvas = document.getElementById('starfieldCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function makeStars() {
    stars = [];
    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.005
      });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (State.theme === 'light') { requestAnimationFrame(draw); return; }
    stars.forEach(s => {
      s.a = Math.max(0.1, Math.min(1, s.a + s.da));
      if (s.a <= 0.1 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${s.a * 0.4})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  resize(); makeStars(); draw();
  window.addEventListener('resize', () => { resize(); makeStars(); });
}

// ─── Navigation ───
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(`view-${name}`);
  if (el) el.classList.add('active');
  State.currentView = name;
  window.scrollTo(0, 0);
}

// ─── Form Events ───
function bindEvents() {
  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    applyTheme(State.theme === 'dark' ? 'light' : 'dark');
  });

  // Lịch toggle
  document.querySelectorAll('input[name="lich"]').forEach(r => {
    r.addEventListener('change', () => {});
  });

  // Form submit
  document.getElementById('formLapLaSo')?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmitForm();
  });

  // Back button
  document.getElementById('btnBack')?.addEventListener('click', () => showView('landing'));

  // Drawer close
  document.getElementById('drawerOverlay')?.addEventListener('click', closeDrawer);
  document.getElementById('btnCloseDrawer')?.addEventListener('click', closeDrawer);

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.activeTab = tab;
      renderTabContent(tab);
    });
  });
}

// ─── Form Submit ───
function handleSubmitForm() {
  const f = document.getElementById('formLapLaSo');
  const ten = f.ten.value.trim() || 'Khách';
  const ngay = parseInt(f.ngay.value);
  const thang = parseInt(f.thang.value);
  const nam = parseInt(f.nam.value);
  const gio = parseInt(f.gio.value);
  const gioiTinh = f.gioi_tinh.value;
  const isAmLich = document.querySelector('input[name="lich"]:checked')?.value === 'am';
  const timezone = parseInt(f.timezone?.value || 7);

  // Validate
  if (!ngay || !thang || !nam || isNaN(gio)) {
    showToast('Vui lòng điền đầy đủ thông tin ngày tháng năm sinh!'); return;
  }
  if (nam < 1900 || nam > 2050) {
    showToast('Năm sinh không hợp lệ (1900-2050)'); return;
  }

  // Loading
  const btn = f.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Đang tính...';

  setTimeout(() => {
    try {
      const result = window.TuViAlgorithm.tinhLaSo({ ngay, thang, nam, gio, gioiTinh, isAmLich, ten, timezone });
      State.lasoBD = result;
      renderLaSo(result);
      showView('laso');
    } catch(err) {
      showToast('Có lỗi khi tính lá số: ' + err.message);
      console.error(err);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Khởi Tính Lá Số →';
    }
  }, 50);
}

// ─── Render Lá Số ───
function renderLaSo(bd) {
  // Header info
  document.getElementById('lasoName').textContent = bd.ten || 'Lá Số';
  
  const duong = `${bd.duongLich.ngay}/${bd.duongLich.thang}/${bd.duongLich.nam}`;
  const am = `${bd.amLich.ngay}/${bd.amLich.thang}${bd.amLich.isLeap ? '(n)' : ''}/${bd.amLich.nam}`;
  document.getElementById('lasoMeta').innerHTML = `
    <span class="meta-chip">DL: ${duong}</span>
    <span class="meta-chip">ÂL: ${am}</span>
    <span class="meta-chip gold">${bd.namCanChi}</span>
    <span class="meta-chip gold">${bd.cucName}</span>
    <span class="meta-chip">Mệnh ${bd.banMenh}</span>
  `;

  // Tabs
  document.querySelector('.tab-btn[data-tab="laso"]')?.classList.add('active');
  State.activeTab = 'laso';
  renderTabContent('laso');
}

function renderTabContent(tab) {
  const bd = State.lasoBD;
  if (!bd) return;
  const container = document.getElementById('lasoContent');
  container.innerHTML = '';

  if (tab === 'laso') {
    container.appendChild(buildLasoGrid(bd));
  } else if (tab === 'daivan') {
    container.appendChild(buildDaiVanView(bd));
  } else if (tab === 'thongtin') {
    container.appendChild(buildThongTinView(bd));
  }
}

// ─── Build Grid ───
function buildLasoGrid(bd) {
  const wrapper = document.createElement('div');
  wrapper.className = 'laso-grid-wrapper';

  // SVG Tam Hợp overlay
  const svg = buildTamHopSVG(bd);
  wrapper.appendChild(svg);

  const grid = document.createElement('div');
  grid.className = 'laso-grid';

  // 12 cung cells
  bd.cungs.forEach(cung => {
    grid.appendChild(buildCungCell(cung, bd));
  });

  // Center cell
  grid.appendChild(buildCenterCell(bd));

  wrapper.appendChild(grid);
  return wrapper;
}

function buildCungCell(cung, bd) {
  const cell = document.createElement('div');
  cell.className = 'cung-cell';
  cell.setAttribute('data-cung', cung.index);
  if (cung.isLaMenh) cell.classList.add('is-menh');
  if (cung.isLaThan) cell.classList.add('is-than');
  if (cung.isTuan) cell.classList.add('is-tuan');
  if (cung.isTriet) cell.classList.add('is-triet');

  // Header
  const header = document.createElement('div');
  header.className = 'cung-header';

  const chucEl = document.createElement('div');
  chucEl.className = 'cung-chuc';
  chucEl.textContent = cung.cungChuc;

  const diachiEl = document.createElement('div');
  diachiEl.className = 'cung-diachi';
  diachiEl.textContent = cung.diachi;

  header.appendChild(chucEl);
  header.appendChild(diachiEl);
  cell.appendChild(header);

  // Tags
  const tags = [];
  if (cung.isLaMenh) tags.push(['Mệnh', 'tag-menh']);
  if (cung.isLaThan) tags.push(['Thân', 'tag-than']);
  if (cung.isTuan) tags.push(['Tuần', 'tag-tuan']);
  if (cung.isTriet) tags.push(['Triệt', 'tag-triet']);
  if (tags.length) {
    const tagsEl = document.createElement('div');
    tagsEl.className = 'cung-tags';
    tags.forEach(([txt, cls]) => {
      const t = document.createElement('span');
      t.className = `cung-tag ${cls}`;
      t.textContent = txt;
      tagsEl.appendChild(t);
    });
    cell.appendChild(tagsEl);
  }

  // Stars
  const starsEl = document.createElement('div');
  starsEl.className = 'cung-stars';

  // Nhóm sao: chính tinh trước
  const chinhTinh = cung.stars.filter(s => s.type === 'chinh');
  const catTinh = cung.stars.filter(s => ['cat','loc'].includes(s.type));
  const satTinh = cung.stars.filter(s => s.type === 'sat');
  const tapTinh = cung.stars.filter(s => s.type === 'tap');
  const vongTinh = cung.stars.filter(s => ['ts','tt','bs'].includes(s.type));

  [...chinhTinh, ...catTinh, ...satTinh, ...tapTinh, ...vongTinh].forEach(star => {
    starsEl.appendChild(buildStarItem(star, cung.index));
  });

  cell.appendChild(starsEl);

  // Đại Vận
  if (cung.daiVan) {
    const dvEl = document.createElement('div');
    dvEl.className = 'cung-daivan';
    dvEl.textContent = `ĐV ${cung.daiVan.tuoiDau}-${cung.daiVan.tuoiCuoi}`;
    cell.appendChild(dvEl);
  }

  return cell;
}

function buildStarItem(star, cungIdx) {
  const item = document.createElement('div');
  item.className = `star-item star-${star.type}`;
  item.title = star.name;

  // Star name
  const name = document.createElement('span');
  name.className = 'star-name';
  name.textContent = star.name;
  item.appendChild(name);

  // Miếu Hãm (chỉ chính tinh)
  if (star.type === 'chinh' && star.mieuHam) {
    const mh = document.createElement('span');
    mh.className = `mieu-badge mieu-${star.mieuHam.toLowerCase().replace('ế','e').replace('ả','a').replace('ượ','uo').replace('ình','inh')}`;
    const MH_CLASS = {'Miếu':'mieu-mieu','Vượng':'mieu-vuong','Đắc':'mieu-dac','Bình':'mieu-binh','Hãm':'mieu-ham'};
    mh.className = `mieu-badge ${MH_CLASS[star.mieuHam]||'mieu-dac'}`;
    mh.textContent = star.mieuHam;
    item.appendChild(mh);
  }

  // Tứ Hóa
  if (star.hoa) {
    star.hoa.forEach(h => {
      const badge = document.createElement('span');
      const HOA_MAP = {'Lộc':'hoa-loc','Quyền':'hoa-quyen','Khoa':'hoa-khoa','Kị':'hoa-ki'};
      badge.className = `hoa-badge ${HOA_MAP[h]||'hoa-loc'}`;
      const HOA_CHAR = {'Lộc':'祿','Quyền':'權','Khoa':'科','Kị':'忌'};
      badge.textContent = HOA_CHAR[h] || h[0];
      badge.title = `Hóa ${h}`;
      item.appendChild(badge);
    });
  }

  // Click → Drawer
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    openStarDrawer(star, cungIdx);
  });

  return item;
}

function buildCenterCell(bd) {
  const cell = document.createElement('div');
  cell.className = 'cung-center';

  cell.innerHTML = `
    <div class="center-logo">☵</div>
    <div class="center-name">${bd.ten || '—'}</div>
    <div class="center-grid">
      <div class="center-item">
        <label>Dương Lịch</label>
        <span>${bd.duongLich.ngay}/${bd.duongLich.thang}/${bd.duongLich.nam}</span>
      </div>
      <div class="center-item">
        <label>Âm Lịch</label>
        <span>${bd.amLich.ngay}/${bd.amLich.thang}/${bd.amLich.nam}</span>
      </div>
      <div class="center-item">
        <label>Năm</label>
        <span class="gold">${bd.namCanChi}</span>
      </div>
      <div class="center-item">
        <label>Giờ</label>
        <span>${bd.gioCanChi}</span>
      </div>
      <div class="center-item">
        <label>Bản Mệnh</label>
        <span class="gold">${bd.banMenh}</span>
      </div>
      <div class="center-item">
        <label>Cục</label>
        <span class="gold">${bd.cucName}</span>
      </div>
      <div class="center-item">
        <label>Cung Mệnh</label>
        <span>${bd.cungMenh_diachi}</span>
      </div>
      <div class="center-item">
        <label>Cung Thân</label>
        <span>${bd.cungThan_diachi}</span>
      </div>
    </div>
  `;
  return cell;
}

// ─── Tam Hợp SVG ───
function buildTamHopSVG(bd) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'tamhop-overlay');
  svg.setAttribute('viewBox', '0 0 4 4');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  // Vị trí trung tâm của 12 cung trong grid 4x4
  const POS = {
    5:[0.5,0.5],6:[1.5,0.5],7:[2.5,0.5],8:[3.5,0.5],
    4:[0.5,1.5],9:[3.5,1.5],
    3:[0.5,2.5],10:[3.5,2.5],
    2:[0.5,3.5],1:[1.5,3.5],0:[2.5,3.5],11:[3.5,3.5]
  };

  // Cung Mệnh và tam hợp
  const menh = bd.cungMenh;
  const tamHopGroups = [
    [0,4,8],[1,5,9],[2,6,10],[3,7,11] // Tý-Thìn-Thân, Sửu-Tị-Dậu, Dần-Ngọ-Tuất, Mão-Mùi-Hợi
  ];

  tamHopGroups.forEach(group => {
    if (group.includes(menh)) {
      // Vẽ tam giác tam hợp
      const pts = group.map(g => POS[g]).filter(Boolean);
      if (pts.length === 3) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]} L${pts[2][0]},${pts[2][1]} Z`);
        path.setAttribute('class', 'tamhop-line');
        svg.appendChild(path);
      }
    }
  });

  return svg;
}

// ─── Đại Vận View ───
function buildDaiVanView(bd) {
  const div = document.createElement('div');
  div.className = 'daivan-view animate-in';
  div.style.cssText = 'max-width:860px;margin:0 auto;';

  const title = document.createElement('h3');
  title.style.cssText = 'font-family:var(--font-display);font-size:1.4rem;margin-bottom:1.5rem;';
  title.textContent = 'Đại Vận';
  div.appendChild(title);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;';

  const DIACHI = window.TuViAlgorithm.DIACHI;
  bd.daiVans.forEach((dv, i) => {
    const cungData = bd.cungs[dv.cung];
    const card = document.createElement('div');
    card.style.cssText = `
      background:var(--bg-surface);border:1px solid var(--border-default);
      border-radius:12px;padding:14px;cursor:pointer;transition:all 0.2s;
    `;
    card.onmouseenter = () => card.style.borderColor = 'var(--border-gold)';
    card.onmouseleave = () => card.style.borderColor = 'var(--border-default)';

    const chinhSao = cungData.stars.filter(s=>s.type==='chinh').map(s=>s.name).join(' • ') || '(trống)';

    card.innerHTML = `
      <div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-tertiary);margin-bottom:4px;">
        Tuổi ${dv.tuoiDau} – ${dv.tuoiCuoi}
      </div>
      <div style="font-family:var(--font-display);font-size:1rem;color:var(--text-gold);font-weight:600;">
        ${DIACHI[dv.cung]}
      </div>
      <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;">
        ${cungData.cungChuc}
      </div>
      <div style="font-size:0.65rem;color:var(--star-main);margin-top:4px;">${chinhSao}</div>
    `;
    grid.appendChild(card);
  });

  div.appendChild(grid);
  return div;
}

// ─── Thông Tin View ───
function buildThongTinView(bd) {
  const div = document.createElement('div');
  div.className = 'animate-in';
  div.style.cssText = 'max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:20px;';

  const sections = [
    { title: 'Thông tin cơ bản', items: [
      ['Họ tên', bd.ten || '—'],
      ['Giới tính', bd.gioiTinh === 'nam' ? 'Nam' : 'Nữ'],
      ['Dương lịch', `${bd.duongLich.ngay}/${bd.duongLich.thang}/${bd.duongLich.nam}`],
      ['Âm lịch', `${bd.amLich.ngay}/${bd.amLich.thang}${bd.amLich.isLeap?'(nhuận)':''}/${bd.amLich.nam}`],
      ['Giờ sinh', `${bd.gioSinh} (${bd.gioCanChi})`],
    ]},
    { title: 'Cung Mệnh & Vận', items: [
      ['Năm Can Chi', bd.namCanChi],
      ['Tháng Can Chi', bd.thangCanChi],
      ['Bản Mệnh (Nạp Âm năm)', bd.banMenh],
      ['Cục số', bd.cucName + ` (Nạp Âm tháng: ${bd.napAmThang})`],
      ['Cung Mệnh', bd.cungMenh_diachi],
      ['Cung Thân', bd.cungThan_diachi],
      ['Khởi đại vận', `Tuổi ${bd.daiVans[0]?.tuoiDau || '—'} (${bd.thuan ? 'thuận' : 'nghịch'})`],
    ]},
    { title: 'Tứ Hóa', items: Object.entries(bd.tuHoa).map(([name, arr]) => [arr.join('+'), name]) },
  ];

  sections.forEach(sec => {
    const card = document.createElement('div');
    card.style.cssText = 'background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:12px;overflow:hidden;';

    const header = document.createElement('div');
    header.style.cssText = 'padding:12px 16px;border-bottom:1px solid var(--border-subtle);font-size:0.7rem;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.1em;';
    header.textContent = sec.title;
    card.appendChild(header);

    sec.items.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:1px solid var(--border-subtle);font-size:0.875rem;';
      row.innerHTML = `
        <span style="color:var(--text-secondary)">${label}</span>
        <span style="color:var(--text-primary);font-weight:500;text-align:right;max-width:60%">${value}</span>
      `;
      card.appendChild(row);
    });

    div.appendChild(card);
  });

  return div;
}

// ─── Star Drawer ───
function openStarDrawer(star, cungIdx) {
  const info = window.STAR_INFO?.[star.name];
  const DIACHI = window.TuViAlgorithm.DIACHI;

  const body = document.getElementById('drawerBody');
  body.innerHTML = '';

  // Header
  const headerEl = document.createElement('div');
  headerEl.className = 'star-detail-header';

  const TYPE_COLOR = {
    chinh: 'var(--star-main)', cat: 'var(--star-lucky)',
    sat: 'var(--star-bad)', loc: '#A8FF78', tap: 'var(--star-neutral)'
  };
  const col = TYPE_COLOR[star.type] || 'var(--text-secondary)';
  const iconEl = document.createElement('div');
  iconEl.className = 'star-icon-lg';
  iconEl.style.cssText = `background:${col}18;border:1px solid ${col}33;color:${col};`;
  iconEl.textContent = info?.icon || '★';

  const nameDiv = document.createElement('div');

  const nameEl = document.createElement('div');
  nameEl.className = 'star-detail-name';
  nameEl.style.color = col;
  nameEl.textContent = star.name;

  const subEl = document.createElement('div');
  subEl.className = 'star-detail-sub';

  const TYPE_LABEL = {chinh:'Chính Tinh',cat:'Cát Tinh',sat:'Sát Tinh',loc:'Lộc Tinh',tap:'Tạp Tinh',ts:'Tràng Sinh',tt:'Thái Tuế',bs:'Bác Sĩ'};
  let subParts = [TYPE_LABEL[star.type]||''];
  if (info?.hanh) subParts.push(`Hành ${info.hanh}`);
  if (star.mieuHam) subParts.push(star.mieuHam);
  subEl.textContent = subParts.filter(Boolean).join(' · ');

  nameDiv.appendChild(nameEl);
  nameDiv.appendChild(subEl);
  headerEl.appendChild(iconEl);
  headerEl.appendChild(nameDiv);
  body.appendChild(headerEl);

  // Divider
  const divEl = document.createElement('div');
  divEl.className = 'divider divider-gold';
  body.appendChild(divEl);

  // Stats
  const statsSection = document.createElement('div');
  statsSection.className = 'detail-section';

  const statTitle = document.createElement('div');
  statTitle.className = 'detail-section-title';
  statTitle.textContent = 'Thông Số';
  statsSection.appendChild(statTitle);

  const statItems = [
    ['Cung an', DIACHI[cungIdx]],
    ['Loại sao', TYPE_LABEL[star.type]||star.type],
  ];
  if (info?.hanh) statItems.push(['Ngũ hành', info.hanh]);
  if (info?.amduong) statItems.push(['Âm Dương', info.amduong]);
  if (star.mieuHam) statItems.push(['Miếu Hãm', star.mieuHam]);
  if (star.hoa) statItems.push(['Tứ Hóa', star.hoa.join(' + ')]);

  statItems.forEach(([lbl, val]) => {
    const row = document.createElement('div');
    row.className = 'detail-row';
    row.innerHTML = `<span class="detail-row-label">${lbl}</span><span class="detail-row-value">${val}</span>`;
    statsSection.appendChild(row);
  });
  body.appendChild(statsSection);

  if (info) {
    // Tóm tắt
    if (info.tomtat) {
      const secEl = document.createElement('div');
      secEl.className = 'detail-section';
      secEl.innerHTML = `
        <div class="detail-section-title">Ý Nghĩa</div>
        <p class="meaning-text">${info.tomtat}</p>
      `;
      body.appendChild(secEl);
    }

    // Cách đoán
    if (info.cachdoan?.length) {
      const secEl = document.createElement('div');
      secEl.className = 'detail-section';
      const titEl = document.createElement('div');
      titEl.className = 'detail-section-title';
      titEl.textContent = 'Cách Đoán';
      secEl.appendChild(titEl);
      info.cachdoan.forEach(line => {
        const p = document.createElement('p');
        p.style.cssText = 'font-size:0.875rem;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid var(--border-subtle);line-height:1.6;';
        p.textContent = '• ' + line;
        secEl.appendChild(p);
      });
      body.appendChild(secEl);
    }

    // Phú
    if (info.phu) {
      const secEl = document.createElement('div');
      secEl.className = 'detail-section';
      secEl.style.cssText = 'background:var(--bg-elevated);border:1px solid var(--border-gold);border-radius:10px;padding:14px;';
      secEl.innerHTML = `
        <div class="detail-section-title" style="margin-bottom:8px;">📖 Từ Sách</div>
        <p style="font-family:var(--font-display);font-style:italic;font-size:0.95rem;color:var(--text-secondary);line-height:1.8;">${info.phu}</p>
      `;
      body.appendChild(secEl);
    }
  } else {
    const p = document.createElement('p');
    p.style.cssText = 'color:var(--text-tertiary);font-size:0.875rem;padding:16px 0;';
    p.textContent = 'Chưa có thông tin chi tiết cho sao này.';
    body.appendChild(p);
  }

  // Show drawer
  document.getElementById('drawerTitle').textContent = star.name;
  document.getElementById('drawerOverlay').classList.add('open');
  document.getElementById('drawer').classList.add('open');
}

function closeDrawer() {
  document.getElementById('drawerOverlay').classList.remove('open');
  document.getElementById('drawer').classList.remove('open');
}

// ─── Toast ───
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── Năm hiện tại cho form ───
document.addEventListener('DOMContentLoaded', () => {
  const namInput = document.getElementById('inp-nam');
  if (namInput && !namInput.value) namInput.value = new Date().getFullYear() - 30;
});

// ─── Ngày tháng validation ───
(function() {
  const formEl = document.getElementById('formLapLaSo');
  if (!formEl) return;
  
  function updateDays() {
    const m = parseInt(formEl.thang?.value) || 0;
    const y = parseInt(formEl.nam?.value) || 2000;
    const isAm = document.querySelector('input[name="lich"]:checked')?.value === 'am';
    let maxDay = 30;
    if (!isAm) {
      if (m === 2) maxDay = (y%4===0&&(y%100!==0||y%400===0)) ? 29 : 28;
      else if ([1,3,5,7,8,10,12].includes(m)) maxDay = 31;
      else maxDay = 30;
    }
    const ngayEl = formEl.ngay;
    if (!ngayEl) return;
    const cur = parseInt(ngayEl.value) || 1;
    ngayEl.innerHTML = Array.from({length:maxDay},(_,i)=>`<option value="${i+1}"${i+1===cur?' selected':''}>${i+1}</option>`).join('');
  }

  formEl.thang?.addEventListener('change', updateDays);
  formEl.nam?.addEventListener('change', updateDays);
  document.querySelectorAll('input[name="lich"]').forEach(r => r.addEventListener('change', updateDays));
})();


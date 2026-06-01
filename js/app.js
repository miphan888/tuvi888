// ══════════════════════════════════════════════════════
// APP.JS — Logic trang danh mục văn khấn
// ══════════════════════════════════════════════════════

const CATEGORIES = [
  { id: 'all',        name: 'Tất cả',            icon: '📜' },
  { id: 'gia-tien',   name: 'Cúng Gia Tiên',     icon: '🏠' },
  { id: 'le-tet',     name: 'Lễ Tết',            icon: '🧧' },
  { id: 'hon-nhan',   name: 'Hôn Nhân',          icon: '💒' },
  { id: 'thoi-noi',   name: 'Thôi Nôi - Đầy Tháng', icon: '👶' },
  { id: 'tang-le',    name: 'Tang Lễ',            icon: '🕯️' },
  { id: 'nha-moi',    name: 'Nhà Mới',           icon: '🏡' },
  { id: 'khai-truong',name: 'Khai Trương',        icon: '🎊' },
  { id: 'chua-den',   name: 'Chùa - Đền - Phủ',  icon: '⛩️' },
  { id: 'xe-moi',     name: 'Cúng Xe Mới',        icon: '🚗' },
];

const CAT_NAME_MAP = {};
CATEGORIES.forEach(c => { CAT_NAME_MAP[c.id] = c.name; });

let currentCat = 'all';
let searchTerm  = '';

function renderCategoryBtns() {
  const wrap = document.getElementById('cat-grid');
  wrap.innerHTML = '';
  CATEGORIES.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (c.id === currentCat ? ' active' : '');
    btn.innerHTML = `<span class="cat-icon">${c.icon}</span>${c.name}`;
    btn.addEventListener('click', () => {
      currentCat = c.id;
      renderCategoryBtns();
      renderCards();
    });
    wrap.appendChild(btn);
  });
}

function renderCards() {
  const grid = document.getElementById('card-grid');
  const term = searchTerm.toLowerCase();

  let list = VAN_KHAN_DATA;
  if (currentCat !== 'all') {
    list = list.filter(v => v.category === currentCat);
  }
  if (term) {
    list = list.filter(v =>
      v.title.toLowerCase().includes(term) ||
      v.description.toLowerCase().includes(term)
    );
  }

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🔍</div>
      <p>Không tìm thấy bài văn khấn phù hợp.</p>
    </div>`;
    return;
  }

  grid.innerHTML = '';
  list.forEach(v => {
    const catName = CAT_NAME_MAP[v.category] || v.category;
    const a = document.createElement('a');
    a.className = 'card';
    a.href = `detail.html?slug=${v.slug}`;
    a.innerHTML = `
      <div class="card-title">${v.title}</div>
      <div class="card-desc">${v.description}</div>
      <span class="card-badge">${catName}</span>
    `;
    grid.appendChild(a);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategoryBtns();
  renderCards();

  const inp = document.getElementById('search-input');
  inp.addEventListener('input', () => {
    searchTerm = inp.value;
    renderCards();
  });
});

/**
 * script.js — Kolosal Ops Linktree
 * Features: render, add, edit, delete, search, drag-drop, export/import, copy, click counter
 */

/* ── Icons ──────────────────────────────────────────────────────────── */
const ICONS = {
  tax:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h4v6H7zM13 11h4"/><path d="M13 8h4"/></svg>`,
  trend:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  folder:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  grid:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>`,
  shield:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  doc:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  github:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  percent:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  check:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  video:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
  link:
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  arrow:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>`,
  x:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  plus:
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  catFinance:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  catLegal:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  catEducation:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  catWorkspace:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  catOther:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  pencil:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  clipboard:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  clipOk:
    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
};

/* ── Category metadata ──────────────────────────────────────────────── */
const CATEGORY_ORDER = ['Finance', 'Legal', 'Education', 'Workspace', 'Other'];
const CAT_META = {
  Finance:   { label: 'Finance',   icon: ICONS.catFinance },
  Legal:     { label: 'Legal',     icon: ICONS.catLegal },
  Education: { label: 'Education', icon: ICONS.catEducation },
  Workspace: { label: 'Workspace', icon: ICONS.catWorkspace },
  Other:     { label: 'Other',     icon: ICONS.catOther },
};

/* ── Default links ──────────────────────────────────────────────────── */
const DEFAULTS = [
  { id: '1',  label: 'Tax Planning Dashboard',            url: 'https://kolosalai-ops.github.io/tax-planning/dashboard/countries/SG',                        category: 'Finance',   icon: 'tax' },
  { id: '2',  label: 'Kolosal Finance — CFO Dashboard',   url: 'http://kolosal-finance-production.up.railway.app',                                            category: 'Finance',   icon: 'trend' },
  { id: '3',  label: 'Finance Directory',                 url: 'https://drive.google.com/drive/folders/19FTUYfKuYRCfl1YqPs88sDwJU3hQuKlM',                    category: 'Finance',   icon: 'folder' },
  { id: '4',  label: 'Finance Spreadsheet',               url: 'https://docs.google.com/spreadsheets/d/1iaUvaX-RsYPbOAC6JbLNmomEqoGuFhkKdY2GXt19QTs',        category: 'Finance',   icon: 'grid' },
  { id: '5',  label: 'Kolosal Legal — Document Platform', url: 'http://kolosal-legal-production.up.railway.app',                                               category: 'Legal',     icon: 'shield' },
  { id: '6',  label: 'Standard Legal Document',           url: 'https://docs.google.com/document/d/16LCz5nEjVxpS2RCICmP8zcuoWo0trzQnjHIVzl9JhgU/edit?usp=drive_link', category: 'Legal', icon: 'doc' },
  { id: '7',  label: 'Legal Docs Repository',             url: 'https://github.com/KolosalAI/legal-docs',                                                     category: 'Legal',     icon: 'github' },
  { id: '8',  label: 'Kolosal Math — High School to Calculus', url: 'https://kolosalai-ops.github.io/maths-calculus/#ch-number-systems',                      category: 'Education', icon: 'percent' },
  { id: '9',  label: 'CA Prep Indonesia',                 url: 'https://kolosalai-ops.github.io/cpa-prep',                                                     category: 'Education', icon: 'check' },
  { id: '10', label: 'Google Meet',                       url: 'https://meet.google.com/ien-xtnu-czv',                                                         category: 'Workspace', icon: 'video', badge: 'Join' },
];

/* ── Storage ────────────────────────────────────────────────────────── */
const LS_KEY     = 'kolosal_links';
const CLICKS_KEY = 'kolosal_clicks';

function getLinks() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveLinks(links) {
  localStorage.setItem(LS_KEY, JSON.stringify(links));
}

function loadLinks() {
  const stored = getLinks();
  if (stored) return stored;
  const seed = DEFAULTS.slice();
  saveLinks(seed);
  return seed;
}

function getClicks() {
  try { return JSON.parse(localStorage.getItem(CLICKS_KEY)) || {}; } catch { return {}; }
}

function saveClicks(c) {
  localStorage.setItem(CLICKS_KEY, JSON.stringify(c));
}

/* ── Module state ───────────────────────────────────────────────────── */
let openModal     = null;
let currentFilter = '';
let dragSrcId     = null;

/* ── Auto-detect ────────────────────────────────────────────────────── */
function detectCategory(url) {
  const u = url.toLowerCase();
  if (/tax|finance|spreadsheet|kolosal-finance/.test(u)) return 'Finance';
  if (/legal|kolosal-legal/.test(u))                    return 'Legal';
  if (/math|calculus|cpa|prep/.test(u))                 return 'Education';
  if (/meet\.google|slack|zoom|teams/.test(u))          return 'Workspace';
  return 'Other';
}

function detectIcon(url) {
  const u = url.toLowerCase();
  if (/github\.com/.test(u))   return 'github';
  if (/meet\.google/.test(u))  return 'video';
  if (/drive\.google/.test(u)) return 'folder';
  if (/spreadsheet/.test(u))   return 'grid';
  if (/\/document\//.test(u))  return 'doc';
  if (/\/tax\//.test(u))       return 'tax';
  if (/finance|cfo/.test(u))   return 'trend';
  if (/\/legal\//.test(u))     return 'shield';
  if (/math|calc/.test(u))     return 'percent';
  if (/cpa|prep/.test(u))      return 'check';
  return 'link';
}

/* ── Helpers ────────────────────────────────────────────────────────── */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Render ─────────────────────────────────────────────────────────── */
function renderLinks(links) {
  const container = document.getElementById('links-container');
  if (!container) return;

  // Apply search filter
  const filtered = currentFilter
    ? links.filter(l =>
        l.label.toLowerCase().includes(currentFilter) ||
        l.url.toLowerCase().includes(currentFilter))
    : links;

  container.innerHTML = '';

  // No-results state
  if (currentFilter && !filtered.length) {
    container.innerHTML = '<p class="no-results">No links match your search.</p>';
    return;
  }

  const clicks = getClicks();

  // Group by category preserving order
  const grouped = {};
  for (const cat of CATEGORY_ORDER) grouped[cat] = [];
  for (const link of filtered) {
    const cat = CATEGORY_ORDER.includes(link.category) ? link.category : 'Other';
    grouped[cat].push(link);
  }

  for (const cat of CATEGORY_ORDER) {
    const catLinks = grouped[cat];
    if (!catLinks.length) continue;

    const meta    = CAT_META[cat];
    const section = document.createElement('section');
    section.className    = 'category';
    section.dataset.cat  = cat;
    section.innerHTML = `
      <header class="category-header">
        <span class="category-icon" aria-hidden="true">${meta.icon}</span>
        <span class="category-label">${meta.label}</span>
      </header>
      <div class="category-links" data-cat="${escHtml(cat)}"></div>
    `;

    const linksDiv = section.querySelector('.category-links');
    for (const link of catLinks) {
      const a = document.createElement('a');
      a.className  = 'link-btn';
      a.href       = link.url;
      a.target     = '_blank';
      a.rel        = 'noopener noreferrer';
      a.dataset.id  = link.id;
      a.dataset.cat = cat;
      a.draggable   = true;

      const count = clicks[link.id] || 0;
      a.innerHTML = `
        <span class="link-icon" aria-hidden="true">${ICONS[link.icon] || ICONS.link}</span>
        <span class="link-label">${escHtml(link.label)}</span>
        ${link.badge ? `<span class="link-badge">${escHtml(link.badge)}</span>` : ''}
        <span class="link-clicks" data-id="${escHtml(link.id)}">${count > 0 ? count : ''}</span>
        <span class="link-arrow" aria-hidden="true">${ICONS.arrow}</span>
        <button class="link-copy"   aria-label="Copy URL for ${escHtml(link.label)}" data-url="${escHtml(link.url)}" tabindex="-1">${ICONS.clipboard}</button>
        <button class="link-edit"   aria-label="Edit ${escHtml(link.label)}"         data-id="${escHtml(link.id)}"  tabindex="-1">${ICONS.pencil}</button>
        <button class="link-delete" aria-label="Remove ${escHtml(link.label)}"       data-id="${escHtml(link.id)}"  tabindex="-1">${ICONS.x}</button>
      `;
      linksDiv.appendChild(a);
    }

    container.appendChild(section);
  }

  initEntranceAnimations();
  initRippleEffect();
  initDeleteButtons();
  initEditButtons();
  initCopyButtons();
  initClickCounters();
  initDragDrop();
}

/* ── Delete ─────────────────────────────────────────────────────────── */
function deleteLink(id) {
  const links = loadLinks().filter(l => l.id !== id);
  saveLinks(links);
  renderLinks(links);
}

function initDeleteButtons() {
  document.querySelectorAll('.link-delete').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      deleteLink(btn.dataset.id);
    });
  });
}

/* ── Entrance animations ────────────────────────────────────────────── */
let profileAnimated = false;

function initEntranceAnimations() {
  if (!profileAnimated) {
    profileAnimated = true;
    const profile = document.querySelector('.profile');
    if (profile) {
      profile.style.cssText = 'opacity:0; transform:translateY(-10px); transition:opacity 0.45s ease, transform 0.45s ease;';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        profile.style.opacity   = '1';
        profile.style.transform = 'translateY(0)';
      }));
    }
  }

  document.querySelectorAll('.link-btn').forEach((btn, i) => {
    const delay = 80 + i * 55;
    btn.style.transitionDelay = `${delay}ms`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      btn.classList.add('visible');
    }));
    btn.addEventListener('transitionend', () => {
      btn.style.transitionDelay = '0ms';
    }, { once: true });
  });

  document.querySelectorAll('.category').forEach((cat, i) => {
    cat.style.cssText = `opacity:0; transform:translateY(10px); transition:opacity 0.4s ease ${100 + i * 40}ms, transform 0.4s ease ${100 + i * 40}ms;`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      cat.style.opacity   = '1';
      cat.style.transform = 'translateY(0)';
    }));
  });
}

/* ── Ripple ─────────────────────────────────────────────────────────── */
function initRippleEffect() {
  document.querySelectorAll('.link-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.target.closest('.link-delete, .link-edit, .link-copy')) return;
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/* ── Modal ──────────────────────────────────────────────────────────── */
function initModal() {
  const overlay    = document.getElementById('modal-overlay');
  const fab        = document.getElementById('fab-add');
  const form       = document.getElementById('add-link-form');
  const inputId    = document.getElementById('input-id');
  const inputUrl   = document.getElementById('input-url');
  const inputLbl   = document.getElementById('input-label');
  const inputCat   = document.getElementById('input-category');
  const catHint    = document.getElementById('cat-hint');
  const btnCancel  = document.getElementById('btn-cancel');
  const btnSubmit  = document.getElementById('btn-submit');
  const btnReset   = document.getElementById('btn-reset');
  const modalTitle = document.getElementById('modal-title');

  // Expose to module scope so initEditButtons can call it
  openModal = function(editLink) {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    catHint.textContent = '';

    if (editLink) {
      // Edit mode — populate form with existing values
      inputId.value  = editLink.id;
      inputUrl.value = editLink.url;
      inputLbl.value = editLink.label;
      inputCat.value = editLink.category;
      modalTitle.textContent = 'Edit Link';
      btnSubmit.textContent  = 'Save Changes';
    } else {
      // Add mode — start fresh
      form.reset();
      inputId.value = '';
      modalTitle.textContent = 'Add Link';
      btnSubmit.textContent  = 'Add Link';
      inputUrl.focus();
    }
  };

  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  fab.addEventListener('click', () => openModal());
  btnCancel.addEventListener('click', closeModal);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });

  // Auto-detect category only in add mode (inputId empty)
  inputUrl.addEventListener('input', () => {
    const url = inputUrl.value.trim();
    if (!url) { catHint.textContent = ''; return; }
    if (!inputId.value) {
      inputCat.value = detectCategory(url);
      catHint.textContent = '(auto-detected)';
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const url   = inputUrl.value.trim();
    const label = inputLbl.value.trim();
    const cat   = inputCat.value;
    const id    = inputId.value;
    if (!url || !label) return;

    const links = loadLinks();

    if (id) {
      // Edit mode — update existing link in place
      const link = links.find(l => l.id === id);
      if (link) {
        link.url      = url;
        link.label    = label;
        link.category = cat;
        link.icon     = detectIcon(url);
      }
    } else {
      // Add mode — push new link
      links.push({ id: String(Date.now()), label, url, category: cat, icon: detectIcon(url) });
    }

    saveLinks(links);
    renderLinks(links);
    closeModal();
  });

  btnReset.addEventListener('click', () => {
    if (confirm('Reset all links to defaults? This cannot be undone.')) {
      const seed = DEFAULTS.slice();
      saveLinks(seed);
      renderLinks(seed);
      closeModal();
    }
  });
}

/* ── Edit ───────────────────────────────────────────────────────────── */
function initEditButtons() {
  document.querySelectorAll('.link-edit').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      const link = loadLinks().find(l => l.id === btn.dataset.id);
      if (link && openModal) openModal(link);
    });
  });
}

/* ── Search ─────────────────────────────────────────────────────────── */
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  if (!searchInput || !searchClear) return;

  searchInput.addEventListener('input', () => {
    currentFilter = searchInput.value.trim().toLowerCase();
    searchClear.style.display = currentFilter ? 'block' : 'none';
    renderLinks(loadLinks());
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    currentFilter     = '';
    searchClear.style.display = 'none';
    renderLinks(loadLinks());
    searchInput.focus();
  });
}

/* ── Export / Import ────────────────────────────────────────────────── */
function initExportImport() {
  const btnExport  = document.getElementById('btn-export');
  const importFile = document.getElementById('import-file');
  if (!btnExport || !importFile) return;

  btnExport.addEventListener('click', () => {
    const data = JSON.stringify(loadLinks(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'kolosal-links.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  importFile.addEventListener('change', () => {
    const file = importFile.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (!Array.isArray(parsed) || !parsed.every(l => l.id && l.label && l.url && l.category)) {
          alert('Invalid links file. Please use a previously exported file.');
          return;
        }
        saveLinks(parsed);
        renderLinks(parsed);
      } catch {
        alert('Failed to parse the file. Make sure it is a valid JSON file.');
      } finally {
        importFile.value = '';
      }
    };
    reader.readAsText(file);
  });
}

/* ── Copy URL to Clipboard ──────────────────────────────────────────── */
function fallbackCopy(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
  document.body.appendChild(ta);
  ta.select();
  try {
    if (document.execCommand('copy')) onSuccess();
  } finally {
    document.body.removeChild(ta);
  }
}

function initCopyButtons() {
  document.querySelectorAll('.link-copy').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      const url = btn.dataset.url;

      const doSuccess = () => {
        btn.innerHTML = ICONS.clipOk;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = ICONS.clipboard;
          btn.classList.remove('copied');
        }, 1500);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(doSuccess).catch(() => fallbackCopy(url, doSuccess));
      } else {
        fallbackCopy(url, doSuccess);
      }
    });
  });
}

/* ── Click Counter ──────────────────────────────────────────────────── */
function initClickCounters() {
  document.querySelectorAll('.link-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.target.closest('.link-delete, .link-edit, .link-copy')) return;
      const id     = btn.dataset.id;
      const clicks = getClicks();
      clicks[id]   = (clicks[id] || 0) + 1;
      saveClicks(clicks);
      const span = btn.querySelector('.link-clicks');
      if (span) span.textContent = clicks[id];
    });
  });
}

/* ── Drag and Drop ──────────────────────────────────────────────────── */
function initDragDrop() {
  document.querySelectorAll('.link-btn').forEach(btn => {
    btn.addEventListener('dragstart', e => {
      dragSrcId = btn.dataset.id;
      btn.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    btn.addEventListener('dragend', () => {
      btn.classList.remove('dragging');
      document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });

    btn.addEventListener('dragover', e => {
      e.preventDefault();
      if (dragSrcId && dragSrcId !== btn.dataset.id) {
        btn.classList.add('drag-over');
      }
    });

    btn.addEventListener('dragleave', () => {
      btn.classList.remove('drag-over');
    });

    btn.addEventListener('drop', e => {
      e.preventDefault();
      e.stopPropagation(); // don't bubble up to .category-links
      btn.classList.remove('drag-over');
      if (!dragSrcId || dragSrcId === btn.dataset.id) return;

      const targetId  = btn.dataset.id;
      const targetCat = btn.dataset.cat;

      const links  = loadLinks();
      const srcIdx = links.findIndex(l => l.id === dragSrcId);
      const tgtIdx = links.findIndex(l => l.id === targetId);
      if (srcIdx === -1 || tgtIdx === -1) { dragSrcId = null; return; }

      const [srcLink] = links.splice(srcIdx, 1);
      srcLink.category = targetCat;

      // Re-find target index after splice
      const newTgtIdx = links.findIndex(l => l.id === targetId);
      links.splice(newTgtIdx, 0, srcLink);

      saveLinks(links);
      renderLinks(links);
      dragSrcId = null;
    });
  });

  // Drop onto empty space inside a category container
  document.querySelectorAll('.category-links').forEach(div => {
    div.addEventListener('dragover', e => e.preventDefault());

    div.addEventListener('drop', e => {
      if (e.target.closest('.link-btn')) return; // handled by link-btn drop
      e.preventDefault();
      if (!dragSrcId) return;

      const cat    = div.dataset.cat;
      const links  = loadLinks();
      const srcIdx = links.findIndex(l => l.id === dragSrcId);
      if (srcIdx === -1) { dragSrcId = null; return; }

      const [srcLink] = links.splice(srcIdx, 1);
      srcLink.category = cat;

      // Append after the last link in this category
      let lastCatIdx = -1;
      links.forEach((l, i) => { if (l.category === cat) lastCatIdx = i; });

      if (lastCatIdx >= 0) {
        links.splice(lastCatIdx + 1, 0, srcLink);
      } else {
        links.push(srcLink);
      }

      saveLinks(links);
      renderLinks(links);
      dragSrcId = null;
    });
  });
}

/* ── Init ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initModal();           // must run first — defines openModal
  initSearch();
  initExportImport();
  renderLinks(loadLinks()); // calls initEditButtons which uses openModal
});

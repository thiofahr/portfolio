const canvas  = document.getElementById("graph-canvas");
const ctx     = canvas.getContext("2d");
const wrapper = canvas.parentElement;
let GW, GH, dpr;

function resizeGraph() {
  dpr = window.devicePixelRatio || 1;
  GW  = wrapper.clientWidth;
  GH  = wrapper.clientHeight;
  canvas.width  = GW * dpr;
  canvas.height = GH * dpr;
  canvas.style.width  = GW + "px";
  canvas.style.height = GH + "px";
  ctx.scale(dpr, dpr);
}
resizeGraph();

let pan = { x: 0, y: 0 };
let zoom = 1;
let isDragging = false, dragStart = null, panStart = null, dragMoved = false;
let hoveredNode = null;

function getCatColor(cat) { return cat ? CATS[cat].color : "#FF5B3E"; }
function hexToRgb(hex) {
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const n = parseInt(hex, 16);
  return [(n>>16)&255, (n>>8)&255, n&255];
}
function clientToWorld(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return { x: (clientX - rect.left - GW/2 - pan.x) / zoom + GW/2, y: (clientY - rect.top - GH/2 - pan.y) / zoom + GH/2 };
}
function nodeAt(clientX, clientY, extraRadius = 0) {
  const w = clientToWorld(clientX, clientY);
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i];
    if (n.x == null) continue;
    const dx = n.x - w.x, dy = n.y - w.y;
    const r = n.size + 4 + extraRadius;
    if (dx*dx + dy*dy <= r*r) return n;
  }
  return null;
}

const nodes = NODES.map(n => ({ ...n }));
const nodeById = {};
nodes.forEach(n => nodeById[n.id] = n);
const links = LINKS.map(([a,b]) => ({ source: nodeById[a], target: nodeById[b] }));

const MAIN_IDS = new Set(LINKS.filter(([a,b]) => a === "me" || b === "me").map(([a,b]) => a === "me" ? b : a));
const PARENT_OF = {};
nodes.forEach(n => {
  if (n.id === "me" || MAIN_IDS.has(n.id) || !n.cat) return;
  for (const [a,b] of LINKS) {
    const other = a === n.id ? b : b === n.id ? a : null;
    if (other && MAIN_IDS.has(other) && nodeById[other].cat === n.cat) { PARENT_OF[n.id] = other; return; }
  }
  for (const id of MAIN_IDS) { if (nodeById[id].cat === n.cat) { PARENT_OF[n.id] = id; return; } }
});

function computeLayout() {
  const mainList = [...MAIN_IDS];
  const subOf = {};
  mainList.forEach(id => { subOf[id] = nodes.filter(n => PARENT_OF[n.id] === id); });
  const maxSubs = Math.max(...mainList.map(id => subOf[id].length));
  const minDim = Math.min(GW, GH);
  const mainR  = minDim * Math.min(0.54, maxSubs * 0.044);
  const subR   = minDim * Math.min(0.20, 0.07 + maxSubs * 0.022);
  nodeById["me"].x = GW/2; nodeById["me"].y = GH/2;
  mainList.forEach((mid, mi) => {
    const mainAngle = (mi / mainList.length) * Math.PI * 2 - Math.PI / 2;
    const mx = GW/2 + Math.cos(mainAngle) * mainR;
    const my = GH/2 + Math.sin(mainAngle) * mainR;
    nodeById[mid].x = mx; nodeById[mid].y = my;
    const subs = subOf[mid]; const count = subs.length;
    if (!count) return;
    const maxFan = Math.min(Math.PI * 0.65, count * 0.30);
    subs.forEach((sub, si) => {
      const offset = count === 1 ? 0 : -maxFan/2 + (si / (count - 1)) * maxFan;
      sub.x = mx + Math.cos(mainAngle + offset) * subR;
      sub.y = my + Math.sin(mainAngle + offset) * subR;
    });
  });
  const all = nodes.filter(n => n.x != null);
  for (let pass = 0; pass < 120; pass++) {
    let moved = false;
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const a = all[i], b = all[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 0.001;
        const minD = a.size + b.size + 12;
        if (dist >= minD) continue;
        moved = true;
        const push = (minD - dist) / 2 + 1;
        const nx = dx/dist, ny = dy/dist;
        const aF = a.id === "me" || MAIN_IDS.has(a.id);
        const bF = b.id === "me" || MAIN_IDS.has(b.id);
        if (!aF) { a.x -= nx*push; a.y -= ny*push; }
        if (!bF) { b.x += nx*push; b.y += ny*push; }
        if (aF && bF) { a.x -= nx*push*0.5; a.y -= ny*push*0.5; b.x += nx*push*0.5; b.y += ny*push*0.5; }
      }
    }
    if (!moved) break;
  }
}
computeLayout();

function getThemeColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    bg: s.getPropertyValue('--surface2').trim() || '#f0ede8',
    text: s.getPropertyValue('--text').trim() || '#1a1917',
    isDark: document.documentElement.getAttribute('data-theme') === 'dark'
  };
}

function showTooltip(node, clientX, clientY) {
  const tt = document.getElementById("graph-tooltip");
  document.getElementById("gtt-label").textContent = node.label;
  document.getElementById("gtt-desc").textContent  = node.desc;
  const rect = wrapper.getBoundingClientRect();
  let left = clientX - rect.left + 14;
  let top  = clientY - rect.top  - 20;
  if (left + 220 > wrapper.clientWidth)  left = clientX - rect.left - 220 - 10;
  if (top < 8) top = 8;
  tt.style.left = left + "px";
  tt.style.top  = top  + "px";
  tt.classList.add("visible");
}
function hideTooltip() { document.getElementById("graph-tooltip").classList.remove("visible"); }

canvas.addEventListener("mousemove", e => {
  const n = nodeAt(e.clientX, e.clientY);
  if (n !== hoveredNode) { hoveredNode = n; n ? showTooltip(n, e.clientX, e.clientY) : hideTooltip(); draw(); }
  else if (n) showTooltip(n, e.clientX, e.clientY);
});
canvas.addEventListener("mouseleave", () => { hoveredNode = null; hideTooltip(); draw(); });

canvas.addEventListener("mousedown", e => {
  isDragging = true; dragMoved = false;
  dragStart = { x: e.clientX, y: e.clientY };
  panStart  = { ...pan };
});
window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y;
  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
  pan.x = panStart.x + dx; pan.y = panStart.y + dy; draw();
});
window.addEventListener("mouseup", () => { isDragging = false; });

canvas.addEventListener("wheel", e => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;
  const factor = e.deltaY > 0 ? 0.88 : 1.14;
  const nz = Math.max(0.3, Math.min(4, zoom * factor));
  pan.x = mx - GW/2 - (mx - GW/2 - pan.x) * (nz / zoom);
  pan.y = my - GH/2 - (my - GH/2 - pan.y) * (nz / zoom);
  zoom = nz; draw();
}, { passive: false });

function applyZoom(factor) {
  const nz = Math.max(0.3, Math.min(4, zoom * factor));
  pan.x = pan.x * (nz / zoom); pan.y = pan.y * (nz / zoom);
  zoom = nz; draw();
}
document.getElementById("zoom-in").addEventListener("click",  () => applyZoom(1.25));
document.getElementById("zoom-out").addEventListener("click", () => applyZoom(0.8));

let touchStart = null, touchMoved = false, touchCanvasRect = null;
canvas.addEventListener("touchstart", e => {
  e.preventDefault();
  if (e.touches.length === 1) {
    touchCanvasRect = canvas.getBoundingClientRect();
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panStart = { ...pan }; touchMoved = false;
  }
}, { passive: false });
canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  if (e.touches.length === 1 && touchStart) {
    const dx = e.touches[0].clientX - touchStart.x, dy = e.touches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) touchMoved = true;
    pan.x = panStart.x + dx; pan.y = panStart.y + dy;
    hideTooltip(); hoveredNode = null; draw();
  }
}, { passive: false });
canvas.addEventListener("touchend", e => {
  e.preventDefault();
  if (!touchMoved && touchStart && touchCanvasRect) {
    const touch = e.changedTouches[0];
    const cx = touch.clientX - touchCanvasRect.left, cy = touch.clientY - touchCanvasRect.top;
    const wx = (cx - GW/2 - pan.x) / zoom + GW/2, wy = (cy - GH/2 - pan.y) / zoom + GH/2;
    let found = null;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i]; if (n.x == null) continue;
      const dx = n.x - wx, dy = n.y - wy;
      if (dx*dx + dy*dy <= (n.size+20)*(n.size+20)) { found = n; break; }
    }
    if (found && found === hoveredNode) { hoveredNode = null; hideTooltip(); }
    else if (found) { hoveredNode = found; showTooltip(found, touch.clientX, touch.clientY); }
    else { hoveredNode = null; hideTooltip(); }
    draw();
  }
  touchStart = null; touchCanvasRect = null;
}, { passive: false });

function draw() {
  const { bg, text, isDark } = getThemeColors();
  ctx.clearRect(0, 0, GW, GH);
  ctx.fillStyle = isDark ? '#1a1917' : '#f5f4f0';
  ctx.fillRect(0, 0, GW, GH);
  ctx.save();
  ctx.translate(GW/2 + pan.x, GH/2 + pan.y);
  ctx.scale(zoom, zoom);
  ctx.translate(-GW/2, -GH/2);

  CAT_NAMES.forEach(cat => {
    const members = nodes.filter(n => n.cat === cat && n.x != null);
    if (!members.length) return;
    const cx = members.reduce((s,n) => s+n.x, 0) / members.length;
    const cy = members.reduce((s,n) => s+n.y, 0) / members.length;
    const maxR = members.reduce((m,n) => Math.max(m, Math.hypot(n.x-cx,n.y-cy)+n.size), 0);
    const blobR = Math.max(maxR + 20, 40);
    const [r,g,b] = hexToRgb(CATS[cat].color);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, blobR);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.09)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath(); ctx.arc(cx, cy, blobR, 0, Math.PI*2);
    ctx.fillStyle = grad; ctx.fill();
  });

  links.forEach(e => {
    const src = e.source;
    const tgt = e.target;

    if (!src || !tgt || src.x == null) return;

    ctx.beginPath();
    ctx.moveTo(src.x, src.y);
    ctx.lineTo(tgt.x, tgt.y);

    ctx.strokeStyle = hoveredNode
      ? (isDark
          ? "rgba(255,255,255,0.12)"
          : "rgba(0,0,0,0.12)")
      : (isDark
          ? "rgba(255,255,255,0.28)"
          : "rgba(0,0,0,0.28)");

    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  nodes.forEach(n => {
    if (n.x == null) return;
    const isHovered = n === hoveredNode;
    const col = getCatColor(n.cat);
    const [r,g,b] = hexToRgb(col);
    const radius = n.size + (isHovered ? 3 : 0);
    ctx.globalAlpha = hoveredNode && !isHovered ? 0.2 : 1;
    if (isHovered || n.id === "me") {
      const grad = ctx.createRadialGradient(n.x, n.y, radius*0.4, n.x, n.y, radius+16);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.22)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath(); ctx.arc(n.x, n.y, radius+16, 0, Math.PI*2);
      ctx.fillStyle = grad; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(n.x, n.y, radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${r},${g},${b},${isHovered ? 1 : 0.85})`; ctx.fill();
    ctx.beginPath(); ctx.arc(n.x, n.y, radius, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(${r},${g},${b},0.35)`; ctx.lineWidth = 1.2; ctx.stroke();
    if (n.id === "me") {
      ctx.beginPath(); ctx.arc(n.x, n.y, radius+7, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(${r},${g},${b},0.45)`; ctx.lineWidth = 1.2;
      ctx.setLineDash([3,4]); ctx.stroke(); ctx.setLineDash([]);
    }
    const fSize = Math.max(8, Math.min(11.5, n.size * 0.54));
    ctx.font = `600 ${fSize}px 'Source Sans 3', sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = isDark ? "rgba(240,237,232,0.92)" : "#1a1917";
    const words = n.label.split(" ");
    if (words.length === 1) {
      ctx.fillText(n.label, n.x, n.y);
    } else {
      let bestSplit = 1, bestDiff = Infinity;
      for (let s = 1; s < words.length; s++) {
        const diff = Math.abs(ctx.measureText(words.slice(0,s).join(" ")).width - ctx.measureText(words.slice(s).join(" ")).width);
        if (diff < bestDiff) { bestDiff = diff; bestSplit = s; }
      }
      const lh = fSize * 1.15;
      ctx.fillText(words.slice(0, bestSplit).join(" "), n.x, n.y - lh/2);
      ctx.fillText(words.slice(bestSplit).join(" "),    n.x, n.y + lh/2);
    }
    ctx.globalAlpha = 1;
  });
  ctx.restore();
}

const legendEl = document.getElementById("graph-legend");
CAT_NAMES.forEach(name => {
  const el = document.createElement("div");
  el.className = "gl-item";
  el.innerHTML = `<span class="gl-dot" style="background:${CATS[name].color}"></span><span>${name}</span>`;
  legendEl.appendChild(el);
});
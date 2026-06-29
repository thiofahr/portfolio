// ── Theme toggle ────────────────────────────────────────────
const toggleBtn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');
let dark = false;
toggleBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  icon.textContent = dark ? '☀' : '☾';
  draw();
});
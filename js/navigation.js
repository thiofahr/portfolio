const pageLinks = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');

function showPage(target) {
  pages.forEach(page => page.classList.toggle('active', page.id === `page-${target}`));
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === target);
  });
  document.body.classList.toggle('about-active', target === 'about');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

pageLinks.forEach(link => {
  link.addEventListener('click', event => {
    const target = link.dataset.page;
    if (!target) return;
    event.preventDefault();
    showPage(target);
  });
});

document.body.classList.add('about-active');

const galleries = {
  climate: [
    { src: 'assets/dataviz/chde/chde-frequency-hist.png', caption: 'Historical overview of compound hot-dry extremes over Indonesia.' },
    { src: 'assets/dataviz/chde/chde-frequency-proj.png', caption: 'Projected change in compound hot-dry extreme frequency.' },
    { src: 'assets/dataviz/chde/chde-toe-map.png', caption: 'Time of emergence of compound hot-dry extremes across Indonesia, showing spatial heterogeneity.' },
    { src: 'assets/dataviz/chde/chde-toe-pct.png', caption: 'Cumulative probability of hot-dry extremes emergence across Indonesia based on two scenarios.' }
  ],
  fwi: [
    { src: 'assets/dataviz/fwi/fwi-01.png', caption: 'August 2026 Fire Weather Index over Kalimantan.' },
    { src: 'assets/dataviz/fwi/fwi-02.png', caption: 'Record-breaking daily FWI in the last days of August 2026 over Kalimantan.' },
    { src: 'assets/dataviz/fwi/fwi-03.png', caption: 'August 2026 Fire Weather Index over Kalimantan compared to other years in history.' },
    { src: 'assets/dataviz/fwi/fwi-04.png', caption: 'Comparison of FWI in August by ENSO phase.' }
  
  ],
  ocean: [
    { src: 'assets/dataviz/ocean-01.svg', caption: 'Equatorial wave activity associated with the 2023/24 El Niño.' },
    { src: 'assets/dataviz/ocean-02.svg', caption: 'Ocean surface variability and equatorial wave structure.' },
    { src: 'assets/dataviz/ocean-03.svg', caption: 'Spectral and EOF-based analysis of ocean dynamics.' }
  ],
  risk: [
    { src: 'assets/dataviz/climate-risk-agriculture/risk.png', caption: 'Risk of climate change to Agriculture sector in Indonesia using IPCC framework.' },
    { src: 'assets/dataviz/climate-risk-agriculture/indices.png', caption: 'Contribution of each component indices to the risk calculation.' }
  ]
};

const modal = document.getElementById('viz-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const modalCounter = document.getElementById('modal-counter');
const closeButton = document.getElementById('modal-close');
const previousButton = document.getElementById('modal-prev');
const nextButton = document.getElementById('modal-next');
let activeGallery = [];
let activeIndex = 0;

function renderGallery() {
  const item = activeGallery[activeIndex];
  modalImage.src = item.src;
  modalImage.alt = item.caption;
  modalCaption.textContent = item.caption;
  modalCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(activeGallery.length).padStart(2, '0')}`;
  const multiple = activeGallery.length > 1;
  previousButton.hidden = !multiple;
  nextButton.hidden = !multiple;
}

function openGallery(name) {
  activeGallery = galleries[name] || [];
  activeIndex = 0;
  if (!activeGallery.length) return;
  renderGallery();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeGallery() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalImage.src = '';
}

function nextImage() {
  if (activeGallery.length < 2) return;
  activeIndex = (activeIndex + 1) % activeGallery.length;
  renderGallery();
}

function previousImage() {
  if (activeGallery.length < 2) return;
  activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
  renderGallery();
}

document.querySelectorAll('.viz-card').forEach(card => {
  card.addEventListener('click', () => openGallery(card.dataset.gallery));
});
closeButton.addEventListener('click', closeGallery);
nextButton.addEventListener('click', nextImage);
previousButton.addEventListener('click', previousImage);
modal.addEventListener('click', event => {
  if (event.target === modal) closeGallery();
});

document.addEventListener('keydown', event => {
  if (!modal.classList.contains('open')) return;
  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowRight') nextImage();
  if (event.key === 'ArrowLeft') previousImage();
});

let touchStartX = 0;
modal.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
modal.addEventListener('touchend', event => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) < 45) return;
  if (delta < 0) nextImage();
  else previousImage();
}, { passive: true });

function getHeaderOffset() {
  const header = document.querySelector('header');
  if (!header) return 0;
  // include a small extra gap so content isn't flush against header
  return header.offsetHeight + 12;
}

function scrollToElementWithOffset(el, offset = 0, behavior = 'smooth') {
  const rect = el.getBoundingClientRect();
  const targetY = window.scrollY + rect.top - offset;
  window.scrollTo({ top: Math.max(0, Math.floor(targetY)), behavior });
}

function handleHashNavigation(hash) {
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;

  // reset to top first to avoid browser auto-jump interfering with our animation
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  const isSmall = window.matchMedia('(max-width: 1000px)').matches;

  // on small screens scroll the section to the top (accounting for header)
  if (isSmall) {
    // allow layout to settle before measuring
    requestAnimationFrame(() => {
      const offset = getHeaderOffset();
      scrollToElementWithOffset(target, offset, 'smooth');
    });
    return;
  }

  // larger screens: center the section for a nicer composition
  requestAnimationFrame(() => {
    try {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (e) {
      // fallback if scrollIntoView options are unsupported
      const offset = Math.max(0, Math.floor(window.innerHeight / 2 - target.getBoundingClientRect().height / 2));
      scrollToElementWithOffset(target, -offset, 'smooth');
    }
  });
}

// Run on load if page has a hash
window.addEventListener('load', () => handleHashNavigation(window.location.hash));

// Also handle later hash changes (user clicks internal links)
window.addEventListener('hashchange', () => handleHashNavigation(window.location.hash));

// Intercept clicks on same-page anchors so we can control offset immediately
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href === '#') return;

  const target = document.querySelector(href);
  if (!target) return;

  // let the browser update the hash (so history works), but prevent default jump
  e.preventDefault();
  history.pushState(null, '', href);
  handleHashNavigation(href);
});

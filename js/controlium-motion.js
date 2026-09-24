(() => {
  'use strict';
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pauseButton = document.querySelector('.motion-toggle');
  let userPaused = false;
  try { userPaused = localStorage.getItem('controlium-motion-paused') === 'true'; } catch { /* Optional preference only. */ }
  let observer;
  const reduced = () => userPaused || preference.matches;
  function updateMotion() {
    root.dataset.motion = reduced() ? 'paused' : 'enabled';
    if (pauseButton) {
      pauseButton.setAttribute('aria-pressed', String(reduced()));
      pauseButton.textContent = preference.matches ? 'Reduced motion' : userPaused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
      pauseButton.setAttribute('aria-label', preference.matches ? 'Animations disabled by your device’s reduced motion preference' : userPaused ? 'Resume decorative animations' : 'Pause decorative animations');
      pauseButton.disabled = preference.matches;
    }
    if (reduced()) {
      observer?.disconnect();
      document.querySelectorAll('.will-reveal').forEach(el => el.classList.add('is-visible'));
    }
  }
  pauseButton?.addEventListener('click', () => {
    userPaused = !userPaused;
    try { localStorage.setItem('controlium-motion-paused', String(userPaused)); } catch { /* Not required. */ }
    updateMotion();
  });
  preference.addEventListener('change', updateMotion);
  updateMotion();
  const progress = document.querySelector('.reading-progress');
  const header = document.querySelector('.site-header');
  let framePending = false;
  function updateScroll() {
    const available = root.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${available > 0 ? Math.min(1, window.scrollY / available) : 0})`;
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    framePending = false;
  }
  function requestScrollUpdate() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', requestScrollUpdate, {passive:true});
  window.addEventListener('resize', requestScrollUpdate, {passive:true});
  updateScroll();
  if ('IntersectionObserver' in window && !reduced()) {
    const targets = document.querySelectorAll('.intro-grid > div, .section-heading, .solution-card, .product-card, .project-card, .market-copy, .contact-layout > div, .contact-layout form, .detail-row, .project-detail, .principles article, .markets-layout article, .closing .container');
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:0, rootMargin:'0px 0px -25px 0px'});
    targets.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 25) return;
      el.classList.add('will-reveal');
      const siblings = [...el.parentElement.children];
      el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el) % 3, 2) * 85}ms`);
      observer.observe(el);
    });
    // Keyboard navigation must never land on invisible content.
    document.addEventListener('focusin', event => {
      const target = event.target.closest('.will-reveal');
      if (target) { target.classList.add('is-visible'); observer.unobserve(target); }
    });
  }
  const hero = document.querySelector('.hero[data-mood]');
  const descriptions = {
    unwind:'A warm welcome. A slower pace.',
    entertain:'Brighter moments. Shared together.',
    away:'A quieter space. Ready when you return.'
  };
  document.querySelectorAll('[data-mood-choice]').forEach(button => button.addEventListener('click', () => {
    const choice = button.dataset.moodChoice;
    if (!hero || !descriptions[choice]) return;
    hero.dataset.mood = choice;
    document.querySelectorAll('[data-mood-choice]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const status = document.querySelector('#mood-status');
    if (status) status.textContent = descriptions[choice];
  }));
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-category]').forEach(card => {
      card.classList.remove('filter-arrive');
      if (!card.hidden) {
        card.classList.add('is-visible');
        if (!reduced()) requestAnimationFrame(() => card.classList.add('filter-arrive'));
      }
    });
    requestScrollUpdate();
  }));
})();

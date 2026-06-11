/* PROTOCOL ZERO — animations.js */

(function () {
  'use strict';

  /* ── 1. Add .reveal to sections and key elements ── */
  const revealTargets = document.querySelectorAll('section, .grave-item, .project-card');
  revealTargets.forEach(el => {
    /* project-card and grave-item have their own reveal class logic */
    if (!el.classList.contains('project-card') && !el.classList.contains('grave-item')) {
      el.classList.add('reveal');
    }
  });

  /* ── 2. IntersectionObserver — fire once per element ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* fire once */
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .grave-item, .project-card').forEach(el => {
    observer.observe(el);
  });

  /* ── 3. Terminal lines — reset & re-trigger on each page ── */
  /* The CSS handles the animation; JS just ensures lines in non-hero
     sections also get a staggered reveal after their parent is visible */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lines = entry.target.querySelectorAll('.terminal-line');
          lines.forEach((line, i) => {
            line.style.animationDelay = `${i * 0.45}s`;
            line.style.animationName = 'none'; /* reset */
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                line.style.animationName = '';
              });
            });
          });
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

  /* ── 4. Nav active state — auto-detect current page ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ── 5. Mobile Menu Toggle ── */
  const menuToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── 6. Cursor blink — only on elements with .cursor ── */
  /* handled purely in CSS, nothing to do here */

})();

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
    function toggleMenu() {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      const isOpen = mobileMenu.classList.contains('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      menuToggle.setAttribute('aria-expanded', isOpen);
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  /* ── 6. Section minimize toggles ── */
  document.querySelectorAll('.section-toggle[data-toggle]').forEach(btn => {
    const targetId = btn.getAttribute('data-toggle');
    const content = document.getElementById(targetId);
    if (!content) return;

    const storageKey = 'toggle-' + targetId;
    const saved = sessionStorage.getItem(storageKey);

    if (saved === 'expanded') {
      content.classList.remove('minimized');
      btn.textContent = '[ MINIMIZE ]';
    } else {
      content.classList.add('minimized');
      btn.textContent = '[ EXPAND ]';
    }

    btn.addEventListener('click', () => {
      const isMinimized = content.classList.toggle('minimized');
      btn.textContent = isMinimized ? '[ EXPAND ]' : '[ MINIMIZE ]';
      sessionStorage.setItem(storageKey, isMinimized ? 'minimized' : 'expanded');
    });
  });

  /* ── 7. Cursor blink — only on elements with .cursor ── */
  /* handled purely in CSS, nothing to do here */

})();

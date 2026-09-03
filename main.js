/* Protocol Zero v3 — minimal interactions */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active nav
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();

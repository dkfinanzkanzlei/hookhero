/* ============================================================
   shared.js — Gemeinsame Logik für Hook Hero & Close Hero
   Wird von beiden Seiten genutzt (inline eingebettet oder als Modul)
   ============================================================ */

/**
 * Animierter Custom Cursor
 * @param {string} cursorId   - Element-ID des Cursor-Dots
 * @param {string} ringId     - Element-ID des Cursor-Rings
 * @param {string} hoverBig   - Breite/Höhe des Dots beim Hover (px)
 * @param {string} ringBig    - Breite/Höhe des Rings beim Hover (px)
 */
export function initCursor(cursorId, ringId, hoverBig = '18px', ringBig = '50px') {
  const cursor = document.getElementById(cursorId);
  const ring   = document.getElementById(ringId);
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function tick() {
    rx += (mx - rx) * .14;
    ry += (my - ry) * .14;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    ring.style.left   = rx + 'px'; ring.style.top   = ry + 'px';
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a, button, .lead-card, .feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = hoverBig; cursor.style.height = hoverBig;
      ring.style.width   = ringBig;  ring.style.height   = ringBig;
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = ''; cursor.style.height  = '';
      ring.style.width    = ''; ring.style.height    = '';
    });
  });
}

/**
 * Scroll-Reveal via IntersectionObserver
 * Fügt .visible zur Klasse hinzu, sobald Element sichtbar wird
 */
export function initScrollReveal(selectors = '.reveal, .step, .how-step', threshold = 0.12) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold });
  document.querySelectorAll(selectors).forEach(el => obs.observe(el));
}

/**
 * Nav-Hintergrund beim Scrollen abdunkeln
 * @param {string} navId        - Element-ID der Nav
 * @param {string} scrolledBg   - Hintergrundwert wenn gescrollt
 * @param {string} topBg        - Hintergrundwert ganz oben
 */
export function initNavScroll(navId, scrolledBg, topBg) {
  const nav = document.getElementById(navId);
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60 ? scrolledBg : topBg;
  });
}

/**
 * Count-Up Animation für Zahlen mit data-count Attribut
 */
export function initCountUp(selector = '[data-count]', duration = 1800) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      let start    = 0;
      const step   = ts => {
        if (!start) start = ts;
        const p    = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target).toLocaleString('de-DE') + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('de-DE') + suffix;
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(selector).forEach(el => obs.observe(el));
}

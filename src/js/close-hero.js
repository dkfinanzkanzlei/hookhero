/* ============================================================
   close-hero.js — Logik für Close Hero Lead-Shop
   ============================================================ */

// ⚠️ ANPASSEN: Deinen echten PayPal.me-Link hier eintragen
export const PAYPAL_ME = 'https://www.paypal.com/paypalme/hookhero';

/**
 * Kaufmodal initialisieren
 * Öffnet sich beim Klick auf "Jetzt kaufen" Buttons der Lead-Cards
 */
export function initModal() {
  const modal      = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  if (!modal) return;

  let currentPrice = 0;
  let currentMode  = 'full';

  // Öffnen via Lead-Card Button
  document.querySelectorAll('.lead-card .btn-buy').forEach(btn => {
    if (btn.tagName === 'A') return; // Custom-Card hat mailto-Link
    btn.addEventListener('click', () => openModal(btn.closest('.lead-card')));
  });

  function openModal(card) {
    const price = parseFloat(card.dataset.price);
    if (!price) return;
    currentPrice = price;
    currentMode  = 'full';

    document.getElementById('modalCat').textContent   = card.dataset.cat;
    document.getElementById('modalTitle').textContent = card.dataset.title;
    document.getElementById('modalDesc').textContent  = card.dataset.desc;
    document.getElementById('modalPrice').textContent = '€ ' + price.toFixed(2).replace('.', ',');

    const rate = (price / 3).toFixed(2).replace('.', ',');
    document.getElementById('rateSubText').textContent = `3 × € ${rate} / Monat via PayPal`;

    // Radio zurücksetzen
    document.querySelector('input[value="full"]').checked = true;
    document.getElementById('optFull').classList.add('active');
    document.getElementById('optRate').classList.remove('active');

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Schließen
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Zahlungsart wählen
  document.querySelectorAll('.pay-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      currentMode = opt.querySelector('input').value;
    });
  });

  // PayPal weiterleiten
  document.getElementById('paypalBtn').addEventListener('click', () => {
    const amount = currentMode === 'rate'
      ? parseFloat((currentPrice / 3).toFixed(2))
      : currentPrice;
    window.open(PAYPAL_ME + '/' + amount + 'EUR', '_blank', 'noopener');
  });
}

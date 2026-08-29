/**
 * ==========================================================================
 * PAGE DE VENTE HAUTE CONVERSION - 21 JOURS POUR REPROGRAMMER TON MENTAL
 * Script JavaScript Modulaire, Fluide & Interactif
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initFAQ();
  initSocialProofToasts();
  initStickyCTA();
  initScrollAnimations();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. COMPTEUR PROMOTIONNEL INTELLIGENT
   -------------------------------------------------------------------------- */
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  // Durée du compte à rebours : 3h 42m 18s mémorisé en sessionStorage pour cohérence
  const STORAGE_KEY = 'mentalpro_promo_end';
  let targetTime = sessionStorage.getItem(STORAGE_KEY);

  if (!targetTime) {
    // Si pas encore de timer dans la session, on crée une fin dans 3h 42m
    const durationMs = (3 * 3600 + 42 * 60 + 18) * 1000;
    targetTime = Date.now() + durationMs;
    sessionStorage.setItem(STORAGE_KEY, targetTime);
  } else {
    targetTime = parseInt(targetTime, 10);
  }

  function update() {
    const now = Date.now();
    let distance = targetTime - now;

    if (distance <= 0) {
      // Re-boucle doucement si expiré pour maintenir l'urgence sans casser le design
      targetTime = Date.now() + (1 * 3600 + 15 * 60) * 1000;
      sessionStorage.setItem(STORAGE_KEY, targetTime);
      distance = targetTime - now;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    countdownEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   2. ACCORDÉON FAQ FLUIDE & ACCESSIBLE
   -------------------------------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Ferme tous les autres éléments pour un affichage propre
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) {
            otherContent.style.maxHeight = null;
          }
        }
      });

      // Bascule l'état de l'élément sélectionné
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. NOTIFICATIONS DE PREUVE SOCIALE EN DIRECT (TOASTS AUTHENTIQUES)
   -------------------------------------------------------------------------- */
function initSocialProofToasts() {
  const toastContainer = document.getElementById('social-proof-toast');
  if (!toastContainer) return;

  const buyers = [
    { name: 'Rodrigue T.', city: 'Abidjan', country: '🇨🇮 Côte d\'Ivoire', time: 'il y a 2 minutes' },
    { name: 'Fatima K.', city: 'Dakar', country: '🇸🇳 Sénégal', time: 'il y a 4 minutes' },
    { name: 'Christian K.', city: 'Yaoundé', country: '🇨🇲 Cameroun', time: 'il y a 7 minutes' },
    { name: 'Mahamat A.', city: 'N\'Djamena', country: '🇹🇩 Tchad', time: 'il y a 11 minutes' },
    { name: 'Jean-Yves O.', city: 'Cotonou', country: '🇧🇯 Bénin', time: 'il y a 14 minutes' },
    { name: 'Junior M.', city: 'Douala', country: '🇨🇲 Cameroun', time: 'il y a 18 minutes' },
    { name: 'Aurélien D.', city: 'Paris', country: '🇫🇷 France', time: 'il y a 23 minutes' },
    { name: 'Koffi E.', city: 'Lomé', country: '🇹🇬 Togo', time: 'il y a 27 minutes' },
    { name: 'Sarah M.', city: 'Lyon', country: '🇫🇷 France', time: 'il y a 32 minutes' },
    { name: 'Ibrahim S.', city: 'Bamako', country: '🇲🇱 Mali', time: 'il y a 38 minutes' },
    { name: 'Marc-Antoine B.', city: 'Bruxelles', country: '🇧🇪 Belgique', time: 'il y a 45 minutes' },
    { name: 'Estelle A.', city: 'Abidjan', country: '🇨🇮 Côte d\'Ivoire', time: 'il y a 51 minutes' }
  ];

  let currentIndex = 0;

  function showNextToast() {
    const buyer = buyers[currentIndex];
    currentIndex = (currentIndex + 1) % buyers.length;

    const nameEl = toastContainer.querySelector('.toast-buyer-name');
    const cityEl = toastContainer.querySelector('.toast-buyer-city');
    const timeEl = toastContainer.querySelector('.toast-time');

    if (nameEl) nameEl.textContent = buyer.name;
    if (cityEl) cityEl.textContent = `${buyer.city} (${buyer.country})`;
    if (timeEl) timeEl.textContent = buyer.time;

    toastContainer.classList.add('show');

    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 4500);
  }

  // Première apparition après 3 secondes, puis toutes les 10 secondes
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 10000);
  }, 3000);
}

/* --------------------------------------------------------------------------
   4. STICKY CTA BOTTOM BAR (APPARAÎT AU SCROLL)
   -------------------------------------------------------------------------- */
function initStickyCTA() {
  const stickyBar = document.getElementById('sticky-bar');
  const heroSection = document.getElementById('hero');
  const pricingSection = document.getElementById('offre');

  if (!stickyBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroRect = heroSection.getBoundingClientRect();
    const pricingRect = pricingSection ? pricingSection.getBoundingClientRect() : null;

    // Affiche la barre dès que le Hero est dépassé
    const scrolledPastHero = heroRect.bottom < 100;
    // Cache la barre si on est en plein sur la section offre pour ne pas surcharger
    const onPricingSection = pricingRect && (pricingRect.top < window.innerHeight && pricingRect.bottom > 150);

    if (scrolledPastHero && !onPricingSection) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  });
}

/* --------------------------------------------------------------------------
   5. ANIMATIONS D'APPARITION PROGRESSIVE AU SCROLL
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6. SMOOTH SCROLL AVEC COMPENSATION NAVBAR FIXE
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

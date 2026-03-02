// ============================================
// HOME HERO — show .hero-desc immediately (no typewriter)
// ============================================

(function () {
  const heroDesc = document.querySelector('.hero-desc');
  if (!heroDesc) return;

  document.addEventListener('DOMContentLoaded', () => {
    heroDesc.style.opacity = '1';
  });
})();

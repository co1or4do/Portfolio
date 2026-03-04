// ============================================
// NAVBAR NAME — glitch hover → "Colo"
// ============================================

(function () {
  const nameEl = document.querySelector('.navbar__name');
  if (!nameEl) return;

  const originalText = nameEl.textContent;
  const targetText = 'Colo';
  const glyphPool = '!@#$%&*?¿¡~^÷±§∆∑µ√∞≠<>{}[]|/\\';
  const GLITCH_FRAMES = 2;    // glitch cycles per char before it disappears/appears
  const FRAME_MS = 18;        // ms per glitch frame
  const CHAR_STAGGER = 14;    // ms between each character starting

  let cancelFlag = false;
  let restoreTimer = null;

  function randomGlyph() {
    return glyphPool[Math.floor(Math.random() * glyphPool.length)];
  }

  // Phase 1: eat text right-to-left, char by char becomes glitch then blank
  // Phase 2: write new text left-to-right, blank becomes glitch then final char
  function glitchTransition(fromText, toText, onDone) {
    cancelFlag = false;
    const display = fromText.split('');
    let pending = 0;

    // --- Phase 1: consume from right to left ---
    const len = display.length;
    pending = len;

    for (let k = 0; k < len; k++) {
      const i = len - 1 - k; // right to left index
      const startDelay = k * CHAR_STAGGER;

      setTimeout(() => {
        if (cancelFlag) return;
        let frame = 0;

        function eat() {
          if (cancelFlag) return;
          frame++;
          if (frame <= GLITCH_FRAMES) {
            display[i] = randomGlyph();
            nameEl.textContent = display.join('').trimEnd();
            setTimeout(eat, FRAME_MS);
          } else {
            display[i] = '';
            nameEl.textContent = display.join('').trimEnd() || '\u00A0';
            pending--;
            if (pending === 0) startPhase2();
          }
        }

        eat();
      }, startDelay);
    }

    // --- Phase 2: build new text left to right ---
    function startPhase2() {
      if (cancelFlag) return;
      const target = toText.split('');
      const build = new Array(target.length).fill('');
      let pending2 = target.length;

      for (let k = 0; k < target.length; k++) {
        const startDelay = k * CHAR_STAGGER;

        setTimeout(() => {
          if (cancelFlag) return;
          let frame = 0;

          function write() {
            if (cancelFlag) return;
            frame++;
            if (frame <= GLITCH_FRAMES) {
              build[k] = randomGlyph();
              nameEl.textContent = build.join('').trimEnd();
              setTimeout(write, FRAME_MS);
            } else {
              build[k] = target[k];
              nameEl.textContent = build.join('').trimEnd();
              pending2--;
              if (pending2 === 0) {
                nameEl.textContent = toText;
                if (onDone) onDone();
              }
            }
          }

          write();
        }, startDelay);
      }
    }
  }

  nameEl.addEventListener('mouseenter', () => {
    clearTimeout(restoreTimer);
    cancelFlag = true;
    setTimeout(() => glitchTransition(nameEl.textContent, targetText), 10);
  });

  nameEl.addEventListener('mouseleave', () => {
    clearTimeout(restoreTimer);
    cancelFlag = true;
    restoreTimer = setTimeout(() => {
      glitchTransition(nameEl.textContent, originalText);
    }, 200);
  });
})();

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

// ============================================
// ACTIVE NAV LINK (mark current page)
// ============================================

const currentPath = window.location.pathname;
document.querySelectorAll('.navbar__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && currentPath.endsWith(href.replace('../', '').replace('.html', ''))) {
    link.classList.add('active');
  }
});

// ============================================
// CUSTOM CURSOR
// ============================================

(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<span class="custom-cursor__glyph">✳</span>';
  document.body.appendChild(cursor);

  const glyph = cursor.querySelector('.custom-cursor__glyph');

  // Lerp-based smooth cursor movement
  let mouseX = -100, mouseY = -100;
  let curX = -100, curY = -100;
  const ease = 0.15;

  // Movement-based rotation
  let prevMouseX = null;
  let targetVelocity = 0;
  let smoothVelocity = 0;
  let rotationAngle = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('is-active');

    // Track horizontal velocity for rotation
    if (prevMouseX !== null) {
      targetVelocity = e.clientX - prevMouseX;
    }
    prevMouseX = e.clientX;

    // Invert cursor color over images and dark backgrounds
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && (el.tagName === 'IMG' || el.closest('.collab-section') || el.closest('.btn-cta'))) {
      cursor.classList.add('custom-cursor--inverted');
    } else {
      cursor.classList.remove('custom-cursor--inverted');
    }
  });

  function animate() {
    curX += (mouseX - curX) * ease;
    curY += (mouseY - curY) * ease;
    cursor.style.transform = `translate(${curX}px, ${curY}px)`;

    // Smooth velocity easing — lerp toward target, then decay target
    smoothVelocity += (targetVelocity - smoothVelocity) * 0.06;
    rotationAngle += smoothVelocity * 0.5;
    targetVelocity *= 0.92;

    glyph.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-active');
    prevMouseX = null;
  });
  document.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
})();

// ============================================
// ASTERISK GRID — living grid with hover control
// ============================================

(function () {
  const grids = document.querySelectorAll('.asterisk-grid__cells');
  if (!grids.length) return;

  const CELL_TARGET = window.innerWidth <= 743 ? 44 : 68;
  const SUPPRESS_RADIUS = 3;

  // Hover sound
  const hoverSound = new Audio('freesound_community-gameboy-pluck-41265.mp3');
  hoverSound.volume = 0.21;
  function playSound(rate, vol) {
    const s = hoverSound.cloneNode();
    s.volume = vol !== undefined ? vol : 0.21;
    s.playbackRate = rate || 1;
    s.play().catch(() => {});
  }
  const MAX_ACTIVATED = 10;

  function dist(r1, c1, r2, c2) {
    return Math.max(Math.abs(r1 - r2), Math.abs(c1 - c2));
  }

  grids.forEach(container => {
    let cells = [];
    let cols = 0;
    let rows = 0;
    let spawnTimer = null;
    let rippleTimer = null;
    let rippleOrigin = null;
    let activated = new Set();
    let suppressed = new Set();

    function getCellAt(r, c) {
      if (r < 0 || r >= rows || c < 0 || c >= cols) return null;
      return cells[r * cols + c];
    }

    // --- BUILD ---
    function build() {
      clearInterval(spawnTimer);
      clearInterval(rippleTimer);
      rippleTimer = null;
      rippleOrigin = null;
      activated.clear();
      suppressed.clear();

      const vw = document.documentElement.clientWidth;
      let gc = Math.max(2, Math.round(vw / CELL_TARGET));
      if (gc % 2 !== 0) gc++;
      const sz = vw / gc;

      const w = container.clientWidth;
      const h = container.clientHeight;
      cols = Math.max(1, Math.round(w / sz));
      rows = Math.max(1, Math.round(h / sz));

      container.style.gridTemplateColumns = `repeat(${cols}, ${sz}px)`;
      container.style.gridTemplateRows    = `repeat(${rows}, ${sz}px)`;

      // Snap container heights so grids fit with no partial rows
      if (container.classList.contains('asterisk-grid__cells--hero')) {
        const heroSplit = container.closest('.hero-split');
        if (heroSplit) heroSplit.style.minHeight = `${rows * sz}px`;
      } else {
        const section = container.closest('.asterisk-grid');
        if (section) section.style.height = `${rows * sz}px`;
      }

      container.innerHTML = '';

      cells = [];
      const frag = document.createDocumentFragment();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement('div');
          cell.className = 'asterisk-grid__cell is-gone';
          cell.textContent = '✳';
          cell._row = r;
          cell._col = c;
          cell._locked = false;
          frag.appendChild(cell);
          cells.push(cell);
        }
      }
      container.appendChild(frag);

      // Begin spawning
      spawnTimer = setInterval(spawnCell, 375);
    }

    // --- IDLE: cells appear, live ~2s, then fade away ---
    function spawnCell() {
      const pool = cells.filter(c => c.classList.contains('is-gone') && !c._locked);
      if (!pool.length) return;

      const cell = pool[Math.floor(Math.random() * pool.length)];
      cell.classList.remove('is-gone');

      const lifetime = 3000 + Math.random() * 2000;
      setTimeout(() => {
        if (cell._locked) return;
        cell.classList.add('is-gone');
      }, lifetime);
    }

    // --- HOVER: grow adjacent path + suppress nearby idle ---
    function getAdjacentCandidates() {
      const seen = new Set();
      const result = [];
      activated.forEach(cell => {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const n = getCellAt(cell._row + dr, cell._col + dc);
            if (n && !activated.has(n) && !seen.has(n)) {
              seen.add(n);
              result.push(n);
            }
          }
        }
      });
      return result;
    }

    function updateSuppression() {
      // Release old suppression
      suppressed.forEach(cell => {
        if (!activated.has(cell)) cell._locked = false;
      });
      suppressed.clear();

      // Suppress around every activated cell
      activated.forEach(active => {
        cells.forEach(cell => {
          if (activated.has(cell) || suppressed.has(cell)) return;
          if (dist(cell._row, cell._col, active._row, active._col) <= SUPPRESS_RADIUS) {
            cell._locked = true;
            if (!cell.classList.contains('is-gone')) {
              cell.classList.add('is-gone');
            }
            suppressed.add(cell);
          }
        });
      });
    }

    function expand() {
      if (!rippleOrigin || activated.size >= MAX_ACTIVATED) return;

      const candidates = getAdjacentCandidates();
      if (!candidates.length) return;

      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      pick._locked = true;
      pick.classList.remove('is-gone');
      pick.classList.add('is-active');
      activated.add(pick);

      // Sound slows down and fades as ripple expands
      const progress = activated.size / MAX_ACTIVATED;
      playSound(1.2 - progress * 0.8, 0.03);

      updateSuppression();
    }

    // Track cells mid-collapse so we can clean them up if a new ripple starts
    let collapsingBatch = [];

    function collapse() {
      const origin = rippleOrigin;
      const batch = [...activated].sort((a, b) => {
        if (!origin) return 0;
        return dist(b._row, b._col, origin.row, origin.col)
             - dist(a._row, a._col, origin.row, origin.col);
      });

      activated.clear();
      suppressed.forEach(cell => { cell._locked = false; });
      suppressed.clear();

      collapsingBatch = [...batch];
      const len = batch.length;
      batch.forEach((cell, i) => {
        setTimeout(() => {
          if (!collapsingBatch.includes(cell)) return; // already cleaned up
          cell.classList.remove('is-active');
          cell.classList.add('is-gone');
          cell._locked = false;
          collapsingBatch.splice(collapsingBatch.indexOf(cell), 1);

          const progress = (i + 1) / len;
          playSound(0.4 + progress * 0.8, 0.03);
        }, i * 60);
      });
    }

    // --- EVENTS ---
    let originCell = null;

    function isIdleVisible(cell) {
      return !cell.classList.contains('is-gone') && !cell.classList.contains('is-active');
    }

    function startRipple(cell) {
      // Instantly finish any ongoing collapse animation
      collapsingBatch.forEach(c => {
        c.classList.remove('is-active');
        c.classList.add('is-gone');
        c._locked = false;
      });
      collapsingBatch = [];

      playSound(1.2);
      rippleOrigin = { row: cell._row, col: cell._col };
      originCell = cell;

      cell._locked = true;
      cell.classList.remove('is-gone');
      cell.classList.add('is-active');
      activated.add(cell);

      updateSuppression();
      rippleTimer = setInterval(expand, 60);
    }

    function stopRipple() {
      clearInterval(rippleTimer);
      rippleTimer = null;
      collapse();
      rippleOrigin = null;
      originCell = null;
    }

    container.addEventListener('mouseover', (e) => {
      const cell = e.target.closest('.asterisk-grid__cell');

      // Left the origin cell → collapse
      if (rippleTimer && cell !== originCell) {
        stopRipple();
      }

      // Only start on a visible, idle cell (white/beige, not teal, not invisible)
      if (cell && !rippleTimer && isIdleVisible(cell)) {
        startRipple(cell);
      }
    });

    container.addEventListener('mouseleave', () => {
      if (rippleTimer) stopRipple();
    });

    // --- MOBILE AUTO-PULSE ---
    const isMobile = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let autoPulseTimer = null;

    function autoPulse() {
      if (!cells.length) return;
      const idlePool = cells.filter(c => !c.classList.contains('is-gone') && !c.classList.contains('is-active') && !c._locked);
      const count = Math.min(idlePool.length, 2 + Math.floor(Math.random() * 2));

      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * idlePool.length);
        const cell = idlePool.splice(idx, 1)[0];
        if (!cell) continue;

        cell.classList.add('is-active');
        setTimeout(() => {
          cell.classList.remove('is-active');
        }, 800 + Math.random() * 400);
      }
    }

    function startAutoPulse() {
      clearInterval(autoPulseTimer);
      if (isMobile) autoPulseTimer = setInterval(autoPulse, 2500);
    }

    // --- INIT ---
    build();
    startAutoPulse();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { build(); startAutoPulse(); }, 200);
    });
  });
})();

// ============================================
// SCROLL REVEAL — IntersectionObserver
// ============================================

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const SELECTORS = [
    '.latest-title',
    '.latest-card',
    '.collab-title',
    '.collab-section .btn-cta',
    '.about-quote',
    '.about-bio',
    '.about-disciplines',
    '.contact-item',
    '.project-card',
    '.project-detail__description',
    '.project-detail__media',
    '.gallery-item',
    '.section-header',
    '.coming-soon',
    '.pd-prose',
    '.pd-gallery__item',
  ];

  const STAGGER_PARENTS = [
    '.carousel__viewport',
    '.projects-grid',
    '.gallery-grid',
    '.contact-items',
    '.pd-gallery',
  ];

  SELECTORS.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (el.hasAttribute('data-reveal')) return;
      el.setAttribute('data-reveal', '');
    });
  });

  STAGGER_PARENTS.forEach((parentSel) => {
    document.querySelectorAll(parentSel).forEach((parent) => {
      const children = [...parent.children].filter((c) => c.hasAttribute('data-reveal'));
      children.forEach((child, i) => {
        if (i > 0) child.style.setProperty('--reveal-delay', `${i * 90}ms`);
      });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
})();

// ============================================
// PROJECTS CAROUSEL — infinite + momentum
// ============================================

(function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const viewport = carousel.querySelector('.carousel__viewport');
  const track    = carousel.querySelector('.carousel__track');
  const prevBtn  = carousel.querySelector('.carousel__arrow--prev');
  const nextBtn  = carousel.querySelector('.carousel__arrow--next');
  let cachedGap = parseFloat(getComputedStyle(track).gap) || 28;
  function getGap() { return cachedGap; }
  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';   // exponential deceleration
  const DURATION = 1.3;                              // seconds

  // GPU layer; allow vertical scroll but block horizontal browser pan
  track.style.willChange   = 'transform';
  viewport.style.touchAction = 'pan-y';

  // ── Infinite loop: clone all slides before & after ───────────────────────
  const origSlides = Array.from(track.querySelectorAll('.carousel__slide'));
  const N = origSlides.length;

  function createClone(slide) {
    const c = slide.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    c.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-revealed'));
    if (c.hasAttribute('data-reveal')) c.classList.add('is-revealed');
    return c;
  }

  // Prepend [c0 c1 c2 c3 c4 | originals…]
  [...origSlides].reverse().forEach(s => track.insertBefore(createClone(s), track.firstChild));
  // Append  […originals | c0 c1 c2 c3 c4]
  origSlides.forEach(s => track.appendChild(createClone(s)));

  // Layout: 0..N-1 = before-clones · N..2N-1 = real · 2N..3N-1 = after-clones
  const allSlides = Array.from(track.querySelectorAll('.carousel__slide'));
  let domIdx = N + 1; // start at PLEXA (real index 1)

  // Prevent browser's native drag-ghost on images & links
  track.querySelectorAll('img, a').forEach(el => {
    el.addEventListener('dragstart', e => e.preventDefault());
  });

  function cardW()    { return allSlides[0]?.offsetWidth || 400; }
  function stepW()    { return cardW() + getGap(); }
  function posFor(di) { return (viewport.offsetWidth - cardW()) / 2 - di * stepW(); }

  function setPos(di, animated) {
    track.style.transition = animated
      ? `transform ${DURATION}s ${EASE}`
      : 'none';
    track.style.transform = `translateX(${posFor(di)}px)`;
  }

  // ── Typewriter effect ────────────────────────────────────────────────
  let typewriterTimer = null;
  let prevActiveIdx   = -1;

  function typewrite(slide) {
    const label = slide.querySelector('.latest-card__label');
    const arrow = slide.querySelector('.latest-card__arrow');
    if (!label) return;

    // Store original text once
    if (!label.dataset.fullText) label.dataset.fullText = label.textContent;
    const fullText = label.dataset.fullText;

    label.textContent = '';
    if (arrow) arrow.style.opacity = '0';

    let i = 0;
    const speed = 50;   // ms per character
    clearInterval(typewriterTimer);
    typewriterTimer = setInterval(() => {
      i++;
      label.textContent = fullText.slice(0, i);
      if (i >= fullText.length) {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
        // Fade in arrow after text finishes
        if (arrow) arrow.style.opacity = '1';
      }
    }, speed);
  }

  function refreshActive() {
    allSlides.forEach((s, i) => s.classList.toggle('is-active', i === domIdx));

    if (domIdx !== prevActiveIdx) {
      // Reset previous slide's label to full text (for clones / revisits)
      if (prevActiveIdx >= 0 && allSlides[prevActiveIdx]) {
        const oldLabel = allSlides[prevActiveIdx].querySelector('.latest-card__label');
        if (oldLabel && oldLabel.dataset.fullText) oldLabel.textContent = oldLabel.dataset.fullText;
      }
      prevActiveIdx = domIdx;
      clearInterval(typewriterTimer);
      typewrite(allSlides[domIdx]);
    }
  }

  function normalize() {
    if (domIdx < N) {
      domIdx += N; setPos(domIdx, false); refreshActive();
    } else if (domIdx >= 2 * N) {
      domIdx -= N; setPos(domIdx, false); refreshActive();
    }
  }

  // pendingEnd: tracks the active transitionend listener so we can cancel it
  let pendingEnd  = null;
  let pointerDown = false;

  function advance(steps) {
    if (pendingEnd) {
      track.removeEventListener('transitionend', pendingEnd);
      pendingEnd = null;
    }
    domIdx = Math.max(0, Math.min(allSlides.length - 1, domIdx + steps));
    setPos(domIdx, true);
    refreshActive();
    pendingEnd = (e) => {
      if (e.propertyName !== 'transform') return;
      track.removeEventListener('transitionend', pendingEnd);
      pendingEnd = null;
      normalize();
    };
    track.addEventListener('transitionend', pendingEnd);
  }

  prevBtn?.addEventListener('click', () => advance(-1));
  nextBtn?.addEventListener('click', () => advance(+1));

  // ── Velocity tracker (multi-sample averaging) ──────────────────────────
  const VEL_SAMPLES = 5;
  let velHistory = [];       // {x, t} ring buffer

  function pushVelSample(x) {
    velHistory.push({ x, t: Date.now() });
    if (velHistory.length > VEL_SAMPLES) velHistory.shift();
  }

  function getVelocity() {
    if (velHistory.length < 2) return 0;
    // Use oldest → newest for stable average
    const first = velHistory[0];
    const last  = velHistory[velHistory.length - 1];
    const dt = last.t - first.t;
    return dt > 0 ? (last.x - first.x) / dt : 0;   // px/ms
  }

  // ── Drag with momentum ───────────────────────────────────────────────────
  let startX = 0, currentX = 0;
  let didDrag = false, dragBaseX = 0, blockNextClick = false;
  const DRAG_THRESHOLD = 6;

  function onDocMove(e) {
    if (!pointerDown) return;
    currentX = e.clientX;
    pushVelSample(currentX);
    const dx = currentX - startX;
    if (!didDrag && Math.abs(dx) > DRAG_THRESHOLD) {
      didDrag = true;
      viewport.classList.add('is-dragging');
    }
    if (didDrag) track.style.transform = `translateX(${dragBaseX + dx}px)`;
  }

  function removeDragListeners() {
    document.removeEventListener('pointermove',   onDocMove);
    document.removeEventListener('pointerup',     onDocUp);
    document.removeEventListener('pointercancel', onDocCancel);
  }

  function endDrag(doSnap) {
    if (!pointerDown) return;
    removeDragListeners();
    pointerDown = false;
    viewport.classList.remove('is-dragging');
    if (!didDrag) return;
    blockNextClick = true;
    didDrag = false;
    if (!doSnap) { setPos(domIdx, true); return; }

    const dx  = currentX - startX;
    const vel = getVelocity();                                   // px/ms averaged
    const momentum = vel * 200;                                  // projected extra px
    const steps = Math.max(-3, Math.min(3, Math.round(-(dx + momentum) / stepW())));
    advance(steps);
  }

  function onDocUp()     { endDrag(true);  }
  function onDocCancel() { endDrag(false); }

  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    if (pendingEnd) {
      track.removeEventListener('transitionend', pendingEnd);
      pendingEnd = null;
    }
    // Freeze track at its current visual position to avoid jump when grabbing mid-animation
    const matrix = new DOMMatrix(getComputedStyle(track).transform);
    const frozenX = isFinite(matrix.m41) ? matrix.m41 : posFor(domIdx);
    track.style.transition = 'none';
    track.style.transform  = `translateX(${frozenX}px)`;

    const prevIdx = domIdx;
    normalize();
    dragBaseX = (domIdx !== prevIdx) ? posFor(domIdx) : frozenX;

    pointerDown = true;
    didDrag     = false;
    velHistory  = [];
    startX = currentX = e.clientX;
    pushVelSample(startX);

    document.addEventListener('pointermove',   onDocMove);
    document.addEventListener('pointerup',     onDocUp);
    document.addEventListener('pointercancel', onDocCancel);
  });

  // Block the stray click that fires right after a drag release
  viewport.addEventListener('click', (e) => {
    if (blockNextClick) { blockNextClick = false; e.preventDefault(); }
  }, true);

  // ── Trackpad / mouse-wheel horizontal scroll ──────────────────────────
  let wheelDrift = 0;          // accumulated px displacement during gesture
  let wheelGesture = false;    // true while actively receiving wheel events
  let wheelSnapTimer = null;

  viewport.addEventListener('wheel', (e) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    if (absX < 4 && absY < 4) return;
    if (absY > absX * 1.5) return;        // vertical scroll — let page scroll

    e.preventDefault();

    // First event of gesture: freeze current position
    if (!wheelGesture) {
      wheelGesture = true;
      wheelDrift = 0;
      if (pendingEnd) {
        track.removeEventListener('transitionend', pendingEnd);
        pendingEnd = null;
      }
      const matrix = new DOMMatrix(getComputedStyle(track).transform);
      const frozenX = isFinite(matrix.m41) ? matrix.m41 : posFor(domIdx);
      track.style.transition = 'none';
      track.style.transform = `translateX(${frozenX}px)`;
      const prevIdx = domIdx;
      normalize();
      if (domIdx !== prevIdx) {
        track.style.transform = `translateX(${posFor(domIdx)}px)`;
      }
    }

    // Move track in real-time (like drag)
    const delta = e.deltaX || e.deltaY;
    wheelDrift -= delta;
    track.style.transform = `translateX(${posFor(domIdx) + wheelDrift}px)`;

    // Snap when gesture stops
    clearTimeout(wheelSnapTimer);
    wheelSnapTimer = setTimeout(() => {
      wheelGesture = false;
      const steps = Math.max(-3, Math.min(3, Math.round(-wheelDrift / stepW())));
      wheelDrift = 0;
      if (steps !== 0) {
        advance(steps);
      } else {
        setPos(domIdx, true);
      }
    }, 120);
  }, { passive: false });

  // ── Init ─────────────────────────────────────────────────────────────────
  // Store original text on all labels (including clones) before any typewriter runs
  allSlides.forEach(s => {
    const label = s.querySelector('.latest-card__label');
    if (label) label.dataset.fullText = label.textContent;
  });

  setPos(domIdx, false);
  refreshActive();
  window.addEventListener('resize', () => { cachedGap = parseFloat(getComputedStyle(track).gap) || 28; setPos(domIdx, false); });
})();

/* ── Book Viewer ─────────────────────────────────────────────
   3D page-flip manual viewer with drag interaction.
   Usage: call BookViewer.open(pages) where pages is an array
   of image URLs ordered front-to-back.
   ────────────────────────────────────────────────────────── */
const BookViewer = (() => {
  'use strict';

  let overlay, book, prevBtn, nextBtn, closeBtn;
  let leaves = [];
  let currentPage = 0;
  let totalLeaves = 0;
  let flipping = false;

  /* drag state */
  let dragging = false;
  let dragStartX = 0;
  let dragDelta = 0;
  let dragLeaf = null;
  let dragDirection = 0;

  const FLIP_DURATION = 800;
  let isMobile = false;

  /* ── build DOM ── */
  function buildDOM(pages) {
    isMobile = window.innerWidth <= 743;

    overlay = document.createElement('div');
    overlay.className = 'book-overlay';

    const wrapper = document.createElement('div');
    wrapper.className = 'book-wrapper';

    closeBtn = document.createElement('button');
    closeBtn.className = 'book-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close manual');
    overlay.appendChild(closeBtn);

    book = document.createElement('div');
    book.className = 'book';

    leaves = [];

    if (isMobile) {
      /* mobile: one page per leaf (front only) */
      totalLeaves = pages.length;
      for (let i = 0; i < totalLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'book__leaf';
        leaf.style.zIndex = totalLeaves - i;

        const front = document.createElement('div');
        front.className = 'book__page book__page--front';
        const fImg = document.createElement('img');
        fImg.src = pages[i];
        fImg.alt = `Page ${i + 1}`;
        fImg.draggable = false;
        front.appendChild(fImg);

        const back = document.createElement('div');
        back.className = 'book__page book__page--back';

        leaf.appendChild(front);
        leaf.appendChild(back);
        book.appendChild(leaf);
        leaves.push(leaf);
      }
    } else {
      /* desktop: two pages per leaf */
      totalLeaves = Math.ceil(pages.length / 2);
      for (let i = 0; i < totalLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'book__leaf';
        leaf.style.zIndex = totalLeaves - i;

        const front = document.createElement('div');
        front.className = 'book__page book__page--front';
        const fImg = document.createElement('img');
        fImg.src = pages[i * 2];
        fImg.alt = `Page ${i * 2 + 1}`;
        fImg.draggable = false;
        front.appendChild(fImg);

        const back = document.createElement('div');
        back.className = 'book__page book__page--back';
        if (pages[i * 2 + 1]) {
          const bImg = document.createElement('img');
          bImg.src = pages[i * 2 + 1];
          bImg.alt = `Page ${i * 2 + 2}`;
          bImg.draggable = false;
          back.appendChild(bImg);
        }

        leaf.appendChild(front);
        leaf.appendChild(back);
        book.appendChild(leaf);
        leaves.push(leaf);
      }
    }

    /* nav buttons */
    prevBtn = document.createElement('button');
    prevBtn.className = 'book-nav book-nav--prev';
    prevBtn.innerHTML = '&#8592;';
    prevBtn.setAttribute('aria-label', 'Previous page');

    nextBtn = document.createElement('button');
    nextBtn.className = 'book-nav book-nav--next';
    nextBtn.innerHTML = '&#8594;';
    nextBtn.setAttribute('aria-label', 'Next page');

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(book);
    wrapper.appendChild(nextBtn);
    overlay.appendChild(wrapper);
    document.body.appendChild(overlay);
  }

  /* ── shadow helpers for curl effect ── */
  function setCurlShadow(leaf, progress) {
    /* progress: 0 = flat, 1 = fully flipped */
    const frontPage = leaf.querySelector('.book__page--front');
    const backPage = leaf.querySelector('.book__page--back');
    /* shadow peaks at mid-flip (0.5) */
    const shadowIntensity = Math.sin(progress * Math.PI);
    if (frontPage) frontPage.style.setProperty('--curl', shadowIntensity);
    if (backPage) backPage.style.setProperty('--curl', shadowIntensity);
    /* apply via inline style on the pseudo-element workaround */
    if (frontPage) {
      frontPage.style.boxShadow = shadowIntensity > 0.05
        ? `inset ${-40 * shadowIntensity}px 0 ${60 * shadowIntensity}px rgba(0,0,0,${0.15 * shadowIntensity})`
        : 'none';
    }
    if (backPage) {
      backPage.style.boxShadow = shadowIntensity > 0.05
        ? `inset ${40 * shadowIntensity}px 0 ${60 * shadowIntensity}px rgba(0,0,0,${0.2 * shadowIntensity})`
        : 'none';
    }
  }

  function clearCurlShadow(leaf) {
    const frontPage = leaf.querySelector('.book__page--front');
    const backPage = leaf.querySelector('.book__page--back');
    if (frontPage) frontPage.style.boxShadow = '';
    if (backPage) backPage.style.boxShadow = '';
  }

  /* ── animated flip with curl ── */
  function animateFlip(leaf, fromAngle, toAngle, onDone) {
    const start = performance.now();
    const duration = FLIP_DURATION;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function frame(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(t);
      const angle = fromAngle + (toAngle - fromAngle) * eased;
      const progress = Math.abs(angle) / 180;

      leaf.style.transition = 'none';
      leaf.style.transform = `rotateY(${angle}deg)`;
      setCurlShadow(leaf, progress);

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        leaf.style.transition = '';
        clearCurlShadow(leaf);
        if (onDone) onDone();
      }
    }

    requestAnimationFrame(frame);
  }

  /* ── flip helpers ── */
  function flipForward() {
    if (flipping || currentPage >= totalLeaves) return;
    flipping = true;
    const leaf = leaves[currentPage];
    leaf.style.zIndex = currentPage + 1;
    currentPage++;
    animateFlip(leaf, 0, -180, () => { flipping = false; });
  }

  function flipBackward() {
    if (flipping || currentPage <= 0) return;
    flipping = true;
    currentPage--;
    const leaf = leaves[currentPage];
    leaf.style.zIndex = totalLeaves - currentPage;
    animateFlip(leaf, -180, 0, () => { flipping = false; });
  }

  /* ── drag interaction ── */
  function onPointerDown(e) {
    if (flipping) return;
    const rect = book.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const half = rect.width / 2;

    if (relX > half && currentPage < totalLeaves) {
      dragDirection = 1;
      dragLeaf = leaves[currentPage];
    } else if (relX <= half && currentPage > 0) {
      dragDirection = -1;
      dragLeaf = leaves[currentPage - 1];
    } else {
      return;
    }

    dragging = true;
    dragStartX = e.clientX;
    dragDelta = 0;
    dragLeaf.classList.add('book__leaf--dragging');
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!dragging || !dragLeaf) return;
    dragDelta = e.clientX - dragStartX;

    let angle;
    const maxDrag = 250;
    const ratio = Math.min(Math.abs(dragDelta) / maxDrag, 1);

    if (dragDirection === 1) {
      angle = dragDelta < 0 ? -180 * ratio : 0;
      dragLeaf.style.zIndex = currentPage + 1;
    } else {
      angle = dragDelta > 0 ? -180 + 180 * ratio : -180;
      dragLeaf.style.zIndex = totalLeaves - (currentPage - 1);
    }
    dragLeaf.style.transition = 'none';
    dragLeaf.style.transform = `rotateY(${angle}deg)`;

    /* live curl shadow */
    const progress = Math.abs(angle) / 180;
    setCurlShadow(dragLeaf, progress);
  }

  function onPointerUp() {
    if (!dragging || !dragLeaf) return;
    dragging = false;
    dragLeaf.classList.remove('book__leaf--dragging');

    const threshold = 60;
    const shouldFlip = Math.abs(dragDelta) > threshold;
    const leaf = dragLeaf;

    if (shouldFlip) {
      if (dragDirection === 1) {
        leaf.style.zIndex = currentPage + 1;
        currentPage++;
        flipping = true;
        const currentAngle = getCurrentAngle(leaf);
        animateFlip(leaf, currentAngle, -180, () => { flipping = false; });
      } else {
        currentPage--;
        leaf.style.zIndex = totalLeaves - currentPage;
        flipping = true;
        const currentAngle = getCurrentAngle(leaf);
        animateFlip(leaf, currentAngle, 0, () => { flipping = false; });
      }
    } else {
      /* snap back */
      flipping = true;
      const currentAngle = getCurrentAngle(leaf);
      if (dragDirection === 1) {
        leaf.style.zIndex = totalLeaves - currentPage;
        animateFlip(leaf, currentAngle, 0, () => { flipping = false; });
      } else {
        leaf.style.zIndex = currentPage;
        animateFlip(leaf, currentAngle, -180, () => { flipping = false; });
      }
    }

    dragLeaf = null;
    dragDelta = 0;
  }

  function getCurrentAngle(leaf) {
    const st = getComputedStyle(leaf).transform;
    if (!st || st === 'none') return 0;
    const m = st.match(/matrix3d\((.+)\)/);
    if (m) {
      const vals = m[1].split(',').map(Number);
      return Math.round(Math.atan2(-vals[8], vals[0]) * (180 / Math.PI));
    }
    const m2 = st.match(/matrix\((.+)\)/);
    if (m2) {
      const vals = m2[1].split(',').map(Number);
      return Math.round(Math.atan2(vals[1], vals[0]) * (180 / Math.PI));
    }
    return 0;
  }

  /* ── events ── */
  function bindEvents() {
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    prevBtn.addEventListener('click', flipBackward);
    nextBtn.addEventListener('click', flipForward);

    document.addEventListener('keydown', onKey);

    book.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function unbindEvents() {
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') flipForward();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') flipBackward();
  }

  /* ── public API ── */
  function open(pages) {
    currentPage = 0;
    flipping = false;
    dragging = false;
    buildDOM(pages);
    bindEvents();
    requestAnimationFrame(() => {
      overlay.classList.add('book-overlay--visible');
    });
    document.body.style.overflow = 'hidden';
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.classList.add('custom-cursor--inverted');
  }

  function close() {
    overlay.classList.remove('book-overlay--visible');
    unbindEvents();
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.classList.remove('custom-cursor--inverted');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 350);
  }

  return { open, close };
})();

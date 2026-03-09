/* ── Book Viewer ─────────────────────────────────────────────
   Realistic page-flip manual viewer powered by StPageFlip.
   Usage: call BookViewer.open(pages) where pages is an array
   of image URLs ordered front-to-back.
   ────────────────────────────────────────────────────────── */
const BookViewer = (() => {
  'use strict';

  let overlay, bookEl, prevBtn, nextBtn, closeBtn;
  let pageFlip = null;
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

    bookEl = document.createElement('div');
    bookEl.className = 'book';

    /* each page is a direct child div with an img inside */
    pages.forEach((src, i) => {
      const page = document.createElement('div');
      page.className = 'book__page';
      /* all pages flip with the same paper-curl effect */
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Page ${i + 1}`;
      img.draggable = false;
      page.appendChild(img);
      bookEl.appendChild(page);
    });

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
    wrapper.appendChild(bookEl);
    wrapper.appendChild(nextBtn);
    overlay.appendChild(wrapper);
    /* prevent clicks inside the wrapper from closing the overlay */
    wrapper.addEventListener('click', (e) => e.stopPropagation());
    document.body.appendChild(overlay);
  }

  /* ── initialize page-flip ── */
  function initPageFlip() {
    const maxH = window.innerHeight * 0.8;
    const ratio = 0.705; /* page width/height ratio (≈ A4-ish) */

    let pageW, pageH;
    if (isMobile) {
      /* two pages must fit side-by-side within 90% of viewport width */
      const maxTotalW = window.innerWidth * 0.9;
      pageW = Math.floor(maxTotalW / 2);
      pageH = Math.round(pageW / ratio);
      /* clamp to max height */
      if (pageH > maxH) {
        pageH = Math.round(maxH);
        pageW = Math.round(pageH * ratio);
      }
    } else {
      pageH = Math.round(maxH);
      pageW = Math.round(pageH * ratio);
    }

    pageFlip = new St.PageFlip(bookEl, {
      width: pageW,
      height: pageH,
      size: 'fixed',
      showCover: true,
      drawShadow: true,
      maxShadowOpacity: 0.6,
      flippingTime: 2000,
      usePortrait: false,
      autoSize: true,
      mobileScrollSupport: false,
      useMouseEvents: true,
      startZIndex: 0,
      swipeDistance: 20,
      clickEventForward: false,
      disableFlipByClick: true,
    });

    pageFlip.loadFromHTML(bookEl.querySelectorAll('.book__page'));
  }

  /* ── events ── */
  function onClose(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    close();
  }

  function bindEvents() {
    /* use pointerdown + touchstart to fire before StPageFlip intercepts */
    closeBtn.addEventListener('pointerdown', onClose, true);
    closeBtn.addEventListener('touchstart', onClose, true);
    overlay.addEventListener('click', onOverlayClick);
    prevBtn.addEventListener('click', flipPrev);
    nextBtn.addEventListener('click', flipNext);
    document.addEventListener('keydown', onKey);
  }

  function unbindEvents() {
    document.removeEventListener('keydown', onKey);
    overlay.removeEventListener('click', onOverlayClick);
    closeBtn.removeEventListener('pointerdown', onClose, true);
    closeBtn.removeEventListener('touchstart', onClose, true);
  }

  function onOverlayClick(e) {
    if (e.target === overlay) close();
  }

  function flipNext() {
    if (pageFlip) pageFlip.flipNext();
  }

  function flipPrev() {
    if (pageFlip) pageFlip.flipPrev();
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') flipNext();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') flipPrev();
  }

  /* ── public API ── */
  function open(pages) {
    buildDOM(pages);
    bindEvents();
    requestAnimationFrame(() => {
      overlay.classList.add('book-overlay--visible');
      /* small delay so the overlay is visible before page-flip measures */
      setTimeout(initPageFlip, 60);
    });
    document.body.style.overflow = 'hidden';
    /* hide custom cursor so the default browser cursor is visible on the overlay */
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.style.display = 'none';
  }

  let closing = false;
  function close() {
    if (closing) return;
    closing = true;
    unbindEvents();
    /* remove overlay from DOM first — nothing visible after this line */
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.body.style.overflow = '';
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.style.display = '';
    /* destroy on detached nodes so any visual reset is invisible */
    const pf = pageFlip;
    pageFlip = null;
    closing = false;
    if (pf) setTimeout(() => { try { pf.destroy(); } catch (e) { /* silent */ } }, 0);
  }

  return { open, close };
})();

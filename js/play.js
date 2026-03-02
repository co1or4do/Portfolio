// ============================================
// PLAY — 8-bit Mini-Games Hub
// ============================================

(function () {
  'use strict';

  /* ── sound helper ────────────────────────────── */
  const SND_SRC = 'freesound_community-gameboy-pluck-41265.mp3';
  function snd(rate, vol) {
    try {
      const a = new Audio(SND_SRC);
      a.volume = vol ?? 0.12;
      a.playbackRate = rate ?? 1;
      a.play().catch(() => {});
    } catch (_) {}
  }

  /* ── DOM refs ────────────────────────────────── */
  const hub    = document.getElementById('play-hub');
  const layout = hub?.closest('.play-hub__layout');
  const arena  = document.getElementById('play-arena');
  const stage  = document.getElementById('play-stage');
  const info   = document.getElementById('play-info');
  const backBtn = document.getElementById('play-back');
  if (!hub || !layout || !arena || !stage) return;

  let activeGame = null;

  /* ── hub controller ──────────────────────────── */
  hub.addEventListener('click', (e) => {
    const card = e.target.closest('.play-card');
    if (!card || activeGame) return;
    const game = card.dataset.game;
    if (game === 'snake') launchSnake();
    if (game === 'memory') launchMemory();
    if (game === 'runner') launchRunner();
    if (game === 'pong') launchPong();
    if (game === 'breakout') launchBreakout();
    if (game === 'tictactoe') launchTicTacToe();
  });

  backBtn?.addEventListener('click', exitGame);

  /* Close on backdrop click */
  arena.addEventListener('click', (e) => {
    if (e.target === arena) exitGame();
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeGame) exitGame();
  });

  function exitGame() {
    if (activeGame && activeGame.destroy) activeGame.destroy();
    activeGame = null;
    stage.innerHTML = '';
    info.textContent = '';
    arena.hidden = true;
    document.body.classList.remove('game-open');
    snd(0.6, 0.08);
  }

  function showArena() {
    arena.hidden = false;
    document.body.classList.add('game-open');
  }

  /* ============================================
     SNAKE
     ============================================ */
  function launchSnake() {
    showArena();

    const GRID = 20;
    const COLS = 20;
    const ROWS = 20;
    const SIZE = COLS * GRID;

    // Build DOM
    const wrap = document.createElement('div');
    wrap.className = 'snake-wrap';

    const cvs = document.createElement('canvas');
    cvs.width = SIZE;
    cvs.height = SIZE;
    wrap.appendChild(cvs);

    // Overlay (start / game-over)
    const overlay = document.createElement('div');
    overlay.className = 'snake-overlay';
    overlay.innerHTML =
      '<span class="snake-overlay__title" id="snake-title" data-i18n="play-snake">SNAKE</span>' +
      '<span class="snake-overlay__score" id="snake-score-text"></span>' +
      '<button class="snake-overlay__btn" id="snake-start-btn" data-i18n="play-start">PRESS TO START</button>';
    wrap.appendChild(overlay);

    // D-pad for mobile
    const dpad = document.createElement('div');
    dpad.className = 'snake-mobile-dpad';
    dpad.innerHTML =
      '<div class="dpad-empty"></div>' +
      '<button data-dir="up">&#9650;</button>' +
      '<div class="dpad-empty"></div>' +
      '<button data-dir="left">&#9664;</button>' +
      '<div class="dpad-empty"></div>' +
      '<button data-dir="right">&#9654;</button>' +
      '<div class="dpad-empty"></div>' +
      '<button data-dir="down">&#9660;</button>' +
      '<div class="dpad-empty"></div>';

    stage.appendChild(wrap);
    stage.appendChild(dpad);

    const ctx = cvs.getContext('2d');
    const GLYPH = '\u2733';

    let snake, dir, nextDir, food, score, bestScore, speed, timer, running;

    bestScore = +(localStorage.getItem('snake-best') || 0);

    function init() {
      const mid = Math.floor(COLS / 2);
      snake = [{ x: mid, y: Math.floor(ROWS / 2) }];
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      score = 0;
      speed = 150;
      placeFood();
      updateInfo();
      draw();
    }

    function placeFood() {
      const free = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!snake.some(s => s.x === x && s.y === y)) {
            free.push({ x, y });
          }
        }
      }
      food = free[Math.random() * free.length | 0] || { x: 0, y: 0 };
    }

    function updateInfo() {
      const best = Math.max(score, bestScore);
      info.textContent = 'SCORE: ' + score + '  |  BEST: ' + best;
    }

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Grid dots
      ctx.fillStyle = 'rgba(208,206,206,0.3)';
      ctx.font = (GRID * 0.4) + "px 'Roboto Mono', monospace";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          ctx.fillText('\u00B7', x * GRID + GRID / 2, y * GRID + GRID / 2);
        }
      }

      // Food (pulsing purple)
      ctx.font = (GRID * 0.65) + "px 'Roboto Mono', monospace";
      const pulse = 0.7 + Math.sin(Date.now() * 0.005) * 0.3;
      ctx.fillStyle = 'rgba(152,136,150,' + pulse + ')';
      ctx.fillText(GLYPH, food.x * GRID + GRID / 2, food.y * GRID + GRID / 2);

      // Snake
      for (let i = 0; i < snake.length; i++) {
        const s = snake[i];
        const t = i / Math.max(snake.length - 1, 1);
        // Head = teal, tail fades
        const r = 159 + (152 - 159) * t | 0;
        const g = 214 + (136 - 214) * t | 0;
        const b = 219 + (150 - 219) * t | 0;
        const alpha = 1 - t * 0.3;
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
        ctx.fillText(GLYPH, s.x * GRID + GRID / 2, s.y * GRID + GRID / 2);
      }
    }

    function tick() {
      dir = { ...nextDir };
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Wall collision → wrap
      if (head.x < 0) head.x = COLS - 1;
      if (head.x >= COLS) head.x = 0;
      if (head.y < 0) head.y = ROWS - 1;
      if (head.y >= ROWS) head.y = 0;

      // Self collision
      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        gameOver();
        return;
      }

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        score++;
        snd(1.2 + Math.random() * 0.3, 0.15);
        placeFood();
        // Speed up
        speed = Math.max(70, 150 - score * 3);
      } else {
        snake.pop();
      }

      updateInfo();
      draw();

      if (running) timer = setTimeout(tick, speed);
    }

    function gameOver() {
      running = false;
      clearTimeout(timer);
      snd(0.4, 0.18);

      if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('snake-best', String(bestScore));
      }

      const titleEl = overlay.querySelector('#snake-title');
      const scoreEl = overlay.querySelector('#snake-score-text');
      const btnEl   = overlay.querySelector('#snake-start-btn');
      titleEl.textContent = 'GAME OVER';
      titleEl.setAttribute('data-i18n', 'play-gameover');
      scoreEl.textContent = 'SCORE: ' + score + '  |  BEST: ' + bestScore;
      btnEl.textContent = 'PLAY AGAIN';
      btnEl.setAttribute('data-i18n', 'play-again');
      overlay.hidden = false;

      // Re-apply translations
      if (window.applyCurrentLang) window.applyCurrentLang();
    }

    function startGame() {
      overlay.hidden = true;
      init();
      running = true;
      timer = setTimeout(tick, speed);
      snd(1.0, 0.1);
    }

    // Controls
    function setDir(dx, dy) {
      // Prevent reversing
      if (dir.x === -dx && dir.y === -dy) return;
      nextDir = { x: dx, y: dy };
    }

    function onKey(e) {
      if (!running) return;
      switch (e.key) {
        case 'ArrowUp':    case 'w': case 'W': e.preventDefault(); setDir(0, -1); break;
        case 'ArrowDown':  case 's': case 'S': e.preventDefault(); setDir(0, 1);  break;
        case 'ArrowLeft':  case 'a': case 'A': e.preventDefault(); setDir(-1, 0); break;
        case 'ArrowRight': case 'd': case 'D': e.preventDefault(); setDir(1, 0);  break;
      }
    }

    document.addEventListener('keydown', onKey);

    // D-pad
    dpad.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-dir]');
      if (!btn || !running) return;
      switch (btn.dataset.dir) {
        case 'up':    setDir(0, -1); break;
        case 'down':  setDir(0, 1);  break;
        case 'left':  setDir(-1, 0); break;
        case 'right': setDir(1, 0);  break;
      }
    });

    // Swipe support
    let touchStartX = 0, touchStartY = 0;
    wrap.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    wrap.addEventListener('touchend', (e) => {
      if (!running) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        setDir(dx > 0 ? 1 : -1, 0);
      } else {
        setDir(0, dy > 0 ? 1 : -1);
      }
    }, { passive: true });

    // Start button
    overlay.querySelector('#snake-start-btn').addEventListener('click', startGame);

    // Init display
    init();
    overlay.hidden = false;

    // Apply translations
    if (window.applyCurrentLang) window.applyCurrentLang();

    activeGame = {
      destroy() {
        running = false;
        clearTimeout(timer);
        document.removeEventListener('keydown', onKey);
      }
    };
  }

  /* ============================================
     MEMORY
     ============================================ */
  function launchMemory() {
    showArena();

    const SYMBOLS = ['\u2733', '\u25C6', '\u25CF', '\u25B2', '\u25A0', '\u2605', '\u2666', '\u2764'];
    // 4x4 grid = 8 pairs
    const pairs = [...SYMBOLS, ...SYMBOLS];

    let cards, flipped, matched, moves, startTime, timerInterval;

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.random() * (i + 1) | 0;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function buildGrid() {
      stage.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'memory-grid';

      const shuffled = shuffle([...pairs]);
      cards = [];
      flipped = [];
      matched = 0;
      moves = 0;
      startTime = Date.now();

      shuffled.forEach((sym, i) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.dataset.index = i;
        card.dataset.symbol = sym;
        card.innerHTML =
          '<span class="memory-card__face memory-card__face--back">\u2733</span>' +
          '<span class="memory-card__face memory-card__face--front">' + sym + '</span>';
        grid.appendChild(card);
        cards.push(card);
      });

      grid.addEventListener('click', onCardClick);
      stage.appendChild(grid);

      updateMemoryInfo();
      timerInterval = setInterval(updateMemoryInfo, 1000);

      // Apply translations
      if (window.applyCurrentLang) window.applyCurrentLang();
    }

    function updateMemoryInfo() {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const min = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const sec = String(elapsed % 60).padStart(2, '0');
      info.textContent = 'MOVES: ' + moves + '  |  ' + min + ':' + sec;
    }

    function onCardClick(e) {
      const card = e.target.closest('.memory-card');
      if (!card) return;
      if (card.classList.contains('is-flipped') || card.classList.contains('is-matched')) return;
      if (flipped.length >= 2) return;

      card.classList.add('is-flipped');
      flipped.push(card);
      snd(1.0 + Math.random() * 0.3, 0.08);

      if (flipped.length === 2) {
        moves++;
        updateMemoryInfo();

        const a = flipped[0], b = flipped[1];
        if (a.dataset.symbol === b.dataset.symbol) {
          // Match
          setTimeout(() => {
            a.classList.add('is-matched');
            b.classList.add('is-matched');
            snd(1.4, 0.15);
            flipped = [];
            matched += 2;
            if (matched === pairs.length) {
              winMemory();
            }
          }, 400);
        } else {
          // No match
          setTimeout(() => {
            a.classList.remove('is-flipped');
            b.classList.remove('is-flipped');
            snd(0.5, 0.06);
            flipped = [];
          }, 800);
        }
      }
    }

    function winMemory() {
      clearInterval(timerInterval);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const min = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const sec = String(elapsed % 60).padStart(2, '0');

      snd(0.8, 0.2);

      const overlay = document.createElement('div');
      overlay.className = 'memory-overlay';
      overlay.innerHTML =
        '<span class="memory-overlay__title" data-i18n="play-youwin">YOU WIN</span>' +
        '<span class="memory-overlay__stat">' + moves + ' MOVES  |  ' + min + ':' + sec + '</span>' +
        '<button class="memory-overlay__btn" data-i18n="play-again">PLAY AGAIN</button>';

      overlay.querySelector('.memory-overlay__btn').addEventListener('click', () => {
        overlay.remove();
        buildGrid();
      });

      stage.appendChild(overlay);

      if (window.applyCurrentLang) window.applyCurrentLang();
    }

    buildGrid();

    activeGame = {
      destroy() {
        clearInterval(timerInterval);
      }
    };
  }

  /* ============================================
     RUNNER  (Chrome-dino style)
     ============================================ */
  function launchRunner() {
    showArena();

    const W = 480, H = 180;
    const GROUND = 150;
    const GRAV = 0.55;
    const JUMP = -10.5;
    const PX = 3;

    // Pixel-art sprite: R=hair(orange) S=skin D=dark(clothes)
    const SP = { R: '#d4622b', S: '#f0b88a', D: '#2b2b2b' };
    const RUN1 = [
      '..RR..', '.RRRR.', '.RRRR.', '.RRRR.',
      '..SS..', '..SS..',
      '.DDDD.', '.DDDD.', '.DSSD.', '.DDDD.',
      '..DD..', '..DD..', '..DD..',
      '.D..D.', '.D..D.'
    ];
    const RUN2 = [
      '..RR..', '.RRRR.', '.RRRR.', '.RRRR.',
      '..SS..', '..SS..',
      '.DDDD.', '.DDDD.', '.DSSD.', '.DDDD.',
      '..DD..', '..DD..', '..DD..',
      '..D.D.', '.D...D'
    ];
    const JUMP_F = [
      '..RR..', '.RRRR.', '.RRRR.', '.RRRR.',
      '..SS..', '..SS..',
      '.DDDD.', '.DDDD.', '.DSSD.', '.DDDD.',
      '..DD..', '.D..D.', '.D..D.',
      '......', '......'
    ];
    const SPW = 6 * PX, SPH = 15 * PX;

    // DOM
    const wrap = document.createElement('div');
    wrap.className = 'game-wrap';

    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    wrap.appendChild(cvs);

    const overlay = document.createElement('div');
    overlay.className = 'snake-overlay';
    overlay.innerHTML =
      '<span class="snake-overlay__title" data-i18n="play-runner">RUNNER</span>' +
      '<span class="snake-overlay__score" id="runner-score-text"></span>' +
      '<button class="snake-overlay__btn" id="runner-start-btn" data-i18n="play-start">PRESS TO START</button>';
    wrap.appendChild(overlay);
    stage.appendChild(wrap);

    const ctx = cvs.getContext('2d');
    let charY, velY, onGround, obstacles, speed, score, bestScore, fc, running, timer;
    bestScore = +(localStorage.getItem('runner-best') || 0);

    function drawSprite(frame, x, y) {
      for (let r = 0; r < frame.length; r++) {
        for (let c = 0; c < frame[r].length; c++) {
          const ch = frame[r][c];
          if (ch !== '.') {
            ctx.fillStyle = SP[ch];
            ctx.fillRect(x + c * PX, y + r * PX, PX, PX);
          }
        }
      }
    }

    function init() {
      charY = GROUND; velY = 0; onGround = true;
      obstacles = []; speed = 3; score = 0; fc = 0;
    }

    function spawnObs() {
      obstacles.push({ x: W + 10, w: 12 + Math.random() * 10 | 0, h: 20 + Math.random() * 25 | 0 });
    }

    function jump() {
      if (!onGround) return;
      velY = JUMP; onGround = false;
      snd(1.1, 0.08);
    }

    function tick() {
      fc++;
      // Physics
      if (!onGround) {
        velY += GRAV; charY += velY;
        if (charY >= GROUND) { charY = GROUND; velY = 0; onGround = true; }
      }
      speed = 3 + score * 0.005;
      // Move obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= speed;
        if (obstacles[i].x + obstacles[i].w < 0) obstacles.splice(i, 1);
      }
      // Spawn
      if (fc % Math.max(35, 80 - score / 5 | 0) === 0) spawnObs();
      // Collision
      const cx = 50 + 4, cy = charY - SPH, cw = SPW - 8, ch = SPH;
      for (const o of obstacles) {
        if (cx + cw > o.x && cx < o.x + o.w && cy + ch > GROUND - o.h) {
          gameOver(); return;
        }
      }
      score++;
      draw();
      updateInfo();
      if (running) timer = requestAnimationFrame(tick);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // Ground
      ctx.strokeStyle = 'rgba(208,206,206,0.6)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(W, GROUND); ctx.stroke();
      ctx.setLineDash([]);
      // Ground dots
      ctx.fillStyle = 'rgba(208,206,206,0.3)';
      ctx.font = "8px 'Roboto Mono', monospace";
      ctx.textAlign = 'center';
      const off = (fc * speed) % 24;
      for (let x = -off; x < W; x += 24) ctx.fillText('\u00B7', x, GROUND + 12);
      // Obstacles
      for (const o of obstacles) {
        ctx.fillStyle = '#988896';
        ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
        ctx.fillStyle = '#9fd6db';
        ctx.fillRect(o.x, GROUND - o.h, o.w, 3);
      }
      // Character
      let frame;
      if (!onGround) frame = JUMP_F;
      else frame = (Math.floor(fc / 8) % 2 === 0) ? RUN1 : RUN2;
      drawSprite(frame, 50, charY - SPH);
    }

    function updateInfo() {
      const s = Math.floor(score / 10);
      info.textContent = 'SCORE: ' + s + '  |  BEST: ' + Math.max(s, bestScore);
    }

    function gameOver() {
      running = false; cancelAnimationFrame(timer); snd(0.4, 0.18);
      const s = Math.floor(score / 10);
      if (s > bestScore) { bestScore = s; localStorage.setItem('runner-best', String(bestScore)); }
      const t = overlay.querySelector('.snake-overlay__title');
      const sc = overlay.querySelector('#runner-score-text');
      const b = overlay.querySelector('#runner-start-btn');
      t.textContent = 'GAME OVER'; t.setAttribute('data-i18n', 'play-gameover');
      sc.textContent = 'SCORE: ' + s + '  |  BEST: ' + bestScore;
      b.textContent = 'PLAY AGAIN'; b.setAttribute('data-i18n', 'play-again');
      overlay.hidden = false;
      if (window.applyCurrentLang) window.applyCurrentLang();
    }

    function startGame() {
      overlay.hidden = true; init(); running = true;
      timer = requestAnimationFrame(tick); snd(1.0, 0.1);
    }

    function onKey(e) {
      if (!running) return;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault(); jump();
      }
    }
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('click', () => { if (running) jump(); });
    wrap.addEventListener('touchstart', (e) => { if (running) { e.preventDefault(); jump(); } });
    overlay.querySelector('#runner-start-btn').addEventListener('click', startGame);

    init(); draw(); overlay.hidden = false;
    if (window.applyCurrentLang) window.applyCurrentLang();

    activeGame = {
      destroy() { running = false; cancelAnimationFrame(timer); document.removeEventListener('keydown', onKey); }
    };
  }

  /* ============================================
     PONG  (vs CPU)
     ============================================ */
  function launchPong() {
    showArena();

    const W = 400, H = 300;
    const PAD_W = 8, PAD_H = 60, BALL_R = 6, WIN = 5, CPU_SPD = 3.5;

    const wrap = document.createElement('div');
    wrap.className = 'game-wrap';
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    wrap.appendChild(cvs);

    const overlay = document.createElement('div');
    overlay.className = 'snake-overlay';
    overlay.innerHTML =
      '<span class="snake-overlay__title" data-i18n="play-pong">PONG</span>' +
      '<span class="snake-overlay__score" id="pong-score-text"></span>' +
      '<button class="snake-overlay__btn" id="pong-start-btn" data-i18n="play-start">PRESS TO START</button>';
    wrap.appendChild(overlay);
    stage.appendChild(wrap);

    const ctx = cvs.getContext('2d');
    let pY, cY, bx, by, bvx, bvy, pScore, cScore, running, timer;
    let mouseY = H / 2;

    function init() {
      pY = H / 2 - PAD_H / 2; cY = pY;
      pScore = 0; cScore = 0;
      resetBall();
    }

    function resetBall() {
      bx = W / 2; by = H / 2;
      const a = (Math.random() - 0.5) * Math.PI / 3;
      const d = Math.random() > 0.5 ? 1 : -1;
      bvx = d * 4 * Math.cos(a); bvy = 4 * Math.sin(a);
    }

    function tick() {
      // Player
      pY += (mouseY - PAD_H / 2 - pY) * 0.15;
      pY = Math.max(0, Math.min(H - PAD_H, pY));
      // CPU
      const ct = by - PAD_H / 2;
      if (cY < ct - 5) cY += CPU_SPD; else if (cY > ct + 5) cY -= CPU_SPD;
      cY = Math.max(0, Math.min(H - PAD_H, cY));
      // Ball
      bx += bvx; by += bvy;
      if (by - BALL_R < 0) { by = BALL_R; bvy = -bvy; }
      if (by + BALL_R > H) { by = H - BALL_R; bvy = -bvy; }
      // Paddle hit — player
      if (bx - BALL_R < 20 + PAD_W && bx > 20 && by > pY && by < pY + PAD_H) {
        bx = 20 + PAD_W + BALL_R;
        bvx = Math.abs(bvx) * 1.05;
        bvy = ((by - pY - PAD_H / 2) / (PAD_H / 2)) * 5;
        snd(1.2, 0.08);
      }
      // Paddle hit — CPU
      if (bx + BALL_R > W - 20 - PAD_W && bx < W - 20 && by > cY && by < cY + PAD_H) {
        bx = W - 20 - PAD_W - BALL_R;
        bvx = -Math.abs(bvx) * 1.05;
        bvy = ((by - cY - PAD_H / 2) / (PAD_H / 2)) * 5;
        snd(1.0, 0.08);
      }
      // Score
      if (bx < 0) { cScore++; snd(0.5, 0.12); resetBall(); }
      if (bx > W) { pScore++; snd(1.4, 0.12); resetBall(); }
      // Speed cap
      bvx = Math.max(-8, Math.min(8, bvx));
      bvy = Math.max(-6, Math.min(6, bvy));
      // Win
      if (pScore >= WIN || cScore >= WIN) { gameOver(); return; }

      draw(); updateInfo();
      if (running) timer = requestAnimationFrame(tick);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // Center line
      ctx.strokeStyle = 'rgba(208,206,206,0.4)';
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
      ctx.setLineDash([]);
      // Paddles
      ctx.fillStyle = '#9fd6db'; ctx.fillRect(20, pY, PAD_W, PAD_H);
      ctx.fillStyle = '#988896'; ctx.fillRect(W - 20 - PAD_W, cY, PAD_W, PAD_H);
      // Ball
      ctx.fillStyle = '#2b2b2b';
      ctx.beginPath(); ctx.arc(bx, by, BALL_R, 0, Math.PI * 2); ctx.fill();
      // Scores
      ctx.font = "28px 'Syne', sans-serif";
      ctx.fillStyle = 'rgba(208,206,206,0.5)'; ctx.textAlign = 'center';
      ctx.fillText(pScore, W / 2 - 40, 40);
      ctx.fillText(cScore, W / 2 + 40, 40);
    }

    function updateInfo() {
      info.textContent = 'YOU: ' + pScore + '  |  CPU: ' + cScore;
    }

    function gameOver() {
      running = false; cancelAnimationFrame(timer);
      const won = pScore >= WIN; snd(won ? 0.8 : 0.4, 0.18);
      const t = overlay.querySelector('.snake-overlay__title');
      const sc = overlay.querySelector('#pong-score-text');
      const b = overlay.querySelector('#pong-start-btn');
      t.textContent = won ? 'YOU WIN' : 'GAME OVER';
      t.setAttribute('data-i18n', won ? 'play-youwin' : 'play-gameover');
      sc.textContent = 'YOU: ' + pScore + '  |  CPU: ' + cScore;
      b.textContent = 'PLAY AGAIN'; b.setAttribute('data-i18n', 'play-again');
      overlay.hidden = false;
      if (window.applyCurrentLang) window.applyCurrentLang();
    }

    function startGame() {
      overlay.hidden = true; init(); running = true;
      timer = requestAnimationFrame(tick); snd(1.0, 0.1);
    }

    function onMove(e) {
      const rect = cvs.getBoundingClientRect();
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      mouseY = (cy - rect.top) * (H / rect.height);
    }
    cvs.addEventListener('mousemove', onMove);
    cvs.addEventListener('touchmove', (e) => { e.preventDefault(); onMove(e); }, { passive: false });
    cvs.addEventListener('touchstart', (e) => { e.preventDefault(); onMove(e); }, { passive: false });

    overlay.querySelector('#pong-start-btn').addEventListener('click', startGame);
    init(); draw(); overlay.hidden = false;
    if (window.applyCurrentLang) window.applyCurrentLang();

    activeGame = {
      destroy() { running = false; cancelAnimationFrame(timer); }
    };
  }

  /* ============================================
     BREAKOUT
     ============================================ */
  function launchBreakout() {
    showArena();

    const W = 400, H = 400;
    const PAD_W = 70, PAD_H = 10, BALL_R = 5;
    const BROWS = 4, BCOLS = 8;
    const BW = W / BCOLS, BH = 20, BTOP = 40;
    const ROW_CLR = ['#988896', '#9fd6db', '#d4622b', '#2b2b2b'];

    const wrap = document.createElement('div');
    wrap.className = 'game-wrap';
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    wrap.appendChild(cvs);

    const overlay = document.createElement('div');
    overlay.className = 'snake-overlay';
    overlay.innerHTML =
      '<span class="snake-overlay__title" data-i18n="play-breakout">BREAKOUT</span>' +
      '<span class="snake-overlay__score" id="brk-score-text"></span>' +
      '<button class="snake-overlay__btn" id="brk-start-btn" data-i18n="play-start">PRESS TO START</button>';
    wrap.appendChild(overlay);
    stage.appendChild(wrap);

    const ctx = cvs.getContext('2d');
    let padX, bx, by, bvx, bvy, bricks, score, lives, launched, running, timer;
    let mouseX = W / 2;

    function init() {
      padX = W / 2 - PAD_W / 2; score = 0; lives = 3; launched = false;
      bricks = [];
      for (let r = 0; r < BROWS; r++)
        for (let c = 0; c < BCOLS; c++)
          bricks.push({ x: c * BW, y: BTOP + r * BH, w: BW - 2, h: BH - 2, alive: true, clr: ROW_CLR[r] });
      resetBall();
    }

    function resetBall() {
      launched = false; bx = W / 2; by = H - 30 - BALL_R; bvx = 0; bvy = 0;
    }

    function launch() {
      if (launched) return;
      launched = true;
      bvx = (Math.random() - 0.5) * 4; bvy = -4;
    }

    function tick() {
      padX += (mouseX - PAD_W / 2 - padX) * 0.2;
      padX = Math.max(0, Math.min(W - PAD_W, padX));

      if (!launched) {
        bx = padX + PAD_W / 2; by = H - 30 - BALL_R;
      } else {
        bx += bvx; by += bvy;
        // Walls
        if (bx - BALL_R < 0) { bx = BALL_R; bvx = Math.abs(bvx); }
        if (bx + BALL_R > W) { bx = W - BALL_R; bvx = -Math.abs(bvx); }
        if (by - BALL_R < 0) { by = BALL_R; bvy = Math.abs(bvy); }
        // Paddle
        if (by + BALL_R > H - 30 && by + BALL_R < H - 20 && bx > padX && bx < padX + PAD_W) {
          by = H - 30 - BALL_R;
          bvx = ((bx - padX - PAD_W / 2) / (PAD_W / 2)) * 5;
          bvy = -Math.abs(bvy);
          const spd = Math.sqrt(bvx * bvx + bvy * bvy);
          if (spd < 7) { bvx *= 1.02; bvy *= 1.02; }
          snd(1.0, 0.06);
        }
        // Bricks
        for (const b of bricks) {
          if (!b.alive) continue;
          if (bx + BALL_R > b.x && bx - BALL_R < b.x + b.w &&
              by + BALL_R > b.y && by - BALL_R < b.y + b.h) {
            b.alive = false; score++; bvy = -bvy;
            snd(1.2 + Math.random() * 0.3, 0.1); break;
          }
        }
        // Fall
        if (by > H + 10) {
          lives--; snd(0.4, 0.15);
          if (lives <= 0) { gameOver(false); return; }
          resetBall();
        }
        // Win
        if (bricks.every(b => !b.alive)) { gameOver(true); return; }
      }

      draw(); updateInfo();
      if (running) timer = requestAnimationFrame(tick);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // Bricks
      ctx.font = "10px 'Roboto Mono', monospace";
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (const b of bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.clr;
        ctx.fillRect(b.x + 1, b.y + 1, b.w, b.h);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillText('\u2733', b.x + BW / 2, b.y + BH / 2);
      }
      // Paddle
      ctx.fillStyle = '#9fd6db';
      ctx.fillRect(padX, H - 30, PAD_W, PAD_H);
      // Ball
      ctx.fillStyle = '#2b2b2b';
      ctx.beginPath(); ctx.arc(bx, by, BALL_R, 0, Math.PI * 2); ctx.fill();
      // Lives
      ctx.fillStyle = '#988896';
      ctx.font = "12px 'Roboto Mono', monospace"; ctx.textAlign = 'left';
      for (let i = 0; i < lives; i++) ctx.fillText('\u2665', 8 + i * 16, H - 8);
    }

    function updateInfo() {
      info.textContent = 'SCORE: ' + score + '  |  LIVES: ' + lives;
    }

    function gameOver(won) {
      running = false; cancelAnimationFrame(timer);
      snd(won ? 0.8 : 0.4, 0.18);
      const t = overlay.querySelector('.snake-overlay__title');
      const sc = overlay.querySelector('#brk-score-text');
      const b = overlay.querySelector('#brk-start-btn');
      t.textContent = won ? 'YOU WIN' : 'GAME OVER';
      t.setAttribute('data-i18n', won ? 'play-youwin' : 'play-gameover');
      sc.textContent = 'SCORE: ' + score;
      b.textContent = 'PLAY AGAIN'; b.setAttribute('data-i18n', 'play-again');
      overlay.hidden = false;
      if (window.applyCurrentLang) window.applyCurrentLang();
    }

    function startGame() {
      overlay.hidden = true; init(); running = true;
      timer = requestAnimationFrame(tick); snd(1.0, 0.1);
    }

    function onMove(e) {
      const rect = cvs.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      mouseX = (cx - rect.left) * (W / rect.width);
    }
    function onClick() { if (running) launch(); }

    cvs.addEventListener('mousemove', onMove);
    cvs.addEventListener('click', onClick);
    cvs.addEventListener('touchmove', (e) => { e.preventDefault(); onMove(e); }, { passive: false });
    cvs.addEventListener('touchstart', (e) => { e.preventDefault(); onMove(e); launch(); }, { passive: false });

    function onKey(e) {
      if (!running) return;
      if (e.key === ' ') { e.preventDefault(); launch(); }
      if (e.key === 'ArrowLeft' || e.key === 'a') mouseX = Math.max(0, padX - 20);
      if (e.key === 'ArrowRight' || e.key === 'd') mouseX = Math.min(W, padX + PAD_W + 20);
    }
    document.addEventListener('keydown', onKey);

    overlay.querySelector('#brk-start-btn').addEventListener('click', startGame);
    init(); draw(); overlay.hidden = false;
    if (window.applyCurrentLang) window.applyCurrentLang();

    activeGame = {
      destroy() { running = false; cancelAnimationFrame(timer); document.removeEventListener('keydown', onKey); }
    };
  }

  /* ============================================
     TIC-TAC-TOE  (vs CPU — minimax)
     ============================================ */
  function launchTicTacToe() {
    showArena();

    let board, turn, gameActive, pW, cW, dr;
    pW = 0; cW = 0; dr = 0;

    const LINES = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    function winner() {
      for (const [a,b,c] of LINES)
        if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];
      return null;
    }

    function minimax(isMax) {
      const w = winner();
      if (w === 'O') return 1;
      if (w === 'X') return -1;
      if (board.every(c => c !== null)) return 0;
      if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] !== null) continue;
          board[i] = 'O'; best = Math.max(best, minimax(false)); board[i] = null;
        }
        return best;
      } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] !== null) continue;
          board[i] = 'X'; best = Math.min(best, minimax(true)); board[i] = null;
        }
        return best;
      }
    }

    function bestMove() {
      let best = -Infinity, move = -1;
      for (let i = 0; i < 9; i++) {
        if (board[i] !== null) continue;
        board[i] = 'O';
        const s = minimax(false);
        board[i] = null;
        if (s > best) { best = s; move = i; }
      }
      return move;
    }

    function buildBoard() {
      stage.innerHTML = '';
      board = Array(9).fill(null);
      turn = 'player'; gameActive = true;

      const grid = document.createElement('div');
      grid.className = 'ttt-grid';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'ttt-cell';
        cell.dataset.index = i;
        grid.appendChild(cell);
      }
      grid.addEventListener('click', onCell);
      stage.appendChild(grid);
      updateInfo();
    }

    function updateInfo() {
      info.textContent = 'W: ' + pW + '  |  L: ' + cW + '  |  D: ' + dr;
    }

    function onCell(e) {
      const cell = e.target.closest('.ttt-cell');
      if (!cell || !gameActive || turn !== 'player') return;
      const idx = +cell.dataset.index;
      if (board[idx] !== null) return;

      makeMove(idx, 'X'); snd(1.0, 0.08);
      if (checkEnd()) return;
      turn = 'cpu';
      setTimeout(cpuMove, 300);
    }

    function makeMove(idx, mark) {
      board[idx] = mark;
      const cell = stage.querySelectorAll('.ttt-cell')[idx];
      cell.textContent = mark === 'X' ? '\u2733' : '\u25C6';
      cell.classList.add(mark === 'X' ? 'ttt-cell--x' : 'ttt-cell--o');
    }

    function cpuMove() {
      if (!gameActive) return;
      makeMove(bestMove(), 'O'); snd(0.8, 0.08);
      checkEnd(); turn = 'player';
    }

    function checkEnd() {
      const w = winner();
      if (w) {
        gameActive = false;
        for (const [a,b,c] of LINES) {
          if (board[a] === w && board[b] === w && board[c] === w) {
            const cells = stage.querySelectorAll('.ttt-cell');
            cells[a].classList.add('ttt-cell--win');
            cells[b].classList.add('ttt-cell--win');
            cells[c].classList.add('ttt-cell--win');
          }
        }
        if (w === 'X') { pW++; snd(1.4, 0.15); } else { cW++; snd(0.4, 0.15); }
        updateInfo();
        showResult(w === 'X' ? 'YOU WIN' : 'GAME OVER', w === 'X' ? 'play-youwin' : 'play-gameover');
        return true;
      }
      if (board.every(c => c !== null)) {
        gameActive = false; dr++; snd(0.7, 0.1); updateInfo();
        showResult('DRAW', 'play-draw');
        return true;
      }
      return false;
    }

    function showResult(text, key) {
      setTimeout(() => {
        const ov = document.createElement('div');
        ov.className = 'memory-overlay';
        ov.innerHTML =
          '<span class="memory-overlay__title" data-i18n="' + key + '">' + text + '</span>' +
          '<button class="memory-overlay__btn" data-i18n="play-again">PLAY AGAIN</button>';
        ov.querySelector('.memory-overlay__btn').addEventListener('click', () => {
          ov.remove(); buildBoard();
        });
        stage.appendChild(ov);
        if (window.applyCurrentLang) window.applyCurrentLang();
      }, 600);
    }

    buildBoard();
    activeGame = { destroy() {} };
  }
})();

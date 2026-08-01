/* ==========================================================================
   A LETTER JUST FOR YOU — script.js
   Vanilla JS only. Organized into small, focused sections.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ *
   * Small shared helper
   * ------------------------------------------------------------------ */
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  /* ------------------------------------------------------------------ *
   * 0. LOADING SCREEN
   * ------------------------------------------------------------------ */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('hidden'), 1200);
  });
  // Fallback in case 'load' already fired before this listener attached
  setTimeout(() => loadingScreen.classList.add('hidden'), 2500);

  /* ------------------------------------------------------------------ *
   * 1. BACKGROUND DECORATIONS
   * ------------------------------------------------------------------ */
  const heartsLayer = document.getElementById('bg-hearts');
  const starsLayer = document.getElementById('bg-stars');
  const particlesLayer = document.getElementById('bg-particles');
  const flowersLayer = document.getElementById('bg-flowers');
  const butterfliesLayer = document.getElementById('bg-butterflies');

  const HEART_GLYPHS = ['❤', '💕', '💗', '💖'];
  const FLOWER_GLYPHS = ['🌸', '🌷', '🌺'];

  // Floating hearts rising slowly from the bottom
  function spawnHeart() {
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = HEART_GLYPHS[Math.floor(Math.random() * HEART_GLYPHS.length)];
    el.style.left = randomBetween(0, 100) + 'vw';
    el.style.bottom = '-5vh';
    el.style.fontSize = randomBetween(14, 30) + 'px';
    const duration = randomBetween(10, 18);
    el.style.animationDuration = duration + 's';
    heartsLayer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }

  // Tiny twinkling stars scattered across the sky
  function spawnStar(autoRemove) {
    const el = document.createElement('span');
    el.className = 'floating-star';
    el.textContent = '✦';
    el.style.left = randomBetween(0, 100) + 'vw';
    el.style.top = randomBetween(0, 100) + 'vh';
    el.style.fontSize = randomBetween(6, 12) + 'px';
    el.style.animationDuration = randomBetween(2, 5) + 's';
    starsLayer.appendChild(el);
    if (autoRemove) setTimeout(() => el.remove(), 4000);
  }

  // Small glowing particles drifting gently
  function spawnParticle() {
    const el = document.createElement('span');
    el.className = 'floating-particle';
    const size = randomBetween(4, 9);
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = randomBetween(0, 100) + 'vw';
    el.style.top = randomBetween(0, 100) + 'vh';
    el.style.animationDuration = randomBetween(4, 8) + 's';
    particlesLayer.appendChild(el);
  }

  // Gentle floating flowers, similar motion to hearts but slower
  function spawnFlower() {
    const el = document.createElement('span');
    el.className = 'floating-flower';
    el.textContent = FLOWER_GLYPHS[Math.floor(Math.random() * FLOWER_GLYPHS.length)];
    el.style.left = randomBetween(0, 100) + 'vw';
    el.style.bottom = '-5vh';
    el.style.fontSize = randomBetween(16, 26) + 'px';
    const duration = randomBetween(14, 22);
    el.style.animationDuration = duration + 's';
    flowersLayer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }

  // Butterflies appear only occasionally and drift for a while, then vanish
  function spawnButterfly() {
    const el = document.createElement('span');
    el.className = 'floating-butterfly';
    el.textContent = '🦋';
    el.style.left = randomBetween(5, 95) + 'vw';
    el.style.top = randomBetween(10, 80) + 'vh';
    el.style.fontSize = randomBetween(18, 26) + 'px';
    el.style.animationDuration = randomBetween(5, 8) + 's';
    el.style.opacity = '0';
    butterfliesLayer.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 1s ease';
      el.style.opacity = '0.8';
    });
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 1000);
    }, 6000);
  }

  // Seed the initial sky, then keep the scene alive on gentle intervals
  for (let i = 0; i < 40; i++) spawnStar(false);
  for (let i = 0; i < 18; i++) spawnParticle();

  setInterval(spawnHeart, 1400);
  setInterval(spawnFlower, 2600);
  setInterval(spawnButterfly, 9000); // "occasionally", as requested

  /* ------------------------------------------------------------------ *
   * 2. HEART CURSOR TRAIL
   * ------------------------------------------------------------------ */
  const cursorTrail = document.getElementById('cursor-trail');
  let lastTrailTime = 0;

  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 60) return; // throttle for performance
    lastTrailTime = now;
    const heart = document.createElement('span');
    heart.className = 'trail-heart';
    heart.textContent = '❤';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    cursorTrail.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
  });

  /* ------------------------------------------------------------------ *
   * 3. RIPPLE EFFECT FOR BUTTONS
   * ------------------------------------------------------------------ */
  function attachRipple(button) {
    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      button.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  }
  document.querySelectorAll('.ripple').forEach(attachRipple);

  /* ------------------------------------------------------------------ *
   * 4. MUSIC TOGGLE (music is optional — code is ready either way)
   * ------------------------------------------------------------------ */
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  const bgMusic = document.getElementById('bg-music');
  let musicPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (!musicPlaying) {
      bgMusic.play().catch(() => {
        // No audio file provided, or autoplay blocked — fail silently.
        // Drop a "song.mp3" file next to index.html to enable real playback.
      });
      musicIcon.textContent = '🎶';
      musicToggle.classList.add('playing');
    } else {
      bgMusic.pause();
      musicIcon.textContent = '🎵';
      musicToggle.classList.remove('playing');
    }
    musicPlaying = !musicPlaying;
  });

  /* ------------------------------------------------------------------ *
   * 5. SCREEN NAVIGATION
   * ------------------------------------------------------------------ */
  const screens = {
    landing: document.getElementById('screen-landing'),
    letter: document.getElementById('screen-letter'),
    proposal: document.getElementById('screen-proposal'),
    celebration: document.getElementById('screen-celebration'),
  };

  function goToScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  /* ------------------------------------------------------------------ *
   * 6. ENVELOPE → LETTER OPENING SEQUENCE
   * ------------------------------------------------------------------ */
  const envelope = document.getElementById('envelope');
  const landingScreen = screens.landing;
  let hasOpened = false;

  function openEnvelope() {
    if (hasOpened) return;
    hasOpened = true;

    envelope.classList.add('opened');
    landingScreen.classList.add('blurred');

    // let the flap-opening animation play, then transition to the letter
    setTimeout(() => {
      landingScreen.classList.remove('blurred');
      goToScreen('letter');
      typeLetter();
    }, 900);
  }

  envelope.addEventListener('click', openEnvelope);
  envelope.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openEnvelope();
  });

  /* ------------------------------------------------------------------ *
   * 7. TYPING ANIMATION FOR THE LETTER
   * ------------------------------------------------------------------ */
  const letterTyped = document.getElementById('letter-typed');

  const LOVE_LETTER_TEXT =
    "From the very first time we talked, something about you felt like home. " +
    "You turned ordinary days into memories I never want to forget, and your smile " +
    "somehow makes even the hardest days feel a little softer. I have imagined a " +
    "thousand futures, and in every single one, you are there beside me.";

  function typeLetter() {
    letterTyped.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '\u00A0';

    let i = 0;
    const speed = 22; // ms per character

    function typeChar() {
      if (i < LOVE_LETTER_TEXT.length) {
        letterTyped.textContent = LOVE_LETTER_TEXT.slice(0, i + 1);
        letterTyped.appendChild(cursor);
        i++;
        setTimeout(typeChar, speed);
      } else {
        cursor.remove();
      }
    }
    typeChar();
  }

  /* ------------------------------------------------------------------ *
   * 8. CONTINUE → PROPOSAL SCREEN
   * ------------------------------------------------------------------ */
  document.getElementById('continue-btn').addEventListener('click', () => {
    goToScreen('proposal');
  });

  /* ------------------------------------------------------------------ *
   * 9. THE NEVER-CLICKABLE "NO" BUTTON
   *
   *    Behavior:
   *    - It sits calmly next to YES until she moves toward it.
   *    - If the cursor/touch gets close, it slides away smoothly (a dodge).
   *    - The MOMENT she actually tries to click/tap it, it disappears
   *      (fades + shrinks out), a new random safe spot is picked, and it
   *      reappears there (fades + grows back in) — with a funny message.
   *    - This disappear → reappear cycle repeats every single time,
   *      forever. It can never actually be pressed. Only YES works.
   * ------------------------------------------------------------------ */
  const noBtn = document.getElementById('no-btn');
  const yesBtn = document.getElementById('yes-btn');
  const noToast = document.getElementById('no-toast');

  const FUNNY_MESSAGES = [
    'Nice try 😂',
    'Nope ❤️',
    'Think again 😏',
    'Are you sure? 🤭',
    'Mission Failed 😆',
    "You can't reject destiny 💖",
    'The universe says YES 🌸',
  ];

  const ESCAPE_RADIUS = 120; // px — how close the cursor can get before it dodges
  let noIsFixed = false;     // becomes true once the button starts moving around
  let isCycling = false;     // true while a disappear/reappear cycle is in progress

  // Picks a random position inside the viewport that never overlaps YES
  // and never lets the button fall off-screen.
  function getSafeRandomPosition() {
    const margin = 24;
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const maxX = Math.max(margin, window.innerWidth - btnRect.width - margin);
    const maxY = Math.max(margin, window.innerHeight - btnRect.height - margin);

    let x, y, overlapsYes, tries = 0;
    do {
      x = randomBetween(margin, maxX);
      y = randomBetween(margin, maxY);
      overlapsYes = (
        x < yesRect.right + 20 &&
        x + btnRect.width > yesRect.left - 20 &&
        y < yesRect.bottom + 20 &&
        y + btnRect.height > yesRect.top - 20
      );
      tries++;
    } while (overlapsYes && tries < 20);

    return { x, y };
  }

  function moveNoButton() {
    const { x, y } = getSafeRandomPosition();
    if (!noIsFixed) {
      noBtn.classList.add('escaping');
      noIsFixed = true;
    }
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
  }

  function showFunnyToast() {
    const msg = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
    noToast.textContent = msg;
    noToast.classList.add('show');
    setTimeout(() => noToast.classList.remove('show'), 1200);
  }

  // The dodge: cursor gets close → button slides away smoothly (no fading).
  document.addEventListener('mousemove', (e) => {
    if (!screens.proposal.classList.contains('active')) return;
    if (isCycling) return;
    const rect = noBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    if (dist < ESCAPE_RADIUS) {
      moveNoButton();
    }
  });

  // The real cycle: triggered the instant she tries to click or tap it.
  // pointerdown fires before a click can finish, so it's already gone by
  // the time she "lands" on it — this covers mouse, touch, and pen input.
  function vanishAndReappear() {
    if (isCycling) return;
    isCycling = true;

    showFunnyToast();
    noBtn.classList.add('vanishing'); // fade + shrink out

    setTimeout(() => {
      moveNoButton();                        // pick a new safe spot while invisible
      noBtn.classList.remove('vanishing');   // fade + grow back in there
      isCycling = false;
    }, 320);
  }

  noBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    vanishAndReappear();
  });

  // Safety net for browsers/devices where a click still slips through.
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isCycling) vanishAndReappear();
  });

  // Keep it safely on-screen and clear of YES if the window is resized.
  window.addEventListener('resize', () => {
    if (noIsFixed) moveNoButton();
  });

  /* ------------------------------------------------------------------ *
   * 10. YES → CELEBRATION
   * ------------------------------------------------------------------ */
  const yesPopup = document.getElementById('yes-popup');

  yesBtn.addEventListener('click', () => {
    launchConfetti();
    launchRibbons();
    launchCelebrationHearts();

    yesPopup.classList.add('show');
    setTimeout(() => {
      yesPopup.classList.remove('show');
      goToScreen('celebration');
    }, 2200);
  });

  /* ------------------------------------------------------------------ *
   * 11. CONFETTI + RIBBONS + EXTRA HEARTS (canvas + DOM based effects)
   * ------------------------------------------------------------------ */
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const CONFETTI_COLORS = ['#F8D7E8', '#EBDCFF', '#D4A373', '#FFFFFF', '#f7b8d4'];

  function launchConfetti() {
    const pieces = [];
    const count = 160;
    for (let i = 0; i < count; i++) {
      pieces.push({
        x: randomBetween(0, canvas.width),
        y: randomBetween(-canvas.height, 0),
        size: randomBetween(6, 12),
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        speedY: randomBetween(2, 5),
        speedX: randomBetween(-1.5, 1.5),
        rotation: randomBetween(0, 360),
        rotationSpeed: randomBetween(-6, 6),
      });
    }

    let frame = 0;
    const maxFrames = 320; // several seconds

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height + 20) {
          p.y = randomBetween(-40, -10);
          p.x = randomBetween(0, canvas.width);
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    draw();
  }

  // Flying ribbons: long curved strips drawn with quadratic curves, drifting downward
  function launchRibbons() {
    const ribbons = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      ribbons.push({
        x: randomBetween(0, canvas.width),
        y: randomBetween(-canvas.height, -20),
        length: randomBetween(60, 120),
        width: randomBetween(6, 10),
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        speedY: randomBetween(2.5, 4.5),
        sway: randomBetween(0.02, 0.05),
        phase: randomBetween(0, Math.PI * 2),
      });
    }

    let frame = 0;
    const maxFrames = 300;

    function draw() {
      ribbons.forEach((r) => {
        r.y += r.speedY;
        r.phase += r.sway;
        const swayX = Math.sin(r.phase) * 30;
        if (r.y > canvas.height + 100) {
          r.y = randomBetween(-120, -20);
          r.x = randomBetween(0, canvas.width);
        }
        ctx.save();
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.quadraticCurveTo(r.x + swayX, r.y + r.length / 2, r.x, r.y + r.length);
        ctx.globalAlpha = 0.8;
        ctx.stroke();
        ctx.restore();
      });
      frame++;
      if (frame < maxFrames) requestAnimationFrame(draw);
    }
    draw();
  }

  // Extra celebratory floating hearts + sparkles as DOM elements
  function launchCelebrationHearts() {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const el = document.createElement('span');
        el.className = 'floating-heart';
        el.textContent = HEART_GLYPHS[Math.floor(Math.random() * HEART_GLYPHS.length)];
        el.style.left = randomBetween(0, 100) + 'vw';
        el.style.bottom = '-5vh';
        el.style.fontSize = randomBetween(16, 34) + 'px';
        el.style.opacity = '0.9';
        const duration = randomBetween(6, 10);
        el.style.animationDuration = duration + 's';
        heartsLayer.appendChild(el);
        setTimeout(() => el.remove(), duration * 1000);
      }, i * 80);
    }

    for (let i = 0; i < 20; i++) {
      setTimeout(() => spawnStar(true), i * 60);
    }
  }

});

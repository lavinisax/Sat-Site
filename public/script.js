// ========================================
// ALFA SAT - Premium Interactive JavaScript
// Balanced Performance + Visual Impact
// ========================================

// ===== PERFORMANCE: Throttle helper =====
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// ===== CURSOR SPOTLIGHT GLOW EFFECT =====
const spotlight = document.querySelector('.cursor-spotlight');
let spotlightX = 0, spotlightY = 0;
let targetSpotlightX = 0, targetSpotlightY = 0;
let mouseX = 0, mouseY = 0;

// Throttled mouse tracking
const handleMouseMove = throttle((e) => {
  targetSpotlightX = e.clientX;
  targetSpotlightY = e.clientY;
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  }
}, 10); // Smooth 100fps tracking

document.addEventListener('mousemove', handleMouseMove);

function animateSpotlight() {
  spotlightX += (targetSpotlightX - spotlightX) * 0.08;
  spotlightY += (targetSpotlightY - spotlightY) * 0.08;

  if (spotlight) {
    // Rich purple + blue + red gradient spotlight
    spotlight.style.background = `
      radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, 
        rgba(139, 92, 246, 0.15), 
        rgba(0, 123, 255, 0.1), 
        rgba(225, 61, 61, 0.05),
        transparent 50%)
    `;
  }

  requestAnimationFrame(animateSpotlight);
}
animateSpotlight();

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let cursorX = 0, cursorY = 0;

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;

  if (cursor) {
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .section-card, .feature-card, .testimonial-card, .btn-primary, .btn-secondary');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
});

// ===== 3D TILT EFFECT FOR CARDS =====
const tiltCards = document.querySelectorAll('.section-card, .feature-card, .testimonial-card');

tiltCards.forEach(card => {
  const handleTilt = throttle((e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // More pronounced tilt
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.setProperty('--glow-x', `${glowX}%`);
    card.style.setProperty('--glow-y', `${glowY}%`);
  }, 16);

  card.addEventListener('mousemove', handleTilt);
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ===== FLOATING NUMBERS & SAT TERMS =====
function createFloatingNumbers() {
  const container = document.querySelector('.floating-numbers');
  if (!container) return;

  const items = ['1600', '800', 'SAT', 'EBRW', 'MATH', '400', '200', '+', '-', '×', '÷', '=', 'π', '√', 'x²', 'A', 'B', 'C', 'D', '∫', 'Σ'];

  function createNumber() {
    if (container.children.length > 25) return; // Good balance

    const span = document.createElement('span');
    span.className = 'floating-number';
    span.textContent = items[Math.floor(Math.random() * items.length)];
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = (12 + Math.random() * 8) + 's';
    span.style.fontSize = (1 + Math.random() * 2) + 'rem';

    // Random colors from theme
    const colors = ['rgba(0, 123, 255, 0.15)', 'rgba(139, 92, 246, 0.15)', 'rgba(225, 61, 61, 0.1)'];
    span.style.color = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(span);
    setTimeout(() => span.remove(), 20000);
  }

  // Good initial batch
  for (let i = 0; i < 15; i++) {
    setTimeout(createNumber, i * 200);
  }

  // Steady stream
  setInterval(createNumber, 1200);
}

// ===== BACKGROUND PARTICLES =====
function createParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;

  // Good balance of particles
  for (let i = 0; i < 35; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (3 + Math.random() * 4) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';

    // Varied sizes
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    container.appendChild(particle);
  }
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Staggered reveal
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

const handleScroll = throttle(() => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar?.classList.add('hidden');
  } else {
    navbar?.classList.remove('hidden');
  }

  lastScroll = currentScroll;
}, 30);

window.addEventListener('scroll', handleScroll, { passive: true });

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    element.textContent = Math.floor(easeOut * target).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString() + '+';
    }
  }

  requestAnimationFrame(updateCounter);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number[data-target]');
      counters.forEach((counter, i) => {
        setTimeout(() => {
          animateCounter(counter, parseInt(counter.dataset.target));
        }, i * 200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== MAGNETIC BUTTON EFFECT =====
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');

magneticButtons.forEach(button => {
  const handleMagnetic = throttle((e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, 16);

  button.addEventListener('mousemove', handleMagnetic);
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});

// ===== PARALLAX EFFECT =====
const handleParallax = throttle(() => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
  }
}, 16);

window.addEventListener('scroll', handleParallax, { passive: true });

// ===== MOBILE MENU =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
});

// ===== TEXT SCRAMBLE EFFECT FOR HERO =====
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#SAT1600';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="scramble">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  createFloatingNumbers();
  createParticles();

  // Enhanced scroll animations
  document.querySelectorAll('.section-card, .feature-card, .testimonial-card, .roadmap-item').forEach((el, i) => {
    if (!el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
      el.style.transitionDelay = (i % 4) * 0.12 + 's';
    }
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Add glow trail to mouse
  document.body.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
  });
});

// ===== DYNAMIC GRADIENT ON SCROLL =====
window.addEventListener('scroll', throttle(() => {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.body.style.setProperty('--scroll-percent', scrollPercent);
}, 50), { passive: true });

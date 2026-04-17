/*==========================================
  Shubham Vishvkarma Portfolio - script.js
==========================================*/

/* ---- 1. PARTICLES.JS INIT ---- */
window.addEventListener('load', () => {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 900 } },
        color: { value: ['#00d4ff', '#7c3aff', '#00ffa3'] },
        shape: { type: 'circle' },
        opacity: { value: 0.45, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.1 } },
        size: { value: 2, random: true },
        line_linked: {
          enable: true,
          distance: 130,
          color: '#00d4ff',
          opacity: 0.12,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: true,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }
});

/* ---- 2. NAV MENU (MOBILE) ---- */
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

// Close on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/* ---- 3. ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const top    = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav__menu a[href="#${id}"]`);
    if (scrollY >= top && scrollY < bottom) {
      link?.classList.add('active-link');
    } else {
      link?.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', highlightNav);

/* ---- 4. SCROLL UP BUTTON ---- */
const scrollUpBtn = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
  scrollUpBtn?.classList.toggle('show-scroll', window.scrollY >= 500);
});

/* ---- 5. SKILL BAR ANIMATION (IntersectionObserver) ---- */
const skillFills = document.querySelectorAll('.skill-card__fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.getAttribute('data-width');
      entry.target.style.width = target + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(bar => barObserver.observe(bar));

/* ---- 6. COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterEls = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

/* ---- 7. TIMELINE FADE-IN ---- */
const timelineCards = document.querySelectorAll('.timeline__card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 120);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  cardObserver.observe(card);
});

/* ---- 8. IMPACT CARD ENTRANCE ---- */
const impactCards = document.querySelectorAll('.impact-card');
const impactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 150);
    }
  });
}, { threshold: 0.25 });

impactCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  impactObserver.observe(card);
});

/* ============================================================
   9. POWER BI DASHBOARD CHARTS
   ============================================================ */

// ── Easing function (ease-out cubic) ──────────────────────────
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

// ── Shared animation runner ────────────────────────────────────
function animate(duration, drawFn, doneFn) {
  const start = performance.now();
  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    drawFn(eased);
    if (progress < 1) requestAnimationFrame(frame);
    else if (doneFn) doneFn();
  }
  requestAnimationFrame(frame);
}

// Helper – parse CSS variable
function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// ── Color palette matching the site theme ─────────────────────
const COLORS = {
  cyan:   '#00d4ff',
  violet: '#7c3aff',
  green:  '#00ffa3',
  pink:   '#ff6b9d',
  amber:  '#ffbd2e',
  red:    '#ff6b6b',
  bg:     '#0a1628',
  grid:   'rgba(0,212,255,0.06)',
  text:   '#6b84a0',
  title:  '#c8d6e5',
};

// ── 1. GROUPED BAR CHART ──────────────────────────────────────
function drawBarChart() {
  const canvas = document.getElementById('barChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const data2023 = [32, 28, 45, 51, 38, 60, 55, 70, 63, 80, 74, 90];
  const data2024 = [40, 35, 52, 65, 48, 75, 68, 85, 78, 95, 89, 110];

  const W = canvas.offsetWidth;
  const H = 220;
  canvas.width  = W;
  canvas.height = H;

  const PAD = { top: 20, right: 16, bottom: 40, left: 42 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top  - PAD.bottom;
  const maxVal = 120;
  const groupW = chartW / labels.length;
  const barW   = groupW * 0.32;

  animate(1400, (t) => {
    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth   = 1;
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + chartH - (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + chartW, y);
      ctx.stroke();
      // Y labels
      ctx.fillStyle = COLORS.text;
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText((maxVal / 4 * i).toFixed(0), PAD.left - 6, y + 4);
    }

    // Bars
    labels.forEach((lbl, i) => {
      const cx = PAD.left + groupW * i + groupW / 2;

      // 2023 bar
      const h23  = (data2023[i] / maxVal) * chartH * t;
      const x23  = cx - barW - 2;
      const grad23 = ctx.createLinearGradient(0, PAD.top + chartH - h23, 0, PAD.top + chartH);
      grad23.addColorStop(0, COLORS.cyan);
      grad23.addColorStop(1, 'rgba(0,212,255,0.15)');
      ctx.fillStyle = grad23;
      ctx.beginPath();
      ctx.roundRect(x23, PAD.top + chartH - h23, barW, h23, [4, 4, 0, 0]);
      ctx.fill();

      // 2024 bar
      const h24  = (data2024[i] / maxVal) * chartH * t;
      const x24  = cx + 2;
      const grad24 = ctx.createLinearGradient(0, PAD.top + chartH - h24, 0, PAD.top + chartH);
      grad24.addColorStop(0, COLORS.violet);
      grad24.addColorStop(1, 'rgba(124,58,255,0.15)');
      ctx.fillStyle = grad24;
      ctx.beginPath();
      ctx.roundRect(x24, PAD.top + chartH - h24, barW, h24, [4, 4, 0, 0]);
      ctx.fill();

      // X label
      ctx.fillStyle    = COLORS.text;
      ctx.font         = '10px JetBrains Mono, monospace';
      ctx.textAlign    = 'center';
      ctx.fillText(lbl, cx, PAD.top + chartH + 18);
    });
  });

  // Legend
  const legendEl = canvas.parentElement.querySelector('.bar-legend');
  if (!legendEl) {
    const leg = document.createElement('div');
    leg.className = 'donut-legend bar-legend';
    leg.innerHTML = `
      <span class="legend-item"><span class="legend-dot" style="background:${COLORS.cyan}"></span>FY 2023</span>
      <span class="legend-item"><span class="legend-dot" style="background:${COLORS.violet}"></span>FY 2024</span>`;
    canvas.insertAdjacentElement('afterend', leg);
  }
}

// ── 2. DONUT CHART ─────────────────────────────────────────────
function drawDonutChart() {
  const canvas = document.getElementById('donutChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const categories = [
    { label: 'Electronics', value: 35, color: COLORS.cyan },
    { label: 'Apparel',     value: 25, color: COLORS.violet },
    { label: 'FMCG',        value: 20, color: COLORS.green },
    { label: 'Home & Living',value: 12, color: COLORS.amber },
    { label: 'Others',      value: 8,  color: COLORS.pink },
  ];

  const SIZE = Math.min(canvas.offsetWidth, 200);
  canvas.width  = SIZE;
  canvas.height = SIZE;

  const cx     = SIZE / 2;
  const cy     = SIZE / 2;
  const outerR = SIZE * 0.42;
  const innerR = SIZE * 0.26;
  const total  = categories.reduce((s, c) => s + c.value, 0);
  let startAngle = -Math.PI / 2;
  const slices = categories.map(cat => ({
    ...cat,
    angle: (cat.value / total) * Math.PI * 2,
  }));

  animate(1200, (t) => {
    ctx.clearRect(0, 0, SIZE, SIZE);

    let cur = startAngle;
    slices.forEach(s => {
      const sweep = s.angle * t;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outerR, cur, cur + sweep);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.globalAlpha = 0.9;
      ctx.fill();

      // Inner hole
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.bg;
      ctx.globalAlpha = 1;
      ctx.fill();

      cur += sweep;
    });

    // Centre text
    ctx.fillStyle  = COLORS.title;
    ctx.font       = `bold ${SIZE * 0.13}px Space Grotesk, sans-serif`;
    ctx.textAlign  = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(total * t)}%`, cx, cy - 8);
    ctx.fillStyle  = COLORS.text;
    ctx.font       = `${SIZE * 0.07}px JetBrains Mono, monospace`;
    ctx.fillText('share', cx, cy + 12);
  });

  // Legend
  const legendEl = document.getElementById('donutLegend');
  if (legendEl) {
    legendEl.innerHTML = slices.map(s =>
      `<span class="legend-item">
        <span class="legend-dot" style="background:${s.color}"></span>
        ${s.label} (${s.value}%)
      </span>`
    ).join('');
  }
}

// ── 3. LINE / AREA CHART ───────────────────────────────────────
function drawLineChart() {
  const canvas = document.getElementById('lineChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const weeks   = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'];
  const actual  = [120,145,132,168,155,190,178,215,202,240,228,260];
  const target  = [130,140,150,160,170,180,190,200,210,220,230,240];

  const W = canvas.offsetWidth;
  const H = 180;
  canvas.width  = W;
  canvas.height = H;

  const PAD = { top: 20, right: 20, bottom: 36, left: 46 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const maxVal = 280;
  const N = weeks.length;
  const xStep = chartW / (N - 1);

  function getXY(i, val, progress) {
    return {
      x: PAD.left + xStep * i,
      y: PAD.top + chartH - (Math.min(i / (N - 1), progress) < (i / (N - 1)) ? 0 : (val / maxVal) * chartH),
    };
  }

  animate(1600, (t) => {
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth   = 1;
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + chartW, y);
      ctx.stroke();
      ctx.fillStyle  = COLORS.text;
      ctx.font       = '10px JetBrains Mono, monospace';
      ctx.textAlign  = 'right';
      ctx.fillText(maxVal - (maxVal / 4 * i), PAD.left - 6, y + 4);
    }

    const visiblePoints = Math.floor(t * (N - 1)) + 1;

    // Draw Target dashed line
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = COLORS.amber;
    ctx.lineWidth   = 1.5;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    for (let i = 0; i < Math.min(visiblePoints, N); i++) {
      const x = PAD.left + xStep * i;
      const y = PAD.top + chartH - (target[i] / maxVal) * chartH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // Draw Actual filled area
    const gradArea = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + chartH);
    gradArea.addColorStop(0, 'rgba(0,212,255,0.25)');
    gradArea.addColorStop(1, 'rgba(0,212,255,0)');

    const pts = [];
    for (let i = 0; i < Math.min(visiblePoints, N); i++) {
      pts.push({ x: PAD.left + xStep * i, y: PAD.top + chartH - (actual[i] / maxVal) * chartH });
    }

    // Area fill
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, PAD.top + chartH);
    ctx.lineTo(pts[0].x, PAD.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradArea;
    ctx.fill();

    // Line stroke
    ctx.beginPath();
    ctx.strokeStyle = COLORS.cyan;
    ctx.lineWidth   = 2.5;
    ctx.lineJoin    = 'round';
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();

    // Dots
    pts.forEach((p, i) => {
      if (i === pts.length - 1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle   = COLORS.cyan;
        ctx.shadowColor = COLORS.cyan;
        ctx.shadowBlur  = 12;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }
    });

    // X labels
    weeks.slice(0, Math.min(visiblePoints, N)).forEach((w, i) => {
      ctx.fillStyle  = COLORS.text;
      ctx.font       = '10px JetBrains Mono, monospace';
      ctx.textAlign  = 'center';
      ctx.fillText(w, PAD.left + xStep * i, PAD.top + chartH + 20);
    });
  });

  // Legend
  if (!canvas.parentElement.querySelector('.line-legend')) {
    const leg = document.createElement('div');
    leg.className = 'donut-legend line-legend';
    leg.innerHTML = `
      <span class="legend-item"><span class="legend-dot" style="background:${COLORS.cyan}"></span>Actual Orders</span>
      <span class="legend-item"><span class="legend-dot" style="background:${COLORS.amber}"></span>Target</span>`;
    canvas.insertAdjacentElement('afterend', leg);
  }
}

// ── 4. KPI VALUE COUNTERS ──────────────────────────────────────
function animateDashboardKPIs() {
  const kpiData = [
    { id: 'kpi1', target: 24.8, prefix: '₹', suffix: 'Cr', decimals: 1 },
    { id: 'kpi2', target: 12450, prefix: '', suffix: '', decimals: 0 },
    { id: 'kpi3', target: 1990, prefix: '₹', suffix: '', decimals: 0 },
    { id: 'kpi4', target: 94.3, prefix: '', suffix: '%', decimals: 1 },
  ];
  kpiData.forEach(kpi => {
    const el = document.getElementById(kpi.id);
    if (!el) return;
    animate(1800, (t) => {
      const val = kpi.target * t;
      el.textContent = kpi.prefix + (kpi.decimals ? val.toFixed(kpi.decimals) : Math.floor(val)) + kpi.suffix;
    });
  });
}

// ── 5. Run charts when section is visible ─────────────────────
let dashboardPlayed = false;

const dashboardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !dashboardPlayed) {
      dashboardPlayed = true;
      setTimeout(drawBarChart,   100);
      setTimeout(drawDonutChart, 200);
      setTimeout(drawLineChart,  300);
      setTimeout(animateDashboardKPIs, 100);
    }
  });
}, { threshold: 0.15 });

const dashSection = document.getElementById('dashboard');
if (dashSection) dashboardObserver.observe(dashSection);

// ── 6. Replay button ──────────────────────────────────────────
document.getElementById('replayCharts')?.addEventListener('click', () => {
  dashboardPlayed = false;
  // Clear KPIs
  ['kpi1','kpi2','kpi3','kpi4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '0';
  });
  setTimeout(drawBarChart,   100);
  setTimeout(drawDonutChart, 200);
  setTimeout(drawLineChart,  300);
  setTimeout(animateDashboardKPIs, 100);
  dashboardPlayed = true;
});

// ── 7. Redraw on window resize ────────────────────────────────
window.addEventListener('resize', () => {
  if (dashboardPlayed) {
    drawBarChart();
    drawDonutChart();
    drawLineChart();
  }
});

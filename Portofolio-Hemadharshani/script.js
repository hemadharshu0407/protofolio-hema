/**
 * Hemadharshani - Luxe Emerald Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initLuxeCanvas();
  initLuxeTabs();
  initLuxeTheme();
  initLuxeFilter();
  initLuxeForm();
  initLuxeScroll();
});

/* Ambient Canvas Particle Background */
function initLuxeCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const dots = Array.from({ length: 50 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.2,
    alpha: Math.random() * 0.7,
    speed: Math.random() * 0.15 + 0.05
  }));

  function renderDots() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.body.getAttribute('data-theme') === 'light';

    dots.forEach(d => {
      d.y -= d.speed;
      if (d.y < 0) d.y = height;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? `rgba(16, 185, 129, ${d.alpha})` : `rgba(212, 175, 55, ${d.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(renderDots);
  }

  renderDots();
}

/* Tab Navigation System */
function initLuxeTabs() {
  const items = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.luxe-section');

  function switchTab(id) {
    items.forEach(i => i.classList.toggle('active', i.getAttribute('data-tab') === id));
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  items.forEach(item => {
    item.addEventListener('click', () => switchTab(item.getAttribute('data-tab')));
  });

  window.switchTab = switchTab;
}

/* Theme Toggle */
function initLuxeTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const cur = document.body.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', next);
  });
}

/* Project Data & Modal */
const projectDetailsData = {
  1: { title: "KG CAS Student Portal", category: "Web App | HTML5, CSS Grid, JS", desc: "A custom academic management dashboard for KG College students to track notices and module schedules." },
  2: { title: "Responsive E-Learning Hub", category: "UI Design | CSS Flexbox, JS", desc: "Interactive online learning platform interface with dynamic video player UI and course accordions." },
  3: { title: "Academic GPA Calculator", category: "Utility | Vanilla JS, HTML5", desc: "High-precision grade point calculator tailored for college subject credit systems." },
  4: { title: "Smart Study Tracker", category: "Web App | JS, LocalStorage", desc: "Productivity application integrating Pomodoro focus timers with persistent local storage sync." },
  5: { title: "Symposium Event Website", category: "UI Design | HTML5, CSS Animations", desc: "Department event registration and showcase site built with interactive schedules." },
  6: { title: "Interactive Weather Suite", category: "Web App | Fetch API, JS", desc: "Real-time atmospheric tracking application showcasing temperature trends and metrics." },
  7: { title: "Portfolio Prototype v1", category: "UI Design | HTML5, CSS3", desc: "Design exploration showcasing custom glass layers and micro-interactions." }
};

function initLuxeFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-item-card');

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      t.classList.add('active');

      const cat = t.getAttribute('data-filter');
      cards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        card.style.display = (cat === 'all' || itemCat === cat) ? 'block' : 'none';
      });
    });
  });
}

function openProjectModal(id) {
  const modal = document.getElementById('project-modal');
  const data = projectDetailsData[id];
  if (!modal || !data) return;

  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-description').textContent = data.desc;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

window.openProjectModal = openProjectModal;
window.closeModal = closeModal;

/* Contact Form Validation */
function initLuxeForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('contact-name');
    const nameErr = document.getElementById('name-error');
    if (name.value.trim().length < 2) {
      nameErr.style.display = 'block'; valid = false;
    } else { nameErr.style.display = 'none'; }

    const email = document.getElementById('contact-email');
    const emailErr = document.getElementById('email-error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      emailErr.style.display = 'block'; valid = false;
    } else { emailErr.style.display = 'none'; }

    const msg = document.getElementById('contact-message');
    const msgErr = document.getElementById('message-error');
    if (msg.value.trim().length < 10) {
      msgErr.style.display = 'block'; valid = false;
    } else { msgErr.style.display = 'none'; }

    if (valid) {
      const toast = document.getElementById('toast');
      toast.classList.add('active');
      form.reset();
      setTimeout(() => toast.classList.remove('active'), 3000);
    }
  });
}

/* Scroll Top Button */
function initLuxeScroll() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('active', window.scrollY > 250);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
}));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (e) => {
  if (!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const tilt = document.querySelector('[data-tilt="soft"]');
if (tilt && matchMedia('(pointer:fine)').matches) {
  tilt.addEventListener('pointermove', (e) => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    tilt.style.transform = `perspective(900px) rotateY(${x*3}deg) rotateX(${-y*3}deg)`;
  });
  tilt.addEventListener('pointerleave', () => tilt.style.transform = '');
}

const projectData = {
  library: {
    title:'Library Management + Analytics',
    copy:'A project I like because it stopped being “just CRUD” once I started thinking about the workflow around it.',
    bullets:['Issue / return / extension flows','JWT authentication and scheduled notifications','Usage analytics and department-level patterns','Recommendation ideas based on tags and co-occurrence']
  },
  sheshield: {
    title:'SheShield',
    copy:'Built around a simple question: what should happen after someone presses an SOS button?',
    bullets:['Real-time GPS tracking','Priority-based escalation','Risk-zone visualisation','Offline SMS fallback for connectivity gaps']
  },
  signbridge: {
    title:'SignBridge',
    copy:'A semester project that turned into a lesson in how much work sits between “the model works” and “the experience works.”',
    bullets:['Custom gesture data collection','TensorFlow-based classifier','FastAPI backend + browser frontend','Real-time text output and interface iteration']
  },
  health: {
    title:'Wearable Health Monitoring',
    copy:'A small real-time ML system for sensor streams, anomaly detection and alerts.',
    bullets:['Sub-second data pipeline','Anomaly detection on wearable-style signals','API-driven alerting','Focus on practical monitoring rather than only model accuracy']
  }
};

const modal = document.getElementById('project-modal');
const title = document.getElementById('modal-title');
const copy = document.getElementById('modal-copy');
const bullets = document.getElementById('modal-bullets');
function closeModal(){
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.querySelectorAll('[data-modal]').forEach(btn => btn.addEventListener('click', () => {
  const d = projectData[btn.dataset.modal];
  if (!d || !modal) return;
  title.textContent = d.title;
  copy.textContent = d.copy;
  bullets.innerHTML = '<ul>' + d.bullets.map(x => `<li>${x}</li>`).join('') + '</ul>';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

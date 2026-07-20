// ===== 툴박스 메인 JS (Premium Animations) =====

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.tool-card');

    cards.forEach(card => {
      const name = card.querySelector('.tool-name')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.tool-desc')?.textContent.toLowerCase() || '';
      const tags = card.dataset.tags?.toLowerCase() || '';
      const match = name.includes(query) || desc.includes(query) || tags.includes(query);
      
      if (query !== '' && !match) {
        card.style.display = 'none';
      } else {
        card.style.display = 'flex';
        // Reset animation for newly shown cards
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      }
    });
  });
}

// Scroll animation (Scroll Reveal)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100); // Staggered animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Add background gradient dynamically if not present
  if (!document.querySelector('.bg-gradient')) {
    const bg = document.createElement('div');
    bg.className = 'bg-gradient';
    document.body.insertBefore(bg, document.body.firstChild);
  }

  // Observe elements for scroll reveal
  const revealElements = document.querySelectorAll('.tool-card, .popular-card, .about-card, .section-header');
  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
});

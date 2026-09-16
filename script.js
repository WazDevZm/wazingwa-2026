// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Theme handling
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.getElementById('themeColorMeta');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return prefersDark.matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode (T)' : 'Switch to dark mode (T)');
  }
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', theme === 'dark' ? '#09090b' : '#ffffff');
  }
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);

  if (themeToggle) {
    themeToggle.classList.add('is-pressed');
    setTimeout(() => themeToggle.classList.remove('is-pressed'), 200);
  }

  showToast(`Switched to ${next} mode`);
}

// Initialize theme
applyTheme(currentTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// Continuous Typewriter Animation for "Wazingwa Mugala!"
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const targetText = "Wazingwa Mugala!";
  let charIdx = 0;
  let isDeleting = false;
  let typeTimer = null;

  typewriterEl.textContent = "";

  function typeTick() {
    if (isDeleting) {
      charIdx--;
      typewriterEl.textContent = targetText.substring(0, charIdx);

      if (charIdx <= 0) {
        isDeleting = false;
        // Pause briefly before typing again
        typeTimer = setTimeout(typeTick, 500);
        return;
      }

      // Deleting speed: snappy
      typeTimer = setTimeout(typeTick, 42);
    } else {
      charIdx++;
      typewriterEl.textContent = targetText.substring(0, charIdx);

      if (charIdx >= targetText.length) {
        isDeleting = true;
        // Hold full name for 3.5 seconds with blinking cursor
        typeTimer = setTimeout(typeTick, 3500);
        return;
      }

      // Typing speed: natural human cadence (65ms - 110ms)
      const delay = 65 + Math.random() * 45;
      typeTimer = setTimeout(typeTick, delay);
    }
  }

  // Start typing after initial load delay
  typeTimer = setTimeout(typeTick, 350);

  // Click to replay immediately
  typewriterEl.parentElement.addEventListener('click', () => {
    if (typeTimer) clearTimeout(typeTimer);
    typewriterEl.textContent = "";
    charIdx = 0;
    isDeleting = false;
    typeTick();
  });
}

// Toast Notification System
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
let toastTimer = null;

function showToast(message, duration = 2200) {
  if (!toast) return;

  if (toastMessage) {
    toastMessage.textContent = message;
  }

  toast.classList.add('show');

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    toastTimer = null;
  }, duration);
}

// Copy email helper
const EMAIL_ADDRESS = 'wazingwamugala90@gmail.com';

async function copyEmail(sourceBtn = null) {
  if (sourceBtn) {
    sourceBtn.classList.add('is-pressed');
    setTimeout(() => sourceBtn.classList.remove('is-pressed'), 200);
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = EMAIL_ADDRESS;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    showToast(`Copied ${EMAIL_ADDRESS} to clipboard!`);
  } catch (err) {
    window.location.href = `mailto:${EMAIL_ADDRESS}`;
  }
}

// Email CTA button
const emailCtaBtn = document.getElementById('emailCtaBtn');
if (emailCtaBtn) {
  emailCtaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    copyEmail(emailCtaBtn);
  });
}

// Inline email link
const emailLink = document.getElementById('emailLink');
if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    copyEmail(emailLink);
  });
}

// Booking button
const bookBtn = document.getElementById('bookBtn');

// Global keyboard shortcuts: B (Book), E (Email), T (Theme)
window.addEventListener('keydown', (e) => {
  const activeEl = document.activeElement;
  const isInput = activeEl && (
    activeEl.tagName === 'INPUT' ||
    activeEl.tagName === 'TEXTAREA' ||
    activeEl.isContentEditable
  );

  if (isInput) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  const key = e.key.toLowerCase();

  if (key === 'b') {
    if (bookBtn) {
      bookBtn.classList.add('is-pressed');
      setTimeout(() => bookBtn.classList.remove('is-pressed'), 200);
      showToast('Opening Cal.com booking...');
      setTimeout(() => {
        window.open(bookBtn.href, '_blank', 'noopener,noreferrer');
      }, 150);
    }
  } else if (key === 'e') {
    copyEmail(emailCtaBtn);
  } else if (key === 't') {
    toggleTheme();
  }
});

// Project cards interaction
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const href = card.getAttribute('href');
    if (!href || href.startsWith('#')) {
      e.preventDefault();
      const projectName = card.getAttribute('data-project') || 'Project';
      showToast(`${projectName} — details coming soon!`);
    }
  });
});

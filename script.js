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

// Preview Window Loading State Management
document.querySelectorAll('.preview-iframe').forEach((iframe) => {
  const spinner = iframe.closest('.preview-viewport-wrap')?.querySelector('.preview-loading-spinner');
  
  function hideSpinner() {
    if (spinner) spinner.classList.add('is-hidden');
  }

  iframe.addEventListener('load', hideSpinner);
  // Fallback timeout in case cross-origin load event is delayed
  setTimeout(hideSpinner, 3500);
});

// Copy Site Link Buttons
document.querySelectorAll('.btn-copy-link').forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const url = btn.getAttribute('data-copy');
    if (!url) return;

    btn.classList.add('is-pressed');
    setTimeout(() => btn.classList.remove('is-pressed'), 200);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = url;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-999999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      showToast(`Copied ${url} to clipboard!`);
    } catch (err) {
      showToast(`Link: ${url}`);
    }
  });
});

// Reload Preview Frame
document.querySelectorAll('.btn-reload-frame').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.project-showcase-card');
    if (!card) return;

    const iframe = card.querySelector('.preview-iframe');
    const spinner = card.querySelector('.preview-loading-spinner');

    if (iframe) {
      if (spinner) spinner.classList.remove('is-hidden');
      const currentSrc = iframe.src;
      iframe.src = 'about:blank';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 50);
      showToast('Reloading preview...');
    }
  });
});

// Interactive Mode Toggle (Allows mouse interaction inside preview snippet)
document.querySelectorAll('.btn-toggle-interact').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.project-showcase-card');
    if (!card) return;

    const iframe = card.querySelector('.preview-iframe');
    if (!iframe) return;

    const isInteractive = iframe.classList.toggle('interactive');
    btn.classList.toggle('is-active', isInteractive);

    const span = btn.querySelector('span');
    if (span) {
      span.textContent = isInteractive ? '🔒 Lock' : '⚡ Interact';
    }

    if (isInteractive) {
      showToast('Interactive mode: scroll & click inside preview enabled');
    } else {
      showToast('Preview locked to page scroll');
    }
  });
});

// Coming Soon Project Triggers
document.querySelectorAll('.btn-coming-soon-trigger').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const projectName = btn.getAttribute('data-project') || 'Project';
    showToast(`${projectName} — Coming soon! Live deployment in progress.`);
  });
});

// Full Preview Modal System
const previewModal = document.getElementById('previewModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCloseDot = document.getElementById('modalCloseDot');
const modalProjectTitle = document.getElementById('modalProjectTitle');
const modalIframe = document.getElementById('modalIframe');
const modalFrameShell = document.getElementById('modalFrameShell');
const modalLoadingIndicator = document.getElementById('modalLoadingIndicator');
const modalExternalLink = document.getElementById('modalExternalLink');
const viewSwitchBtns = document.querySelectorAll('.view-switch-btn');

function openPreviewModal(projectName, url) {
  if (!previewModal || !modalIframe) return;

  if (modalProjectTitle) {
    modalProjectTitle.textContent = `${projectName} — Live Preview`;
  }

  if (modalExternalLink) {
    modalExternalLink.href = url;
    modalExternalLink.style.display = url && url.startsWith('http') ? 'inline-flex' : 'none';
  }

  // Reset to desktop view
  if (modalFrameShell) {
    modalFrameShell.setAttribute('data-view', 'desktop');
  }
  viewSwitchBtns.forEach((b) => {
    b.classList.toggle('is-active', b.getAttribute('data-view') === 'desktop');
  });

  // Show loading indicator
  if (modalLoadingIndicator) {
    modalLoadingIndicator.classList.remove('is-hidden');
  }

  modalIframe.src = url || 'about:blank';

  modalIframe.onload = () => {
    if (modalLoadingIndicator) {
      modalLoadingIndicator.classList.add('is-hidden');
    }
  };

  previewModal.hidden = false;
  // Trigger transition
  requestAnimationFrame(() => {
    previewModal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  });
}

function closePreviewModal() {
  if (!previewModal) return;

  previewModal.classList.remove('is-open');
  document.body.style.overflow = '';

  setTimeout(() => {
    previewModal.hidden = true;
    if (modalIframe) modalIframe.src = 'about:blank';
  }, 250);
}

// Modal open triggers
document.querySelectorAll('.btn-expand-modal, .btn-dot-expand').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const projectName = btn.getAttribute('data-project') || btn.getAttribute('data-target') || 'Project';
    const url = btn.getAttribute('data-url');
    if (url) {
      openPreviewModal(projectName, url);
    }
  });
});

// Modal close triggers
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePreviewModal);
if (modalCloseDot) modalCloseDot.addEventListener('click', closePreviewModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closePreviewModal);

// View Switcher Buttons (Desktop / Tablet / Mobile)
viewSwitchBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const view = btn.getAttribute('data-view');
    if (!view || !modalFrameShell) return;

    modalFrameShell.setAttribute('data-view', view);
    viewSwitchBtns.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && previewModal && !previewModal.hidden) {
    closePreviewModal();
  }
});


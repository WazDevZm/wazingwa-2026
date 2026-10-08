// Confetti Animation System
const confettiContainer = document.getElementById('confetti');
const celebrateBtn = document.getElementById('celebrateBtn');

const confettiColors = [
  '#ff69b4', // Hot pink
  '#ff1493', // Deep pink
  '#ff6b6b', // Coral
  '#ffd93d', // Yellow
  '#6bcb77', // Green
  '#4d96ff', // Blue
  '#ba55d3', // Medium purple
  '#dda0dd', // Plum
  '#ffb6c1', // Light pink
  '#ffc0cb', // Pink
];

const confettiShapes = ['square', 'circle', 'triangle'];

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  
  const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
  const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
  
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = color;
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
  confetti.style.animationDelay = Math.random() * 2 + 's';
  
  // Shape styling
  if (shape === 'circle') {
    confetti.style.borderRadius = '50%';
  } else if (shape === 'triangle') {
    confetti.style.width = '0';
    confetti.style.height = '0';
    confetti.style.backgroundColor = 'transparent';
    confetti.style.borderLeft = '5px solid transparent';
    confetti.style.borderRight = '5px solid transparent';
    confetti.style.borderBottom = '10px solid ' + color;
  } else {
    confetti.style.borderRadius = '2px';
  }
  
  confettiContainer.appendChild(confetti);
  
  // Remove confetti after animation
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

// Continuous confetti rain
function startConfettiRain() {
  setInterval(createConfetti, 100);
}

// Burst confetti on button click
function createConfettiBurst(x, y) {
  for (let i = 0; i < 50; i++) {
    const burst = document.createElement('div');
    burst.classList.add('confetti-burst');
    
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const angle = (Math.PI * 2 * i) / 50;
    const velocity = Math.random() * 200 + 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    burst.style.backgroundColor = color;
    burst.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    
    burst.style.setProperty('--tx', tx + 'px');
    burst.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(burst);
    
    // Animate the burst
    burst.animate([
      { transform: 'translate(0, 0) scale(0)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
    });
    
    setTimeout(() => burst.remove(), 1000);
  }
}

// Celebrate button functionality
let isCelebrating = false;

celebrateBtn.addEventListener('click', (e) => {
  isCelebrating = !isCelebrating;
  
  if (isCelebrating) {
    document.body.classList.add('celebrating');
    celebrateBtn.querySelector('.btn-text').textContent = '🎉 Celebrating! 🎉';
    
    // Create burst at button position
    const rect = celebrateBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createConfettiBurst(x, y);
    
    // Additional bursts
    setTimeout(() => createConfettiBurst(x, y), 200);
    setTimeout(() => createConfettiBurst(x, y), 400);
    
    // Increase confetti rain
    const burstInterval = setInterval(createConfetti, 30);
    
    // Stop celebration after 5 seconds
    setTimeout(() => {
      isCelebrating = false;
      document.body.classList.remove('celebrating');
      celebrateBtn.querySelector('.btn-text').textContent = 'Click to Celebrate! 🎉';
      clearInterval(burstInterval);
    }, 5000);
  }
});

// Floating hearts animation
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = ['💖', '💗', '💕', '💝', '❤️'][Math.floor(Math.random() * 5)];
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.bottom = '-50px';
  heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '999';
  heart.style.opacity = '0.8';
  
  document.body.appendChild(heart);
  
  heart.animate([
    { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
    { transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
  ], {
    duration: Math.random() * 3000 + 4000,
    easing: 'ease-out'
  });
  
  setTimeout(() => heart.remove(), 7000);
}

// Start floating hearts
setInterval(createFloatingHeart, 800);

// Sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.9) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.fontSize = '20px';
    
    document.body.appendChild(sparkle);
    
    sparkle.animate([
      { transform: 'scale(0) rotate(0deg)', opacity: 1 },
      { transform: 'scale(1.5) rotate(180deg)', opacity: 0 }
    ], {
      duration: 600,
      easing: 'ease-out'
    });
    
    setTimeout(() => sparkle.remove(), 600);
  }
});

// Initial confetti burst on page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    createConfettiBurst(centerX, centerY);
  }, 500);
  
  // Start continuous confetti rain after a delay
  setTimeout(startConfettiRain, 1000);
});

// Add touch support for mobile
celebrateBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  celebrateBtn.click();
});

// Keyboard support - Space to celebrate
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !e.repeat) {
    e.preventDefault();
    celebrateBtn.click();
  }
});

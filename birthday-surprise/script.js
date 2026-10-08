// Confetti Animation System
const confettiContainer = document.getElementById('confetti');
const celebrateBtn = document.getElementById('celebrateBtn');
const surpriseBtn1 = document.getElementById('surpriseBtn1');
const surpriseBtn2 = document.getElementById('surpriseBtn2');
const surpriseBtn3 = document.getElementById('surpriseBtn3');

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

// Surprise Button 1: Send Love (Heart burst)
surpriseBtn1.addEventListener('click', (e) => {
  const rect = surpriseBtn1.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  // Create heart burst
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = ['💖', '💗', '💕', '💝'][Math.floor(Math.random() * 4)];
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '30px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1002';
    
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = Math.random() * 150 + 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    document.body.appendChild(heart);
    
    heart.animate([
      { transform: 'translate(0, 0) scale(0)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(1.5)`, opacity: 0 }
    ], {
      duration: 1200,
      easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
    });
    
    setTimeout(() => heart.remove(), 1200);
  }
});

// Surprise Button 2: Magic Sparkles
surpriseBtn2.addEventListener('click', (e) => {
  const rect = surpriseBtn2.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  // Create sparkle explosion
  for (let i = 0; i < 40; i++) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = (Math.random() * 20 + 20) + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1002';
    
    const angle = (Math.PI * 2 * i) / 40;
    const velocity = Math.random() * 200 + 150;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    document.body.appendChild(sparkle);
    
    sparkle.animate([
      { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(1) rotate(360deg)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
    });
    
    setTimeout(() => sparkle.remove(), 1000);
  }
  
  // Add extra sparkles around screen
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const randomSparkle = document.createElement('div');
      randomSparkle.innerHTML = '✨';
      randomSparkle.style.position = 'fixed';
      randomSparkle.style.left = Math.random() * 100 + 'vw';
      randomSparkle.style.top = Math.random() * 100 + 'vh';
      randomSparkle.style.fontSize = '25px';
      randomSparkle.style.pointerEvents = 'none';
      randomSparkle.style.zIndex = '1002';
      
      document.body.appendChild(randomSparkle);
      
      randomSparkle.animate([
        { transform: 'scale(0) rotate(0deg)', opacity: 1 },
        { transform: 'scale(2) rotate(180deg)', opacity: 0 }
      ], {
        duration: 800,
        easing: 'ease-out'
      });
      
      setTimeout(() => randomSparkle.remove(), 800);
    }, i * 50);
  }
});

// Surprise Button 3: Flower Rain
surpriseBtn3.addEventListener('click', (e) => {
  const flowers = ['🌸', '🌺', '🌹', '🌷', '💐', '🌻'];
  
  // Create flower rain from top
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const flower = document.createElement('div');
      flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
      flower.style.position = 'fixed';
      flower.style.left = Math.random() * 100 + 'vw';
      flower.style.top = '-50px';
      flower.style.fontSize = (Math.random() * 15 + 25) + 'px';
      flower.style.pointerEvents = 'none';
      flower.style.zIndex = '1002';
      flower.style.opacity = '0.9';
      
      document.body.appendChild(flower);
      
      flower.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.9 },
        { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 2000 + 3000,
        easing: 'ease-out'
      });
      
      setTimeout(() => flower.remove(), 5000);
    }, i * 30);
  }
});

// Touch support for surprise buttons
[surpriseBtn1, surpriseBtn2, surpriseBtn3].forEach(btn => {
  if (btn) {
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      btn.click();
    });
  }
});

// Kalulu — interactions
(() => {
  const USD_RATE = 20.2; // ZMW per USD, Nov 2026 reference rate
  const EMAIL = 'wazingwamugala90@gmail.com';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;

  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav: shadow on scroll + mobile menu
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  // Marquee: duplicate content so the -50% loop is seamless
  const track = document.querySelector('.marquee-track');
  track.innerHTML += track.innerHTML;

  // Scroll reveal with stagger among siblings
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    el.style.setProperty('--d', `${Math.min(siblings.indexOf(el), 6) * 0.08}s`);
    io.observe(el);
  });

  // Count-up stats
  const counters = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const fmt = n => (el.dataset.prefix || '') + Math.round(n).toLocaleString('en-US') + (el.dataset.suffix || '');
      if (reduceMotion) { el.textContent = fmt(target); return; }
      const start = performance.now();
      const tick = now => {
        const t = Math.min((now - start) / 1400, 1);
        el.textContent = fmt(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counters.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counters.observe(el));

  // Cursor glow, card spotlight, tilt and magnetic buttons (desktop only)
  if (finePointer && !reduceMotion) {
    const root = document.documentElement;
    addEventListener('pointermove', e => {
      root.style.setProperty('--mx', `${e.clientX}px`);
      root.style.setProperty('--my', `${e.clientY}px`);
    }, { passive: true });

    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--x', `${x * 100}%`);
        card.style.setProperty('--y', `${y * 100}%`);
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 6}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  // Template previews: lazy-load iframes and scale them to fit their card
  const frames = document.querySelectorAll('.tpl-preview iframe');
  const fit = () => frames.forEach(f => f.style.setProperty('--s', f.parentElement.clientWidth / 1280));
  fit();
  addEventListener('resize', fit);
  const frameIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.src = e.target.dataset.src;
      frameIO.unobserve(e.target);
    });
  }, { rootMargin: '300px' });
  frames.forEach(f => frameIO.observe(f));

  // Hover a preview to slowly scroll the demo inside it
  document.querySelectorAll('.tpl-preview').forEach(p => {
    const f = p.querySelector('iframe');
    p.addEventListener('pointerenter', () => {
      try { f.contentWindow.scrollTo({ top: f.contentDocument.body.scrollHeight, behavior: 'smooth' }); } catch {}
    });
    p.addEventListener('pointerleave', () => {
      try { f.contentWindow.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
    });
  });

  // Template filters
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.toggle('active', c === chip));
    const f = chip.dataset.filter;
    document.querySelectorAll('.tpl').forEach(t => {
      t.classList.toggle('hide', f !== 'all' && !t.dataset.cat.split(' ').includes(f));
    });
    fit();
  }));

  // Currency toggle
  const toggle = document.querySelector('.currency-toggle');
  const formatPrice = (zmw, cur) => cur === 'usd'
    ? '$' + Math.round(zmw / USD_RATE).toLocaleString('en-US')
    : 'K' + zmw.toLocaleString('en-US');
  toggle.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
    const cur = btn.dataset.cur;
    toggle.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
    toggle.classList.toggle('usd', cur === 'usd');
    document.querySelectorAll('[data-zmw]').forEach(el => {
      el.classList.add('swap');
      setTimeout(() => {
        el.textContent = formatPrice(+el.dataset.zmw, cur);
        el.classList.remove('swap');
      }, 180);
    });
  }));

  // "Choose X" buttons preselect the plan in the contact form
  const planSelect = document.getElementById('cPlan');
  document.querySelectorAll('[data-order]').forEach(a => a.addEventListener('click', () => {
    planSelect.value = a.dataset.order;
  }));

  // Contact form → prefilled email
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    const subject = `Kalulu enquiry: ${d.get('plan')}`;
    const body = `Hi Kalulu team,\n\nName: ${d.get('name')}\nInterested in: ${d.get('plan')}\n\n${d.get('message')}`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();

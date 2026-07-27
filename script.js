document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------
     Typewriter effect di terminal hero
  ----------------------------------------------------------- */
  const cmdEl = document.getElementById('typedCmd');
  const outputEl = document.getElementById('typedOutput');
  const cursorEl = document.getElementById('cursor');

  const command = 'whoami';
  const output = 'Mahasiswa Informatika & Web Developer, siap belajar dan berkontribusi.';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeText(el, text, speed, onDone) {
    let i = 0;
    (function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if (onDone) {
        onDone();
      }
    })();
  }

  if (prefersReducedMotion) {
    cmdEl.textContent = command;
    outputEl.innerHTML = `<span class="hl">&gt;</span> ${output}`;
  } else {
    typeText(cmdEl, command, 90, () => {
      setTimeout(() => {
        outputEl.innerHTML = '<span class="hl">&gt;</span> ';
        typeText(
          { get textContent() { return outputEl.textContent; }, set textContent(v) { outputEl.innerHTML = '<span class="hl">&gt;</span> ' + v; } },
          output,
          18
        );
      }, 400);
    });
  }

  /* -----------------------------------------------------------
     Scroll cue -> lompat ke konten utama
  ----------------------------------------------------------- */
  const scrollCue = document.getElementById('scrollCue');
  const layout = document.querySelector('.layout');
  if (scrollCue && layout) {
    scrollCue.addEventListener('click', () => {
      layout.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* -----------------------------------------------------------
     Reveal-on-scroll ringan untuk tiap section
  ----------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('.block, .card');
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));
});

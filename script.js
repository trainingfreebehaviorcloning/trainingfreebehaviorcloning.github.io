const methodSteps = {
  retrieval: { title: 'Retrieve demonstration segments', text: 'Use the fitted action-aware metric to retrieve segments with observation–action histories similar to the current history.' },
  continuation: { title: 'Combine future actions', text: 'Fit coefficients that reconstruct the current observation–action history from the retrieved segments. Use the same coefficients to combine their future actions.' },
  correction: { title: 'Apply a residual correction', text: 'Pool random Fourier features over the retrieved segments. Use a linear model fitted in closed form to correct the first predicted action, then clip and execute it.' }
};

const methodSection = document.getElementById('method');
const tabs = [...methodSection.querySelectorAll('[role="tab"]')];
const hotspots = [...methodSection.querySelectorAll('.method-hotspot')];
const methodControls = [...hotspots, ...tabs];
const panel = document.getElementById('method-panel');
function selectMethodStep(activeStep) {
  const step = methodSteps[activeStep];
  if (!step) return;
  methodSection.dataset.activeStep = activeStep;
  tabs.forEach(tab => {
    const active = tab.dataset.step === activeStep;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  hotspots.forEach(hotspot => {
    const active = hotspot.dataset.step === activeStep;
    hotspot.classList.toggle('is-active', active);
    hotspot.setAttribute('aria-pressed', String(active));
  });
  panel.setAttribute('aria-labelledby', `tab-${activeStep}`);
  // Avoid repeating live-region announcements when only the input source changes.
  if (panel.querySelector('h3').textContent === step.title) return;
  panel.querySelector('h3').textContent = step.title;
  panel.querySelector('p').textContent = step.text;
}

methodControls.forEach(control => {
  // Keep the hovered component selected so the explanation stays readable
  // when the pointer moves away or the visitor scrolls down on a small screen.
  control.addEventListener('mouseenter', () => selectMethodStep(control.dataset.step));
  control.addEventListener('focus', () => selectMethodStep(control.dataset.step));
  control.addEventListener('click', () => {
    control.focus({ preventScroll: true });
    selectMethodStep(control.dataset.step);
  });
});
tabs.forEach((tab, index) => {
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); }
  });
});

const copyButton = document.getElementById('copy-citation');
const status = document.getElementById('copy-status');
let resetCopy;
copyButton.addEventListener('click', async () => {
  try {
    const text = document.getElementById('citation').textContent;
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      copyButton.focus();
      if (!copied) throw new Error('Clipboard unavailable');
    }
    copyButton.querySelector('span').textContent = 'Copied';
    status.textContent = 'BibTeX copied to clipboard.';
    clearTimeout(resetCopy);
    resetCopy = setTimeout(() => { copyButton.querySelector('span').textContent = 'Copy'; status.textContent = ''; }, 4000);
  } catch {
    status.textContent = 'Select the citation text to copy it manually.';
  }
});

const dropdown = document.getElementById('research-dropdown');
document.addEventListener('click', event => { if (!dropdown.contains(event.target)) dropdown.open = false; });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && dropdown.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); } });

if ('IntersectionObserver' in window) {
  const sectionLinks = [...document.querySelectorAll('.section-nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) sectionLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]:not(#video)').forEach(section => observer.observe(section));
}

// Load and play only demos in view. Reduced motion keeps the still frames.
if ('IntersectionObserver' in window) {
  const demos = document.querySelectorAll('video.demo-animation');
  for (const video of demos) {
    video.addEventListener('playing', () => video.classList.add('is-playing'));
    video.addEventListener('error', () => video.classList.remove('is-playing'));
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const demoObserver = new IntersectionObserver(entries => {
    for (const { target: video, isIntersecting } of entries) {
      if (isIntersecting && !reducedMotion.matches) {
        if (!video.hasAttribute('src')) video.src = video.dataset.src;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  });

  const updateDemos = () => {
    demoObserver.disconnect();
    for (const video of demos) {
      if (reducedMotion.matches) {
        video.pause();
        video.classList.remove('is-playing');
      } else {
        demoObserver.observe(video);
      }
    }
  };

  updateDemos();
  reducedMotion.addEventListener('change', updateDemos);
}

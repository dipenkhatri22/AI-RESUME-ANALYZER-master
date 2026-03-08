// ─── TOAST SYSTEM ───
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'}`;
  
  const icons = { info: '💬', success: '✅', error: '❌' };
  toast.innerHTML = `<span style="margin-right:8px;">${icons[type] || '💬'}</span>${msg}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── DRAG AND DROP ───
document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('drop-zone');
  if (!dropZone) return;

  ['dragenter', 'dragover'].forEach(e => {
    dropZone.addEventListener(e, (ev) => {
      ev.preventDefault();
      dropZone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(e => {
    dropZone.addEventListener(e, (ev) => {
      ev.preventDefault();
      dropZone.classList.remove('drag-over');
    });
  });

  dropZone.addEventListener('drop', (ev) => {
    const files = ev.dataTransfer.files;
    if (files.length > 0) {
      const fileInput = document.getElementById('file-upload');
      if (fileInput) {
        const dt = new DataTransfer();
        dt.items.add(files[0]);
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    }
  });
});

// ─── ANIMATED COUNTERS ───
function animateCounter(el, target, duration = 1500) {
  const start = parseInt(el.innerText) || 0;
  const diff = target - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.innerText = Math.round(start + diff * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ─── SCORE RING ANIMATION ───
function animateScoreRing(score, color) {
  const ring = document.getElementById('score-ring-fill');
  if (!ring) return;
  const circumference = 2 * Math.PI * 52;
  ring.style.strokeDasharray = circumference;
  ring.style.stroke = color;
  ring.style.strokeDashoffset = circumference;
  
  setTimeout(() => {
    ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
    ring.style.strokeDashoffset = circumference - (score / 100) * circumference;
  }, 100);
}
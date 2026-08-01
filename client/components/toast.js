// Reusable toast notification component (success / error / info).
function ensureToastContainer() {
  let container = document.querySelector('.cf-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'cf-toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = 'success') {
  const iconMap = {
    success: 'bi-check-circle-fill text-success',
    error: 'bi-exclamation-triangle-fill text-danger',
    info: 'bi-info-circle-fill text-primary',
  };

  const container = ensureToastContainer();

  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center border-0 shadow mb-2';
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi ${iconMap[type] || iconMap.info} me-2" aria-hidden="true"></i>${message}
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar notificación"></button>
    </div>
  `;

  container.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 4500 });
  toast.show();
  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

window.showToast = showToast;

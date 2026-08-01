// Reusable confirmation dialog component built on top of a Bootstrap modal.
function ensureConfirmModal() {
  let modalEl = document.getElementById('cfConfirmModal');
  if (modalEl) return modalEl;

  modalEl = document.createElement('div');
  modalEl.id = 'cfConfirmModal';
  modalEl.className = 'modal fade';
  modalEl.tabIndex = -1;
  modalEl.setAttribute('aria-hidden', 'true');
  modalEl.setAttribute('aria-labelledby', 'cfConfirmModalLabel');
  modalEl.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title h5" id="cfConfirmModalLabel">Confirmar acción</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body" id="cfConfirmModalBody">¿Estás seguro de realizar esta acción?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-cf-primary" id="cfConfirmModalAccept">Confirmar</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);
  return modalEl;
}

// Shows a confirmation dialog and resolves true/false based on the user's choice.
function confirmDialog(message, title = 'Confirmar acción') {
  return new Promise((resolve) => {
    const modalEl = ensureConfirmModal();
    modalEl.querySelector('#cfConfirmModalLabel').textContent = title;
    modalEl.querySelector('#cfConfirmModalBody').textContent = message;

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    const acceptBtn = modalEl.querySelector('#cfConfirmModalAccept');

    const onAccept = () => {
      cleanup();
      modal.hide();
      resolve(true);
    };
    const onHide = () => {
      cleanup();
      resolve(false);
    };
    function cleanup() {
      acceptBtn.removeEventListener('click', onAccept);
      modalEl.removeEventListener('hidden.bs.modal', onHide);
    }

    acceptBtn.addEventListener('click', onAccept);
    modalEl.addEventListener('hidden.bs.modal', onHide, { once: true });
    modal.show();
  });
}

window.confirmDialog = confirmDialog;

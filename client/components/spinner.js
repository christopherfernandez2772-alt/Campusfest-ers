// Reusable loading spinner markup, used while fetching data from the API.
function renderSpinner(message = 'Cargando información...') {
  return `
    <div class="cf-spinner-wrap" role="status" aria-live="polite">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" aria-hidden="true"></div>
      <p class="mb-0">${message}</p>
    </div>
  `;
}

// Reusable empty-state markup for lists without results.
function renderEmptyState(message = 'No se encontraron resultados.', icon = 'bi-inbox') {
  return `
    <div class="cf-empty-state">
      <i class="bi ${icon}" aria-hidden="true"></i>
      <p class="mb-0">${message}</p>
    </div>
  `;
}

// Reusable error-state markup for failed API requests.
function renderErrorState(message = 'Ocurrió un error al cargar la información.') {
  return `
    <div class="cf-empty-state">
      <i class="bi bi-exclamation-triangle" aria-hidden="true"></i>
      <p class="mb-0">${message}</p>
    </div>
  `;
}

window.renderSpinner = renderSpinner;
window.renderEmptyState = renderEmptyState;
window.renderErrorState = renderErrorState;

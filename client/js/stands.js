// Loads and renders the list of festival stands.
async function loadStands() {
  const container = document.getElementById('stands-list');
  container.innerHTML = window.renderSpinner('Cargando stands...');

  try {
    const { data } = await window.CampusFestAPI.stands.list();

    if (data.length === 0) {
      container.innerHTML = window.renderEmptyState('No hay stands registrados todavía.', 'bi-shop');
      return;
    }

    container.innerHTML = data.map(window.CampusFestCards.renderStandCard).join('');
  } catch (error) {
    container.innerHTML = window.renderErrorState('No pudimos cargar los stands del festival.');
  }
}

document.addEventListener('DOMContentLoaded', loadStands);

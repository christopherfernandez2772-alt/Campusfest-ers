// Loads and renders the activities list, with optional category filtering.
async function loadActivities(category = '') {
  const container = document.getElementById('activities-list');
  container.innerHTML = window.renderSpinner('Cargando actividades...');

  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const { data } = await window.CampusFestAPI.activities.list(query);

    if (data.length === 0) {
      container.innerHTML = window.renderEmptyState('No hay actividades disponibles para esta categoría.', 'bi-calendar-x');
      return;
    }

    container.innerHTML = data.map(window.CampusFestCards.renderActivityCard).join('');
  } catch (error) {
    container.innerHTML = window.renderErrorState('No pudimos cargar las actividades. Intenta más tarde.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadActivities();

  const categoryFilter = document.getElementById('category-filter');
  categoryFilter.addEventListener('change', (event) => {
    loadActivities(event.target.value);
  });
});

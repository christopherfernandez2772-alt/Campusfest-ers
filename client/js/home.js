// Loads and renders the three featured activities on the home page.
async function loadFeaturedActivities() {
  const container = document.getElementById('featured-activities');
  if (!container) return;

  container.innerHTML = window.renderSpinner('Cargando actividades destacadas...');

  try {
    const { data } = await window.CampusFestAPI.activities.list('?featured=true');
    const featured = data.slice(0, 3);

    if (featured.length === 0) {
      container.innerHTML = window.renderEmptyState('Aún no hay actividades destacadas.', 'bi-calendar-x');
      return;
    }

    container.innerHTML = featured.map(window.CampusFestCards.renderActivityCard).join('');
  } catch (error) {
    container.innerHTML = window.renderErrorState('No pudimos cargar las actividades destacadas. Intenta más tarde.');
  }
}

document.addEventListener('DOMContentLoaded', loadFeaturedActivities);

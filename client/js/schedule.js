// Loads and renders the full festival schedule, ordered by date and time.
async function loadSchedule() {
  const tbody = document.getElementById('schedule-table-body');
  const emptyState = document.getElementById('schedule-empty-state');

  tbody.innerHTML = `<tr><td colspan="6">${window.renderSpinner('Cargando horario...')}</td></tr>`;

  try {
    const { data } = await window.CampusFestAPI.activities.list();

    if (data.length === 0) {
      tbody.innerHTML = '';
      emptyState.innerHTML = window.renderEmptyState('No hay actividades programadas todavía.', 'bi-calendar-x');
      return;
    }

    const { categoryBadge, statusBadge, formatDate } = window.CampusFestCards;

    tbody.innerHTML = data
      .map(
        (activity) => `
          <tr>
            <td>${activity.name}</td>
            <td>${formatDate(activity.date)}</td>
            <td>${activity.time}</td>
            <td>${activity.location}</td>
            <td>${categoryBadge(activity.category)}</td>
            <td>${statusBadge(activity.status)}</td>
          </tr>
        `
      )
      .join('');
  } catch (error) {
    tbody.innerHTML = '';
    emptyState.innerHTML = window.renderErrorState('No pudimos cargar el horario del festival.');
  }
}

document.addEventListener('DOMContentLoaded', loadSchedule);

// Loads and renders the details of a single activity based on the "id" query param.
async function loadActivityDetail() {
  const container = document.getElementById('activity-detail-container');
  const params = new URLSearchParams(window.location.search);
  const activityId = params.get('id');

  if (!activityId) {
    container.innerHTML = window.renderErrorState('No se especificó ninguna actividad para mostrar.');
    return;
  }

  container.innerHTML = window.renderSpinner('Cargando detalle de la actividad...');

  try {
    const { data: activity } = await window.CampusFestAPI.activities.get(activityId);
    const { categoryBadge, statusBadge, formatDate } = window.CampusFestCards;

    const canRegister = activity.status === 'Disponible' && activity.availableSpots > 0;

    container.innerHTML = `
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/pages/activities.html">Actividades</a></li>
          <li class="breadcrumb-item active" aria-current="page">${activity.name}</li>
        </ol>
      </nav>
      <div class="card cf-card">
        <div class="card-body p-4">
          <div class="d-flex gap-2 mb-3">${categoryBadge(activity.category)}${statusBadge(activity.status)}</div>
          <h1 class="h3">${activity.name}</h1>
          <p class="lead">${activity.description}</p>
          <div class="row g-3 my-3">
            <div class="col-sm-6 col-md-4"><i class="bi bi-calendar-event me-2" aria-hidden="true"></i><strong>Fecha:</strong> ${formatDate(activity.date)}</div>
            <div class="col-sm-6 col-md-4"><i class="bi bi-clock me-2" aria-hidden="true"></i><strong>Hora:</strong> ${activity.time}</div>
            <div class="col-sm-6 col-md-4"><i class="bi bi-geo-alt me-2" aria-hidden="true"></i><strong>Lugar:</strong> ${activity.location}</div>
            <div class="col-sm-6 col-md-4"><i class="bi bi-people me-2" aria-hidden="true"></i><strong>Cupo máximo:</strong> ${activity.capacity}</div>
            <div class="col-sm-6 col-md-4"><i class="bi bi-person-check me-2" aria-hidden="true"></i><strong>Cupos disponibles:</strong> ${activity.availableSpots}</div>
          </div>
          <p><strong>Requisitos:</strong> ${activity.requirements}</p>
          ${
            canRegister
              ? `<a href="/pages/registration.html?activity=${activity._id}" class="btn btn-cf-primary btn-lg btn-lg-mobile">Inscribirse</a>`
              : activity.status === 'Lleno'
                ? `<a href="/pages/registration.html?activity=${activity._id}" class="btn btn-waitlist btn-lg btn-lg-mobile">Unirse a lista de espera</a>`
                : `<button class="btn btn-secondary btn-lg btn-lg-mobile" disabled>Inscripciones cerradas</button>`
          }
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = window.renderErrorState('No pudimos encontrar la actividad solicitada.');
  }
}

document.addEventListener('DOMContentLoaded', loadActivityDetail);

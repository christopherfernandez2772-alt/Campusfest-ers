// Shared helpers and reusable card renderers for activities and stands.
const CATEGORY_BADGE_CLASS = {
  Cultural: 'cf-badge-cultural',
  Deportivo: 'cf-badge-deportivo',
  'Tecnológico': 'cf-badge-tecnologico',
  'Artístico': 'cf-badge-artistico',
  'Gastronómico': 'cf-badge-gastronomico',
  Recreativo: 'cf-badge-recreativo',
};

const STATUS_BADGE_CLASS = {
  Disponible: 'cf-status-disponible',
  Lleno: 'cf-status-lleno',
  Cancelado: 'cf-status-cancelado',
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function categoryBadge(category) {
  const cssClass = CATEGORY_BADGE_CLASS[category] || 'bg-secondary';
  return `<span class="badge ${cssClass}">${category}</span>`;
}

function statusBadge(status) {
  const cssClass = STATUS_BADGE_CLASS[status] || 'bg-secondary';
  return `<span class="badge ${cssClass}">${status}</span>`;
}

function renderActivityCard(activity) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card cf-card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            ${categoryBadge(activity.category)}
            ${statusBadge(activity.status)}
          </div>
          <h3 class="h5 card-title">${activity.name}</h3>
          <ul class="list-unstyled small text-body-secondary mb-3">
            <li><i class="bi bi-calendar-event me-2" aria-hidden="true"></i>${formatDate(activity.date)}</li>
            <li><i class="bi bi-clock me-2" aria-hidden="true"></i>${activity.time}</li>
            <li><i class="bi bi-geo-alt me-2" aria-hidden="true"></i>${activity.location}</li>
            <li><i class="bi bi-people me-2" aria-hidden="true"></i>${activity.availableSpots} cupos disponibles</li>
          </ul>
          <div class="d-flex gap-2 mt-3">
            <a href="/pages/activity-detail.html?id=${activity._id}" class="btn btn-cf-primary">
              Ver detalle
            </a>
            ${activity.status === 'Lleno' ? `<a href="/pages/registration.html?activity=${activity._id}" class="btn btn-waitlist">Unirse a lista de espera</a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStandCard(stand) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card cf-card">
        <div class="card-body">
          <div class="mb-2">${categoryBadge(stand.category)}</div>
          <h3 class="h5 card-title">${stand.name}</h3>
          <p class="card-text">${stand.description}</p>
          <ul class="list-unstyled small text-body-secondary">
            <li><i class="bi bi-person-badge me-2" aria-hidden="true"></i>${stand.responsible}</li>
            <li><i class="bi bi-geo-alt me-2" aria-hidden="true"></i>${stand.location}</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

window.CampusFestCards = {
  renderActivityCard,
  renderStandCard,
  categoryBadge,
  statusBadge,
  formatDate,
};

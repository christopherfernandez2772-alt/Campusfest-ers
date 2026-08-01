// Guards the admin dashboard, and manages CRUD for activities and stands
// plus a read-only view of registrations, all through the protected API.
const adminApi = window.CampusFestAPI;

document.addEventListener('DOMContentLoaded', () => {
  if (!adminApi.admin.isLoggedIn()) {
    window.location.href = '/pages/admin-login.html';
    return;
  }

  document.getElementById('admin-logout-btn').addEventListener('click', () => {
    adminApi.admin.clearKey();
    window.location.href = '/pages/admin-login.html';
  });

  loadActivitiesTable();
  loadStandsTable();
  loadRegistrationsTable();
  setupActivityForm();
  setupStandForm();
});

function handleAuthError(error) {
  if (error.message.includes('No autorizado')) {
    adminApi.admin.clearKey();
    window.showToast('Tu sesión expiró. Inicia sesión nuevamente.', 'error');
    window.location.href = '/pages/admin-login.html';
    return true;
  }
  return false;
}

// ---------- Activities ----------
async function loadActivitiesTable() {
  const tbody = document.getElementById('admin-activities-table-body');
  tbody.innerHTML = `<tr><td colspan="6">${window.renderSpinner('Cargando actividades...')}</td></tr>`;

  try {
    const { data } = await adminApi.activities.list();
    const { categoryBadge, statusBadge, formatDate } = window.CampusFestCards;

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">${window.renderEmptyState('No hay actividades registradas.', 'bi-calendar-x')}</td></tr>`;
      return;
    }

    tbody.innerHTML = data
      .map(
        (activity) => `
          <tr>
            <td>${activity.name}</td>
            <td>${categoryBadge(activity.category)}</td>
            <td>${formatDate(activity.date)}</td>
            <td>${activity.availableSpots}/${activity.capacity}</td>
            <td>${statusBadge(activity.status)}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary me-1" data-edit-activity="${activity._id}">
                <i class="bi bi-pencil" aria-hidden="true"></i><span class="visually-hidden">Editar</span>
              </button>
              <button class="btn btn-sm btn-outline-danger" data-delete-activity="${activity._id}">
                <i class="bi bi-trash" aria-hidden="true"></i><span class="visually-hidden">Eliminar</span>
              </button>
            </td>
          </tr>
        `
      )
      .join('');

    tbody.querySelectorAll('[data-edit-activity]').forEach((btn) =>
      btn.addEventListener('click', () => openActivityModal(btn.dataset.editActivity, data))
    );
    tbody.querySelectorAll('[data-delete-activity]').forEach((btn) =>
      btn.addEventListener('click', () => deleteActivity(btn.dataset.deleteActivity))
    );
  } catch (error) {
    if (handleAuthError(error)) return;
    tbody.innerHTML = `<tr><td colspan="6">${window.renderErrorState('No pudimos cargar las actividades.')}</td></tr>`;
  }
}

function setupActivityForm() {
  const modalEl = document.getElementById('activityModal');
  const modal = new bootstrap.Modal(modalEl);
  const form = document.getElementById('activity-form');

  document.getElementById('new-activity-btn').addEventListener('click', () => {
    form.reset();
    form.activityId.value = '';
    document.getElementById('activityModalLabel').textContent = 'Nueva actividad';
    form.querySelectorAll('.is-invalid, .is-valid').forEach((el) => el.classList.remove('is-invalid', 'is-valid'));
    modal.show();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const requiredFields = [
      [form.name, 'Nombre'],
      [form.category, 'Categoría'],
      [form.description, 'Descripción'],
      [form.date, 'Fecha'],
      [form.time, 'Hora'],
      [form.location, 'Lugar'],
      [form.capacity, 'Cupo máximo'],
    ];

    let isValid = true;
    requiredFields.forEach(([field, label]) => {
      const message = window.Validators.required(field.value, label);
      window.setFieldError(field, message);
      if (message) isValid = false;
    });
    if (!isValid) {
      window.showToast('Revisa los campos marcados en rojo.', 'error');
      return;
    }

    const payload = {
      name: form.name.value.trim(),
      description: form.description.value.trim(),
      category: form.category.value,
      date: form.date.value,
      time: form.time.value,
      location: form.location.value.trim(),
      capacity: Number(form.capacity.value),
      requirements: form.requirements.value.trim() || undefined,
      status: form.status.value,
      featured: form.featured.checked,
    };

    const submitBtn = document.getElementById('activity-form-submit');
    submitBtn.disabled = true;

    try {
      if (form.activityId.value) {
        await adminApi.activities.update(form.activityId.value, payload);
        window.showToast('Actividad actualizada correctamente.', 'success');
      } else {
        await adminApi.activities.create(payload);
        window.showToast('Actividad creada correctamente.', 'success');
      }
      modal.hide();
      loadActivitiesTable();
    } catch (error) {
      if (!handleAuthError(error)) window.showToast(error.message, 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function openActivityModal(id, activities) {
  const activity = activities.find((a) => a._id === id);
  if (!activity) return;

  const form = document.getElementById('activity-form');
  form.reset();
  form.querySelectorAll('.is-invalid, .is-valid').forEach((el) => el.classList.remove('is-invalid', 'is-valid'));
  form.activityId.value = activity._id;
  form.name.value = activity.name;
  form.category.value = activity.category;
  form.description.value = activity.description;
  form.date.value = new Date(activity.date).toISOString().slice(0, 10);
  form.time.value = activity.time;
  form.location.value = activity.location;
  form.capacity.value = activity.capacity;
  form.requirements.value = activity.requirements || '';
  form.status.value = activity.status;
  form.featured.checked = activity.featured;

  document.getElementById('activityModalLabel').textContent = 'Editar actividad';
  bootstrap.Modal.getOrCreateInstance(document.getElementById('activityModal')).show();
}

async function deleteActivity(id) {
  const confirmed = await window.confirmDialog('¿Seguro que deseas eliminar esta actividad? Esta acción no se puede deshacer.', 'Eliminar actividad');
  if (!confirmed) return;

  try {
    await adminApi.activities.remove(id);
    window.showToast('Actividad eliminada correctamente.', 'success');
    loadActivitiesTable();
  } catch (error) {
    if (!handleAuthError(error)) window.showToast(error.message, 'error');
  }
}

// ---------- Stands ----------
async function loadStandsTable() {
  const tbody = document.getElementById('admin-stands-table-body');
  tbody.innerHTML = `<tr><td colspan="5">${window.renderSpinner('Cargando stands...')}</td></tr>`;

  try {
    const { data } = await adminApi.stands.list();
    const { categoryBadge } = window.CampusFestCards;

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">${window.renderEmptyState('No hay stands registrados.', 'bi-shop')}</td></tr>`;
      return;
    }

    tbody.innerHTML = data
      .map(
        (stand) => `
          <tr>
            <td>${stand.name}</td>
            <td>${categoryBadge(stand.category)}</td>
            <td>${stand.responsible}</td>
            <td>${stand.location}</td>
            <td>
              <button class="btn btn-sm btn-outline-danger" data-delete-stand="${stand._id}">
                <i class="bi bi-trash" aria-hidden="true"></i><span class="visually-hidden">Eliminar</span>
              </button>
            </td>
          </tr>
        `
      )
      .join('');

    tbody.querySelectorAll('[data-delete-stand]').forEach((btn) =>
      btn.addEventListener('click', () => deleteStand(btn.dataset.deleteStand))
    );
  } catch (error) {
    if (handleAuthError(error)) return;
    tbody.innerHTML = `<tr><td colspan="5">${window.renderErrorState('No pudimos cargar los stands.')}</td></tr>`;
  }
}

function setupStandForm() {
  const modalEl = document.getElementById('standModal');
  const modal = new bootstrap.Modal(modalEl);
  const form = document.getElementById('stand-form');

  document.getElementById('new-stand-btn').addEventListener('click', () => {
    form.reset();
    form.querySelectorAll('.is-invalid, .is-valid').forEach((el) => el.classList.remove('is-invalid', 'is-valid'));
    modal.show();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const requiredFields = [
      [form.name, 'Nombre'],
      [form.category, 'Categoría'],
      [form.responsible, 'Responsable'],
      [form.location, 'Ubicación'],
      [form.description, 'Descripción'],
    ];

    let isValid = true;
    requiredFields.forEach(([field, label]) => {
      const message = window.Validators.required(field.value, label);
      window.setFieldError(field, message);
      if (message) isValid = false;
    });
    if (!isValid) {
      window.showToast('Revisa los campos marcados en rojo.', 'error');
      return;
    }

    const payload = {
      name: form.name.value.trim(),
      category: form.category.value,
      responsible: form.responsible.value.trim(),
      location: form.location.value.trim(),
      description: form.description.value.trim(),
    };

    const submitBtn = document.getElementById('stand-form-submit');
    submitBtn.disabled = true;

    try {
      await adminApi.stands.create(payload);
      window.showToast('Stand creado correctamente.', 'success');
      modal.hide();
      loadStandsTable();
    } catch (error) {
      if (!handleAuthError(error)) window.showToast(error.message, 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

async function deleteStand(id) {
  const confirmed = await window.confirmDialog('¿Seguro que deseas eliminar este stand?', 'Eliminar stand');
  if (!confirmed) return;

  try {
    await adminApi.stands.remove(id);
    window.showToast('Stand eliminado correctamente.', 'success');
    loadStandsTable();
  } catch (error) {
    if (!handleAuthError(error)) window.showToast(error.message, 'error');
  }
}

// ---------- Registrations (read-only + delete) ----------
async function loadRegistrationsTable() {
  const tbody = document.getElementById('admin-registrations-table-body');
  tbody.innerHTML = `<tr><td colspan="4">${window.renderSpinner('Cargando inscripciones...')}</td></tr>`;

  try {
    const { data } = await adminApi.registrations.list();

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4">${window.renderEmptyState('No hay inscripciones todavía.', 'bi-person-x')}</td></tr>`;
      return;
    }

    tbody.innerHTML = data
      .map(
        (registration) => `
          <tr>
            <td>${registration.participant?.fullName || 'N/D'}</td>
            <td>${registration.activity?.name || 'N/D'}</td>
            <td>${new Date(registration.registrationDate).toLocaleString('es-CO')}</td>
            <td>
              <button class="btn btn-sm btn-outline-danger" data-delete-registration="${registration._id}">
                <i class="bi bi-trash" aria-hidden="true"></i><span class="visually-hidden">Eliminar</span>
              </button>
            </td>
          </tr>
        `
      )
      .join('');

    tbody.querySelectorAll('[data-delete-registration]').forEach((btn) =>
      btn.addEventListener('click', () => deleteRegistration(btn.dataset.deleteRegistration))
    );
  } catch (error) {
    if (handleAuthError(error)) return;
    tbody.innerHTML = `<tr><td colspan="4">${window.renderErrorState('No pudimos cargar las inscripciones.')}</td></tr>`;
  }
}

async function deleteRegistration(id) {
  const confirmed = await window.confirmDialog('¿Seguro que deseas eliminar esta inscripción? El cupo se liberará.', 'Eliminar inscripción');
  if (!confirmed) return;

  try {
    await adminApi.registrations.remove(id);
    window.showToast('Inscripción eliminada correctamente.', 'success');
    loadRegistrationsTable();
    loadActivitiesTable();
  } catch (error) {
    if (!handleAuthError(error)) window.showToast(error.message, 'error');
  }
}

// Populates the activity select and handles client/server validation for the registration form.
async function populateActivitySelect() {
  const select = document.getElementById('activity');
  const params = new URLSearchParams(window.location.search);
  const preselectedId = params.get('activity');

  try {
    const { data } = await window.CampusFestAPI.activities.list();
    const available = data.filter((activity) => activity.status !== 'Cancelado');

    available.forEach((activity) => {
      const option = document.createElement('option');
      option.value = activity._id;
      // If activity is full, still allow selection so user can join waitlist from registration page
      option.textContent = `${activity.name} (${activity.availableSpots} cupos disponibles)`;
      if (activity.availableSpots <= 0) {
        option.textContent += ' - Sin cupo (puedes unirte a la lista de espera)';
        option.dataset.full = 'true';
      }
      if (activity._id === preselectedId) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  } catch (error) {
    window.showToast('No pudimos cargar la lista de actividades disponibles.', 'error');
  }
}

function validateForm(form) {
  let isValid = true;

  const fullName = form.fullName;
  const identification = form.identification;
  const email = form.email;
  const phone = form.phone;
  const career = form.career;
  const activity = form.activity;

  const requiredFields = [
    [fullName, 'Nombre completo'],
    [identification, 'Identificación'],
    [career, 'Carrera o grupo'],
  ];

  requiredFields.forEach(([field, label]) => {
    const message = window.Validators.required(field.value, label);
    window.setFieldError(field, message);
    if (message) isValid = false;
  });

  const emailRequired = window.Validators.required(email.value, 'Correo electrónico');
  const emailMessage = emailRequired || window.Validators.email(email.value);
  window.setFieldError(email, emailMessage);
  if (emailMessage) isValid = false;

  const phoneRequired = window.Validators.required(phone.value, 'Teléfono');
  const phoneMessage = phoneRequired || window.Validators.phone(phone.value);
  window.setFieldError(phone, phoneMessage);
  if (phoneMessage) isValid = false;

  const activityMessage = window.Validators.required(activity.value, 'Actividad seleccionada');
  window.setFieldError(activity, activityMessage);
  if (activityMessage) isValid = false;

  return isValid;
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!validateForm(form)) {
    window.showToast('Revisa los campos marcados en rojo antes de continuar.', 'error');
    return;
  }

  const submitBtn = document.getElementById('registration-submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Enviando...';

  const payload = {
    fullName: form.fullName.value.trim(),
    identification: form.identification.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    career: form.career.value.trim(),
    activity: form.activity.value,
    comments: form.comments.value.trim(),
  };

  try {
    await window.CampusFestAPI.registrations.create(payload);
    window.showToast('¡Inscripción realizada con éxito! Te esperamos en el festival.', 'success');
    form.reset();
    form.querySelectorAll('.is-valid').forEach((el) => el.classList.remove('is-valid'));
  } catch (error) {
    // If no spots are available, offer to join the waitlist
    if (error.message && error.message.includes('No hay cupos')) {
      const join = await window.confirmDialog('No hay cupos disponibles para la actividad seleccionada. ¿Deseas unirte a la lista de espera?', 'Unirse a lista de espera');
      if (join) {
        try {
          await window.CampusFestAPI.registrations.waitlist(payload);
          window.showToast('Te hemos añadido a la lista de espera. Te notificaremos si hay cupos disponibles.', 'success');
          form.reset();
        } catch (wlError) {
          window.showToast(wlError.message || 'No se pudo añadir a la lista de espera.', 'error');
        }
      }
    } else {
      window.showToast(error.message, 'error');
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar inscripción';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateActivitySelect();
  document.getElementById('registration-form').addEventListener('submit', handleSubmit);
});

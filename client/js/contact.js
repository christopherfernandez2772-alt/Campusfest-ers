// Handles client-side validation and submission feedback for the contact form.
function validateContactForm(form) {
  let isValid = true;

  const nameMessage = window.Validators.required(form.contactName.value, 'Nombre completo');
  window.setFieldError(form.contactName, nameMessage);
  if (nameMessage) isValid = false;

  const emailRequired = window.Validators.required(form.contactEmail.value, 'Correo electrónico');
  const emailMessage = emailRequired || window.Validators.email(form.contactEmail.value);
  window.setFieldError(form.contactEmail, emailMessage);
  if (emailMessage) isValid = false;

  const messageMessage = window.Validators.required(form.contactMessage.value, 'Mensaje');
  window.setFieldError(form.contactMessage, messageMessage);
  if (messageMessage) isValid = false;

  return isValid;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateContactForm(form)) {
      window.showToast('Revisa los campos marcados en rojo antes de continuar.', 'error');
      return;
    }

    window.showToast('¡Gracias por escribirnos! Te responderemos muy pronto.', 'success');
    form.reset();
    form.querySelectorAll('.is-valid').forEach((el) => el.classList.remove('is-valid'));
  });
});

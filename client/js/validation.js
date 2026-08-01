// Reusable client-side validation helpers with Spanish error messages.
const Validators = {
  required(value, fieldLabel) {
    return value && value.toString().trim().length > 0 ? '' : `El campo "${fieldLabel}" es obligatorio.`;
  },
  email(value) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) ? '' : 'Ingresa un correo electrónico válido.';
  },
  phone(value) {
    const pattern = /^[0-9+\s-]{7,20}$/;
    return pattern.test(value) ? '' : 'Ingresa un número de teléfono válido.';
  },
};

// Applies Bootstrap invalid-feedback styling to a field and shows the message.
function setFieldError(input, message) {
  const feedback = input.parentElement.querySelector('.invalid-feedback');
  if (message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    if (feedback) feedback.textContent = message;
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    if (feedback) feedback.textContent = '';
  }
}

window.Validators = Validators;
window.setFieldError = setFieldError;

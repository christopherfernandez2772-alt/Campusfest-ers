// Handles the admin login form: validates the password against the API and,
// on success, stores it locally so subsequent admin requests are authorized.
document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, skip the login screen entirely.
  if (window.CampusFestAPI.admin.isLoggedIn()) {
    window.location.href = '/pages/admin.html';
    return;
  }

  const form = document.getElementById('admin-login-form');
  const submitBtn = document.getElementById('admin-login-btn');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const passwordInput = form.adminPassword;
    const message = window.Validators.required(passwordInput.value, 'Contraseña');
    window.setFieldError(passwordInput, message);
    if (message) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Verificando...';

    try {
      await window.CampusFestAPI.admin.login(passwordInput.value);
      window.CampusFestAPI.admin.saveKey(passwordInput.value);
      window.showToast('Bienvenido, administrador.', 'success');
      window.location.href = '/pages/admin.html';
    } catch (error) {
      window.showToast(error.message, 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Ingresar';
    }
  });
});

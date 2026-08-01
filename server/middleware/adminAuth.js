const ApiError = require('../utils/ApiError');

// Simple shared-secret gate for admin-only endpoints. The client sends the
// configured password back on every request via the "x-admin-key" header.
// This intentionally stays simple (no sessions/JWT) but isolates the check
// in one place so it can be swapped for real authentication later without
// touching the routes/controllers that use it.
function adminAuth(req, res, next) {
  const providedKey = req.header('x-admin-key');
  const expectedKey = process.env.ADMIN_PASSWORD;

  if (!expectedKey) {
    return next(new ApiError(500, 'ADMIN_PASSWORD no está configurado en el servidor'));
  }

  if (!providedKey || providedKey !== expectedKey) {
    return next(new ApiError(401, 'No autorizado. Inicia sesión como administrador.'));
  }

  return next();
}

module.exports = adminAuth;

const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// Validates the admin password sent from the login form. On success it just
// echoes back "ok"; the client keeps reusing the same password as the
// "x-admin-key" header on subsequent admin requests (see middleware/adminAuth.js).
const login = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const expectedKey = process.env.ADMIN_PASSWORD;

  if (!expectedKey) {
    throw new ApiError(500, 'ADMIN_PASSWORD no está configurado en el servidor');
  }

  if (!password || password !== expectedKey) {
    throw new ApiError(401, 'Contraseña de administrador incorrecta');
  }

  res.status(200).json({ success: true, message: 'Autenticación exitosa' });
});

module.exports = { login };

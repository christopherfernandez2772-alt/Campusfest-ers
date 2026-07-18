```markdown
# Seguridad y manejo de errores – CampusFest

## Validación
- Validación de campos en backend.
- Sanitización de entradas.
- Verificación de tipos de datos.

## Autenticación y autorización
- Login de administrador.
- Rutas protegidas con middleware.
- Roles: admin, editor.

## Manejo de errores
Middleware centralizado:
```json
{ "success": false, "message": "Error interno del servidor" }

Códigos HTTP
200, 201, 400, 401, 403, 404, 500.

Protección de datos
-No exponer contraseñas.

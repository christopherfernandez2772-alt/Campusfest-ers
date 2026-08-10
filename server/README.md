# CampusFest - Server

Servidor Express del proyecto CampusFest.

Requisitos
- Node.js 18+ (o LTS actual)
- MongoDB Atlas (ver .env.example)

Instalación

1. Copiar .env.example a .env y completar MONGODB_URI y ADMIN_PASSWORD

2. Instalar dependencias:

```bash
npm install
```

Scripts útiles

- npm start     # Inicia en modo producción
- npm run dev   # Inicia con nodemon (desarrollo)
- npm run seed  # Inserta datos de prueba (si existe)

Variables de entorno (.env)

PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.qg5uz9q.mongodb.net/campusfest?appName=Cluster0
CLIENT_ORIGIN=http://localhost:5000
ADMIN_PASSWORD=change-me-please

Notas de seguridad
- Nunca validar la contraseña de administrador en cliente; usar ADMIN_PASSWORD en el servidor.
- El servidor aplica sanitización básica a entradas (server/middleware/sanitize.js) y validación vía Mongoose en modelos.
- Para producción, proteger MONGODB_URI y usar credenciales con permisos mínimos.

Endpoints principales (resumen)
- /api/actividades
- /api/participantes
- /api/inscripciones
- /api/inscripciones/lista-espera
- /api/inscripciones/actividad/:idActividad

Comportamiento automático de lista de espera
- Cuando se elimina una inscripción confirmada, el sistema promueve automáticamente la primera inscripción en estado "waiting" (orden FIFO) a "confirmed" y marca "notified": true.
- Actualmente la notificación es local (registro en logs). Se puede integrar envío de correo en el futuro.

- /api/stands
- /api/auth/login


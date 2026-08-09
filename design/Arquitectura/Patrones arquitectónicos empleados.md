# Patrones arquitectónicos empleados — CampusFest

Resumen
Lista y breve explicación de los patrones arquitectónicos, dónde se aplican en el proyecto y por qué se eligieron.

1) MVC (Model-View-Controller)
- Descripción: Separación clara entre modelo, vista y controlador.
- Dónde: server/models, server/controllers, client/pages + components.
- Ventaja: Facilita mantenimiento, pruebas y división de responsabilidades.

2) Layered Architecture (Arquitectura en capas)
- Descripción: Capas Presentation → API → Services → Domain → Persistence.
- Dónde: client/ (presentation), server/app.js & routes (API), server/services (business), server/models (domain), MongoDB (persistence).
- Ventaja: Aisla lógica de negocio, facilita escalado y despliegues.

3) Service Layer
- Descripción: Encapsula reglas de negocio y transacciones compuestas.
- Dónde: server/services/registrationService.js (reglas de inscripción, lista de espera), posible activityService.
- Ventaja: Reutilización, pruebas unitarias y mantener controllers ligeros.

4) Repository / Data Mapper (impl. con Mongoose)
- Descripción: Abstracción de acceso a datos, modelos con validación.
- Dónde: server/models/*.js (Mongoose schemas actúan como repositorios simples).
- Ventaja: Validación centralizada, índices y optimizaciones en un solo lugar.

5) Middleware Pattern
- Descripción: Pipelines de procesamiento para requests (autenticación, sanitización, manejo de errores).
- Dónde: server/middleware (adminAuth.js, sanitize.js, errorHandler.js).
- Ventaja: Composición y separación de preocupaciones transversales.

6) Singleton (conexión DB)
- Descripción: Un único cliente/instancia de conexión a MongoDB compartida.
- Dónde: server/config/db.js (conexión reutilizada en toda la app).
- Ventaja: Evita múltiples conexiones y problemas de recursos.

7) Idempotency / Defensive Changes
- Descripción: Diseñar operaciones para que repetirlas no genere efectos no deseados.
- Dónde: servicios y ediciones (reglas de lista de espera, validaciones, edición mínima).
- Ventaja: Seguridad en reintentos y operaciones de red.

8) Centralized Error Handling
- Descripción: Normalizar respuestas de error y transformación de errores de Mongoose.
- Dónde: server/middleware/errorHandler.js y utils/ApiError.js.
- Ventaja: Mensajes consistentes y control de códigos HTTP.

9) Event / Observer (placeholder)
- Descripción: Patrón para notificaciones/promociones desde lista de espera (implementación ligera por ahora: log + marcar notified).
- Dónde: lógica en registrationController/registrationService; diseñado para integrar email provider luego.
- Ventaja: Desacopla la lógica de negocio del mecanismo de notificación.

10) Security & Configuration patterns
- Uso de .env, .env.example (twelve-factor config), no hardcode de secretos.
- CORS y encabezados para dominios permitidos.

11) Pagination / Indexing (Performance)
- Descripción: Índices en Mongoose (date, category, featured, unique participant+activity).
- Dónde: server/models/Activity.js y Registration.js.
- Ventaja: Consultas rápidas y escalabilidad en colecciones grandes.

12) Progressive Enhancement / Graceful Degradation (Front-end)
- Descripción: Funcionalidad accesible sin JS crítico, pero enriquecida con JS y fetch.
- Dónde: client pages + components.

Notas finales
- El diseñ favorece patrones simples, conocidos y fáciles de mantener en entornos académicos y de despliegue en la nube (MongoDB Atlas).
- Se documentó en README y en carpeta design/Arquitectura para referencia. Para integrar envío de notificaciones se recomienda implementar un bus de eventos ligero (RabbitMQ, Redis pub/sub o incoluso una cola en la DB) y usar un worker desacoplado.


# Diseño de base de datos – CampusFest (MongoDB)

Este documento refleja el diseño actual de las colecciones y esquemas empleados por la aplicación CampusFest. Los ejemplos de esquema usan convenciones en inglés para nombres de campos (coherente con el código fuente). Se incluyen notas de índices, validaciones, hooks y consideraciones operativas (Atlas, env vars y transacciones para promotion/decremento de cupos).

---

## Principios generales
- Base de datos: MongoDB Atlas, accesible mediante MONGODB_URI en el archivo .env.
- Modelos implementados con Mongoose y estructura MVC.
- Nombres de campos en inglés (ej.: activity, registration, participant).
- Operaciones que cambian disponibilidad (reserve/release/promotion) deben realizarse de forma atómica (transacciones o findOneAndUpdate con condiciones) para evitar race conditions.

---

## Collection: activities
Descripción: actividades/ eventos disponibles en CampusFest.

Ejemplo de documento (Mongoose schema fields):

```js
const ActivitySchema = new Schema({
  title: { type: String, required: true },              // localized name handled in UI
  description: { type: String, default: '' },
  category: { type: String, index: true },
  startAt: { type: Date, required: true, index: true },
  endAt: { type: Date },
  location: { type: String },
  capacity: { type: Number, required: true, min: 0 },    // total slots
  availableSpots: { type: Number, required: true, min: 0 }, // mutable
  status: { type: String, enum: ['Open','Full','Cancelled'], default: 'Open' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

// Indexes:
// - index on startAt for queries by date
// - index on category for filtering
```

Notas operativas:
- availableSpots se inicializa igual a capacity (hook pre-validate) y se mantiene en las operaciones de registro/cancelación.
- Para decrementar availableSpots durante confirmación de inscripción usar una operación condicional:
  - findOneAndUpdate({ _id: activityId, availableSpots: { $gt: 0 } }, { $inc: { availableSpots: -1 } })
  - Si la operación tuvo éxito, crear registration con status 'confirmed'. Si no, insertar en waitlist (status 'waiting').
- Cuando availableSpots llega a 0, setear status = 'Full'.

---

## Collection: participants
Descripción: participantes registrados en la plataforma (puede ser normalizado en colección separada o embebido en registration según carga).

```js
const ParticipantSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, lowercase: true, index: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Unique index recomendado en email si se gestiona cuenta por correo
// Participant.index({ email: 1 }, { unique: true });
```

Notas:
- El servicio actual puede usar findOrCreate para participants: busca por email y crea si no existe.
- Mantener datos personales mínimos y normalizar cuando sea útil para evitar duplicados en registros.

---

## Collection: registrations
Descripción: registra la relación participante ↔ activity. Implementa lista de espera y estado.

```js
const RegistrationSchema = new Schema({
  activityId: { type: Schema.Types.ObjectId, ref: 'Activity', required: true, index: true },
  participantId: { type: Schema.Types.ObjectId, ref: 'Participant' },
  // Copia de datos del participante para trazabilidad
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String },
  status: { type: String, enum: ['confirmed','waiting','cancelled'], default: 'confirmed' },
  notified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Índices importantes:
// - Unicidad por participante+actividad para evitar duplicados:
//   Registration.index({ activityId: 1, email: 1 }, { unique: true });
// - Index en activityId + createdAt para promover FIFO desde la waitlist
```

Flujo de negocio (resumen):
- Al intentar registrar:
  1) Verificar existencia de activity.
  2) Intentar decrementar availableSpots atómico (see Activity notes).
  3) Si decremento OK -> crear registration con status 'confirmed'.
  4) Si no hay cupos -> crear registration con status 'waiting' (lista de espera).
- Al cancelar o borrar una registration con status 'confirmed':
  1) Incrementar availableSpots (atomic). Si availableSpots > 0 tras incrementar, buscar la earliest registration con status 'waiting' (orden por createdAt asc) y promoverla a 'confirmed', marcar notified=true y decrementar availableSpots de nuevo.
  2) Estas acciones deben ejecutarse preferiblemente en una transacción (session) para evitar inconsistencias.

---

## Collection: stands
```js
const StandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String }
}, { timestamps: true });
```

---

## Collection: admins
```js
const AdminSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['super','editor','viewer'], default: 'editor' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
```

Seguridad/operaciones:
- Las credenciales y secretos se almacenan en .env (ej: ADMIN_PASSWORD, MONGODB_URI).
- No guardar contraseñas en texto claro; usar bcrypt para passwordHash.

---

## Indexing y rendimiento
- Índices sugeridos:
  - Activity: { startAt: 1 }, { category: 1 }
  - Registration: { activityId: 1, email: 1 } (unique)
  - Registration: { activityId: 1, createdAt: 1 } (promoción FIFO)
  - Participant: { email: 1 } (si se normaliza participantes)
- Considerar los patterns de shard/replica si crece la carga. Atlas permite escalar y configurar índices compuestos según consultas frecuentes.

---

## Consistencia y transacciones
- Para operaciones críticas (confirmación + decremento de cupos, promoción desde waitlist) usar sesiones/transacciones de MongoDB cuando esté disponible (cluster replica set en Atlas). Si no, implementar operaciones atomizadas con findOneAndUpdate condicionales y reintentos.

---

## Migraciones y mantenimiento
- Mantener script de seed/fixtures en server/seed/ para reproducir datos.
- Al cambiar esquemas, versionar migraciones y usar scripts idempotentes que no rompan datos existentes (ej.: llenar availableSpots si está ausente).

---

## Conexión y variables de entorno
- Variable principal: MONGODB_URI (ej: "mongodb+srv://<user>:<password>@cluster0.xxxxxx.mongodb.net/campusfest?retryWrites=true&w=majority")
- Verificar Network Access en Atlas (IP whitelist o acceso 0.0.0.0/0 para pruebas locales) y el nombre de la DB en la URI.

---

## Notas finales
- El diseño actual implementa la lógica de lista de espera FIFO y promotion automática en el backend. Las notificaciones (email/SMS) quedan como trabajo pendiente: se marca el campo `notified` en la registration cuando se promueve a confirmed; un worker o job debe enviar el aviso al participante.
- Mantener documentación sincronizada cuando se hagan cambios en modelos o reglas de negocio.


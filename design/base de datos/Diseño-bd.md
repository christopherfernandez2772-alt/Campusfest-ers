# Diseño de base de datos – CampusFest (MongoDB)

Diseño simplificado de colecciones para la aplicación CampusFest. Base de datos: MongoDB Atlas con Mongoose ORM.

## Principios generales
- Nombres de campos en inglés
- Operaciones críticas usan findOneAndUpdate para atomicidad
- Conexión via MONGODB_URI en .env

## Collection: activities
Eventos disponibles en CampusFest.

```js
const ActivitySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, index: true },
  startAt: { type: Date, required: true, index: true },
  endAt: { type: Date },
  location: { type: String },
  capacity: { type: Number, required: true, min: 0 },
  availableSpots: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['Open','Full','Cancelled'], default: 'Open' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });
```

## Collection: participants
Participantes registrados en la plataforma.

```js
const ParticipantSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, lowercase: true, index: true, unique: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});
```

## Collection: registrations
Registros de participantes en actividades. Implementa lista de espera.

```js
const RegistrationSchema = new Schema({
  activityId: { type: Schema.Types.ObjectId, ref: 'Activity', required: true, index: true },
  participantId: { type: Schema.Types.ObjectId, ref: 'Participant' },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String },
  status: { type: String, enum: ['confirmed','waiting','cancelled'], default: 'confirmed' },
  notified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Índices: { activityId: 1, email: 1 } (unique), { activityId: 1, createdAt: 1 } (FIFO)
```

**Flujo:**
- Al registrar: Decrementar availableSpots atómicamente. Si OK → status 'confirmed'. Else → status 'waiting'.
- Al cancelar: Incrementar availableSpots. Promocionar primer en espera si hay cupos.

## Collection: stands
Puestos/stands de la feria.

```js
const StandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String }
}, { timestamps: true });
```

## Collection: admins
Usuarios administrativos.

```js
const AdminSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['super','editor','viewer'], default: 'editor' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
```


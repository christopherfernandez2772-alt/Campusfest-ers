const { Schema, model } = require('mongoose');

const CATEGORIES = ['Cultural', 'Deportivo', 'Tecnológico', 'Artístico', 'Gastronómico', 'Recreativo'];
const STATUSES = ['Disponible', 'Lleno', 'Cancelado'];

const activitySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la actividad es obligatorio'],
      trim: true,
      maxlength: [120, 'El nombre no puede superar los 120 caracteres'],
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: { values: CATEGORIES, message: 'Categoría no válida' },
    },
    date: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
    },
    time: {
      type: String,
      required: [true, 'La hora es obligatoria'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'La hora debe tener el formato HH:MM'],
    },
    location: {
      type: String,
      required: [true, 'El lugar es obligatorio'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'El cupo máximo es obligatorio'],
      min: [1, 'El cupo máximo debe ser mayor a 0'],
    },
    availableSpots: {
      type: Number,
      required: true,
      min: [0, 'El cupo disponible no puede ser negativo'],
    },
    requirements: {
      type: String,
      trim: true,
      default: 'Sin requisitos previos',
    },
    status: {
      type: String,
      enum: { values: STATUSES, message: 'Estado no válido' },
      default: 'Disponible',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

activitySchema.index({ date: 1, time: 1 });
activitySchema.index({ category: 1 });
activitySchema.index({ featured: 1 });

activitySchema.pre('validate', function setDefaultAvailableSpots(next) {
  if (this.availableSpots === undefined && this.capacity !== undefined) {
    this.availableSpots = this.capacity;
  }
  next();
});

module.exports = model('Activity', activitySchema);
module.exports.CATEGORIES = CATEGORIES;
module.exports.STATUSES = STATUSES;

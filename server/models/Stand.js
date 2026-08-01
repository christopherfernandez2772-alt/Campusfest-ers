const { Schema, model } = require('mongoose');

const CATEGORIES = ['Cultural', 'Deportivo', 'Tecnológico', 'Artístico', 'Gastronómico', 'Recreativo'];

const standSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del stand es obligatorio'],
      trim: true,
      maxlength: [120, 'El nombre no puede superar los 120 caracteres'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: { values: CATEGORIES, message: 'Categoría no válida' },
    },
    responsible: {
      type: String,
      required: [true, 'El responsable es obligatorio'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'La ubicación es obligatoria'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
    },
  },
  { timestamps: true }
);

standSchema.index({ category: 1 });

module.exports = model('Stand', standSchema);
module.exports.CATEGORIES = CATEGORIES;

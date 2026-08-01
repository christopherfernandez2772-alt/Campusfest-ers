const { Schema, model } = require('mongoose');

const participantSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'El nombre completo es obligatorio'],
      trim: true,
      maxlength: [120, 'El nombre no puede superar los 120 caracteres'],
    },
    identification: {
      type: String,
      required: [true, 'La identificación es obligatoria'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El correo electrónico no es válido'],
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true,
      match: [/^[0-9+\s-]{7,20}$/, 'El teléfono no es válido'],
    },
    career: {
      type: String,
      required: [true, 'La carrera o grupo es obligatorio'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Participant', participantSchema);

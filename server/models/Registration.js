const { Schema, model } = require('mongoose');

const registrationSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
      required: [true, 'El participante es obligatorio'],
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: [true, 'La actividad es obligatoria'],
    },
    comments: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['confirmed', 'waiting', 'cancelled'],
      default: 'confirmed',
    },
    notified: {
      type: Boolean,
      default: false,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevents a participant from registering twice for the same activity
registrationSchema.index({ participant: 1, activity: 1 }, { unique: true });

module.exports = model('Registration', registrationSchema);

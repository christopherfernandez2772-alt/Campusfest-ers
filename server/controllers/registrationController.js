const Registration = require('../models/Registration');
const Activity = require('../models/Activity');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { registerParticipantToActivity } = require('../services/registrationService');

const getRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find()
    .populate('participant')
    .populate('activity')
    .sort({ registrationDate: -1 });

  res.status(200).json({ success: true, count: registrations.length, data: registrations });
});

const createRegistration = asyncHandler(async (req, res) => {
  const registration = await registerParticipantToActivity(req.body);
  res.status(201).json({ success: true, data: registration });
});

const deleteRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findByIdAndDelete(req.params.id);

  if (!registration) {
    throw new ApiError(404, 'Inscripción no encontrada');
  }

  // Frees up the spot that was taken by this registration
  const activity = await Activity.findById(registration.activity);
  if (activity) {
    activity.availableSpots = Math.min(activity.capacity, activity.availableSpots + 1);
    if (activity.status === 'Lleno' && activity.availableSpots > 0) {
      activity.status = 'Disponible';
    }
    await activity.save();
  }

  res.status(200).json({ success: true, message: 'Inscripción eliminada correctamente' });
});

module.exports = { getRegistrations, createRegistration, deleteRegistration };

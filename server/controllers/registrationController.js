const Registration = require('../models/Registration');
const Activity = require('../models/Activity');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { registerParticipantToActivity, addParticipantToWaitlist } = require('../services/registrationService');

const getRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find()
    .populate('participant')
    .populate('activity')
    .sort({ registrationDate: -1 });

  res.status(200).json({ success: true, count: registrations.length, data: registrations });
});

const getRegistrationsByActivity = asyncHandler(async (req, res) => {
  const { idActividad } = req.params;
  const registrations = await Registration.find({ activity: idActividad })
    .populate('participant')
    .populate('activity')
    .sort({ registrationDate: -1 });

  res.status(200).json({ success: true, count: registrations.length, data: registrations });
});

const createRegistration = asyncHandler(async (req, res) => {
  const registration = await registerParticipantToActivity(req.body);
  res.status(201).json({ success: true, data: registration });
});

const createWaitlistEntry = asyncHandler(async (req, res) => {
  const entry = await addParticipantToWaitlist(req.body);
  res.status(201).json({ success: true, data: entry });
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

    // If there are participants on the waiting list, promote the earliest one.
    const waiting = await Registration.findOne({ activity: activity._id, status: 'waiting' }).sort({ createdAt: 1 });
    if (waiting) {
      waiting.status = 'confirmed';
      waiting.registrationDate = new Date();
      waiting.notified = true; // marked as notified (placeholder — integrate real notifications later)
      await waiting.save();

      // Consume the freed spot
      activity.availableSpots = Math.max(0, activity.availableSpots - 1);
      if (activity.availableSpots === 0) activity.status = 'Lleno';
      await activity.save();

      // Log promotion — real notification (email/SMS) can be integrated later.
      console.log(`Promoted waiting registration ${waiting._id} to confirmed for activity ${activity._id}`);
    }
  }

  res.status(200).json({ success: true, message: 'Inscripción eliminada correctamente' });
});

module.exports = { getRegistrations, getRegistrationsByActivity, createRegistration, createWaitlistEntry, deleteRegistration };

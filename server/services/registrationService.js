const Activity = require('../models/Activity');
const Participant = require('../models/Participant');
const Registration = require('../models/Registration');
const ApiError = require('../utils/ApiError');

// Finds or creates the participant tied to a registration submission.
async function findOrCreateParticipant({ fullName, identification, email, phone, career }) {
  let participant = await Participant.findOne({
    $or: [{ identification }, { email: email?.toLowerCase() }],
  });

  if (!participant) {
    participant = await Participant.create({ fullName, identification, email, phone, career });
  }

  return participant;
}

async function registerParticipantToActivity(payload) {
  const { activity: activityId, comments } = payload;

  const activity = await Activity.findById(activityId);
  if (!activity) {
    throw new ApiError(404, 'La actividad seleccionada no existe');
  }

  if (activity.status === 'Cancelado') {
    throw new ApiError(400, 'No es posible inscribirse en una actividad cancelada');
  }

  if (activity.availableSpots <= 0) {
    throw new ApiError(400, 'No hay cupos disponibles para esta actividad');
  }

  const participant = await findOrCreateParticipant(payload);

  const alreadyRegistered = await Registration.findOne({
    participant: participant._id,
    activity: activity._id,
  });

  if (alreadyRegistered) {
    throw new ApiError(409, 'Ya te encuentras inscrito en esta actividad');
  }

  const registration = await Registration.create({
    participant: participant._id,
    activity: activity._id,
    comments,
  });

  activity.availableSpots -= 1;
  if (activity.availableSpots === 0) {
    activity.status = 'Lleno';
  }
  await activity.save();

  return registration.populate(['participant', 'activity']);
}

module.exports = { registerParticipantToActivity, findOrCreateParticipant };

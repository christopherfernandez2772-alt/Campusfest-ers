const Activity = require('../models/Activity');
const Participant = require('../models/Participant');
const Registration = require('../models/Registration');
const ApiError = require('../utils/ApiError');

// Finds or creates the participant tied to a registration submission.
async function findOrCreateParticipant({ fullName, identification, email, phone, career }) {
  // Basic server-side validation to provide clearer errors before Mongoose runs.
  if (!fullName || String(fullName).trim().length === 0) {
    throw new ApiError(400, 'El nombre completo es obligatorio');
  }
  if (!identification || String(identification).trim().length === 0) {
    throw new ApiError(400, 'La identificación es obligatoria');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    throw new ApiError(400, 'Correo electrónico inválido');
  }
  if (!phone || !/^[0-9+\s-]{7,20}$/.test(String(phone))) {
    throw new ApiError(400, 'Teléfono inválido');
  }
  if (!career || String(career).trim().length === 0) {
    throw new ApiError(400, 'La carrera o grupo es obligatorio');
  }

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

async function addParticipantToWaitlist(payload) {
  const { activity: activityId, comments } = payload;

  const activity = await Activity.findById(activityId);
  if (!activity) {
    throw new ApiError(404, 'La actividad seleccionada no existe');
  }

  const participant = await findOrCreateParticipant(payload);

  const alreadyRegistered = await Registration.findOne({
    participant: participant._id,
    activity: activity._id,
  });

  if (alreadyRegistered) {
    throw new ApiError(409, 'Ya te encuentras inscrito (o en lista) en esta actividad');
  }

  const waitEntry = await Registration.create({
    participant: participant._id,
    activity: activity._id,
    comments,
    status: 'waiting',
  });

  return waitEntry.populate(['participant', 'activity']);
}

module.exports = { registerParticipantToActivity, findOrCreateParticipant, addParticipantToWaitlist };

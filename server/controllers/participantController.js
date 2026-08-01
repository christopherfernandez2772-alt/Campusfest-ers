const Participant = require('../models/Participant');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const getParticipants = asyncHandler(async (req, res) => {
  const participants = await Participant.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: participants.length, data: participants });
});

const getParticipantById = asyncHandler(async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  if (!participant) {
    throw new ApiError(404, 'Participante no encontrado');
  }

  res.status(200).json({ success: true, data: participant });
});

const createParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.create(req.body);
  res.status(201).json({ success: true, data: participant });
});

const updateParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!participant) {
    throw new ApiError(404, 'Participante no encontrado');
  }

  res.status(200).json({ success: true, data: participant });
});

const deleteParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.findByIdAndDelete(req.params.id);

  if (!participant) {
    throw new ApiError(404, 'Participante no encontrado');
  }

  res.status(200).json({ success: true, message: 'Participante eliminado correctamente' });
});

module.exports = {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
};

const Stand = require('../models/Stand');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const getStands = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};

  const stands = await Stand.find(filter).sort({ name: 1 });
  res.status(200).json({ success: true, count: stands.length, data: stands });
});

const getStandById = asyncHandler(async (req, res) => {
  const stand = await Stand.findById(req.params.id);

  if (!stand) {
    throw new ApiError(404, 'Stand no encontrado');
  }

  res.status(200).json({ success: true, data: stand });
});

const createStand = asyncHandler(async (req, res) => {
  const stand = await Stand.create(req.body);
  res.status(201).json({ success: true, data: stand });
});

const updateStand = asyncHandler(async (req, res) => {
  const stand = await Stand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!stand) {
    throw new ApiError(404, 'Stand no encontrado');
  }

  res.status(200).json({ success: true, data: stand });
});

const deleteStand = asyncHandler(async (req, res) => {
  const stand = await Stand.findByIdAndDelete(req.params.id);

  if (!stand) {
    throw new ApiError(404, 'Stand no encontrado');
  }

  res.status(200).json({ success: true, message: 'Stand eliminado correctamente' });
});

module.exports = { getStands, getStandById, createStand, updateStand, deleteStand };

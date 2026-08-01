const Activity = require('../models/Activity');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const getActivities = asyncHandler(async (req, res) => {
  const { category, status, featured } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (status) filter.status = status;
  if (featured) filter.featured = featured === 'true';

  const activities = await Activity.find(filter).sort({ date: 1, time: 1 });

  res.status(200).json({ success: true, count: activities.length, data: activities });
});

const getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    throw new ApiError(404, 'Actividad no encontrada');
  }

  res.status(200).json({ success: true, data: activity });
});

const createActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ success: true, data: activity });
});

const updateActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!activity) {
    throw new ApiError(404, 'Actividad no encontrada');
  }

  res.status(200).json({ success: true, data: activity });
});

const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);

  if (!activity) {
    throw new ApiError(404, 'Actividad no encontrada');
  }

  res.status(200).json({ success: true, message: 'Actividad eliminada correctamente' });
});

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};

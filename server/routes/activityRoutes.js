const express = require('express');
const {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activityController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.route('/').get(getActivities).post(adminAuth, createActivity);
router.route('/:id').get(getActivityById).put(adminAuth, updateActivity).delete(adminAuth, deleteActivity);

module.exports = router;

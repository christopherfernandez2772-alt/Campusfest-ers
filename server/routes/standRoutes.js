const express = require('express');
const {
  getStands,
  getStandById,
  createStand,
  updateStand,
  deleteStand,
} = require('../controllers/standController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.route('/').get(getStands).post(adminAuth, createStand);
router.route('/:id').get(getStandById).put(adminAuth, updateStand).delete(adminAuth, deleteStand);

module.exports = router;

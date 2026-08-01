const express = require('express');
const {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} = require('../controllers/participantController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.use(adminAuth); // Managing participants directly is an admin-only capability

router.route('/').get(getParticipants).post(createParticipant);
router.route('/:id').get(getParticipantById).put(updateParticipant).delete(deleteParticipant);

module.exports = router;

const express = require('express');
const {
  getRegistrations,
  getRegistrationsByActivity,
  createRegistration,
  createWaitlistEntry,
  deleteRegistration,
} = require('../controllers/registrationController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Listing every registration and deleting one are admin-only actions;
// creating a registration must stay public so visitors can sign up.
router.route('/').get(adminAuth, getRegistrations).post(createRegistration);
router.post('/lista-espera', createWaitlistEntry);
router.route('/actividad/:idActividad').get(getRegistrationsByActivity);
router.route('/:id').delete(adminAuth, deleteRegistration);

module.exports = router;

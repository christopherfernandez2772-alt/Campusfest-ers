const express = require('express');
const {
  getRegistrations,
  createRegistration,
  deleteRegistration,
} = require('../controllers/registrationController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Listing every registration and deleting one are admin-only actions;
// creating a registration must stay public so visitors can sign up.
router.route('/').get(adminAuth, getRegistrations).post(createRegistration);
router.route('/:id').delete(adminAuth, deleteRegistration);

module.exports = router;

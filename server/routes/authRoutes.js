const express = require('express');
const router = express.Router();
const { signUp, login, getProfile } = require('../controllers/authController');

// In a real app, you'd have a protect middleware here
// For now, let's just set up the routes

router.post('/signup', signUp);
router.post('/login', login);
router.get('/profile', getProfile);

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Register
router.post('/signup', authController.validateRegister, authController.register);

// Login
router.post('/login', authController.validateLogin, authController.login);

// Get profile (protected)
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;

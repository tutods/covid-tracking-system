// Express Package
const express = require('express');
const router = express.Router();

// Middlewares
const authorize = require('../middlewares/authorize');

// User Model
const model = require('../models/User');

// Controllers
const {
	login,
	logout,
	resetPassword,
	changePassword,
} = require('../controllers/UserController');

router.post('/login', login);

router.post('/logout', logout);

router.post('/reset-password', resetPassword);

router.post('/change-password/:token', changePassword);

module.exports = router;

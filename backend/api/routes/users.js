// Express Package
const express = require('express');
const router = express.Router();

// Middlewares
const authorize = require('../middlewares/authorize');

// User Model
const model = require('../models/User');

// Controllers
const {
	create,
	login,
	logout,
	resetPassword,
	changePassword,
	updatePassword,
} = require('../controllers/UserController');
const {
	getAll,
	getById,
	getOneAndUpdate,
	getOneAndDelete,
} = require('../controllers/GenericController')(model);

router.post('/', authorize(['--create-users']), create);

router.get('/', authorize(['--view-users']), getAll);

router.get('/:id', authorize(['--view-users']), getById);

router.put('/:id', authorize(['--edit-users']), getOneAndUpdate);

router.delete('/:id', authorize(['--delete-users']), getOneAndDelete);

router.post('/login', login);

router.post('/logout', logout);

router.post('/reset-password', resetPassword);

router.post('/change-password/:token', changePassword);

router.post('/update-password', updatePassword);

module.exports = router;

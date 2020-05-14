// Express Package
const express = require('express');
const router = express.Router();

// Middlewares
const authorize = require('../middlewares/authorize');

// User Model
const model = require('../models/User');

// Controllers
const { login, logout, resetPassword , changePassword} = require('../controllers/UserController');
const {
	getAll,
	getById,
	create,
	getOneAndUpdate,
	getOneAndDelete,
} = require('../controllers/GenericController')(model);

router.post('/', create);

router.get('/', authorize(['--view-users']), getAll);

router.get('/:id', authorize(['--view-users']), getById);

router.put('/:id', authorize(['--edit-users']), getOneAndUpdate);

router.delete('/:id', authorize(['--delete-users']), getOneAndDelete);

router.post('/login', login);

router.post('/logout', logout);

router.post('/resetPassword', resetPassword);

router.post('/changePassword/:token', changePassword);

module.exports = router;

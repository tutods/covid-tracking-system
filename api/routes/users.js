// Express Package
const express = require('express');
const router = express.Router();

// Middlewares
const authorize = require('../middlewares/authorize');

// User Model
const model = require('../models/User');

// Controllers
const { login, logout } = require('../controllers/UserController');
const {
	getAll,
	getById,
	create,
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

module.exports = router;

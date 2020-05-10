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

router.post('/', create);

router.get('/', authorize(['--view-all']), getAll);

router.get('/:id', getById);

router.put('/:id', getOneAndUpdate);

router.delete('/:id', getOneAndDelete);

router.post('/login', login);

router.post('/logout', logout);

module.exports = router;

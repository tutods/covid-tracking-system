// Express Package
const express = require('express');
const router = express.Router();

// User Model
const model = require('../models/User');

// Controllers
const { login, register } = require('../controllers/UserController');
const {
	getAll,
	getById,
	getOneAndUpdate,
	getOneAndDelete,
} = require('../controllers/GenericController')(model);

router.post('/', register);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', getOneAndUpdate);

router.delete('/:id', getOneAndDelete);

router.post('/login', login);

module.exports = router;

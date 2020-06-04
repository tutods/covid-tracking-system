// Express Package
const express = require('express');
const router = express.Router();

// Middlewares
const authorize = require('../middlewares/authorize');

// User Model
const model = require('../models/User');

// Controllers
const { create, updatePassword } = require('../controllers/UserController');
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

router.post('/update-password', authorize(['--view-all']), updatePassword);

module.exports = router;

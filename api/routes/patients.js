// Express Package
const express = require('express');
const router = express.Router();

// Patient Model
const model = require('../models/Patient');

// Middlewares
const authorize = require('../middlewares/authorize');

// Controllers
const {
	create,
	getAll,
	getById,
	getOneAndUpdate,
	getOneAndDelete,
} = require('../controllers/GenericController')(model);

router.post('/', authorize(['--create-all']), create);

router.get('/', authorize(['--view-all']), getAll);

router.get('/:id', authorize(['--view-all']), getById);

router.put('/:id', authorize(['--edit-all']), getOneAndUpdate);

router.delete('/:id', authorize(['--delete-all']), getOneAndDelete);

module.exports = router;

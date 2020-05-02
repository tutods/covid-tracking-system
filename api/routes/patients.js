// Express Package
const express = require('express');
const router = express.Router();

// Patient Model
const model = require('../models/Patient');

// Controllers
const {
    create,
	getAll,
	getById,
	getOneAndUpdate,
	getOneAndDelete,
} = require('../controllers/GenericController')(model);

router.post('/',create);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', getOneAndUpdate);

router.delete('/:id', getOneAndDelete);

module.exports = router;
// Express Package
const express = require('express');
const router = express.Router();

// CovidTest Model
const model = require('../models/CovidTest');

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
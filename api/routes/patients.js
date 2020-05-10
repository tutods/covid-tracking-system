// Express Package
const express = require('express');
const router = express.Router();

// Patient Model
const model = require('../models/Patient');

//Middlewares
const filters = require('../middlewares/filters');
const sort = require('../middlewares/sort');

// Controllers
const {
    create,
    getAll,
    getById,
    getOneAndUpdate,
    getOneAndDelete,
} = require('../controllers/GenericController')(model);

router.use(filters);

router.use(sort);

router.post('/', create);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', getOneAndUpdate);

router.delete('/:id', getOneAndDelete);

module.exports = router;
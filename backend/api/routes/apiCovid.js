// Express Package
const express = require('express');
const router = express.Router();

// Api Model
const model = require('../models/ApiCovid');

const { getAll } = require('../controllers/GenericController')(model);

router.get('/', getAll);

module.exports = router;

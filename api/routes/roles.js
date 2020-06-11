// Express Package
const express = require('express');
const router = express.Router();

// User Model
const model = require('../models/Role');

// Controllers
const { getAll } = require('../controllers/GenericController')(model);

router.get('/', getAll);

module.exports = router;

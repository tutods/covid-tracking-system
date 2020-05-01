// Import Express
const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./users');

// Middlewares
const logger = require('../middlewares/logger');

router.use(logger);

router.get('/', (req, res, next) => {
	res.json({ status: 'ok' });
});

router.use('/users', userRoutes);

module.exports = router;
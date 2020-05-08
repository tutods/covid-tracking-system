// Import Express
const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./routes/users');
const covidTestRoutes = require('./routes/covidTests');
const patientRoutes = require('./routes/patients');

// Middlewares
const logger = require('./middlewares/logger');

router.use(logger);

router.get('/', (req, res, next) => {
	res.json({ status: 'ok' });
});

router.use('/users', userRoutes);

router.use('/covid-tests', covidTestRoutes);

router.use('/patients', patientRoutes);

module.exports = router;
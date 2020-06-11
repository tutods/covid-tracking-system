// Import Express
const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./routes/users');
const covidTestRoutes = require('./routes/covidTests');
const patientRoutes = require('./routes/patients');
const rolesRoutes = require('./routes/roles');
const summaryRoutes = require('./routes/summary');
const authRoutes = require('./routes/auth');
const apicovidRoutes = require('./routes/apiCovid');

// Middlewares
const logger = require('./middlewares/logger');

router.use(logger);

router.get('/', (req, res, next) => {
	res.json({ status: 'ok' });
});

router.use('/users', userRoutes);

router.use('/covid-tests', covidTestRoutes);

router.use('/patients', patientRoutes);

router.use('/roles', rolesRoutes);

router.use('/summary', summaryRoutes);

router.use('', authRoutes);

router.use('/api-covid', apicovidRoutes);

module.exports = router;

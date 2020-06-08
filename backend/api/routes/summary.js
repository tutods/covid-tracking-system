// Express Package
const express = require('express');
const router = express.Router();

// Middlewares
const authorize = require('../middlewares/authorize');

const {
	countByDay,
	countByPatient,
	countByStatus,
	countBySymptoms,
	countByGender,
} = require('../controllers/SummaryController');

router.get('/tests/day', countByDay); //depois meter

router.get('/tests/patient', authorize(['--view-all']), countByPatient);

router.get('/patients/status', countByStatus); //depois meter

router.get('/patients/symptoms', countBySymptoms); // depois meter

router.get('/patients/gender', countByGender); // depois meter

module.exports = router;

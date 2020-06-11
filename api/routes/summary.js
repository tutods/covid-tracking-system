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

router.get('/tests/day', authorize(['--view-all']), countByDay);

router.get('/tests/patient', authorize(['--view-all']), countByPatient);

router.get('/patients/status', authorize(['--view-all']), countByStatus);

router.get('/patients/symptoms', authorize(['--view-all']), countBySymptoms);

router.get('/patients/gender', authorize(['--view-all']), countByGender);

module.exports = router;

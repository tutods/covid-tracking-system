// Express Package
const express = require('express');
const router = express.Router();

// CovidTest Model
const model = require('../models/CovidTest');

// Middlewares
const authorize = require('../middlewares/authorize');
const filters = require('../middlewares/filters');
const sort = require('../middlewares/sort');
var multer = require('multer');

const path = './public/covidTests/';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path);
	},
	filename: function (req, file, cb) {
		const defaultExt = '.pdf';
		//default extension protects from attackers
		const date = Date.now();
		cb(null, `test_${req.params.id}_${date}${defaultExt}`);
	},
});

const upload = multer({ storage: storage });

// Controllers
const {
	create,
	getAll,
	getById,
	getOneAndDelete,
} = require('../controllers/GenericController')(model);

const {
	getOneAndUpdate,
	getByPatient,
	countByDay,
	countByPatient,
} = require('../controllers/CovidTestController');

router.use(filters);

router.use(sort);

router.post('/', authorize(['--create-all']), create);

router.get('/', authorize(['--view-all']), getAll);

router.get('/count/day', authorize(['--view-all']), countByDay);

router.get('/count/patient', authorize(['--view-all']), countByPatient);

router.get('/:id', authorize(['--view-all']), getById);

router.get('/patient/:patientId', authorize(['--view-all']), getByPatient);

router.put('/:id', authorize(['--edit-all']), upload.single('covid_test_result'), getOneAndUpdate);

router.delete('/:id', authorize(['--delete-all']), getOneAndDelete);

module.exports = router;

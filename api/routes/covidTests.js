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
} = require('../controllers/CovidTestController');

router.use(filters);

router.use(sort);

router.post('/', create);

router.post('/', create);

router.get('/',  getAll);

router.get('/:id', authorize(['--view-all']), getById);

router.get('/patient/:patientId',  getByPatient);

router.put(
	'/:id',
	upload.single('covid_test_result'),
	getOneAndUpdate
);

router.delete('/:id', authorize(['--delete-all']), getOneAndDelete);

module.exports = router;

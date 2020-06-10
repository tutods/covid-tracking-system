// Express Package
const express = require('express');
const router = express.Router();

// FS
const fs = require('fs');

// CovidTest Model
const model = require('../models/CovidTest');

// Middlewares
const authorize = require('../middlewares/authorize');
const filters = require('../middlewares/filters');
const sort = require('../middlewares/sort');
const multer = require('multer');

const path = 'uploads/covid-tests/';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		fs.mkdirSync(path, { recursive: true });
		cb(null, path);
	},
	filename: (req, file, cb) => {
		const defaultExt = '.pdf';
		cb(null, `test_${req.params.id}${defaultExt}`);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'application/pdf') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .pdf format allowed!'));
		}
	},
});

// Controllers
const { create, getAll, getById } = require('../controllers/GenericController')(
	model
);

const {
	getOneAndUpdate,
	getOneAndDelete,
	getByPatient,
} = require('../controllers/CovidTestController');

router.use(filters);

router.use(sort);

router.post('/', authorize(['--create-all']), create);

router.get('/', authorize(['--view-all']), getAll);

router.get('/:id', authorize(['--view-all']), getById);

router.get('/patient/:patientId', authorize(['--view-all']), getByPatient);

router.put(
	'/:id',
	authorize(['--edit-all']),
	upload.single('file'),
	getOneAndUpdate
);

router.delete('/:id', authorize(['--delete-all']), getOneAndDelete);

module.exports = router;

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
    destination: function(req, file, cb) {
        cb(null, path);
     },
    filename: function (req, file, cb) {

		const defaultExt = ".pdf";
		//default extension protects from attackers
		const date = Date.now();
		cb(null , `test_${req.params.id}_${date}${defaultExt}`);
     }
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
} = require('../controllers/CovidTestController');

router.use(filters);

router.use(sort);

router.post('/', authorize(['--create-all']), create);

router.post('/', create);

router.get('/', authorize(['--view-all']), getAll);

router.get('/:id', authorize(['--view-all']), getById);

router.put('/:id', upload.single('covid_test_result') ,  authorize(['--edit-all']) , getOneAndUpdate);

router.delete('/:id', authorize(['--delete-all']), getOneAndDelete);

module.exports = router;

// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

//Path
const path = './public/covidTests/';

const covidTestController = () => {
	const getOneAndUpdate = (req, res) => {
		const id = req.params.id;
		const data = req.body;

		data.pathFile = `${path}test_${req.params.id}.pdf`;

		covidTest.findOneAndUpdate(
			{ _id: id },
			data,
			{ runValidators: true },
			(error, data) => {
				const response = error
					? { status: 401, body: error }
					: { status: 200, body: data };

				res.status(response.status).json(response.body);
			}
		);
	};

	const getByPatient = async (req, res) => {
		const patientId = req.params.patientId;

		const tests = await covidTest.find({ patient: patientId });

		const patientData = await patient.findOne({ _id: patientId });

		let testsData = tests.map((test) => {
			return {
				code: test.code,
				status: test.status,
				notes: test.notes,
				date: test.date,
				createdAt: test.createdAt,
				updatedAt: test.updatedAt,
			};
		});

		// console.log(testsData);
		const result = {
			_id: patientData._id,
			name: patientData.name,
			contacts: patientData.contacts,
			patientNumber: patientData.patientNumber,
			birthdayDate: patientData.birthdayDate,
			status: patientData.status,
			symptoms: patientData.symptoms,
			tests: testsData,
			createdAt: patientData.createdAt,
			updatedAt: patientData.updatedAt,
		};

		const response = result
			? {
					code: 200,
					body: result,
			  }
			: {
					code: 404,
					body: 'No data',
			  };
		res.status(response.code).json(response.body);

		// console.log(result);
	};

	const countByDay = async (req, res) => {
		const tests = await covidTest.aggregate([
			{
				$group: {
					_id: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$createdAt',
						},
					},
					numberOfTests: { $sum: 1 },
				},
			},
		]);

		const response =
			tests.length == 0
				? {
						body: [],
						code: 200,
				  }
				: {
						body: tests,
						code: 200,
				  };

		res.status(response.code).json(response.body);
	};

	const countByPatient = async (req, res) => {
		const tests = await covidTest.aggregate([
			{
				$group: {
					_id: '$patient',
					numberOfTests: { $sum: 1 },
				},
			},
			{
				$lookup: {
					from: 'patients',
					localField: '_id',
					foreignField: '_id',
					as: '_id',
				},
			},
			{
				$unwind: '$_id', // this to convert the array of one object to be an object
			},
			{
				$project: {
					'_id._id': 0,
					'_id.createdAt': 0,
					'_id.updatedAt': 0,
				},
			},
		]);

		console.log(tests);

		// const patientData = await patient.populate(tests, { path: '_id' });

		const response =
			tests.length == 0
				? {
						body: [],
						code: 200,
				  }
				: {
						body: tests,
						code: 200,
				  };

		res.status(response.code).json(response.body);
	};

	return { getOneAndUpdate, getByPatient, countByDay, countByPatient };
};

module.exports = covidTestController();

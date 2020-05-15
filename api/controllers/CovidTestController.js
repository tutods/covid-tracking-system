// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

const { create } = require('./GenericController')(covidTest);

//Path
const path = './public/covidTests/';

const covidTestController = () => {
	const getOneAndUpdate = (req, res) => {
		const id = req.params.id;
		const data = req.body;

		data.pathFile = `${path}test_${req.params.id}.pdf`;

		covidTest.findOneAndUpdate(
			{
				_id: id,
			},
			data,
			{
				runValidators: true,
			},
			(error, data) => {
				const response = error
					? {
							status: 401,
							body: error,
					  }
					: {
							status: 200,
							body: data,
					  };

				res.status(response.status).json(response.body);
				autoSchedule(response.body.patient._id);
			}
		);
	};

	const getByPatient = async (req, res) => {
		const patientId = req.params.patientId;

		const tests = await covidTest.find({
			patient: patientId,
		});

		const patientData = await patient.findOne({
			_id: patientId,
		});

		let testsData = tests.map((test) => {
			return {
				id: test._id,
				code: test.code,
				status: test.status,
				result: test.result,
				notes: test.notes,
				date: test.date,
				createdAt: test.createdAt,
				updatedAt: test.updatedAt,
			};
		});

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
	};

	const autoSchedule = async (patientId) => {
		const today = new Date();
		const covid = await covidTest
			.find({
				patient: patientId,
			})
			.sort({
				updatedAt: -1,
			})
			.limit(2);
		const date =
			today.get +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			(today.getDate() + 2);
		const data = {
			patient: patientId,
			notes: 'Auto Schedule by the system !',
			date: date,
		};

		if (covid.length < 2) {
			if (covid[0].result != undefined) {
				if (covid[0].result.localeCompare('inconclusive') == 0) {
					create(data);
				}
			}
		} else {
			if (covid[0].result != undefined && covid[1].result != undefined) {
				if (
					covid[0].result.localeCompare('negative') == 0 &&
					covid[1].result.localeCompare('positive') == 0
				) {
					create(data);
				}
			}
		}
	};

	const create = async (data) => {
		new covidTest(data).save((error, data) => {
			const response = error
				? {
						status: 401,
						body: error,
				  }
				: {
						status: 201,
						body: data,
				  };
		});
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

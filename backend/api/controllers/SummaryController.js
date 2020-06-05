// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

const summaryController = () => {
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

	const countByStatus = async (req, res) => {
		console.log('aquiiii');
		const patients = await patient.aggregate([
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 },
				},
			},
		]);

		res.status(200).json(patients || []);
	};

	const countBySymptoms = async (req, res) => {
		const patients = await patient.aggregate([
			{
				$unwind: '$symptoms',
			},
			{
				$group: {
					_id: '$symptoms',
					count: { $sum: 1 },
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);

		res.status(200).json(patients || []);
	};

	return { countByDay, countByPatient, countByStatus, countBySymptoms };
};

module.exports = summaryController();

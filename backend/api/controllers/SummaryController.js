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
							date: '$date',
						},
					},
					numberOfTests: { $sum: 1 },
				},
			},
			{
				$project: {
					date: '$_id',
					_id: false,
					numberOfTests: '$numberOfTests',
				},
			},
			{
				$sort: { date: 1 },
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
					patient: '$_id',
					_id: false,
					numberOfTests: '$numberOfTests',
				},
			},
			{
				$project: {
					'patient.createdAt': 0,
					'patient.updatedAt': 0,
				},
			},
			{
				$sort: { numberOfTests: 1 },
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
			{
				$project: {
					status: '$_id',
					_id: false,
					count: '$count',
				},
			},
			{
				$sort: { count: 1 },
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

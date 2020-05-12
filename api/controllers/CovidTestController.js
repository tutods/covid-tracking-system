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

	return { getOneAndUpdate, getByPatient };
};

module.exports = covidTestController();

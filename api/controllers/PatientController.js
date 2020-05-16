// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

const patientController = () => {
	const getOneAndDelete = async (req, res) => {
		const id = req.params.id;

		await patient.findOneAndDelete(id, (error, data) => {
			covidTest.deleteMany({ patient: id });

			const response = error
				? { status: 401, body: error }
				: { status: 200, body: data };

			res.status(response.status).json(response.body);
		});
	};
	const countInfected = async (req, res) => {
		const patients = await patient.aggregate([
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 },
				},
			},
		]);

		const response =
			patients.length == 0
				? {
						body: [],
						code: 200,
				  }
				: {
						body: patients,
						code: 200,
				  };

		res.status(response.code).json(response.body);
	};

	return { countInfected, getOneAndDelete };
};

module.exports = patientController();

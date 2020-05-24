// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

const patientController = () => {
	const getOneAndDelete = async (req, res) => {
		const id = req.params.id;

		await covidTest.deleteMany({ patient: id });

		await patient.findOneAndDelete(id, (error, data) => {
			const response = error
				? { status: 401, body: error }
				: { status: 200, body: data };

			res.status(response.status).json(response.body);
		});
	};

	return { getOneAndDelete };
};

module.exports = patientController();

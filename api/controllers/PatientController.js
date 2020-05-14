// Model
const patient = require('../models/Patient');

//Path
const path = './public/covidTests/';

const covidTestController = () => {
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

	return { countInfected };
};

module.exports = covidTestController();

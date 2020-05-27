// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

const patientController = () => {
	const getOneAndDelete = async (req, res, next) => {
		const id = req.params.id;

		const patientToDelete = await patient.findOne({ _id: id });

		if (patientToDelete) {
			await covidTest.deleteMany({ patient: id });

			try {
				const deleted = await patientToDelete.delete();

				res.status(200).json(deleted);
			} catch (catchError) {
				next({
					message: catchError,
					status: 400,
				});
			}
		} else {
			res.status(404).json({ message: 'Not found' });
		}
	};

	return { getOneAndDelete };
};

module.exports = patientController();

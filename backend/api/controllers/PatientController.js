// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

//CovidController
const { getByPatientByParam } = require('./CovidTestController');

//Email
const emailByData = require('../../scripts/emailByData');

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
			res.status(404).json({ message: `Patient not found` });
		}
	};

	const getDataByEmail = async (req, res) => {
		const { email, patientNumber, phoneNumber } = req.body;

		const patientDB = await patient.findOne({
			patientNumber: patientNumber,
		});

		if (patientDB) {
			if (
				email == patientDB.contacts.email &&
				phoneNumber == patientDB.contacts.phone
			) {
				const patientData = await getByPatientByParam(patientDB._id);

				emailByData(patientData, email);

				res.status(200).json({
					message: 'Email sent with success',
				});
			} else {
				res.status(400).json({
					message: 'Invalid data',
				});
			}
		} else {
			res.status(404).json({
				message: "Patient doesn't exist",
			});
		}
	};

	return { getOneAndDelete, getDataByEmail };
};

module.exports = patientController();

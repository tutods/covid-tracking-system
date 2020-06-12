// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

// FS
const fs = require('fs');

//Path
const filePath = 'uploads/covid-tests/';

// Email
const autoScheduleEmail = require('../../scripts/emails/autoScheduleEmail');
const resultEmail = require('../../scripts/emails/resultEmail');

const covidTestController = () => {
	const getOneAndUpdate = async (req, res, next) => {
		const id = req.params.id;
		const data = req.body;

		try {
			if (req.file) {
				data.pathFile = `${filePath}test_${req.params.id}.pdf`;
			}

			covidTest.findOneAndUpdate(
				{
					_id: id,
				},
				data,
				{
					runValidators: true,
					new: true,
				},
				async (error, success) => {
					const response = error
						? {
								status: 401,
								body: error,
						  }
						: {
								status: 200,
								body: data,
						  };

					autoSchedule(success.patient._id);
					res.status(response.status).json(response.body);

					if (req.file) {
						resultEmail(success.patient, success);
					}
				}
			);
		} catch (catchError) {
			next({
				status: 400,
				message: catchError,
			});
		}
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

		const result = patientData
			? {
					_id: patientData._id,
					name: patientData.name,
					contacts: patientData.contacts,
					patientNumber: patientData.patientNumber,
					birthdayDate: patientData.birthdayDate,
					status: patientData.status,
					symptoms: patientData.symptoms,
					observations: patientData.observations,
					tests: testsData,
					createdAt: patientData.createdAt,
					updatedAt: patientData.updatedAt,
			  }
			: {};

		const response = result
			? {
					code: 200,
					body: result,
			  }
			: {
					code: 404,
					body: { message: 'No data' },
			  };
		res.status(response.code).json(response.body);
	};

	const getByPatientByParam = async (id) => {
		const patientId = id;

		const tests = await covidTest.find({
			patient: id,
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

		const result = patientData
			? {
					_id: patientData._id,
					name: patientData.name,
					contacts: patientData.contacts,
					patientNumber: patientData.patientNumber,
					birthdayDate: patientData.birthdayDate,
					status: patientData.status,
					symptoms: patientData.symptoms,
					observations: patientData.observations,
					tests: testsData,
					createdAt: patientData.createdAt,
					updatedAt: patientData.updatedAt,
			  }
			: {};

		return result;
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
		const patientToTest = covid[0].patient;

		const daysAfter = patientToTest.verifyObservations() ? 2 : 3;

		const scheduleDay = today.getDate() + daysAfter;

		const date = `${today.getFullYear()}-${
			today.getMonth() + 1
		}-${scheduleDay}`;

		const data = {
			patient: patientId,
			notes: 'Auto Schedule by the system !',
			date: date,
		};

		if (covid.length < 2) {
			if (covid[0].result != undefined) {
				if (
					covid[0].result.localeCompare('inconclusive') == 0 ||
					covid[0].result.localeCompare('negative') == 0
				) {
					createFunction(data);
				}
				if (covid[0].result.localeCompare('positive') == 0) {
					await patient.findOneAndUpdate(
						{ _id: patientToTest._id },
						{ status: 'Infected' }
					);
				}
			}
		} else {
			if (covid[0].result != undefined && covid[1].result != undefined) {
				if (
					covid[0].result.localeCompare('negative') == 0 &&
					covid[1].result.localeCompare('positive') == 0
				) {
					createFunction(data);
				}
				if (
					covid[0].result.localeCompare('negative') == 0 &&
					covid[1].result.localeCompare('negative') == 0
				) {
					await patient.findOneAndUpdate(
						{ _id: patientToTest._id },
						{ status: 'Non Infected' }
					);
				}
				if (
					covid[0].result.localeCompare('positive') == 0 ||
					covid[1].result.localeCompare('positive') == 0
				) {
					await patient.findOneAndUpdate(
						{ _id: patientToTest._id },
						{ status: 'Infected' }
					);
				}
			}
		}
	};

	const create = async (req, res) => {
		const result = await createFunction(req.body);
		res.status(result.status).json(result.body);
	};

	const createFunction = async (data, next) => {
		try {
			const newTest = await new covidTest(data).save();

			if (await newTest) {
				const testPatient = await patient.findOne({
					_id: data.patient,
				});
				autoScheduleEmail(
					await testPatient.contacts.email,
					data.date,
					await testPatient
				);

				return { status: 201, body: data };
			} else {
				return {
					status: 400,
					body: { message: 'Not possible create COVID Test' },
				};
			}
		} catch (catchError) {
			next({
				message: catchError,
				status: 400,
			});
		}
	};

	const getOneAndDelete = async (req, res, next) => {
		const id = req.params.id;

		try {
			const founded = await covidTest.findOne({ _id: id });

			if (founded) {
				if (founded.pathFile && fs.existsSync(founded.pathFile)) {
					fs.unlinkSync(founded.pathFile);
				}

				const data = await founded.delete();

				res.status(200).json(data);
			} else {
				res.status(404).json({ message: `${id} not found` });
			}
		} catch (catchError) {
			next({
				message: catchError,
				status: 400,
			});
		}
	};

	return {
		create,
		getOneAndUpdate,
		getByPatient,
		getByPatientByParam,
		getOneAndDelete,
	};
};

module.exports = covidTestController();

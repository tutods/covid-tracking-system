// Model
const covidTest = require('../models/CovidTest');
const patient = require('../models/Patient');

//Path
const path = './public/covidTests/';

const nodemailer = require('nodemailer');

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
		const patientToTest = covid[0].patient;

		const date = `${today.getFullYear()}-${today.getMonth() + 1}-${
			today.getDate() + patientToTest.verifyObservations() ? 1 : 2
		}`;

		const data = {
			patient: patientId,
			notes: 'Auto Schedule by the system !',
			date: date,
		};

		if (covid.length < 2) {
			if (covid[0].result != undefined) {
				if (covid[0].result.localeCompare('inconclusive') == 0) {
					create(data, patientToTest);
				}
			}
		} else {
			if (covid[0].result != undefined && covid[1].result != undefined) {
				if (
					covid[0].result.localeCompare('negative') == 0 &&
					covid[1].result.localeCompare('positive') == 0
				) {
					create(data, patientToTest);
				}
			}
		}
	};

	const create = async (data, patient) => {
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

		if (response.status == 201) {
			const smtpTransport = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'covidtrackingsystem@gmail.com',
					pass: 'joaodanieljoao20',
				},
			});

			const mailOptions = {
				to: patient.contacts.email,
				from: 'covidtrackingsystem@gmail.com',
				subject: 'Covid Tracking System',
				text:
					'You are receiving this email because we need you to repeat the test.\n\n' +
					'Please call 808 24 24 24 informations and instructions.' +
					'Best regards\n' +
					'Covid Tracking System',
			};

			smtpTransport.sendMail(mailOptions, function (err) {
				console.log('HI:' + patient.name);
				res.status(200).json({
					sucess: true,
					message: `An e-amil has been sent to ${patient.contacts.email} with further instructions`,
				});
				done(err, 'done');
			});
		}
	};

	return { getOneAndUpdate, getByPatient };
};

module.exports = covidTestController();

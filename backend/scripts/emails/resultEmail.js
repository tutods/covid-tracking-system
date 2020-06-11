// ENV
require('dotenv').config();
const { EMAIL_USER, EMAIL_PWD } = process.env;

//Nodemailer
const nodemailer = require('nodemailer');
// EJS
const ejs = require('ejs');

const resultEmail = (patient, covidTest) => {
	const formatDate = (date) => {
		const shortDate = new Date(date);
		const year = shortDate.getFullYear();
		const month = ('0' + (shortDate.getMonth() + 1)).slice(-2);
		const day = ('0' + shortDate.getDate()).slice(-2);

		return [year, month, day].join('-');
	};

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PWD,
		},
	});

	ejs.renderFile(
		'./views/mail/resultEmail.ejs',
		{
			file: covidTest.pathFile,
			patient: patient,
			covidTest: covidTest,
		},
		(err, data) => {
			if (err) {
				console.log(`[ERROR: ${err}]`);
			} else {
				const mainOptions = {
					from: EMAIL_USER,
					to: patient.contacts.email,
					subject: 'COVID Test',
					html: data,
					attachments: [
						{
							filename: 'result.pdf',
							path: covidTest.pathFile,
							contentType: 'application/pdf',
						},
					],
				};

				transporter.sendMail(mainOptions, function (err, info) {
					if (err) {
						console.log(`[ERROR ON SEND EMAIL: ${err}]`);
					} else {
						console.log(
							`[MAIL SENT WITH SUCCESS: ${info.response}]`
						);
					}
				});
			}
		}
	);
};
module.exports = resultEmail;

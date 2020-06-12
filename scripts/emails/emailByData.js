// ENV

const { EMAIL_USER, EMAIL_PWD, EMAIL_SERVICE } = process.env;

//Nodemailer
const nodemailer = require('nodemailer');
// EJS
const ejs = require('ejs');

const emailByData = (data, email) => {
	// URL
	const transporter = nodemailer.createTransport({
		service: EMAIL_SERVICE,
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PWD,
		},
	});

	ejs.renderFile(
		'./views/mail/patientData.ejs',
		{
			patientData: data,
		},
		(err, data) => {
			if (err) {
				console.log(`[ERROR: ${err}]`);
			} else {
				const mainOptions = {
					from: EMAIL_USER,
					to: email,
					subject: 'Patient Data',
					html: data,
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

module.exports = emailByData;

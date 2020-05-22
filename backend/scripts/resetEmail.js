// ENV
require('dotenv').config();
const {
	EMAIL_USER = 'covidtrackingsystem@gmail.com',
	EMAIL_PWD = 'joaodanieljoao20',
} = process.env;

//Nodemailer
const nodemailer = require('nodemailer');
// EJS
const ejs = require('ejs');

const resetEmail = (token, email) => {
	const changeUrl = `http://localhost:3000/api/users/change-password/${token}`;

	// URL
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PWD,
		},
	});

	ejs.renderFile(
		'./views/mail/reset.ejs',
		{
			link: changeUrl,
		},
		(err, data) => {
			if (err) {
				console.log(`[ERROR: ${err}]`);
			} else {
				const mainOptions = {
					from: EMAIL_USER,
					to: email,
					subject: 'Reset Password | COVID Tracking System',
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

module.exports = resetEmail;

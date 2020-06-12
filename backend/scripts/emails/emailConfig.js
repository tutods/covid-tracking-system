// ENV
require('dotenv').config();
const { EMAIL_USER, EMAIL_PWD, EMAIL_SERVICE } = process.env;

//Nodemailer
const nodemailer = require('nodemailer');

// Options to email
const mailOptions = (email, data, subject, file = undefined) => {
	let options = {
		from: EMAIL_USER,
		to: email,
		subject: subject,
		html: data,
	};

	if (file) {
		options.attachments = file;
	}

	return options;
};

const emailConfig = (email, data, subject, file = undefined) => {
	const transporter = nodemailer.createTransport({
		service: EMAIL_SERVICE,
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PWD,
		},
	});

	return transporter.sendMail(
		mailOptions(email, data, subject, file),
		(err, info) => {
			if (err) {
				console.log(`[ERROR ON SEND EMAIL: ${err}]`);
			} else {
				console.log(`[MAIL SENT WITH SUCCESS: ${info.response}]`);
			}
		}
	);
};

module.exports = emailConfig;

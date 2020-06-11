// ENV

const { EMAIL_USER, EMAIL_PWD } = process.env;

//Nodemailer
const nodemailer = require('nodemailer');
// EJS
const ejs = require('ejs');

const newUserEmail = (token, email) => {
	const changeUrl = `http://localhost:4200/change-password/${token}`;

	// URL
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PWD,
		},
	});

	ejs.renderFile(
		'./views/mail/newUser.ejs',
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
					subject: 'New User | COVID Tracking System',
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

module.exports = newUserEmail;

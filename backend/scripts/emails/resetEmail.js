// Mail Config
const emailConfig = require('./emailConfig');

// EJS
const ejs = require('ejs');

const resetEmail = (token, email) => {
	const changeUrl = `http://localhost:4200/change-password/${token}`;

	ejs.renderFile(
		'./views/mail/reset.ejs',
		{
			link: changeUrl,
		},
		(err, data) => {
			if (err) {
				console.log(`[ERROR: ${err}]`);
			} else {
				emailConfig(
					email,
					data,
					'Reset Password | COVID Tracking System'
				);
			}
		}
	);
};

module.exports = resetEmail;

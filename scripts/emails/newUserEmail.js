// Email Config
const emailConfig = require('./emailConfig');
// EJS
const ejs = require('ejs');

const newUserEmail = (token, email) => {
	const changeUrl = `http://localhost:4200/change-password/${token}`;

	ejs.renderFile(
		'./views/mail/newUser.ejs',
		{
			link: changeUrl,
		},
		(err, data) => {
			if (err) {
				console.log(`[ERROR: ${err}]`);
			} else {
				emailConfig(email, data, 'New User | COVID Tracking System');
			}
		}
	);
};

module.exports = newUserEmail;

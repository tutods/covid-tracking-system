// Email Config
const emailConfig = require('./emailConfig');

// EJS
const ejs = require('ejs');

const emailByData = (data, email) => {
	ejs.renderFile(
		'./views/mail/patientData.ejs',
		{
			patientData: data,
		},
		(err, data) => {
			if (err) {
				console.log(`[ERROR: ${err}]`);
			} else {
				emailConfig(email, data, 'Your patient data');
			}
		}
	);
};

module.exports = emailByData;

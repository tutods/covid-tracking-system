// Email Config
const emailConfig = require('./emailConfig');

// EJS
const ejs = require('ejs');

const autoScheduleEmail = (email, date, patient) => {
	const formatDate = (date) => {
		const shortDate = new Date(date);
		const year = shortDate.getFullYear();
		const month = ('0' + (shortDate.getMonth() + 1)).slice(-2);
		const day = ('0' + shortDate.getDate()).slice(-2);

		return [year, month, day].join('-');
	};

	ejs.renderFile(
		'./views/mail/autoScheduleEmail.ejs',
		{
			date: formatDate(date),
			name: patient.name,
		},
		(err, data) => {
			if (err) {
				console.log(`[ERROR: ${err}]`);
			} else {
				emailConfig(email, data, 'COVID Test - Auto Schedule');
			}
		}
	);
};
module.exports = autoScheduleEmail;

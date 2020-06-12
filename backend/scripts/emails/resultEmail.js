// Email Config
const emailConfig = require('./emailConfig');
// EJS
const ejs = require('ejs');

const resultEmail = (patient, covidTest) => {
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
				const file = [
					{
						filename: 'Test Result.pdf',
						path: covidTest.pathFile,
						contentType: 'application/pdf',
					},
				];

				emailConfig(
					patient.contacts.email,
					data,
					'COVID Test - Result',
					file
				);
			}
		}
	);
};

module.exports = resultEmail;

const patientsStatus = require('./patientsStatus.json');
const testsByDay = require('./testsByDay.json');
const testsByPatient = require('./testsByPatient.json');
const patientsGender = require('./patientsGender.json');
const numberSymptoms = require('./numberSymptoms.json');

const responses = {
	...patientsStatus,
	...testsByDay,
	...testsByPatient,
	...patientsGender,
	...numberSymptoms,
};

module.exports = responses;

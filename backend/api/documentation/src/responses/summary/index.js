const patientsStatus = require('./patientsStatus.json');
const testsByDay = require('./testsByDay.json');
const testsByPatient = require('./testsByPatient.json');

const responses = {
	...patientsStatus,
	...testsByDay,
	...testsByPatient,
};

module.exports = responses;

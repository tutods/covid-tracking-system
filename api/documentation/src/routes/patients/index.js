const patients = require('./patients.json');
const patient = require('./patient.json');

const routes = {
	...patients,
	...patient,
};

module.exports = routes;

const covidTests = require('./covidTests.json');
const covidTest = require('./covidTest.json');
const patient = require('./patient.json');

const routes = {
	...covidTests,
	...covidTest,
	...patient,
};

module.exports = routes;

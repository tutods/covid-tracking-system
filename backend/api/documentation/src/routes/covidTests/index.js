const covidTests = require('./covidTests.json');
const covidTest = require('./covidTest.json');

const routes = {
	...covidTests,
	...covidTest,
};

module.exports = routes;

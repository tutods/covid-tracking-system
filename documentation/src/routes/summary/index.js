const tests = require('./tests.json');
const patients = require('./patients.json');

const routes = {
	...tests,
	...patients,
};

module.exports = routes;

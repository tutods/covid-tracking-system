const users = require('./users');
const covidTests = require('./covidTests');
const patients = require('./patients');
const middlewares = require('./middlewares.json');

const params = {
	...users,
	...covidTests,
	...patients,
	...middlewares,
};

module.exports = params;

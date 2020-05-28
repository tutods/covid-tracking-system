const roles = require('./roles.json');
const users = require('./users');
const patients = require('./patients');
const covidTest = require('./covidTests');
const summary = require('./summary');

const routes = {
	...roles,
	...users,
	...patients,
	...covidTest,
	...summary,
};

module.exports = routes;

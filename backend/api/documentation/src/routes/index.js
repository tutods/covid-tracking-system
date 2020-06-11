const roles = require('./roles.json');
const users = require('./users');
const patients = require('./patients');
const covidTest = require('./covidTests');
const summary = require('./summary');
const apiCovid = require('./apiCovid.json');

const routes = {
	...roles,
	...users,
	...patients,
	...covidTest,
	...summary,
	...apiCovid,
};

module.exports = routes;

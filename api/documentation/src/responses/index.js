const userResponses = require('./users');
const defaultResponses = require('./default.json');
const rolesResponses = require('./roles.json');
const summaryResponses = require('./summary');
const covidTestsResponses = require('./covidTests');
const patientsResponses = require('./patients');
const apiCovid = require('./apiCovid.json');

const responses = {
	...userResponses,
	...rolesResponses,
	...defaultResponses,
	...summaryResponses,
	...covidTestsResponses,
	...patientsResponses,
	...apiCovid,
};

module.exports = responses;

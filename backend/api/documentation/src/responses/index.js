const userResponses = require('./users');
const defaultResponses = require('./default.json');
const rolesResponses = require('./roles.json');
const summaryResponses = require('./summary');
const covidTestsResponses = require('./covidTests');
const patientsResponses = require('./patients');

const responses = {
	...userResponses,
	...rolesResponses,
	...defaultResponses,
	...summaryResponses,
	...covidTestsResponses,
	...patientsResponses,
};

module.exports = responses;

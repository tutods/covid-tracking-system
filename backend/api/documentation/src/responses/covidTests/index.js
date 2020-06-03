const getAll = require('./getAll.json');
const getOne = require('./getOne.json');
const getByPatient = require('./getByPatient.json');

const responses = {
	...getAll,
	...getOne,
	...getByPatient,
};

module.exports = responses;

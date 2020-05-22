const getAll = require('./getAll.json');
const getOne = require('./getOne.json');

const responses = {
	...getAll,
	...getOne,
};

module.exports = responses;

const data = require('./data');
const id = require('./id.json');

const params = {
	...data,
	...id,
};

module.exports = params;

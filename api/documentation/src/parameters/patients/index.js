const id = require('./id.json');
const data = require('./data.json');

const params = {
	...data,
	...id,
};

module.exports = params;

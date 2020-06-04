const login = require('./login.json');
const change = require('./change.json');
const reset = require('./reset.json');
const data = require('./data.json');
const id = require('./id.json');
const update = require('./update.json');

const params = {
	...login,
	...change,
	...reset,
	...data,
	...id,
	...update,
};

module.exports = params;

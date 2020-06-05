const auth = require('./auth.json');
const users = require('./users.json');
const user = require('./user.json');
const update = require('./update.json');

const userRoutes = {
	...auth,
	...users,
	...user,
	...update,
};

module.exports = userRoutes;

const auth = require('./auth.json');
const users = require('./users.json');
const user = require('./user.json');

const userRoutes = {
	...auth,
	...users,
	...user,
};

module.exports = userRoutes;

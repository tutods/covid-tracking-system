const getOne = require('./getOne.json');
const getAll = require('./getAll.json');
const userNotFound = require('./userNotFound.json');
const login = require('./login.json');
const logout = require('./logout.json');
const resetPassword = require('./resetPassword.json');
const changePassword = require('./changePassword.json');
const session = require('./session.json');
const updatePassword = require('./updatePassword.json');

const responses = {
	...getOne,
	...getAll,
	...userNotFound,
	...login,
	...logout,
	...session,
	...resetPassword,
	...changePassword,
	...updatePassword,
};

module.exports = responses;

const jwt = require('jsonwebtoken');


const { SECRET = 'coV!d#19_$ystem$' } = process.env;

const sessionMiddleware = (req, res, next) => {
	const sessionToken = req.cookies.session;

	try {
		if (sessionToken) {
			const user = jwt.verify(sessionToken, SECRET);
			req.user = user;
		} else {
			req.user = null;
		}
	} catch (e) {
		// console.error(e)
		req.user = null;
	}
	next();
};

module.exports = sessionMiddleware;

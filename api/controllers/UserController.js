// ENV
require('dotenv').config();
const { SECRET = 'coV!d#19_$ystem$', EXPIRES = 1800000 } = process.env;

// Model
const User = require('../models/User');

// Packages
const jwt = require('jsonwebtoken');

const userController = () => {
	const login = async (req, res) => {
		const data = req.body;
		const bodyEmail = data.email;
		const bodyPwd = data.password;

		const userDB = await User.findOne({ email: bodyEmail });

		if (userDB) {
			let response = {};

			const validatePwd = await userDB.comparePassword(bodyPwd);

			if (validatePwd) {
				const user = {
					email: userDB.email,
					name: userDB.name,
					role: userDB.role.name,
					scopes: userDB.role.scopes,
				};
				const jwtT = jwt.sign(user, SECRET);

				res.cookie('session', jwtT, {
					expires: new Date(Date.now() + EXPIRES),
				});

				response.code = 200;
				response.auth = true;
				response.token = jwtT;
				response.message = '';
				response.user = user;
			} else {
				response.code = 401;
				response.auth = false;
				response.token = null;
				response.message = 'Invalid Credentials';
			}

			res.status(response.code).json({
				auth: response.auth,
				token: response.token,
				message: response.message,
				user: response.user || {},
			});
		} else {
			res.status(401).json({
				auth: false,
				token: null,
				message: 'Invalid Credentials',
				user: {},
			});
		}
	};

	const logout = (req, res) => {
		// Destroy cookie
		res.clearCookie('session').json({ success: true });
	};

	return { login, logout };
};

module.exports = userController();

// ENV
require('dotenv').config();
const { SECRET } = process.env;

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
					role: userDB.role,
				};

				const jwtT = jwt.sign({ user }, SECRET);

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

			res.status(response.code).send({
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

	return { login };
};

module.exports = userController();

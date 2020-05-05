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
			} else {
				response.code = 403;
				response.auth = false;
				response.token = null;
			}

			res.status(response.code).send({
				auth: response.auth,
				token: response.token,
			});
		} else {
			res.status(500).json({ message: 'Error on login data' });
		}
	};

	const register = (req, res) => {
		const data = req.body;

		new User(data).save((err, data) => {
			const response = err
				? { status: 500, body: err }
				: { status: 200, body: data };

			res.status(response.status).send(response.body);
		});
	};

	return { login, register };
};

module.exports = userController();

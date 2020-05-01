const User = require('../models/User');

const bcrypt = require('bcryptjs');

const userController = () => {
	const login = (req, res) => {
		const data = req.body;
		const email = data.email;
		const password = data.password;

		if (
			password == null ||
			email == null ||
			password == undefined ||
			email == undefined
		) {
			res.status(500).send({ status: 'Invalid data' });
		}

		User.findOne({ email: email }, (error, data) => {
			const pwdValidation = bcrypt.compare(
				password,
				data.password,
				(error, isMatch) => {
					if (error) {
						throw error;
					}

					return isMatch;
				}
			);

			console.log('PWD IS MATCH?', pwdValidation);

			// TODO Store login [JWT]
		});
	};

	const register = (req, res) => {
		const data = req.body;

		if (User.findOne({ email: data.email })) {
			res.status(500).send({ error: 'Email exist' });
		} else {
			new User(data).save((err, data) => {
				const response = err
					? { status: 500, body: err }
					: { status: 200, body: data };

				res.status(response.status).send(response.body);
			});
		}
	};

	return { login, register };
};

module.exports = userController();

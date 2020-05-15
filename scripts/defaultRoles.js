// Mongoose Connection
const mongoose = require('../config/mongoose');
const Role = require('../api/models/Role');
const User = require('../api/models/User');

mongoose
	.then(async (mongoose) => {
		const rolesList = require('./roles.json');

		try {
			const result = await Role.insertMany(rolesList);

			if (result) {
				const admin = await Role.findOne({ name: 'ADMIN' });

				const user = await new User({
					name: 'COVID Test',
					email: 'covidtrackingsystem@gmail.com',
					password: 'joaodanieljoao20',
					role: admin._id,
				}).save();

				if (user) {
					console.log('[ROLES AND USER INSERTED WITH SUCCESS]');
				}
			} else {
				console.log('[ROLES NOT INSERTED]');
			}
		} catch (error) {
			console.error(error);
		}

		process.exit();
	})
	.catch(console.error);

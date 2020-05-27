// ENV
require('dotenv').config();
const { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PWD } = process.env;

// Mongoose Connection
const mongoose = require('../config/mongoose');

// Models
const Role = require('../api/models/Role');
const User = require('../api/models/User');

mongoose
	.then(async (mongoose) => {
		const rolesList = require('./roles.json');

		try {
			console.log('[SETUP START]');

			await rolesList.map(async (role) => {
				const dbRole = await Role.findOne({ name: role.name });

				if (dbRole) {
					console.log(`[ROLE ${role.name} ALREADY EXIST]`);
				} else {
					await new Role(role).save();
					console.log(`[ROLE ${role.name} INSERTED ON DATABASE]`);
				}
			});

			const userExist = await User.findOne({
				email: 'covidtrackingsystem@gmail.com',
			});

			if (userExist) {
				console.log('[USER ALREADY EXISTS]');
			} else {
				const admin = await Role.findOne({ name: 'ADMIN' });

				await new User({
					name: ADMIN_NAME,
					email: ADMIN_EMAIL,
					password: ADMIN_PWD,
					role: admin._id,
				}).save();

				console.log('[USER INSERTED ON DATABASE]');
			}

			console.log('[SETUP DONE]');
		} catch (error) {
			console.error(error);
		}

		process.exit();
	})
	.catch(console.error);

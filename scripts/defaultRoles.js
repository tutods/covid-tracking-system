// Mongoose Connection
const mongoose = require('../config/mongoose');
const Role = require('../api/models/Role');

mongoose
	.then(async (mongoose) => {
		const rolesList = require('./roles.json');

		try {
			const result = await Role.insertMany(rolesList);

			console.log(result);
		} catch (error) {
			console.error(error);
		}

		process.exit();
	})
	.catch(console.error);

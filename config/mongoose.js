// Import Packages
require('dotenv').config();

const mongoose = require('mongoose');

// Get ENV variables - Object Destructuring ES6
const {
	MONGO_HOST = 'localhost',
	MONGO_PORT = 27017,
	MONGO_DB = 'covidSystem',
	MONGO_USER = null,
	MONGO_PASSWORD = null,
} = process.env;

const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

module.exports = mongoose.connect(
	url,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	},
	(error) => {
		const msg = error ? `[ERROR: ${error}]` : '[DATABASE CONNECTED]';

		console.log(msg);
	}
);

// Import Packages
require('dotenv').config();

const mongoose = require('mongoose');

// Get ENV variables - Object Destructuring ES6
const {
	MONGO_HOST = 'localhost',
	MONGO_PORT = 27017,
	MONGO_DB = 'covidSystem',
	MONGO_USER,
	MOGNO_PASS,
} = process.env;

const url = `mongodb+srv:://${MONGO_USER}:${MOGNO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?retryWrites=true&w=majority`;

// Enable debug mode if you need see queries
// mongoose.set('debug', true);

module.exports = mongoose.connect(
	url,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	(error) => {
		const msg = error ? `[ERROR: ${error}]` : '[DATABASE CONNECTED]';

		console.log(msg);
	}
);

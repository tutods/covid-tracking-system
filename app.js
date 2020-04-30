// Get ENV variables
const dotenv = require('dotenv');
const { PORT = 3000 } = process.env;

// Get Mongoose connection
require('./config/mongoose');

// Pacakges
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

// API Routes
const apiRoutes = require('./api/routes');

const app = express();

app
	// Cors
	.use(cors())

	// Set body-parser
	.use(bodyParser.json())

	// Routes
	.use('/api', apiRoutes)

	// PORT
	.listen(PORT, () => {
		console.log(`[SERVER RUNNING ON PORT ${PORT}]`);
	});

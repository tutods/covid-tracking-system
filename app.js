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
	// Static Files
	.use(express.static('./public'))

	// Cors
	.use(cors())

	// Set body-parser
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())

	// When need test what you receive
	// .use(function (req, res) {
	// 	res.setHeader('Content-Type', 'text/plain');
	// 	res.write('you posted:\n');
	// 	res.end(JSON.stringify(req.body, null, 2));
	// })

	// Routes
	.use('/api', apiRoutes)

	// PORT
	.listen(PORT, () => {
		console.log(`[SERVER RUNNING ON PORT ${PORT}]`);
	});

// Get ENV variables
require('dotenv').config();
const { PORT = 3000 } = process.env;

// Get Mongoose connection
require('./config/mongoose');

// Packages
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Swagger
const swaggerRouter = require('./documentation');

// Middlewares
const sessionMiddleware = require('./api/middlewares/session');
const errorHandler = require('./api/middlewares/errorHandler');

// API Routes
const apiRoutes = require('./api');

const app = express();

app
	// Static Files
	.use('/public', express.static('./public'))

	// Cookie Parser
	.use(cookieParser())

	// Cors
	.use(cors())

	// Swagger Documentation
	.use(swaggerRouter)

	// Set body-parser
	.use(bodyParser.json())

	// URL Encoded
	.use(express.urlencoded({ extended: true }))

	// When need test what you receive
	// .use(function (req, res) {
	// 	res.setHeader('Content-Type', 'text/plain');
	// 	res.write('you posted:\n');
	// 	res.end(JSON.stringify(req.body, null, 2));
	// })

	// Setup session middleware
	.use(sessionMiddleware)

	// Routes
	.use('/api', apiRoutes)

	// Error Handler Middleware
	.use(errorHandler)

	// PORT
	.listen(PORT, () => {
		console.log(`[SERVER RUNNING ON PORT ${PORT}]`);
	});

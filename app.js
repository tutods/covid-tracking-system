// Get ENV variables

const { PORT = 3000 } = process.env;

// Get Mongoose connection
require('./config/mongoose');

//Cronjob
require('./config/cronjob');

// Packages
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Swagger
const swaggerRouter = require('./api/documentation');

// Middlewares
const sessionMiddleware = require('./api/middlewares/session');
const errorHandler = require('./api/middlewares/errorHandler');

// API Routes
const apiRoutes = require('./api');

const app = express();

app
	// Static Files
	.use('/public', express.static('./public'))
	.use('/uploads', express.static('./uploads'))
	.use(
		express.static(
			path.join(__dirname, 'client', 'dist', 'webapp')
		)
	)

	// Cookie Parser
	.use(cookieParser())

	// Cors
	.use(cors())

	// Swagger Documentation
	.use(swaggerRouter)

	// Set body-parser
	.use(bodyParser.json({ limit: '50mb' }))

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

	// .get('/', (req, res) => {
	// 	res.redirect('http://localhost:4200');
	// })

	.use('/*', (req, res) => {
		try {
			res.sendFile(
				path.join(__dirname, 'client', 'dist', 'webapp', 'index.html')
			);
		} catch (err) {
			console.log(err);
		}
	})

	// Error Handler Middleware
	.use(errorHandler)

	// PORT
	.listen(PORT, () => {
		console.log(`[SERVER RUNNING ON PORT ${PORT}]`);
	});

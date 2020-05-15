// Get ENV variables
require('dotenv').config();
const { PORT = 3000 } = process.env;

// Get Mongoose connection
require('./config/mongoose');

// Swagger imports
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Options
const swaggerOptions = {
	swaggerDefinition: {
		basePath: '/api/',
		host: `localhost:${PORT}`,
		info: {
			title: 'COVID Tracking System',
			version: '1.0.0',
			description: 'API Documentation to COVID Tracking System project',
			servers: [`http://localhost:${PORT}`],
		},
	},
	apis: [
		'./documentation/auth.yaml',
		'./documentation/User/*.yaml',
		'./documentation/Role/*.yaml',
		'./documentation/CovidTest/*.yaml',
		'./documentation/Patient/*.yaml',
		'./documentation/Middlewares/*.yaml',
	],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Packages
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middlewares
const sessionMiddleware = require('./api/middlewares/session');

// API Routes
const apiRoutes = require('./api');

const app = express();

app
	// Swagger Documentation
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

	// Static Files
	.use('/public', express.static('./public'))

	// Cookie Parser
	.use(cookieParser())

	// Cors
	.use(cors())

	// Set body-parser
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())

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

	// PORT
	.listen(PORT, () => {
		console.log(`[SERVER RUNNING ON PORT ${PORT}]`);
	});

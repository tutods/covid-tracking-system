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
		'./documentation/User/*.yaml',
		'./documentation/Role/*.yaml',
		'./documentation/CovidTest/*.yaml',
		'./documentation/Patient/*.yaml',
	],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Packages
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

// API Routes
const apiRoutes = require('./api/routes');

const app = express();

app
	// Swagger Documentation
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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

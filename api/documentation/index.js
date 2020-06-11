// ENV

const { PORT = 3000 } = process.env;

// Express
const express = require('express');

// Swagger Router
const swaggerRouter = express.Router();

// Swagger UI
const swaggerUi = require('swagger-ui-express');

// Definitions
const schemas = require('./src/schemas');
const params = require('./src/parameters');
const routes = require('./src/routes');
const responses = require('./src/responses');

// Swagger Options
const options = {
	// Swagger Version
	swagger: '2.0',
	openAPI: '3.0.3',

	// Base Path & Host
	basePath: '/api/',
	host: `localhost:${PORT}`,

	// Info About the App
	info: {
		title: 'COVID Tracking System',
		version: '3.0.0',
		description: 'API Documentation to COVID Tracking System project',
		server: `http://localhost:${PORT}`,
	},

	// Definitions => Schemas
	definitions: schemas,

	// Routes
	paths: routes,

	// Responses
	responses: responses,

	// Parameters
	parameters: params,
};

// Swagger Documentation
swaggerRouter
	// Method to see Swagger Docs.
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options))

	// Method to see json of all documentation
	.get('/api-docs.json', function (req, res) {
		res.json(options);
	});

module.exports = swaggerRouter;

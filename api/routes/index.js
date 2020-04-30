// Import Express
const express = require('express');
const router = express.Router();

// Middlewares
const logger = require('../middlewares/logger');

router.use(logger);

router.get('/', (req, res, next) => {
	res.json({ status: 'ok' });
});

module.exports = router;

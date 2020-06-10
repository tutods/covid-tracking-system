const cron = require('node-cron');
const mongoose = require('mongoose');
const request = require('request');
const ApiCovid = require('../api/models/ApiCovid');

module.exports = cron.schedule('* * * * *', () => {
	request('https://api.covid19api.com/summary', async (err, res, body) => {
		console.log('[CRONJOB STARTED]');

		if (!err && body != 'You have reached maximum request limit.') {
			const json = JSON.parse(body);

			await ApiCovid.collection.drop();
			await new ApiCovid(json).save();
		}
		console.log('[CRONJOB ENDED]');
	});
});

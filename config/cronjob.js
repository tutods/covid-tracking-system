const cron = require('node-cron');
const mongoose = require('mongoose');
const request = require('request');
const ApiCovid = require('../api/models/ApiCovid');

module.exports = cron.schedule('*/15 * * * *', () => {
	request('https://api.covid19api.com/summary', async (err, res, body) => {
		console.log('[CRONJOB STARTED]');

		if (!err && body != 'You have reached maximum request limit.') {
			const json = JSON.parse(body);
			const all = await ApiCovid.find();

			if (await all[0]) {
				console.log('[CRONJOB - UPDATE]');
				await ApiCovid.findOneAndUpdate(all._id, json);
			} else {
				console.log('[CRONJOB - CREATE]');
				await new ApiCovid(json).save();
			}
		}
		console.log('[CRONJOB ENDED]');
	});
});

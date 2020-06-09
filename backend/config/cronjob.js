const cron = require('node-cron');
const mongoose = require('mongoose');
const request = require('request');
const ApiCovid = require('../api/models/ApiCovid');

module.exports = cron.schedule('*/15 * * * *', () => {
	request('https://api.covid19api.com/summary', (err, res, body) => {
		if (!err) {
			const json = JSON.parse(body);
			const api = new ApiCovid(json);
			mongoose.connection.db
				.listCollections({ name: 'apicovids' })
				.next(function (err, exists) {
					if (exists) {
						mongoose.connection.collections['apicovids'].drop();
					}
				});

			api.save();
		}
	});
});

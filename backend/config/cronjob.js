const cron = require('node-cron');
request = require('request-json');
const client = request.createClient('https://api.covid19api.com/');
const mongoose = require('mongoose');

const ApiCovid = require('../api/models/ApiCovid');

module.exports = cron.schedule('0,15,30,45 * * * *', () => {
	//https://api.covid19api.com/summary

	client.get('summary', function (err, res, body) {
		var str = JSON.stringify(body);
		var json = JSON.parse(str);
		var api = new ApiCovid(json);

		if (body != null) {
			mongoose.connection.db
				.listCollections({ name: 'apicovids' })
				.next(function (err, exists) {
					if (exists) {
						mongoose.connection.collections['apicovids'].drop();
					}
				});

			api.save((err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Updated');
				}
			});
		}
	});
});

const cron = require('node-cron');
request = require('request-json');
const client = request.createClient('https://api.covid19api.com/');
const mongoose = require('./mongoose');

module.exports = cron.schedule('* * * * *', () => {
	//https://api.covid19api.com/summary

	client.get('summary', function (err, res, body) {
		//console.log(body);
		console.log('a cada minuto');
	});
});

// Mongoose Package
const mongoose = require('mongoose');

var ApiCovidSchema = new mongoose.Schema({
	Global: {
		NewConfirmed: Number,
		TotalConfirmed: Number,
		NewDeaths: Number,
		TotalDeaths: Number,
		NewRecovered: Number,
		TotalRecovered: Number,
	},
	Countries: [
		{
			Country: String,
			CountryCode: String,
			Slug: String,
			NewConfirmed: Number,
			TotalConfirmed: Number,
			NewDeaths: Number,
			TotalDeaths: Number,
			NewRecovered: Number,
			TotalRecovered: Number,
			Date: String,
		},
	],
	Date: String,
});

module.exports = mongoose.model('ApiCovid', ApiCovidSchema);

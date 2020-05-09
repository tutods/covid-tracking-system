// UUID Package
const shortid = require('shortid');
shortid.characters(
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-@'
);

// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Patient model
const Patient = require('./Patient');

// Set Schema
const covidTestSchema = new Schema({
	code: {
		type: String,
		unique: true,
		default: '134a2i',
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Patient,
		validate: {
			validator: async function (data) {
				const patient = Patient.countDocuments({ _id: data });

				return patient;
			},
			message: (props) => `${props.value} is not a valid patient!`,
		},
		required: [true, 'Patient is required'],
	},
	notes: {
		type: String,
	},
	status: {
		type: String,
		enum: ['pending', 'inProgress', 'awaitingResult', 'finished'],
		default: 'pending',
		required: [true, 'The status is required'],
	},
	result: {
		type: String,
		enum: ['positive', 'negative', 'inconclusive'],
	},
	date: {
		type: Date,
		required: true,
	},
});

covidTestSchema.pre(/^(find|findOne|findOneAndUpdate)$/, function (next) {
	this.populate('patient');
	console.log(this.patient);
	next();
});

covidTestSchema.pre('save', function (next) {
	this.code = shortid.generate();

	next();
});

module.exports = mongoose.model('CovidTest', covidTestSchema);

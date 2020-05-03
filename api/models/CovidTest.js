// UUID Package
const shortid = require('shortid');
shortid.characters(
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-@'
);

// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Set Schema
const covidTestSchema = new Schema({
	code: {
		type: String,
		unique: true,
		default: '134a2i',
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Patient',
		required: true,
	},
	notes: {
		type: String,
	},
	status: {
		type: String,
		enum: ['pending', 'inProgress', 'finished', 'notRealized'],
		default: 'pending',
	},
	result: {
		type: String,
		enum: ['positive', 'negative', 'inconclusive'],
	},
	date: {
		type: Date,
		required: true,
	},
	meta: {
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		updatedAt: {
			type: Date,
		},
	},
});

// Not use arrow function because to use "this""
covidTestSchema.pre('save', function (next) {
	if (this.isNew) {
		this.code = shortid.generate();
		this.meta.createdAt = this.meta.updatedAt = Date.now();
	} else {
		this.meta.updatedAt = Date.now();
	}

	next();
});

module.exports = mongoose.model('CovidTest', covidTestSchema);

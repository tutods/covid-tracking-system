// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

//CovidTestModel
const covidTest = require('./CovidTest');

// Schema Options
const schemaOptions = {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
};

// Set Schema
const patientSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		birthdayDate: {
			type: Date,
			require: true,
		},
		patientNumber: {
			// N.º de Utente
			type: Number,
			require: true,
			unique: true,
		},
		status: {
			type: String,
			enum: ['Suspect', 'Infected', 'Non Infected'],
			default: 'Suspect',
		},
		contacts: {
			phone: {
				type: Number,
				minlength: 9,
				maxlength: 9,
				validate: {
					validator: function (data) {
						return /^\d{9}$/.test(data);
					},
					message: (props) =>
						`${props.value} is not a valid contact phone`,
				},
				require: [true, 'Patient contact require'],
				unique: true,
			},
			email: {
				type: String,
				validate: {
					validator: function (data) {
						return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data);
					},
					message: (props) => `${props.value} is not a valid email!`,
				},
				require: [true, 'Patient email require'],
				unique: true,
			},
		},
		symptoms: [
			{
				type: String,
				enum: [
					'cough',
					'fever',
					'shortness of breathe',
					'lack of smell',
					'lack of taste',
					'tiredness',
					'headaches',
					'diarrhea',
				],
			},
		],
		observations: {
			saude24: {
				type: Boolean,
				default: false,
			},
			riskGroup: {
				type: Boolean,
				default: false,
			},
			riskZone: {
				type: Boolean,
				default: false,
			},
		},
	},
	schemaOptions
);

patientSchema.methods.verifyObservations = function () {
	return (
		this.observations.saude24 ||
		this.observations.riskGroup ||
		this.observations.riskZone
	);
};

module.exports = mongoose.model('Patient', patientSchema);

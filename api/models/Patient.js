// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Set Schema
const patientSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	birthday_date: {
		type: Date,
		required: true,
    },
    patient_number:{
        type: Number,
        required: true,
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
            require: true,
            unique: true,
		},
		email: {
            type: String,
            require: true,
            unique: true,
		},
    },
    symptoms: [{
        type: String,
        enum: ['cough','fever','shortness of breathe','lack of smell','lack of taste','tiredness','burning eyes','headaches','diarrhea'],
    }],
    meta: {
		createdAt: {
			type: Date,
			default: Date.now(),
        }
    }
});


module.exports = mongoose.model('Patient', patientSchema);
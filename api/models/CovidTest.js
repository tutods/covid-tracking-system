// UUID Package
const shortid = require('shortid');
shortid.characters(
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-@'
);

//Patient model
const Patient = require('./Patient')

// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema Options
const schemaOptions = {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
};

// Set Schema
const covidTestSchema = new Schema(
	{
		code: {
			type: String,
			unique: true,
			default: '134a2i',
		},
		patient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Patient',
            validate: {
				validator: async function (data) {
					const patient = await Patient.countDocuments({ _id: data });

					return patient;
				},
				message: (props) => `${props.value} is not a valid Patient!`,
            },
            required: [true,'Patient is required'],
		},
		notes: {
			type: String,
		},
		status: {
			type: String,
			enum: ['pending', 'inProgress', 'finished', 'waitingResult'],
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
		pathFile: {
			type: String,
		},
	},
	schemaOptions
);

covidTestSchema.pre(/^(find|findOne|findOneAndUpdate)$/, function (next) {
    this.populate('patient');

    next();
});

covidTestSchema.pre('save', function (next) {
    this.code = shortid.generate();

    next();
});

module.exports = mongoose.model('CovidTest', covidTestSchema);

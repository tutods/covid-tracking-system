// UUID Package
const shortid = require('shortid');
shortid.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-@'
);

// Mongoose Package
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

// Patient model
const Patient = require('./Patient');

// Schema Options
const schemaOptions = {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
};

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
    },
    schemaOptions,
);


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
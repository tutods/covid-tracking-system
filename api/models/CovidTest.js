// UUID Package
const shortid = require('shortid');
shortid.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-@'
);

const schemaOptions = {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
};

// Mongoose Package
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

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

covidTestSchema.pre('save', function (next) {
	this.code = shortid.generate();

	next();
});

module.exports = mongoose.model('CovidTest', covidTestSchema);
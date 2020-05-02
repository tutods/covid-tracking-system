const status = {
    PENDING: 'Pending',
    INPROGRESS: 'In Progress',
    FINISHED: 'Finished',

}
// Mongoose Package
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

//remove after patient schema
//const patient = require('Patient.js');
const user = require('User.js');

// Set Schema
const covidTestSchema = new Schema({
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    //change after patient schema
    /*patient: {
		type: ,
		required: true,
    },*/
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
		this.meta.createdAt = this.meta.updatedAt = Date.now();
	} else {
		this.meta.updatedAt = Date.now();
	}
});

module.exports = mongoose.model('CovidTest', covidTestSchema);
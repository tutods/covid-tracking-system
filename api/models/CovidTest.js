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
        createdBy: {
            type: user,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedBy: {
            type: user,
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
    },
});

module.exports = mongoose.model('CovidTest', covidTestSchema);
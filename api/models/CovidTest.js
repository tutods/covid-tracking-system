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

//Https library that allows you to send requests on a function
const http = require('http');
const request = require('request');


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
        pathFile: {
            type: String,
        }
    },
    schemaOptions,
);

covidTestSchema.pre(/^(find|findOne|findOneAndUpdate)$/, function (next) {
    this.populate('patient');

    next();
});

covidTestSchema.pre('save', function (next) {
    this.code = shortid.generate();

    next();
});

covidTestSchema.post(/^(save|findOneAndUpdate)$/, async function (next) {
    /* const CovidTest = mongoose.model('CovidTest', covidTestSchema);
    const tests = CovidTest.find({patient: this.patient}).sort({ name: 1 });

    tests.map((test) =>{
        console.log(test)
    }) */

    console.log(this.populate('patient')._id)
    if (this.populate('patient')._id) {
        if (mongoose.Types.ObjectId.isValid(this.populate('patient')._id)) {
            const url = "http://localhost:3000/api/covid-tests/patient/" + this.populate('patient')._id;
            console.log(url)
            await http.get(url, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log(JSON.parse(data).explanation);
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
    }


});

module.exports = mongoose.model('CovidTest', covidTestSchema);
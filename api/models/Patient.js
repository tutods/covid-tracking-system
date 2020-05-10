// Mongoose Package
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

// Schema Options
const schemaOptions = {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
};

// Set Schema
const patientSchema = new Schema({
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
        symptoms: [{
            type: String,
            enum: [
                'cough',
                'fever',
                'shortness of breathe',
                'lack of smell',
                'lack of taste',
                'tiredness',
                'burning eyes',
                'headaches',
                'diarrhea',
            ],
        }, ],
    },
    schemaOptions,
);

module.exports = mongoose.model('Patient', patientSchema);
// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Set Schema
const roleSchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: ['ADMIN', 'TECHNIC'],
		unique: true,
	},
	scopes: [
		{
			type: String,
			enum: ['--view-all', '--create-all', '--edit-all', '--delete-all'],
			default: '--view-all',
		},
	],
});

module.exports = mongoose.model('Role', roleSchema);

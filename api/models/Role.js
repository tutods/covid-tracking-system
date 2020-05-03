// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Set Schema
/**
 * @swagger
 * definitions:
 *   Role:
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *         unique: true
 *       scopes:
 *         type: array
 *         items:
 *           type: string
 *           enum: ['--view-all', '--edit-all', '--delete-all']
 *           default: '--view-all'
 *           example:
 *             - '--view-all'
 *             - '--edit-all'
 */
const roleSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	scopes: [
		{
			type: String,
			enum: ['--view-all', '--edit-all', '--delete-all'],
			default: '--view-all',
		},
	],
});

module.exports = mongoose.model('Role', roleSchema);

// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Bcrypt Package
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// Set Schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role',
	},
	password: {
		type: String,
		required: true,
		unique: true,
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
userSchema.pre('save', function (next) {
	let user = this;

	if (user.isNew) {
		user.meta.createdAt = user.meta.updatedAt = Date.now();
	} else {
		user.meta.updatedAt = Date.now();
	}

	bcrypt.hash(user.password, salt, (error, hash) => {
		if (error) {
			return next(error);
		}

		user.password = hash;

		next();
	});
});

userSchema.pre('findOneAndUpdate', function (next) {
	if (this.getUpdate().password) {
		this.update(
			{},
			{
				password: bcrypt.hashSync(this.getUpdate().password, salt),
			}
		);
	}
	next();
});

module.exports = mongoose.model('User', userSchema);
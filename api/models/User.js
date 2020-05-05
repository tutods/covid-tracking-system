// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Mongoose Plugins
const autoPopulate = require('mongoose-autopopulate');

// Bcrypt Package
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

mongoose.plugin(autoPopulate);

// Set Schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		validate: {
			validator: function (data) {
				return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data);
			},
			message: (props) => `${props.value} is not a valid email!`,
		},
		required: [true, 'User email required'],
		unique: true,
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role',
		autopopulate: true,
	},
	password: {
		type: String,
		required: true,
		// TODO: same password appear error
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

userSchema.methods.comparePassword = async function (password, callback) {
	return await bcrypt.compare(password, this.password, callback);
};

module.exports = mongoose.model('User', userSchema, 'users');

// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Role = require('./Role');

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
		ref: Role,
		validate: {
			validator: async function (data) {
				const role = Role.countDocuments({ _id: data });

				return role;
			},
			message: (props) => `${props.value} is not a valid role!`,
		},
		required: [true, 'Role is required!'],
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

userSchema.pre(/^(find|findOne|findOneAndUpdate)$/, function (next) {
	this.populate('role');
	next();
});

// Not use arrow function because to use "this""
userSchema.pre('save', async function (next) {
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

userSchema.pre('findOneAndUpdate', async function (next) {
	let user = this;

	if (
		this.getUpdate().password != null ||
		this.getUpdate().password != undefined
	) {
		this.getUpdate().password = await bcrypt.hash(
			this._update.password,
			10
		);
	}

	next();
});

userSchema.methods.comparePassword = async function (password, callback) {
	return await bcrypt.compare(password, this.password, callback);
};

module.exports = mongoose.model('User', userSchema);

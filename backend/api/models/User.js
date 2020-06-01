// Mongoose Package
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Role = require('./Role');

// Bcrypt Package
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// Timestamps Options
const schemaOptions = {
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
};

// Set Schema
const userSchema = new Schema(
	{
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
			unique: [true, 'This email already exists'],
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
			minlength: 6,
			required: true,
			unique: true,
		},
	},
	schemaOptions
);

userSchema.pre(/^(find|findOne|findOneAndUpdate)$/, function (next) {
	this.populate('role');
	next();
});

// Not use arrow function because to use "this""
userSchema.pre('save', async function (next) {
	let user = this;

	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
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

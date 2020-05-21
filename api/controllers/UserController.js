// ENV
require('dotenv').config();
const { SECRET = 'coV!d#19_$ystem$', EXPIRES = 1800000 } = process.env;

// Model
const User = require('../models/User');

// Packages
const jwt = require('jsonwebtoken');

//Nodemailer
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');

const userController = () => {
	const login = async (req, res) => {
		const data = req.body;
		const bodyEmail = data.email;
		const bodyPwd = data.password;

		const userDB = await User.findOne({ email: bodyEmail });

		if (userDB) {
			let response = {};

			const validatePwd = await userDB.comparePassword(bodyPwd);

			if (validatePwd) {
				const user = {
					email: userDB.email,
					name: userDB.name,
					role: userDB.role.name,
					scopes: userDB.role.scopes,
				};
				const jwtT = await jwt.sign(user, SECRET);

				res.cookie('session', jwtT, {
					expires: new Date(Date.now() + EXPIRES),
				});

				response.code = 200;
				response.auth = true;
				response.token = jwtT;
				response.message = '';
				response.user = user;
			} else {
				response.code = 401;
				response.auth = false;
				response.token = null;
				response.message = 'Invalid Credentials';
			}

			res.status(response.code).json({
				auth: response.auth,
				token: response.token,
				message: response.message,
				user: response.user || {},
			});
		} else {
			res.status(401).json({
				auth: false,
				token: null,
				message: 'Invalid Credentials',
				user: {},
			});
		}
	};

	const resetPassword = async (req, res) => {
		const email = req.body.email;

		const user = await User.findOne({ email: email });

		if (user == null) {
			res.status(401).json({
				auth: false,
				token: null,
				message: 'Invalid Credentials',
			});
		} else {
			const jwtT = jwt.sign(user.email, SECRET);

			res.cookie('reset', jwtT, {
				expires: new Date(Date.now + 300000),
			});

			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'covidtrackingsystem@gmail.com',
					pass: 'joaodanieljoao20',
				},
			});

			ejs.renderFile(
				'./views/mail/reset.ejs',
				{
					link:
						'http://localhost:4200/changePassword/' +
						jwtT,
				},
				function (err, data) {
					if (err) {
						console.log(err);
					} else {
						var mainOptions = {
							from: 'covidtrackingsystem@gmail.com',
							to: email,
							subject: 'Covid-19',
							html: data,
						};

						transporter.sendMail(mainOptions, function (err, info) {
							if (err) {
								console.log(err);
							} else {
								console.log('Message sent: ' + info.response);
							}
						});
					}
				}
			);
		}
	};

	const changePassword = async (req, res) => {
		const token = req.params.token;
		const data = req.body;

		const cookie = req.cookies.reset;

		if (jwt.verify(token, SECRET) && cookie) {
			const newPassword = data.newPassword;
			const confirmPassword = data.confirmPassword;

			if (newPassword !== confirmPassword) {
				res.status(401).json({
					message: "Passwords d'ont match",
				});
			} else {
				const email = jwt.verify(token, SECRET);

				const user = await User.findOneAndUpdate(
					{ email: email },
					{ password: newPassword }
				);

				res.status(200).json({
					user: user,
					message: 'Password reset sucessfully !',
				});
			}
		} else {
			res.status(408).json({
				message: 'Token expire',
			});
		}
	};

	const logout = (req, res) => {
		// Destroy cookie
		res.clearCookie('session').json({ success: true });
	};

	return { login, logout, resetPassword, changePassword };
};

module.exports = userController();

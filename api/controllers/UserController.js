// ENV
require("dotenv").config();
const { SECRET = "coV!d#19_$ystem$", EXPIRES = 1800000 } = process.env;

// Model
const User = require("../models/User");

// Packages
const jwt = require("jsonwebtoken");

//Nodemailer
const nodemailer = require("nodemailer");

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
        const jwtT = jwt.sign(user, SECRET);

        res.cookie("session", jwtT, {
          expires: new Date(Date.now() + EXPIRES),
        });

        response.code = 200;
        response.auth = true;
        response.token = jwtT;
        response.message = "";
        response.user = user;
      } else {
        response.code = 401;
        response.auth = false;
        response.token = null;
        response.message = "Invalid Credentials";
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
        message: "Invalid Credentials",
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
        message: "Invalid Credentials",
      });
    } else {
      console.log("email encontrado:");

      console.log(user);

      const jwtT = jwt.sign(user.email, SECRET);

      res.cookie("reset", jwtT, {
        expires: new Date(Date.now + 300000),
      });

      var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "covidtrackingsystem@gmail.com",
          pass: "joaodanieljoao20",
        },
      });

      const mailOptions = {
        to: email,
        from: "covidtrackingsystem@gmail.com",
        subject: "Covid Tracking System Password Reset",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          "http://localhost:3000/api/users/changePassword/" +
          jwtT +
          "\n\n" +
		  "If you did not request this, please ignore this email and your password will remain unchanged.\n" +
		  "Best regards\n" +
		  "Covid Tracking System",
      };

      smtpTransport.sendMail(mailOptions, function (err) {
        console.log("HI:" + user.name);
        res.json({
          status: "success",
          message:
            "An e-mail has been sent to " +
            user.email +
            " with further instructions.",
        });
        done(err, "done");
      });
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
          {password: newPassword,}
        );
        res.status(200).json({
          user: user,
          message: "Password reset sucessfully !",
        });
      }
    }else{
		res.status(408).json({
			message: "Token expire"
		})
	}
  };

  const logout = (req, res) => {
    // Destroy cookie
    res.clearCookie("session").json({ success: true });
  };

  return { login, logout, resetPassword, changePassword };
};

module.exports = userController();

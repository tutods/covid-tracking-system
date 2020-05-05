const nodemailer = require("nodemailer");

const email = "covidtrackingsystem@gmail.com";
const pw = "joaodanieljoao20";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pw,
  },
});

const mailOptions = {
  from: email,
  to: "joaojon7@gmail.com",
  subject: "Email enviado com Node",
  text: "COVID-19",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
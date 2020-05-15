const nodemailer = require("nodemailer");
const email = "covidtrackingsystem@gmail.com";
const pw = "joaodanieljoao20";
const ejs = require("ejs");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pw,
  },
});

ejs.renderFile("./views/mail/reset.ejs", { name: "Stranger" }, function (
  err,
  data
) {
  if (err) {
    console.log(err);
  } else {
    var mainOptions = {
      from: email,
      to: "joaojon7@gmail.com",
      subject: "Covid-19",
      html: data,
    };
    console.log("html data ======================>", mainOptions.html);
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    });
  }
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'covidtrackingsystem@gmail.com',
    pass: 'joaodanieljoao20'
  }
});

var mailOptions = {
  from: 'covidtrackingsystem@gmail.com',
  to: 'joaojon7@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
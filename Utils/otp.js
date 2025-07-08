const nodemailer = require("nodemailer");
require('dotenv').config();
   const gmail = process.env.GMAIL;
   const pass = process.env.PASS;
   
const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmail,      
      pass: pass,     
    },
  });

  const mailOptions = {
    from: gmail,
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP for login is: <b>${otp}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {sendOtpMail};

const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com.email",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//         user: process.env.EMAIL_LOGIN, // generated ethereal user
//         pass: process.env.EMAIL_PASSWORD // generated ethereal password
//     },
//   });
const campaignCreationEmail = (email, body) => {
  const from = 'ceo@outsourceglobal.com'
  const to = email
  const subject = "NEW CAMPAIGNE"
  const textBody = body
  const messageType = 'basic'

  return { from, to, subject, textBody, messageType }
}


exports.campaignCreationEmail = campaignCreationEmail
// exports.transporter = transporter

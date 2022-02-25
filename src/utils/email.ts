/* eslint-disable prettier/prettier */
const nodemailer = require("nodemailer");
const { SocketLabsClient } = require('@socketlabs/email');
import Email from "@models/notification/email.model";

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

// const emailTemplate = (email_subject, message, receiver) => {
//   const from = 'hr@outsourceglobal.com'
//   const to = receiver
//   const subject = email_subject
//   const textBody = message
//   const messageType = 'basic'

//   return { from, to, subject, textBody, messageType }
// }

const emailTemplate = (email_subject, message, receiver) => {
  const from = 'hr@outsourceglobal.com'
  const to = receiver
  const subject = email_subject
  const text = message

  return { from, to, subject, text }
}

const sendEmail = async (email_subject, message, receiver, sender) => {
  const email = emailTemplate(email_subject, message, receiver)
  const sclient = await new SocketLabsClient(parseInt(process.env.SOCKETLABS_SERVER_ID), process.env.SOCKETLABS_INJECTION_API_KEY);

  await sclient.send(email).then(
      (response) => {
        const Payload = {
          message: message,
          subject: email_subject,
          email_id: receiver,
          model_name: "",
          sender: sender
        }
        Email.create(Payload);
        console.log(response)
      },
      (err) => {
          //Handle error making API call
          console.log(err);
      }
  );
}


export { campaignCreationEmail, emailTemplate, sendEmail };
// exports.transporter = transporter

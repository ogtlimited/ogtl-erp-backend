/* eslint-disable prettier/prettier */
import { emailTemplate } from '@utils/email';

export const sendEmail = (subject: string, message: string, receiver: string[]) => {
  const email = emailTemplate(subject, message, receiver);
  const mailgun = require('mailgun-js')({ apiKey: process.env.MAIL_GUN_KEY, domain: process.env.MAIL_GUN_DOMAIN });

  mailgun.messages().send(email, (error, body) => {
    if (error) console.log(error);
    else console.log(body);
  });
};

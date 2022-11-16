const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    user: "email", // generated ethereal user
    pass: "password", // generated ethereal password
    },
});
class SendMailToClient{
    public static send(from, to, subject, text, html){
        let info = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };
        return transporter.sendMail(info)
    }
}

export default SendMailToClient
        
                    
        
       
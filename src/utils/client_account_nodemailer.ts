const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
    user: "paige.hoeger@ethereal.email", // generated ethereal user
    pass: "TjNTTWTkCv1zeQpPKc", // generated ethereal password
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
        
                    
        
       
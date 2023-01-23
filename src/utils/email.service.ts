const { SocketLabsClient } = require('@socketlabs/email');
class EmailService {
    private static client = new SocketLabsClient(parseInt(process.env.SOCKETLABS_SERVER_ID),process.env.SOCKETLABS_INJECTION_API_KEY);
    private static emailConstructor(email, from='ERP@example.com', subject, textBody, htmlBody, mType='basic') {
        return {
          to: email,
          from: from,
          subject: subject,
          textBody: textBody,
          htmlBody: htmlBody,
          messageType: mType
        };
    }

    public static sendMail (to, from="ERP@example.com", subject, textBody, htmlBody, mType='basic'){
        return EmailService.client.send(EmailService.emailConstructor(to, from, subject, textBody, htmlBody, mType))
    }
}

export default EmailService;
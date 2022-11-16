const { SocketLabsClient } = require('@socketlabs/email');
class ClientEmail {
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
    public static sendMailToClient (to, from="ERP@example.com", subject, textBody, htmlBody, mType='basic'){
        return ClientEmail.client.send(ClientEmail.emailConstructor(to, from, subject, textBody, htmlBody, mType))
    }
}

export default ClientEmail;
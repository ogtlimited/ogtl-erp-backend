import EmailService from '@/utils/email.service';
import {
    introductoryMail
} from '@/utils/message';

class EmployeesMailingService {
    public async sendIntroductoryMail(employee_firstname, ogid, employee_email) {
        let url = ""
        if (process.env.NODE_ENV === "production") { url = "http://erp.outsourceglobal.com/dashboard" }
        else { url = "https://admin-erp-test.ogtlprojects.com/" }
        const { message, subject } = introductoryMail(employee_firstname, ogid, employee_email)
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}<a href=${url}>Click here to login</a>`
        EmailService.sendMail(employee_email, "hr@outsourceglobal.com", subject, message, body)
    }
}
export default EmployeesMailingService


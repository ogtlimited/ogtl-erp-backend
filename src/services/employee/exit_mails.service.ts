import EmailService from '@/utils/email.service';
import { resignationNotification, resignationStatus } from '@/utils/message';
class ExitMailService {
    public async sendResignationNotification(exitData, employeeModel) {
        try{
            const employeeDetails = await employeeModel.findOne({ _id: exitData.employee_id })
            const employeesFirstName = employeeDetails.first_name
                .charAt(0) + employeeDetails.first_name.toLowerCase().slice(1)
            const employeesOtherName = employeeDetails.last_name
                .charAt(0) + employeeDetails.last_name.toLowerCase().slice(1)
            const employeesFullname = `${employeesFirstName} ${employeesOtherName}`
            const ogId = employeeDetails.ogid
            const reports_to = employeeDetails.reports_to
            const leadsDetails = reports_to ? await employeeModel.findOne({ _id: reports_to }) : null
            const leadsFirstName = leadsDetails?.first_name
                .charAt(0) + leadsDetails?.first_name.toLowerCase().slice(1)
            const leadsOtherName = leadsDetails?.last_name
                .charAt(0) + leadsDetails?.last_name.toLowerCase().slice(1)
            const leadsFullname = `${leadsFirstName} ${leadsOtherName}`
            const leadsEmail = leadsDetails?.company_email
            const gender = employeeDetails.gender === "male" ? "his" : "her"
            // console.log("reports_to", gender)
            const { message, subject } = resignationNotification(leadsFullname, employeesFullname, ogId, exitData.reasons, gender)
            const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
            // EmailService.sendMail(leadsEmail, "hr@outsourceglobal.com", subject, message, body)
            EmailService.sendMail("snowdenmoses@gmail.com", "abubakarmoses@yahoo.com", subject, message, body)
        }catch(error){
            console.log(error)
        }
        
    }
    public async sendResignationStatusNotification(ExitData, status, employeeModel) {
        const leaveApplicant = await employeeModel.findOne({ _id: ExitData.employee_id })
        const formattedFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
        const { status_message, status_subject } = resignationStatus(formattedFirstName, status)
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${status_message}`
        // EmailService.sendMail(leaveApplicant.company_email, "hr@outsourceglobal.com", status_subject, status_message, body)
        EmailService.sendMail("abubakarmoses@yahoo.com", "snowdenmoses@gmail.com", status_subject, status_message, body)
    }
}
export default ExitMailService


import EmailService from '@/utils/email.service';
import { resignationNotification, resignationStatus } from '@/utils/message';
class ExitMailService {
    public async sendResignationNotificationToLeads(exitData, employeeModel) {
            const employeeDetails = await employeeModel.findOne({ _id: exitData.employee_id })
            const employeesFirstName = employeeDetails.first_name
                .charAt(0) + employeeDetails.first_name.toLowerCase().slice(1)
            const employeesOtherName = employeeDetails.last_name
                .charAt(0) + employeeDetails.last_name.toLowerCase().slice(1)
            const employeesFullname = `${employeesFirstName} ${employeesOtherName}`
            const ogId = employeeDetails.ogid
            let reports_to = employeeDetails.reports_to
            const gender = employeeDetails.gender === "male" ? "his" : "her"
            const array_of_reports_to_id = []
            while (reports_to != null) {
                array_of_reports_to_id.push(reports_to)
                const employeeRecord = await employeeModel.findOne({ _id: reports_to })
                reports_to = employeeRecord.reports_to
            }
            for (let i = 0; i < array_of_reports_to_id.length; i++) {
                const leadsDetails = await employeeModel.findOne({ _id: array_of_reports_to_id[i]})
                const leadsFirstName = leadsDetails?.first_name
                    .charAt(0) + leadsDetails?.first_name.toLowerCase().slice(1)
                const leadsOtherName = leadsDetails?.last_name
                    .charAt(0) + leadsDetails?.last_name.toLowerCase().slice(1)
                const leadsFullname = `${leadsFirstName} ${leadsOtherName}`
                const { message, subject } = resignationNotification(leadsFullname, employeesFullname, ogId, exitData.reason_for_resignation, gender)
                const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
                EmailService.sendMail("snowdenmoses@gmail.com", "hr@outsourceglobal.com", subject, message, body)
            }
    }
    public async sendResignationNotificationToHr(exitData, employeeModel) {
            const employeeDetails = await employeeModel.findOne({ _id: exitData.employee_id })
            const employeesFirstName = employeeDetails.first_name
                .charAt(0) + employeeDetails.first_name.toLowerCase().slice(1)
            const employeesOtherName = employeeDetails.last_name
                .charAt(0) + employeeDetails.last_name.toLowerCase().slice(1)
            const employeesFullname = `${employeesFirstName} ${employeesOtherName}`
            const ogId = employeeDetails.ogid
            const gender = employeeDetails.gender === "male" ? "his" : "her"
            const { message, subject } = resignationNotification("Human Resources", employeesFullname, ogId, exitData.reason_for_resignation, gender)
            const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
            EmailService.sendMail("snowdenmoses@gmail.com", "hr@outsourceglobal.com", subject, message, body)
            
    }
    public async sendResignationNotificationToResignee(ExitData, status, employeeModel) {
        const leaveApplicant = await employeeModel.findOne({ _id: ExitData.employee_id })
        const formattedFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
        const { status_message, status_subject } = resignationStatus(formattedFirstName, status)
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${status_message}`
        // EmailService.sendMail(leaveApplicant.company_email, "hr@outsourceglobal.com", status_subject, status_message, body)
        EmailService.sendMail("abubakarmoses@yahoo.com", "hr@outsourceglobal.com", status_subject, status_message, body)
    }
}
export default ExitMailService


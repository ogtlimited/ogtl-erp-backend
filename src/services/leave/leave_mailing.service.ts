import EmailService from '@/utils/email.service';
import { leadsLeaveNotificationMessage,
       leaveApplicationStatusMessage, 
       LeaveRejectionHrNotificationMessage,
       requestForLeaveModification,
       appealRejectedLeave
} from '@/utils/message';

class LeaveMailingService{
    public async sendPendingLeaveNotificationMail(applicant, employeeModel){
        const leaveApplicant = await employeeModel.findOne({_id: applicant.employee_id})
        const formattedLeaveApplicantFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
        const formattedLeaveApplicantOtherName = leaveApplicant.last_name.charAt(0) + leaveApplicant.last_name.toLowerCase().slice(1)
        const fullname = `${formattedLeaveApplicantFirstName} ${formattedLeaveApplicantOtherName}`
        const ogId = leaveApplicant.ogid
        const supervisor = applicant.leave_approver ? await employeeModel.findOne({_id: applicant?.leave_approver}): null
        const formattedSupervisorFirstName = supervisor?.first_name.charAt(0) + supervisor?.first_name.toLowerCase().slice(1)
        let url = ""
        if (process.env.development) { url = "http://localhost:3001/auth/login"}
        else if (process.env.production) { url = "http://erp.outsourceglobal.com/dashboard" }
        else { url = "https://admin-erp-test.ogtlprojects.com/" }
        const {message, subject} = leadsLeaveNotificationMessage(formattedSupervisorFirstName, fullname, ogId) 
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}<a href=${url}>Click here to login</a>`
        // EmailService.sendMail(supervisor.company_email, "hr@outsourceglobal.com", subject, message, body)
        EmailService.sendMail("abubakarmoses@yahoo.com", "hr@outsourceglobal.com", subject, message, body)
    }
    public async sendLeaveStatusNotificationMail(applicant, status, employeeModel){
        const leaveApplicant = await employeeModel.findOne({_id: applicant.employee_id})
        const formattedFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
        const {status_message, status_subject} = leaveApplicationStatusMessage(formattedFirstName, status)
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${status_message}`
        EmailService.sendMail("abubakarmoses@yahoo.com", "hr@outsourceglobal.com", status_subject, status_message, body)
        // EmailService.sendMail(leaveApplicant.company_email, "hr@outsourceglobal.com", status_subject, status_message, body)
    }

    public async sendRejectionNotificationToHr(applicant, employeeModel, recipientName,recipientEmail) {
        const leaveApplicant = await employeeModel.findOne({ _id: applicant.employee_id })
        const formattedLeaveApplicantFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
        const formattedLeaveApplicantOtherName = leaveApplicant.last_name.charAt(0) + leaveApplicant.last_name.toLowerCase().slice(1)
        const leaveApplicantsFullname = `${formattedLeaveApplicantFirstName} ${formattedLeaveApplicantOtherName}`
        const ogId = leaveApplicant.ogid
        const teamLead = applicant.leave_approver ? await employeeModel.findOne({ _id: applicant?.leave_approver }) : null
        const formattedLeadsFirstName = teamLead?.first_name.charAt(0) + teamLead?.first_name.toLowerCase().slice(1)
        const formattedLeadsOtherName = teamLead?.last_name.charAt(0) + teamLead?.last_name.toLowerCase().slice(1)
        const leadsFullname = `${formattedLeadsFirstName} ${formattedLeadsOtherName}`
        const { message, subject } = LeaveRejectionHrNotificationMessage(leadsFullname, leaveApplicantsFullname, ogId, recipientName)
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
        EmailService.sendMail(recipientEmail, "hr@outsourceglobal.com", subject, message, body)
    }
    public async requestForLeaveModificationMail(leads_fullname, applicant, reasons, applicantsMail) {
        const { message, subject } = requestForLeaveModification(leads_fullname, applicant, reasons)
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
        EmailService.sendMail(applicantsMail, "hr@outsourceglobal.com", subject, message, body)
    }
    public async appealRejectedLeaveMail(leads_fullname, applicant_full_name, ogId, reasons, leads_mail) {
        const { message, subject } = appealRejectedLeave(leads_fullname, applicant_full_name, ogId, reasons)
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
        EmailService.sendMail(leads_mail, "hr@outsourceglobal.com", subject, message, body)
    }
}
export default LeaveMailingService
      
 
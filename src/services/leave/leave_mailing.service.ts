import EmailService from '@/utils/email.service';
import { leadsLeaveNotificationMessage, leaveApplicationStatusMessage } from '@/utils/message';

class LeaveMailingService{
    public async sendPendingLeaveNotificationMail(applicant, employeeModel){
        const leaveApplicant = await employeeModel.findOne({_id: applicant.employee_id})
        const formattedLeaveApplicantFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
        const formattedLeaveApplicantOtherName = leaveApplicant.last_name.charAt(0) + leaveApplicant.last_name.toLowerCase().slice(1)
        const fullname = `${formattedLeaveApplicantFirstName} ${formattedLeaveApplicantOtherName}`
        const ogId = leaveApplicant.ogid
        const supervisor = applicant.leave_approver ? await employeeModel.findOne({_id: applicant?.leave_approver}): null
        const formattedSupervisorFirstName = supervisor?.first_name.charAt(0) + supervisor?.first_name.toLowerCase().slice(1)
        const {message, subject} = leadsLeaveNotificationMessage(formattedSupervisorFirstName, fullname, ogId) 
        const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
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

}
export default LeaveMailingService
      
 
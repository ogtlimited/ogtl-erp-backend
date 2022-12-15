/* eslint-disable prettier/prettier */
const terminationMessage = {
  message: "You have been terminated",
  subject: "Employee Termination"
}

const promotionMessage = {
  message: "You have been promoted",
  subject: "Employee Promotion"
}
const OfferMessage = {
  message: "We are pleased to inform you that you have been offered a Job, Please find attached the offer terms and conditions",
  subject: "Employment Offer Letter"
}
const acceptedOfferMessage ={
  message: "We are pleased to announce a new employee will be joining us, \n Please do the tasks necessary required to setup the employee. \n" +
    "1. Procurement should provide work tools & transportation arrangement \n" +
    "2. IT should setup employee (create emails, work credentials, Bitrix)\n" +
    "3. Facility should provide work station, chairs, lockers" +
    " Thank you.",
  subject: "New Employee"
}

const ticketingMessage ={
  message: "A ticket has been created.\n  Please attend at the soonest ",
  subject: "New Ticket"
}

const resolvedTicketingMessage ={
  message: "Your ticket has been resolved.\n Thank you for your patience",
  subject: "Ticket Resolved"
}

function offerMessageFunc(url) {
    const message = `We are pleased to inform you that you have been offered a Job, Please find attached the offer terms and conditions. ${url}`;
    const subject="Employment Offer Letter";
    return {
      message,
      subject
    }

}

function clientAccountActivationNotice(username, linkExpiresIn){
 const convertTodays = linkExpiresIn/86400
 const  message = "We are pleased to inform you that a client account has been created for you by Outsource Global Technology Limited."
 +"<br>" + " Please click on the link below to activate your account, and change your password. The link expires in "+convertTodays+" day(s)"
 +"<br><br>" + " Your username is: "+ username
 +"<br><br>"
  const subject = "Your Account Has Been Successfully Created"
  return {
    message,
    subject
  }
}

function birthdayMessage(first_name) {
 const message = "Dear "+first_name+","
  +"<br><br>" + " Happy Birthday!!!!!!"
  +"<br>" + " We wish you many fruitful years"
  +"<br><br>" + " Best regards"
  +"<br><br>"
  const subject = "Happy Birthday"
  return{
    message,
    subject
  }
 }

 function leaveApplicationStatusMessage(fullname, status) {
  const status_message = "Hello "+fullname+","
   +"<br><br>" + " Your leave application has been "+status+"."
   +"<br><br>" + " Best regards."
   +"<br><br>"
   const status_subject = "Leave Status"
   return{
    status_message,
    status_subject
   }
  }

  function leadsLeaveNotificationMessage(lead_fullname, applicant, ogId) {
    const message = "Hello "+lead_fullname+","
     +"<br><br>" + " You have a pending leave application from "+applicant+" with OGID "+ogId+"."
     +"<br><br>" + " Best regards."
     +"<br><br>"
     const subject = "Pending Leave"
     return{
       message,
       subject
     }
    }

 

const rejectionMessage = {
  message : "Thank you very much for attending the interview at Outsource Global Technologies Ltd"
  + "</br>" +"We regret to inform you that after careful consideration we must advise that you have not been succesful on this occasion"
  + "</br>" + "With best wishes as you continue your search for the right post and may we take this oppurtunity to wish you every success in your career"
  +"</br" +  "HR Team Outsource Global",

  subject: "Interview Results"
}

export { terminationMessage , promotionMessage, OfferMessage,acceptedOfferMessage,rejectionMessage, 
  offerMessageFunc, ticketingMessage,resolvedTicketingMessage,clientAccountActivationNotice, 
  birthdayMessage, leaveApplicationStatusMessage, leadsLeaveNotificationMessage};

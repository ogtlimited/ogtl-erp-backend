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

const rejectionMessage = {
  message : "Thank you very much for attending the interview at Outsource Global Technologies Ltd"
  + "</br>" +"We regret to inform you that after careful consideration we must advise that you have not been succesful on this occasion"
  + "</br>" + "With best wishes as you continue your search for the right post and may we take this oppurtunity to wish you every success in your career"
  +"</br" +  "HR Team Outsource Global",

  subject: "Interview Results"
}

export { terminationMessage , promotionMessage, OfferMessage,acceptedOfferMessage,rejectionMessage, offerMessageFunc, ticketingMessage,resolvedTicketingMessage};

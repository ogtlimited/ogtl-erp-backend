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

function offerMessageFunc(url) {
    const message = `We are pleased to inform you that you have been offered a Job, Please find attached the offer terms and conditions. ${url}`;
    const subject="Employment Offer Letter";

    return {
      message,
      subject
    }


}



export { terminationMessage , promotionMessage, OfferMessage,acceptedOfferMessage, offerMessageFunc};

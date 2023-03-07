/* eslint-disable prettier/prettier */
import  EmployeeService  from '@services/employee.service';
import EmployeeModel from '@models/employee/employee.model';
import LeaveApplicatonsModel from '@models/leave/application.model';
const csv = require('csv-parser');
const fs = require('fs');

class ImportService {
  
  private leaveModel = LeaveApplicatonsModel;
  private empS = new EmployeeService()


  public async importleaves(){
    const results = []
    const email_issues = []
    const issues = []
    let count = 0
    let emp_emails = {}
    try {
      await fs.createReadStream('src/imports/csvs/leaves_request_forms.csv')
      .pipe(csv())
      .on('data', async function (data) {
        
        try {
            const employee = await EmployeeModel.findOne({company_email: data['Email Address']}, {company_email:1})
              
            if (!employee){

              if(!emp_emails.hasOwnProperty(data['Email Address'])) {
                fs.appendFileSync('src/imports/csvs/email_issues.csv', `${data['Email Address']}\n`);
                emp_emails[data['Email Address']] = "exists"
              }            
          }
          else{
            if(!emp_emails.hasOwnProperty(data['Email Address'])) {
              fs.appendFileSync('src/imports/csvs/valid_emails.csv', `${data['Email Address']}\n`);
              emp_emails[data['Email Address']] = "exists"
            }
          }
        } catch (error) {
            console.log(error);
        }
      })
      .on('end', function () {
        console.log("done!!!!!!!!");
        return "results";
      });
      return "inserting records"
    } catch (error) {
        console.log(error);
    }
  }

  public async importLeavesReportTo(){

  }
}

export default ImportService;

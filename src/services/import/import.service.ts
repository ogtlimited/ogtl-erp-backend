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
        // console.log(data['Email Address']);
        // console.log(data);

        
        
        try {
            const employee = await EmployeeModel.findOne({company_email: data['Email Address']}, {company_email:1})
            count+=1
            // console.log(employee);
            
            if (!employee){

              if(!emp_emails.hasOwnProperty(data['Email Address'])) {
                fs.appendFileSync('src/imports/csvs/email_issues.csv', `${data['Email Address']}\n`);
                emp_emails[data['Email Address']] = "exists"
              }
                // console.log(data);
                
            //   data.status = 'active'
            //   delete data.reports_to
            //   delete data.department
            //   delete data.projectId
            //   delete data.isAdmin
            //   delete data.default_shift
            //   delete data.designation
            //   console.log(data.company_email);
            //   await this.EmployeeModel.create(data)
            // email_issues.push(employee)
            // await fs.createReadStream('src/imports/csvs/email_issues.csv')
            
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

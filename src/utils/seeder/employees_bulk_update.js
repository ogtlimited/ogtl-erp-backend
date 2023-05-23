
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dirname = require("path");
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const EmployeeModel = require("./employees_seeder.model")
dotenv.config({ path: dirname + "../../.env" });

mongoose
    .connect(process.env.databaseUrl, {

    })
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log("DB Connection Failed", error.message));
const updateEmployeesReportsTo = async () => {
    try {
        fs.createReadStream("./src/utils/seeder/reports_to.csv")
            .pipe(csv())
            .on('data', async (data) => {
                const leadsData = await EmployeeModel.findOne({ company_email: data['reports_to'] })
                if (leadsData){
                    const employee = await EmployeeModel.findOneAndUpdate(
                        { company_email: data['company_email'] },
                        {
                            $set: {
                                reports_to: leadsData._id
                            }
                        }
                    )
                    if (!employee){
                        fs.appendFileSync('./src/utils/seeder/csv/employees_emails_with_issues.csv', `${data['company_email']}\n`);
                    }
                    console.log(employee)
                }
                else{
                    fs.appendFileSync('./src/utils/seeder/csv/leads_email_with_issues.csv', `${data['reports_to']}\n`);
                }
            })
            .on('end',async () => {
            })
        }
    catch (error) {
        console.log(error.message);
    }
};
const updateEmployeesIsLeadership = async () => {
    try {
        fs.createReadStream("./src/utils/seeder/csv/leaders.csv")
            .pipe(csv())
            .on('data', async (data) => {
                    const employee = await EmployeeModel.findOneAndUpdate(
                        { company_email: data['OG EMAIL'] },
                        {
                            $set: {
                                isLeadership: true
                            }
                        }
                    )
                    if (!employee){
                        fs.appendFileSync('./src/utils/seeder/csv/employees_emails_with_issues.csv', `${data['OG EMAIL']}\n`);
                    }
                }
            )
            .on('end',async () => {
            })
        }
    catch (error) {
        console.log(error.message);
    }
};
updateEmployeesIsLeadership()
// updateEmployeesReportsTo()

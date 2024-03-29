
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dirname = require("path");
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const EmployeeModel = require("./employees_seeder.model")
const campaignModel = require("./campaign_seeder.model")
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
}
const updateEmployeesCampaign = async () => {
    try {
        fs.createReadStream("./src/utils/seeder/csv/Flutterwave.csv")
            .pipe(csv())
            .on('data', async (data) => {
                    const campaign = await campaignModel.findOne({ project_name: data['Campaign'] })
                    const employee = await EmployeeModel.findOneAndUpdate(
                        { ogid: data['OG ID'] },
                        {
                            $set: {
                                projectId: campaign.id,
                                leaveApprovalLevel: data['DESIGNATION'] === 'Supervisor' ? 2 : data['DESIGNATION'] === 'Team Lead' ? 1 : 0,
                                leaveCount: 8
                            }
                        }
                    )
                    if (!employee){
                        fs.appendFileSync('./src/utils/seeder/csv/employees_emails_with_issues.csv', `${data['OG ID']}\n`);
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
const updateEmployeesStrictAttendance = async () => {
    try {
        fs.createReadStream("./src/utils/seeder/csv/nonStrictShift.csv")
            .pipe(csv())
            .on('data', async (data) => {
                    const employee = await EmployeeModel.findOneAndUpdate(
                        { company_email: data['Employee email'] },
                        {
                            $set: {
                                strictAttendance: false
                            }
                        }
                    )
                    if (!employee){
                        fs.appendFileSync('./src/utils/seeder/csv/employees_emails_with_issues.csv', `${data['Employee email']}\n`);
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
// updateEmployeesStrictAttendance()
// updateEmployeesIsLeadership()
// updateEmployeesReportsTo()
updateEmployeesCampaign()

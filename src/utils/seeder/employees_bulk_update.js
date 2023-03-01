
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
    const employeesInfo = []
    let arraysOfLeadsEmails = []
    let arraysOfEmployeesEmails = []
    try {
        fs.createReadStream("./src/utils/seeder/reports_to.csv")
            .pipe(csv())
            .on('data', (data) => {
                employeesInfo.push(data)
                arraysOfLeadsEmails = employeesInfo.map(employee => employee.reports_to)
                arraysOfEmployeesEmails = employeesInfo.map(employee => employee.company_email)
            
            })
            .on('end',async () => {
                let leadsDetails = []
                for (let i = 0; i < arraysOfLeadsEmails.length; i++){
                    records = await EmployeeModel.findOne({
                        'company_email': arraysOfLeadsEmails[i]
                });
                leadsDetails.push(records)
                }

                let employeesDetails = []
                for (let i = 0; i < arraysOfEmployeesEmails.length; i++) {
                    records = await EmployeeModel.findOne({
                        'company_email': arraysOfEmployeesEmails[i]
                    });
                    employeesDetails.push(records)
                }

                for (let i = 0; i < employeesDetails.length; i++){
                    await EmployeeModel.findOneAndUpdate(
                        { _id: employeesDetails[i]?._id},
                        {
                            $set: {
                                reports_to: leadsDetails[i]?._id
                            }
                        }
                    )}
                }
            );
        
        }
    catch (error) {
        console.log(error.message);
    }
};
 updateEmployeesReportsTo()

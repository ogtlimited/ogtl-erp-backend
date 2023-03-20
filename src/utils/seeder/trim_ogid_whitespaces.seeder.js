
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dirname = require("path");
const csv = require('csv-parser')
const fs = require('fs')
const EmployeeModel = require("./employees_seeder.model")
dotenv.config({ path: dirname + "../../.env" });

mongoose
    .connect(process.env.databaseUrl, {

    })
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log("DB Connection Failed", error.message));
const trimOgIdWhitespaces = async () => {
    try {
        const employees = await EmployeeModel.find();
        for (let i = 0; i < employees.length; i++) {
            const ogId = employees[i].ogid;
            const trimmedOgId = ogId.replace(/ /g, '')
            await EmployeeModel.findOneAndUpdate({ ogid: ogId }, {
                $set:{
                    ogid: trimmedOgId
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
console.log("Done!!!!")
};
// const removeDashFromOgId = async () => {
//     try {
//         const employees = await EmployeeModel.find();
//         for (let i = 0; i < employees.length; i++) {
//             if(employees[i].ogid.includes("-")){
//                 const ogId = employees[i].ogid
//                 const cleanOgId = ogId.replace(/-/g, '')
//                 await EmployeeModel.findOneAndUpdate({ ogid: ogId }, {
//                     $set: {
//                         ogid: cleanOgId
//                     }
//                 });
//             }
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
//     console.log("Done!!!!")
// };
// removeDashFromOgId()
trimOgIdWhitespaces()



const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dirname = require("path");
const EmployeeModel  = require("./employee.model")
const ApplicationModel = require("./leave_application.model")
const leaveTypeModel = require("./leave_type.model")
dotenv.config({ path:dirname+"../../.env"});

mongoose
  .connect(process.env.databaseUrl, {
    
  })
  .then(() => {
    console.log('DB connected')
  })
  .catch((error) => console.log("DB Connection Failed", error.message));
const getEmployees = async () => {
    const leave_status = ["approved","pending","rejected"]
    const leave_type_id =  await leaveTypeModel.find()
    const formatted_leave_type_id = leave_type_id.map(leave_type=>leave_type._id)
    let payload = {}
    let random_leave_status =""
    let random_leave_type_id = ""
  try {
   const employees = await EmployeeModel.find().limit(60).skip(100);
   for(let i=0; i<employees.length; i++){
      random_leave_status = leave_status[Math.floor(Math.random() * leave_status.length)];
      random_leave_type_id = formatted_leave_type_id[Math.floor(Math.random() * leave_type_id.length)];
      payload = {
      to_date:"2023-01-12T13:15:16.864Z",
      from_date:"2022-12-30T13:15:16.864Z",
      leave_type_id : random_leave_type_id, 
      department_id : employees[i].department,
      employee_id : employees[i]._id,
      leave_approver : employees[i].reports_to,
      acted_on: true,
      status: random_leave_status,
      hr_stage: true
    }
    await ApplicationModel.insertMany(payload);
   }
  } catch (error) {
    console.log(error.message);
  }
};
// getEmployees()

/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import NotificationHelper from '@/utils/helper/notification.helper';

const employeeSchema: Schema = new Schema(
  {
    ogid: {
      type: String,
      required: true,
      unique: true,
    },
    company_email: {
      type: String,
      unique: true,
    },
    date_of_joining: {
      type: Date,
      required: true,
    },
    default_shift: {
      type: Schema.Types.ObjectId,
      ref: 'ShiftType',
      default: null,
    },
    department:  {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      default: null,
    },
    password:  {
      type: String,
    },
    designation: {
      type: Schema.Types.ObjectId,
      ref: 'Designation',
      default: null,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      default: null,
    },
    salaryStructure_id: {
      type: Schema.Types.ObjectId,
      ref: 'SalaryStructure',
      default: null,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      default: null,
    },
    employeeType: {
      type: String,
      enum: ["Apprentice","Intern","Commission","Contract","Probation","PartTime","FullTime", "Corper"]
    },
    first_name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    isTeamLead: {
      type: Boolean,
      default: false
    },
    isExpatriate: {
      type: Boolean,
      default: false
    },
    isSupervisor: {
      type: Boolean,
      default: false
    },
    gender: {
      type: String,
      enum: ["male", "female", "Not Set"],
    },
    image: {
      type: String,
    },
    last_name: {
      type: String,
      required: true,

    },
    middle_name: {
      type: String,
    },
    leaveCount: {
      type: Number,
      default: 0
    },
    reports_to: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      default: null
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "terminated", "left"]
    },
    permissionLevel: {
      type: Number,
    },
    warningCount:{
      type: Number,
      default:0,
    },
    isRepSiever:{
      type: Boolean,
      default: false
    },
    sievedApplicationCount:{
      type: Number,
      default:0,
    },
    isInPIP:{
      type: Boolean,
      default: false,
    },
    isLeaverApprover:{
      type: Boolean,
      default: false,
    }
  }
);

// employeeSchema.virtual('full_name').get(function () {
//   return this.first_name + ' ' + this.last_name;
// });

// employeeSchema.pre('save', function (this: Employee, next) {

//   this.day_of_birth = this.dob.getDate();
//   this.month_of_birth = this.dob.getMonth() + 1;
//   next();
// });
employeeSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
employeeSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
employeeSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

const EmployeeModel = model<Employee & Document>('Employee', employeeSchema);

export default EmployeeModel;

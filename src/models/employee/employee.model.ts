/* eslint-disable prettier/prettier */
import { Employee } from '@interfaces/employee-interface/employee.interface';
import { model, Schema, Document } from 'mongoose';

const employeeSchema: Schema = new Schema(
  {
    ogid: {
      type: String,
      required: true,
      unique: true,
    },
    company_email: {
      type: String,
      required: true,
      unique: true,
    },
    date_of_joining: {
      type: Date,
      required: true,
    },
    default_shift: {
      type: Schema.Types.ObjectId,
      ref: 'Shift',
      default: null,
    },
    department:  {
      type: String,
      enum: ["HR", "Account", "Operations", "Facilities", "IT"],
    },
    password:  {
      type: String,
      required: true,
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
    first_name: {
      type: String,
      required: true,
    },
    employment_type: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
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
    reports_to: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "terminated", "left"]
    },
    permissionLevel: {
      type: Number,
    },
    warningCount:{
      type: Number,
      default:0,
    },
    isInPIP:{
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


const EmployeeModel = model<Employee & Document>('Employee', employeeSchema);

export default EmployeeModel;

/* eslint-disable prettier/prettier */
import { Employee } from '@interfaces/employee-interface/employee.interface';
import { model, Schema, Document } from 'mongoose';

const employeeSchema: Schema = new Schema(
  {
    ogId: {
      type: String,
      required: true,
      unique: true,
    },
    // admin_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Employee",
    //   default: null,
    // },
    fingerprint_details: {
      finger_id: String,
      date_created: Date,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    company_email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    day_of_birth: {
      type: Number,
      default: null,
    },
    month_of_birth: {
      type: Number,
      default: null,
    },
    campaign_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'Campaign',
      default: null,
    },
    branch_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'Branch',
      default: null,
    },
    designation_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'Designation',
      default: null,
    },
    employment_type_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'EmploymentType',
      default: null,
    },
    health_insurance_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'Health_Insurance',
      default: null,
    },
    shift_type_id: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'Shift_type',
      default: null,
    },
    is_admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    profile_pic: {
      type: String,
      default: null,
    },
    password_reset_count: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

employeeSchema.virtual('full_name').get(function () {
  return this.first_name + ' ' + this.last_name;
});

// employeeSchema.pre('save', function (this: Employee, next) {

//   this.day_of_birth = this.dob.getDate();
//   this.month_of_birth = this.dob.getMonth() + 1;
//   next();
// });


const userModel = model<Employee & Document>('Employee', employeeSchema);

export default userModel;

const {Schema, model} = require("mongoose");
  const employeeSchema = new Schema({
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
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      default: null,
    },
    password: {
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
      enum: ['Apprentice', 'Intern', 'Commission', 'Contract', 'Probation', 'PartTime', 'FullTime', 'Corper'],
    },
    first_name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    isTeamLead: {
      type: Boolean,
      default: false,
    },
    isExpatriate: {
      type: Boolean,
      default: false,
    },
    isSupervisor: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'Not Set'],
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
      default: 0,
    },
    reports_to: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'terminated', 'left'],
    },
    permissionLevel: {
      type: Number,
    },
    warningCount: {
      type: Number,
      default: 0,
    },
    isRepSiever: {
      type: Boolean,
      default: false,
    },
    isLeadership: {
      type: Boolean,
      default: false,
    },
    sievedApplicationCount: {
      type: Number,
      default: 0,
    },
    isInPIP: {
      type: Boolean,
      default: false,
    },
    isLeaverApprover: {
      type: Boolean,
      default: false,
    },
  
    socialHandle: {
      type: Object,
      default: {},
    },
    extraTime:{
      type:Boolean,
      default:false
    }
  });

  const EmployeeModel = model('Employee', employeeSchema);
  module.exports = EmployeeModel
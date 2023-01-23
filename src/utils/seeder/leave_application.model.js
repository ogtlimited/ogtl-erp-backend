
const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");
 
const applicationSchema = new Schema (
  {
      employee_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Employee",
      },
      project_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
      },
      department_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Department",
      },
      leave_type_id:{
          type: mongoose.Schema.Types.ObjectId,
          required: true,
      ref: "LeaveType",
      },
      from_date:{
          type: Date,
          required: true,
      },
      to_date : {
          type: Date,
          required: true,
      },
      leave_approver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
      },
      approval_level: {
          type: Number,
          default: 1,
          required: true,
      },
      reason_for_application: String,
      status: {
          type: String,
          enum: ['pending','rejected','cancelled', 'approved'],
          default : 'pending',
          required: true,
      },
      rejection_reason: String,
      hr_stage: {
          type: Boolean,
          default: false,
          required: true,
      },
      acted_on: {
          type: Boolean,
          default: false,
          required: true,
      }
  },
  {
      timestamps:true
  },

);

const ApplicationModel = model('LeaveApplication', applicationSchema);
module.exports = ApplicationModel
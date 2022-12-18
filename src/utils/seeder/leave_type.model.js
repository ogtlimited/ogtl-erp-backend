
const {Schema, model} = require("mongoose");
const LeaveTypeSchema = new Schema (
  {
      leave_type: {
          type: String,
          required: true
      }
  },
  {
      timestamps:true
  }
);

const LeaveTypeModel = model('LeaveType', LeaveTypeSchema);
  module.exports = LeaveTypeModel
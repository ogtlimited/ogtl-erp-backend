/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';

const applicationSchema : Schema = new Schema (
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
        },
        list_of_approvers: {
            type: [String],
            default: []
        },
        first_approver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
        },
        isAppealled: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps:true
    },

);

applicationSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
applicationSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
applicationSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});


const applicationModel = model('LeaveApplication', applicationSchema);

export default applicationModel;

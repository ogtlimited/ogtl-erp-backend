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
            required: true,
            ref: "Project",
        },
        deparment_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Department",
        },
        leave_type_id:{
            type: String,
            enum:["Annual","Casual","Sick","Without Pay","Maternity"],
            required: true,
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
            required: true,
            ref: "Employee",
        },
        approval_level: {
            type: Number,
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


const applicationModel = model<ILeaveApplication & Document>('LeaveApplication', applicationSchema);

export default applicationModel;

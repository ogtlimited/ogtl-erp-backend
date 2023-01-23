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
        employee_project_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Project",
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
        posting_date: {
            type: Date,
        },

        reason: {
            type: String,
        },

        status: {
            type: String,
            enum: ['open','approved by supervisor','rejected','cancelled', 'approved', 'rejected by supervisor'],
            default : 'open',
        },


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

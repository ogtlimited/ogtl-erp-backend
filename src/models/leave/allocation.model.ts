/* eslint-disable prettier/prettier */
import { ILeaveAllocation } from '@/interfaces/leave-interface/allocation.interface';
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';

const allocationSchema : Schema = new Schema (
    {
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
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

        new_leaves_allocation:{
            type: String,
        },

        add_unused_leaves: {
            type: Boolean,
            default : true
        },
    },

    {
        timestamps:true
    },

);
allocationSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
allocationSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
allocationSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const allocationModel = model<ILeaveAllocation & Document>('LeaveAllocation', allocationSchema);

export default allocationModel;

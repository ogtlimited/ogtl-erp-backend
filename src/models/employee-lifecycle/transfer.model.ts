/* eslint-disable prettier/prettier */
import { ITransfer } from '@interfaces/employee-lifecycle/transfer.interface';
import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';

const transferSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department"
    },
    branch:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch"
    },
    transferDetails:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "TransferDetails"
    },
    transferDate: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
  },
);
transferSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});

transferSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
transferSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

const transferModel = model<ITransfer & Document>('Transfer', transferSchema);
export default transferModel;

/* eslint-disable prettier/prettier */
import { ITermination } from '@interfaces/employee-lifecycle/termination.interface';
import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';

const terminationSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },

    reason: {
      type: String,
      required: true,
    },
    terminationDate: {
        type: Date,
        required: true,
      },

    terminationType: {
      type: String,
      required: true,
      enum:["misconduct","others"]
    },
  },
  {
    timestamps: true,
  },
);

terminationSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
terminationSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
terminationSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});


const terminationModel = model<ITermination & Document>('Termination', terminationSchema);
export default terminationModel;

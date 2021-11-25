/* eslint-disable prettier/prettier */
import { ITask } from '@interfaces/task/task.interface';
import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';

const taskSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  },
  {
    timestamps: true,
  },
)
// taskSchema.post('save', function(doc) {
//   const self: any = this;
//   console.log(self.constructor.modelName)
//   new NotificationHelper(self.constructor.modelName, "SAVE").exec()
// });
// taskSchema.post('update', function(doc) {
//   const self: any = this;
//   console.log(self.constructor.modelName)
//   new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
// });
// taskSchema.post('delete', function(doc) {
//   const self: any = this;
//   console.log(self.constructor.modelName)
//   new NotificationHelper(self.constructor.modelName, "DELETE").exec()
// });
const taskModel = model<ITask & Document>('Task', taskSchema);

export default taskModel;

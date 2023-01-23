/* eslint-disable prettier/prettier */
// import { Idepartment } from '@interfaces/department-interface/department-interface';
import { model, Schema,Document } from 'mongoose';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';
import NotificationHelper from '@/utils/helper/notification.helper';

const departmentSchema: Schema = new Schema(
  {
    department: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  },
);

departmentSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
departmentSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
departmentSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const departmentModel = model<IDepartment & Document>('Department', departmentSchema);
export default departmentModel;

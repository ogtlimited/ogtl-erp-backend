/* eslint-disable prettier/prettier */
import {roleAssignment} from '@/interfaces/role/role-assignment.interface';
import NotificationHelper from '@/utils/helper/notification.helper';
import { model, Schema, Document } from 'mongoose';

const RoleAssignmentSchema: Schema = new Schema(
    {
        
          RoleId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref : "Role"

          },
          assigned_to: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",

          },
          assigned_by: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",

          },
          
         

    },
    {
        timestamps: true,
    },
);

RoleAssignmentSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
RoleAssignmentSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
RoleAssignmentSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const RoleAssignmentModel = model<RoleAssignment & Document>('RolesAssignment', RoleAssignmentSchema);

export default RoleAssignmentModel;

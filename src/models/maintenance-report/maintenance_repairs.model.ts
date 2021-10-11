/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import { IMaintenanceAndRepairs } from '@interfaces/maintenance-report/maintenance_repairs.interface';
import NotificationHelper from '@utils/helper/notification.helper';

const maintenanceAndRepairsSchema: Schema = new Schema(
  {
    asset_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Assets",
    },
    issue:{
      type: String,
      required:true,
    },
    date_of_maintenance:{
      type: Date,
      required:true
    },
    amount:{
      type: Number,
    },
    status:{
      type: String,
      enum: ["Draft","Approved by Accountant","Approved By COO","Approved By CEO","Rejected"],
      default: "Draft"
    },
     type:{
      type: String,
      enum: ["Repairs","Maintenance"],
    },

  },
  {
    timestamps: true,
  },
)
maintenanceAndRepairsSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
maintenanceAndRepairsSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
maintenanceAndRepairsSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const maintenanceAndRepairModel = model<IMaintenanceAndRepairs & Document>('MaintenanceAndRepair',maintenanceAndRepairsSchema)
export default maintenanceAndRepairModel

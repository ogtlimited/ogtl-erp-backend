/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import {IMaintenanceReport} from '@interfaces/maintenance-report/maintenance_report.interface';
import NotificationHelper from '@utils/helper/notification.helper';

const maintenanceReportSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required:true,
    },
    date_of_report:{
      type: Date,
      required:true
    },
    created_by:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    issues:{
      type: String,
      required:true,
    },
    recommendation:{
      type: String,
      required:true,
    }
  },
  {
    timestamps: true,
  },
)
maintenanceReportSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
maintenanceReportSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
maintenanceReportSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const maintenanceReportModel = model<IMaintenanceReport & Document>('MaintenanceReport',maintenanceReportSchema)
export default maintenanceReportModel

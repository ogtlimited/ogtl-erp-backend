/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import {IMaintenanceReport} from '@interfaces/maintenance-report/maintenance_report.interface';

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

const maintenanceReportModel = model<IMaintenanceReport & Document>('MaintenanceReport',maintenanceReportSchema)
export default maintenanceReportModel

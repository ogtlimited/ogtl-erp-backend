/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import { IMaintenanceAndRepairs } from '@interfaces/maintenance-report/maintenance_repairs.interface';

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

const maintenanceAndRepairModel = model<IMaintenanceAndRepairs & Document>('MaintenanceAndRepair',maintenanceAndRepairsSchema)
export default maintenanceAndRepairModel

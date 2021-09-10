/* eslint-disable prettier/prettier */
import { model, Schema} from 'mongoose';

//should have the option to reference assests

const incidentSchema: Schema = new Schema(
  {
    description: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "incidentType"
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        rquired: true,
        ref: "Employee"
      },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const incidentModel = model('Incident', incidentSchema);
export default incidentModel;
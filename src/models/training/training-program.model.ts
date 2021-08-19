/* eslint-disable prettier/prettier */
import { TrainingProgram } from '@interfaces/training/training-program.interface';
import { model, Schema, Document } from 'mongoose';

const TrainingProgramSchema: Schema = new Schema(
  {
    program_name: {
        type: String,
        required: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Company"
    },
    status: {
        type: String,
        required: true
    },
    trainer_name: {
        type: String,
        required: true
    },
    trainer_email: {
      type: String,
      required: true
    },
    supplier_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Supplier"
    },
    contact_number: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    }
  },
  {
    timestamps: true,
  },
);

const TrainingProgramModel = model<TrainingProgram & Document>('TrainingProgram', TrainingProgramSchema);
export default TrainingProgramModel;
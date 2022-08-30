/* eslint-disable prettier/prettier */
// import { IBatchInterface } from '@interfaces/payroll/batch.interface';
import { model, Schema, Document } from 'mongoose';

const BatchSchema: Schema = new Schema(
  {
    batch_id: {
      type: String,
      required:true
    },
    reference_id: {
      type: String,
      required:true
    },
    approved: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    }
  },
  {
    timestamps: true,
  },
);

const batchModel = model('Batch', BatchSchema);
export default batchModel;

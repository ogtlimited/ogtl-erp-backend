/* eslint-disable prettier/prettier */
import { TrainingResult } from '@interfaces/training/training-result.interface';
import { model, Schema, Document } from 'mongoose';

const result: Schema = new Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    hours:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    comments:{
        type: String,
        default: null
    }
})


const TrainingResultSchema: Schema = new Schema(
  {
    training_event_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "TrainingEvent"
    },
    training_result: [result]
  },
  {
    timestamps: true,
  },
);

const TrainingResultModel = model<TrainingResult & Document>('TrainingResult', TrainingResultSchema);
export default TrainingResultModel;
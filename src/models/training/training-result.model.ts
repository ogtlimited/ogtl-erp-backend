/* eslint-disable prettier/prettier */
import NotificationHelper from '@/utils/helper/notification.helper';
import { ITrainingResult } from '@interfaces/training/training-result.interface';
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
    training_result: result
  },
  {
    timestamps: true,
  },
);

TrainingResultSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
const TrainingResultModel = model<ITrainingResult & Document>('TrainingResult', TrainingResultSchema);
export default TrainingResultModel;
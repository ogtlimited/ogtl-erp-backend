/* eslint-disable prettier/prettier */
import NotificationHelper from '@/utils/helper/notification.helper';
import { ITrainingEvent } from '@interfaces/training/training-event.interface';
import { model, Schema, Document } from 'mongoose';

const TrainingEventSchema: Schema = new Schema(
  {
    event_name: {
        type: String,
        required: true
    },
    training_program_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "TrainingProgram"
    },
    level: {
        type: String,
        required: true
    },
    event_status: {
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
    company_id: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    supplier_id: {
        type: Schema.Types.ObjectId,
        ref: "Supplier"
    },
    contact_number: {
        type: String,
    },
    description: {
        type: String,
        default: null
    },
    has_certificate: {
        type: Boolean,
        default: null
    },
    course: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    introduction: {
        type: Boolean,
        default: null
    }
  },
  {
    timestamps: true,
  },
);

TrainingEventSchema.post('save', function(doc) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: any = this;
    console.log(self.constructor.modelName)
    new NotificationHelper(self.constructor.modelName, "SAVE").exec()
  });
const TrainingEventModel = model<ITrainingEvent & Document>('TrainingEvent', TrainingEventSchema);
export default TrainingEventModel;
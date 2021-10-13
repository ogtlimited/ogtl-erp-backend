/* eslint-disable prettier/prettier */
import { CoachingFormInterface } from '@/interfaces/coaching/coaching.interface';
import { model, Schema, Document } from 'mongoose';
import mongoose from 'mongoose';
import NotificationHelper from '@/utils/helper/notification.helper';

const CoachingSchema: Schema = new Schema(
    {
    
          coaching_type:{
            type: String,
            required: true,
          },
          employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
          },
          goals: {
            type: String,
            required: true,
          },
          incident_date: {
            type: String,
            required: true,
          },
          opportunities: {
            type: String,
            required: true,
          },
          reality: {
            type: String,
            required: true,
          },
          supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
          },
          way_forward: {
            type: String,
            required: true,
          },
          status:  {
            type: String,
            enum: ["draft", "submitted"],
          },
          user_response:  {
            type: String,
            default: "pending",
            enum: ["rejected", "accepted", "pending"],
          },
          reason:  {
            type: String
          },

    },

);
CoachingSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
CoachingSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
CoachingSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

const CoachingFormModel = model<CoachingFormInterface & Document>('CoachingForm', CoachingSchema);

export default CoachingFormModel;
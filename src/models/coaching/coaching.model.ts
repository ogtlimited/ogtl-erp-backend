/* eslint-disable prettier/prettier */
import { CoachingFormInterface } from '@/interfaces/coaching/coaching.interface';
import { model, Schema, Document } from 'mongoose';

const CoachingSchema: Schema = new Schema(
    {
    
          coaching_type:{
            type: String,
            required: true,
          },
          ogid:  {
            type: String,
            required: true,
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
            type: String,
            required: true,
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

    },

);

const CoachingFormModel = model<CoachingFormInterface & Document>('CoachingForm', CoachingSchema);

export default CoachingFormModel;
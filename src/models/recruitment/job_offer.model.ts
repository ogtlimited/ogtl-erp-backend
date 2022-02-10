/* eslint-disable prettier/prettier */

import mongoose, { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper'
import { IJobOffer } from '@interfaces/recruitment/job_offer.interface';

const jobOfferSchema: Schema = new Schema({
  job_applicant_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'JobApplicant',
    default: null,
  },
  status: {
    type: String,
    enum: ['Awaiting Response', 'Accepted', 'Rejected'],
    default: 'Awaiting Response',
  },
  offer_date: {
    type: Date,
    default: null,
  },
  designation_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Designation',
    default: null,
  },
  job_offer_terms: [
    {
      type: String,
      default: null,
    },
  ],
  terms_and_conditions: {
    type: String,
    default: null,
  },
},
  {
    timestamps: true,
  },);

jobOfferSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
jobOfferSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
jobOfferSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});


const jobOfferModel = model<IJobOffer & Document>('JobOffer', jobOfferSchema);

export default jobOfferModel;

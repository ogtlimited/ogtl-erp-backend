/* eslint-disable prettier/prettier */
import { IAccountType } from '@interfaces/account-interface/account-type.interface';
import mongoose, { model, Schema, Document } from 'mongoose';
import NotificationHelper from '../../utils/helper/notification.helper'

const accountTypeschema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

accountTypeschema.post('save', function(doc) {
  const self: any = this;
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});

accountTypeschema.post('delete', function(doc) {
  const self: any = this;
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

const accountTypeModel = model<IAccountType & Document>('AccountType', accountTypeschema);
export default accountTypeModel;
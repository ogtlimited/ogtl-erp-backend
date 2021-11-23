/* eslint-disable prettier/prettier */
import { IAccount } from '@interfaces/account-interface/account.interface';
import mongoose, { model, Schema, Document } from 'mongoose';
import NotificationHelper from '../../utils/helper/notification.helper'
import {slugify} from '../../utils/slugify'

const accountchema: Schema = new mongoose.Schema(
  {
    account_name: {
      type: String,
      required: true,
      unique: true
    },
    account_number: {
        type: String,
        required: function() { return this.is_group === false }
    },
    is_group: {
        type: Boolean,
        default: false
    },
    is_default: {
      type: Boolean,
      default: false
    },
    // account_type: {
    //     type: Schema.Types.ObjectId,
    //     required: function() { return this.is_group === false },
    //     ref: 'Account'
    // },
    balance: {
        type: Number,
        required: function() { return this.is_group === false }
    },
    currency: {
        type: String,
        required: function() { return this.is_group === false },
        enum: ['NGN', 'USD', 'GBP', 'CAD']
    },
    parent: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'Account'
    },
    number_prefix: {
      type: String,
      required: function() { return this.is_group === true }
    },
    ancestors: [{
        _id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Account",
           index: true
        },
        account_name: String,
        slug: String
   }],
   slug: { type: String, index: true }
  },
  {
    timestamps: true,
  },
);

accountchema.post('save', function(doc) {
  const self: any = this;
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});

accountchema.post('delete', function(doc) {
  const self: any = this;
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

accountchema.pre('save', async function (next) {
    const self: any = this;
    self.slug = slugify(self.account_name);
    next();
 });


const AccountModel = model<IAccount & Document>('Account', accountchema);
export default AccountModel;
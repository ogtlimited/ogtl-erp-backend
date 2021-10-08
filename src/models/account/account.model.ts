/* eslint-disable prettier/prettier */
import { IAccount } from '@interfaces/account-interface/account.interface';
import mongoose, { model, Schema, Document } from 'mongoose';
import NotificationHelper from '../../utils/helper/notification.helper'

const accountchema: Schema = new mongoose.Schema(
  {
    account_name: {
      type: String,
      required: true
    },
    account_number: {
        type: String,
        required: function() { return this.is_group === false }
    },
    is_group: {
        type: Boolean,
        default: false
    },
    account_type: {
        type: Schema.Types.ObjectId,
        required: function() { return this.is_group === false },
        ref: 'AccountType'
    },
    currency: {
        type: Schema.Types.ObjectId,
        required: function() { return this.is_group === false },
        ref: 'Currency'
    },
    parent: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'Account'
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

const slugify = (string: string) => {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}
const AccountModel = model<IAccount & Document>('Account', accountchema);
export default AccountModel;
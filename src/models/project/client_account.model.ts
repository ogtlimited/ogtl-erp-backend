/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
const bcrypt = require("bcrypt")
import { sendEmail } from '@/utils/email';

const clientAccountSchema :Schema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required: true,
      unique: true
    },
    password:{
      type:String,
      default: "passwordOGTL"
    },
    client_id:{
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },
    spammy:{
      type: Boolean,
      default: false
    },
    deactivated:{
      type: Boolean,
      default: false
    },

  },
  {
    timestamps: true,
  }
);

clientAccountSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});

clientAccountSchema.post('save', async function(doc) {
  sendEmail("Testing Client Account Email", "Testing","snowdenmoses@gmail.com","Abubakarmoses@yahoo.com")
});

const clientAccountModel = model<Document>("ClientAccount", clientAccountSchema);
export default clientAccountModel;

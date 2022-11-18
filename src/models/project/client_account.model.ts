/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
const bcrypt = require("bcrypt")

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
      default: "passwordOGTL",
      minlength: 8
    },
    client_id:{
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
      unique: true
    },
    activated:{
      type: Boolean,
      default: false
    },
     spammy:{
      type: Boolean,
      default: true
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

const clientAccountModel = model<Document>("ClientAccount", clientAccountSchema);
export default clientAccountModel;

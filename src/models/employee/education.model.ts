/* eslint-disable prettier/prettier */
import {Education} from '@interfaces/employee-interface/education.interface';
import { model, Schema, Document } from 'mongoose';
const mongoose = require("mongoose");

const educationSchema : Schema = new Schema({

    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee",
   },

   school: {
       type: String,
    },

   qualification:{
        type: String,
    },

   level:{
        type: String,
        enum: ["Graduate", "Post Graduate", "Under Graduate"],
   },

   year_of_passing: {
        type: String,
  },
},

{
    timestamps: true,
  },


);

const EducationModel = model<Education & Document>('Education', educationSchema);

export default EducationModel;

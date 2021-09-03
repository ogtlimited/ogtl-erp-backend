import { model, Schema, Document } from 'mongoose';
import { IProject } from '@interfaces/project-interface/project.interface';

const projectSchema :Schema = new Schema(
  {
    project_name: {
      type: String,
      required: true,
      unique: true,
    },
    client_id:{
      type: Schema.Types.ObjectId,
      ref: "Client"
    } ,
    type: {
      type: String,
      required: true,
    },
    objectives: {
      type: String,
      required: true,
    },
    hours_of_operation: {
      type: Number,
      required: true,
    },
    type_of_employees: {
      type: String,
      required: true,
    },
    start_date:{
      type: Date,
      required: true
    },
    end_date:{
      type: Date,
    },
    number_of_employees: {
      type: Number,
      required: true,
    },
    billing_structure: {
      type: String,
      required: true,
      enum: ["standard", "per_hour", "seat","per_hour/seat"],
    },
    diallers: {
      type: String,
      enum: ["inhouse", "external", "others"],
    },
    documents:[ {
      type: String,
      default: null,
    }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    approved: {
      type: Boolean,
      default: false,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    quality_analyst: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Use a pre method to add , to range when you want to retrieve data
const projectModel = model<IProject & Document>("Project", projectSchema);

module.exports = projectModel;

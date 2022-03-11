/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { IProject } from '@interfaces/project-interface/project.interface';

const projectSchema: Schema = new Schema(
  {
    project_name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    type: {
      type: String,
      required: true,
      enum: ['domestic', 'foreign'],
    },
    objectives: {
      type: String,
    },
    shift_start: {
      type: String,
    },
    shift_end: {
      type: String,
    },
    start_date: {
      type: Date,
      default: Date.now
    },
    end_date: {
      type: Date,
      default: Date.now
    },
    number_of_employees: {
      type: String,
      required: true,
    },
    billing_structure: {
      type: String,
      required: true,
      enum: ['standard', 'per_hour', 'seat', 'per_hour/seat'],
    },
    diallers: {
      type: String,
      enum: ['inhouse', 'external', 'others'],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "approved", "rejected", "suspended"],
      default: "open"
    },
    supervisor: [{
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    }],
    quality_analyst: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    team_leads: {
      type: [Schema.Types.ObjectId],
      ref: 'Employee',
    },
    team_members: {
      type: [Schema.Types.ObjectId],
      ref: 'Employee',
    },
    leave_cap: {
      type: String
    },
  },
  {
    timestamps: true,
  },
);

//Use a pre method to add , to range when you want to retrieve data
const projectModel = model<IProject & Document>('Project', projectSchema);

export default projectModel;

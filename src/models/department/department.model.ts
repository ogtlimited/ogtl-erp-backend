/* eslint-disable prettier/prettier */
// import { Idepartment } from '@interfaces/department-interface/department-interface';
import { model, Schema } from 'mongoose';

const departmentSchema: Schema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  },
);

const departmentModel = model('Department', departmentSchema);
export default departmentModel;
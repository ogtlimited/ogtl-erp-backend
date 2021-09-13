/* eslint-disable prettier/prettier */
// import { Idepartment } from '@interfaces/department-interface/department-interface';
import { model, Schema } from 'mongoose';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';

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

const departmentModel = model<IDepartment & Document>('Department', departmentSchema);
export default departmentModel;
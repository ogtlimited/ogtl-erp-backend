/* eslint-disable prettier/prettier */
import { IEmployeeStat } from '@/interfaces/employee-stat/employee-stat.interface';
import { model, Schema, Document} from 'mongoose';

const employeeStatSchema: Schema = new Schema(
    {
      date: {
        type: Date,
        default: Date.now
      },
      total_employee_count: {
        type: Number,
        required: true
      },
      total_termination_count: {
        type: Number,
        required: true
      },
      ratio: {
        type: String,
        required: true
      },
    },
    {
        timestamps: true,
      },
    );


const EmployeeStatModel = model<IEmployeeStat & Document>('EmployeeStat', employeeStatSchema);

export default EmployeeStatModel;

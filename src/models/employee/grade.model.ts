import { Grade } from "@/interfaces/employee-interface/grade.interface";
import { model, Schema, Document } from 'mongoose';

const gradeSchema : Schema = new Schema (
    {
        grade: {
            type: String,
            required: true
        },

    },

    {
        timestamps: true,
    },

);


const userModel = model<Grade & Document>('Grade', gradeSchema);
export default userModel;
/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { IDocument } from '@interfaces/recruitment/document.interface';

const recruitmentDocumentSchema: Schema = new Schema(
  {
    file_path: {
      type: String,
      required: true
    },
    file_size: {
      type: String,
      required: true,
    },
    job_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    file_type: {
      type: String,
      required: true
    },
    file_name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

//Use a pre method to add , to range when you want to retrieve data
const RecruitmentDocumentModel = model<IDocument & Document>('RecruitmentDocument', recruitmentDocumentSchema);

export default RecruitmentDocumentModel;

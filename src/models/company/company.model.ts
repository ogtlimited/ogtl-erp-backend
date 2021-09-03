/* eslint-disable prettier/prettier */
import {Company} from '@interfaces/company/company.interface';
import { model, Schema, Document } from 'mongoose';

const CompanySchema: Schema = new Schema(
    {
        companyName: {
            type: String,
            required: true,
            unique: true,
          },
          companyEmail:{
            type: String,
            required: true,
          },
          logo: {
            type: String,
            required: true,
          },
          abbreviation: {
            type: String,
            required: true,
          },
   
    
    },
    {
        timestamps: true,
    },
);

const CompanyModel = model<Company & Document>('Company', CompanySchema);

export default CompanyModel;

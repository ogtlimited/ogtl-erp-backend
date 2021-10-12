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
          bankName: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          address:{
            type: String,
            required: true,
          },
          IBAN: {
            type: String,
            required: true,
          },
          swiftCode:{
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

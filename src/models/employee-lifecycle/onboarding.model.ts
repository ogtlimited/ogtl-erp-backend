/* eslint-disable prettier/prettier */
import { IOnBoarding } from '@interfaces/employee-lifecycle/onboarding.interface';
import { model, Schema, Document } from 'mongoose';

const onBoardingSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    jobApplicant: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "JobApplicant"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    employeeOnboardingTemplate: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "EmployeeOnboardingTemplate"
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department"
    },
    designation: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Designation"
    },
    employeeGrade: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "EmployeeGrade"
    },
    campaign: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Campaign"
    },
    branch:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch"
    },
    dateOfJoining: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
  },
);


const onBoardingModel = model<IOnBoarding & Document>('OnBoarding', onBoardingSchema);
export default onBoardingModel;
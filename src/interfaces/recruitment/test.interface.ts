/* eslint-disable prettier/prettier */

export interface ITest {
  _id: string;
  test_type:string;
  job_applicant_id: string;
  status: string;
  hr_user: string;
  score?: string;
  interview_date: Date;
  phone_number: string;
  notes?: string;
}

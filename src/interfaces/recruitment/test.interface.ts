/* eslint-disable prettier/prettier */
export enum TestStatus {
    PASSED,
    FAILED,
}

export enum TestType{
  PHONE_SCREENING,
  TYPING_TEST,
  EXCEL_TEST,
  FORMAL_WRITING,
  SOFT_SKILLS
}
export interface Test {
  test_type:TestType;
  job_applicant_id: string;
  status: TestStatus;
  hr_user: string;
  score?: string;
  interview_date: Date;
  phone_number: string;
  notes?: string;

}

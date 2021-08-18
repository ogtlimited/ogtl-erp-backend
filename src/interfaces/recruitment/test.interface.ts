export enum TestStatus {
    PASSED,
    FAILED,
}
export interface Test {
  job_applicant_id: string;
  status: TestStatus;
  hr_user: string;
  score?: string;
  interview_date: Date;
  phone_number: string;
  notes?: string;

}

export enum JobApplicantStatus {
  OPEN,
  REPLIED,
  REJECTED,
  HOLD,
  ACCEPTED
}

export interface IJobApplicant {
  _id: string;
  applicant_name: string;
  email_address: string;
  job_opening_id: string;
  application_source?:string;
  status: JobApplicantStatus;
  resume_attachment:string;
  cover_letter? : string;
  video_attachment? : string;
}

/* eslint-disable prettier/prettier */
export interface IJobApplicant {
  _id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email_address: string;
  job_opening_id: string;
  default_job_opening_id: string;
  application_source?: string;
  status: string;
  resume_attachment: string;
  cover_letter?: string;
  video_attachment?: string;
  mobile: string;
  alternate_mobile: string;
  highest_qualification: string;
  certifications: string;
  languages_spoken: [];
  referal_name: string;
  rep_sieving_call: string;
  interview_date: string;
  interview_status: string
}

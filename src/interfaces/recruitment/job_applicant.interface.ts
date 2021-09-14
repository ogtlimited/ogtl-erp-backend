
export interface IJobApplicant {
  _id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email_address: string;
  job_opening_id: string;
  application_source?: string;
  status: string;
  resume_attachment: string;
  cover_letter?: string;
  video_attachment?: string;
}

export enum Status { CLOSED,OPEN}

export interface JobOpening {
  _id: string;
  job_title: string;
  designation_id: string;
  campaign_id: string;
  status: Status;
  description: string;
}

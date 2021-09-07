export enum Status { CLOSED,OPEN}

export interface IJobOpening {
  _id: string;
  job_title: string;
  designation_id: string;
  project_id: string;
  status: Status;
  description: string;
}

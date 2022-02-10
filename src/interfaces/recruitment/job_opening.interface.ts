/* eslint-disable prettier/prettier */
export interface IJobOpening {
  _id: string;
  job_title: string;
  designation_id: string;
  project_id: string;
  status: string;
  description: string;
  location: string;
  date: string;
  deadline: string;
  type: string;
  experience: number;
  vacancy: number;
}
export interface IDefaultJobOpening {
  _id: string;
  job_title: string;
}

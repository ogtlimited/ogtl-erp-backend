/* eslint-disable prettier/prettier */
export interface IProject {
  _id:string;
  project_name:string;
  client_id: string;
  type: string;
  objectives: string;
  hours_of_operation: string;
  start_date: string;
  end_date: string;
  number_of_employees: string;
  billing_structure: string;
  diallers: string;
  creator: string;
  status: string;
  manager: string;
  quality_analyst: string;
  team_leads: string;
  team_members: string;
  leave_cap: string;
}

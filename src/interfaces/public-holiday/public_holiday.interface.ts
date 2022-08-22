export interface IPublicHoliday {
  start_date: string;
  end_date: string;
  project_id?: string;
  title: string;
  updated_by?: string;
  created_by: string;
  deleted_by?: string;
  deleted: boolean;
}

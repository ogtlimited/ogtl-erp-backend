export interface IPublicHoliday {
  startDate: string;
  endDate: string;
  project_id: string;
  title: string;
  updated_by?: string;
  created_by?: string;
  deleted_by?: string;
  deleted: boolean;
}

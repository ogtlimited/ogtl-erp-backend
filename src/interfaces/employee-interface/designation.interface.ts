/* eslint-disable prettier/prettier */
export interface Designation{
    _id: string;
    designation: string;
    department_id: string;
    project_id?: string;
    approval_level: number;
    delete?: boolean
}
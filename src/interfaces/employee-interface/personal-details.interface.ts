/* eslint-disable prettier/prettier */
export interface PersonalDetail {
    _id: string;
    employee_id: string;
    means_of_identification: string;
    id_number: string;
    date_of_issue: Date;
    valid_upto:  Date;
    date_of_birth: Date;
    place_of_issue: string;
    marital_status: string;
    blood_group: string;
}

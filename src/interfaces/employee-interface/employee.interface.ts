/* eslint-disable prettier/prettier */
export interface Employee {
    _id: string;
    ogid: string;
    date_of_joining: string;
    default_shift: string;
    company_email: string
    department: any;
    password: string;
    designation: string;
    reports_to:string;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
    image: string;
    branch:string;
    employeeType:string;
    projectId:string;
    status: string;
    permissionLevel: number;
    warningCount: number;
    isInPIP: boolean
    isAdmin: boolean
    isTeamLead: boolean
    isSupervisor: boolean
    leaveCount: number,
    isRepSiever: boolean,
    isLeaverApprover: boolean,
    sievedApplicationCount: number

}

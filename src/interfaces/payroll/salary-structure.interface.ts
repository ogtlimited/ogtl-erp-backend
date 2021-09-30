/* eslint-disable prettier/prettier */
export interface ISalaryStructure {
    deductions: Array<String>;
    earnings: Array<String>;
    departmentId: String;
    projectId: String;
    title: String;
    netPay?:Number
    grossPay?:Number
}


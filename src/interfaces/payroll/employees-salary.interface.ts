export interface IEmployeesSalary {
  employeeId: String,
  employeeEmail: String,
  basic: Number,
  medical: Number,
  housing: Number,
  transport: Number,
  otherAllowances: Number,
  monthlySalary: Number,
  totalRelief: Number,
  monthlyIncomeTax: Number,
  monthlyEmployeePension: Number,
  netPay: Number,
  updatedBy: String
  _id: String
}

export interface ISalarySetting {
  basic?: number,
  medical?: number,
  housing?: number,
  transport?: number,
  otherAllowances?: number,
  monthlySalary?: number,
  totalRelief?: number,
  monthlyIncomeTax?: number,
  monthlyEmployeePension?: number,
  CRA?: number,
  CRABonusAmount?: number,
  pension?: number
  netPay?: number
  employeeId?:string
}

import { ObjectId } from 'mongodb';
import isEmpty from 'lodash/isEmpty';
import { HttpException } from '@/exceptions/HttpException';
import deductionModel from '@/models/payroll/deduction.model';
import { deductionAggBuilder } from '@/utils/pipelineUtils';

export const calculateNetPay = (salaryComponents: Array<any>) => {
  if (salaryComponents.length < 1) {
    throw new HttpException(400, 'please provide earnings and deductions!');
  }
  let earnings = 0;
  let deductions = 0;
  for (let index = 0; index < salaryComponents.length; index++) {
    const component = salaryComponents[index];
    if (component.type == 'earning') {
      earnings += Number(component.amount);
    } else if (component.type == 'deduction') {
      deductions += Number(component.amount);
    }
  }
  if (earnings < deductions) {
    throw new HttpException(400, 'employee deductions cannot be more than earnings');
  } else {
    return earnings - deductions;
  }
};

export const officeQueryGenerator = queryParams => {
  let officeQuery: any = {};
  if (isEmpty(queryParams)) {
    return officeQuery;
  } else if (queryParams.departmentId) {
    officeQuery = { departmentId: new ObjectId(queryParams.departmentId) };
  } else if (queryParams.projectId) {
    officeQuery = { projectId: new ObjectId(queryParams.projectId) };
  }
  return officeQuery;
};

export const calculateEmployeeDeductions = async (employee, month, salaryStructure) => {
  // console.log(employee._id);
  
  const employeeDeductions: any = {
    hasDeductions: false,
    deductionIds: [],
    totalAmount:0
  };
  const facetQuery = deductionAggBuilder(employee._id);
  const deductions: any = await deductionModel.aggregate(facetQuery);
  const { deductionIds, totalDeductions } = deductions[0];
  if (deductionIds.length > 0) {
    employeeDeductions.hasDeductions = true;
    employeeDeductions.totalAmount = salaryStructure.netPay - totalDeductions[0].sum;
    for (let index = 0; index < deductionIds.length; index++) {
      const deduction = deductionIds[index];
      employeeDeductions.deductionIds.push(deduction['_id']);
    }
  }

  return employeeDeductions;
};

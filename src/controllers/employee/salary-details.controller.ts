/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateSalaryDetailsDto, UpdateSalaryDetailsDto } from '@/dtos/employee/salary-details.dto';
import { SalaryDetail } from '@/interfaces/employee-interface/salary-details.interface';
import SalaryDetailsService from '@/services/employee/salary-details.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import EmployeeModel from '@/models/employee/employee.model';
import SalaryDetailsModel from '@models/employee/salary-details.model';
import { ArrayUnique } from 'class-validator';
const fs = require('fs')
class SalaryDetailsController {
  public SalaryDetailsService = new SalaryDetailsService();
  public Employees = EmployeeModel;
  public sModel = SalaryDetailsModel;
  //Returns all Salary Details
  constructor(){
    // this.findAll()
     // fs.writeFile('output.json', jsonContent, 'utf8', function (err) {
    //   if (err) {
    //     console.log('An error occured while writing JSON Object to File.');
    //     return console.log(err);
    //   }

    //   console.log('JSON file has been saved.');
    // });
    // console.log(res);
  }

  async findAll(){
    const all = await this.sModel.find()
    const mapp = all.map(e => e.employee_id)
    const uniq = Array.from(new Set(mapp))
    const full = []
    uniq.forEach(e => {
        const filt = all.filter(i => i.employee_id == e)
        console.log(filt.length, all[filt.length -1])
        full.push(all[filt.length -1])
    })
    console.log(full.length, all.length)
     fs.writeFile('sDetails.json', JSON.stringify(full), 'utf8', function (err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }

      console.log('JSON file has been saved.');
    });
  }

  public getSalaryDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSalaryDetailsData: SalaryDetail[] = await this.SalaryDetailsService.findAllSalaryDetails();

      res.status(200).json({ data: findAllSalaryDetailsData, numSalaryDetailes: findAllSalaryDetailsData.length, message: 'All SalaryDetailes' });
    } catch (error) {
      next(error);
    }
  };

  //creates SalaryDetails
  public CreateSalaryDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const SalaryDetailsData: CreateSalaryDetailsDto = req.body;
      const createSalaryDetailsData: SalaryDetail = await this.SalaryDetailsService.createSalaryDetails(SalaryDetailsData);
      res.status(201).json({ data: createSalaryDetailsData, message: 'SalaryDetails succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  public CreateBulkCreateSalaryDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const salaryDetailsData = req.body;
      const newArray = [];
      for (let index = 0; index < salaryDetailsData.length; index++) {
        const findEmployee: Employee = await this.Employees.findOne({ company_email: salaryDetailsData[index].company_email }, { _id: 1 });
        // console.log(findEmployee)
        if (findEmployee) {
          newArray.push({
            ...salaryDetailsData[index],
            employee_id: findEmployee._id,
          });
        } else {
          console.log(salaryDetailsData[index]);
        }
      }
      console.log(newArray);
      const results = await this.sModel.insertMany(newArray);
      console.log('results', results);
      res.status(201).json({ data: results, message: 'ContactDetails succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  // Get Salary Details with Given Id
  public getSalaryDetailsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const SalaryDetailsId: string = req.params.id;
      const findOneSalaryDetailsData: SalaryDetail = await this.SalaryDetailsService.findSalaryDetailsById(SalaryDetailsId);
      res.status(200).json({ data: findOneSalaryDetailsData, message: 'All SalaryDetails' });
    } catch (error) {
      next(error);
    }
  };

  //update SalaryDetails
  public updateSalaryDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const SalaryDetailsId: string = req.params.id;
      const SalaryDetailsData: UpdateSalaryDetailsDto = req.body;
      const updateSalaryDetailsData: SalaryDetail = await this.SalaryDetailsService.updateSalaryDetails(SalaryDetailsId, SalaryDetailsData);
      res.status(200).json({ data: updateSalaryDetailsData, message: 'SalaryDetails Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes SalaryDetails
  public deleteSalaryDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const SalaryDetailsId: string = req.params.id;
      const deleteSalaryDetailsData: SalaryDetail = await this.SalaryDetailsService.deleteSalaryDetails(SalaryDetailsId);
      res.status(200).json({ data: deleteSalaryDetailsData, message: 'SalaryDetails Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SalaryDetailsController;

/* eslint-disable prettier/prettier */
import TestServices from '@services/recruitment/test.services';
import { NextFunction, Request, Response } from 'express';
import { ITest } from '@interfaces/recruitment/test.interface';
import { CreateTestDto, UpdateTestDto } from '@dtos/recruitment/test.dto';

class TestController {
  public testService = new TestServices();

  //Method for returning all Test
  public getTests = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllTest: ITest[] = await this.testService.findAllTests(req.query);
      res.status(200).json({data:findAllTest, totalTest: findAllTest.length, message:"All Test"})
    }catch (error) {
      next(error)
    }
  }
  //Method for returning all Test
  public getPassedTests = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllPassedTest: ITest[] = await this.testService.findAllPassedTests();
      res.status(200).json({data:findAllPassedTest, totalTest: findAllPassedTest.length, message:"All passed test"})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning a single test
  public getTestById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const testId:string = req.params.id;
      const findTest:ITest = await this.testService.findTestById(testId);
      res.status(200).json({data:findTest, message:"Test found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating Test
  public createTest = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const testData:CreateTestDto = req.body;
      const createTestData: ITest = await this.testService.createTest(testData);
      res.status(201).json({ data: createTestData, message: 'Test created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating test
  public updateTest = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const testId:string = req.params.id;
      const testData:UpdateTestDto = req.body;
      const updatedTestData: ITest = await this.testService.updateTest(testId,testData);
      res.status(200).json({ data: updatedTestData, message: 'Test updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting test
  public deleteTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const testId:string = req.params.id;
      const deleteTest = await this.testService.deleteTest(testId);

      res.status(200).json({ data: deleteTest, message: 'Test deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TestController;

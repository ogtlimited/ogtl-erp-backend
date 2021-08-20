/* eslint-disable prettier/prettier */
import testModel from '@models/recruitment/test.model';
import { ITest } from '@interfaces/recruitment/test.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateTestDto } from '@dtos/recruitment/test.dto';

class TestServices {
  public test = testModel;

  //Method for finding all tests
  public async findAllTests(): Promise<ITest[]>{
    return this.test.find();
  }

  //Method for finding a single test
  public async findTestById(testId: string): Promise<ITest>{
    //check if no Test id is empty
    if(isEmpty(testId)) throw new HttpException(400,`Test with Id:${testId}, does not exist`);
    //find Test using the id provided
    const findTest:ITest = await this.test.findOne({_id:testId});
    //throw error if Test does not exist
    if(!findTest) throw new HttpException(409,`Test with Id:${testId}, does not exist`);
    //return Test
    return findTest;
  }

  //Method for creating Test
  public async createTest(testData: CreateTestDto): Promise<ITest>{
    //check if no Test data is empty
    if (isEmpty(testData)) throw new HttpException(400, "Bad request");
    //find test using both test type and applicant id to know if applicant already took the test
    const testType: ITest = await this.test.findOne({ test_type: testData.test_type });
    const applicant: ITest = await this.test.findOne({ job_applicant_id: testData.job_applicant_id });
    //throw error if Test does exist
    if (testType && applicant) throw new HttpException(409, `${testData.job_applicant_id} already took the ${testData.test_type} test`);
    // return created Test
    return await this.test.create(testData);
  }

  //Method for updating Test
  public async updateTest(testId: string,testData: CreateTestDto):Promise<ITest>{
    //check if no Test data is empty
    if (isEmpty(testData)) throw new HttpException(400, "Bad request");
    if(testData.test_type){
      //find Test using the test type provided
      const findTest: ITest = await this.test.findOne({ test_type: testData.test_type });
      if(findTest && findTest._id != testId) throw new HttpException(409, `${testData.test_type } already exist`);
    }
    //find Test using the id provided and update it
    const updateTestById:ITest = await this.test.findByIdAndUpdate(testId,{testData})
    if (!updateTestById) throw new HttpException(409, "Test could not be updated");
    // return updated Test
    return updateTestById;
  }

  //Method for deleting Test
  public async deleteTest(testId: string):Promise<ITest>{
    //find Test using the id provided and delete
    const deleteTestById: ITest = await this.test.findByIdAndDelete(testId);
    if(!deleteTestById) throw new HttpException(409, `Test with Id:${testId}, does not exist`);
    return deleteTestById;
  }
}

export default TestServices;

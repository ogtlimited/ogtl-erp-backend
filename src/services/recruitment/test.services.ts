/* eslint-disable prettier/prettier */
import testModel from '@models/recruitment/test.model';
import { ITest } from '@interfaces/recruitment/test.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateTestDto, UpdateTestDto } from '@dtos/recruitment/test.dto';

class TestServices {
  public test = testModel;

  //Method for finding all tests
  public async findAllTests(query: any): Promise<ITest[]>{
    // return this.test.find(query).populate('job_applicant_id hr_user ');
    return  this.test.find(query).populate({path:'job_applicant_id hr',populate:{path:'job_opening_id'}})
  }

  //Method for finding all tests where applicants have undergone soft skills and passed
  public async findAllPassedTests(): Promise<ITest[]>{
    return this.test.find({status:"Assessment Completed"}).populate('job_applicant_id hr_user');
  }

  //Method for finding a single test
  public async findTestById(testId: string): Promise<ITest>{
    //check if no Test id is empty
    if(isEmpty(testId)) throw new HttpException(400,`Test with Id:${testId}, does not exist`);
    //find Test using the id provided
    const findTest:ITest = await this.test.findOne({_id:testId}).populate('job_applicant_id hr_user');
    //throw error if Test does not exist
    if(!findTest) throw new HttpException(409,`Test with Id:${testId}, does not exist`);
    //return Test
    return findTest;
  }

  //Method for creating Test
  public async createTest(testData: CreateTestDto): Promise<ITest>{
    //check if no Test data is empty
    if (isEmpty(testData)) throw new HttpException(400, "Bad request");

    // return created Test
    return await this.test.create(testData);
  }

  //Method for updating Test
  public async updateTest(testId: string,testData: UpdateTestDto):Promise<ITest>{
    //check if no Test data is empty
    if (isEmpty(testData)) throw new HttpException(400, "Bad request");
    if(testData._id){
      //find Test using the test type provided
      const findTest: ITest = await this.test.findOne({ _id: testData._id }).populate('job_applicant_id hr_user ');
      if(findTest && findTest._id != testId) throw new HttpException(409, `Already exist`);
    }
    //find Test using the id provided and update it
    const updateTestById:ITest = await this.test.findByIdAndUpdate(testId,testData ,{new:true})
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

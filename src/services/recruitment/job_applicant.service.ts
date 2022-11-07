/* eslint-disable prettier/prettier */
import jobApplicantModel from '@models/recruitment/job_applicant.model';
import { IJobApplicant } from '@interfaces/recruitment/job_applicant.interface';
import { IJobApplicantPagination } from '@/interfaces/recruitment/job_applicant_pagination_filter.interface';
import { IJobApplicantFilteration } from '@/interfaces/recruitment/job_applicant_pagination_filter.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateJobApplicantDto, UpdateJobApplicantDto } from '@dtos/recruitment/job_applicant.dto';
import EmployeeModel from '@/models/employee/employee.model';
import jobApplicationsTaskModel from '@models/recruitment/job-application-task-tracker';
import { IJobApplicationsTasks } from '@/interfaces/recruitment/job-applications-task';
import moment = require('moment');

class JobApplicantService {
  private MAX_LIMIT:number = 50;
  public jobApplicant = jobApplicantModel;
  public Employee = EmployeeModel;
  private momentStartOfDay = moment().add(1, 'hour').startOf('day').format('YYYY-MM-DD');
  private momentEndOfDay = moment().add(1, 'hour').endOf('day').format('YYYY-MM-DD');
  private startOfDay = new Date(moment().startOf('day').format('YYYY-MM-DD'));
  private endOfDay = new Date(moment().endOf('day').format('YYYY-MM-DD'));

  constructor() {
    this.startOfDay.setHours(0, 0, 0, 0);
    this.endOfDay.setHours(23, 59, 59, 999);
  }

  //Method for finding all job applicants
  public async getJobApplicants(searchQuery:any, paginationQuery: any): Promise<{jobApplicants: IJobApplicant[]; pagination:IJobApplicantPagination, totalNumberofApplicants:number}> {
    const filteringQuery:IJobApplicantFilteration = {}
    return(
      this.getJobApplicantsHelperMethod(filteringQuery,searchQuery, paginationQuery)
    )
  }

  public async getJobApplicantsForRepSievers(searchQuery,ogId,paginationQuery:any): Promise<{jobApplicants:IJobApplicant[]; pagination:IJobApplicantPagination, totalNumberofApplicants:number}> {
    const filteringQuery:IJobApplicantFilteration = {rep_sieving_call:ogId}
    return(
      this.getJobApplicantsHelperMethod(filteringQuery, searchQuery, paginationQuery)
    )
  }

  public async getAllJobApplicantsThatHaveBeenScheduled(): Promise<IJobApplicant[]> {
    return this.jobApplicant
      .find({},{ interview_date: { $gte: this.startOfDay, $lt: this.endOfDay } })
      .populate({ path: 'rep_sieving_call', model: 'Employee' })
      .populate({ path: 'job_opening_id' })
      .populate({ path: 'default_job_opening_id' });
  }
  //Method for finding a single job applicant
  public async findJobApplicantById(jobApplicantId: string): Promise<IJobApplicant> {
    //check if no Job applicant id is empty
    if (isEmpty(jobApplicantId)) throw new HttpException(400, `Job applicant with Id:${jobApplicantId}, does not exist`);
    //find Job applicant using the id provided
    const findJobApplicant: IJobApplicant = await this.jobApplicant
      .findOne({ _id: jobApplicantId })
      .populate('job_opening_id, rep_sieving_call, default_job_opening_id ');
    //throw error if Job applicant does not exist
    if (!findJobApplicant) throw new HttpException(409, `Job applicant with Id:${jobApplicantId}, does not exist`);
    //return Job applicant
    return findJobApplicant;
  }

  //Method for creating job applicant
  public async createJobApplicant(jobApplicantData: CreateJobApplicantDto): Promise<any> {
    //check if no job applicant data is empty
    if (isEmpty(jobApplicantData)) throw new HttpException(400, 'Bad request');
    const jobkey = jobApplicantData.job_opening_id ? 'job_opening_id' : 'default_job_opening_id';
    const applicant = await this.jobApplicant.find({
      email_address: jobApplicantData.email_address,
      [jobkey]: jobApplicantData[jobkey],
    });

    if (applicant.length > 0) throw new HttpException(409, 'You already applied for this position');
    const employees = await EmployeeModel.find({ isRepSiever: true }).select('sievedApplicationCount');
    employees.sort(function (a, b) {
      return a.sievedApplicationCount - b.sievedApplicationCount;
    });
    const min = employees[0];
    const jobApplicant = { ...jobApplicantData, rep_sieving_call: min._id };
    await EmployeeModel.findOneAndUpdate(
      { _id: min._id },
      {
        $set: {
          sievedApplicationCount: min.sievedApplicationCount + 1,
        },
      },
      { new: true },
    );
    // return created job Applicant
    const jobApplication = await this.jobApplicant.create(jobApplicant);
    const existingTask = await jobApplicationsTaskModel.exists({ in_house_agent: min._id, createdAt: { $gte: this.startOfDay, $lt: this.endOfDay } });
    if (existingTask) {
      await this.addToAssignedRecords(min._id);
    } else {
      await jobApplicationsTaskModel.create({ in_house_agent: min._id, total_assigned_records: 1 });
    }

    return jobApplication;
  }

  //Method for updating job Applicant
  /*
   - if there is an interview date, update interview status and process stage

  */
  public async updateJobApplicant(agent_id, jobApplicantId: string, jobApplicationUpdateData: UpdateJobApplicantDto): Promise<IJobApplicant> {
    //check if no job Applicant data is empty
    if (isEmpty(jobApplicationUpdateData)) throw new HttpException(400, 'Bad request');

    const jobApplication: IJobApplicant = await this.jobApplicant.findOne({ _id: jobApplicantId });
    if (!jobApplication) throw new HttpException(404, `${jobApplicationUpdateData._id} does not exist`);

    return await this.jobApplicationUpdateHelper(agent_id, jobApplicationUpdateData, jobApplication);
  }

  public async getJobApplicationTasks(startOfDay: string, endOfDay: string): Promise<IJobApplicationsTasks[]> {
    return await jobApplicationsTaskModel.find({ createdAt: { $gte: this.startOfDay, $lt: this.endOfDay } }).populate({
      path: 'in_house_agent',
      select: {
        company_email: 1,
        first_name: 1,
        last_name: 1,
        _id: 0,
      },
    });
  }

  public async getAgentJobApplicationTasks(in_house_agent_id: string): Promise<IJobApplicationsTasks[]> {
    return await jobApplicationsTaskModel.find({ createdAt: { $gte: this.startOfDay, $lt: this.endOfDay }, in_house_agent: in_house_agent_id });
  }

  //Method for deleting job Applicant
  public async deleteJobApplicant(jobApplicantId: string): Promise<IJobApplicant> {
    //find job Applicant using the id provided and delete
    const deleteJobApplicantById: IJobApplicant = await this.jobApplicant.findByIdAndDelete(jobApplicantId);
    if (!deleteJobApplicantById) throw new HttpException(409, `Job Applicant with Id:${jobApplicantId}, does not exist`);
    return deleteJobApplicantById;
  }

  private async getJobApplicantsHelperMethod(filteringQuery,searchQuery:any, paginationQuery: any): Promise<{jobApplicants:IJobApplicant[]; pagination:IJobApplicantPagination, totalNumberofApplicants:number}> {
    //Searching
    if(searchQuery.search){
      filteringQuery.$or=[
        { interview_status:{$regex:searchQuery.search, $options:"i"}},
        { process_stage:{$regex:searchQuery.search, $options:"i"}},
        { first_name:{$regex:searchQuery.search, $options:"i"}},
        { last_name:{$regex:searchQuery.search, $options:"i"}},
        { middle_name:{$regex:searchQuery.search, $options:"i"}},
        
      ]
    }
    // Filtering
    else if(searchQuery.interview_status  && searchQuery.process_stage){
      filteringQuery.$and=[
        { interview_status:{$regex:searchQuery.interview_status, $options:"i"}},
        { process_stage:{$regex:searchQuery.process_stage, $options:"i"}},
      ]
    }
    // Filtering
    else if(searchQuery.interview_status){
      filteringQuery.$or=[
        { interview_status:{$regex:searchQuery.interview_status, $options:"i"}},
      ]
    }
    // Filtering
    else if(searchQuery.process_stage){
      filteringQuery.$or=[
        { process_stage:{$regex:searchQuery.process_stage, $options:"i"}},
      ]
    }
    
    
    //Pagination
    const page = parseInt(paginationQuery.page) || 1;
    const limit = paginationQuery.limit && parseInt(paginationQuery.limit) > this.MAX_LIMIT ?  this.MAX_LIMIT : paginationQuery.limit;
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const totalPage = await this.jobApplicant.find(filteringQuery).countDocuments();

    const pagination:IJobApplicantPagination = {numberOfPages:Math.ceil(totalPage/limit)};
    if(endIndex < totalPage){
      pagination.next = {
        page: page + 1,
        limit: limit
      }
    }

    if(startIndex > 0){
      pagination.previous = {
        page: page - 1,
        limit: limit
      }
    }

    const jobApplicants: IJobApplicant[] = await this.jobApplicant
    .find(filteringQuery)
    .populate({ path: 'rep_sieving_call', model: 'Employee' })
    .populate({ path: 'job_opening_id' })
    .populate({ path: 'default_job_opening_id' })
    .sort({createdAt:-1})
    .skip(startIndex)
    .limit(limit)

    return { 
      jobApplicants: jobApplicants,
      pagination: pagination,
      totalNumberofApplicants: jobApplicants.length
    }
   
  }

  private async jobApplicationUpdateHelper(agent_id, jobApplicationUpdateData, jobApplication): Promise<IJobApplicant> {
    console.log(jobApplicationUpdateData, 'job application');
    if (jobApplicationUpdateData.interview_date) {
      const updateJobApplicantById = await this.jobApplicant.findOneAndUpdate(
        { rep_sieving_call: agent_id, _id: jobApplication._id },
        {
          $set: {
            process_stage: 'interview scheduled',
            interview_status: 'Scheduled for interview',
            interview_date: jobApplicationUpdateData.interview_date,
          },
        },
        { new: true },
      );
      await this.increaseApplicationTask(agent_id, 'interview scheduled');
      return updateJobApplicantById;
    }

    if(jobApplicationUpdateData.process_stage){
      const updateJobApplicantById = await  this.jobApplicant.findOneAndUpdate(
        {rep_sieving_call: agent_id, _id:jobApplication._id},
        {
          $set: { process_stage: jobApplicationUpdateData.process_stage },
        },
        { new: true },
      );
      await this.increaseApplicationTask(jobApplication.rep_sieving_call, jobApplicationUpdateData.process_stage);
      return updateJobApplicantById;
    }
    if (jobApplicationUpdateData.interview_status) {
      return await this.jobApplicant.findOneAndUpdate(
        {rep_sieving_call: agent_id, _id: jobApplication._id},
        {
          $set: { interview_status: jobApplicationUpdateData.interview_status },
        },
        { new: true },
      );
    }
  }
  private async addToAssignedRecords(in_house_agent_id) {
    await jobApplicationsTaskModel.findOneAndUpdate(
      { in_house_agent: in_house_agent_id, createdAt: { $gte: this.startOfDay, $lt: this.endOfDay } },
      {
        $set: { $inc: { total_assigned_records: 1 } },
      },
    );
  }

  private async increaseApplicationTask(in_house_agent_id, interviewStage) {
    if (interviewStage == 'phone screening') {
      interviewStage = 'phone_screening';
    }
    if (interviewStage == 'interview scheduled') {
      interviewStage = 'scheduled_for_interview';
    }
    if(interviewStage == "Sieving"){
      interviewStage = "sieving"
    }
    await jobApplicationsTaskModel.findOneAndUpdate(
      {
        in_house_agent: in_house_agent_id,
        createdAt: {
          $gte: this.startOfDay,
          $lt: this.endOfDay,
        },
      },
      {
        $inc: { [interviewStage]: 1 },
      },
    );
  }
}

export default JobApplicantService;

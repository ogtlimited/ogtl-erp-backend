/* eslint-disable prettier/prettier */
import orientationModel from '@/models/recruitment/orientation_and_training.model';
import EmployeeModel from '@/models/employee/employee.model';
import departmentModel from '@/models/department/department.model';
import DesignationModel  from '@models/employee/designation.model';
import { sendEmail } from '@/utils/sendEmail';
import { IOrientation } from '@/interfaces/recruitment/orientation_and_training.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateOrientationDto, UpdateOrientationDto } from '@/dtos/recruitment/orientation_and_training.dto';
import { ObjectId } from 'mongodb';

class OrientationService {
  public orientation = orientationModel;
  public employee = EmployeeModel;
  public department = departmentModel;
  public desM = DesignationModel;
  public DesignationList = {
    it: ['HEAD OF IT', 'SENIOR IT SUPPORT'],
    facility: ['CHIEF OF FACILITY AND REGULATION', 'HEAD FACILITY'],
    hr: ['DEPUTY HR MANAGER', 'SENIOR HR ASSOCIATE', 'HR-IN-HOUSE'],
    accounts: ['HEAD ACCOUNT', 'SENIOR ACCOUNTANT'],
    operations: ['COO', 'OPERATIONS & TRAINING DIRECTOR', 'OPERATIONS MANAGER', 'OPERATIONS MANAGER'],
  };

  public async findAllOrientations(): Promise<IOrientation[]> {
    return this.orientation.find().populate('department_id');
  }

  public async findOrientationById(orientationId: string): Promise<IOrientation> {
    if (isEmpty(orientationId)) throw new HttpException(400, `Orientation with Id:${orientationId}, does not exist`);

    const findOrientation: IOrientation = await this.orientation.findOne({ _id: orientationId }).populate('department_id');
    if (!findOrientation) throw new HttpException(409, `Orientation with Id:${orientationId}, does not exist`);
    return findOrientation;
  }

  public async createOrientation(orientationData: CreateOrientationDto): Promise<IOrientation> {
    if (isEmpty(orientationData)) throw new HttpException(400, 'Bad request');

    const dept = await this.department.findById(orientationData.department_id);
    const message = `${dept.department} has been scheduled for ${orientationData.type} on ${orientationData.start_date} at ${orientationData.end_date}/n Please attend and be on time /n HR Team`;
    const subject = 'Orientation/Customer Service Training';

    let employee_emails: string[];

    if (dept.department === 'HR') {
      const hrDesign = await this.desM.find({"designation" : { "$in": this.DesignationList.hr }}, {
        _id: 1,
      });
      const ids = hrDesign.map(id => id._id);
      const { emails } = await this.fetchHREmail(ids);
      employee_emails = emails;
    }

    if (dept.department === 'Accounting') {
      const accountDesign = await this.desM.find({"designation" : { "$in": this.DesignationList.accounts }}, {
        _id: 1,
      });
      const ids = accountDesign.map(id => id._id);
      const { emails } = await this.fetchAccountEmail(ids);
      employee_emails = emails;
    }

    if (dept.department === 'IT') {
      const itDesign = await this.desM.find({"designation" : { "$in": this.DesignationList.accounts }}, {
        _id: 1,
      });
      const ids = itDesign.map(id => id._id);
      const { emails } = await this.fetchITEmail(ids);
      employee_emails = emails;
    }

    if (dept.department === 'OPERATIONS') {
      const opDesign = await this.desM.find({"designation" : { "$in": this.DesignationList.operations }}, {
        _id: 1,
      });
      const ids = opDesign.map(id => id._id);
      const { emails } = await this.fetchOperationsEmail(ids);
      employee_emails = emails;
    }

    if (dept.department === 'FACILITY') {
      const facilityDesign = await this.desM.find({"designation" : { "$in": this.DesignationList.facility }}, {
        _id: 1,
      });
      const ids = facilityDesign.map(id => id._id);
      const { emails } = await this.fetchFacilityEmail(ids);
      employee_emails = emails;
    }

    sendEmail(subject, message, employee_emails);
    return await this.orientation.create(orientationData);
  }

  public async updateOrientation(orientationId: string, orientationData: UpdateOrientationDto): Promise<IOrientation> {
    if (isEmpty(orientationData)) throw new HttpException(400, 'Bad request');
    if (orientationData._id) {
      const findOrientation: IOrientation = await this.orientation.findOne({ _id: orientationData._id });
      if (findOrientation && findOrientation._id != orientationId) throw new HttpException(409, `${orientationData._id} already exist`);
    }

    const updateOrientationById: IOrientation = await this.orientation.findByIdAndUpdate(orientationId, orientationData, { new: true });
    if (!updateOrientationById) throw new HttpException(409, 'Orientation could not be updated');

    return updateOrientationById;
  }

  public async deleteOrientation(orientationId: string): Promise<IOrientation> {
    const deleteOrientationById: IOrientation = await this.orientation.findByIdAndDelete(orientationId);
    if (!deleteOrientationById) throw new HttpException(409, `Orientation with Id:${orientationId}, does not exist`);
    return deleteOrientationById;
  }

  private async fetchITEmail(ids): Promise<{ emails: any[] }> {
    const designatedEmails = await this.employee.find(
      { designation: { $in: ids } },
      {
        company_email: 1,
        _id: 0,
      },
    );

    const newResult = designatedEmails.map(designatedEmails => designatedEmails.company_email);

    return {
      emails: newResult,
    };
  }

  private async fetchHREmail(ids): Promise<{ emails: any[] }> {
    const designatedEmails = await this.employee.find(
      { designation: { $in: ids } },
      {
        company_email: 1,
        _id: 0,
      },
    );

    const newResult = designatedEmails.map(designatedEmails => designatedEmails.company_email);

    return {
      emails: newResult,
    };
  }

  private async fetchAccountEmail(ids): Promise<{ emails: any[] }> {
    const designatedEmails = await this.employee.find(
      { designation: { $in: ids } },
      {
        company_email: 1,
        _id: 0,
      },
    );

    const newResult = designatedEmails.map(designatedEmails => designatedEmails.company_email);

    return {
      emails: newResult,
    };
  }

  private async fetchOperationsEmail(ids): Promise<{ emails: any[] }> {
    const designatedEmails = await this.employee.find(
      { designation: { $in: ids } },
      {
        company_email: 1,
        _id: 0,
      },
    );

    const newResult = designatedEmails.map(designatedEmails => designatedEmails.company_email);

    return {
      emails: newResult,
    };
  }

  private async fetchFacilityEmail(ids): Promise<{ emails: string[] }> {
    const designatedEmails = await this.employee.find(
      { designation: { $in: ids } },
      {
        company_email: 1,
        _id: 0,
      },
    );

    const newResult = designatedEmails.map(designatedEmails => designatedEmails.company_email);

    return {
      emails: newResult,
    };
  }
}
export default OrientationService;

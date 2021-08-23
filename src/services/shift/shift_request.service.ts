import shiftRequestModel from '@models/shift/shift_request.model';
import { IShiftRequest } from '@interfaces/shift-interface/shift_request.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateShiftRequestDto, UpdateShiftRequestDto } from '@dtos/shift/shift_request.dto';

class ShiftRequestService {
  public shiftRequest = shiftRequestModel;

  //Method for finding all shift Request
  public async findAllShiftRequests(): Promise<IShiftRequest[]>{
    return this.shiftRequest.find();
  }

  //Method for finding a single shift Request
  public async findShiftRequestById(shiftRequestId: string): Promise<IShiftRequest>{
    //check if no shift Request id is empty
    if(isEmpty(shiftRequestId)) throw new HttpException(400,`Shift request with Id:${shiftRequestId}, does not exist`);
    //find shift Request using the id provided
    const findShiftRequest:IShiftRequest = await this.shiftRequest.findOne({_id:shiftRequestId});
    //throw error if shift Request does not exist
    if(!findShiftRequest) throw new HttpException(409,`Shift request with Id:${shiftRequestId}, does not exist`);
    //return shift Request
    return findShiftRequest;
  }

  //Method for creating shift Request
  public async createShiftRequest(shiftRequestData: CreateShiftRequestDto): Promise<IShiftRequest>{
    //check if no shift Request data is empty
    if (isEmpty(shiftRequestData)) throw new HttpException(400, "Bad request");
    //find shift Request using the employee id provided
    const findShitRequest: IShiftRequest = await this.shiftRequest.findOne({ employee_id: shiftRequestData.employee_id });
    //throw error if shift Request does exist
    if (findShitRequest) throw new HttpException(409, `${shiftRequestData.employee_id} already exists`);
    // return created shift Request
    return await this.shiftRequest.create(shiftRequestData);
  }

  //Method for updating shift Request
  public async updateShiftRequest(shiftRequestId: string,shiftRequestData: UpdateShiftRequestDto):Promise<IShiftRequest>{
    //check if no shift Request data is empty
    if (isEmpty(shiftRequestData)) throw new HttpException(400, "Bad request");
    if(shiftRequestData._id){
      //find shift Request using the employee id provided
      const findShitRequest: IShiftRequest = await this.shiftRequest.findOne({ _id: shiftRequestData._id });
      if(findShitRequest && findShitRequest._id != shiftRequestId) throw new HttpException(409, `${shiftRequestData.employee_id} already exists`);
    }
    //find shift Request using the id provided and update it
    const updateShiftRequestById:IShiftRequest = await this.shiftRequest.findByIdAndUpdate(shiftRequestId,{shiftRequestData})
    if (!updateShiftRequestById) throw new HttpException(409, "shift request could not be updated");
    // return updated shift Request
    return updateShiftRequestById;
  }

  //Method for deleting shift Request
  public async deleteShiftRequest(shiftRequestId: string):Promise<IShiftRequest>{
    //find shift Request using the id provided and delete
    const deleteShiftRequestById: IShiftRequest = await this.shiftRequest.findByIdAndDelete(shiftRequestId);
    if(!deleteShiftRequestById) throw new HttpException(409, `Shift request with Id:${shiftRequestId}, does not exist`);
    return deleteShiftRequestById;
  }
}

export default ShiftRequestService;

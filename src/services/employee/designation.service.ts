/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Designation } from '@/interfaces/employee-interface/designation.interface';
import { CreateDesignationDto,UpdateDesignationDto } from '@/dtos/employee/designation.dto';
import DesignationModel from '@models/employee/designation.model';
import { slugify } from '@/utils/slugify';


class DesignationService{
    public Designations = DesignationModel;

/**
 * Returns all designations
 */

    public async findAllDesignations(): Promise<Designation[]>{
        const Designations : Designation[] = await this.Designations.find({delete:{$ne: true}});
        return Designations;
        }

    /**
     * Returns Designations with the Id given
     */

    public async findDesignationById(DesignationId:string) : Promise<Designation>{
    
        //Check if Id is empty
        if (isEmpty(DesignationId)) throw new HttpException(400, "No Id provided");
        const findDesignation:Designation = await this.Designations.findOne({ _id:DesignationId });

        if(!findDesignation) throw new HttpException(409, "Designation with that Id doesnt exist");

        return findDesignation;
        }
    public async findDesignationBydepartmentId(DepartmentId:string) : Promise<Designation[]>{
        if (isEmpty(DepartmentId)) throw new HttpException(400, "No Id provided");
        const findDesignation:Designation[] = await this.Designations.find({ department_id: DepartmentId, delete:{$ne: true}});
        if(!findDesignation) throw new HttpException(409, "Designation with that DepartmentId doesnt exist");
        return findDesignation;
        }
    public async createDesignation(DesignationData: CreateDesignationDto) : Promise<Designation>{

    //Check if data is empty
    if (isEmpty(DesignationData)) throw new HttpException(400, "No data provided");

    const findDesignation: Designation = await this.Designations.findOne({Designation: DesignationData.designation});
    if(findDesignation) throw new HttpException(409, `Designation ${DesignationData.designation} already exists`);
    const data = {
    ...DesignationData,
    slug: slugify(DesignationData.designation)
    }
    const createDesignationData: Designation = await this.Designations.create(data);
    return createDesignationData;
    }
    public async updateDesignation(DesignationId:string,DesignationData: UpdateDesignationDto)  : Promise<Designation>{
    if (isEmpty(DesignationData)) throw new HttpException(400, "No data provided");
    const updateDesignationById: Designation = await this.Designations.findByIdAndUpdate(DesignationId,DesignationData, {new: true});
    if(!updateDesignationById) throw new HttpException(409, "Designation doesn't exist");
        return updateDesignationById;
    } 
    //deletes existing designation
    public async deleteDesignation(DesignationId:string) : Promise<Designation>{
    const deleteDesignationById : Designation = await this.Designations.findByIdAndUpdate({DesignationId},{
        $set:{
            delete: true
        }
    });
    if(!deleteDesignationById) throw new HttpException(409, "Designation doesn't exist");
    return deleteDesignationById;
    }

}

export default DesignationService;
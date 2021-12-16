/* eslint-disable prettier/prettier */
import { CreateRoleAssignmentDto, UpdateRoleAssignmentDto } from '@/dtos/role/role-assignment.dto';
import { HttpException } from '@exceptions/HttpException';
import { roleAssignment } from '@/interfaces/role/role-assignment.interface';
import RoleAssignmentModel from '@/models/role/role-assignment.model';
import { isEmpty } from '@utils/util';


class RoleAssignmentService {
    public Role = RoleAssignmentModel;

    /**
     *Returns all Roles
     */
    public async findAllRoleAssignment(): Promise<roleAssignment[]> { 
        const Role: roleAssignment[] = await this.Role.find()
        .populate({path:"assigned_to"})
        .populate({path:"assigned_by"})
        .populate({path: "RoleId"})

        
       
        console.log("Roles", Role);
        return Role;
        
    }

    /**
     *Returns the Roles with the Id given
     */
    public async findRoleAssignmentById(RolesId:string) : Promise<roleAssignment>
    {
       //Check if Id is empty
       if (isEmpty(RolesId)) throw new HttpException(400, "No Id provided");

       //find Roles with Id given
       const findRoles:roleAssignment = await this.Role.findOne({  _id: RolesId}).populate("assigned_to assigned_by RoleId");

       if(!findRoles) throw new HttpException(409, "Role with that Id doesnt exist");

       return findRoles;
        
    }

    /**
     *Creates a new Roles 
     */


     public async createRoleAssignment(RolesData: CreateRoleAssignmentDto) : Promise<roleAssignment>{
        
        //Check if data is empty
       if (isEmpty(RolesData)) throw new HttpException(400, "No data provided");

       const findRoles: roleAssignment = await this.Role.findOne({Roles: RolesData.RoleId}).populate("assigned_to assigned_by RoleId");
       if(findRoles) throw new HttpException(409, `Role ${RolesData.RoleId} already exists`);
       

       const createRolesData: roleAssignment = await this.Role.create( RolesData);
       return createRolesData;
     }

     /**
     *Updates existing Roles 
     */

     public async updateRoleAssignment(RolesId:string,RolesData: UpdateRoleAssignmentDto)  : Promise<roleAssignment>{

        //Check if data is empty
        if (isEmpty(RolesData)) throw new HttpException(400, "No data provided");

        const updateRolesById: roleAssignment = await this.Role.findByIdAndUpdate(RolesId,RolesData, {new : true});
        if(!updateRolesById) throw new HttpException(409, "Role doesn't exist");
         return updateRolesById;
   }

     public async deleteRoleAssignment(RolesId:string) : Promise<roleAssignment>{
         const deleteRolesById : roleAssignment = await this.Role.findByIdAndDelete(RolesId);
         if(!deleteRolesById) throw new HttpException(409, "Role doesn't exist");
         return deleteRolesById;
     }
 
     
}

export default RoleAssignmentService;

/* eslint-disable prettier/prettier */
import { CreateBranchDto, UpdateBranchDto } from '@/dtos/employee/branch.dto';
import { HttpException } from '@exceptions/HttpException';
import { Branch } from '@/interfaces/employee-interface/branch.interface';
import BranchModel from '@models/employee/branch.model';
import { isEmpty } from '@utils/util';

class BranchService {
    public Branches = BranchModel;

    /**
     *Returns all branches
     */
    public async findAllBranches(): Promise<Branch[]> { 
        const Branches: Branch[] = await this.Branches.find();
        return Branches;
        
    }

    /**
     *Returns the branch with the Id given
     */
    public async findBranchById(BranchId:string) : Promise<Branch>
    {
       //Check if Id is empty
       if (isEmpty(BranchId)) throw new HttpException(400, "No Id provided");

       //find branch with Id given
       const findBranch:Branch = await this.Branches.findOne({ _id:BranchId  });

       if(!findBranch) throw new HttpException(409, "Branch with that Id doesnt exist");

       return findBranch;
        
    }

    /**
     *Creates a new branch 
     */


     public async createBranch(BranchData: CreateBranchDto) : Promise<Branch>{
        
        //Check if data is empty
       if (isEmpty(BranchData)) throw new HttpException(400, "No data provided");

       const findBranch: Branch = await this.Branches.findOne({branch: BranchData.branch});
       if(findBranch) throw new HttpException(409, `Branch ${BranchData.branch} already exists`);

       const createBranchData: Branch = await this.Branches.create(BranchData);
       return createBranchData;
     }

     /**
     *Updates existing branch 
     */

     public async updateBranch(BranchId:string,BranchData: UpdateBranchDto)  : Promise<Branch>{

        //Check if data is empty
        if (isEmpty(BranchData)) throw new HttpException(400, "No data provided");

        const updateBranchById: Branch = await this.Branches.findByIdAndUpdate(BranchId,BranchData,{new:true});
        if(!updateBranchById) throw new HttpException(409, "Branch doesn't exist");
         return updateBranchById;
   }

     public async deleteBranch(BranchId:string) : Promise<Branch>{
         const deleteBranchById : Branch = await this.Branches.findByIdAndDelete(BranchId);
         if(!deleteBranchById) throw new HttpException(409, "Branch doesn't exist");
         return deleteBranchById;
     }

}

export default BranchService;

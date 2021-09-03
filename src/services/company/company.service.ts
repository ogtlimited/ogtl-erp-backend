/* eslint-disable prettier/prettier */
import { CreateCompanyDto, UpdateCompanyDto } from '@/dtos/company/company.dto';
import { HttpException } from '@exceptions/HttpException';
import { Company } from '@/interfaces/company/company.interface';
import CompanyModel from '@models/company/company.model';
import { isEmpty } from '@utils/util';

class CompanyService {
    public Companies = CompanyModel;

    /**
     *Returns all Company
     */
    public async findAllCompanies(): Promise<Company[]> { 
        const Companies: Company[] = await this.Companies.find();
        return Companies;
        
    }

    /**
     *Returns the Company with the Id given
     */
    public async findCompanyById(CompanyId:string) : Promise<Company>
    {
       //Check if Id is empty
       if (isEmpty(CompanyId)) throw new HttpException(400, "No Id provided");

       //find Company with Id given
       const findCompany:Company = await this.Companies.findOne({ _id:CompanyId  });

       if(!findCompany) throw new HttpException(409, "Company with that Id doesnt exist");

       return findCompany;
        
    }

    /**
     *Creates a new Company 
     */


     public async createCompany(CompanyData: CreateCompanyDto) : Promise<Company>{
        
        //Check if data is empty
       if (isEmpty(CompanyData)) throw new HttpException(400, "No data provided");

       const findCompany: Company = await this.Companies.findOne({Company: CompanyData.companyName});
       if(findCompany) throw new HttpException(409, `Company ${CompanyData.companyName} already exists`);

       const createCompanyData: Company = await this.Companies.create(CompanyData);
       return createCompanyData;
     }

     /**
     *Updates existing Company 
     */

     public async updateCompany(CompanyId:string,CompanyData: UpdateCompanyDto)  : Promise<Company>{

        //Check if data is empty
        if (isEmpty(CompanyData)) throw new HttpException(400, "No data provided");

        const updateCompanyById: Company = await this.Companies.findByIdAndUpdate(CompanyId,{CompanyData});
        if(!updateCompanyById) throw new HttpException(409, "Company doesn't exist");
         return updateCompanyById;
   }

     public async deleteCompany(CompanyId:string) : Promise<Company>{
         const deleteCompanyById : Company = await this.Companies.findByIdAndDelete(CompanyId);
         if(!deleteCompanyById) throw new HttpException(409, "Company doesn't exist");
         return deleteCompanyById;
     }

}

export default CompanyService;

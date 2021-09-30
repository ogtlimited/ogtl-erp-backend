/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { EmergencyContact } from '@/interfaces/employee-interface/emergency-contact.interface';
import { CreateEmergencyContactDto, UpdateEmergencyContactDto } from '@/dtos/employee/emergency-contact.dto';
import EmergencyContactModel from '@models/employee/emergency-contact.model';


class EmergencyContactService{
    public EmergencyContacts = EmergencyContactModel;

    //Returns all emergency contacts

  //Returns all emergency contacts

  public async findAllEmergencyContacts(): Promise<EmergencyContact[]>{
    return this.EmergencyContacts.find();

  }

  //finds emergency Contacts  by Id

  public async findEmergencyContactById(EmergencyContactId: string) : Promise<EmergencyContact[]>{
    if (isEmpty(EmergencyContactId)) throw new HttpException(400, "No Id provided");
    return this.EmergencyContacts.find({ employee_id: EmergencyContactId });
  }


    //Creates new emergency Contact
    public async createEmergencyContact(EmergencyContactData:CreateEmergencyContactDto) : Promise<EmergencyContact>{

        if (isEmpty(EmergencyContactData)) throw new HttpException(400, "No data provided");
      return await this.EmergencyContacts.create(EmergencyContactData);
    }



    //Updates EmergencyContact Details

    public async updateEmergencyContact(EmergencyContactId:string,EmergencyContactData:UpdateEmergencyContactDto):Promise<EmergencyContact>{
        if (isEmpty(EmergencyContactData)) throw new HttpException(400, "No data provided");

        if(EmergencyContactData.employee_id){
            const findEmergencyContact: EmergencyContact = await this.EmergencyContacts.findOne({Id:EmergencyContactData.employee_id});
            if(findEmergencyContact && findEmergencyContact._id != EmergencyContactId) throw new HttpException(409, `Employee ${EmergencyContactData.employee_id} Emergency Contact details dont exist`);
        }

        const updateEmergencyContactData: EmergencyContact = await this.EmergencyContacts.findByIdAndUpdate(EmergencyContactId,EmergencyContactData ,{new:true})
        if(!updateEmergencyContactData) throw new HttpException(409, "details could not be updated");
        return updateEmergencyContactData;
    }

     //deletes EmergencyContact Details

     public async deleteEmergencyContact(EmergencyContactId:string): Promise<EmergencyContact>{
        const deleteEmergencyContactById: EmergencyContact = await this.EmergencyContacts.findByIdAndDelete(EmergencyContactId);
        if(!deleteEmergencyContactById) throw new HttpException(409, "Details don't exist");
        return deleteEmergencyContactById;


    }

}

export default EmergencyContactService;

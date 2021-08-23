import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { EmergencyContact } from '@/interfaces/employee-interface/emergency-contact.interface';
import { CreateEmergencyContactDto } from '@/dtos/employee/emergency-contact.dto';
import EmergencyContactModel from '@models/employee/emergency-contact.model'


class EmergencyContactService{
    public EmergencyContacts = EmergencyContactModel;

    //Returns all emergency contacts

    public async findAllEmergencyContacts(): Promise<EmergencyContact[]>{
        const EmergencyContacts: EmergencyContact[] = await this.EmergencyContacts.find();
        return EmergencyContacts

    }

    //finds emergency Contacts  by Id

    public async findEmergencyContactById(EmergencyContactId: string) : Promise<EmergencyContact>{
        if (isEmpty(EmergencyContactId)) throw new HttpException(400, "No Id provided");
       //find EmergencyContact Details with Id given

       const findEmergencyContact: EmergencyContact = await this.EmergencyContacts.findOne({_id:EmergencyContactId});

       if(!findEmergencyContact) throw new HttpException(409, "Details with that Id dont exist");

       return findEmergencyContact

    }


    //Creates new emergency Contact
    public async createEmergencyContact(EmergencyContactData:CreateEmergencyContactDto) : Promise<EmergencyContact>{
    
        if (isEmpty(EmergencyContactData)) throw new HttpException(400, "No data provided");

        //check if employee already provided emergency contact details
        const findEmergencyContact: EmergencyContact = await this.EmergencyContacts.findOne({id: EmergencyContactData.employee_id});

        if(findEmergencyContact) throw new HttpException(409, `Employee ${EmergencyContactData.employee_id} already provided details`);

        const createEmergencyContactData = await this.EmergencyContacts.create({EmergencyContactData});

        return createEmergencyContactData;
    }



    //Updates EmergencyContact Details

    public async updateEmergencyContact(EmergencyContactId:string,EmergencyContactData:CreateEmergencyContactDto):Promise<EmergencyContact>{
        if (isEmpty(EmergencyContactData)) throw new HttpException(400, "No data provided");

        if(EmergencyContactData.employee_id){
            const findEmergencyContact: EmergencyContact = await this.EmergencyContacts.findOne({Id:EmergencyContactData.employee_id});
            if(findEmergencyContact && findEmergencyContact._id != EmergencyContactId) throw new HttpException(409, `Employee ${EmergencyContactData.employee_id} Emergency Contact details dont exist`);
        }

        const updateEmergencyContactData: EmergencyContact = await this.EmergencyContacts.findByIdAndUpdate(EmergencyContactId,{EmergencyContactData})
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
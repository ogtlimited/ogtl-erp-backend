/* eslint-disable prettier/prettier */
import moment from 'moment';
import PersonalDetailsModel from '@models/employee/personal-details.model';
import EmployeesModel from '@models/employee/employee.model';

class EmployeeBirthDayService {
    private PersonalDetailsModel = PersonalDetailsModel;
    private Employees = EmployeesModel;
    
    public async getTodaysCelebrantsId(){
        const today: any = moment(new Date()).format('MMMM Do');
        const emPloyeeBirthday: any = await this.PersonalDetailsModel.find()
        const employeesId = (await Promise.all(emPloyeeBirthday))
        .map(employees => {
            return ({
              employee_id: employees.employee_id, 
              date_of_birth: moment(employees.date_of_birth).format('MMMM Do')
            })
          }).filter(employee => employee.date_of_birth === today).map(employee => employee.employee_id)
          return employeesId
      }
  
      public async getTodaysCelebrantsDetails(){
        const employeesId = await this.getTodaysCelebrantsId()
        const employees:any = await this.Employees.find({
          '_id':{
            $in: employeesId
          }
        })
        const employeesDetails = (await Promise.all(employees)).map(employee =>{
          return{
            email: employee.company_email,
            first_name: employee.first_name.charAt(0).toUpperCase() + employee.first_name.toLowerCase().slice(1)
          }
        })
        return employeesDetails
      }

}

export default EmployeeBirthDayService;

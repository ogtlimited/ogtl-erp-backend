/* eslint-disable prettier/prettier */
import { CreateEmployeeShiftDto, UpdateEmployeeShiftDto } from '@dtos/shift/employee_shift.dto';
import { HttpException } from '@exceptions/HttpException';
import { IEmployeeShift } from '@interfaces/shift-interface/employee_shift.interface';
import EmployeeShiftModel from '@models/shift/employee_shift.model';
import { isEmpty } from '@utils/util';
import { SumHours } from '@utils/calculateTimeDifference';
import EmployeeModel from '@/models/employee/employee.model';
import CampaignModel from '@/models/project/project.model';
import { postgresDbConnection } from '@/utils/postgreQL';
import { ShiftTime } from '@/utils/postgreQL/shift_time.entity';
import { Staff } from '@/utils/postgreQL/staff.entity';
import { uuid } from 'uuidv4';
const fs = require("fs")
const csv = require('csv-parser')
class EmployeeShiftService {
    public employeeShiftModel = EmployeeShiftModel;
    public employeeModel = EmployeeModel;
    public campaignModel = CampaignModel;
    constructor() {
    }

    public async findAllEmployeesShift(): Promise<IEmployeeShift[]> {
        return this.employeeShiftModel.find()
    }
    public async findEmployeeShiftById(employeeShiftId: string): Promise<IEmployeeShift> {
        if (isEmpty(employeeShiftId)) throw new HttpException(400, "No shift Id provided");
        const findEmployeeShift: IEmployeeShift = await this.employeeShiftModel.findOne({ _id: employeeShiftId });
        if (!findEmployeeShift) throw new HttpException(409, "You're not shiftType");
        return findEmployeeShift;
    }

    public async findEmployeeShiftByOGID(ogid: string): Promise<IEmployeeShift[]> {
        if (isEmpty(ogid)) throw new HttpException(400, "No shift Id provided");
        const findEmployeeShift: IEmployeeShift[] = await this.employeeShiftModel.find({ ogid: ogid });
        return findEmployeeShift;
    }

    public async createNewEmployeeShift(shiftData: IEmployeeShift): Promise<IEmployeeShift> {
        if (isEmpty(shiftData)) throw new HttpException(400, "Bad request");
        const findShift: IEmployeeShift = await this.employeeShiftModel.findOne({ day: shiftData.day, ogid: shiftData.ogid });
        if (!findShift) {
            shiftData.end = shiftData.off ?  null : shiftData.end;
            shiftData.start = shiftData.off ? null : shiftData.start;
            const result = SumHours(shiftData.end, shiftData.start)
            shiftData.expectedWorkTime = result ? result.toString() : null
            return await this.employeeShiftModel.create(shiftData);
        }
    }
    public async createExistingEmployeesShift(shiftData: IEmployeeShift[]): Promise<IEmployeeShift[]> {
        if (shiftData.length == 0) throw new HttpException(400, "Bad request");
        const newShifts: IEmployeeShift[] = []
        for (let i = 0; i < shiftData.length; i++){
            const employeeDetails = await this.employeeModel.findOne({ ogid: shiftData[i].ogid })
            const findShift: IEmployeeShift = await this.employeeShiftModel.findOne({ day: shiftData[i].day, ogid: shiftData[i].ogid });
            if (!findShift) {
                shiftData[i].end = shiftData[i].off ? null : shiftData[i].end;
                shiftData[i].start = shiftData[i].off ? null : shiftData[i].start;
                shiftData[i].departmentID = employeeDetails.department ? employeeDetails.department : null;
                shiftData[i].campaignID = employeeDetails.projectId ? employeeDetails.projectId : null;
                const result = SumHours(shiftData[i].end, shiftData[i].start)
                shiftData[i].expectedWorkTime = result ? result.toString() : null
                newShifts.push(await this.employeeShiftModel.create(shiftData[i]));
            }
        }
        await this.addOrUpdateEmployeeShiftTimeToExternalDatabase(shiftData)
        return newShifts
    }

    public async updateEmployeeShift(shiftData: UpdateEmployeeShiftDto[]): Promise<IEmployeeShift[]> {
        if (shiftData.length==0) throw new HttpException(400, "Bad request");
        let updateEmployeeShiftById: IEmployeeShift[] = []
        for(let i = 0; i < shiftData.length; i++){
            shiftData[i].end = shiftData[i].off ? null : shiftData[i].end;
            shiftData[i].start = shiftData[i].off ? null : shiftData[i].start;
            const result = SumHours(shiftData[i].end, shiftData[i].start)
            shiftData[i].expectedWorkTime = result ? result.toString() : null
            const updatedEmployeeShift = await this.employeeShiftModel
                .findByIdAndUpdate({ _id: shiftData[i]._id }, shiftData[i], {new: true})
            updateEmployeeShiftById.push(updatedEmployeeShift);
        }
        if (!updateEmployeeShiftById) throw new HttpException(409, "shift does not exist");
        await this.addOrUpdateEmployeeShiftTimeToExternalDatabase(shiftData)
        return updateEmployeeShiftById
    }

    public async getShiftTimeFromExternalDatabase(query): Promise<any> {
        const shiftTime = await postgresDbConnection.getRepository(ShiftTime)
            .createQueryBuilder("shifttime")
            .innerJoin("shifttime.staff", "staff")
            .where("staff.StaffUniqueId = :ogid", { ogid: query.ogid })
            .getMany()
        return shiftTime
    }

    public async deleteEmployeeShift(employeeShiftId: string): Promise<IEmployeeShift> {
        const deletedShift: IEmployeeShift = await this.employeeShiftModel.findByIdAndDelete(employeeShiftId);
        if (!deletedShift) throw new HttpException(409, "shift does not exist");
        return deletedShift;
    }
    public async getshiftTypeBasedOnOffice(query): Promise<IEmployeeShift[]> {
        if (query.departmentId) {
            const shift: IEmployeeShift[] = await this.employeeShiftModel.find({ departmentId: query.departmentId });
            return shift
        }
        if (query.campaignId) {
            const shift: IEmployeeShift[] = await this.employeeShiftModel.find({ campaignId: query.campaignId });
            return shift
        }
    }
    public async createEmployeesShiftFromCsvFile(): Promise<any> {
        const csv_path = "./src/services/shift/csv_files/nonStrictShift.csv"
        await this.deleteManyShift(csv_path)
        fs.createReadStream(csv_path)
            .pipe(csv())
            .on('data', async (data) => {
                const days = ["mon","tue","wed","thu","fri","sat","sun"]
                const start = data['Shift (Mon - fri)'].split('-')[0].trim()
                const end = data['Shift (Mon - fri)'].split('-')[1].trim()
                const huddles = data['Huddles'] ? data['Huddles'].split(':')[0].trim() : false
                const huddleTime = data['Huddles'] ? data['Huddles'].split(':')[1].trim() : null
                const campaign = await this.campaignModel.findOne({ project_name: data['Campaign'] })
                const employee = await this.employeeModel.findOne({ ogid: data['OGID'] })
                
                if(!employee){
                    fs.appendFileSync('./src/services/shift/csv_files/employees_emails_with_issues.csv', `${data['OGID']}\n`);
                }
                if (employee){
                    for (let i = 0; i < days.length; i++){
                        const formattedData = {
                            start: start,
                            end: end,
                            day: days[i],
                            ogid: employee ? employee.ogid : null,
                            campaignID: campaign ? campaign._id : null,
                            departmentID: employee ? employee.department : null,
                            huddles: huddles ? true : false,
                            huddleTime: huddleTime,
                        }
                        const result = SumHours(formattedData.end, formattedData.start)
                        formattedData['expectedWorkTime'] = result ? result.toString() : null
                        if (formattedData.day == "sat" || formattedData.day == "sun"){
                            formattedData.start = null
                            formattedData.end = null
                            formattedData.end = null
                            formattedData['expectedWorkTime'] = null
                            formattedData.huddles = false
                            formattedData.huddleTime = null
                        }
                        const employeeShift = await this.employeeShiftModel.findOne({ ogid: formattedData?.ogid, day: formattedData.day })
                        if(!employeeShift){
                            const shift = await this.employeeShiftModel.create(formattedData)
                        }
                        await this.addOrUpdateOneEmployeeShiftTimeToExternalDatabase(formattedData)
                    }
                    
                }  
            }
            ).on('end', () => {
                // console.log("formattedData", arrayOfShift)
                console.log("Completed!!!")
            })
        
    }
    public async updateEmployeesShiftFromCsvFile(): Promise<any> {
        let arrayOfShift = []
        fs.createReadStream("./src/services/shift/csv_files/nonStrictShift.csv")
            .pipe(csv())
            .on('data', async (data) => {
                const days = ["mon","tue","wed","thu","fri","sat","sun"]
                const start = data['Shift (Mon - fri)'].split('-')[0].trim()
                const end = data['Shift (Mon - fri)'].split('-')[1].trim()
                const huddles = data['Huddles'] ? data['Huddles'].split(':')[0].trim() : false
                const huddleTime = data['Huddles'] ? data['Huddles'].split(':')[1].trim() : null
                const campaign = await this.campaignModel.findOne({ project_name: data['Campaign'] })
                const employee = await this.employeeModel.findOne({ company_email: data['Employee email'] })
                if(!employee){
                    fs.appendFileSync('./src/services/shift/csv_files/employees_emails_with_issues.csv', `${data['Employee email']}\n`);
                }
                if (employee){
                    for (let i = 0; i < days.length; i++){
                        const formattedData = {
                            start: start,
                            end: end,
                            day: days[i],
                            ogid: employee ? employee.ogid : null,
                            campaignID: campaign ? campaign._id : null,
                            departmentID: employee ? employee.department : null,
                            huddles: huddles ? true : false,
                            huddleTime: huddleTime,
                            expectedWorkTime: null,
                            off: false
                        }
                        const result = SumHours(formattedData.end, formattedData.start)
                        formattedData.expectedWorkTime = result ? result.toString() : null
                        if (formattedData.day == "sat" || formattedData.day == "sun"){
                            formattedData.start = null
                            formattedData.end = null
                            formattedData.end = null
                            formattedData.expectedWorkTime = null
                            formattedData.huddles = false
                            formattedData.huddleTime = null
                        }
                        formattedData.off = true
                        if (formattedData?.start && formattedData?.end) formattedData.off = false
                        const employeeShift = await this.employeeShiftModel.findOne({ ogid: formattedData?.ogid, day: formattedData.day })
                        if (!employeeShift) throw new HttpException(404, "No Shift was found")
                        if(employeeShift){
                            await this.employeeShiftModel.findOneAndUpdate({ ogid: formattedData?.ogid, day: formattedData?.day },{
                                $set:{
                                    start: formattedData.start,
                                    end: formattedData.end,
                                    expectedWorkTime: formattedData.expectedWorkTime,
                                    day: formattedData.day,
                                    huddles: formattedData.huddles,
                                    huddleTime: formattedData.huddleTime,
                                    off: formattedData.off
                                 }
                            }, { new: true })
                        }

                        arrayOfShift.push(formattedData)
                        console.log("formattedData", formattedData) 
                    }
                    if (arrayOfShift.length != null) await this.addOrUpdateEmployeeShiftTimeToExternalDatabase(arrayOfShift)
                    arrayOfShift = []
                }
            })
            .on('end', async () => {
                console.log("Completed!!!")
            })
    }
    public async createEmployeesFluctuatingShiftFromCsvFile(): Promise<any> {
        fs.createReadStream("./src/services/shift/csv_files/Gomoney_shift.csv")
            .pipe(csv())
            .on('data', async (data) => {
                const days = ["mon","tue","wed","thu","fri","sat","sun"]
                const fluctuating_shift_days = data['Shift (Mon - fri)'].split(',')
                const huddles = data['Huddles'] ? data['Huddles'].split(':')[0].trim() : false
                const huddleTime = data['Huddles'] ? data['Huddles'].split(':')[1].trim() : null
                const campaign = await this.campaignModel.findOne({ project_name: data['Campaign'] })
                const employee = await this.employeeModel.findOne({ company_email: data['Employee email'] })
                if(!employee){
                    fs.appendFileSync('./src/services/shift/csv_files/employees_emails_with_issues.csv', `${data['Employee email']}\n`);
                }
                if (employee){
                    for (let i = 0; i < days.length; i++){
                        const start = fluctuating_shift_days[i] ? fluctuating_shift_days[i]?.split("-")[0].trim() : null
                        const end = fluctuating_shift_days[i] ? fluctuating_shift_days[i]?.split("-")[1].trim() : null
                        const formattedData = {
                            start: start,
                            end: end,
                            day: days[i],
                            ogid: employee ? employee.ogid : null,
                            campaignID: campaign ? campaign._id : null,
                            departmentID: employee ? employee.department : null,
                            huddles: huddles ? true : false,
                            huddleTime: huddleTime,
                        }
                        const result = SumHours(formattedData.end, formattedData.start)
                        formattedData['expectedWorkTime'] = result ? result.toString() : null
                        if (formattedData.day == "sat" || formattedData.day == "sun"){
                            formattedData.start = null
                            formattedData.end = null
                            formattedData.end = null
                            formattedData['expectedWorkTime'] = null
                            formattedData.huddles = false
                            formattedData.huddleTime = null
                        }
                        const employeeShift = await this.employeeShiftModel.findOne({ ogid: formattedData?.ogid, day: formattedData.day })
                        if(!employeeShift){
                            const shift = await this.employeeShiftModel.create(formattedData)
                        }
                        console.log("formattedData", formattedData)
                    } 
                  
                }
            })
            .on('end', async () => {
                console.log("Completed!!!")
            })
    }


    public async addOrUpdateOneEmployeeShiftTimeToExternalDatabase(shiftData): Promise<any> {
        const days_of_the_week = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 }

        shiftData.day = days_of_the_week[shiftData.day]
        const staff = await postgresDbConnection.getRepository(Staff)
            .createQueryBuilder("staff")
            .where({ StaffUniqueId: shiftData.ogid })
            .getOne()

        if (staff) {
            const shiftTimeExist = await postgresDbConnection.getRepository(ShiftTime)
                .createQueryBuilder()
                .where({ StaffId: staff?.Id })
                .andWhere({ DayOfTheWeek: shiftData.day })
                .getOne()

            if (!shiftTimeExist) {
                const formatedShiftTimeData: any = {
                    Id: uuid(),
                    StaffId: staff?.Id,
                    DayOfTheWeek: Number(shiftData.day),
                    StartTime: shiftData.start,
                    EndTime: shiftData.end,
                }
                await postgresDbConnection.getRepository(ShiftTime)
                    .createQueryBuilder()
                    .insert()
                    .into(ShiftTime)
                    .values(formatedShiftTimeData)
                    .execute()
            }
            else if (shiftTimeExist) {
                await postgresDbConnection.getRepository(ShiftTime)
                    .createQueryBuilder()
                    .update(ShiftTime)
                    .set({
                        StartTime: shiftData.start,
                        EndTime: shiftData.end,
                    })
                    .where({ StaffId: staff?.Id })
                    .andWhere({ DayOfTheWeek: shiftData.day })
                    .execute()

            }
        }
    }
    public async addOrUpdateEmployeeShiftTimeToExternalDatabase(shiftData): Promise<any> {
        const days_of_the_week = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 }
        const formattedShiftData = shiftData.map(data => {
            data.day = days_of_the_week[data.day]
            return data
        })
        const staff = await postgresDbConnection.getRepository(Staff)
            .createQueryBuilder("staff")
            .where({ StaffUniqueId: shiftData[0].ogid })
            .getOne()

        if (staff) {
            for (let i = 0; i < formattedShiftData.length; i++) {
                const shiftTimeExist = await postgresDbConnection.getRepository(ShiftTime)
                    .createQueryBuilder()
                    .where({ StaffId: staff?.Id })
                    .andWhere({ DayOfTheWeek: formattedShiftData[i].day })
                    .getOne()

                if (!shiftTimeExist) {
                    const formatedShiftTimeData: any = {
                        Id: uuid(),
                        StaffId: staff?.Id,
                        DayOfTheWeek: Number(formattedShiftData[i].day),
                        StartTime: formattedShiftData[i].start,
                        EndTime: formattedShiftData[i].end,
                    }
                    await postgresDbConnection.getRepository(ShiftTime)
                        .createQueryBuilder()
                        .insert()
                        .into(ShiftTime)
                        .values(formatedShiftTimeData)
                        .execute()
                }
                else if (shiftTimeExist) {
                    await postgresDbConnection.getRepository(ShiftTime)
                        .createQueryBuilder()
                        .update(ShiftTime)
                        .set({
                            StartTime: formattedShiftData[i].start,
                            EndTime: formattedShiftData[i].end,
                        })
                        .where({ StaffId: staff?.Id })
                        .andWhere({ DayOfTheWeek: formattedShiftData[i].day })
                        .execute()
                }

            }
        }
    }
    private async deleteManyShift(csv_path): Promise<any> {
        fs.createReadStream(csv_path)
            .pipe(csv())
            .on('data', async (data) => {
                const employeeShift = await this.employeeShiftModel.find({ ogid: data['OGID'] })
                if (employeeShift.length !=0) {
                    await this.employeeShiftModel.deleteMany({ ogid: data['OGID'] })
                }
            })
            .on('end', async () => {
            })
    }
}
export default EmployeeShiftService;

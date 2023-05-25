
import employeeShiftsModel from '@/models/shift/employee_shift.model';
import { postgresDbConnection } from '@/utils/postgreQL';
import { Staff } from '@/utils/postgreQL/staff.entity';
import EmployeeModel from '@models/employee/employee.model';
const fs = require('fs')

class TimeAndAttendanceEnrolledStaffService {
    private employeeModel = EmployeeModel;
    private employeeShiftsModel = employeeShiftsModel;
    public async findEnrolledStaff(): Promise<any> {
        const staff = await postgresDbConnection.getRepository(Staff)
            .createQueryBuilder("staff")
            .where({})
            .getMany()
            const ogID = staff.map(eachStaff => eachStaff.StaffUniqueId)
            return ogID
    }
    public async findStaffThatAreNotEnrolled(): Promise<any> {
        const staff = await this.employeeModel.find({
            status: "active",
            'ogid': {
                $nin: await this.findEnrolledStaff()
            }
        }).select({ 'first_name': 1, 'last_name': 1, 'company_email': 1, 'ogid': 1, '_id': 0, 'department':1, 'projectId':1})
        .populate("department")
        .populate("projectId")

        const csvString = [
            [
                "first_name",
                "last_name",
                "company_email",
                "ogid",
                "department",
                "campaign"
            ],
            ...staff.map(item => [
                item.first_name,
                item.last_name,
                item.company_email,
                item.ogid,
                item.department ? item.department.department : "Nil",
                item.projectId ? item.projectId.project_name : "Nil"
            ])
        ];
        let stringToReplaceComas = '!!!!';
        csvString.map((singleRow) => {
            singleRow.map((value, index) => {
                singleRow[index] = value.replace(/,/g, stringToReplaceComas);
            })
        })
        let csv = `"${csvString.join('"\n"').replace(/,/g, '","')}"`;
        csv = csv.replace(new RegExp(`${stringToReplaceComas}`, 'g'), ',');
        fs.writeFile('./src/services/attendance/csv/list_of_staffs_not_yet_enrolled.csv', csv, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else {
                console.log('It\'s saved!');
            }
        });
        return { count: staff.length, staff }
    }
    public async findStaffWithoutShift(): Promise<any> {
        const ogids = await this.employeeShiftsModel.distinct('ogid');
        const employees = await this.employeeModel.find({
            status: "active",
            'ogid': {
                $nin: ogids
            }
        }).select({ 'first_name': 1, 'last_name': 1, 'company_email': 1, 'ogid': 1, '_id': 0, 'department':1, 'projectId':1})
        .populate("department")
        .populate("projectId")

        const csvString = [
            [
                "first_name",
                "last_name",
                "company_email",
                "ogid",
                "department",
                "campaign"
            ],
            ...employees.map(item => [
                item.first_name,
                item.last_name,
                item.company_email,
                item.ogid,
                item.department ? item.department.department : "Nil",
                item.projectId ? item.projectId.project_name : "Nil"
            ])
        ];
        let stringToReplaceComas = '!!!!';
        csvString.map((singleRow) => {
            singleRow.map((value, index) => {
                singleRow[index] = value.replace(/,/g, stringToReplaceComas);
            })
        })
        let csv = `"${csvString.join('"\n"').replace(/,/g, '","')}"`;
        csv = csv.replace(new RegExp(`${stringToReplaceComas}`, 'g'), ',');
        fs.writeFile('./src/services/attendance/csv/employees_without_shift.csv', csv, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else {
                console.log('It\'s saved!');
            }
        });
        return { count: employees.length, employees }
    }
}
export default TimeAndAttendanceEnrolledStaffService;
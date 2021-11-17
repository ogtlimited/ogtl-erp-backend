/* eslint-disable prettier/prettier */

import projectModel from '@/models/project/project.model';
import RoleModel from '@/models/role/role.model';
import EmployeeModel from '@/models/employee/employee.model';
import { IProject } from '@/interfaces/project-interface/project.interface';
import { IRole } from '@/interfaces/role/role.interface';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProjectDto, UpdateProjectDto, ApproveProjectDto } from '@/dtos/project/project.dto';
import {campaignCreationEmail} from '@/utils/email';
import { slugify } from '@/utils/slugify';

const { SocketLabsClient } = require('@socketlabs/email');

class ProjectService {
    public project: any;
    public employee: any;
    public role: any;

    constructor() {
        this.project = projectModel;
        this.employee = EmployeeModel;
        this.role = RoleModel;
    }

    public async findAll(param: any = {}): Promise<IProject[]> {
        const projects: IProject[] = await this.project.find(param).populate("manager quality_analyst client_id creator");
        return projects;
    }

    public async find(projectId: string): Promise<IProject> {
        if (isEmpty(projectId)) throw new HttpException(400, "Missing Id Params");
        const findproject = this.findOne(projectId);
        if (!findproject) throw new HttpException(409, "Project not found");
        return findproject;
    }

    public async create(Payload: CreateProjectDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const data = {
            ...Payload,
            slug: slugify(Payload.project_name)
        }
        const newProject: IProject = await this.project.create(data);
        return newProject;
    }

    public async update(projectId: string, Payload: UpdateProjectDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findproject = this.findOne(projectId);
        if (!findproject) throw new HttpException(409, "Project not found");
        const updateProject: IProject = await this.project.findByIdAndUpdate(projectId, { Payload }, {new: true});
        return updateProject;
    }

    public async approve(projectId: string, Payload: ApproveProjectDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findproject = this.findOne(projectId);
        if (!findproject) throw new HttpException(409, "Project not found");
        const updateProject: IProject = await this.project.findByIdAndUpdate(projectId, { Payload }, {new: true});
        if(updateProject.status === "approved"){
            const getRoles: IRole = await this.role.find().select('_id')
            const params = {
                role_id: {
                    "$in": getRoles
                }
            }
            const getEmployeeWithRole: Employee = await this.employee.find(params).distinct("company_email")
            console.log(getEmployeeWithRole)
            const emailTemplate = campaignCreationEmail(getEmployeeWithRole, "A new campaign created. do the needful")
            const sclient = await new SocketLabsClient(parseInt(process.env.SOCKETLABS_SERVER_ID), process.env.SOCKETLABS_INJECTION_API_KEY);

            await sclient.send(emailTemplate).then(
                (response) => {
                    console.log(response)
                },
                (err) => {
                    //Handle error making API call
                    console.log(err);
                }
            );
        }
        return updateProject;
    }

    public async delete(projectId: string): Promise<IProject> {
        const drop: IProject = await this.project.findByIdAndDelete(projectId);
        if (!drop) throw new HttpException(409, `${projectId} Loan does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<IProject> {
        const findproject: IProject = await this.project.findOne({ _id: id }).populate("manager quality_analyst client_id creator");
        return findproject;
    }
}

export default ProjectService;

/* eslint-disable prettier/prettier */

import projectModel from '@/models/project/project.model';
import { IProject } from '@/interfaces/project-interface/project.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProjectDto, UpdateProjectDto, ApproveProjectDto } from '@/dtos/project/project.dto';

class ProjectService {
    public project: any;

    constructor() {
        this.project = projectModel;
    }

    public async findAll(param: any = {}): Promise<IProject[]> {
        const projects: IProject[] = await this.project.find(param);
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
        const newProject: IProject = await this.project.create(Payload);
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
        return updateProject;
    }

    public async delete(projectId: string): Promise<IProject> {
        const drop: IProject = await this.project.findByIdAndDelete(projectId);
        if (!drop) throw new HttpException(409, `${projectId} Loan does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<IProject> {
        const findproject: IProject = await this.project.findOne({ _id: id });
        return findproject;
    }
}

export default ProjectService;
/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { CreateProjectDto, UpdateProjectDto } from '@/dtos/project/project.dto';
import { IProject } from '@/interfaces/project-interface/project.interface';
import ProjectService from '@/services/project/project.service';

class ProjectController {
    public projectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    public getProjects = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllProjects: IProject[] = await this.projectService.findAll();
            res.status(200).json({ data: findAllProjects, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectId: string = req.params.projectId;
            const findProject: IProject = await this.projectService.find(projectId);
            res.status(200).json({ data: findProject, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: CreateProjectDto = req.body;
            const newProject: IProject = await this.projectService.create(Payload);
            res.status(201).json({ data: newProject, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectId: string = req.params.projectId;
            const Payload: UpdateProjectDto = req.body;
            const updateProject: IProject = await this.projectService.update(projectId, Payload);
            res.status(200).json({ data: updateProject, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteLoan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.loanId;
            const dropLoan: Loan = await this.loanService.delete(id);
            res.status(200).json({ data: dropLoan, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default LoanController;
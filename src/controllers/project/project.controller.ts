/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { CreateProjectDto, UpdateProjectDto, ApproveProjectDto, UpdateTeamMembersDto, UpdateTeamLeadDto } from '@/dtos/project/project.dto';
import { IProject } from '@/interfaces/project-interface/project.interface';
import ProjectService from '@/services/project/project.service';
import {opts} from '@/utils/rbac-opts';

const RBAC = require('easy-rbac');
const rbac = new RBAC(opts);

class ProjectController {
    public projectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    public getProjects = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can('ceo', 'ceo:super')
        .then(result => {
            if (result) {
                const findAllProjects: IProject[] = this.projectService.findAll();
                return findAllProjects;
            } else {
                const findAllProjects: IProject[] = this.projectService.findAll({status: 'approved'});
                return findAllProjects;
            }
        })
        .then(data => {
            res.status(200).json({ data: data, message: 'findAll2' });
        })
        .catch(err => {
            next(err);
        })
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
        let user = (<any>req).user
        rbac.can('coo', 'coo:create')
        .then(result => {
            if (result) {
                const Payload: CreateProjectDto = req.body;
                const newProject: IProject = this.projectService.create(Payload);
                return newProject;
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .then(data => {
            res.status(201).json({ data: data, message: 'created' });
        })
        .catch(err => {
            next(err);
        })
    };

    public updateProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectId: string = req.params.projectId;
            const Payload: ApproveProjectDto = req.body;
            const updateProject: IProject = await this.projectService.update(projectId, Payload);
            res.status(200).json({ data: updateProject, message: 'Campaign successfully updated.'});
          } catch (error) {
            console.log(error);
            next(error);
          }
    };

    public addProjectTeamLead = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectId: string = req.params.projectId;
            const Payload: UpdateTeamLeadDto = req.body;
            const updateProject: IProject = await this.projectService.updateTeamLead(projectId, Payload)
            res.status(200).json({ data: updateProject});
          } catch (error) {
            console.log(error);
            next(error);
          }
    };

    public removeProjectTeamLead = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectId: string = req.params.projectId;
            const Payload: UpdateTeamLeadDto = req.body;
            const updateProject: IProject = await this.projectService.removeTeamLead(projectId, Payload)
            res.status(200).json({ data: updateProject});
          } catch (error) {
            console.log(error);
            next(error);
          }
    };

    public addProjectTeamMembers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectId: string = req.params.projectId;
            const Payload: UpdateTeamMembersDto = req.body;
            const updateProject: IProject = await this.projectService.updateTeamMember(projectId, Payload)
            res.status(200).json({ data: updateProject});
          } catch (error) {
            console.log(error);
            next(error);
          }
    };

    public removeProjectTeamMembers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectId: string = req.params.projectId;
            const Payload: UpdateTeamMembersDto = req.body;
            const updateProject: IProject = await this.projectService.removeTeamMember(projectId, Payload)
            res.status(200).json({ data: updateProject});
          } catch (error) {
            console.log(error);
            next(error);
          }
    };


    public approveProject = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can(user.designation.designation, 'ceo:super')
        .then(result => {
            if (result) {
                const projectId: string = req.params.projectId;
                const Payload: ApproveProjectDto = req.body;
                const updateProject: IProject = this.projectService.update(projectId, Payload);
                return updateProject
            } else {
                res.status(403).json({ data: "Access denied"});
            }
        })
        .then(data => {
            res.status(200).json({ data: data});
        })
        .catch(err => {
            next(err);
        })
        
    };

    public deleteProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.projectId;
            const dropProject: IProject = await this.projectService.delete(id);
            res.status(200).json({ data: dropProject, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default ProjectController;

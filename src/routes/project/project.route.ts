/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateProjectDto, UpdateProjectDto, UpdateTeamMembersDto, UpdateTeamLeadDto, ApproveProjectDto } from '@dtos/project/project.dto';
import ProjectController from '@/controllers/project/project.controller';
import authMiddleware from '@middlewares/auth.middleware';

class ProjectRoute implements Routes {
  public path = '/api/project';
  public router = Router();
  public project = new ProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.project.getProjects);
    this.router.get(`${this.path}/:projectId`, this.project.getProject);
    this.router.post(`${this.path}`, [validationMiddleware(CreateProjectDto, 'body'), authMiddleware], this.project.createProject);
    this.router.put(`${this.path}/:projectId`, validationMiddleware(UpdateProjectDto, 'body'), this.project.updateProject);
    this.router.patch(`${this.path}/approve/:projectId`, [validationMiddleware(ApproveProjectDto, 'body'), authMiddleware], this.project.approveProject);
    this.router.patch(`${this.path}/add-team-lead/:projectId`, validationMiddleware(UpdateTeamLeadDto, 'body'), this.project.addProjectTeamLead);
    this.router.patch(`${this.path}/remove-team-lead/:projectId`, validationMiddleware(UpdateTeamLeadDto, 'body'), this.project.removeProjectTeamLead);
    this.router.patch(`${this.path}/add-team-member/:projectId`, validationMiddleware(UpdateTeamMembersDto, 'body'), this.project.addProjectTeamMembers);
    this.router.patch(`${this.path}/remove-team-member/:projectId`, validationMiddleware(UpdateTeamMembersDto, 'body'), this.project.removeProjectTeamMembers);
    this.router.delete(`${this.path}/:projectId`, this.project.deleteProject);
  }
}

export default ProjectRoute;

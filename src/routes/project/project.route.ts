/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateProjectDto, UpdateProjectDto } from '@dtos/project/project.dto';
import ProjectController from '@/controllers/project/project.controller';


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
    this.router.post(`${this.path}`, validationMiddleware(CreateProjectDto, 'body'), this.project.createProject);
    this.router.put(`${this.path}/:projectId`, validationMiddleware(UpdateProjectDto, 'body'), this.project.updateProject);
    this.router.delete(`${this.path}/:projectId`, this.project.deleteProject);
  }
}

export default ProjectRoute;

/* eslint-disable prettier/prettier */
import { CreateTaskDto } from "@dtos/task/task.dto";
import TaskController from '@/controllers/task/task.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import  permissionMiddleware  from '@/middlewares/permission.middleware';

class TaskRoute implements Routes {
  public path = '/api/task';
  public router = Router();
  public taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authMiddleware], this.taskController.findAll);
    this.router.get(`${this.path}/:id`, [authMiddleware], this.taskController.findById);
    this.router.get(`${this.path}/employee/all`, [authMiddleware], this.taskController.findAllEmployeeTasks);
    this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateTaskDto, 'body')], this.taskController.create);
    this.router.patch(`${this.path}/:id`, [authMiddleware], this.taskController.update);
  }
}
export default TaskRoute;

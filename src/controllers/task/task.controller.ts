/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateTaskDto } from '@/dtos/task/task.dto';
import { ITask } from '@/interfaces/task/task.interface';
import TaskService from '@/services/task/task.service';

class TaskController {
  public taskService = new TaskService();

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskEntries = await this.taskService.findAll(req.query);
      res.status(200).json({ data: taskEntries});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public findAllEmployeeTasks = async (req: any, res: Response, next: NextFunction) => {
    try {
      const taskEntries = await this.taskService.findAllEmployeeTask(req.user, req.query);
      res.status(200).json({ data: taskEntries});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.taskService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateTaskDto = req.body;
      const createdData: ITask = await this.taskService.create(req, newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };


  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const approvedTask = await this.taskService.update(req.params.id, req.body);
      res.status(200).json({ data: approvedTask});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

}

export default TaskController;

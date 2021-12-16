/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateRoleAssignmentDto, UpdateRoleAssignmentDto } from '@/dtos/role/role-assignment.dto';
import RoleAssignmentController from '@/controllers/role/role-assignment.controller';
import authMiddleware from '@middlewares/auth.middleware';

class RoleAssignmentRoute implements Routes {
    public path = '/api/role-assignment';
    public router = Router();
    public RolesController = new RoleAssignmentController();
    


    
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.RolesController.getRoleAssignment);
        this.router.get(`${this.path}/:id`,authMiddleware, this.RolesController.getRoleAssignmentById);
        this.router.post(`${this.path}` , [validationMiddleware(CreateRoleAssignmentDto, 'body'),authMiddleware], this.RolesController.CreateRoleAssignment);
        this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateRoleAssignmentDto, 'body', true),authMiddleware], this.RolesController.updateRoleAssignment);
        this.router.delete(`${this.path}/:id`,authMiddleware ,this.RolesController.deleteRoleAssignment);
      }
    }

    export default RoleAssignmentRoute;

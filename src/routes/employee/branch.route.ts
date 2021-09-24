/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBranchDto, UpdateBranchDto } from '@/dtos/employee/branch.dto';
import BranchesController from '@/controllers/employee/branch.controller';
import authMiddleware from '@middlewares/auth.middleware';

class BranchRoute implements Routes {
    public path = '/branch';
    public router = Router();
    public BranchController = new BranchesController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.BranchController.getBranches);
        this.router.get(`${this.path}/:id`,authMiddleware, this.BranchController.getBranchById);
        this.router.post(`${this.path}` , authMiddleware, validationMiddleware(CreateBranchDto, 'body'), this.BranchController.CreateBranch);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateBranchDto, 'body', true), this.BranchController.updateBranch);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.BranchController.deleteBranch);
      }
    }

    export default BranchRoute;

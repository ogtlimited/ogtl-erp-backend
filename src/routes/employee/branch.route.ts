import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBranchDto, UpdateBranchDto } from '@/dtos/employee/branch.dto';
import BranchesController from '@/controllers/employee/branch.controller';

class BranchRoute implements Routes {
    public path = '/branch';
    public router = Router();
    public BranchController = new BranchesController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.BranchController.getBranches);
        this.router.get(`${this.path}/:id`, this.BranchController.getBranchById);
        this.router.post(`${this.path}`, validationMiddleware(CreateBranchDto, 'body'), this.BranchController.CreateBranch);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateBranchDto, 'body', true), this.BranchController.updateBranch);
        this.router.delete(`${this.path}/:id`, this.BranchController.deleteBranch);
      }
    }

    export default BranchRoute;

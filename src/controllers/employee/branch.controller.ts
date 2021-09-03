/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateBranchDto, UpdateBranchDto } from '@/dtos/employee/branch.dto';
import { Branch } from '@/interfaces/employee-interface/branch.interface';
import BranchService from '@/services/employee/branch.service';

class BranchesController {
  public BranchService = new BranchService();

  //Returns all branches
  public getBranches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBranchesData: Branch[] = await this.BranchService.findAllBranches();

      res.status(200).json({ data: findAllBranchesData, numBranches: findAllBranchesData.length, message: 'All Branches' });
    } catch (error) {
      next(error);
    }
  };

  //creates Branch
  public CreateBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BranchData: CreateBranchDto = req.body;
      const createBranchData: Branch = await this.BranchService.createBranch(BranchData);
      res.status(201).json({ data: createBranchData, message: 'Branch succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one branch with Id given
  public getBranchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BranchId: string = req.params.id;
      const findOneBranchData: Branch = await this.BranchService.findBranchById(BranchId);
      res.status(200).json({ data: findOneBranchData, message: 'All Branches' });
    } catch (error) {
      next(error);
    }
  };

  //update branch
  public updateBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BranchId: string = req.params.id;
      const BranchData: UpdateBranchDto = req.body;
      const updateBranchData: Branch = await this.BranchService.updateBranch(BranchId, BranchData);
      res.status(200).json({ data: updateBranchData, message: 'Branch Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes branch
  public deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BranchId: string = req.params.id;
      const deleteBranchData: Branch = await this.BranchService.deleteBranch(BranchId);
      res.status(200).json({ data: deleteBranchData, message: 'Branch Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BranchesController;

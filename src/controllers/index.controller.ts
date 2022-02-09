/* eslint-disable prettier/prettier */
import CombineServices from '@/services/index.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public indexS = new CombineServices();
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
  public createEmployeeFormSelection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createEmployeeFormSelection = await this.indexS.createEmployeeFormSelection();

      res.status(200).json({ createEmployeeFormSelection, message: 'combined data result' });
    } catch (error) {
      next(error);
    }
  };
  //for creating new Employees
  public createEmployeeForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createEmployeeForm = await this.indexS.employeeForm()

      res.status(200).json({ createEmployeeForm, message: 'Employee data result' });
    } catch (error) {
      next(error);
    }
  };
  //for creating new shifts
  public createShiftForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createShiftForm = await this.indexS.shiftForm()

      res.status(200).json({ createShiftForm, message: 'Shift data result' });
    } catch (error) {
      next(error);
    }
  };

  //for creating new payroll
  public createPayrollForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createPayrollForm = await this.indexS.payrollForm()

      res.status(200).json({ createPayrollForm, message: 'Payroll data result' });
    } catch (error) {
      next(error);
    }
  };

  //for creating new recruitment
  public createRecruitmentForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createRecruitmentForm = await this.indexS.recruitmentForm()

      res.status(200).json({ createRecruitmentForm, message: 'Recruitment data result' });
    } catch (error) {
      next(error);
    }
  };

  //for creating new performance
  public createPerformanceForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createPerformanceForm = await this.indexS.performanceForm()

      res.status(200).json({ createPerformanceForm, message: 'Performance data result' });
    } catch (error) {
      next(error);
    }
  };
  //for creating new campaignForm
  public createCampaignForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createCampaignForm = await this.indexS.campaignForm()

      res.status(200).json({ createCampaignForm, message: 'Campaign data result' });
    } catch (error) {
      next(error);
    }
  };

//for creating new role Assignment Form
  public createRoleAssignmentForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createRoleAssignment = await this.indexS.roleAssignmentForm()

      res.status(200).json({ createRoleAssignment, message: 'Role assignment data result' });
    } catch (error) {
      next(error);
    }
  };

  public getAdminDashboardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAdminDashboardData = await this.indexS.adminDashboardDate();
      res.status(200).json({ getAdminDashboardData, message: 'combined admin data result' });
    }catch (e) {
      next(e)
    }
  }
  public getEmployeeFUllData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.id,
        getEmployeeFullData = await this.indexS.employeeFullInfo(employeeId);
      res.status(200).json({ getEmployeeFullData, message: 'Employee user data' });
    } catch (e) {
      next(e);
    }
  };
  public getAccountsDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAccountsData = await this.indexS.accountDashboard()
      res.status(200).json({ getAccountsData, message: 'Accounts data' });
    }
    catch (e) {
      next(e)
    }
  }

  public jobDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobData = await this.indexS.jobDashboard()
      res.status(200).json({ jobData, message: 'Job Dashboard Data' });
    }
    catch (e) {
      next(e)
    }
  }
}

export default IndexController;

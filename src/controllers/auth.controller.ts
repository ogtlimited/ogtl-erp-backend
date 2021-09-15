/* eslint-disable prettier/prettier */
import { Employee } from '@interfaces/employee-interface/employee.interface';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { EmployeeLoginDto } from '@/dtos/employee/employee.dto';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: EmployeeLoginDto = req.body;
      const { token, employee } = await this.authService.login(userData);

      res.status(200).json({ employee, message: 'login', token });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: EmployeeLoginDto = req.user;
      const logOutUserData: Employee = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

/* eslint-disable prettier/prettier */
import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import EmployeeModel  from '@models/employee/employee.model';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization').split('Bearer ')[1] || null;
    console.log('----------------------------------------------')
    console.log('Authorization')
    console.log(Authorization)
    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;

      const findUser = await EmployeeModel.findById(userId).populate('salaryStructure_id designation department', {netPay:1, designation:1});
      if (findUser && findUser.status === 'active') {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(407, 'Your employment status is no longer active'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    console.log(error, "issue")
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;

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
    console.log(req.header)
    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await EmployeeModel.findById(userId);
      // console.log(verificationResponse);
      console.log(findUser);
      // console.log(req.user);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    console.log(error)
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;

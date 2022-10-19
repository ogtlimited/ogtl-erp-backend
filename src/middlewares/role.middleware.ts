import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

const roleMiddleWare = role => {
  return async (req, res: Response, next: NextFunction) => {
    // console.log(req.user);
    // console.log(req.user['designation'].designation != role, '==============================>');
    // // console.log(req.user);
    try {
      if (req.user['designation'].designation != role) {
        next(new HttpException(401, 'Unauthorised Access'));
      }
      next();
    } catch (e) {
      console.log(e);
    }
  };
};
export default roleMiddleWare;

import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import WarningLetterController from '@controllers/pip/warningLetter.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateWarningLetterDto } from '@dtos/pip/warning_letter.dto';
import authMiddleware from '@middlewares/auth.middleware';

class WarningLetterRoute implements Routes {
  public path = '/api/warningLetter';
  public router = Router();
  public warningLetterController = new WarningLetterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.warningLetterController.getWarningLetters);
    this.router.get(`${this.path}/:id`, authMiddleware, this.warningLetterController.getWarningLetterById);
    this.router.get(`${this.path}/employee/:id`, authMiddleware, this.warningLetterController.getAllWarningLettersForEmployee);
    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreateWarningLetterDto, 'body'), authMiddleware],
      this.warningLetterController.createWarningLetter,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.warningLetterController.deleteWarningLetter);
  }
}
export default WarningLetterRoute;

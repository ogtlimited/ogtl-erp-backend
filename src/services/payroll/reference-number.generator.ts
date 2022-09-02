import { Bank3DPaymentService } from '@services/payroll/bank3d.service';

export class ReferenceGenerator {
  static referenceNumberGenerator() {
    return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36);
  }
}

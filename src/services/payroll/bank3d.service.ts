import axios from 'axios';
import { HttpException } from '@exceptions/HttpException';

export class Bank3DPaymentService {
  static async getBankToken() {
    const response = await axios.post(process.env.BANK_3D_URL, {
      ClientID: process.env.BANK_3D_CLIENT_ID,
      ClientSecret: process.env.BANK_3D_SECRET,
      Expiry: 1000000,
    });

    if ('Token' in response.data) {
      const { Token } = response.data;
      return Token;
    } else {
      throw new HttpException(500, 'Unable to generate payment batch');
    }
  }

  static async initiateBankPayment(token) {
    const payload = {
      FromAccountNumber: process.env.BANK_3D_From_Account_Number,
      FromBankCode: process.env.BANK_3D_From_Bank_Code,
      Narration: process.env.BANK_3D_Narration,
      Reference: process.env.BANK_3D_Reference,
      PaymentType: 'SALARY',
      DebitMode: 'BATCH',
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios({
      method: 'post',
      url: process.env.BANK_3D_URL_Initiate_Payment,
      data: payload,
      headers: config.headers,
    });

    if (response.data) {
      return response.data;
    } else {
      throw new HttpException(500, 'Unable to initiate Bank3D Payment');
    }
  }

  static async processPayments(date, salarySlips) {
    const token = await Bank3DPaymentService.getBankToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios({
      method: 'post',
      url: process.env.BANK_3D_URL_Process_Payment,
      data: salarySlips,
      headers: config.headers,
    });

    return 'Payment Process Commenced';
  }
}

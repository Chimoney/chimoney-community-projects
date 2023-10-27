import { Inject, Injectable } from '@nestjs/common';
import { Axios } from 'axios';
import {
  InitiatePaymentDto,
  SimulatePaymentStatusDto,
  VerifyPaymentDto,
} from 'src/dto/payment';
import { errorHandler } from 'src/utils/errorHandler';
import { AXIOS_INSTANCE } from '../constants';

@Injectable()
export class PaymentsService {
  constructor(@Inject(AXIOS_INSTANCE) private readonly request: Axios) {}

  async initiatePayment(data: InitiatePaymentDto) {
    try {
      const response = await this.request.post('payment/initiate', data);

      return { data: response.data, status: response.status };
    } catch (error) {
      return errorHandler(error);
    }
  }

  async verifyPayment(data: VerifyPaymentDto) {
    try {
      const response = await this.request.post('payment/verify', data);

      return { data: response.data, status: response.status };
    } catch (error) {
      return errorHandler(error);
    }
  }

  async simulateStatusChanges(data: SimulatePaymentStatusDto) {
    try {
      const response = await this.request.post('payment/verify', data);

      return { data: response.data, status: response.status };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './repositories/payment-repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}
}

import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export abstract class PaymentRepository {
  abstract createPayment(data: CreatePaymentDto): Promise<any>;
  abstract findAll(): Promise<any>;
  abstract findByMethod(method: string): Promise<any>;
}

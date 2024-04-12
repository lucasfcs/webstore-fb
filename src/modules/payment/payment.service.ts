import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './repositories/dto/create-payment.dto';
import { PaymentRepository } from './repositories/payment-repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async createPayment(data: CreatePaymentDto): Promise<any> {
    const isExist = await this.paymentRepository.findByMethod(data.method);

    if (isExist) {
      throw new BadRequestException('Forma de pagamento já cadastrada!');
    }
    const result = this.paymentRepository.createPayment(data);
    return result;
  }

  async findAll(): Promise<any> {
    return this.paymentRepository.findAll();
  }
}

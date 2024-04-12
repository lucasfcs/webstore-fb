import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './repositories/dto/create-payment.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() data: CreatePaymentDto): Promise<any> {
    return this.paymentService.createPayment(data);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.paymentService.findAll();
  }
}

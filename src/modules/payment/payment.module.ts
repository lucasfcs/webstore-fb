import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './repositories/payment-repository';
import { PrismaPaymentService } from './repositories/prisma/prisma-payment.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    { provide: PaymentRepository, useClass: PrismaPaymentService },
    PaymentService,
  ],
})
export class PaymentModule {}

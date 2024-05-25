import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './repositories/payment-repository';
import { PrismaPaymentService } from './repositories/prisma/prisma-payment.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    { provide: PaymentRepository, useClass: PrismaPaymentService },
    PaymentService,
  ],
})
export class PaymentModule {}

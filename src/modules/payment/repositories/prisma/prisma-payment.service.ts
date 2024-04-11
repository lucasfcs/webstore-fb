import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaymentRepository } from '../payment-repository';

@Injectable()
export class PrismaPaymentService implements PaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentRepository } from '../payment-repository';

@Injectable()
export class PrismaPaymentService implements PaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createPayment(data: CreatePaymentDto): Promise<any> {
    return await this.prismaService.payment.create({ data });
  }

  async findByMethod(method: string): Promise<any> {
    return await this.prismaService.payment.findFirst({ where: { method } });
  }

  async findAll(): Promise<any> {
    return await this.prismaService.payment.findMany();
  }
}

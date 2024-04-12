import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { OutputCreateDto } from '../../dtos/output-create.dto';
import { OutputRepository } from '../output-repository';

@Injectable()
export class PrismaOutputService implements OutputRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOutput(data: OutputCreateDto): Promise<any> {
    const createOutput = await this.prismaService.output.create({
      data: {
        price: data.price,
        quantity: data.quantity,
        totalPaid: data.totalPaid,
        product: { connect: { id: data.productId } },
        paymentDetails: {
          create: {
            method: data.method,
            amountPaid: data.totalPaid,
          },
        },
        payment: { connect: { id: data.paymentId } },
      },
    });
    return createOutput;
  }

  async updateStock(data: OutputCreateDto): Promise<any> {
    await this.prismaService.stock.update({
      where: { id: data.productId },
      data: {
        quantity: {
          decrement: data.quantity,
        },
      },
    });
  }

  async findByStock(data: OutputCreateDto): Promise<any> {
    const stock = await this.prismaService.stock.findUnique({
      where: {
        id: data.productId,
      },
      select: {
        quantity: true,
      },
    });

    return stock;
  }

  async methodPayment(payment: string): Promise<any> {
    const x = await this.prismaService.payment.findFirst({
      where: {
        method: {
          startsWith: payment,
        },
      },
    });
  }

  async findByDate(startDate: string, endDate: string): Promise<any> {
    const findOutput = await this.prismaService.output.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return findOutput;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { OutputCreateDto } from '../../dtos/output-create.dto';
import { OutputRepository } from '../output-repository';

@Injectable()
export class PrismaOutputService implements OutputRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async findByStock(data: OutputCreateDto): Promise<any> {
    return await this.prismaService.stock.findUnique({
      where: { id: data.productId },
      select: { quantity: true },
    });
  }

  async createOutput(data: OutputCreateDto): Promise<any> {
    return await this.prismaService.output.create({
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

  async methodPayment(payment: string): Promise<any> {
    const x = await this.prismaService.payment.findFirst({
      where: {
        method: {
          startsWith: payment,
        },
      },
    });
    return x;
  }

  async findByDate(startDate: string, endDate: string): Promise<any> {
    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);

    const newStartDate = dateStart.setHours(0, 0, 0, 0);
    const newEndDate = new Date(
      dateEnd.setDate(dateStart.getDate() + 1),
    ).setHours(23, 59, 59, 999);

    const result = await this.prismaService.input.findMany({
      where: {
        createdAt: {
          gte: new Date(newStartDate),
          lte: new Date(newEndDate),
        },
      },
    });
    return result;
  }

  async findAll(): Promise<any> {
    const result = await this.prismaService.input.findMany();
    return result;
  }
}

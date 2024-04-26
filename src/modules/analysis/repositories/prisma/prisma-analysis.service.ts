import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AnalysisRepository } from '../analysis-repository';

@Injectable()
export class PrismaAnalysisService implements AnalysisRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAnalysis(now: Date, end: Date): Promise<any> {
    const result = await this.prismaService.output.findMany({
      where: {
        createdAt: {
          gte: now,
          lte: end,
        },
      },
      select: {
        id: true,
        quantity: true,
        price: true,
        totalPaid: true,
        createdAt: true,
        product: {
          select: {
            name: true,
            description: true,
            color: true,
            size: true,
          },
        },
        paymentDetails: {
          select: {
            method: true,
            amountPaid: true,
          },
        },
        payment: true,
      },
      // select: {
      // product: {
      //   select: {
      //     description: true,
      //   },
      // },
      // },
    });
    return result;
  }
}

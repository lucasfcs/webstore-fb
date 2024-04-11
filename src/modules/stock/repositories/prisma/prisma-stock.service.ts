import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { StockRepository } from '../stock-repository';

@Injectable()
export class PrismaStockService implements StockRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<any> {
    const result = await this.prismaService.stock.findMany({
      select: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            sellingPrice: true,
          },
        },
        quantity: true,
        size: true,
      },
    });
    return result;
  }
}

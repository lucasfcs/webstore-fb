import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { OutputCreateDto } from '../../dtos/input-create.dto';
import { OutputRepository } from '../output-repository';

@Injectable()
export class PrismaOutputService implements OutputRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: OutputCreateDto): Promise<any> {
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
    console.log(stock.quantity);

    return stock;
  }
}
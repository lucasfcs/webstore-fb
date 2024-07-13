import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GetByRange } from '../../dtos/get-input.dto';
import { CreateMultipleInputsDto, InputCreateDto } from '../../dtos/input-create.dto';
import { InputRepository } from '../input-repository';

@Injectable()
export class PrismaInputService implements InputRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: InputCreateDto[]): Promise<any[]> {
    const results = [];
    for (const item of data) {
      const result = await this.prismaService.input.create({
        data: {
          price: item.price,
          quantity: item.quantity,
          product: {
            connect: {
              id: item.productId,
            },
          },
        },
      });
      results.push(result);
    }
    return results;
  }


  async update(data: InputCreateDto[]): Promise<any[]> {
    const results = [];
    for (const item of data) {
      const result = await this.prismaService.stock.update({
        where: { id: item.productId },
        data: {
          quantity: {
            increment: item.quantity,
          },
        },
      });
      results.push(result);
    }
    return results;
  }

  async findAll(): Promise<any> {
    const result = await this.prismaService.input.findMany();
    return result;
  }

  async findRange(start: string, end: string): Promise<GetByRange[] | any> {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);

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
}

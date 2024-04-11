import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { InputCreateDto } from '../../dtos/input-create.dto';
import { InputRepository } from '../input-repository';

@Injectable()
export class PrismaInputService implements InputRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: InputCreateDto): Promise<any> {
    await this.prismaService.stock.update({
      where: { id: data.productId },
      data: {
        quantity: {
          increment: data.quantity,
        },
      },
    });
  }

  //selling vendendo
  // adcionando itens ao estoque

  async findAll(): Promise<any> {
    const result = await this.prismaService.input.findMany();
    return result;
  }
}

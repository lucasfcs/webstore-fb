import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from '../../dtos/create-product.dto';
import { ProductRepository } from '../product-repository';

@Injectable()
export class PrismaProductService implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(data: CreateProductDto): Promise<any> {
    const product = await this.prismaService.product.create({ data });

    return product;
  }

  async findAll(): Promise<any> {
    const result = await this.prismaService.product.findMany();
    return result;
  }

  async findByName(name: string): Promise<any> {
    const result = await this.prismaService.product.findFirst({
      where: {
        name: {
          startsWith: name,
        },
      },
      select: {
        name: true,
        description: true,
        type: true,
        sellingPrice: true,

        stocks: {
          select: {
            product: true,
            quantity: true,
            size: true,
            color: true,
          },
        },
      },
    });
    return result;
  }
}

import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from '../../dtos/create-product.dto';
import { UpdateProductDto } from '../../dtos/update-product.dto';
import { ProductRepository } from '../product-repository';

@Injectable()
export class PrismaProductService implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(data: CreateProductDto): Promise<any> {
    try {
      const product = await this.prismaService.product.create({
        data: {
          name: data.name,
          description: data.description,
          type: data.type,
          color: data.color,
          size: data.size,
          costPrice: data.costPrice,
          sellingPrice: data.sellingPrice,
          stocks: {
            create: {
              name: data.name,
              quantity: 0,
              color: data.color,
              size: data.size,
            },
          },
        },
      });

      return product;
    } catch (error) {
      throw new BadGatewayException('ja existe');
    }
  }

  async findBy(data: CreateProductDto): Promise<any> {
    return await this.prismaService.product.findFirst({
      where: {
        name: data.name,
        size: data.size,
        color: data.color,
        type: data.type,
      },
    });
  }

  async findAll(): Promise<any> {
    const result = await this.prismaService.product.findMany();
    return result;
  }

  async findByName(name: string): Promise<any> {
    console.log(name);
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

  async updateProduct(data: UpdateProductDto): Promise<any> {
    const result = await this.prismaService.product.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        sellingPrice: data.sellingPrice,
        size: data.size,
        color: data.color,
      },
    });
    return result;
  }
}

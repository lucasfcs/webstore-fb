import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductRepository } from './repositories/product-repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<any> {
    // const isExist = await this.productRepository.findBy(name);

    // if (isExist) {
    //   throw new BadRequestException('Produto já cadastrado.');
    // }

    const product = await this.productRepository.createProduct({
      name: {
        connect: {
          productId: data.name,
        },
      },
      ...data,
    });

    return product;
  }

  async findAll(): Promise<any> {
    return this.productRepository.findAll();
  }

  async findByName(name: string): Promise<any> {
    return this.productRepository.findByName(name);
  }
}

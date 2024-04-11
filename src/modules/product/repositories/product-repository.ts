import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export abstract class ProductRepository {
  abstract createProduct(data: Prisma.ProductCreateInput): Promise<any>;

  abstract findAll(): Promise<any>;
  abstract findByName(name: string): Promise<any>;
  abstract updateProduct(data: UpdateProductDto): Promise<any>;
  abstract findBy(name: string): Promise<any>;
}

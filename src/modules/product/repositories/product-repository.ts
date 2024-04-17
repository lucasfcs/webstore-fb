import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export abstract class ProductRepository {
  abstract createProduct(data: Prisma.ProductCreateInput): Promise<any>;

  abstract findAll(): Promise<any>;
  abstract findByName(name: string): Promise<any>;
  abstract updateProduct(data: UpdateProductDto): Promise<any>;
  abstract findBy(data: CreateProductDto): Promise<any>;
}

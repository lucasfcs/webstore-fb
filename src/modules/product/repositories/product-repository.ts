import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export abstract class ProductRepository {
  abstract createProduct(data: Prisma.ProductCreateInput): Promise<any>;

  abstract findAll(): Promise<any>;
  abstract findByName(name: string): Promise<any>;
}

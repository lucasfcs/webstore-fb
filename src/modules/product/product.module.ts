import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaProductService } from './repositories/prisma/prisma-product.service';
import { ProductRepository } from './repositories/product-repository';
@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: PrismaProductService,
    },
    PrismaService,
  ],
})
export class ProductModule {}

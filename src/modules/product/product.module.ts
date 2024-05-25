import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaProductService } from './repositories/prisma/prisma-product.service';
import { ProductRepository } from './repositories/product-repository';
@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
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

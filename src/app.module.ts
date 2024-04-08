import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { InputModule } from './modules/input/stock.module';
import { ProductModule } from './modules/product/product.module';
import { StockModule } from './modules/stock/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    ProductModule,
    StockModule,
    InputModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

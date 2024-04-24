import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { InputModule } from './modules/input/input.module';
import { OutputModule } from './modules/output/output.module';
import { ProductModule } from './modules/product/product.module';
import { StockModule } from './modules/stock/stock.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AnalysisModule } from './modules/analysis/analysis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    ProductModule,
    StockModule,
    InputModule,
    OutputModule,
    PaymentModule,
    AnalysisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

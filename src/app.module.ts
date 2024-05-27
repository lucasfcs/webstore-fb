import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { AuthModule } from './modules/auth/auth.module';
import { InputModule } from './modules/input/input.module';
import { OutputModule } from './modules/output/output.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductModule } from './modules/product/product.module';
import { StockModule } from './modules/stock/stock.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_LFB,
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
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

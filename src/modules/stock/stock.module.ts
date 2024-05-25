import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';
import { PrismaStockService } from './repositories/prisma/prisma-stock.service';
import { StockRepository } from './repositories/stock-repository';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [StockController],
  providers: [
    StockService,
    {
      provide: StockRepository,
      useClass: PrismaStockService,
    },
    PrismaService,
  ],
})
export class StockModule {}

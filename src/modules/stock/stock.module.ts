import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { PrismaStockService } from './repositories/prisma/prisma-stock.service';
import { StockRepository } from './repositories/stock-repository';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [PrismaModule],
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

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StockService } from './stock.service';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}
  @Get('find-by-name')
  async findByName(@Query('name') name: string): Promise<any> {
    const result = await this.stockService.findByName(name);
    return result;
  }

  @Get()
  async findAll(): Promise<any> {
    const result = await this.stockService.findAll();
    return result;
  }
}

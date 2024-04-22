import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StockService } from './stock.service';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({
    summary: 'get all stock by name',
    description: 'route that searches the stock by name',
  })
  @Get('find-by-name')
  async findByName(@Query('name') name: string): Promise<any> {
    const result = await this.stockService.findByName(name);
    return result;
  }

  @ApiOperation({
    summary: 'route that searches all products in stock',
    description: 'route that returns a complete list of all products in stock',
  })
  @Get()
  async findAll(): Promise<any> {
    const result = await this.stockService.findAll();
    return result;
  }
}

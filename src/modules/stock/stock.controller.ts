import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { StockService } from './stock.service';

@ApiTags('Stock')
@ApiBearerAuth()
@Roles(Role.Admin, Role.Dono)
@UseGuards(AuthGuard, RolesGuard)
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

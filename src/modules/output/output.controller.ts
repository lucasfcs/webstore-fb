import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OutputCreateDto } from './dtos/output-create.dto';
import { OutputService } from './output.service';

@ApiTags('Output')
@Controller('output')
export class OutputController {
  constructor(private readonly outputService: OutputService) {}

  @ApiOperation({
    summary: 'product exit route',
    description: 'route that creates the movement of a product out of stock',
  })
  @Post()
  async create(@Body() data: OutputCreateDto): Promise<any> {
    const result = await this.outputService.create(data);
    return result;
  }

  @ApiOperation({
    summary: 'exit search route',
    description:
      'route that searches for all product exits from stock within a given time range',
  })
  @Get('range-date')
  async findByDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<any> {
    const result = await this.outputService.findByDate(startDate, endDate);
    return result;
  }

  @ApiOperation({
    summary: 'search route for all exits',
    description: 'route that searches for all exits that occurred',
  })
  @Get()
  async findAll(): Promise<any> {
    const result = await this.outputService.findAll();
    return result;
  }
}

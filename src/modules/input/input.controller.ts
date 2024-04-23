import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InputCreateDto } from './dtos/input-create.dto';
import { InputService } from './input.service';

@ApiTags('Input')
@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @ApiOperation({
    summary: 'route that creates a product entry',
    description:
      'route that carries out the entry of a certain product from stock.',
  })
  @Post()
  async create(@Body() data: InputCreateDto): Promise<any> {
    const result = await this.inputService.create(data);
    return result;
  }

  @ApiOperation({
    summary: 'route that returns a list of entries',
    description: 'route that returns a complete list of all products in stock',
  })
  @Get()
  async findAll(): Promise<any> {
    const result = await this.inputService.findAll();
    return result;
  }

  @ApiOperation({
    summary: 'route that returns entries',
    description: 'route that returns all entries in a given time range',
  })
  @Get('range-date')
  async findRange(
    @Query('start') start: string,
    @Query('end') end: string,
  ): Promise<any> {
    const result = await this.inputService.findRange(start, end);
    return result;
  }
}

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OutputCreateDto } from './dtos/output-create.dto';
import { OutputService } from './output.service';

@ApiTags('Output')
@Controller('output')
export class OutputController {
  constructor(private readonly outputService: OutputService) {}

  @Post()
  async create(@Body() data: OutputCreateDto): Promise<any> {
    const result = await this.outputService.create(data);
    return result;
  }

  @Get()
  async findByDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<any> {
    const result = await this.outputService.findByDate(startDate, endDate);
    return result;
  }
}

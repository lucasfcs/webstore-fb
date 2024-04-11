import { Body, Controller, Post } from '@nestjs/common';
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
}

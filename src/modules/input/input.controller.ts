import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InputCreateDto } from './dtos/input-create.dto';
import { InputService } from './input.service';

@ApiTags('Input')
@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Post()
  async create(@Body() data: InputCreateDto): Promise<any> {
    const result = await this.inputService.create(data);
    return result;
  }

  @Get()
  async findAll(): Promise<any> {
    const result = await this.inputService.findAll();
    return result;
  }
}

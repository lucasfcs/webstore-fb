import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InputService } from './input.service';

@ApiTags('Input')
@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Get()
  async findAll(): Promise<any> {
    const result = await this.inputService.findAll();
    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { GetByRange } from './dtos/get-input.dto';
import { CreateMultipleInputsDto, InputCreateDto } from './dtos/input-create.dto';
import { InputRepository } from './repositories/input-repository';

@Injectable()
export class InputService {
  constructor(private readonly inputRepository: InputRepository) { }

  async create(data: CreateMultipleInputsDto): Promise<any> {
    await this.inputRepository.update(data.inputs);
    await this.inputRepository.create(data.inputs);
  }

  async findAll(): Promise<any> {
    const result = await this.inputRepository.findAll();
    return result;
  }

  async findRange(start: string, end: string): Promise<GetByRange[]> {
    const result = await this.inputRepository.findRange(start, end);
    return result;
  }
}

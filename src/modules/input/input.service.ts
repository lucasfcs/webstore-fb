import { Injectable } from '@nestjs/common';
import { GetByRange } from './dtos/get-input.dto';
import { InputCreateDto } from './dtos/input-create.dto';
import { InputRepository } from './repositories/input-repository';

@Injectable()
export class InputService {
  constructor(private readonly inputRepository: InputRepository) {}

  async create(data: InputCreateDto): Promise<any> {
    await this.inputRepository.update(data);
    await this.inputRepository.create(data);
  }

  async findAll(): Promise<any> {
    return this.inputRepository.findAll();
  }

  async findRange(start: string, end: string): Promise<GetByRange[]> {
    return this.inputRepository.findRange(start, end);
  }
}

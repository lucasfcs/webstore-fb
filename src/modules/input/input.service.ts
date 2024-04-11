import { Injectable } from '@nestjs/common';
import { InputCreateDto } from './dtos/input-create.dto';
import { InputRepository } from './repositories/input-repository';

@Injectable()
export class InputService {
  constructor(private readonly inputRepository: InputRepository) {}

  async create(data: InputCreateDto): Promise<any> {
    return this.inputRepository.create(data);
  }

  async findAll(): Promise<any> {
    return this.inputRepository.findAll();
  }
}

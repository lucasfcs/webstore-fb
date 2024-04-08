import { Injectable } from '@nestjs/common';
import { InputRepository } from './repositories/input-repository';

@Injectable()
export class InputService {
  constructor(private readonly inputRepository: InputRepository) {}
  async findAll(): Promise<any> {
    return this.inputRepository.findAll();
  }
}

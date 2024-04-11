import { Injectable } from '@nestjs/common';
import { OutputCreateDto } from './dtos/input-create.dto';
import { OutputRepository } from './repositories/output-repository';

@Injectable()
export class OutputService {
  constructor(private readonly outputRepository: OutputRepository) {}
  async create(data: OutputCreateDto): Promise<any> {
    return this.outputRepository.create(data);
  }
}

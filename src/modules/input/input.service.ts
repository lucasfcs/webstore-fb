import { Injectable } from '@nestjs/common';
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

  async findRange(start: string, end: string): Promise<any> {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);

    const newStartDate = dateStart.setHours(0, 0, 0, 0);
    const newEndDate = new Date(
      dateEnd.setDate(dateStart.getDate() + 1),
    ).setHours(23, 59, 59, 999);

    const result = await this.inputRepository.findRange(
      String(newStartDate),
      String(newEndDate),
    );
    return result;
  }
}

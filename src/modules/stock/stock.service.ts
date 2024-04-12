import { Injectable } from '@nestjs/common';
import { StockRepository } from './repositories/stock-repository';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async findByName(name: string): Promise<any> {
    return this.stockRepository.findByName(name);
  }

  async findAll(): Promise<any> {
    return this.stockRepository.findAll();
  }
}

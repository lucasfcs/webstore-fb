import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class StockRepository {
  abstract findByName(name: string): Promise<any>;
  abstract findAll(): Promise<any>;
}

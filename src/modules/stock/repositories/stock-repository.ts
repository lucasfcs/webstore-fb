import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class StockRepository {
  abstract findAll(): Promise<any>;
}

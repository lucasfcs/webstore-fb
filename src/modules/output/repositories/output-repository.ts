import { Injectable } from '@nestjs/common';
import { OutputCreateDto } from '../dtos/output-create.dto';

@Injectable()
export abstract class OutputRepository {
  abstract updateStock(data: OutputCreateDto): Promise<any>;
  abstract findByStock(data: OutputCreateDto): Promise<any>;
  abstract methodPayment(payment: string): Promise<any>;
  abstract createOutput(data: OutputCreateDto): Promise<any>;
  abstract findByDate(startDate: string, endDate: string): Promise<any>;
  abstract findAll(): Promise<any>;
}

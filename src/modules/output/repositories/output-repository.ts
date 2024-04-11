import { Injectable } from '@nestjs/common';
import { OutputCreateDto } from '../dtos/input-create.dto';

@Injectable()
export abstract class OutputRepository {
  abstract create(data: OutputCreateDto): Promise<any>;
  abstract findByStock(data: OutputCreateDto): Promise<any>;
}

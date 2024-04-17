import { Injectable } from '@nestjs/common';
import { InputCreateDto } from '../dtos/input-create.dto';

@Injectable()
export abstract class InputRepository {
  abstract update(data: InputCreateDto): Promise<any>;
  abstract create(data: InputCreateDto): Promise<any>;

  abstract findAll(): Promise<any>;
  abstract findRange(start: string, end: string): Promise<any>;
}

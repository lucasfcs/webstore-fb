import { Injectable } from '@nestjs/common';
import { InputCreateDto } from '../dtos/input-create.dto';

@Injectable()
export abstract class InputRepository {
  abstract create(data: InputCreateDto): Promise<any>;

  abstract findAll(): Promise<any>;
}

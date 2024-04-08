import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class InputRepository {
  abstract findAll(): Promise<any>;
}

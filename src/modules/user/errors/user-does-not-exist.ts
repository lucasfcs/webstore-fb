import { BadRequestException } from '@nestjs/common';

export class UserDoesNotExist extends BadRequestException {
  constructor() {
    super('Usuário não existe!');
  }
}

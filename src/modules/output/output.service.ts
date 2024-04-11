import { BadGatewayException, Injectable } from '@nestjs/common';
import { OutputCreateDto } from './dtos/input-create.dto';
import { OutputRepository } from './repositories/output-repository';

@Injectable()
export class OutputService {
  constructor(private readonly outputRepository: OutputRepository) {}
  async create(data: OutputCreateDto): Promise<any> {
    const findQuantity = await this.outputRepository.findByStock(data);

    if (data.quantity > findQuantity.quantity) {
      throw new BadGatewayException(
        'A quantidade solicitada, excede a quantidade que temos no estoque.',
      );
    }
    const result = await this.outputRepository.create(data);
    return result;
  }
}

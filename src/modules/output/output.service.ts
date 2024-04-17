import { BadGatewayException, Injectable } from '@nestjs/common';
import { OutputCreateDto } from './dtos/output-create.dto';
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
    const createOutput = await this.outputRepository.createOutput(data);
    // const payment = await this.outputRepository.methodPayment(data.payment);
    await this.outputRepository.updateStock(data);
    return createOutput;
  }

  async findByDate(startDate: string, endDate: string): Promise<any> {
    const findOutput = await this.outputRepository.findByDate(
      startDate,
      endDate,
    );
    return findOutput;
  }

  async findAll(): Promise<any> {
    const findOutput = await this.outputRepository.findAll();
    return findOutput;
  }
}

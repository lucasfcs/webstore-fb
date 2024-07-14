import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateMultipleOutputsDto, OutputCreateDto } from './dtos/output-create.dto';
import { OutputRepository } from './repositories/output-repository';

@Injectable()
export class OutputService {
  constructor(private readonly outputRepository: OutputRepository) { }
  async create(data: CreateMultipleOutputsDto): Promise<any[]> {
    const results = [];
    for (const output of data.outputs) {
      const findQuantity = await this.outputRepository.findByStock(output);

      if (output.quantity > findQuantity.quantity) {
        throw new BadGatewayException(
          'The requested quantity exceeds the quantity in stock.',
        );
      }

      const createOutput = await this.outputRepository.createOutput(output);
      await this.outputRepository.updateStock(output);
      results.push(createOutput);
    }
    return results;
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

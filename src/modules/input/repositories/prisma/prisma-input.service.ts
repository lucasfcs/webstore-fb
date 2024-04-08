import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { InputRepository } from '../input-repository';

@Injectable()
export class PrismaInputService implements InputRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any> {
    const result = await this.prismaService.input.findMany();
    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AnalysisRepository } from '../analysis-repository';

@Injectable()
export class PrismaAnalysisService implements AnalysisRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAnalysis(now: Date, end: Date): Promise<any> {
    console.log(end, now);

    const result = await this.prismaService.output.findMany({
      where: {
        createdAt: {
          gte: now,
          lte: end,
        },
      },
    });
    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { AnalysisRepository } from './repositories/analysis-repository';

@Injectable()
export class AnalysisService {
  constructor(private readonly analysisRepository: AnalysisRepository) {}

  async getAnalysis(): Promise<any> {
    const now = new Date();

    const end = new Date(now);
    end.setDate(end.getDate() - 7);
    end.setHours(0, 0, 0, 0);

    const result = await this.analysisRepository.getAnalysis(end, now);

    return result;
  }
}

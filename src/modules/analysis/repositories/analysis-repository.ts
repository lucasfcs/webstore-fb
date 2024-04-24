import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AnalysisRepository {
  abstract getAnalysis(now: Date, end: Date): Promise<any>;
}

import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { AnalysisRepository } from './repositories/analysis-repository';
import { PrismaAnalysisService } from './repositories/prisma/prisma-analysis.service';

@Module({
  imports: [PrismaModule],
  controllers: [AnalysisController],
  providers: [
    AnalysisService,
    {
      provide: AnalysisRepository,
      useClass: PrismaAnalysisService,
    },
  ],
})
export class AnalysisModule {}

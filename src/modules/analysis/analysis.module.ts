import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { AnalysisRepository } from './repositories/analysis-repository';
import { PrismaAnalysisService } from './repositories/prisma/prisma-analysis.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
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

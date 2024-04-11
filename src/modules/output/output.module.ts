import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { OutputController } from './output.controller';
import { OutputService } from './output.service';
import { OutputRepository } from './repositories/output-repository';
import { PrismaOutputService } from './repositories/prisma/prisma-output.service';

@Module({
  imports: [PrismaModule],
  controllers: [OutputController],
  providers: [
    OutputService,
    {
      provide: OutputRepository,
      useClass: PrismaOutputService,
    },
    PrismaService,
  ],
})
export class OutputModule {}

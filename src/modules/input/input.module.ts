import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { InputController } from './input.controller';
import { InputService } from './input.service';
import { InputRepository } from './repositories/input-repository';
import { PrismaInputService } from './repositories/prisma/prisma-input.service';

@Module({
  imports: [PrismaModule],
  controllers: [InputController],
  providers: [
    InputService,
    {
      provide: InputRepository,
      useClass: PrismaInputService,
    },
    PrismaService,
  ],
})
export class InputModule {}

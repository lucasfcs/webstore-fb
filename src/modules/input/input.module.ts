import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';
import { InputController } from './input.controller';
import { InputService } from './input.service';
import { InputRepository } from './repositories/input-repository';
import { PrismaInputService } from './repositories/prisma/prisma-input.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
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

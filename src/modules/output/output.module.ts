import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';
import { OutputController } from './output.controller';
import { OutputService } from './output.service';
import { OutputRepository } from './repositories/output-repository';
import { PrismaOutputService } from './repositories/prisma/prisma-output.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
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

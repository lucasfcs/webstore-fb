import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { AuthModule } from '../auth/auth.module';
import { PrismaUserService } from './repositories/prisma/prisma-user.service';
import { UsersRepository } from './repositories/user-repository';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: PrismaUserService },
    PrismaService,
  ],
  exports: [UsersService],
})
export class UsersModule {}

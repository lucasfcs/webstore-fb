import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { UsersModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth-repository';
import { PrismaAuthService } from './repositories/prisma/prisma-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_LFB,
    }),
    forwardRef(() => UsersModule),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: AuthRepository, useClass: PrismaAuthService },
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

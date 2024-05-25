import { Injectable } from '@nestjs/common';
import { type User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { type AuthRepository } from '../auth-repository';

@Injectable()
export class PrismaAuthService implements AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async updatePassword(password: string, id: string): Promise<User> {
    const updateUser = await this.prismaService.user.update({
      where: {
        id: +id,
      },
      data: {
        password,
      },
    });

    return updateUser;
  }

  async findByUsername(username: string): Promise<User | any> {
    const findOneUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: {
          select: {
            role: true,
          },
        },
        password: true,
      },
    });

    return findOneUser;
  }
}

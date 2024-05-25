import { Injectable } from '@nestjs/common';
import { type Prisma, type Role, type User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { type UpdateUserDto } from '../../dtos/update-user.dto';
import { type UsersRepository } from '../user-repository';

@Injectable()
export class PrismaUserService implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRoles(): Promise<Role[] | null> {
    const roles = await this.prismaService.role.findMany();

    return roles;
  }

  async findAll(): Promise<User[] | null> {
    const users = await this.prismaService.user.findMany({
      include: {
        role: {
          select: {
            role: true,
          },
        },
      },
    });

    return users;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prismaService.user.create({ data });

    return user;
  }

  async createRole(data: Prisma.RoleCreateInput): Promise<any> {
    const role = await this.prismaService.role.create({
      data,
    });
    return role;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const updateuser = await this.prismaService.user.update({
      data,
      where: {
        id,
      },
    });

    return updateuser;
  }

  async softDelete(id: number, active: boolean): Promise<User> {
    const softDeleteUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        active,
      },
    });

    return softDeleteUser;
  }
}

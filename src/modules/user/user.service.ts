import { BadRequestException, Injectable } from '@nestjs/common';
import { type Role, type User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { type CreateUserDto } from './dtos/create-user.dto';
import { type UpdateUserDto } from './dtos/update-user.dto';
import { UserAlreadyExistsError } from './errors/user-already-exist-error';
import { UserDoesNotExist } from './errors/user-does-not-exist';
import { UsersRepository } from './repositories/user-repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create({
    name,
    username,
    password,
    role,
  }: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    const userWithSameUsername = await this.usersRepository.findUserByUsername(
      username,
    );

    if (userWithSameUsername) {
      throw new UserAlreadyExistsError();
    }

    const createUser = await this.usersRepository.create({
      name,
      username,
      password,
      role: {
        connectOrCreate: {
          where: {
            role,
          },
          create: {
            role,
          },
        },
      },
    });

    return createUser;
  }

  // async createRole(user: BearerTokenUser, data: CreateRole): Promise<any> {
  //   try {
  //     const role = await this.usersRepository.createRole({
  //       role: `${data.department} - ${data.position}`,
  //       department: {
  //         connectOrCreate: {
  //           where: {
  //             department_name: data.department,
  //           },
  //           create: {
  //             department_name: data.department,
  //             user_create_id: user ? user.id : 1,
  //             user_create: user ? user.name : 'Admin',
  //           },

  //         },
  //       },
  //       hold_a_position: {
  //         connectOrCreate: {
  //           where: {
  //             hold_a_position_name: data.position,
  //           },
  //           create: {
  //             hold_a_position_name: data.position,
  //             user_create_id: user ? user.id : 1,
  //             user_create: user ? user.name : 'Admin',
  //           },
  //         },
  //       },
  //       user_create_id: user ? user.id : 1,
  //       user_create: user ? user.name : 'Admin',
  //     });

  //     return role;
  //   } catch (error) {
  //     throw new BadRequestException('Role exist!');
  //   }
  // }

  async findAll(): Promise<User[] | null> {
    const users = await this.usersRepository.findAll();

    return users;
  }

  async findAllRoles(): Promise<string[] | null> {
    const roles = await this.usersRepository.findAllRoles();

    if (!roles) {
      throw new BadRequestException('There is no department record');
    }

    const list: string[] = [];

    roles.map((role: Role) => {
      return list.push(role.role);
    });

    return list;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserDoesNotExist();
    }

    return user;
  }

  async updateUser(
    id: number,
    { name, password }: UpdateUserDto,
  ): Promise<User | null> {
    const userExist = await this.usersRepository.findById(id);

    if (!userExist) {
      throw new UserDoesNotExist();
    }

    const data: UpdateUserDto = {};

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    const user = await this.usersRepository.update(id, data);

    return user;
  }

  async softDelete(id: number): Promise<User | null> {
    const userExist = await this.usersRepository.findById(id);

    if (!userExist) {
      throw new UserDoesNotExist();
    }

    let active: boolean = false;

    if (userExist.active === false) {
      const user = await this.usersRepository.softDelete(id, (active = true));
      return user;
    } else {
      const user = await this.usersRepository.softDelete(id, active);
      return user;
    }
  }
}

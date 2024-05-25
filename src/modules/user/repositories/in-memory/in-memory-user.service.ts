import { type Prisma, type Role, type User } from '@prisma/client';
import { type UpdateUserDto } from '../../dtos/update-user.dto';
import { type UsersRepository } from '../user-repository';

export class InMemorUserService implements UsersRepository {
  roles: Role[] = [];
  items: User[] = [];

  async findAll(): Promise<User[] | null> {
    const users = this.items;

    if (!users) {
      return null;
    }

    return users;
  }

  async findAllRoles(): Promise<Role[] | null> {
    const department = this.roles;

    if (!department) {
      return null;
    }

    return department;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = this.items.find((item) => item.username === username);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 1,
      name: data.name,
      username: data.username,
      password: data.password,
      role_id: 1,
      active: true,
      created_at: new Date(),
      user_create_id: 1,
      user_create: 'string',
      updated_at: new Date(),
      user_update_id: 1,
      user_update: '',
    };

    this.items.push(user);

    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    data.name && (user.name = data.name);
    // data.password && (user.password = data.password);
    return user;
  }

  async softDelete(id: number, active: boolean): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    user.active = active;
    this.items.push(user);

    return user;
  }
}

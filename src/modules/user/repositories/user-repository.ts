import { type Prisma, type Role, type User } from '@prisma/client';
import { type UpdateUserDto } from '../dtos/update-user.dto';

export abstract class UsersRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract findUserByUsername(username: string): Promise<User | null>;
  abstract findById(id: number): Promise<User | null>;
  abstract findAll(): Promise<User[] | null>;
  abstract findAllRoles(): Promise<Role[] | null>;
  abstract update(id: number, data: UpdateUserDto): Promise<User | null>;
  abstract softDelete(id: number, active: boolean): Promise<User | null>;
}

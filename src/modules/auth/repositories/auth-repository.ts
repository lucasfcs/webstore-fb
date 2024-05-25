import { type User } from '@prisma/client';

export abstract class AuthRepository {
  abstract findByUsername(username: string): Promise<User | null>;
  abstract updatePassword(password: string, id: string): Promise<any>;
}

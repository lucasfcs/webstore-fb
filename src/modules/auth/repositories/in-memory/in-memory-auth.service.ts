import { Injectable } from '@nestjs/common';
import { type User } from '@prisma/client';
import { type AuthRepository } from '../auth-repository';

@Injectable()
export class PrismaAuthService implements AuthRepository {
  items: User[] = [];
  async findByUsername(username: string): Promise<User | null> {
    const user = this.items.find((item) => item.username === username);

    if (!user) {
      return null;
    }

    return user;
  }

  async updatePassword(password: string, id: string): Promise<any> {
    const user = this.items.find((item) => item.id === +id);

    if (!user) {
      return null;
    }

    user.password = password;

    return user;
  }
}

import { SetMetadata } from '@nestjs/common';
import { type Role } from '../enums/role.enum';

export const ROLES_KEY = 'role';
export const Roles = (...role: Role[]): any => SetMetadata(ROLES_KEY, role);

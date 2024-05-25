import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class DataValidation {
  tokenPayload!: AuthUser;
}

export class AuthUser {
  id!: number;
  name!: string;
  username!: string;
  role_id!: number;
  role!: Role;
  iat!: number;
  exp!: number;
  aud!: string;
  iss!: string;
  sub!: string;
}

export class Role {
  role!: string;
}

export class AuthValidationDTO {
  @IsJWT()
  @ApiProperty()
  token!: string;
}

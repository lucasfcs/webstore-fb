import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiResponseProperty()
  user!: User;

  @ApiResponseProperty()
  token!: string;
}

export class User {
  @ApiResponseProperty()
  id!: number;

  @ApiResponseProperty()
  name!: string;

  @ApiResponseProperty()
  email!: string;

  @ApiResponseProperty()
  role_id!: number;
}

import { IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class AuthRegisterDTO {
  @IsNumber()
  id?: number;

  @IsString()
  name!: string;

  @IsString()
  username!: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  @IsString()
  password!: string;

  @IsString()
  role?: Role;
}

export class Role {
  role!: string;
}

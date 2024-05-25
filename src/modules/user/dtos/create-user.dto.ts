import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Lucas',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'opaluucas',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'Lucas1530.',
  })
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  @IsString()
  password!: string;

  @ApiProperty({
    example: 'Admin',
  })
  @IsString()
  role!: string;
}

export class CreateRole {
  @ApiProperty({
    example: 'Tecnologia',
  })
  @IsString()
  department!: string;

  @ApiProperty({
    example: 'Analista',
  })
  @IsString()
  position!: string;
}

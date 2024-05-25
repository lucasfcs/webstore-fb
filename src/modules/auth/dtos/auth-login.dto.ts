import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    example: 'opaluucas',
  })
  @IsString()
  username!: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  @ApiProperty({
    example: 'Lucas1530.',
  })
  @IsString()
  password!: string;
}

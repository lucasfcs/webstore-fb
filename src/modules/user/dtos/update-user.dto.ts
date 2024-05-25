import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // role?: string;
}

// export class Role {
//   role!: string;
//   cc!: string;
// }

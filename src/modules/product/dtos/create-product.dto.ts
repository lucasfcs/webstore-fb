import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Body',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'Body cavado',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Roupa',
  })
  @IsString()
  type!: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  color?: string;

  @ApiProperty({
    example: 'P',
  })
  @IsEnum([
    'P',
    'M',
    'G',
    'GG',
    'XG',
    'U',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
  ])
  size?: string;

  @ApiProperty({
    example: 50,
  })
  @IsNumber()
  costPrice!: number;

  @ApiProperty({
    example: 80,
  })
  @IsNumber()
  sellingPrice!: number;
}

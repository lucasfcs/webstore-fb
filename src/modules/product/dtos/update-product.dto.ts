import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  id!: number;

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
  type?: string;

  @ApiProperty({
    example: 45,
  })
  @IsNumber()
  sellingPrice?: number;

  @ApiProperty({
    example: 'P',
  })
  @IsString()
  size?: string;

  @ApiProperty({
    example: 'Azul',
  })
  @IsString()
  color?: string;

  @ApiProperty({
    example: 1,
  })
  stockId!: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class OutputCreateDto {
  @ApiProperty({
    example: 3,
  })
  @IsNumber()
  quantity!: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  productId!: number;
}

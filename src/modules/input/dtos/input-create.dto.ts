import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InputCreateDto {
  @ApiProperty({
    example: 3,
  })
  @IsNumber()
  quantity!: number;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  productId!: number;
}

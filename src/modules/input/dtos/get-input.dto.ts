import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class GetByRange {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  id!: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  quantity!: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    example: 1,
  })
  @IsDate()
  createdAt!: Date;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  productId!: number;
}

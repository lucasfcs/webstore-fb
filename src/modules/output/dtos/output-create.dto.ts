import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OutputCreateDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  quantity!: number;

  @ApiProperty({
    example: 100,
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    example: 99,
  })
  @IsNumber()
  totalPaid!: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  productId?: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  paymentId?: number;

  @ApiProperty({
    example: 'dinheiro',
  })
  @IsString()
  method!: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

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
    example: 'cash',
  })
  @IsString()
  method!: string;
}

export class CreateMultipleOutputsDto {
  @ApiProperty({
    type: [OutputCreateDto],
    description: 'An array of outputs to be created',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OutputCreateDto)
  outputs: OutputCreateDto[];
}

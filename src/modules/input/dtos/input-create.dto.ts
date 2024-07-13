import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class InputCreateDto {
  @ApiProperty({
    example: 3,
    description: 'The quantity of the product',
  })
  @IsNumber()
  quantity!: number;

  @ApiProperty({
    example: 10,
    description: 'The price of the product',
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the product',
  })
  @IsNumber()
  productId!: number;
}

export class CreateMultipleInputsDto {
  @ApiProperty({
    type: [InputCreateDto],
    description: 'An array of inputs to be created',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InputCreateDto)
  inputs: InputCreateDto[];
}

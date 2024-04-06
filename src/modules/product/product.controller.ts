import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@ApiTags()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiOperation({
    summary: 'create product',
    description:
      'product creation route, which generates the relationship between product and stock',
  })
  @Post()
  async createProduct(@Body() data: CreateProductDto): Promise<any> {
    const result = await this.productService.createProduct(data);
    return result;
  }

  @ApiOperation({
    summary: 'get all products',
    description:
      'route that searches all products without using any specifications',
  })
  @Get()
  async findAll(): Promise<any> {
    const result = await this.productService.findAll();
    return result;
  }
}

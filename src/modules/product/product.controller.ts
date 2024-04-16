import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
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

  @Get('get-by-name')
  async findByName(@Query('name') name: string): Promise<any> {
    const result = await this.productService.findByName(name);
    return result;
  }

  @Patch()
  async updateProduct(@Body() data: UpdateProductDto): Promise<any> {
    const result = await this.productService.updateProduct(data);
    return result;
  }
}

import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@ApiBearerAuth()
@Roles(Role.Admin, Role.Dono)
@UseGuards(AuthGuard, RolesGuard)
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

  @ApiOperation({
    summary: 'get all products by name',
    description: 'route where you search for products by a given name',
  })
  @Get('get-by-name')
  async findByName(@Query('name') name: string): Promise<any> {
    const result = await this.productService.findByName(name);
    return result;
  }

  @ApiOperation({
    summary: 'Product change',
    description: 'route that changes any field of the product',
  })
  @Patch()
  async updateProduct(@Body() data: UpdateProductDto): Promise<any> {
    const result = await this.productService.updateProduct(data);
    return result;
  }
}

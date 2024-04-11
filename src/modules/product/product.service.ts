import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductRepository } from './repositories/product-repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(data: CreateProductDto): Promise<any> {
    // const isExist = await this.productRepository.findBy(data.name);

    // if (isExist) {
    //   throw new BadRequestException('Produto já cadastrado.');
    // }

    const product = await this.productRepository.createProduct({
      ...data,
    });
    return product;
  }

  async findAll(): Promise<any> {
    return this.productRepository.findAll();
  }

  async findByName(name: string): Promise<any> {
    return this.productRepository.findByName(name);
  }

  async updateProduct(data: UpdateProductDto): Promise<any> {
    return this.productRepository.updateProduct(data);
  }
}

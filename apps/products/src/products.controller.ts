import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductRequest } from './dto/create-product-request';
import { UpdateProductRequest } from './dto/update-product-request';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Post()
  async createProduct(@Body() request: CreateProductRequest) {
    return this.productsService.createPost(request);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() request: UpdateProductRequest,
  ) {
    return this.productsService.updateProduct(id, request);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}

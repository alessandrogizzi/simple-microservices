import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductRequest } from './dto/create-product-request';
import { UpdateProductRequest } from './dto/update-product-request';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async createPost(request: CreateProductRequest) {
    try {
      return await this.productsRepository.create(request);
    } catch (err) {
      throw err;
    }
  }

  async getProducts() {
    try {
      return this.productsRepository.find({});
    } catch (err) {
      throw err;
    }
  }

  async getProduct(id: string) {
    try {
      return this.productsRepository.findOne({ _id: id });
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(id: string, request: UpdateProductRequest) {
    try {
      return await this.productsRepository.findOneAndUpdate(
        {
          _id: id,
        },
        request,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id: string) {
    try {
      return await this.productsRepository.delete({ _id: id });
    } catch (err) {
      throw err;
    }
  }
}

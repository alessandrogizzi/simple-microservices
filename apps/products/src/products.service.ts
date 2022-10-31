import { ClientProxy } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { categoryError } from '@app/common';
import { ProductsRepository } from './products.repository';
import { CreateProductRequest } from './dto/create-product-request';
import { UpdateProductRequest } from './dto/update-product-request';
import { CATEGORIES_SERVICE } from './constants';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly httpService: HttpService,
    @Inject(CATEGORIES_SERVICE) private categoriesClient: ClientProxy,
  ) {}

  async createProduct(request: CreateProductRequest) {
    try {
      await this.httpService.axiosRef
        .get(`${process.env.CATEGORIES_URL}/${request.category}`)
        .catch(() => {
          throw categoryError();
        });
      const product = await this.productsRepository.create(request);

      await this.categoriesClient.emit('product_created', {
        ...product,
      });
      return product;
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
      request?.category &&
        (await this.httpService.axiosRef
          .get(`${process.env.CATEGORIES_URL}/${request.category}`)
          .catch(() => {
            throw categoryError();
          }));

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
      const product = await this.productsRepository.findOne({ _id: id });
      const res = await this.productsRepository.delete({ _id: id });
      await this.categoriesClient.emit('product_removed', {
        category: product.category,
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
}

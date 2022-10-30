import { HttpException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryRequest } from './dto/create-category-request';
import { UpdateCategoryRequest } from './dto/update-category-request';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(request: CreateCategoryRequest) {
    try {
      return await this.categoriesRepository.create({
        ...request,
        postCount: 0,
        productCount: 0,
      });
    } catch (err) {
      throw err;
    }
  }

  async getCategories() {
    try {
      return this.categoriesRepository.find({});
    } catch (err) {
      throw err;
    }
  }

  async getCategory(id: string) {
    try {
      return this.categoriesRepository.findOne({ _id: id });
    } catch (err) {
      throw err;
    }
  }

  async updateCategory(id: string, request: UpdateCategoryRequest) {
    try {
      return await this.categoriesRepository.findOneAndUpdate(
        {
          _id: id,
        },
        request,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteCategory(id: string) {
    try {
      const category = await this.getCategory(id);

      if (category?.postCount || category?.productCount)
        throw new HttpException('Category is not empty', 400);

      return await this.categoriesRepository.delete({ _id: id });
    } catch (err) {
      throw err;
    }
  }
}

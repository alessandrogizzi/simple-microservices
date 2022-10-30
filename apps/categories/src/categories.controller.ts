import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryRequest } from './dto/create-category-request';
import { UpdateCategoryRequest } from './dto/update-category-request';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.categoriesService.getCategory(id);
  }

  @Post()
  async createCategory(@Body() request: CreateCategoryRequest) {
    return this.categoriesService.createCategory(request);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() request: UpdateCategoryRequest,
  ) {
    return this.categoriesService.updateCategory(id, request);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}

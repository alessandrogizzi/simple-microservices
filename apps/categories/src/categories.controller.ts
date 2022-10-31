import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryRequest } from './dto/create-category-request';
import { UpdateCategoryRequest } from './dto/update-category-request';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly rmqService: RmqService,
  ) {}

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

  @EventPattern('post_created')
  async handlePostCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.categoriesService.counter(data?.category, 'post', '+');
    this.rmqService.ack(context);
  }

  @EventPattern('post_removed')
  async handlePostRemoved(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.categoriesService.counter(data?.category, 'post', '-');
    this.rmqService.ack(context);
  }

  @EventPattern('product_created')
  async handleProductCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.categoriesService.counter(data?.category, 'product', '+');
    this.rmqService.ack(context);
  }

  @EventPattern('product_removed')
  async handleProductRemoved(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.categoriesService.counter(data?.category, 'product', '-');
    this.rmqService.ack(context);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesRepository extends AbstractRepository<Category> {
  protected readonly logger = new Logger(CategoriesRepository.name);

  constructor(
    @InjectModel(Category.name) orderModel: Model<Category>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}

import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoriesRepository } from './categories.repository';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_CATEGORIES_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/categories/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    RmqModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}

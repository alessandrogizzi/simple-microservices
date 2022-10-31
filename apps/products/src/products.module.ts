import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsRepository } from './products.repository';
import { CATEGORIES_SERVICE } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        CATEGORIES_URL: Joi.string().required(),
      }),
      envFilePath: './apps/products/.env',
    }),
    HttpModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    RmqModule.register({
      name: CATEGORIES_SERVICE,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}

import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule, RmqModule } from '@app/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './schemas/post.schema';
import { PostsRepository } from './posts.repository';
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
      envFilePath: './apps/posts/.env',
    }),
    HttpModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    RmqModule.register({
      name: CATEGORIES_SERVICE,
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}

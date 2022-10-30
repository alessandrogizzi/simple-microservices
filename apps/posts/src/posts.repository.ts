import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsRepository extends AbstractRepository<Post> {
  protected readonly logger = new Logger(PostsRepository.name);

  constructor(
    @InjectModel(Post.name) orderModel: Model<Post>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}

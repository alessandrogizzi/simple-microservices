import { ClientProxy } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { HttpService } from '@nestjs/axios';
import { categoryError } from '@app/common';
import { CATEGORIES_SERVICE } from './constants';
import { CreatePostRequest } from './dto/create-post-request';
import { UpdatePostRequest } from './dto/update-post-request';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly httpService: HttpService,
    @Inject(CATEGORIES_SERVICE) private categoriesClient: ClientProxy,
  ) {}

  async createPost(request: CreatePostRequest) {
    try {
      await this.httpService.axiosRef
        .get(`${process.env.CATEGORIES_URL}/${request.category}`)
        .catch(() => {
          throw categoryError();
        });

      const post = await this.postsRepository.create(request);
      await this.categoriesClient.emit('post_created', {
        ...post,
      });
      return post;
    } catch (err) {
      throw err;
    }
  }

  async getPosts() {
    try {
      return this.postsRepository.find({});
    } catch (err) {
      throw err;
    }
  }

  async getPost(id: string) {
    try {
      return this.postsRepository.findOne({ _id: id });
    } catch (err) {
      throw err;
    }
  }

  async updatePost(id: string, request: UpdatePostRequest) {
    try {
      request?.category &&
        (await this.httpService.axiosRef
          .get(`${process.env.CATEGORIES_URL}/${request.category}`)
          .catch(() => {
            throw categoryError();
          }));

      return await this.postsRepository.findOneAndUpdate(
        {
          _id: id,
        },
        request,
      );
    } catch (err) {
      throw err;
    }
  }

  async deletePost(id: string) {
    try {
      const post = await this.postsRepository.findOne({ _id: id });
      const res = await this.postsRepository.delete({ _id: id });
      await this.categoriesClient.emit('post_removed', {
        category: post.category,
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
}

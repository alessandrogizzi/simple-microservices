import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostRequest } from './dto/create-post-request';
import { UpdatePostRequest } from './dto/update-post-request';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async createPost(request: CreatePostRequest) {
    try {
      return await this.postsRepository.create(request);
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
      return await this.postsRepository.delete({ _id: id });
    } catch (err) {
      throw err;
    }
  }
}

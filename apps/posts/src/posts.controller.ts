import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequest } from './dto/create-post-request';
import { UpdatePostRequest } from './dto/update-post-request';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() request: CreatePostRequest) {
    return this.postsService.createPost(request);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() request: UpdatePostRequest) {
    return this.postsService.updatePost(id, request);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}

import { NestFactory } from '@nestjs/core';
import { PostsModule } from './posts.module';

async function bootstrap() {
  console.log('process.env.PORT', process.env.PORT);
  const app = await NestFactory.create(PostsModule);
  await app.listen(3000);
}
bootstrap();

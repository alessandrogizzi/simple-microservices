import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { CategoriesModule } from './categories.module';

async function bootstrap() {
  const app = await NestFactory.create(CategoriesModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();

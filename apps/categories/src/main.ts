import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { CategoriesModule } from './categories.module';

async function bootstrap() {
  const app = await NestFactory.create(CategoriesModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('CATEGORIES_SERVICE'));
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();

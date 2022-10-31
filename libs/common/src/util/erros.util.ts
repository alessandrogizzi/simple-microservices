import { HttpException } from '@nestjs/common';

export const categoryError = () =>
  new HttpException('Category does not exist', 400);

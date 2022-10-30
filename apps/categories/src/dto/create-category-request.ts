import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}

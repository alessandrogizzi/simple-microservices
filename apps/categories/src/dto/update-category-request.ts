import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCategoryRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  postCount: number;

  @IsNumber()
  @IsOptional()
  productCount: number;
}

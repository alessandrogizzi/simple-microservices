import { IsString, IsOptional, IsMongoId, IsNumber } from 'class-validator';

export class UpdateProductRequest {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: string;

  @IsMongoId()
  @IsOptional()
  category: string;
}

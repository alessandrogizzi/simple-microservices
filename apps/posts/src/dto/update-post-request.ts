import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class UpdatePostRequest {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsMongoId()
  @IsOptional()
  category: string;
}

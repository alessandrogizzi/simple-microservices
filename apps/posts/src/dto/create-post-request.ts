import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreatePostRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsMongoId()
  @IsNotEmpty()
  category: string;
}

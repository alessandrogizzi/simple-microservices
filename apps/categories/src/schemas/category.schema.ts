import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Category extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  postCount: number;

  @Prop()
  productCount: number;
}
export const CategorySchema = SchemaFactory.createForClass(Category);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class Product extends AbstractDocument {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop({ type: Types.ObjectId, required: true })
  category: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);

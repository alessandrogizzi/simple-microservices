import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class Post extends AbstractDocument {
  @Prop()
  title: string;
  @Prop()
  body: string;
  @Prop({ type: Types.ObjectId, required: true })
  category: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);
